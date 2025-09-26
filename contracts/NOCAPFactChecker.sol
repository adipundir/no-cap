// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import { IWorldID } from "@worldcoin/world-id-contracts/interfaces/IWorldID.sol";
import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import { ReentrancyGuard } from "@openzeppelin/contracts/security/ReentrancyGuard.sol";

/**
 * @title NOCAPFactChecker
 * @dev A decentralized fact-checking platform with World ID verification and PYUSD rewards
 */
contract NOCAPFactChecker is Ownable, ReentrancyGuard {
    /// @notice World ID instance
    IWorldID internal immutable worldId;
    
    /// @notice PYUSD token contract
    IERC20 public immutable pyusdToken;
    
    /// @notice The external nullifier hash for this app
    uint256 internal immutable externalNullifierHash;
    
    /// @notice Mapping from nullifier hash to verification status
    mapping(uint256 => bool) internal nullifierHashes;
    
    /// @notice Mapping from user address to verification status
    mapping(address => bool) public verifiedUsers;
    
    /// @notice Mapping from user address to reputation score
    mapping(address => uint256) public userReputation;
    
    /// @notice Claim structure for fact-checking
    struct Claim {
        uint256 id;
        address submitter;
        string contentHash; // IPFS hash of the claim content
        string[] sources; // Array of source URLs/hashes
        uint256 timestamp;
        uint256 totalVotes;
        uint256 truthfulVotes;
        uint256 falseVotes;
        bool isResolved;
        bool isTruthful;
        uint256 rewardPool; // PYUSD reward pool for this claim
    }
    
    /// @notice Vote structure
    struct Vote {
        address voter;
        uint256 claimId;
        bool isTruthful;
        uint256 timestamp;
        uint256 stake; // PYUSD staked on this vote
    }
    
    /// @notice Array of all claims
    Claim[] public claims;
    
    /// @notice Mapping from claim ID to votes
    mapping(uint256 => Vote[]) public claimVotes;
    
    /// @notice Mapping to prevent double voting
    mapping(uint256 => mapping(address => bool)) public hasVoted;
    
    /// @notice Minimum stake required to vote (in PYUSD wei)
    uint256 public minimumStake = 1e6; // 1 PYUSD (6 decimals)
    
    /// @notice Minimum votes required to resolve a claim
    uint256 public minimumVotesToResolve = 10;
    
    /// @notice Platform fee percentage (basis points, 100 = 1%)
    uint256 public platformFee = 500; // 5%
    
    /// @notice Events
    event UserVerified(address indexed user, uint256 nullifierHash);
    event ClaimSubmitted(uint256 indexed claimId, address indexed submitter, string contentHash);
    event VoteCast(uint256 indexed claimId, address indexed voter, bool isTruthful, uint256 stake);
    event ClaimResolved(uint256 indexed claimId, bool isTruthful, uint256 totalRewards);
    event RewardsDistributed(uint256 indexed claimId, address indexed voter, uint256 amount);
    
    /// @notice Errors
    error InvalidNullifier();
    error AlreadyVerified();
    error NotVerified();
    error InsufficientStake();
    error AlreadyVoted();
    error ClaimNotFound();
    error ClaimAlreadyResolved();
    error InsufficientVotes();
    error TransferFailed();
    
    constructor(
        IWorldID _worldId,
        string memory _appId,
        string memory _action,
        IERC20 _pyusdToken
    ) {
        worldId = _worldId;
        pyusdToken = _pyusdToken;
        externalNullifierHash = abi
            .encodePacked(abi.encodePacked(_appId).hashToField(), _action)
            .hashToField();
    }
    
    /// @notice Verify a user with World ID
    /// @param signal The signal to verify (usually the user's address)
    /// @param root The Merkle root
    /// @param nullifierHash The nullifier hash
    /// @param proof The zero-knowledge proof
    function verifyUser(
        address signal,
        uint256 root,
        uint256 nullifierHash,
        uint256[8] calldata proof
    ) external {
        // Check if nullifier has been used before
        if (nullifierHashes[nullifierHash]) revert InvalidNullifier();
        
        // Check if user is already verified
        if (verifiedUsers[signal]) revert AlreadyVerified();
        
        // Verify the World ID proof
        worldId.verifyProof(
            root,
            1, // groupId for Orb verification
            abi.encodePacked(signal).hashToField(),
            nullifierHash,
            externalNullifierHash,
            proof
        );
        
        // Mark nullifier as used and user as verified
        nullifierHashes[nullifierHash] = true;
        verifiedUsers[signal] = true;
        userReputation[signal] = 100; // Starting reputation
        
        emit UserVerified(signal, nullifierHash);
    }
    
    /// @notice Submit a new claim for fact-checking
    /// @param contentHash IPFS hash of the claim content
    /// @param sources Array of source URLs/hashes
    /// @param initialReward Initial PYUSD reward to add to the pool
    function submitClaim(
        string memory contentHash,
        string[] memory sources,
        uint256 initialReward
    ) external nonReentrant {
        if (!verifiedUsers[msg.sender]) revert NotVerified();
        
        // Transfer initial reward to contract if provided
        if (initialReward > 0) {
            if (!pyusdToken.transferFrom(msg.sender, address(this), initialReward)) {
                revert TransferFailed();
            }
        }
        
        uint256 claimId = claims.length;
        claims.push(Claim({
            id: claimId,
            submitter: msg.sender,
            contentHash: contentHash,
            sources: sources,
            timestamp: block.timestamp,
            totalVotes: 0,
            truthfulVotes: 0,
            falseVotes: 0,
            isResolved: false,
            isTruthful: false,
            rewardPool: initialReward
        }));
        
        emit ClaimSubmitted(claimId, msg.sender, contentHash);
    }
    
    /// @notice Vote on a claim
    /// @param claimId The ID of the claim to vote on
    /// @param isTruthful Whether the voter believes the claim is truthful
    /// @param stakeAmount Amount of PYUSD to stake on this vote
    function voteOnClaim(
        uint256 claimId,
        bool isTruthful,
        uint256 stakeAmount
    ) external nonReentrant {
        if (!verifiedUsers[msg.sender]) revert NotVerified();
        if (claimId >= claims.length) revert ClaimNotFound();
        if (claims[claimId].isResolved) revert ClaimAlreadyResolved();
        if (hasVoted[claimId][msg.sender]) revert AlreadyVoted();
        if (stakeAmount < minimumStake) revert InsufficientStake();
        
        // Transfer stake to contract
        if (!pyusdToken.transferFrom(msg.sender, address(this), stakeAmount)) {
            revert TransferFailed();
        }
        
        // Record the vote
        claimVotes[claimId].push(Vote({
            voter: msg.sender,
            claimId: claimId,
            isTruthful: isTruthful,
            timestamp: block.timestamp,
            stake: stakeAmount
        }));
        
        // Update claim statistics
        claims[claimId].totalVotes++;
        claims[claimId].rewardPool += stakeAmount;
        
        if (isTruthful) {
            claims[claimId].truthfulVotes++;
        } else {
            claims[claimId].falseVotes++;
        }
        
        hasVoted[claimId][msg.sender] = true;
        
        emit VoteCast(claimId, msg.sender, isTruthful, stakeAmount);
        
        // Auto-resolve if minimum votes reached
        if (claims[claimId].totalVotes >= minimumVotesToResolve) {
            _resolveClaim(claimId);
        }
    }
    
    /// @notice Resolve a claim and distribute rewards
    /// @param claimId The ID of the claim to resolve
    function _resolveClaim(uint256 claimId) internal {
        Claim storage claim = claims[claimId];
        
        // Determine if claim is truthful based on majority vote
        bool isClaimTruthful = claim.truthfulVotes > claim.falseVotes;
        claim.isTruthful = isClaimTruthful;
        claim.isResolved = true;
        
        // Calculate platform fee
        uint256 platformFeeAmount = (claim.rewardPool * platformFee) / 10000;
        uint256 rewardPool = claim.rewardPool - platformFeeAmount;
        
        // Distribute rewards to correct voters
        Vote[] memory votes = claimVotes[claimId];
        uint256 totalCorrectStake = 0;
        
        // Calculate total stake of correct voters
        for (uint256 i = 0; i < votes.length; i++) {
            if (votes[i].isTruthful == isClaimTruthful) {
                totalCorrectStake += votes[i].stake;
            }
        }
        
        // Distribute proportional rewards
        if (totalCorrectStake > 0) {
            for (uint256 i = 0; i < votes.length; i++) {
                if (votes[i].isTruthful == isClaimTruthful) {
                    uint256 voterReward = (rewardPool * votes[i].stake) / totalCorrectStake;
                    
                    // Return original stake + reward
                    uint256 totalPayout = votes[i].stake + voterReward;
                    
                    if (!pyusdToken.transfer(votes[i].voter, totalPayout)) {
                        revert TransferFailed();
                    }
                    
                    // Update reputation
                    userReputation[votes[i].voter] += 10;
                    
                    emit RewardsDistributed(claimId, votes[i].voter, totalPayout);
                } else {
                    // Penalize incorrect voters by reducing reputation
                    if (userReputation[votes[i].voter] >= 5) {
                        userReputation[votes[i].voter] -= 5;
                    }
                }
            }
        }
        
        emit ClaimResolved(claimId, isClaimTruthful, rewardPool);
    }
    
    /// @notice Get claim details
    /// @param claimId The ID of the claim
    /// @return The claim struct
    function getClaim(uint256 claimId) external view returns (Claim memory) {
        if (claimId >= claims.length) revert ClaimNotFound();
        return claims[claimId];
    }
    
    /// @notice Get votes for a claim
    /// @param claimId The ID of the claim
    /// @return Array of votes
    function getClaimVotes(uint256 claimId) external view returns (Vote[] memory) {
        if (claimId >= claims.length) revert ClaimNotFound();
        return claimVotes[claimId];
    }
    
    /// @notice Get total number of claims
    /// @return The total number of claims
    function getTotalClaims() external view returns (uint256) {
        return claims.length;
    }
    
    /// @notice Admin function to update minimum stake
    /// @param newMinimumStake New minimum stake amount
    function updateMinimumStake(uint256 newMinimumStake) external onlyOwner {
        minimumStake = newMinimumStake;
    }
    
    /// @notice Admin function to update minimum votes to resolve
    /// @param newMinimumVotes New minimum votes required
    function updateMinimumVotesToResolve(uint256 newMinimumVotes) external onlyOwner {
        minimumVotesToResolve = newMinimumVotes;
    }
    
    /// @notice Admin function to withdraw platform fees
    /// @param amount Amount to withdraw
    function withdrawPlatformFees(uint256 amount) external onlyOwner {
        if (!pyusdToken.transfer(owner(), amount)) {
            revert TransferFailed();
        }
    }
}

// Helper library for hashing (from World ID)
library ByteHasher {
    /// @dev Creates a keccak256 hash of a bytestring.
    /// @param value The bytestring to hash
    /// @return The hash of the specified value
    /// @dev `>> 8` makes sure that the result is included in our field
    function hashToField(bytes memory value) internal pure returns (uint256) {
        return uint256(keccak256(abi.encodePacked(value))) >> 8;
    }
}

// Extension for bytes
using ByteHasher for bytes;

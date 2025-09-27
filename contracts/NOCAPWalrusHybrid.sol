// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import { IWorldID } from "@worldcoin/world-id-contracts/interfaces/IWorldID.sol";
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import { ReentrancyGuard } from "@openzeppelin/contracts/security/ReentrancyGuard.sol";

/**
 * @title NOCAPWalrusHybrid
 * @dev Hybrid fact-checking platform: minimal on-chain data + Walrus content storage
 * @notice Only verified humans can interact - content stored on Walrus, metadata on-chain
 */
contract NOCAPWalrusHybrid is Ownable, ReentrancyGuard {
    using ByteHasher for bytes;

    /// @notice World ID instance
    IWorldID internal immutable worldId;
    
    /// @notice The external nullifier hash for this app (humanhood action)
    uint256 internal immutable externalNullifierHash;
    
    /// @notice Mapping from nullifier hash to verification status (prevents reuse)
    mapping(uint256 => bool) internal nullifierHashes;
    
    /// @notice User profile structure (unchanged)
    struct UserProfile {
        bool isVerified;           // World ID verification status
        uint256 reputation;       // Reputation score (starts at 100)
        uint256 factsSubmitted;   // Total facts submitted
        uint256 factsVerified;    // Facts that were verified as true
        uint256 factsFalse;       // Facts that were verified as false
        uint256 votesCorrect;     // Votes that matched final outcome
        uint256 votesIncorrect;   // Votes that didn't match final outcome
        uint256 totalStaked;      // Total ETH staked across all activities
        uint256 rewardsEarned;    // Total rewards earned
        uint256 joinedAt;         // Timestamp when user first verified
        uint256 lastActive;       // Last activity timestamp
    }
    
    /// @notice Minimal on-chain fact reference
    struct FactReference {
        uint256 id;               // Unique fact ID
        address submitter;        // Who submitted this fact
        string walrusBlobId;      // Walrus blob ID containing full content
        bytes32 contentHash;      // SHA256 hash for integrity verification
        uint256 stakeAmount;      // ETH staked by submitter
        uint256 votesTrue;        // Count of TRUE votes
        uint256 votesFalse;       // Count of FALSE votes
        uint256 totalStaked;      // Total ETH staked on votes
        bool resolved;            // Whether fact is resolved
        bool outcome;             // Final outcome (true/false)
        uint256 createdAt;        // Creation timestamp
        uint256 deadline;         // Voting deadline
        uint256 rewardPool;       // Available rewards
        uint8 category;           // Fact category (0-255)
        uint8 priority;           // Priority level (0-255)
    }
    
    /// @notice Vote structure (unchanged)
    struct Vote {
        address voter;            // Who voted
        bool vote;                // Their vote (true/false)
        uint256 stakeAmount;      // ETH staked on this vote
        uint256 timestamp;        // When they voted
    }
    
    /// @notice Mapping from user address to their profile
    mapping(address => UserProfile) public userProfiles;
    
    /// @notice Array of all fact references
    FactReference[] public factReferences;
    
    /// @notice Mapping from fact ID to votes
    mapping(uint256 => Vote[]) public factVotes;
    
    /// @notice Mapping to prevent double voting
    mapping(uint256 => mapping(address => bool)) public hasVoted;
    
    /// @notice Platform configuration
    uint256 public constant MIN_VOTING_PERIOD = 24 hours;
    uint256 public constant MAX_VOTING_PERIOD = 168 hours; // 7 days
    uint256 public constant MIN_VOTES_TO_RESOLVE = 5;
    uint256 public constant PLATFORM_FEE_BPS = 250; // 2.5%
    uint256 public constant REPUTATION_BONUS_CORRECT = 10;
    uint256 public constant REPUTATION_PENALTY_INCORRECT = 5;
    uint256 public constant MAX_CATEGORIES = 20;
    
    /// @notice Events
    event UserVerified(address indexed user, uint256 nullifierHash, uint256 timestamp);
    event FactReferenceSubmitted(
        uint256 indexed factId, 
        address indexed submitter, 
        string walrusBlobId, 
        bytes32 contentHash,
        uint256 stakeAmount,
        uint8 category,
        uint8 priority
    );
    event VoteCast(uint256 indexed factId, address indexed voter, bool vote, uint256 stakeAmount);
    event FactResolved(uint256 indexed factId, bool outcome, uint256 totalRewards);
    event RewardDistributed(address indexed user, uint256 amount, string reason);
    event ReputationUpdated(address indexed user, uint256 newReputation, int256 change);
    event ContentHashUpdated(uint256 indexed factId, bytes32 newContentHash);
    
    /// @notice Custom errors
    error NotVerified();
    error AlreadyVerified();
    error InvalidNullifier();
    error FactNotFound();
    error FactResolved();
    error VotingEnded();
    error AlreadyVoted();
    error InsufficientStake();
    error TransferFailed();
    error InvalidDeadline();
    error InvalidWalrusBlobId();
    error InvalidCategory();
    error InvalidContentHash();
    
    /// @notice Modifier to ensure only verified humans can interact
    modifier onlyVerifiedHuman() {
        if (!userProfiles[msg.sender].isVerified) revert NotVerified();
        _;
        // Update last active timestamp
        userProfiles[msg.sender].lastActive = block.timestamp;
    }
    
    constructor(
        address _worldIdAddress,
        string memory _appId,
        string memory _actionId
    ) Ownable(msg.sender) {
        worldId = IWorldID(_worldIdAddress);
        externalNullifierHash = abi
            .encodePacked(abi.encodePacked(_appId).hashToField(), _actionId)
            .hashToField();
    }
    
    /**
     * @notice Verify user with World ID and create their profile
     * @param signal The user's wallet address (used as signal)
     * @param root The root of the Merkle tree
     * @param nullifierHash The nullifier hash
     * @param proof The zero-knowledge proof
     */
    function verifyAndRegister(
        address signal,
        uint256 root,
        uint256 nullifierHash,
        uint256[8] calldata proof
    ) external nonReentrant {
        // Prevent nullifier reuse
        if (nullifierHashes[nullifierHash]) revert InvalidNullifier();
        
        // Prevent double verification
        if (userProfiles[signal].isVerified) revert AlreadyVerified();
        
        // Verify the World ID proof
        worldId.verifyProof(
            root,
            externalNullifierHash,
            uint256(uint160(signal)), // Convert address to uint256 for signal
            nullifierHash,
            proof
        );
        
        // Mark nullifier as used
        nullifierHashes[nullifierHash] = true;
        
        // Create user profile
        userProfiles[signal] = UserProfile({
            isVerified: true,
            reputation: 100, // Starting reputation
            factsSubmitted: 0,
            factsVerified: 0,
            factsFalse: 0,
            votesCorrect: 0,
            votesIncorrect: 0,
            totalStaked: 0,
            rewardsEarned: 0,
            joinedAt: block.timestamp,
            lastActive: block.timestamp
        });
        
        emit UserVerified(signal, nullifierHash, block.timestamp);
    }
    
    /**
     * @notice Submit a fact reference with Walrus blob ID
     * @param walrusBlobId The Walrus blob ID containing full fact content
     * @param contentHash SHA256 hash of the content for integrity verification
     * @param votingPeriodHours Voting period in hours (24-168)
     * @param category Fact category (0-19)
     * @param priority Priority level (0=Low, 1=Medium, 2=High, 3=Critical)
     * @return factId The ID of the newly created fact reference
     */
    function submitFactReference(
        string calldata walrusBlobId,
        bytes32 contentHash,
        uint256 votingPeriodHours,
        uint8 category,
        uint8 priority
    ) external payable onlyVerifiedHuman nonReentrant returns (uint256 factId) {
        if (bytes(walrusBlobId).length == 0) revert InvalidWalrusBlobId();
        if (contentHash == bytes32(0)) revert InvalidContentHash();
        if (votingPeriodHours < 24 || votingPeriodHours > 168) revert InvalidDeadline();
        if (category >= MAX_CATEGORIES) revert InvalidCategory();
        if (priority > 3) revert InvalidCategory(); // Reuse error for priority
        
        factId = factReferences.length;
        uint256 deadline = block.timestamp + (votingPeriodHours * 1 hours);
        
        factReferences.push(FactReference({
            id: factId,
            submitter: msg.sender,
            walrusBlobId: walrusBlobId,
            contentHash: contentHash,
            stakeAmount: msg.value,
            votesTrue: 0,
            votesFalse: 0,
            totalStaked: msg.value,
            resolved: false,
            outcome: false,
            createdAt: block.timestamp,
            deadline: deadline,
            rewardPool: msg.value,
            category: category,
            priority: priority
        }));
        
        // Update user stats
        userProfiles[msg.sender].factsSubmitted++;
        if (msg.value > 0) {
            userProfiles[msg.sender].totalStaked += msg.value;
        }
        
        emit FactReferenceSubmitted(factId, msg.sender, walrusBlobId, contentHash, msg.value, category, priority);
    }
    
    /**
     * @notice Vote on a fact reference with optional ETH stake
     * @param factId The ID of the fact to vote on
     * @param vote The vote (true for true, false for false)
     */
    function voteFact(uint256 factId, bool vote) external payable onlyVerifiedHuman nonReentrant {
        if (factId >= factReferences.length) revert FactNotFound();
        if (factReferences[factId].resolved) revert FactResolved();
        if (block.timestamp >= factReferences[factId].deadline) revert VotingEnded();
        if (hasVoted[factId][msg.sender]) revert AlreadyVoted();
        
        // Record the vote
        factVotes[factId].push(Vote({
            voter: msg.sender,
            vote: vote,
            stakeAmount: msg.value,
            timestamp: block.timestamp
        }));
        
        // Update fact statistics
        if (vote) {
            factReferences[factId].votesTrue++;
        } else {
            factReferences[factId].votesFalse++;
        }
        
        factReferences[factId].totalStaked += msg.value;
        factReferences[factId].rewardPool += msg.value;
        hasVoted[factId][msg.sender] = true;
        
        // Update user stats
        if (msg.value > 0) {
            userProfiles[msg.sender].totalStaked += msg.value;
        }
        
        emit VoteCast(factId, msg.sender, vote, msg.value);
        
        // Auto-resolve if minimum votes reached and deadline passed
        if ((factReferences[factId].votesTrue + factReferences[factId].votesFalse) >= MIN_VOTES_TO_RESOLVE &&
            block.timestamp >= factReferences[factId].deadline) {
            _resolveFact(factId);
        }
    }
    
    /**
     * @notice Manually resolve a fact (anyone can call after deadline)
     * @param factId The ID of the fact to resolve
     */
    function resolveFact(uint256 factId) external {
        if (factId >= factReferences.length) revert FactNotFound();
        if (factReferences[factId].resolved) revert FactResolved();
        if (block.timestamp < factReferences[factId].deadline) revert VotingEnded();
        
        _resolveFact(factId);
    }
    
    /**
     * @notice Internal function to resolve a fact and distribute rewards
     * @param factId The ID of the fact to resolve
     */
    function _resolveFact(uint256 factId) internal {
        FactReference storage fact = factReferences[factId];
        
        // Determine outcome based on majority vote
        bool outcome = fact.votesTrue > fact.votesFalse;
        fact.outcome = outcome;
        fact.resolved = true;
        
        // Update submitter stats
        if (outcome) {
            userProfiles[fact.submitter].factsVerified++;
            userProfiles[fact.submitter].reputation += REPUTATION_BONUS_CORRECT;
        } else {
            userProfiles[fact.submitter].factsFalse++;
            if (userProfiles[fact.submitter].reputation >= REPUTATION_PENALTY_INCORRECT) {
                userProfiles[fact.submitter].reputation -= REPUTATION_PENALTY_INCORRECT;
            }
        }
        
        // Distribute rewards if there's a reward pool
        if (fact.rewardPool > 0) {
            _distributeRewards(factId, outcome);
        }
        
        emit FactResolved(factId, outcome, fact.rewardPool);
    }
    
    /**
     * @notice Internal function to distribute rewards to correct voters
     * @param factId The fact ID
     * @param correctOutcome The correct outcome
     */
    function _distributeRewards(uint256 factId, bool correctOutcome) internal {
        Vote[] memory votes = factVotes[factId];
        uint256 totalCorrectStake = 0;
        uint256 platformFee = (factReferences[factId].rewardPool * PLATFORM_FEE_BPS) / 10000;
        uint256 distributionPool = factReferences[factId].rewardPool - platformFee;
        
        // Calculate total stake of correct voters
        for (uint256 i = 0; i < votes.length; i++) {
            if (votes[i].vote == correctOutcome) {
                totalCorrectStake += votes[i].stakeAmount;
            }
        }
        
        // Distribute rewards proportionally
        if (totalCorrectStake > 0) {
            for (uint256 i = 0; i < votes.length; i++) {
                Vote memory vote = votes[i];
                
                if (vote.vote == correctOutcome) {
                    // Correct vote - get rewards
                    uint256 reward = (distributionPool * vote.stakeAmount) / totalCorrectStake;
                    uint256 totalPayout = vote.stakeAmount + reward;
                    
                    // Update user stats
                    userProfiles[vote.voter].votesCorrect++;
                    userProfiles[vote.voter].reputation += REPUTATION_BONUS_CORRECT;
                    userProfiles[vote.voter].rewardsEarned += reward;
                    
                    // Transfer rewards
                    if (totalPayout > 0) {
                        (bool success, ) = payable(vote.voter).call{value: totalPayout}("");
                        if (!success) revert TransferFailed();
                        emit RewardDistributed(vote.voter, totalPayout, "Correct vote reward");
                    }
                    
                    emit ReputationUpdated(vote.voter, userProfiles[vote.voter].reputation, int256(REPUTATION_BONUS_CORRECT));
                } else {
                    // Incorrect vote - lose stake, reduce reputation
                    userProfiles[vote.voter].votesIncorrect++;
                    if (userProfiles[vote.voter].reputation >= REPUTATION_PENALTY_INCORRECT) {
                        userProfiles[vote.voter].reputation -= REPUTATION_PENALTY_INCORRECT;
                    }
                    
                    emit ReputationUpdated(vote.voter, userProfiles[vote.voter].reputation, -int256(REPUTATION_PENALTY_INCORRECT));
                }
            }
        }
    }
    
    /**
     * @notice Update content hash (for content updates on Walrus)
     * @param factId The fact ID
     * @param newContentHash New content hash after Walrus update
     */
    function updateContentHash(uint256 factId, bytes32 newContentHash) external {
        if (factId >= factReferences.length) revert FactNotFound();
        if (factReferences[factId].submitter != msg.sender) revert NotVerified();
        if (newContentHash == bytes32(0)) revert InvalidContentHash();
        
        factReferences[factId].contentHash = newContentHash;
        emit ContentHashUpdated(factId, newContentHash);
    }
    
    /**
     * @notice Get fact reference by ID
     * @param factId The fact ID
     * @return The fact reference
     */
    function getFactReference(uint256 factId) external view returns (FactReference memory) {
        if (factId >= factReferences.length) revert FactNotFound();
        return factReferences[factId];
    }
    
    /**
     * @notice Get facts by category
     * @param category The category to filter by
     * @return Array of fact IDs in the category
     */
    function getFactsByCategory(uint8 category) external view returns (uint256[] memory) {
        if (category >= MAX_CATEGORIES) revert InvalidCategory();
        
        uint256[] memory categoryFacts = new uint256[](factReferences.length);
        uint256 count = 0;
        
        for (uint256 i = 0; i < factReferences.length; i++) {
            if (factReferences[i].category == category) {
                categoryFacts[count] = i;
                count++;
            }
        }
        
        // Resize array to actual count
        uint256[] memory result = new uint256[](count);
        for (uint256 i = 0; i < count; i++) {
            result[i] = categoryFacts[i];
        }
        
        return result;
    }
    
    /**
     * @notice Get active facts (unresolved and within deadline)
     * @return Array of active fact IDs
     */
    function getActiveFacts() external view returns (uint256[] memory) {
        uint256[] memory activeFacts = new uint256[](factReferences.length);
        uint256 count = 0;
        
        for (uint256 i = 0; i < factReferences.length; i++) {
            if (!factReferences[i].resolved && block.timestamp < factReferences[i].deadline) {
                activeFacts[count] = i;
                count++;
            }
        }
        
        uint256[] memory result = new uint256[](count);
        for (uint256 i = 0; i < count; i++) {
            result[i] = activeFacts[i];
        }
        
        return result;
    }
    
    /**
     * @notice Get resolved facts
     * @return Array of resolved fact IDs
     */
    function getResolvedFacts() external view returns (uint256[] memory) {
        uint256[] memory resolvedFacts = new uint256[](factReferences.length);
        uint256 count = 0;
        
        for (uint256 i = 0; i < factReferences.length; i++) {
            if (factReferences[i].resolved) {
                resolvedFacts[count] = i;
                count++;
            }
        }
        
        uint256[] memory result = new uint256[](count);
        for (uint256 i = 0; i < count; i++) {
            result[i] = resolvedFacts[i];
        }
        
        return result;
    }
    
    /**
     * @notice Get facts by submitter
     * @param submitter The submitter address
     * @return Array of fact IDs submitted by the address
     */
    function getFactsBySubmitter(address submitter) external view returns (uint256[] memory) {
        uint256[] memory userFacts = new uint256[](factReferences.length);
        uint256 count = 0;
        
        for (uint256 i = 0; i < factReferences.length; i++) {
            if (factReferences[i].submitter == submitter) {
                userFacts[count] = i;
                count++;
            }
        }
        
        uint256[] memory result = new uint256[](count);
        for (uint256 i = 0; i < count; i++) {
            result[i] = userFacts[i];
        }
        
        return result;
    }
    
    /**
     * @notice Get comprehensive user profile
     * @param user The user address
     * @return The user's profile
     */
    function getUserProfile(address user) external view returns (UserProfile memory) {
        return userProfiles[user];
    }
    
    /**
     * @notice Get votes for a fact
     * @param factId The fact ID
     * @return Array of votes
     */
    function getFactVotes(uint256 factId) external view returns (Vote[] memory) {
        if (factId >= factReferences.length) revert FactNotFound();
        return factVotes[factId];
    }
    
    /**
     * @notice Get total number of fact references
     * @return Total facts count
     */
    function getTotalFacts() external view returns (uint256) {
        return factReferences.length;
    }
    
    /**
     * @notice Check if user is verified
     * @param user The user address
     * @return True if verified
     */
    function isVerified(address user) external view returns (bool) {
        return userProfiles[user].isVerified;
    }
    
    /**
     * @notice Owner function to withdraw platform fees
     */
    function withdrawPlatformFees() external onlyOwner {
        uint256 balance = address(this).balance;
        if (balance > 0) {
            (bool success, ) = payable(owner()).call{value: balance}("");
            if (!success) revert TransferFailed();
        }
    }
}

/**
 * @title ByteHasher
 * @dev Helper library for hashing operations (from World ID)
 */
library ByteHasher {
    /// @dev Creates a keccak256 hash of a bytestring.
    /// @param value The bytestring to hash
    /// @return The hash of the specified value
    /// @dev `>> 8` makes sure that the result is included in our field
    function hashToField(bytes memory value) internal pure returns (uint256) {
        return uint256(keccak256(abi.encodePacked(value))) >> 8;
    }
}

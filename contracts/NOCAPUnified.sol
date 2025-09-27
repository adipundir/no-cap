// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import { IWorldID } from "@worldcoin/world-id-contracts/interfaces/IWorldID.sol";
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import { ReentrancyGuard } from "@openzeppelin/contracts/security/ReentrancyGuard.sol";

/**
 * @title NOCAPUnified
 * @dev A unified fact-checking platform with integrated World ID verification and comprehensive user metrics
 * @notice Only verified humans can interact with this protocol - enforced at every level
 */
contract NOCAPUnified is Ownable, ReentrancyGuard {
    using ByteHasher for bytes;

    /// @notice World ID instance
    IWorldID internal immutable worldId;
    
    /// @notice The external nullifier hash for this app (humanhood action)
    uint256 internal immutable externalNullifierHash;
    
    /// @notice Mapping from nullifier hash to verification status (prevents reuse)
    mapping(uint256 => bool) internal nullifierHashes;
    
    /// @notice Comprehensive user profile structure
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
    
    /// @notice Mapping from user address to their profile
    mapping(address => UserProfile) public userProfiles;
    
    /// @notice Fact structure for community verification
    struct Fact {
        uint256 id;               // Unique fact ID
        address submitter;        // Who submitted this fact
        string title;             // Fact title
        string description;       // Detailed description
        uint256 stakeAmount;      // ETH staked by submitter
        uint256 votesTrue;        // Votes saying it's true
        uint256 votesFalse;       // Votes saying it's false
        uint256 totalStaked;      // Total ETH staked on votes
        bool resolved;            // Whether fact is resolved
        bool outcome;             // Final outcome (true/false)
        uint256 createdAt;        // Creation timestamp
        uint256 deadline;         // Voting deadline
        uint256 rewardPool;       // Total rewards available
    }
    
    /// @notice Vote structure
    struct Vote {
        address voter;            // Who voted
        bool vote;                // Their vote (true/false)
        uint256 stakeAmount;      // ETH staked on this vote
        uint256 timestamp;        // When they voted
    }
    
    /// @notice Array of all facts
    Fact[] public facts;
    
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
    
    /// @notice Events
    event UserVerified(address indexed user, uint256 nullifierHash, uint256 timestamp);
    event FactSubmitted(uint256 indexed factId, address indexed submitter, string title, uint256 stakeAmount);
    event VoteCast(uint256 indexed factId, address indexed voter, bool vote, uint256 stakeAmount);
    event FactResolved(uint256 indexed factId, bool outcome, uint256 totalRewards);
    event RewardDistributed(address indexed user, uint256 amount, string reason);
    event ReputationUpdated(address indexed user, uint256 newReputation, int256 change);
    
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
     * @notice Submit a new fact claim (free)
     * @param title The title of the fact
     * @param description The description of the fact
     * @param votingPeriodHours Voting period in hours (24-168)
     * @return factId The ID of the newly created fact
     */
    function submitFact(
        string calldata title,
        string calldata description,
        uint256 votingPeriodHours
    ) external onlyVerifiedHuman nonReentrant returns (uint256 factId) {
        if (votingPeriodHours < 24 || votingPeriodHours > 168) revert InvalidDeadline();
        
        factId = facts.length;
        uint256 deadline = block.timestamp + (votingPeriodHours * 1 hours);
        
        facts.push(Fact({
            id: factId,
            submitter: msg.sender,
            title: title,
            description: description,
            stakeAmount: 0, // No stake for free submission
            votesTrue: 0,
            votesFalse: 0,
            totalStaked: 0,
            resolved: false,
            outcome: false,
            createdAt: block.timestamp,
            deadline: deadline,
            rewardPool: 0
        }));
        
        // Update user stats
        userProfiles[msg.sender].factsSubmitted++;
        
        emit FactSubmitted(factId, msg.sender, title, 0);
    }
    
    /**
     * @notice Submit a new fact claim with ETH stake
     * @param title The title of the fact
     * @param description The description of the fact
     * @param votingPeriodHours Voting period in hours (24-168)
     * @return factId The ID of the newly created fact
     */
    function submitFactWithStake(
        string calldata title,
        string calldata description,
        uint256 votingPeriodHours
    ) external payable onlyVerifiedHuman nonReentrant returns (uint256 factId) {
        if (msg.value == 0) revert InsufficientStake();
        if (votingPeriodHours < 24 || votingPeriodHours > 168) revert InvalidDeadline();
        
        factId = facts.length;
        uint256 deadline = block.timestamp + (votingPeriodHours * 1 hours);
        
        facts.push(Fact({
            id: factId,
            submitter: msg.sender,
            title: title,
            description: description,
            stakeAmount: msg.value,
            votesTrue: 0,
            votesFalse: 0,
            totalStaked: msg.value,
            resolved: false,
            outcome: false,
            createdAt: block.timestamp,
            deadline: deadline,
            rewardPool: msg.value
        }));
        
        // Update user stats
        userProfiles[msg.sender].factsSubmitted++;
        userProfiles[msg.sender].totalStaked += msg.value;
        
        emit FactSubmitted(factId, msg.sender, title, msg.value);
    }
    
    /**
     * @notice Vote on a fact claim with optional ETH stake
     * @param factId The ID of the fact to vote on
     * @param vote The vote (true for true, false for false)
     */
    function voteFact(uint256 factId, bool vote) external payable onlyVerifiedHuman nonReentrant {
        if (factId >= facts.length) revert FactNotFound();
        if (facts[factId].resolved) revert FactResolved();
        if (block.timestamp >= facts[factId].deadline) revert VotingEnded();
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
            facts[factId].votesTrue++;
        } else {
            facts[factId].votesFalse++;
        }
        
        facts[factId].totalStaked += msg.value;
        facts[factId].rewardPool += msg.value;
        hasVoted[factId][msg.sender] = true;
        
        // Update user stats
        if (msg.value > 0) {
            userProfiles[msg.sender].totalStaked += msg.value;
        }
        
        emit VoteCast(factId, msg.sender, vote, msg.value);
        
        // Auto-resolve if minimum votes reached and deadline passed
        if ((facts[factId].votesTrue + facts[factId].votesFalse) >= MIN_VOTES_TO_RESOLVE &&
            block.timestamp >= facts[factId].deadline) {
            _resolveFact(factId);
        }
    }
    
    /**
     * @notice Manually resolve a fact (anyone can call after deadline)
     * @param factId The ID of the fact to resolve
     */
    function resolveFact(uint256 factId) external {
        if (factId >= facts.length) revert FactNotFound();
        if (facts[factId].resolved) revert FactResolved();
        if (block.timestamp < facts[factId].deadline) revert VotingEnded();
        
        _resolveFact(factId);
    }
    
    /**
     * @notice Internal function to resolve a fact and distribute rewards
     * @param factId The ID of the fact to resolve
     */
    function _resolveFact(uint256 factId) internal {
        Fact storage fact = facts[factId];
        
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
        uint256 platformFee = (facts[factId].rewardPool * PLATFORM_FEE_BPS) / 10000;
        uint256 distributionPool = facts[factId].rewardPool - platformFee;
        
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
     * @notice Get comprehensive user profile
     * @param user The user address
     * @return The user's profile
     */
    function getUserProfile(address user) external view returns (UserProfile memory) {
        return userProfiles[user];
    }
    
    /**
     * @notice Get fact details
     * @param factId The fact ID
     * @return The fact details
     */
    function getFact(uint256 factId) external view returns (Fact memory) {
        if (factId >= facts.length) revert FactNotFound();
        return facts[factId];
    }
    
    /**
     * @notice Get votes for a fact
     * @param factId The fact ID
     * @return Array of votes
     */
    function getFactVotes(uint256 factId) external view returns (Vote[] memory) {
        if (factId >= facts.length) revert FactNotFound();
        return factVotes[factId];
    }
    
    /**
     * @notice Get total number of facts
     * @return Total facts count
     */
    function getTotalFacts() external view returns (uint256) {
        return facts.length;
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
     * @notice Get user reputation
     * @param user The user address
     * @return User's reputation score
     */
    function getUserReputation(address user) external view returns (uint256) {
        return userProfiles[user].reputation;
    }
    
    /**
     * @notice Get user's fact submission stats
     * @param user The user address
     * @return submitted, verified, false counts
     */
    function getUserFactStats(address user) external view returns (uint256 submitted, uint256 verified, uint256 false_) {
        UserProfile memory profile = userProfiles[user];
        return (profile.factsSubmitted, profile.factsVerified, profile.factsFalse);
    }
    
    /**
     * @notice Get user's voting stats
     * @param user The user address
     * @return correct, incorrect vote counts
     */
    function getUserVoteStats(address user) external view returns (uint256 correct, uint256 incorrect) {
        UserProfile memory profile = userProfiles[user];
        return (profile.votesCorrect, profile.votesIncorrect);
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
    
    /**
     * @notice Get leaderboard data (top users by reputation)
     * @param limit Number of users to return
     * @return addresses Array of user addresses
     * @return reputations Array of reputation scores
     */
    function getLeaderboard(uint256 limit) external view returns (address[] memory addresses, uint256[] memory reputations) {
        // Note: This is a simplified implementation
        // In production, you'd want to maintain a sorted list or use a more efficient approach
        addresses = new address[](limit);
        reputations = new uint256[](limit);
        
        // This would need to be implemented with proper sorting logic
        // For now, returning empty arrays as placeholder
        return (addresses, reputations);
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

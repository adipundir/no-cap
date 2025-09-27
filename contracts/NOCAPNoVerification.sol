// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract NOCAPNoVerification {
    ///////////////////////////////////////////////////////////////////////////////
    ///                                  ERRORS                                ///
    ///////////////////////////////////////////////////////////////////////////////
    
    error InvalidWalrusBlobId();
    error InvalidStakeAmount();
    error FactNotFound();
    error FactAlreadyResolved();
    error VotingPeriodNotEnded();
    error InsufficientStake();
    error TransferFailed();
    error AlreadyVoted();

    ///////////////////////////////////////////////////////////////////////////////
    ///                                  EVENTS                                ///
    ///////////////////////////////////////////////////////////////////////////////
    
    event FactCreated(uint256 indexed factId, address indexed creator, string walrusBlobId, uint256 stake, uint256 timestamp);
    event VoteCast(uint256 indexed factId, address indexed voter, bool vote, uint256 stake, uint256 timestamp);
    event FactResolved(uint256 indexed factId, bool outcome, uint256 totalRewards, uint256 timestamp);
    event FactTied(uint256 indexed factId, uint256 capVotes, uint256 noCapVotes, uint256 timestamp);
    event StakeWithdrawn(address indexed user, uint256 amount);

    ///////////////////////////////////////////////////////////////////////////////
    ///                                 STORAGE                                ///
    ///////////////////////////////////////////////////////////////////////////////

    /// @notice Voting period duration (10 minutes for testing)
    uint256 public constant VOTING_PERIOD = 10 minutes;

    // No minimum stake - users can stake any amount or nothing

    /// @notice Maximum facts to process in getStats (gas limit protection)
    uint256 public constant MAX_STATS_FACTS = 1000;

    /// @notice Counter for fact IDs
    uint256 public factCount;

    /// @notice Fact structure
    struct Fact {
        uint256 id;
        address creator;
        string walrusBlobId;        // Reference to Walrus storage
        uint256 creatorStake;       // ETH staked by creator
        uint256 capVotes;           // Number of CAP votes
        uint256 noCapVotes;         // Number of NO CAP votes
        uint256 totalCapStake;      // Total ETH staked on CAP
        uint256 totalNoCapStake;    // Total ETH staked on NO CAP
        uint256 createdAt;
        uint256 deadline;           // When voting ends (createdAt + 10 minutes)
        bool resolved;
        bool outcome;               // true = NO CAP (true), false = CAP (false)
        uint256 totalRewards;       // Total rewards distributed
    }

    /// @notice Vote structure
    struct Vote {
        address voter;
        bool vote;                  // true = NO CAP (true), false = CAP (false)
        uint256 stake;              // ETH staked with this vote
        uint256 timestamp;
    }

    /// @notice Mapping from fact ID to fact data
    mapping(uint256 => Fact) public facts;

    /// @notice Mapping from fact ID to array of votes
    mapping(uint256 => Vote[]) public factVotes;

    /// @notice Mapping from fact ID to voter address to voted status
    mapping(uint256 => mapping(address => bool)) public hasVoted;

    /// @notice User withdrawable balances (from winning stakes)
    mapping(address => uint256) public withdrawableBalance;

    ///////////////////////////////////////////////////////////////////////////////
    ///                               CONSTRUCTOR                              ///
    ///////////////////////////////////////////////////////////////////////////////

    constructor() {
        // No World ID setup needed
    }

    ///////////////////////////////////////////////////////////////////////////////
    ///                              FACT MANAGEMENT                           ///
    ///////////////////////////////////////////////////////////////////////////////

    /// @notice Create a new fact with optional stake (NO VERIFICATION REQUIRED)
    /// @param walrusBlobId The Walrus blob ID containing the fact content
    /// @return factId The ID of the newly created fact
    function createFact(string calldata walrusBlobId) 
        external 
        payable 
        returns (uint256 factId) 
    {
        // Validate Walrus blob ID
        if (bytes(walrusBlobId).length == 0) revert InvalidWalrusBlobId();
        
        // No minimum stake validation - any amount is allowed

        factId = factCount++;
        uint256 deadline = block.timestamp + VOTING_PERIOD;

        // Initialize fact with creator's vote counted properly
        facts[factId] = Fact({
            id: factId,
            creator: msg.sender,
            walrusBlobId: walrusBlobId,
            creatorStake: msg.value,
            capVotes: msg.value > 0 ? 1 : 0,  // Count creator as voter if they staked
            noCapVotes: 0,
            totalCapStake: msg.value,
            totalNoCapStake: 0,
            createdAt: block.timestamp,
            deadline: deadline,
            resolved: false,
            outcome: false,
            totalRewards: 0
        });

        // Add creator as voter if they staked
        if (msg.value > 0) {
            factVotes[factId].push(Vote({
                voter: msg.sender,
                vote: true,  // Creator automatically votes NO CAP (believes fact is true)
                stake: msg.value,
                timestamp: block.timestamp
            }));
            hasVoted[factId][msg.sender] = true;
        }

        emit FactCreated(factId, msg.sender, walrusBlobId, msg.value, block.timestamp);
    }

    /// @notice Vote on a fact with optional stake (NO VERIFICATION REQUIRED)
    /// @param factId The ID of the fact to vote on
    /// @param vote true for NO CAP (true), false for CAP (false)
    function voteOnFact(uint256 factId, bool vote) external payable {
        // Check if fact exists
        if (factId >= factCount) revert FactNotFound();
        
        Fact storage fact = facts[factId];
        
        // Check if fact is already resolved
        if (fact.resolved) revert FactAlreadyResolved();
        
        // Check if user has already voted
        if (hasVoted[factId][msg.sender]) revert AlreadyVoted();
        
        // No minimum stake validation - any amount is allowed

        // Record the vote
        factVotes[factId].push(Vote({
            voter: msg.sender,
            vote: vote,
            stake: msg.value,
            timestamp: block.timestamp
        }));

        // Update vote tracking
        hasVoted[factId][msg.sender] = true;

        // Update vote counts and stakes
        if (vote) {
            fact.capVotes++;
            fact.totalCapStake += msg.value;
        } else {
            fact.noCapVotes++;
            fact.totalNoCapStake += msg.value;
        }

        emit VoteCast(factId, msg.sender, vote, msg.value, block.timestamp);

        // Check if voting period has ended and resolve if needed
        if (block.timestamp >= fact.deadline) {
            _resolveFact(factId);
        }
    }

    /// @notice Resolve a fact after voting period ends
    /// @param factId The ID of the fact to resolve
    function resolveFact(uint256 factId) external {
        if (factId >= factCount) revert FactNotFound();
        
        Fact storage fact = facts[factId];
        
        if (fact.resolved) revert FactAlreadyResolved();
        if (block.timestamp < fact.deadline) revert VotingPeriodNotEnded();

        _resolveFact(factId);
    }

    /// @notice Internal function to resolve a fact
    /// @param factId The ID of the fact to resolve
    function _resolveFact(uint256 factId) internal {
        Fact storage fact = facts[factId];
        
        // If votes are equal, wait for next vote (don't resolve)
        if (fact.capVotes == fact.noCapVotes) {
            emit FactTied(factId, fact.capVotes, fact.noCapVotes, block.timestamp);
            return; // Wait for tie-breaker vote
        }

        // Determine outcome based on vote count
        bool outcome = fact.capVotes > fact.noCapVotes;
        fact.outcome = outcome;
        fact.resolved = true;

        // Calculate total reward pool
        uint256 totalPool = fact.totalCapStake + fact.totalNoCapStake;
        fact.totalRewards = totalPool;

        // Distribute rewards to winning side
        if (totalPool > 0) {
            _distributeRewards(factId, outcome, totalPool);
        }

        emit FactResolved(factId, outcome, totalPool, block.timestamp);
    }

    /// @notice Internal function to distribute rewards
    /// @param factId The ID of the fact
    /// @param outcome The resolved outcome (true = NO CAP won, false = CAP won)
    /// @param totalPool Total ETH to distribute
    function _distributeRewards(uint256 factId, bool outcome, uint256 totalPool) internal {
        Fact storage fact = facts[factId];
        Vote[] storage votes = factVotes[factId];

        uint256 winningStake = outcome ? fact.totalCapStake : fact.totalNoCapStake;
        
        // If no winning stake, return everything to creator (edge case)
        if (winningStake == 0) {
            withdrawableBalance[fact.creator] += totalPool;
            return;
        }

        // Distribute proportionally to ALL winning voters
        for (uint256 i = 0; i < votes.length; i++) {
            Vote storage vote = votes[i];
            
            // Only reward voters who voted for the winning side and staked
            if (vote.vote == outcome && vote.stake > 0) {
                uint256 reward = (vote.stake * totalPool) / winningStake;
                withdrawableBalance[vote.voter] += reward;
            }
        }
    }

    /// @notice Withdraw accumulated rewards
    function withdrawRewards() external {
        uint256 amount = withdrawableBalance[msg.sender];
        if (amount == 0) return; // Simply return instead of reverting

        // CEI pattern: Checks-Effects-Interactions (prevents reentrancy)
        withdrawableBalance[msg.sender] = 0;
        
        (bool success, ) = payable(msg.sender).call{value: amount}("");
        if (!success) {
            // Restore balance if transfer fails
            withdrawableBalance[msg.sender] = amount;
            return; // Return instead of reverting
        }

        emit StakeWithdrawn(msg.sender, amount);
    }

    ///////////////////////////////////////////////////////////////////////////////
    ///                              VIEW FUNCTIONS                            ///
    ///////////////////////////////////////////////////////////////////////////////

    /// @notice Get fact details
    /// @param factId The ID of the fact
    /// @return fact The fact data
    function getFact(uint256 factId) external view returns (Fact memory fact) {
        if (factId >= factCount) revert FactNotFound();
        return facts[factId];
    }

    /// @notice Get all votes for a fact
    /// @param factId The ID of the fact
    /// @return votes Array of votes
    function getFactVotes(uint256 factId) external view returns (Vote[] memory votes) {
        if (factId >= factCount) revert FactNotFound();
        return factVotes[factId];
    }

    /// @notice Check if voting period has ended for a fact
    /// @param factId The ID of the fact
    /// @return ended Whether voting has ended (true if invalid factId)
    function isVotingEnded(uint256 factId) external view returns (bool ended) {
        if (factId >= factCount) return true; // Return true for invalid facts
        return block.timestamp >= facts[factId].deadline;
    }

    /// @notice Get time remaining for voting
    /// @param factId The ID of the fact
    /// @return timeRemaining Seconds remaining (0 if ended or invalid)
    function getTimeRemaining(uint256 factId) external view returns (uint256 timeRemaining) {
        if (factId >= factCount) return 0; // Return 0 instead of reverting
        
        uint256 deadline = facts[factId].deadline;
        if (block.timestamp >= deadline) {
            return 0;
        }
        return deadline - block.timestamp;
    }

    /// @notice Get contract statistics (WITH GAS LIMIT PROTECTION)
    /// @return totalFacts Total number of facts created
    /// @return totalResolved Total number of resolved facts
    /// @return totalStaked Total ETH currently staked
    function getStats() external view returns (
        uint256 totalFacts,
        uint256 totalResolved,
        uint256 totalStaked
    ) {
        totalFacts = factCount;
        
        uint256 resolved = 0;
        uint256 staked = 0;
        
        // Limit loop to prevent gas issues
        uint256 maxFacts = factCount > MAX_STATS_FACTS ? MAX_STATS_FACTS : factCount;
        
        for (uint256 i = 0; i < maxFacts; i++) {
            if (facts[i].resolved) {
                resolved++;
            } else {
                staked += facts[i].totalCapStake + facts[i].totalNoCapStake;
            }
        }
        
        return (totalFacts, resolved, staked);
    }

    /// @notice Get paginated facts for frontend display
    /// @param startIndex Starting fact ID
    /// @param pageSize Number of facts to return
    /// @return factsArray Array of facts
    function getPaginatedFacts(uint256 startIndex, uint256 pageSize) external view returns (Fact[] memory factsArray) {
        // Handle edge cases gracefully
        if (startIndex >= factCount || pageSize == 0) {
            return new Fact[](0);
        }

        uint256 endIndex = startIndex + pageSize;
        if (endIndex > factCount) {
            endIndex = factCount;
        }

        factsArray = new Fact[](endIndex - startIndex);
        for (uint256 i = startIndex; i < endIndex; i++) {
            factsArray[i - startIndex] = facts[i];
        }
        return factsArray;
    }

    /// @notice Check if a user has voted on a specific fact
    /// @param factId The ID of the fact
    /// @param user The user's address
    /// @return voted Whether the user has voted
    function hasUserVoted(uint256 factId, address user) external view returns (bool voted) {
        if (factId >= factCount) return false; // Return false instead of reverting
        return hasVoted[factId][user];
    }

    /// @notice Get user's withdrawable balance
    /// @param user The user's address
    /// @return balance The withdrawable balance
    function getWithdrawableBalance(address user) external view returns (uint256 balance) {
        return withdrawableBalance[user];
    }
}

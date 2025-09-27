// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract NOCAPFactChecker {
    // Errors
    error InvalidWalrusBlobId();
    error FactNotFound();
    error FactAlreadyResolved();
    error VotingPeriodNotEnded();
    error AlreadyVoted();

    // Events
    event FactCreated(uint256 indexed factId, address indexed creator, string walrusBlobId, uint256 stake, uint256 timestamp);
    event VoteCast(uint256 indexed factId, address indexed voter, bool vote, uint256 stake, uint256 timestamp);
    event FactResolved(uint256 indexed factId, bool outcome, uint256 totalRewards, uint256 timestamp);
    event FactTied(uint256 indexed factId, uint256 capVotes, uint256 noCapVotes, uint256 timestamp);
    event StakeWithdrawn(address indexed user, uint256 amount);

    // Constants
    uint256 public constant VOTING_PERIOD = 10 minutes;
    uint256 public constant MAX_STATS_FACTS = 1000;

    // State
    uint256 public factCount;

    // Structs
    struct Fact {
        uint256 id;
        address creator;
        string walrusBlobId;
        uint256 creatorStake;
        uint256 capVotes;
        uint256 noCapVotes;
        uint256 totalCapStake;
        uint256 totalNoCapStake;
        uint256 createdAt;
        uint256 deadline;
        bool resolved;
        bool outcome;
        uint256 totalRewards;
    }

    struct Vote {
        address voter;
        bool vote;
        uint256 stake;
        uint256 timestamp;
    }

    // Mappings
    mapping(uint256 => Fact) public facts;
    mapping(uint256 => Vote[]) public factVotes;
    mapping(uint256 => mapping(address => bool)) public hasVoted;
    mapping(address => uint256) public withdrawableBalance;

    constructor() {}

    function createFact(string calldata walrusBlobId) external payable returns (uint256) {
        if (bytes(walrusBlobId).length == 0) revert InvalidWalrusBlobId();
        
        uint256 factId = factCount++;
        
        facts[factId].id = factId;
        facts[factId].creator = msg.sender;
        facts[factId].walrusBlobId = walrusBlobId;
        facts[factId].creatorStake = msg.value;
        facts[factId].capVotes = msg.value > 0 ? 1 : 0;
        facts[factId].totalCapStake = msg.value;
        facts[factId].createdAt = block.timestamp;
        facts[factId].deadline = block.timestamp + VOTING_PERIOD;

        if (msg.value > 0) {
            factVotes[factId].push(Vote(msg.sender, true, msg.value, block.timestamp));
            hasVoted[factId][msg.sender] = true;
        }

        emit FactCreated(factId, msg.sender, walrusBlobId, msg.value, block.timestamp);
        return factId;
    }

    function voteOnFact(uint256 factId, bool vote) external payable {
        if (factId >= factCount) revert FactNotFound();
        if (facts[factId].resolved) revert FactAlreadyResolved();
        if (hasVoted[factId][msg.sender]) revert AlreadyVoted();

        factVotes[factId].push(Vote(msg.sender, vote, msg.value, block.timestamp));
        hasVoted[factId][msg.sender] = true;

        if (vote) {
            facts[factId].capVotes++;
            facts[factId].totalCapStake += msg.value;
        } else {
            facts[factId].noCapVotes++;
            facts[factId].totalNoCapStake += msg.value;
        }

        emit VoteCast(factId, msg.sender, vote, msg.value, block.timestamp);

        if (block.timestamp >= facts[factId].deadline) {
            _resolveFact(factId);
        }
    }

    function resolveFact(uint256 factId) external {
        if (factId >= factCount) revert FactNotFound();
        if (facts[factId].resolved) revert FactAlreadyResolved();
        if (block.timestamp < facts[factId].deadline) revert VotingPeriodNotEnded();
        _resolveFact(factId);
    }

    function _resolveFact(uint256 factId) internal {
        if (facts[factId].capVotes == facts[factId].noCapVotes) {
            emit FactTied(factId, facts[factId].capVotes, facts[factId].noCapVotes, block.timestamp);
            return;
        }

        bool outcome = facts[factId].capVotes > facts[factId].noCapVotes;
        facts[factId].outcome = outcome;
        facts[factId].resolved = true;

        uint256 totalPool = facts[factId].totalCapStake + facts[factId].totalNoCapStake;
        facts[factId].totalRewards = totalPool;

        if (totalPool > 0) {
            _distributeRewards(factId, outcome, totalPool);
        }

        emit FactResolved(factId, outcome, totalPool, block.timestamp);
    }

    function _distributeRewards(uint256 factId, bool outcome, uint256 totalPool) internal {
        uint256 winningStake = outcome ? facts[factId].totalCapStake : facts[factId].totalNoCapStake;
        
        if (winningStake == 0) {
            withdrawableBalance[facts[factId].creator] += totalPool;
            return;
        }

        Vote[] storage votes = factVotes[factId];
        for (uint256 i = 0; i < votes.length; i++) {
            if (votes[i].vote == outcome && votes[i].stake > 0) {
                withdrawableBalance[votes[i].voter] += (votes[i].stake * totalPool) / winningStake;
            }
        }
    }

    function withdrawRewards() external {
        uint256 amount = withdrawableBalance[msg.sender];
        if (amount == 0) return;

        withdrawableBalance[msg.sender] = 0;
        
        (bool success, ) = payable(msg.sender).call{value: amount}("");
        if (!success) {
            withdrawableBalance[msg.sender] = amount;
            return;
        }

        emit StakeWithdrawn(msg.sender, amount);
    }

    // View functions
    function getFact(uint256 factId) external view returns (Fact memory) {
        if (factId >= factCount) revert FactNotFound();
        return facts[factId];
    }

    function getFactVotes(uint256 factId) external view returns (Vote[] memory) {
        if (factId >= factCount) revert FactNotFound();
        return factVotes[factId];
    }

    function isVotingEnded(uint256 factId) external view returns (bool) {
        if (factId >= factCount) return true;
        return block.timestamp >= facts[factId].deadline;
    }

    function getTimeRemaining(uint256 factId) external view returns (uint256) {
        if (factId >= factCount) return 0;
        if (block.timestamp >= facts[factId].deadline) return 0;
        return facts[factId].deadline - block.timestamp;
    }

    function getStats() external view returns (uint256, uint256, uint256) {
        uint256 resolved = 0;
        uint256 staked = 0;
        uint256 maxFacts = factCount > MAX_STATS_FACTS ? MAX_STATS_FACTS : factCount;
        
        for (uint256 i = 0; i < maxFacts; i++) {
            if (facts[i].resolved) {
                resolved++;
            } else {
                staked += facts[i].totalCapStake + facts[i].totalNoCapStake;
            }
        }
        
        return (factCount, resolved, staked);
    }

    function getPaginatedFacts(uint256 startIndex, uint256 pageSize) external view returns (Fact[] memory) {
        if (startIndex >= factCount || pageSize == 0) {
            return new Fact[](0);
        }

        uint256 endIndex = startIndex + pageSize;
        if (endIndex > factCount) {
            endIndex = factCount;
        }

        Fact[] memory result = new Fact[](endIndex - startIndex);
        for (uint256 i = startIndex; i < endIndex; i++) {
            result[i - startIndex] = facts[i];
        }
        return result;
    }

    function hasUserVoted(uint256 factId, address user) external view returns (bool) {
        if (factId >= factCount) return false;
        return hasVoted[factId][user];
    }

    function getWithdrawableBalance(address user) external view returns (uint256) {
        return withdrawableBalance[user];
    }
}

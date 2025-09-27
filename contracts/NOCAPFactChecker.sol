// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract NOCAPFactChecker {
    error InvalidWalrusBlobId();
    error FactNotFound();
    error FactAlreadyResolved();
    error VotingPeriodNotEnded();
    error AlreadyVoted();

    event FactCreated(uint256 indexed factId, address indexed creator, string walrusBlobId, uint256 stake, uint256 timestamp);
    event VoteCast(uint256 indexed factId, address indexed voter, bool vote, uint256 stake, uint256 timestamp);
    event FactResolved(uint256 indexed factId, bool outcome, uint256 totalRewards, uint256 timestamp);
    event FactTied(uint256 indexed factId, uint256 capVotes, uint256 noCapVotes, uint256 timestamp);
    event StakeWithdrawn(address indexed user, uint256 amount);

    uint256 public constant VOTING_PERIOD = 10 minutes;
    uint256 public factCount;

    // Split fact data into separate mappings to reduce struct size
    mapping(uint256 => address) public factCreator;
    mapping(uint256 => string) public factWalrusBlobId;
    mapping(uint256 => uint256) public factCreatorStake;
    mapping(uint256 => uint256) public factCapVotes;
    mapping(uint256 => uint256) public factNoCapVotes;
    mapping(uint256 => uint256) public factTotalCapStake;
    mapping(uint256 => uint256) public factTotalNoCapStake;
    mapping(uint256 => uint256) public factCreatedAt;
    mapping(uint256 => uint256) public factDeadline;
    mapping(uint256 => bool) public factResolved;
    mapping(uint256 => bool) public factOutcome;
    mapping(uint256 => uint256) public factTotalRewards;

    struct Vote {
        address voter;
        bool vote;
        uint256 stake;
        uint256 timestamp;
    }

    mapping(uint256 => Vote[]) public factVotes;
    mapping(uint256 => mapping(address => bool)) public hasVoted;
    mapping(address => uint256) public withdrawableBalance;

    function createFact(string calldata walrusBlobId) external payable returns (uint256) {
        require(bytes(walrusBlobId).length > 0, "Invalid blob ID");
        
        uint256 factId = factCount;
        factCount++;
        
        factCreator[factId] = msg.sender;
        factWalrusBlobId[factId] = walrusBlobId;
        factCreatorStake[factId] = msg.value;
        factCreatedAt[factId] = block.timestamp;
        factDeadline[factId] = block.timestamp + VOTING_PERIOD;
        
        if (msg.value > 0) {
            factCapVotes[factId] = 1;
            factTotalCapStake[factId] = msg.value;
            factVotes[factId].push(Vote(msg.sender, true, msg.value, block.timestamp));
            hasVoted[factId][msg.sender] = true;
        }

        emit FactCreated(factId, msg.sender, walrusBlobId, msg.value, block.timestamp);
        return factId;
    }

    function voteOnFact(uint256 factId, bool vote) external payable {
        require(factId < factCount, "Fact not found");
        require(!factResolved[factId], "Already resolved");
        require(!hasVoted[factId][msg.sender], "Already voted");

        factVotes[factId].push(Vote(msg.sender, vote, msg.value, block.timestamp));
        hasVoted[factId][msg.sender] = true;

        if (vote) {
            factCapVotes[factId]++;
            factTotalCapStake[factId] += msg.value;
        } else {
            factNoCapVotes[factId]++;
            factTotalNoCapStake[factId] += msg.value;
        }

        emit VoteCast(factId, msg.sender, vote, msg.value, block.timestamp);

        if (block.timestamp >= factDeadline[factId]) {
            _resolveFact(factId);
        }
    }

    function resolveFact(uint256 factId) external {
        require(factId < factCount, "Fact not found");
        require(!factResolved[factId], "Already resolved");
        require(block.timestamp >= factDeadline[factId], "Voting not ended");
        _resolveFact(factId);
    }

    function _resolveFact(uint256 factId) internal {
        uint256 capVotes = factCapVotes[factId];
        uint256 noCapVotes = factNoCapVotes[factId];
        
        if (capVotes == noCapVotes) {
            emit FactTied(factId, capVotes, noCapVotes, block.timestamp);
            return;
        }

        bool outcome = capVotes > noCapVotes;
        factOutcome[factId] = outcome;
        factResolved[factId] = true;

        uint256 totalPool = factTotalCapStake[factId] + factTotalNoCapStake[factId];
        factTotalRewards[factId] = totalPool;

        if (totalPool > 0) {
            _distributeRewards(factId, outcome, totalPool);
        }

        emit FactResolved(factId, outcome, totalPool, block.timestamp);
    }

    function _distributeRewards(uint256 factId, bool outcome, uint256 totalPool) internal {
        uint256 winningStake = outcome ? factTotalCapStake[factId] : factTotalNoCapStake[factId];
        
        if (winningStake == 0) {
            withdrawableBalance[factCreator[factId]] += totalPool;
            return;
        }

        Vote[] storage votes = factVotes[factId];
        uint256 length = votes.length;
        
        for (uint256 i; i < length;) {
            Vote storage v = votes[i];
            if (v.vote == outcome && v.stake > 0) {
                withdrawableBalance[v.voter] += (v.stake * totalPool) / winningStake;
            }
            unchecked { ++i; }
        }
    }

    function withdrawRewards() external {
        uint256 amount = withdrawableBalance[msg.sender];
        require(amount > 0, "No rewards");

        withdrawableBalance[msg.sender] = 0;
        
        (bool success,) = payable(msg.sender).call{value: amount}("");
        require(success, "Transfer failed");

        emit StakeWithdrawn(msg.sender, amount);
    }

    // Simplified view functions
    function getFact(uint256 factId) external view returns (
        uint256 id,
        address creator,
        string memory walrusBlobId,
        uint256 creatorStake,
        uint256 capVotes,
        uint256 noCapVotes,
        uint256 totalCapStake,
        uint256 totalNoCapStake,
        uint256 createdAt,
        uint256 deadline,
        bool resolved,
        bool outcome,
        uint256 totalRewards
    ) {
        require(factId < factCount, "Fact not found");
        return (
            factId,
            factCreator[factId],
            factWalrusBlobId[factId],
            factCreatorStake[factId],
            factCapVotes[factId],
            factNoCapVotes[factId],
            factTotalCapStake[factId],
            factTotalNoCapStake[factId],
            factCreatedAt[factId],
            factDeadline[factId],
            factResolved[factId],
            factOutcome[factId],
            factTotalRewards[factId]
        );
    }

    function getFactVotes(uint256 factId) external view returns (Vote[] memory) {
        require(factId < factCount, "Fact not found");
        return factVotes[factId];
    }

    function isVotingEnded(uint256 factId) external view returns (bool) {
        if (factId >= factCount) return true;
        return block.timestamp >= factDeadline[factId];
    }

    function getTimeRemaining(uint256 factId) external view returns (uint256) {
        if (factId >= factCount) return 0;
        if (block.timestamp >= factDeadline[factId]) return 0;
        return factDeadline[factId] - block.timestamp;
    }

    function getStats() external view returns (uint256 total, uint256 resolved, uint256 staked) {
        total = factCount;
        uint256 maxCheck = factCount > 1000 ? 1000 : factCount;
        
        for (uint256 i; i < maxCheck;) {
            if (factResolved[i]) {
                resolved++;
            } else {
                staked += factTotalCapStake[i] + factTotalNoCapStake[i];
            }
            unchecked { ++i; }
        }
    }

    function hasUserVoted(uint256 factId, address user) external view returns (bool) {
        if (factId >= factCount) return false;
        return hasVoted[factId][user];
    }

    function getWithdrawableBalance(address user) external view returns (uint256) {
        return withdrawableBalance[user];
    }
}
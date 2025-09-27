// Contract-based fact types that match the smart contract structure

export interface ContractFact {
  id: number;
  submitter: string;
  title: string;
  description: string;
  stakeAmount: bigint;
  votesTrue: number;
  votesFalse: number;
  totalStaked: bigint;
  resolved: boolean;
  outcome: boolean;
  createdAt: number;
  deadline: number;
  rewardPool: bigint;
}

export interface ContractVote {
  voter: string;
  vote: boolean;
  stakeAmount: bigint;
  timestamp: number;
}

export interface ContractUserProfile {
  isVerified: boolean;
  reputation: number;
  factsSubmitted: number;
  factsVerified: number;
  factsFalse: number;
  votesCorrect: number;
  votesIncorrect: number;
  totalStaked: bigint;
  rewardsEarned: bigint;
  joinedAt: number;
  lastActive: number;
}

// Display types for frontend
export interface DisplayFact {
  id: string;
  title: string;
  description: string;
  submitter: string;
  submitterReputation?: number;
  votesTrue: number;
  votesFalse: number;
  stakeAmount: string; // Formatted ETH amount
  totalStaked: string; // Formatted ETH amount
  status: 'voting' | 'resolved-true' | 'resolved-false';
  outcome?: boolean;
  deadline: Date;
  createdAt: Date;
  totalRewards: string; // Formatted ETH amount
  timeRemaining?: string;
  canVote: boolean;
  hasUserVoted?: boolean;
  userVote?: boolean;
}

export interface VotingStats {
  totalVotes: number;
  truePercentage: number;
  falsePercentage: number;
  totalStaked: string;
  averageStake: string;
  leadingVote: 'true' | 'false' | 'tie';
}

// Utility functions
export function contractFactToDisplayFact(
  contractFact: ContractFact, 
  userProfile?: ContractUserProfile,
  hasUserVoted?: boolean,
  userVote?: boolean
): DisplayFact {
  const now = Date.now();
  const deadline = new Date(contractFact.deadline * 1000);
  const createdAt = new Date(contractFact.createdAt * 1000);
  const timeRemaining = deadline.getTime() - now;
  
  let status: DisplayFact['status'];
  if (contractFact.resolved) {
    status = contractFact.outcome ? 'resolved-true' : 'resolved-false';
  } else {
    status = 'voting';
  }

  return {
    id: contractFact.id.toString(),
    title: contractFact.title,
    description: contractFact.description,
    submitter: contractFact.submitter,
    votesTrue: contractFact.votesTrue,
    votesFalse: contractFact.votesFalse,
    stakeAmount: formatEther(contractFact.stakeAmount),
    totalStaked: formatEther(contractFact.totalStaked),
    status,
    outcome: contractFact.resolved ? contractFact.outcome : undefined,
    deadline,
    createdAt,
    totalRewards: formatEther(contractFact.rewardPool),
    timeRemaining: timeRemaining > 0 ? formatTimeRemaining(timeRemaining) : 'Ended',
    canVote: !contractFact.resolved && timeRemaining > 0 && !hasUserVoted,
    hasUserVoted,
    userVote
  };
}

export function calculateVotingStats(fact: ContractFact): VotingStats {
  const totalVotes = fact.votesTrue + fact.votesFalse;
  const truePercentage = totalVotes > 0 ? (fact.votesTrue / totalVotes) * 100 : 0;
  const falsePercentage = totalVotes > 0 ? (fact.votesFalse / totalVotes) * 100 : 0;
  
  let leadingVote: VotingStats['leadingVote'];
  if (fact.votesTrue > fact.votesFalse) {
    leadingVote = 'true';
  } else if (fact.votesFalse > fact.votesTrue) {
    leadingVote = 'false';
  } else {
    leadingVote = 'tie';
  }

  const averageStake = totalVotes > 0 ? 
    formatEther(fact.totalStaked / BigInt(totalVotes)) : '0';

  return {
    totalVotes,
    truePercentage: Math.round(truePercentage),
    falsePercentage: Math.round(falsePercentage),
    totalStaked: formatEther(fact.totalStaked),
    averageStake,
    leadingVote
  };
}

// Helper functions
function formatEther(wei: bigint): string {
  return (Number(wei) / 1e18).toFixed(4);
}

function formatTimeRemaining(ms: number): string {
  const hours = Math.floor(ms / (1000 * 60 * 60));
  const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
  
  if (hours > 24) {
    const days = Math.floor(hours / 24);
    return `${days}d ${hours % 24}h`;
  } else if (hours > 0) {
    return `${hours}h ${minutes}m`;
  } else {
    return `${minutes}m`;
  }
}

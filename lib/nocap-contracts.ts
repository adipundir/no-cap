// Clean Contract Service for NOCAP (No on-chain verification)
import { MiniKit } from '@worldcoin/minikit-js'

// World Chain Mainnet Contract Addresses
export const WORLD_CHAIN_CONTRACTS = {
  // NOCAP Contract (clean version without World ID verification)
  NOCAP: process.env.NEXT_PUBLIC_NOCAP_CONTRACT_ADDRESS || '0x0000000000000000000000000000000000000000',
} as const

// World Chain Network Configuration
export const WORLD_CHAIN_CONFIG = {
  chainId: 480,
  name: 'World Chain',
  rpcUrl: process.env.NEXT_PUBLIC_WORLD_CHAIN_RPC || 'https://worldchain-mainnet.g.alchemy.com/public',
  blockExplorerUrl: 'https://worldscan.org',
} as const

// ABI for the clean NOCAP contract (no World ID verification)
export const NOCAP_ABI = [
  // Fact creation
  {
    "inputs": [
      {"internalType": "string", "name": "walrusBlobId", "type": "string"}
    ],
    "name": "createFact",
    "outputs": [{"internalType": "uint256", "name": "factId", "type": "uint256"}],
    "stateMutability": "payable",
    "type": "function"
  },

  // Voting
  {
    "inputs": [
      {"internalType": "uint256", "name": "factId", "type": "uint256"},
      {"internalType": "bool", "name": "vote", "type": "bool"}
    ],
    "name": "voteOnFact",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },

  // Resolution
  {
    "inputs": [
      {"internalType": "uint256", "name": "factId", "type": "uint256"}
    ],
    "name": "resolveFact",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },

  // Withdraw rewards
  {
    "inputs": [],
    "name": "withdrawRewards",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },

  // View functions
  {
    "inputs": [{"internalType": "uint256", "name": "factId", "type": "uint256"}],
    "name": "getFact",
    "outputs": [
      {
        "components": [
          {"internalType": "uint256", "name": "id", "type": "uint256"},
          {"internalType": "address", "name": "creator", "type": "address"},
          {"internalType": "string", "name": "walrusBlobId", "type": "string"},
          {"internalType": "uint256", "name": "creatorStake", "type": "uint256"},
          {"internalType": "uint256", "name": "capVotes", "type": "uint256"},
          {"internalType": "uint256", "name": "noCapVotes", "type": "uint256"},
          {"internalType": "uint256", "name": "totalCapStake", "type": "uint256"},
          {"internalType": "uint256", "name": "totalNoCapStake", "type": "uint256"},
          {"internalType": "uint256", "name": "createdAt", "type": "uint256"},
          {"internalType": "uint256", "name": "deadline", "type": "uint256"},
          {"internalType": "bool", "name": "resolved", "type": "bool"},
          {"internalType": "bool", "name": "outcome", "type": "bool"},
          {"internalType": "uint256", "name": "totalRewards", "type": "uint256"}
        ],
        "internalType": "struct NOCAPFactChecker.Fact",
        "name": "fact",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "factCount",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "address", "name": "user", "type": "address"}],
    "name": "getWithdrawableBalance",
    "outputs": [{"internalType": "uint256", "name": "balance", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "factId", "type": "uint256"}],
    "name": "isVotingEnded",
    "outputs": [{"internalType": "bool", "name": "ended", "type": "bool"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "factId", "type": "uint256"}],
    "name": "getTimeRemaining",
    "outputs": [{"internalType": "uint256", "name": "timeRemaining", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getStats",
    "outputs": [
      {"internalType": "uint256", "name": "totalFacts", "type": "uint256"},
      {"internalType": "uint256", "name": "totalResolved", "type": "uint256"},
      {"internalType": "uint256", "name": "totalStaked", "type": "uint256"}
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "uint256", "name": "startIndex", "type": "uint256"},
      {"internalType": "uint256", "name": "pageSize", "type": "uint256"}
    ],
    "name": "getPaginatedFacts",
    "outputs": [
      {
        "components": [
          {"internalType": "uint256", "name": "id", "type": "uint256"},
          {"internalType": "address", "name": "creator", "type": "address"},
          {"internalType": "string", "name": "walrusBlobId", "type": "string"},
          {"internalType": "uint256", "name": "creatorStake", "type": "uint256"},
          {"internalType": "uint256", "name": "capVotes", "type": "uint256"},
          {"internalType": "uint256", "name": "noCapVotes", "type": "uint256"},
          {"internalType": "uint256", "name": "totalCapStake", "type": "uint256"},
          {"internalType": "uint256", "name": "totalNoCapStake", "type": "uint256"},
          {"internalType": "uint256", "name": "createdAt", "type": "uint256"},
          {"internalType": "uint256", "name": "deadline", "type": "uint256"},
          {"internalType": "bool", "name": "resolved", "type": "bool"},
          {"internalType": "bool", "name": "outcome", "type": "bool"},
          {"internalType": "uint256", "name": "totalRewards", "type": "uint256"}
        ],
        "internalType": "struct NOCAPFactChecker.Fact[]",
        "name": "factsArray",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "uint256", "name": "factId", "type": "uint256"},
      {"internalType": "address", "name": "user", "type": "address"}
    ],
    "name": "hasUserVoted",
    "outputs": [{"internalType": "bool", "name": "voted", "type": "bool"}],
    "stateMutability": "view",
    "type": "function"
  }
]

/**
 * Clean Contract Service for NOCAP
 * Handles fact creation and voting (World ID verification done off-chain)
 */
export class NOCAPContractService {
  
  /**
   * Create a new fact with proof of humanhood verification
   */
  static async createFactWithProof(
    walrusBlobId: string,
    stakeAmount?: string
  ): Promise<string> {
    try {
      // Send transaction to create fact on-chain
      const stakeValue = stakeAmount && parseFloat(stakeAmount) > 0 ? stakeAmount : '0'

      const { finalPayload } = await MiniKit.commandsAsync.sendTransaction({
        transaction: [
          {
            address: WORLD_CHAIN_CONTRACTS.NOCAP,
            abi: NOCAP_ABI,
            functionName: 'createFact',
            args: [walrusBlobId],
            value: stakeValue,
          },
        ],
      })

      if (finalPayload.status === 'error') {
        throw new Error(finalPayload.error_code || 'Transaction failed')
      }

      return finalPayload.transaction_id || 'Transaction submitted'
    } catch (error: any) {
      console.error('Create fact error:', error)
      throw new Error(error.message || 'Failed to create fact')
    }
  }

  /**
   * Vote on a fact with proof of humanhood verification
   */
  static async voteOnFactWithProof(
    factId: string,
    vote: boolean,
    stakeAmount?: string
  ): Promise<string> {
    try {
      const stakeValue = stakeAmount && parseFloat(stakeAmount) > 0 ? stakeAmount : '0'

      const { finalPayload } = await MiniKit.commandsAsync.sendTransaction({
        transaction: [
          {
            address: WORLD_CHAIN_CONTRACTS.NOCAP,
            abi: NOCAP_ABI,
            functionName: 'voteOnFact',
            args: [factId, vote],
            value: stakeValue,
          },
        ],
      })

      if (finalPayload.status === 'error') {
        throw new Error(finalPayload.error_code || 'Vote transaction failed')
      }

      return finalPayload.transaction_id || 'Vote submitted'
    } catch (error: any) {
      console.error('Vote error:', error)
      throw new Error(error.message || 'Failed to vote on fact')
    }
  }

  /**
   * Resolve a fact after voting period
   */
  static async resolveFact(factId: string): Promise<string> {
    try {
      const { finalPayload } = await MiniKit.commandsAsync.sendTransaction({
        transaction: [
          {
            address: WORLD_CHAIN_CONTRACTS.NOCAP,
            abi: NOCAP_ABI,
            functionName: 'resolveFact',
            args: [factId],
          },
        ],
      })

      if (finalPayload.status === 'error') {
        throw new Error(finalPayload.error_code || 'Resolve transaction failed')
      }

      return finalPayload.transaction_id || 'Fact resolved'
    } catch (error: any) {
      console.error('Resolve fact error:', error)
      throw new Error(error.message || 'Failed to resolve fact')
    }
  }

  /**
   * Withdraw accumulated rewards
   */
  static async withdrawRewards(): Promise<string> {
    try {
      const { finalPayload } = await MiniKit.commandsAsync.sendTransaction({
        transaction: [
          {
            address: WORLD_CHAIN_CONTRACTS.NOCAP,
            abi: NOCAP_ABI,
            functionName: 'withdrawRewards',
            args: [],
          },
        ],
      })

      if (finalPayload.status === 'error') {
        throw new Error(finalPayload.error_code || 'Withdraw transaction failed')
      }

      return finalPayload.transaction_id || 'Rewards withdrawn'
    } catch (error: any) {
      console.error('Withdraw error:', error)
      throw new Error(error.message || 'Failed to withdraw rewards')
    }
  }

  // View functions would be implemented using direct RPC calls
  // since MiniKit doesn't support view function calls directly
  
  /**
   * Get user's withdrawable balance (placeholder)
   */
  static async getWithdrawableBalance(userAddress: string): Promise<string> {
    // This would need to be implemented with a read call to the contract
    // For now, return "0" as placeholder
    return "0"
  }

  /**
   * Get contract statistics (placeholder)
   */
  static async getStats() {
    // This would need to be implemented with a read call to the contract
    // For now, return default values
    return {
      totalFacts: 0,
      totalResolved: 0,
      totalStaked: "0"
    }
  }
}

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

// ABI for the NOCAP contract (actual ABI from successful Remix compilation)
export const NOCAP_ABI = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [],
    "name": "AlreadyVoted",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "walrusBlobId",
        "type": "string"
      }
    ],
    "name": "createFact",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "factId",
        "type": "uint256"
      }
    ],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "FactAlreadyResolved",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "FactNotFound",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "InsufficientStake",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "InvalidStakeAmount",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "InvalidWalrusBlobId",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "TransferFailed",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "VotingPeriodNotEnded",
    "type": "error"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "factId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "creator",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "walrusBlobId",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "stake",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "timestamp",
        "type": "uint256"
      }
    ],
    "name": "FactCreated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "factId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "bool",
        "name": "outcome",
        "type": "bool"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "totalRewards",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "timestamp",
        "type": "uint256"
      }
    ],
    "name": "FactResolved",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "factId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "capVotes",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "noCapVotes",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "timestamp",
        "type": "uint256"
      }
    ],
    "name": "FactTied",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "factId",
        "type": "uint256"
      }
    ],
    "name": "resolveFact",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "StakeWithdrawn",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "factId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "voter",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "bool",
        "name": "vote",
        "type": "bool"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "stake",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "timestamp",
        "type": "uint256"
      }
    ],
    "name": "VoteCast",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "factId",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "vote",
        "type": "bool"
      }
    ],
    "name": "voteOnFact",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "withdrawRewards",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "factCount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "facts",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "creator",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "walrusBlobId",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "creatorStake",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "capVotes",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "noCapVotes",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "totalCapStake",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "totalNoCapStake",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "createdAt",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "deadline",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "resolved",
        "type": "bool"
      },
      {
        "internalType": "bool",
        "name": "outcome",
        "type": "bool"
      },
      {
        "internalType": "uint256",
        "name": "totalRewards",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "factVotes",
    "outputs": [
      {
        "internalType": "address",
        "name": "voter",
        "type": "address"
      },
      {
        "internalType": "bool",
        "name": "vote",
        "type": "bool"
      },
      {
        "internalType": "uint256",
        "name": "stake",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "timestamp",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "factId",
        "type": "uint256"
      }
    ],
    "name": "getFact",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "creator",
            "type": "address"
          },
          {
            "internalType": "string",
            "name": "walrusBlobId",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "creatorStake",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "capVotes",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "noCapVotes",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "totalCapStake",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "totalNoCapStake",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "createdAt",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "deadline",
            "type": "uint256"
          },
          {
            "internalType": "bool",
            "name": "resolved",
            "type": "bool"
          },
          {
            "internalType": "bool",
            "name": "outcome",
            "type": "bool"
          },
          {
            "internalType": "uint256",
            "name": "totalRewards",
            "type": "uint256"
          }
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
    "inputs": [
      {
        "internalType": "uint256",
        "name": "factId",
        "type": "uint256"
      }
    ],
    "name": "getFactVotes",
    "outputs": [
      {
        "components": [
          {
            "internalType": "address",
            "name": "voter",
            "type": "address"
          },
          {
            "internalType": "bool",
            "name": "vote",
            "type": "bool"
          },
          {
            "internalType": "uint256",
            "name": "stake",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "timestamp",
            "type": "uint256"
          }
        ],
        "internalType": "struct NOCAPFactChecker.Vote[]",
        "name": "votes",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "startIndex",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "pageSize",
        "type": "uint256"
      }
    ],
    "name": "getPaginatedFacts",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "creator",
            "type": "address"
          },
          {
            "internalType": "string",
            "name": "walrusBlobId",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "creatorStake",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "capVotes",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "noCapVotes",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "totalCapStake",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "totalNoCapStake",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "createdAt",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "deadline",
            "type": "uint256"
          },
          {
            "internalType": "bool",
            "name": "resolved",
            "type": "bool"
          },
          {
            "internalType": "bool",
            "name": "outcome",
            "type": "bool"
          },
          {
            "internalType": "uint256",
            "name": "totalRewards",
            "type": "uint256"
          }
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
    "inputs": [],
    "name": "getStats",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "totalFacts",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "totalResolved",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "totalStaked",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "factId",
        "type": "uint256"
      }
    ],
    "name": "getTimeRemaining",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "timeRemaining",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "user",
        "type": "address"
      }
    ],
    "name": "getWithdrawableBalance",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "balance",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "factId",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "user",
        "type": "address"
      }
    ],
    "name": "hasUserVoted",
    "outputs": [
      {
        "internalType": "bool",
        "name": "voted",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "hasVoted",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "factId",
        "type": "uint256"
      }
    ],
    "name": "isVotingEnded",
    "outputs": [
      {
        "internalType": "bool",
        "name": "ended",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "MAX_STATS_FACTS",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "VOTING_PERIOD",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "withdrawableBalance",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
] as const

// Types based on the actual contract structure
export interface Fact {
  id: bigint
  creator: string
  walrusBlobId: string
  creatorStake: bigint
  capVotes: bigint
  noCapVotes: bigint
  totalCapStake: bigint
  totalNoCapStake: bigint
  createdAt: bigint
  deadline: bigint
  resolved: boolean
  outcome: boolean
  totalRewards: bigint
}

export interface Vote {
  voter: string
  vote: boolean
  stake: bigint
  timestamp: bigint
}

// Contract interaction service
export class NOCAPContractService {
  private static contractAddress = WORLD_CHAIN_CONTRACTS.NOCAP
  private static rpcUrl = WORLD_CHAIN_CONFIG.rpcUrl

  // Create a fact with optional staking
  static async createFact(walrusBlobId: string, stakeAmount: string = '0') {
    try {
      const payload = {
        transaction: [
          {
            address: this.contractAddress,
            abi: NOCAP_ABI,
            functionName: 'createFact',
            args: [walrusBlobId],
            value: stakeAmount,
          }
        ]
      }

      const result = await MiniKit.commandsAsync.sendTransaction(payload) as any
      
      if (result?.commandPayload?.status === 'success') {
        return {
          success: true,
          transactionId: result.commandPayload.transaction_id,
          message: 'Fact created successfully!'
        }
      } else {
        return {
          success: false,
          error: 'Transaction failed'
        }
      }
    } catch (error) {
      console.error('Error creating fact:', error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      }
    }
  }

  // Vote on a fact with optional staking
  static async voteOnFact(factId: number, vote: boolean, stakeAmount: string = '0') {
    try {
      const payload = {
        transaction: [
          {
            address: this.contractAddress,
            abi: NOCAP_ABI,
            functionName: 'voteOnFact',
            args: [BigInt(factId), vote],
            value: stakeAmount,
          }
        ]
      }

      const result = await MiniKit.commandsAsync.sendTransaction(payload) as any
      
      if (result?.commandPayload?.status === 'success') {
        return {
          success: true,
          transactionId: result.commandPayload.transaction_id,
          message: `Vote cast successfully! (${vote ? 'CAP' : 'NO CAP'})`
        }
      } else {
        return {
          success: false,
          error: 'Transaction failed'
        }
      }
    } catch (error) {
      console.error('Error voting on fact:', error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      }
    }
  }

  // Resolve a fact (can be called by anyone after voting period)
  static async resolveFact(factId: number) {
    try {
      const payload = {
        transaction: [
          {
            address: this.contractAddress,
            abi: NOCAP_ABI,
            functionName: 'resolveFact',
            args: [BigInt(factId)],
            value: '0',
          }
        ]
      }

      const result = await MiniKit.commandsAsync.sendTransaction(payload) as any
      
      if (result?.commandPayload?.status === 'success') {
        return {
          success: true,
          transactionId: result.commandPayload.transaction_id,
          message: 'Fact resolved successfully!'
        }
      } else {
        return {
          success: false,
          error: 'Transaction failed'
        }
      }
    } catch (error) {
      console.error('Error resolving fact:', error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      }
    }
  }

  // Withdraw accumulated rewards
  static async withdrawRewards() {
    try {
      const payload = {
        transaction: [
          {
            address: this.contractAddress,
            abi: NOCAP_ABI,
            functionName: 'withdrawRewards',
            args: [],
            value: '0',
          }
        ]
      }

      const result = await MiniKit.commandsAsync.sendTransaction(payload) as any
      
      if (result?.commandPayload?.status === 'success') {
        return {
          success: true,
          transactionId: result.commandPayload.transaction_id,
          message: 'Rewards withdrawn successfully!'
        }
      } else {
        return {
          success: false,
          error: 'Transaction failed'
        }
      }
    } catch (error) {
      console.error('Error withdrawing rewards:', error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      }
    }
  }

  // View functions (these would need to be implemented with direct RPC calls)
  static async getFact(factId: number): Promise<Fact | null> {
    // This would need to be implemented with a read call to the contract
    // For now, return null
    return null
  }

  static async getFactVotes(factId: number): Promise<Vote[]> {
    // This would need to be implemented with a read call to the contract
    // For now, return empty array
    return []
  }

  static async getStats() {
    // This would need to be implemented with a read call to the contract
    // For now, return default values
    return {
      totalFacts: 0,
      totalResolved: 0,
      totalStaked: "0"
    }
  }

  static async getWithdrawableBalance(userAddress: string): Promise<string> {
    // This would need to be implemented with a read call to the contract
    // For now, return "0"
    return "0"
  }

  static async hasUserVoted(factId: number, userAddress: string): Promise<boolean> {
    // This would need to be implemented with a read call to the contract
    // For now, return false
    return false
  }

  static async isVotingEnded(factId: number): Promise<boolean> {
    // This would need to be implemented with a read call to the contract
    // For now, return false
    return false
  }

  static async getTimeRemaining(factId: number): Promise<number> {
    // This would need to be implemented with a read call to the contract
    // For now, return 0
    return 0
  }
}
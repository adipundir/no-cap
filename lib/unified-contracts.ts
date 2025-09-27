// Unified Contract Service for NOCAP
import { MiniKit } from '@worldcoin/minikit-js'
import { encodeFunctionData } from 'viem'

// World Chain Mainnet Contract Addresses
export const WORLD_CHAIN_CONTRACTS = {
  // World ID Router on World Chain
  WORLD_ID: '0x57b930D551e677CC36e2fA036Ae2fe8FdaE0330D',
  
  // Your NOCAP Unified Contract (deploy this)
  NOCAP_UNIFIED: '0x0000000000000000000000000000000000000000', // Replace with deployed address
} as const

// World Chain Network Configuration
export const WORLD_CHAIN_CONFIG = {
  chainId: 480,
  name: 'World Chain',
  rpcUrl: 'https://worldchain-mainnet.g.alchemy.com/public',
  blockExplorerUrl: 'https://worldscan.org',
} as const

// ABIs for the unified contract
export const NOCAP_UNIFIED_ABI = [
  // Verification
  {
    "inputs": [
      {"internalType": "address", "name": "signal", "type": "address"},
      {"internalType": "uint256", "name": "root", "type": "uint256"},
      {"internalType": "uint256", "name": "nullifierHash", "type": "uint256"},
      {"internalType": "uint256[8]", "name": "proof", "type": "uint256[8]"}
    ],
    "name": "verifyAndRegister",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  
  // Fact submission
  {
    "inputs": [
      {"internalType": "string", "name": "title", "type": "string"},
      {"internalType": "string", "name": "description", "type": "string"},
      {"internalType": "uint256", "name": "votingPeriodHours", "type": "uint256"}
    ],
    "name": "submitFact",
    "outputs": [{"internalType": "uint256", "name": "factId", "type": "uint256"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  
  {
    "inputs": [
      {"internalType": "string", "name": "title", "type": "string"},
      {"internalType": "string", "name": "description", "type": "string"},
      {"internalType": "uint256", "name": "votingPeriodHours", "type": "uint256"}
    ],
    "name": "submitFactWithStake",
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
    "name": "voteFact",
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
  
  // View functions
  {
    "inputs": [{"internalType": "address", "name": "user", "type": "address"}],
    "name": "getUserProfile",
    "outputs": [
      {
        "components": [
          {"internalType": "bool", "name": "isVerified", "type": "bool"},
          {"internalType": "uint256", "name": "reputation", "type": "uint256"},
          {"internalType": "uint256", "name": "factsSubmitted", "type": "uint256"},
          {"internalType": "uint256", "name": "factsVerified", "type": "uint256"},
          {"internalType": "uint256", "name": "factsFalse", "type": "uint256"},
          {"internalType": "uint256", "name": "votesCorrect", "type": "uint256"},
          {"internalType": "uint256", "name": "votesIncorrect", "type": "uint256"},
          {"internalType": "uint256", "name": "totalStaked", "type": "uint256"},
          {"internalType": "uint256", "name": "rewardsEarned", "type": "uint256"},
          {"internalType": "uint256", "name": "joinedAt", "type": "uint256"},
          {"internalType": "uint256", "name": "lastActive", "type": "uint256"}
        ],
        "internalType": "struct NOCAPUnified.UserProfile",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  
  {
    "inputs": [{"internalType": "uint256", "name": "factId", "type": "uint256"}],
    "name": "getFact",
    "outputs": [
      {
        "components": [
          {"internalType": "uint256", "name": "id", "type": "uint256"},
          {"internalType": "address", "name": "submitter", "type": "address"},
          {"internalType": "string", "name": "title", "type": "string"},
          {"internalType": "string", "name": "description", "type": "string"},
          {"internalType": "uint256", "name": "stakeAmount", "type": "uint256"},
          {"internalType": "uint256", "name": "votesTrue", "type": "uint256"},
          {"internalType": "uint256", "name": "votesFalse", "type": "uint256"},
          {"internalType": "uint256", "name": "totalStaked", "type": "uint256"},
          {"internalType": "bool", "name": "resolved", "type": "bool"},
          {"internalType": "bool", "name": "outcome", "type": "bool"},
          {"internalType": "uint256", "name": "createdAt", "type": "uint256"},
          {"internalType": "uint256", "name": "deadline", "type": "uint256"},
          {"internalType": "uint256", "name": "rewardPool", "type": "uint256"}
        ],
        "internalType": "struct NOCAPUnified.Fact",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  
  {
    "inputs": [{"internalType": "address", "name": "user", "type": "address"}],
    "name": "isVerified",
    "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
    "stateMutability": "view",
    "type": "function"
  },
  
  {
    "inputs": [],
    "name": "getTotalFacts",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  
  {
    "inputs": [{"internalType": "uint256", "name": "factId", "type": "uint256"}],
    "name": "getFactVotes",
    "outputs": [
      {
        "components": [
          {"internalType": "address", "name": "voter", "type": "address"},
          {"internalType": "bool", "name": "vote", "type": "bool"},
          {"internalType": "uint256", "name": "stakeAmount", "type": "uint256"},
          {"internalType": "uint256", "name": "timestamp", "type": "uint256"}
        ],
        "internalType": "struct NOCAPUnified.Vote[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
] as const

// Helper function to encode contract call data
export function encodeContractCall(
  abi: readonly any[],
  functionName: string,
  args: any[]
): `0x${string}` {
  return encodeFunctionData({
    abi: abi,
    functionName: functionName,
    args: args,
  })
}

/**
 * Service for interacting with the unified NOCAP contract on World Chain.
 */
export class UnifiedContractService {
  /**
   * Verify World ID proof and register user on-chain.
   */
  static async verifyAndRegister(
    walletAddress: string,
    root: string,
    nullifierHash: string,
    proof: string[]
  ) {
    if (!MiniKit.isInstalled()) {
      throw new Error('World App is required for contract interactions')
    }

    const { finalPayload } = await MiniKit.commandsAsync.sendTransaction({
      transaction: [
        {
          address: WORLD_CHAIN_CONTRACTS.NOCAP_UNIFIED,
          abi: NOCAP_UNIFIED_ABI,
          functionName: 'verifyAndRegister',
          args: [
            walletAddress,
            BigInt(root).toString(),
            BigInt(nullifierHash).toString(),
            proof.map(p => BigInt(p).toString())
          ],
        }
      ]
    })

    if (finalPayload.status === 'error') {
      throw new Error(finalPayload.error_code || 'Transaction failed')
    }

    return finalPayload.transaction_hash
  }

  /**
   * Submit a new fact claim (free)
   */
  static async submitFact(
    title: string,
    description: string,
    votingPeriodHours: number = 48
  ) {
    if (!MiniKit.isInstalled()) {
      throw new Error('World App is required for contract interactions')
    }

    const { finalPayload } = await MiniKit.commandsAsync.sendTransaction({
      transaction: [
        {
          address: WORLD_CHAIN_CONTRACTS.NOCAP_UNIFIED,
          abi: NOCAP_UNIFIED_ABI,
          functionName: 'submitFact',
          args: [title, description, votingPeriodHours],
        }
      ]
    })

    if (finalPayload.status === 'error') {
      throw new Error(finalPayload.error_code || 'Transaction failed')
    }

    return finalPayload.transaction_hash
  }

  /**
   * Submit a new fact claim with ETH stake
   */
  static async submitFactWithStake(
    title: string,
    description: string,
    stakeAmount: string, // in ETH
    votingPeriodHours: number = 48
  ) {
    if (!MiniKit.isInstalled()) {
      throw new Error('World App is required for contract interactions')
    }

    // Convert ETH amount to wei (18 decimals)
    const stakeAmountWei = BigInt(parseFloat(stakeAmount) * 1e18)

    const { finalPayload } = await MiniKit.commandsAsync.sendTransaction({
      transaction: [
        {
          address: WORLD_CHAIN_CONTRACTS.NOCAP_UNIFIED,
          abi: NOCAP_UNIFIED_ABI,
          functionName: 'submitFactWithStake',
          args: [title, description, votingPeriodHours],
          value: stakeAmountWei.toString(),
        }
      ]
    })

    if (finalPayload.status === 'error') {
      throw new Error(finalPayload.error_code || 'Transaction failed')
    }

    return finalPayload.transaction_hash
  }

  /**
   * Vote on a fact claim with optional ETH stake
   */
  static async voteFact(factId: string, vote: boolean, stakeAmount?: string) {
    if (!MiniKit.isInstalled()) {
      throw new Error('World App is required for contract interactions')
    }

    // Convert ETH amount to wei if provided
    const stakeAmountWei = stakeAmount ? BigInt(parseFloat(stakeAmount) * 1e18) : BigInt(0)

    const { finalPayload } = await MiniKit.commandsAsync.sendTransaction({
      transaction: [
        {
          address: WORLD_CHAIN_CONTRACTS.NOCAP_UNIFIED,
          abi: NOCAP_UNIFIED_ABI,
          functionName: 'voteFact',
          args: [factId, vote],
          value: stakeAmountWei.toString(),
        }
      ]
    })

    if (finalPayload.status === 'error') {
      throw new Error(finalPayload.error_code || 'Transaction failed')
    }

    return finalPayload.transaction_hash
  }

  /**
   * Resolve a fact (can be called by anyone after deadline)
   */
  static async resolveFact(factId: string) {
    if (!MiniKit.isInstalled()) {
      throw new Error('World App is required for contract interactions')
    }

    const { finalPayload } = await MiniKit.commandsAsync.sendTransaction({
      transaction: [
        {
          address: WORLD_CHAIN_CONTRACTS.NOCAP_UNIFIED,
          abi: NOCAP_UNIFIED_ABI,
          functionName: 'resolveFact',
          args: [factId],
        }
      ]
    })

    if (finalPayload.status === 'error') {
      throw new Error(finalPayload.error_code || 'Transaction failed')
    }

    return finalPayload.transaction_hash
  }

  /**
   * Get user profile from contract
   */
  static async getUserProfile(walletAddress: string) {
    try {
      const response = await fetch(WORLD_CHAIN_CONFIG.rpcUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jsonrpc: '2.0',
          method: 'eth_call',
          params: [
            {
              to: WORLD_CHAIN_CONTRACTS.NOCAP_UNIFIED,
              data: encodeContractCall(NOCAP_UNIFIED_ABI, 'getUserProfile', [walletAddress])
            },
            'latest'
          ],
          id: 1
        })
      })
      
      const result = await response.json()
      // Note: You'll need to decode this result properly using viem's decodeFunctionResult
      // This is a placeholder implementation
      return result.result
    } catch (error) {
      console.error('Error fetching user profile:', error)
      throw error
    }
  }

  /**
   * Check if user is verified
   */
  static async isUserVerified(walletAddress: string): Promise<boolean> {
    try {
      const response = await fetch(WORLD_CHAIN_CONFIG.rpcUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jsonrpc: '2.0',
          method: 'eth_call',
          params: [
            {
              to: WORLD_CHAIN_CONTRACTS.NOCAP_UNIFIED,
              data: encodeContractCall(NOCAP_UNIFIED_ABI, 'isVerified', [walletAddress])
            },
            'latest'
          ],
          id: 1
        })
      })
      
      const result = await response.json()
      return result.result === '0x0000000000000000000000000000000000000000000000000000000000000001'
    } catch (error) {
      console.error('Error checking verification status:', error)
      return false
    }
  }

  /**
   * Get fact details by ID
   */
  static async getFact(factId: string) {
    try {
      const response = await fetch(WORLD_CHAIN_CONFIG.rpcUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jsonrpc: '2.0',
          method: 'eth_call',
          params: [
            {
              to: WORLD_CHAIN_CONTRACTS.NOCAP_UNIFIED,
              data: encodeContractCall(NOCAP_UNIFIED_ABI, 'getFact', [BigInt(factId).toString()])
            },
            'latest'
          ],
          id: 1
        })
      })
      
      const result = await response.json()
      // Note: Proper decoding needed here
      return result.result
    } catch (error) {
      console.error('Error fetching fact:', error)
      throw error
    }
  }

  /**
   * Get total number of facts
   */
  static async getTotalFacts(): Promise<number> {
    try {
      const response = await fetch(WORLD_CHAIN_CONFIG.rpcUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jsonrpc: '2.0',
          method: 'eth_call',
          params: [
            {
              to: WORLD_CHAIN_CONTRACTS.NOCAP_UNIFIED,
              data: encodeContractCall(NOCAP_UNIFIED_ABI, 'getTotalFacts', [])
            },
            'latest'
          ],
          id: 1
        })
      })
      
      const result = await response.json()
      return parseInt(result.result, 16)
    } catch (error) {
      console.error('Error fetching total facts:', error)
      return 0
    }
  }

  /**
   * Get ETH balance
   */
  static async getETHBalance(walletAddress: string): Promise<string> {
    try {
      const response = await fetch(WORLD_CHAIN_CONFIG.rpcUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jsonrpc: '2.0',
          method: 'eth_getBalance',
          params: [walletAddress, 'latest'],
          id: 1
        })
      })
      
      const result = await response.json()
      const balance = BigInt(result.result || '0')
      return (Number(balance) / 1e18).toFixed(4) // Convert from wei to ETH
    } catch (error) {
      console.error('Error fetching ETH balance:', error)
      return '0.0000'
    }
  }
}

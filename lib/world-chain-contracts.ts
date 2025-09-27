// World Chain Contract Interactions
import { MiniKit } from '@worldcoin/minikit-js'

// World Chain Mainnet Contract Addresses
export const WORLD_CHAIN_CONTRACTS = {
  // World ID Router on World Chain
  WORLD_ID: '0x57b930D551e677CC36e2fA036Ae2fe8FdaE0330D',
  
  // WLD Token on World Chain
  WLD: '0x2cFc85d8E48F8EAB294be644d9E25C3030863003',
  
  // Your NOCAP Fact Checker Contract (deploy this)
  NOCAP_FACT_CHECKER: '0x0000000000000000000000000000000000000000', // Replace with deployed address
} as const

// World Chain Network Configuration
export const WORLD_CHAIN_CONFIG = {
  chainId: 480,
  name: 'World Chain',
  currency: 'ETH',
  explorerUrl: 'https://worldscan.org',
  rpcUrl: 'https://worldchain-mainnet.g.alchemy.com/public',
} as const

// Contract ABIs (minimal for interactions)
export const WORLD_ID_ABI = [
  {
    "inputs": [
      {"internalType": "address", "name": "signal", "type": "address"},
      {"internalType": "uint256", "name": "root", "type": "uint256"},
      {"internalType": "uint256", "name": "nullifierHash", "type": "uint256"},
      {"internalType": "uint256[8]", "name": "proof", "type": "uint256[8]"}
    ],
    "name": "verifyProof",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
] as const

export const ERC20_ABI = [
  {
    "inputs": [{"internalType": "address", "name": "account", "type": "address"}],
    "name": "balanceOf",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "address", "name": "to", "type": "address"},
      {"internalType": "uint256", "name": "amount", "type": "uint256"}
    ],
    "name": "transfer",
    "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "address", "name": "spender", "type": "address"},
      {"internalType": "uint256", "name": "amount", "type": "uint256"}
    ],
    "name": "approve",
    "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
    "stateMutability": "nonpayable",
    "type": "function"
  }
] as const

export const NOCAP_FACT_CHECKER_ABI = [
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
  {
    "inputs": [
      {"internalType": "string", "name": "title", "type": "string"},
      {"internalType": "string", "name": "description", "type": "string"}
    ],
    "name": "submitFact",
    "outputs": [{"internalType": "uint256", "name": "factId", "type": "uint256"}],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "string", "name": "title", "type": "string"},
      {"internalType": "string", "name": "description", "type": "string"}
    ],
    "name": "submitFactWithStake",
    "outputs": [{"internalType": "uint256", "name": "factId", "type": "uint256"}],
    "stateMutability": "payable",
    "type": "function"
  },
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
  {
    "inputs": [{"internalType": "address", "name": "user", "type": "address"}],
    "name": "isVerified",
    "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "factId", "type": "uint256"}],
    "name": "getFact",
    "outputs": [
      {"internalType": "string", "name": "title", "type": "string"},
      {"internalType": "string", "name": "description", "type": "string"},
      {"internalType": "address", "name": "submitter", "type": "address"},
      {"internalType": "uint256", "name": "stakeAmount", "type": "uint256"},
      {"internalType": "uint256", "name": "votesTrue", "type": "uint256"},
      {"internalType": "uint256", "name": "votesFalse", "type": "uint256"},
      {"internalType": "bool", "name": "resolved", "type": "bool"}
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
): string {
  // This is a simplified encoder - in production, use ethers.js or viem
  // For now, we'll return a placeholder that MiniKit can handle
  return '0x' + functionName + JSON.stringify(args)
}

// Contract interaction helpers
export class WorldChainContractService {
  
  /**
   * Verify World ID proof on-chain
   */
  static async verifyWorldID(
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
          address: WORLD_CHAIN_CONTRACTS.NOCAP_FACT_CHECKER,
          abi: NOCAP_FACT_CHECKER_ABI,
          functionName: 'verifyAndRegister',
          args: [walletAddress, root, nullifierHash, proof],
        }
      ]
    })

    if (finalPayload.status === 'error') {
      throw new Error(finalPayload.error_code || 'Transaction failed')
    }

    return finalPayload.transaction_id || 'transaction_completed'
  }

  /**
   * Submit a new fact claim (free)
   */
  static async submitFact(
    title: string,
    description: string
  ) {
    if (!MiniKit.isInstalled()) {
      throw new Error('World App is required for contract interactions')
    }

    const { finalPayload } = await MiniKit.commandsAsync.sendTransaction({
      transaction: [
        {
          address: WORLD_CHAIN_CONTRACTS.NOCAP_FACT_CHECKER,
          abi: NOCAP_FACT_CHECKER_ABI,
          functionName: 'submitFact',
          args: [title, description],
        }
      ]
    })

    if (finalPayload.status === 'error') {
      throw new Error(finalPayload.error_code || 'Transaction failed')
    }

    return finalPayload.transaction_id || 'transaction_completed'
  }

  /**
   * Submit a new fact claim with optional ETH stake
   */
  static async submitFactWithStake(
    title: string,
    description: string,
    stakeAmount: string // in ETH (18 decimals)
  ) {
    if (!MiniKit.isInstalled()) {
      throw new Error('World App is required for contract interactions')
    }

    // Convert ETH amount to wei (18 decimals)
    const stakeAmountWei = BigInt(parseFloat(stakeAmount) * 1e18)

    const { finalPayload } = await MiniKit.commandsAsync.sendTransaction({
      transaction: [
        {
          address: WORLD_CHAIN_CONTRACTS.NOCAP_FACT_CHECKER,
          abi: NOCAP_FACT_CHECKER_ABI,
          functionName: 'submitFactWithStake',
          args: [title, description],
          value: stakeAmountWei.toString(), // Send ETH as value
        }
      ]
    })

    if (finalPayload.status === 'error') {
      throw new Error(finalPayload.error_code || 'Transaction failed')
    }

    return finalPayload.transaction_id || 'transaction_completed'
  }

  /**
   * Vote on a fact claim (optional ETH stake)
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
          address: WORLD_CHAIN_CONTRACTS.NOCAP_FACT_CHECKER,
          abi: NOCAP_FACT_CHECKER_ABI,
          functionName: 'voteFact',
          args: [factId, vote],
          value: stakeAmountWei.toString(), // Optional ETH stake
        }
      ]
    })

    if (finalPayload.status === 'error') {
      throw new Error(finalPayload.error_code || 'Transaction failed')
    }

    return finalPayload.transaction_id || 'transaction_completed'
  }

  /**
   * Check if user is verified with World ID
   */
  static async isUserVerified(walletAddress: string): Promise<boolean> {
    // This would typically use a read-only RPC call
    // For now, we'll return a placeholder
    try {
      // In production, use fetch to call World Chain RPC
      const response = await fetch(WORLD_CHAIN_CONFIG.rpcUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jsonrpc: '2.0',
          method: 'eth_call',
          params: [
            {
              to: WORLD_CHAIN_CONTRACTS.NOCAP_FACT_CHECKER,
              data: encodeContractCall(NOCAP_FACT_CHECKER_ABI, 'isVerified', [walletAddress])
            },
            'latest'
          ],
          id: 1
        })
      })
      
      const result = await response.json()
      return result.result !== '0x0000000000000000000000000000000000000000000000000000000000000000'
    } catch (error) {
      console.error('Error checking verification status:', error)
      return false
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
              to: WORLD_CHAIN_CONTRACTS.NOCAP_FACT_CHECKER,
              data: encodeContractCall(NOCAP_FACT_CHECKER_ABI, 'getFact', [factId])
            },
            'latest'
          ],
          id: 1
        })
      })
      
      const result = await response.json()
      // Parse the result (this would need proper ABI decoding in production)
      return {
        title: 'Sample Fact',
        description: 'Sample Description',
        submitter: '0x...',
        stakeAmount: '10.00',
        votesTrue: 5,
        votesFalse: 2,
        resolved: false
      }
    } catch (error) {
      console.error('Error fetching fact:', error)
      return null
    }
  }
}

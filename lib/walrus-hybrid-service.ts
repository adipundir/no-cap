// Hybrid service combining Walrus storage with on-chain references
import { MiniKit } from '@worldcoin/minikit-js'
import { encodeFunctionData } from 'viem'
import { NOCAPWalrusService, WalrusFactContent, WalrusSource } from './walrus-service'

// World Chain Contract Configuration
export const WORLD_CHAIN_CONTRACTS = {
  NOCAP_WALRUS_HYBRID: '0x0000000000000000000000000000000000000000', // Replace with deployed address
  WORLD_ID: '0x57b930D551e677CC36e2fA036Ae2fe8FdaE0330D',
} as const

export const WORLD_CHAIN_CONFIG = {
  chainId: 480,
  name: 'World Chain',
  rpcUrl: 'https://worldchain-mainnet.g.alchemy.com/public',
  blockExplorerUrl: 'https://worldscan.org',
} as const

// Contract ABI for the hybrid contract
export const NOCAP_WALRUS_HYBRID_ABI = [
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
  
  // Fact reference submission
  {
    "inputs": [
      {"internalType": "string", "name": "walrusBlobId", "type": "string"},
      {"internalType": "bytes32", "name": "contentHash", "type": "bytes32"},
      {"internalType": "uint256", "name": "votingPeriodHours", "type": "uint256"},
      {"internalType": "uint8", "name": "category", "type": "uint8"},
      {"internalType": "uint8", "name": "priority", "type": "uint8"}
    ],
    "name": "submitFactReference",
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
  
  // View functions
  {
    "inputs": [{"internalType": "uint256", "name": "factId", "type": "uint256"}],
    "name": "getFactReference",
    "outputs": [
      {
        "components": [
          {"internalType": "uint256", "name": "id", "type": "uint256"},
          {"internalType": "address", "name": "submitter", "type": "address"},
          {"internalType": "string", "name": "walrusBlobId", "type": "string"},
          {"internalType": "bytes32", "name": "contentHash", "type": "bytes32"},
          {"internalType": "uint256", "name": "stakeAmount", "type": "uint256"},
          {"internalType": "uint256", "name": "votesTrue", "type": "uint256"},
          {"internalType": "uint256", "name": "votesFalse", "type": "uint256"},
          {"internalType": "uint256", "name": "totalStaked", "type": "uint256"},
          {"internalType": "bool", "name": "resolved", "type": "bool"},
          {"internalType": "bool", "name": "outcome", "type": "bool"},
          {"internalType": "uint256", "name": "createdAt", "type": "uint256"},
          {"internalType": "uint256", "name": "deadline", "type": "uint256"},
          {"internalType": "uint256", "name": "rewardPool", "type": "uint256"},
          {"internalType": "uint8", "name": "category", "type": "uint8"},
          {"internalType": "uint8", "name": "priority", "type": "uint8"}
        ],
        "internalType": "struct NOCAPWalrusHybrid.FactReference",
        "name": "",
        "type": "tuple"
      }
    ],
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
    "inputs": [],
    "name": "getActiveFacts",
    "outputs": [{"internalType": "uint256[]", "name": "", "type": "uint256[]"}],
    "stateMutability": "view",
    "type": "function"
  },
  
  {
    "inputs": [{"internalType": "uint8", "name": "category", "type": "uint8"}],
    "name": "getFactsByCategory",
    "outputs": [{"internalType": "uint256[]", "name": "", "type": "uint256[]"}],
    "stateMutability": "view",
    "type": "function"
  },
  
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
        "internalType": "struct NOCAPWalrusHybrid.UserProfile",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
] as const

// Types
export interface FactReference {
  id: number
  submitter: string
  walrusBlobId: string
  contentHash: string
  stakeAmount: bigint
  votesTrue: number
  votesFalse: number
  totalStaked: bigint
  resolved: boolean
  outcome: boolean
  createdAt: number
  deadline: number
  rewardPool: bigint
  category: number
  priority: number
}

export interface CompleteFact {
  reference: FactReference
  content: WalrusFactContent | null
  id: number
  walrusBlobId: string
  // Combined display fields
  title: string
  description: string
  summary: string
  sources: WalrusSource[]
  submitter: string
  votesTrue: number
  votesFalse: number
  stakeAmount: string
  totalStaked: string
  status: 'voting' | 'resolved-true' | 'resolved-false'
  deadline: Date
  createdAt: Date
  category: number
  priority: number
  canVote: boolean
  timeRemaining: string
}

// Fact categories
export const FACT_CATEGORIES = {
  0: 'General',
  1: 'Technology',
  2: 'Politics',
  3: 'Science',
  4: 'Economics',
  5: 'Health',
  6: 'Environment',
  7: 'Sports',
  8: 'Entertainment',
  9: 'Education'
} as const

// Priority levels
export const PRIORITY_LEVELS = {
  0: 'Low',
  1: 'Medium',
  2: 'High',
  3: 'Critical'
} as const

/**
 * Walrus Hybrid Service - combines on-chain references with Walrus content storage
 */
export class WalrusHybridService {
  
  /**
   * Submit a complete fact with hybrid storage
   */
  static async submitFact(
    title: string,
    description: string,
    sources: WalrusSource[] = [],
    category: number = 0,
    priority: number = 1,
    votingPeriodHours: number = 48,
    stakeAmount?: string,
    tags: string[] = []
  ): Promise<{ txHash: string; walrusBlobId: string; factId: number }> {
    
    if (!MiniKit.isInstalled()) {
      throw new Error('World App is required for fact submission')
    }

    try {
      // 1. Prepare fact content for Walrus
      const factContent: WalrusFactContent = {
        factId: 0, // Will be updated after on-chain creation
        version: 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        title,
        description,
        summary: description.length > 500 ? description.slice(0, 497) + '...' : description,
        sources,
        media: [],
        tags,
        category,
        priority,
        language: 'en',
        contentType: 'text',
        checksum: ''
      }

      // 2. Store content on Walrus
      const walrusBlobId = await NOCAPWalrusService.storeFact(factContent)
      
      // 3. Generate content hash for integrity verification
      const contentHash = this.generateContentHash(factContent)
      
      // 4. Submit reference to contract
      const stakeWei = stakeAmount ? BigInt(parseFloat(stakeAmount) * 1e18) : BigInt(0)
      
      const { finalPayload } = await MiniKit.commandsAsync.sendTransaction({
        transaction: [
          {
            address: WORLD_CHAIN_CONTRACTS.NOCAP_WALRUS_HYBRID,
            abi: NOCAP_WALRUS_HYBRID_ABI,
            functionName: 'submitFactReference',
            args: [
              walrusBlobId,
              contentHash,
              votingPeriodHours,
              category,
              priority
            ],
            value: stakeWei.toString()
          }
        ]
      })

      if (finalPayload.status === 'error') {
        throw new Error(finalPayload.error_code || 'Transaction failed')
      }

      // 5. Extract fact ID from transaction (would need event parsing in real implementation)
      const factId = await this.getLatestFactId() // Simplified - should parse from events
      
      // 6. Update Walrus content with fact ID
      const updatedContent = { ...factContent, factId }
      await NOCAPWalrusService.updateFact(walrusBlobId, updatedContent)

      return {
        txHash: finalPayload.transaction_hash,
        walrusBlobId,
        factId
      }
    } catch (error) {
      console.error('Error submitting fact:', error)
      throw error
    }
  }

  /**
   * Load complete facts (on-chain references + Walrus content)
   */
  static async loadCompleteFacts(): Promise<CompleteFact[]> {
    try {
      // 1. Get total facts count
      const totalFacts = await this.getTotalFacts()
      
      // 2. Load all fact references
      const factReferences: FactReference[] = []
      for (let i = 0; i < totalFacts; i++) {
        const ref = await this.getFactReference(i)
        if (ref) factReferences.push(ref)
      }
      
      // 3. Batch load content from Walrus
      const blobIds = factReferences.map(ref => ref.walrusBlobId)
      const contents = await NOCAPWalrusService.batchRetrieveFacts(blobIds)
      
      // 4. Combine references and content
      const completeFacts: CompleteFact[] = factReferences.map((ref, i) => 
        this.combineFactData(ref, contents[i])
      )
      
      // 5. Sort by creation time (newest first)
      return completeFacts.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      
    } catch (error) {
      console.error('Error loading complete facts:', error)
      return []
    }
  }

  /**
   * Load active facts only
   */
  static async loadActiveFacts(): Promise<CompleteFact[]> {
    try {
      const activeFactIds = await this.getActiveFacts()
      return await this.loadFactsByIds(activeFactIds)
    } catch (error) {
      console.error('Error loading active facts:', error)
      return []
    }
  }

  /**
   * Load facts by category
   */
  static async loadFactsByCategory(category: number): Promise<CompleteFact[]> {
    try {
      const categoryFactIds = await this.getFactsByCategory(category)
      return await this.loadFactsByIds(categoryFactIds)
    } catch (error) {
      console.error('Error loading facts by category:', error)
      return []
    }
  }

  /**
   * Load facts by IDs
   */
  static async loadFactsByIds(factIds: number[]): Promise<CompleteFact[]> {
    try {
      // Load references
      const references = await Promise.all(
        factIds.map(id => this.getFactReference(id))
      )
      
      // Load content
      const blobIds = references
        .filter((ref): ref is FactReference => ref !== null)
        .map(ref => ref.walrusBlobId)
      
      const contents = await NOCAPWalrusService.batchRetrieveFacts(blobIds)
      
      // Combine data
      return references
        .map((ref, i) => ref ? this.combineFactData(ref, contents[i]) : null)
        .filter((fact): fact is CompleteFact => fact !== null)
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
        
    } catch (error) {
      console.error('Error loading facts by IDs:', error)
      return []
    }
  }

  /**
   * Vote on a fact
   */
  static async voteFact(factId: number, vote: boolean, stakeAmount?: string): Promise<string> {
    if (!MiniKit.isInstalled()) {
      throw new Error('World App is required for voting')
    }

    try {
      const stakeWei = stakeAmount ? BigInt(parseFloat(stakeAmount) * 1e18) : BigInt(0)
      
      const { finalPayload } = await MiniKit.commandsAsync.sendTransaction({
        transaction: [
          {
            address: WORLD_CHAIN_CONTRACTS.NOCAP_WALRUS_HYBRID,
            abi: NOCAP_WALRUS_HYBRID_ABI,
            functionName: 'voteFact',
            args: [factId, vote],
            value: stakeWei.toString()
          }
        ]
      })

      if (finalPayload.status === 'error') {
        throw new Error(finalPayload.error_code || 'Voting failed')
      }

      return finalPayload.transaction_hash
    } catch (error) {
      console.error('Error voting on fact:', error)
      throw error
    }
  }

  /**
   * Search facts by content
   */
  static async searchFacts(searchTerm: string): Promise<CompleteFact[]> {
    try {
      const allFacts = await this.loadCompleteFacts()
      const searchLower = searchTerm.toLowerCase()
      
      return allFacts.filter(fact =>
        fact.title.toLowerCase().includes(searchLower) ||
        fact.description.toLowerCase().includes(searchLower) ||
        fact.summary.toLowerCase().includes(searchLower) ||
        (fact.content?.tags || []).some(tag => tag.toLowerCase().includes(searchLower))
      )
    } catch (error) {
      console.error('Error searching facts:', error)
      return []
    }
  }

  // Private helper methods
  
  private static async getTotalFacts(): Promise<number> {
    try {
      const response = await fetch(WORLD_CHAIN_CONFIG.rpcUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jsonrpc: '2.0',
          method: 'eth_call',
          params: [
            {
              to: WORLD_CHAIN_CONTRACTS.NOCAP_WALRUS_HYBRID,
              data: encodeFunctionData({
                abi: NOCAP_WALRUS_HYBRID_ABI,
                functionName: 'getTotalFacts',
                args: []
              })
            },
            'latest'
          ],
          id: 1
        })
      })
      
      const result = await response.json()
      return parseInt(result.result, 16)
    } catch (error) {
      console.error('Error getting total facts:', error)
      return 0
    }
  }

  private static async getFactReference(factId: number): Promise<FactReference | null> {
    try {
      const response = await fetch(WORLD_CHAIN_CONFIG.rpcUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jsonrpc: '2.0',
          method: 'eth_call',
          params: [
            {
              to: WORLD_CHAIN_CONTRACTS.NOCAP_WALRUS_HYBRID,
              data: encodeFunctionData({
                abi: NOCAP_WALRUS_HYBRID_ABI,
                functionName: 'getFactReference',
                args: [factId]
              })
            },
            'latest'
          ],
          id: 1
        })
      })
      
      const result = await response.json()
      // Note: This would need proper ABI decoding in real implementation
      // For now, returning mock data structure
      return this.decodeFactReference(result.result)
    } catch (error) {
      console.error('Error getting fact reference:', error)
      return null
    }
  }

  private static async getActiveFacts(): Promise<number[]> {
    try {
      const response = await fetch(WORLD_CHAIN_CONFIG.rpcUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jsonrpc: '2.0',
          method: 'eth_call',
          params: [
            {
              to: WORLD_CHAIN_CONTRACTS.NOCAP_WALRUS_HYBRID,
              data: encodeFunctionData({
                abi: NOCAP_WALRUS_HYBRID_ABI,
                functionName: 'getActiveFacts',
                args: []
              })
            },
            'latest'
          ],
          id: 1
        })
      })
      
      const result = await response.json()
      // Decode array of fact IDs
      return this.decodeFactIdArray(result.result)
    } catch (error) {
      console.error('Error getting active facts:', error)
      return []
    }
  }

  private static async getFactsByCategory(category: number): Promise<number[]> {
    try {
      const response = await fetch(WORLD_CHAIN_CONFIG.rpcUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jsonrpc: '2.0',
          method: 'eth_call',
          params: [
            {
              to: WORLD_CHAIN_CONTRACTS.NOCAP_WALRUS_HYBRID,
              data: encodeFunctionData({
                abi: NOCAP_WALRUS_HYBRID_ABI,
                functionName: 'getFactsByCategory',
                args: [category]
              })
            },
            'latest'
          ],
          id: 1
        })
      })
      
      const result = await response.json()
      return this.decodeFactIdArray(result.result)
    } catch (error) {
      console.error('Error getting facts by category:', error)
      return []
    }
  }

  private static combineFactData(
    reference: FactReference, 
    content: WalrusFactContent | null
  ): CompleteFact {
    const now = Date.now()
    const deadline = new Date(reference.deadline * 1000)
    const createdAt = new Date(reference.createdAt * 1000)
    const timeRemaining = deadline.getTime() - now
    
    let status: CompleteFact['status']
    if (reference.resolved) {
      status = reference.outcome ? 'resolved-true' : 'resolved-false'
    } else {
      status = 'voting'
    }

    return {
      reference,
      content,
      id: reference.id,
      walrusBlobId: reference.walrusBlobId,
      title: content?.title || 'Loading...',
      description: content?.description || 'Loading...',
      summary: content?.summary || 'Loading...',
      sources: content?.sources || [],
      submitter: reference.submitter,
      votesTrue: reference.votesTrue,
      votesFalse: reference.votesFalse,
      stakeAmount: this.formatEther(reference.stakeAmount),
      totalStaked: this.formatEther(reference.totalStaked),
      status,
      deadline,
      createdAt,
      category: reference.category,
      priority: reference.priority,
      canVote: !reference.resolved && timeRemaining > 0,
      timeRemaining: timeRemaining > 0 ? this.formatTimeRemaining(timeRemaining) : 'Ended'
    }
  }

  private static generateContentHash(content: WalrusFactContent): string {
    // Simple hash for demo - use proper crypto hash in production
    const hashData = JSON.stringify({
      title: content.title,
      description: content.description,
      sources: content.sources,
      createdAt: content.createdAt
    })
    
    let hash = 0
    for (let i = 0; i < hashData.length; i++) {
      const char = hashData.charCodeAt(i)
      hash = ((hash << 5) - hash) + char
      hash = hash & hash
    }
    
    return '0x' + Math.abs(hash).toString(16).padStart(64, '0')
  }

  private static formatEther(wei: bigint): string {
    return (Number(wei) / 1e18).toFixed(4)
  }

  private static formatTimeRemaining(ms: number): string {
    const hours = Math.floor(ms / (1000 * 60 * 60))
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60))
    
    if (hours > 24) {
      const days = Math.floor(hours / 24)
      return `${days}d ${hours % 24}h`
    } else if (hours > 0) {
      return `${hours}h ${minutes}m`
    } else {
      return `${minutes}m`
    }
  }

  private static async getLatestFactId(): Promise<number> {
    // Simplified - should parse from transaction events
    const totalFacts = await this.getTotalFacts()
    return Math.max(0, totalFacts - 1)
  }

  private static decodeFactReference(encodedData: string): FactReference | null {
    // Placeholder - would need proper ABI decoding
    // This is a simplified mock implementation
    return null
  }

  private static decodeFactIdArray(encodedData: string): number[] {
    // Placeholder - would need proper ABI decoding
    return []
  }
}

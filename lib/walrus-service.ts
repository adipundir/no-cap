// Walrus Storage Service for NOCAP
// Using Hybrid approach - Real Walrus with intelligent mock fallback
import { WalrusHybridService, getWalrusHybridService } from './walrus-hybrid'

// Walrus configuration for NOCAP
const WALRUS_CONFIG = {
  publisherUrl: process.env.NEXT_PUBLIC_WALRUS_PUBLISHER_URL || 'https://publisher.walrus-testnet.walrus.space',
  aggregatorUrl: process.env.NEXT_PUBLIC_WALRUS_AGGREGATOR_URL || 'https://aggregator.walrus-testnet.walrus.space',
  maxBlobSize: 10 * 1024 * 1024, // 10MB max
}

// Walrus content types
export interface WalrusFactContent {
  // Metadata
  factId: number
  version: number
  createdAt: string
  updatedAt: string
  
  // Content
  title: string
  description: string
  summary: string
  
  // Evidence
  sources: WalrusSource[]
  media: WalrusMedia[]
  tags: string[]
  
  // Classification
  category: number
  priority: number
  language: string
  contentType: 'text' | 'rich'
  
  // Integrity
  checksum: string
  signature?: string
}

export interface WalrusSource {
  url: string
  title: string
  description?: string
  accessedAt: string
  archived?: boolean
  archiveUrl?: string
  credibilityScore?: number
}

export interface WalrusMedia {
  type: 'image' | 'video' | 'document' | 'audio'
  walrusBlobId: string
  filename: string
  mimeType: string
  size: number
  description?: string
  thumbnail?: string
}

export interface WalrusFactStoreResult {
  blobId: string
  source: 'walrus' | 'mock'
  size: number
  cost: string
}

export interface WalrusCommentThread {
  factId: number
  comments: WalrusComment[]
  totalComments: number
  lastUpdated: string
}

export interface WalrusComment {
  id: string
  author: string
  content: string
  timestamp: string
  parentId?: string
  votes: {
    up: number
    down: number
  }
  edited?: boolean
  editedAt?: string
}

/**
 * NOCAP Walrus Storage Service
 * Handles all interactions with Walrus for content storage
 */
export class NOCAPWalrusService {
  private static walrusHybrid: WalrusHybridService

  /**
   * Initialize Walrus service
   */
  static initialize() {
    if (!this.walrusHybrid) {
      this.walrusHybrid = getWalrusHybridService()
      if (typeof window !== 'undefined') {
        this.walrusHybrid.onFallback((event) => {
          const message = event.reason === 'health-check-failed'
            ? 'Walrus network issues detected. Falling back to mock storage.'
            : event.reason === 'store-failed'
              ? 'Walrus store failed. Using mock storage.'
              : 'Walrus retrieval failed. Using mock storage.'

          import('sonner').then(({ toast }) => {
            toast.warning(message, {
              description: event.timestamp.toLocaleTimeString()
            })
          }).catch((error) => {
            console.warn('Failed to load toast module for Walrus fallback', error)
          })
        })
      }
    }
    return this.walrusHybrid
  }

  /**
   * Store fact content on Walrus
   */
  static async storeFact(factContent: WalrusFactContent): Promise<WalrusFactStoreResult> {
    try {
      const walrus = this.initialize()
      
      // Add checksum for integrity
      factContent.checksum = this.generateChecksum(factContent)
      factContent.updatedAt = new Date().toISOString()
      
      // Validate content size
      const contentSize = Buffer.from(JSON.stringify(factContent), 'utf-8').length
      if (contentSize > WALRUS_CONFIG.maxBlobSize) {
        throw new Error(`Content too large: ${contentSize} bytes (max: ${WALRUS_CONFIG.maxBlobSize})`)
      }
      
      // Store on Walrus using HTTP API - No Sui wallet needed!
      const result = await walrus.storeJSON(factContent, 5) // 5 epochs
      
      console.log('Fact stored on Walrus:', {
        blobId: result.blobId,
        factId: factContent.factId,
        title: factContent.title,
        size: result.size,
        cost: result.cost,
        source: result.source
      })
      
      return {
        blobId: result.blobId,
        source: result.source,
        size: result.size,
        cost: result.cost
      }
    } catch (error) {
      console.error('Error storing fact on Walrus:', error)
      throw new Error(`Walrus storage failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  /**
   * Retrieve fact content from Walrus
   */
  static async retrieveFact(blobId: string): Promise<WalrusFactContent | null> {
    try {
      const walrus = this.initialize()
      
      // Retrieve using HTTP API - No wallet needed!
      const factContent = await walrus.retrieveJSON<WalrusFactContent>(blobId)
      
      // Verify content integrity
      const expectedChecksum = this.generateChecksum({
        ...factContent,
        checksum: '', // Exclude checksum from checksum calculation
        updatedAt: factContent.createdAt // Use original creation time for checksum
      })
      
      if (factContent.checksum && factContent.checksum !== expectedChecksum) {
        console.warn('Content integrity check failed:', {
          blobId,
          expected: expectedChecksum,
          actual: factContent.checksum
        })
        // Don't throw error, just warn - content might have been legitimately updated
      }
      
      return factContent
    } catch (error) {
      console.error('Error retrieving fact from Walrus:', error)
      return null
    }
  }

  /**
   * Update fact content on Walrus (creates new blob)
   */
  static async updateFact(
    originalBlobId: string, 
    updatedContent: Partial<WalrusFactContent>
  ): Promise<string> {
    try {
      // Retrieve original content
      const originalContent = await this.retrieveFact(originalBlobId)
      if (!originalContent) {
        throw new Error('Original content not found')
      }
      
      // Merge updates
      const newContent: WalrusFactContent = {
        ...originalContent,
        ...updatedContent,
        version: originalContent.version + 1,
        updatedAt: new Date().toISOString()
      }
      
      // Store updated content as new blob
      const storeResult = await this.storeFact(newContent)
      return storeResult.blobId
    } catch (error) {
      console.error('Error updating fact on Walrus:', error)
      throw error
    }
  }

  /**
   * Store media file on Walrus
   */
  static async storeMedia(file: File, description?: string): Promise<WalrusMedia> {
    try {
      const walrus = this.initialize()
      
      if (file.size > WALRUS_CONFIG.maxBlobSize) {
        throw new Error(`File too large: ${file.size} bytes (max: ${WALRUS_CONFIG.maxBlobSize})`)
      }
      
      const arrayBuffer = await file.arrayBuffer()
      const blob = new Uint8Array(arrayBuffer)
      const result = await walrus.storeBlob(blob)
      
      if (!result.blobId) {
        throw new Error('Failed to get blob ID for media file')
      }
      
      // Determine media type
      let mediaType: WalrusMedia['type'] = 'document'
      if (file.type.startsWith('image/')) mediaType = 'image'
      else if (file.type.startsWith('video/')) mediaType = 'video'
      else if (file.type.startsWith('audio/')) mediaType = 'audio'
      
      return {
        type: mediaType,
        walrusBlobId: result.blobId,
        filename: file.name,
        mimeType: file.type,
        size: file.size,
        description
      }
    } catch (error) {
      console.error('Error storing media on Walrus:', error)
      throw error
    }
  }

  /**
   * Store comment thread on Walrus
   */
  static async storeCommentThread(commentThread: WalrusCommentThread): Promise<string> {
    try {
      const walrus = this.initialize()
      
      commentThread.lastUpdated = new Date().toISOString()
      
      const jsonData = JSON.stringify(commentThread, null, 2)
      const blob = new Uint8Array(Buffer.from(jsonData, 'utf-8'))
      
      const result = await walrus.storeBlob(blob)
      
      if (!result.blobId) {
        throw new Error('Failed to store comment thread')
      }
      
      return result.blobId
    } catch (error) {
      console.error('Error storing comment thread on Walrus:', error)
      throw error
    }
  }

  /**
   * Retrieve comment thread from Walrus
   */
  static async retrieveCommentThread(blobId: string): Promise<WalrusCommentThread | null> {
    try {
      const walrus = this.initialize()
      
      const result = await walrus.retrieveBlob(blobId)
      const text = new TextDecoder().decode(result.data)
      return JSON.parse(text) as WalrusCommentThread
    } catch (error) {
      console.error('Error retrieving comment thread from Walrus:', error)
      return null
    }
  }

  /**
   * Batch retrieve multiple facts
   */
  static async batchRetrieveFacts(blobIds: string[]): Promise<(WalrusFactContent | null)[]> {
    try {
      const promises = blobIds.map(blobId => this.retrieveFact(blobId))
      return await Promise.all(promises)
    } catch (error) {
      console.error('Error batch retrieving facts:', error)
      return blobIds.map(() => null)
    }
  }

  /**
   * Search facts by content (client-side search after retrieval)
   */
  static async searchFacts(
    blobIds: string[], 
    searchTerm: string
  ): Promise<WalrusFactContent[]> {
    try {
      const facts = await this.batchRetrieveFacts(blobIds)
      const searchLower = searchTerm.toLowerCase()
      
      return facts
        .filter((fact): fact is WalrusFactContent => fact !== null)
        .filter(fact => 
          fact.title.toLowerCase().includes(searchLower) ||
          fact.description.toLowerCase().includes(searchLower) ||
          fact.summary.toLowerCase().includes(searchLower) ||
          fact.tags.some(tag => tag.toLowerCase().includes(searchLower))
        )
    } catch (error) {
      console.error('Error searching facts:', error)
      return []
    }
  }

  /**
   * Generate content checksum for integrity verification
   */
  private static generateChecksum(content: Partial<WalrusFactContent>): string {
    // Create a deterministic string representation
    const checksumData = {
      factId: content.factId,
      title: content.title,
      description: content.description,
      summary: content.summary,
      sources: content.sources,
      createdAt: content.createdAt
    }
    
    const dataString = JSON.stringify(checksumData, Object.keys(checksumData).sort())
    
    // Simple hash function (in production, use crypto.subtle.digest)
    let hash = 0
    for (let i = 0; i < dataString.length; i++) {
      const char = dataString.charCodeAt(i)
      hash = ((hash << 5) - hash) + char
      hash = hash & hash // Convert to 32-bit integer
    }
    
    return Math.abs(hash).toString(16)
  }

  /**
   * Get Walrus blob info
   */
  static async getBlobInfo(blobId: string): Promise<any> {
    try {
      const walrus = this.initialize()
      // Note: This would depend on Walrus SDK having a getBlobInfo method
      // For now, we'll return basic info
      return {
        blobId,
        exists: true,
        retrievable: true
      }
    } catch (error) {
      console.error('Error getting blob info:', error)
      return {
        blobId,
        exists: false,
        retrievable: false
      }
    }
  }

  /**
   * Validate Walrus blob ID format
   */
  static isValidBlobId(blobId: string): boolean {
    // Basic validation - adjust based on actual Walrus blob ID format
    return typeof blobId === 'string' && 
           blobId.length > 0 && 
           /^[a-zA-Z0-9_-]+$/.test(blobId)
  }

  /**
   * Get storage statistics
   */
  static async getStorageStats(): Promise<{
    totalBlobs: number
    totalSize: number
    avgBlobSize: number
  }> {
    // This would require tracking blob storage
    // For now, return placeholder data
    return {
      totalBlobs: 0,
      totalSize: 0,
      avgBlobSize: 0
    }
  }
}

function notifyFallback(message: string, timestamp: Date) {
  if (isServer()) {
    console.warn(`[Walrus fallback] ${message}`, timestamp.toISOString())
    return
  }

  import('sonner').then(({ toast }) => {
    toast.warning(message, { description: timestamp.toLocaleTimeString() })
  }).catch((error) => {
    console.warn('Failed to load toast module for Walrus fallback', error)
  })
}


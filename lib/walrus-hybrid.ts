// Hybrid Walrus Service - Real network with intelligent fallback
// Automatically switches between real Walrus and mock based on network status

import { WalrusHttpService } from './walrus-http'

interface HybridConfig {
  publisherUrl: string
  aggregatorUrl: string
  maxBlobSize: number
  fallbackToMock: boolean
  healthCheckInterval: number // ms
}

interface MockStorage {
  [blobId: string]: {
    data: Uint8Array
    timestamp: number
    size: number
  }
}

export class WalrusHybridService {
  private walrusHttp: WalrusHttpService
  private config: HybridConfig
  private isWalrusHealthy: boolean = false
  private mockStorage: MockStorage = {}
  private lastHealthCheck: number = 0

  constructor(config?: Partial<HybridConfig>) {
    this.config = {
      publisherUrl: process.env.NEXT_PUBLIC_WALRUS_PUBLISHER_URL || 'https://publisher.walrus-testnet.walrus.space',
      aggregatorUrl: process.env.NEXT_PUBLIC_WALRUS_AGGREGATOR_URL || 'https://aggregator.walrus-testnet.walrus.space',
      maxBlobSize: 10 * 1024 * 1024,
      fallbackToMock: true,
      healthCheckInterval: 5 * 60 * 1000, // 5 minutes
      ...config
    }

    this.walrusHttp = new WalrusHttpService({
      publisherUrl: this.config.publisherUrl,
      aggregatorUrl: this.config.aggregatorUrl,
      maxBlobSize: this.config.maxBlobSize
    })

    // Initial health check
    this.checkWalrusHealth()
  }

  /**
   * Check if Walrus network is healthy
   */
  private async checkWalrusHealth(): Promise<boolean> {
    const now = Date.now()
    
    // Don't check too frequently
    if (now - this.lastHealthCheck < this.config.healthCheckInterval) {
      return this.isWalrusHealthy
    }

    try {
      const health = await this.walrusHttp.healthCheck()
      this.isWalrusHealthy = health.publisher.status === 'healthy' && health.aggregator.status === 'healthy'
      this.lastHealthCheck = now

      if (this.isWalrusHealthy) {
        console.log('✅ Walrus network is healthy - using real storage')
      } else {
        console.log('⚠️ Walrus network issues detected - using mock storage')
      }

      return this.isWalrusHealthy
    } catch (error) {
      console.log('❌ Walrus health check failed - using mock storage')
      this.isWalrusHealthy = false
      this.lastHealthCheck = now
      return false
    }
  }

  /**
   * Generate mock blob ID
   */
  private generateMockBlobId(): string {
    return `mock-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  }

  /**
   * Store blob with intelligent fallback
   */
  async storeBlob(data: Uint8Array | Buffer | string, epochs: number = 5): Promise<{
    blobId: string
    size: number
    encodedSize: number
    cost: string
    source: 'walrus' | 'mock'
  }> {
    // Convert data to Uint8Array
    let blob: Uint8Array
    if (typeof data === 'string') {
      blob = new Uint8Array(Buffer.from(data, 'utf-8'))
    } else if (Buffer.isBuffer(data)) {
      blob = new Uint8Array(data)
    } else {
      blob = data
    }

    // Check size limit
    if (blob.length > this.config.maxBlobSize) {
      throw new Error(`Blob too large: ${blob.length} bytes (max: ${this.config.maxBlobSize})`)
    }

    // Try Walrus first if enabled
    if (await this.checkWalrusHealth()) {
      try {
        console.log('📤 Attempting Walrus storage...')
        const result = await this.walrusHttp.storeBlob(blob, epochs)
        console.log('✅ Stored on real Walrus network!')
        return {
          ...result,
          source: 'walrus' as const
        }
      } catch (error) {
        console.log('❌ Walrus storage failed, falling back to mock:', error.message)
        this.isWalrusHealthy = false // Mark as unhealthy for next time
      }
    }

    // Fallback to mock storage
    if (this.config.fallbackToMock) {
      const blobId = this.generateMockBlobId()
      
      this.mockStorage[blobId] = {
        data: blob,
        timestamp: Date.now(),
        size: blob.length
      }

      console.log('📦 Stored in mock storage (fallback)')
      
      return {
        blobId,
        size: blob.length,
        encodedSize: blob.length,
        cost: '0',
        source: 'mock' as const
      }
    }

    throw new Error('Both Walrus and mock storage are unavailable')
  }

  /**
   * Retrieve blob with intelligent fallback
   */
  async retrieveBlob(blobId: string): Promise<{
    data: Uint8Array
    contentType?: string
    size: number
    source: 'walrus' | 'mock'
  }> {
    // Check if it's a mock blob ID
    if (blobId.startsWith('mock-')) {
      const mockData = this.mockStorage[blobId]
      if (mockData) {
        console.log('📥 Retrieved from mock storage')
        return {
          data: mockData.data,
          size: mockData.size,
          source: 'mock' as const
        }
      } else {
        throw new Error(`Mock blob not found: ${blobId}`)
      }
    }

    // Try Walrus first if healthy
    if (await this.checkWalrusHealth()) {
      try {
        console.log('📥 Attempting Walrus retrieval...')
        const result = await this.walrusHttp.retrieveBlob(blobId)
        console.log('✅ Retrieved from real Walrus network!')
        return {
          ...result,
          source: 'walrus' as const
        }
      } catch (error) {
        console.log('❌ Walrus retrieval failed:', error.message)
        this.isWalrusHealthy = false
      }
    }

    throw new Error(`Blob not found: ${blobId}`)
  }

  /**
   * Store JSON with intelligent fallback
   */
  async storeJSON(data: any, epochs: number = 5): Promise<{
    blobId: string
    size: number
    encodedSize: number
    cost: string
    source: 'walrus' | 'mock'
  }> {
    const jsonString = JSON.stringify(data, null, 2)
    return this.storeBlob(jsonString, epochs)
  }

  /**
   * Retrieve JSON with intelligent fallback
   */
  async retrieveJSON<T = any>(blobId: string): Promise<T> {
    const result = await this.retrieveBlob(blobId)
    const text = new TextDecoder().decode(result.data)
    return JSON.parse(text) as T
  }

  /**
   * Check if blob exists (tries both Walrus and mock)
   */
  async blobExists(blobId: string): Promise<boolean> {
    // Check mock storage first
    if (blobId.startsWith('mock-')) {
      return blobId in this.mockStorage
    }

    // Check Walrus if healthy
    if (await this.checkWalrusHealth()) {
      try {
        return await this.walrusHttp.blobExists(blobId)
      } catch (error) {
        return false
      }
    }

    return false
  }

  /**
   * Get service status
   */
  async getStatus(): Promise<{
    walrusHealthy: boolean
    mockEnabled: boolean
    totalMockBlobs: number
    lastHealthCheck: Date
  }> {
    await this.checkWalrusHealth()
    
    return {
      walrusHealthy: this.isWalrusHealthy,
      mockEnabled: this.config.fallbackToMock,
      totalMockBlobs: Object.keys(this.mockStorage).length,
      lastHealthCheck: new Date(this.lastHealthCheck)
    }
  }

  /**
   * Force health check
   */
  async forceHealthCheck(): Promise<boolean> {
    this.lastHealthCheck = 0 // Reset timer
    return this.checkWalrusHealth()
  }

  /**
   * Clear mock storage
   */
  clearMockStorage(): void {
    this.mockStorage = {}
    console.log('🗑️ Mock storage cleared')
  }

  /**
   * Get mock storage stats
   */
  getMockStats(): {
    totalBlobs: number
    totalSize: number
    oldestBlob: Date | null
    newestBlob: Date | null
  } {
    const blobs = Object.values(this.mockStorage)
    const timestamps = blobs.map(b => b.timestamp)
    
    return {
      totalBlobs: blobs.length,
      totalSize: blobs.reduce((sum, b) => sum + b.size, 0),
      oldestBlob: timestamps.length > 0 ? new Date(Math.min(...timestamps)) : null,
      newestBlob: timestamps.length > 0 ? new Date(Math.max(...timestamps)) : null
    }
  }
}

// Global instance
let walrusHybridService: WalrusHybridService | null = null

/**
 * Get or create the global hybrid Walrus service
 */
export function getWalrusHybridService(): WalrusHybridService {
  if (!walrusHybridService) {
    walrusHybridService = new WalrusHybridService()
  }
  return walrusHybridService
}

/**
 * Initialize hybrid service with custom config
 */
export function initializeWalrusHybrid(config?: Partial<HybridConfig>): WalrusHybridService {
  walrusHybridService = new WalrusHybridService(config)
  return walrusHybridService
}

export default WalrusHybridService

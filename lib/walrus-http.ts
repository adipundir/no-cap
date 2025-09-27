// Walrus HTTP API Integration - No Sui Wallet Required!
// Uses direct HTTP calls to Walrus publisher/aggregator endpoints

interface WalrusHttpConfig {
  publisherUrl: string
  aggregatorUrl: string
  maxBlobSize: number
}

const WALRUS_HTTP_CONFIG: WalrusHttpConfig = {
  publisherUrl: process.env.NEXT_PUBLIC_WALRUS_PUBLISHER_URL || 'https://publisher.walrus-testnet.walrus.space',
  aggregatorUrl: process.env.NEXT_PUBLIC_WALRUS_AGGREGATOR_URL || 'https://aggregator.walrus-testnet.walrus.space',
  maxBlobSize: 10 * 1024 * 1024, // 10MB
}

export interface WalrusStoreResponse {
  blobId: string
  size: number
  encodedSize: number
  cost: string
}

export interface WalrusRetrieveResponse {
  data: Uint8Array
  contentType?: string
  size: number
}

/**
 * Walrus HTTP Service - Direct API calls, no Sui wallet needed!
 * Perfect for World Chain apps that need decentralized storage
 */
export class WalrusHttpService {
  private config: WalrusHttpConfig

  constructor(config?: Partial<WalrusHttpConfig>) {
    this.config = { ...WALRUS_HTTP_CONFIG, ...config }
  }

  /**
   * Store blob using HTTP PUT to Walrus publisher
   * No Sui wallet required - just HTTP!
   */
  async storeBlob(data: Uint8Array | Buffer | string, epochs: number = 5): Promise<WalrusStoreResponse> {
    try {
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

      console.log(`📤 Storing ${blob.length} bytes on Walrus via HTTP...`)

      // Store via HTTP PUT
      const response = await fetch(`${this.config.publisherUrl}/v1/store?epochs=${epochs}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/octet-stream',
        },
        body: blob.buffer,
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`Walrus store failed: ${response.status} ${response.statusText} - ${errorText}`)
      }

      const result = await response.json()
      
      console.log('✅ Stored on Walrus:', {
        blobId: result.newlyCreated?.blobObject?.blobId || result.alreadyCertified?.blobId,
        size: blob.length
      })

      return {
        blobId: result.newlyCreated?.blobObject?.blobId || result.alreadyCertified?.blobId,
        size: blob.length,
        encodedSize: result.newlyCreated?.blobObject?.encodedSize || blob.length,
        cost: result.cost || '0'
      }
    } catch (error) {
      console.error('❌ Walrus store error:', error)
      throw new Error(`Failed to store on Walrus: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  /**
   * Retrieve blob using HTTP GET from Walrus aggregator
   * No wallet needed - just HTTP!
   */
  async retrieveBlob(blobId: string): Promise<WalrusRetrieveResponse> {
    try {
      console.log(`📥 Retrieving blob ${blobId} from Walrus...`)

      const response = await fetch(`${this.config.aggregatorUrl}/v1/${blobId}`, {
        method: 'GET',
      })

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error(`Blob not found: ${blobId}`)
        }
        const errorText = await response.text()
        throw new Error(`Walrus retrieve failed: ${response.status} ${response.statusText} - ${errorText}`)
      }

      const arrayBuffer = await response.arrayBuffer()
      const data = new Uint8Array(arrayBuffer)

      console.log('✅ Retrieved from Walrus:', {
        blobId,
        size: data.length,
        contentType: response.headers.get('content-type')
      })

      return {
        data,
        contentType: response.headers.get('content-type') || undefined,
        size: data.length
      }
    } catch (error) {
      console.error('❌ Walrus retrieve error:', error)
      throw new Error(`Failed to retrieve from Walrus: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  /**
   * Store JSON data on Walrus
   */
  async storeJSON(data: any, epochs: number = 5): Promise<WalrusStoreResponse> {
    const jsonString = JSON.stringify(data, null, 2)
    return this.storeBlob(jsonString, epochs)
  }

  /**
   * Retrieve and parse JSON data from Walrus
   */
  async retrieveJSON<T = any>(blobId: string): Promise<T> {
    const result = await this.retrieveBlob(blobId)
    const text = new TextDecoder().decode(result.data)
    return JSON.parse(text) as T
  }

  /**
   * Check if blob exists on Walrus
   */
  async blobExists(blobId: string): Promise<boolean> {
    try {
      const response = await fetch(`${this.config.aggregatorUrl}/v1/${blobId}`, {
        method: 'HEAD', // Just check headers, don't download
      })
      return response.ok
    } catch (error) {
      return false
    }
  }

  /**
   * Get blob info without downloading content
   */
  async getBlobInfo(blobId: string): Promise<{
    exists: boolean
    size?: number
    contentType?: string
  }> {
    try {
      const response = await fetch(`${this.config.aggregatorUrl}/v1/${blobId}`, {
        method: 'HEAD',
      })

      if (!response.ok) {
        return { exists: false }
      }

      return {
        exists: true,
        size: response.headers.get('content-length') ? parseInt(response.headers.get('content-length')!) : undefined,
        contentType: response.headers.get('content-type') || undefined
      }
    } catch (error) {
      return { exists: false }
    }
  }

  /**
   * Health check for Walrus endpoints
   */
  async healthCheck(): Promise<{
    publisher: { status: 'healthy' | 'unhealthy'; latency: number }
    aggregator: { status: 'healthy' | 'unhealthy'; latency: number }
  }> {
    const checkEndpoint = async (url: string) => {
      const start = Date.now()
      try {
        const response = await fetch(url, { method: 'HEAD' })
        return {
          status: response.ok ? 'healthy' as const : 'unhealthy' as const,
          latency: Date.now() - start
        }
      } catch (error) {
        return {
          status: 'unhealthy' as const,
          latency: Date.now() - start
        }
      }
    }

    const [publisher, aggregator] = await Promise.all([
      checkEndpoint(this.config.publisherUrl),
      checkEndpoint(this.config.aggregatorUrl)
    ])

    return { publisher, aggregator }
  }

  /**
   * Batch store multiple blobs
   */
  async storeBatch(blobs: (Uint8Array | Buffer | string)[], epochs: number = 5): Promise<WalrusStoreResponse[]> {
    const results: WalrusStoreResponse[] = []
    
    // Process in parallel for better performance
    const promises = blobs.map(blob => this.storeBlob(blob, epochs))
    const settled = await Promise.allSettled(promises)
    
    for (const result of settled) {
      if (result.status === 'fulfilled') {
        results.push(result.value)
      } else {
        console.error('Batch store error:', result.reason)
      }
    }
    
    return results
  }

  /**
   * Batch retrieve multiple blobs
   */
  async retrieveBatch(blobIds: string[]): Promise<(WalrusRetrieveResponse | null)[]> {
    const promises = blobIds.map(async (blobId) => {
      try {
        return await this.retrieveBlob(blobId)
      } catch (error) {
        console.error(`Batch retrieve error for ${blobId}:`, error)
        return null
      }
    })
    
    return Promise.all(promises)
  }
}

// Global instance
let walrusHttpService: WalrusHttpService | null = null

/**
 * Get or create the global Walrus HTTP service
 */
export function getWalrusHttpService(): WalrusHttpService {
  if (!walrusHttpService) {
    walrusHttpService = new WalrusHttpService()
  }
  return walrusHttpService
}

/**
 * Initialize Walrus HTTP service with custom config
 */
export function initializeWalrusHttp(config?: Partial<WalrusHttpConfig>): WalrusHttpService {
  walrusHttpService = new WalrusHttpService(config)
  return walrusHttpService
}

export default WalrusHttpService

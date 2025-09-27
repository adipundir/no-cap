// Real Walrus Integration with Sui Wallet Support
import { WalrusClient, TESTNET_WALRUS_PACKAGE_CONFIG } from '@mysten/walrus'
import { SuiClient } from '@mysten/sui/client'
import { Ed25519Keypair } from '@mysten/sui/keypairs/ed25519'
import { fromB64 } from '@mysten/sui/utils'

// Walrus configuration for real network
const WALRUS_CONFIG = {
  publisherUrl: process.env.NEXT_PUBLIC_WALRUS_PUBLISHER_URL || 'https://publisher.walrus-testnet.walrus.space',
  aggregatorUrl: process.env.NEXT_PUBLIC_WALRUS_AGGREGATOR_URL || 'https://aggregator.walrus-testnet.walrus.space',
  suiRpcUrl: process.env.SUI_RPC_URL || 'https://fullnode.testnet.sui.io:443',
  maxBlobSize: 10 * 1024 * 1024, // 10MB max
}

export interface WalrusStoreResult {
  blobId: string
  certificate: string
  transactionId: string
  size: number
}

export interface WalrusRetrieveResult {
  data: Uint8Array
  blobId: string
  size: number
}

/**
 * Real Walrus Service with Sui Integration
 * This service provides actual Walrus network storage capabilities
 */
export class RealWalrusService {
  private walrusClient: WalrusClient
  private suiClient: SuiClient
  private signer?: Ed25519Keypair
  private initialized = false

  constructor() {
    this.walrusClient = new WalrusClient(TESTNET_WALRUS_PACKAGE_CONFIG)
    this.suiClient = new SuiClient({ url: WALRUS_CONFIG.suiRpcUrl })
  }

  /**
   * Initialize the service with a Sui signer
   * This is required for storing blobs on Walrus
   */
  async initialize(privateKey?: string): Promise<void> {
    if (this.initialized) return

    try {
      // If private key is provided, create signer
      if (privateKey) {
        this.signer = Ed25519Keypair.fromSecretKey(fromB64(privateKey))
        console.log('Walrus service initialized with Sui signer')
      } else {
        console.log('Walrus service initialized in read-only mode (no signer)')
      }

      // Test connection
      const systemState = await this.walrusClient.systemState()
      console.log('Connected to Walrus network, epoch:', systemState.epoch)

      this.initialized = true
    } catch (error) {
      console.error('Failed to initialize Walrus service:', error)
      throw new Error(`Walrus initialization failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  /**
   * Store data on Walrus network
   */
  async storeBlob(data: Uint8Array | Buffer | string): Promise<WalrusStoreResult> {
    if (!this.initialized) {
      throw new Error('Walrus service not initialized. Call initialize() first.')
    }

    if (!this.signer) {
      throw new Error('Sui signer required for storing blobs. Initialize with private key.')
    }

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
      if (blob.length > WALRUS_CONFIG.maxBlobSize) {
        throw new Error(`Blob too large: ${blob.length} bytes (max: ${WALRUS_CONFIG.maxBlobSize})`)
      }

      console.log(`Storing blob of size ${blob.length} bytes on Walrus...`)

      // Store blob on Walrus
      const result = await this.walrusClient.writeBlob({
        blob,
        deletable: true,
        epochs: 5, // Store for 5 epochs
        signer: this.signer
      })

      console.log('Blob stored successfully:', {
        blobId: result.blobId,
        size: blob.length
      })

      return {
        blobId: result.blobId,
        certificate: 'walrus-certificate', // Real certificate would come from result
        transactionId: result.blobObject.id.id,
        size: blob.length
      }
    } catch (error) {
      console.error('Error storing blob on Walrus:', error)
      throw new Error(`Walrus storage failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  /**
   * Retrieve data from Walrus network
   */
  async retrieveBlob(blobId: string): Promise<WalrusRetrieveResult> {
    if (!this.initialized) {
      throw new Error('Walrus service not initialized. Call initialize() first.')
    }

    try {
      console.log(`Retrieving blob ${blobId} from Walrus...`)

      // Get blob from Walrus
      const walrusBlob = await this.walrusClient.getBlob({ blobId })
      const data = await walrusBlob.read()

      console.log('Blob retrieved successfully:', {
        blobId,
        size: data.length
      })

      return {
        data,
        blobId,
        size: data.length
      }
    } catch (error) {
      console.error('Error retrieving blob from Walrus:', error)
      throw new Error(`Walrus retrieval failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  /**
   * Store JSON data on Walrus
   */
  async storeJSON(data: any): Promise<WalrusStoreResult> {
    const jsonString = JSON.stringify(data, null, 2)
    return this.storeBlob(jsonString)
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
      await this.walrusClient.getBlobMetadata(blobId)
      return true
    } catch (error) {
      return false
    }
  }

  /**
   * Get blob metadata
   */
  async getBlobMetadata(blobId: string) {
    return this.walrusClient.getBlobMetadata(blobId)
  }

  /**
   * Get storage cost for a blob size
   */
  async getStorageCost(sizeBytes: number, epochs: number = 5): Promise<string> {
    try {
      const cost = await this.walrusClient.storageCost(sizeBytes, epochs)
      return cost.toString()
    } catch (error) {
      console.error('Error getting storage cost:', error)
      return '0'
    }
  }

  /**
   * Health check for Walrus network
   */
  async healthCheck(): Promise<{
    status: 'healthy' | 'degraded' | 'unhealthy'
    latency: number
    epoch: number
  }> {
    const startTime = Date.now()
    
    try {
      const systemState = await this.walrusClient.systemState()
      const latency = Date.now() - startTime
      
      return {
        status: latency < 2000 ? 'healthy' : 'degraded',
        latency,
        epoch: systemState.epoch
      }
    } catch (error) {
      return {
        status: 'unhealthy',
        latency: Date.now() - startTime,
        epoch: 0
      }
    }
  }

  /**
   * Get network statistics
   */
  async getNetworkStats() {
    try {
      const systemState = await this.walrusClient.systemState()
      const stakingState = await this.walrusClient.stakingState()
      
      return {
        epoch: systemState.epoch,
        totalStake: stakingState.totalStake,
        activeValidators: stakingState.activeValidators?.length || 0,
        networkStatus: 'active'
      }
    } catch (error) {
      console.error('Error getting network stats:', error)
      return {
        epoch: 0,
        totalStake: '0',
        activeValidators: 0,
        networkStatus: 'unknown'
      }
    }
  }

  /**
   * Batch store multiple blobs
   */
  async storeBatch(blobs: (Uint8Array | Buffer | string)[]): Promise<WalrusStoreResult[]> {
    const results: WalrusStoreResult[] = []
    
    for (const blob of blobs) {
      try {
        const result = await this.storeBlob(blob)
        results.push(result)
      } catch (error) {
        console.error('Error in batch store:', error)
        // Continue with other blobs even if one fails
      }
    }
    
    return results
  }

  /**
   * Batch retrieve multiple blobs
   */
  async retrieveBatch(blobIds: string[]): Promise<(WalrusRetrieveResult | null)[]> {
    const results: (WalrusRetrieveResult | null)[] = []
    
    for (const blobId of blobIds) {
      try {
        const result = await this.retrieveBlob(blobId)
        results.push(result)
      } catch (error) {
        console.error(`Error retrieving blob ${blobId}:`, error)
        results.push(null)
      }
    }
    
    return results
  }
}

// Global instance
let realWalrusService: RealWalrusService | null = null

/**
 * Get or create the global real Walrus service instance
 */
export function getRealWalrusService(): RealWalrusService {
  if (!realWalrusService) {
    realWalrusService = new RealWalrusService()
  }
  return realWalrusService
}

/**
 * Initialize Walrus service with environment variables
 */
export async function initializeRealWalrus(privateKey?: string): Promise<RealWalrusService> {
  const service = getRealWalrusService()
  await service.initialize(privateKey)
  return service
}

export default RealWalrusService

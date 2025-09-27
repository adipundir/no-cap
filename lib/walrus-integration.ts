import {
  WalrusIntegration,
  WalrusStorageConfig,
  WalrusStorageService,
  WalrusCache
} from '@/types/walrus';
import { createWalrusStorage, MemoryWalrusCache } from './walrus-storage';

/**
 * Main Walrus Integration Implementation
 * Orchestrates all Walrus-related functionality for the no-cap application
 */
export class WalrusIntegrationImpl implements WalrusIntegration {
  public storage: WalrusStorageService;
  public cache?: WalrusCache;
  public config: WalrusStorageConfig;

  private initialized = false;

  constructor(config: WalrusStorageConfig) {
    this.config = config;
    this.cache = new MemoryWalrusCache();
    this.storage = createWalrusStorage(config, true);
  }

  async initialize(): Promise<void> {
    if (this.initialized) return;

    try {
      // Perform health check to ensure Walrus is accessible
      const health = await this.healthCheck();
      if (health.status === 'unhealthy') {
        throw new Error('Walrus network is not accessible');
      }

      this.initialized = true;
      console.log('Walrus integration initialized successfully');
    } catch (error) {
      console.error('Failed to initialize Walrus integration:', error);
      throw error;
    }
  }

  async shutdown(): Promise<void> {
    if (!this.initialized) return;

    try {
      // Clear cache
      if (this.cache) {
        await this.cache.clear();
      }

      // Clean up any background processes
      if (this.cache instanceof MemoryWalrusCache) {
        this.cache.destroy();
      }

      this.initialized = false;
      console.log('Walrus integration shut down successfully');
    } catch (error) {
      console.error('Error during Walrus integration shutdown:', error);
    }
  }

  async healthCheck(): Promise<{
    status: 'healthy' | 'degraded' | 'unhealthy';
    latency: number;
    availableNodes: number;
  }> {
    const startTime = Date.now();
    
    try {
      // Attempt a simple operation to test connectivity
      const testData = new Uint8Array(Buffer.from('health-check-test', 'utf-8'));
      await this.storage.storeBlob(testData, { 
        mimeType: 'text/plain',
        metadata: { purpose: 'health-check' }
      });

      const latency = Date.now() - startTime;
      
      return {
        status: latency < 1000 ? 'healthy' : 'degraded',
        latency,
        availableNodes: 1 // Would need actual node discovery
      };
    } catch (error) {
      return {
        status: 'unhealthy',
        latency: Date.now() - startTime,
        availableNodes: 0
      };
    }
  }
}

/**
 * Global Walrus integration instance
 */
let walrusIntegration: WalrusIntegration | null = null;

/**
 * Get or create the global Walrus integration instance
 */
export function getWalrusIntegration(config?: WalrusStorageConfig): WalrusIntegration {
  if (!walrusIntegration) {
    if (!config) {
      throw new Error('Walrus configuration is required for first-time initialization');
    }
    walrusIntegration = new WalrusIntegrationImpl(config);
  }
  return walrusIntegration;
}

/**
 * Initialize Walrus with environment-based configuration
 */
export function initializeWalrusFromEnv(): WalrusIntegration {
  const config: WalrusStorageConfig = {
    aggregatorUrl: process.env.WALRUS_AGGREGATOR_URL || 'https://aggregator.walrus.host',
    publisherUrl: process.env.WALRUS_PUBLISHER_URL || 'https://publisher.walrus.host',
    apiUrl: process.env.WALRUS_API_URL,
    suiNetworkUrl: process.env.SUI_NETWORK_URL || 'https://sui-mainnet.nodereal.io',
    defaultExpiration: parseInt(process.env.WALRUS_DEFAULT_EXPIRATION || '86400000'), // 24 hours
    maxBlobSize: parseInt(process.env.WALRUS_MAX_BLOB_SIZE || '10485760') // 10MB
  };

  return getWalrusIntegration(config);
}

/**
 * Hook for Next.js API routes to get Walrus integration
 */
export function useWalrusIntegration(): WalrusIntegration {
  try {
    return getWalrusIntegration();
  } catch (error) {
    // Try to initialize from environment if not already initialized
    return initializeWalrusFromEnv();
  }
}

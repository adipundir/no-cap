import { WalrusHybridService, getWalrusHybridService } from './walrus-hybrid';

/**
 * Main Walrus Integration Implementation
 * Orchestrates all Walrus-related functionality for the no-cap application
 * Now uses HTTP-based Walrus service with intelligent fallback
 */
export class WalrusIntegrationImpl {
  public storage: WalrusHybridService;
  public config: any;

  private initialized = false;

  constructor(config?: any) {
    this.config = config || {};
    this.storage = getWalrusHybridService();
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
      // Clear mock storage if needed
      this.storage.clearMockStorage();

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
      // Get status from the hybrid service
      const status = await this.storage.getStatus();
      const latency = Date.now() - startTime;
      
      return {
        status: status.walrusHealthy ? 'healthy' : 'degraded',
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
let walrusIntegration: WalrusIntegrationImpl | null = null;

/**
 * Get or create the global Walrus integration instance
 */
export function getWalrusIntegration(config?: any): WalrusIntegrationImpl {
  if (!walrusIntegration) {
    walrusIntegration = new WalrusIntegrationImpl(config);
  }
  return walrusIntegration;
}

/**
 * Initialize Walrus with environment-based configuration
 */
export function initializeWalrusFromEnv(): WalrusIntegrationImpl {
  const config = {
    aggregatorUrl: process.env.NEXT_PUBLIC_WALRUS_AGGREGATOR_URL || 'https://aggregator.walrus-testnet.walrus.space',
    publisherUrl: process.env.NEXT_PUBLIC_WALRUS_PUBLISHER_URL || 'https://publisher.walrus-testnet.walrus.space',
    maxBlobSize: 10 * 1024 * 1024 // 10MB
  };

  return getWalrusIntegration(config);
}

/**
 * Hook for Next.js API routes to get Walrus integration
 */
export function useWalrusIntegration(): WalrusIntegrationImpl {
  return initializeWalrusFromEnv();
}

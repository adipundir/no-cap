/**
 * Walrus Data SDK
 * 
 * A comprehensive TypeScript SDK for storing, querying, and indexing structured data 
 * on the Walrus decentralized storage network with O(1) lookup capabilities
 * 
 * @version 2.0.0
 * @author Walrus Data SDK Team
 */

// Export main client
export { WalrusDataClient } from './client';

// Export all types
export type {
  WalrusDataConfig,
  WalrusDataClientOptions,
  WalrusDataItem,
  WalrusDataMetadata,
  WalrusQueryOptions,
  WalrusSearchQuery,
  WalrusQueryResults,
  WalrusPaginationOptions,
  WalrusPaginatedResponse,
  WalrusStoreOptions,
  WalrusStoreResult,
  WalrusRetrieveResult,
  WalrusBulkQuery,
  WalrusBulkResult,
  WalrusIndexStats,
  WalrusHealthCheck,
  WalrusDataError,
  WalrusNetworkError,
  WalrusValidationError,
  WalrusNotFoundError,
  WalrusStorageError,
  WalrusIndexError,
  WalrusRateLimitError,
  WalrusCache,
  WalrusCacheOptions,
  WalrusIndex,
  WalrusIndexQuery,
  WalrusIndexResult,
  WalrusMetrics,
  WalrusDataEvent,
  WalrusEventCallback,
  WalrusSubscriptionOptions,
  WalrusDataSchema,
  WalrusResponse,
  WalrusRateLimit,
  WalrusDataId,
  WalrusBlobId,
  WalrusContentHash
} from './types';

// Re-export utilities
export {
  validateDataId,
  sanitizeQuery,
  generateSchema,
  validateSchema,
  createIndex,
  optimizeQuery
} from './utils';

// Import types for internal use
import type {
  WalrusDataConfig,
  WalrusDataClientOptions,
  WalrusSearchQuery,
  WalrusQueryResults,
  WalrusStoreOptions,
  WalrusStoreResult,
  WalrusRetrieveResult,
  WalrusHealthCheck,
  WalrusIndexStats
} from './types';
import { WalrusDataClient } from './client';

/**
 * Default configuration for Walrus Data SDK
 */
export const DEFAULT_CONFIG: WalrusDataConfig = {
  publisherUrl: 'https://publisher.walrus-testnet.walrus.space',
  aggregatorUrl: 'https://aggregator.walrus-testnet.walrus.space',
  timeout: 30000,
  retries: 3,
  retryDelay: 1000,
  userAgent: 'walrus-data-sdk/2.0.0',
  maxBlobSize: 10 * 1024 * 1024, // 10MB
  defaultEpochs: 5
};

/**
 * Create a new Walrus Data client instance
 * 
 * @param options - Configuration options
 * @returns WalrusDataClient instance
 */
export function createClient(options?: WalrusDataClientOptions): WalrusDataClient {
  return new WalrusDataClient(options);
}

/**
 * Create a client with optimized settings for specific use cases
 */
export function createOptimizedClient(
  useCase: 'high-throughput' | 'low-latency' | 'large-data' | 'real-time',
  options?: WalrusDataClientOptions
): WalrusDataClient {
  let optimizedOptions: WalrusDataClientOptions;

  switch (useCase) {
    case 'high-throughput':
      optimizedOptions = {
        timeout: 60000,
        retries: 1,
        enableCaching: true,
        cacheTimeout: 600000, // 10 minutes
        ...options
      };
      break;
    
    case 'low-latency':
      optimizedOptions = {
        timeout: 5000,
        retries: 0,
        enableCaching: true,
        cacheTimeout: 60000, // 1 minute
        ...options
      };
      break;
    
    case 'large-data':
      optimizedOptions = {
        timeout: 300000, // 5 minutes
        maxBlobSize: 50 * 1024 * 1024, // 50MB
        retries: 5,
        retryDelay: 2000,
        ...options
      };
      break;
    
    case 'real-time':
      optimizedOptions = {
        timeout: 10000,
        retries: 2,
        enableCaching: false, // Always get fresh data
        ...options
      };
      break;
    
    default:
      optimizedOptions = options || {};
  }

  return new WalrusDataClient(optimizedOptions);
}

/**
 * SDK version information
 */
export const VERSION = '2.0.0';
export const API_VERSION = 'v2';

/**
 * Quick access functions for common operations without creating a client
 */

/**
 * Store data on Walrus with a simple function call
 * 
 * @param data - Data to store
 * @param options - Storage options
 * @returns Promise with storage result
 */
export async function store<T = any>(
  data: T, 
  options?: WalrusStoreOptions & WalrusDataClientOptions
): Promise<WalrusStoreResult> {
  const client = createClient(options);
  return client.store(data, options);
}

/**
 * Retrieve data from Walrus by ID
 * 
 * @param id - Data ID or blob ID
 * @param isBlob - Whether the ID is a blob ID (default: false)
 * @param options - Client options
 * @returns Promise with retrieved data
 */
export async function retrieve<T = any>(
  id: string, 
  isBlob = false,
  options?: WalrusDataClientOptions
): Promise<WalrusRetrieveResult<T>> {
  const client = createClient(options);
  return client.retrieve<T>(id, isBlob);
}

/**
 * Query data with advanced filters and indexing
 * 
 * @param query - Search query
 * @param options - Client options
 * @returns Promise with query results
 */
export async function query<T = any>(
  query: WalrusSearchQuery<T>, 
  options?: WalrusDataClientOptions
): Promise<WalrusQueryResults<T>> {
  const client = createClient(options);
  return client.query(query);
}

/**
 * Get health status of Walrus network
 * 
 * @param options - Client options
 * @returns Promise with health check results
 */
export async function healthCheck(options?: WalrusDataClientOptions): Promise<WalrusHealthCheck> {
  const client = createClient(options);
  return client.healthCheck();
}

/**
 * Get statistics about indexed data
 * 
 * @param options - Client options
 * @returns Promise with index statistics
 */
export async function getStats(options?: WalrusDataClientOptions): Promise<WalrusIndexStats> {
  const client = createClient(options);
  return client.getStats();
}

/**
 * Utility functions for working with Walrus data
 */

/**
 * Create a simple key-value store interface
 */
export class WalrusKVStore {
  private client: WalrusDataClient;

  constructor(options?: WalrusDataClientOptions) {
    this.client = createClient(options);
  }

  async set(key: string, value: any): Promise<string> {
    const result = await this.client.store({ key, value }, {
      schema: 'kv-store',
      categories: ['key-value']
    });
    return result.dataId;
  }

  async get<T = any>(key: string): Promise<T | null> {
    try {
      const results = await this.client.query({
        schema: ['kv-store'],
        fieldQueries: [{ field: 'key', value: key, operator: 'eq' }],
        limit: 1
      });
      
      return results.items.length > 0 ? results.items[0].data.value : null;
    } catch (error) {
      return null; // Return null if not found or any other error
    }
  }

  async delete(key: string): Promise<boolean> {
    // Walrus doesn't support deletion, but we can mark items as deleted
    const results = await this.client.query({
      schema: ['kv-store'],
      fieldQueries: [{ field: 'key', value: key, operator: 'eq' }],
      limit: 1
    });

    if (results.items.length > 0) {
      await this.client.store({ 
        key, 
        value: null, 
        deleted: true, 
        deletedAt: new Date() 
      }, {
        schema: 'kv-store',
        categories: ['key-value', 'deleted']
      });
      return true;
    }
    return false;
  }

  async exists(key: string): Promise<boolean> {
    const results = await this.client.query({
      schema: ['kv-store'],
      fieldQueries: [{ field: 'key', value: key, operator: 'eq' }],
      limit: 1
    });
    return results.items.length > 0;
  }

  async keys(pattern?: string): Promise<string[]> {
    const results = await this.client.query({
      schema: ['kv-store'],
      limit: 1000
    });

    let keys = results.items.map(item => item.data.key);
    
    if (pattern) {
      const regex = new RegExp(pattern.replace(/\*/g, '.*'));
      keys = keys.filter(key => regex.test(key));
    }
    
    return keys;
  }
}

/**
 * Create a document store interface
 */
export class WalrusDocumentStore {
  private client: WalrusDataClient;
  private collection: string;

  constructor(collection: string, options?: WalrusDataClientOptions) {
    this.client = createClient(options);
    this.collection = collection;
  }

  async insert<T = any>(document: T, id?: string): Promise<string> {
    const result = await this.client.store(document, {
      schema: `document-${this.collection}`,
      categories: ['document', this.collection],
      metadata: id ? { contentType: 'application/json' } : undefined
    });
    return result.dataId;
  }

  async find<T = any>(query: Partial<WalrusSearchQuery<T>> = {}): Promise<T[]> {
    const results = await this.client.query({
      ...query,
      schema: [`document-${this.collection}`],
      categories: ['document', this.collection]
    });
    return results.items.map(item => item.data);
  }

  async findOne<T = any>(query: Partial<WalrusSearchQuery<T>> = {}): Promise<T | null> {
    const results = await this.find({ ...query, limit: 1 });
    return results.length > 0 ? results[0] : null;
  }

  async count(query: Partial<WalrusSearchQuery> = {}): Promise<number> {
    const results = await this.client.query({
      ...query,
      schema: [`document-${this.collection}`],
      categories: ['document', this.collection],
      includeData: false,
      limit: 0
    });
    return results.totalCount;
  }
}

/**
 * Export convenience store creators
 */
export { WalrusKVStore as KVStore, WalrusDocumentStore as DocumentStore };

/**
 * Helper function to create multiple stores
 */
export function createStores(options?: WalrusDataClientOptions) {
  return {
    kv: (name = 'default') => new WalrusKVStore({ ...options }),
    documents: (collection: string) => new WalrusDocumentStore(collection, options),
    client: createClient(options)
  };
}

// Error classes are already exported via the type exports above
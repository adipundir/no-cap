/**
 * Walrus Data SDK Client
 * 
<<<<<<< HEAD
 * Main client class providing access to NOCAP verified facts database
 * 
 * TODO: Fix type imports and implementation - temporarily simplified for build
 */

/**
 * NOCAP Client - Main SDK class
 * Temporarily simplified for build - returns mock/empty data
 */
export class NOCAPClient {
  constructor(options?: any) {
    // Simplified constructor
  }

  async getFacts(options?: any): Promise<any> {
    return { facts: [], total: 0, page: 1, pageSize: 10 }
  }

  async getFact(factId: string): Promise<any> {
    return null
  }

  async searchFacts(query: any): Promise<any> {
    return { facts: [], total: 0, query }
  }

  async getStats(): Promise<any> {
    return { totalFacts: 0, verifiedFacts: 0, pendingFacts: 0 }
  }

  async healthCheck(): Promise<any> {
    return { status: 'ok', timestamp: new Date().toISOString() }
  }

  async getMetrics(): Promise<any> {
    return { requestCount: 0, avgResponseTime: 0 }
  }
}

// Export default instance
export default NOCAPClient
=======
 * Main client class providing generic access to structured data stored on Walrus
 */

// HTTP-based Walrus integration - no external dependencies needed

/**
 * Simple HTTP-based Walrus client for direct API calls
 */
class SimpleWalrusClient {
  private publisherUrl: string;
  private aggregatorUrl: string;

  constructor(publisherUrl: string, aggregatorUrl: string) {
    this.publisherUrl = publisherUrl;
    this.aggregatorUrl = aggregatorUrl;
  }

  async store(options: { data: Buffer | Uint8Array; epochs: number }): Promise<{
    blobId: string;
    encodedSize: number;
    cost: string;
  }> {
    try {
      // Convert Buffer to Uint8Array for web compatibility
      const body = options.data instanceof Buffer 
        ? new Uint8Array(options.data) 
        : options.data;

      const response = await fetch(`${this.publisherUrl}/v1/store?epochs=${options.epochs}`, {
        method: 'PUT',
        body: body as BodyInit,
        headers: {
          'Content-Type': 'application/octet-stream'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();
      return {
        blobId: result.alreadyCertified?.blobId || result.newlyCreated?.blobObject?.blobId || 'unknown',
        encodedSize: result.alreadyCertified?.encodedSize || result.newlyCreated?.encodedSize || 0,
        cost: '0' // Simplified for now
      };
    } catch (error) {
      throw new Error(`Walrus store failed: ${error}`);
    }
  }

  async retrieve(blobId: string): Promise<{ data: ArrayBuffer }> {
    try {
      const response = await fetch(`${this.aggregatorUrl}/v1/${blobId}`);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.arrayBuffer();
      return { data };
    } catch (error) {
      throw new Error(`Walrus retrieve failed: ${error}`);
    }
  }
}

import {
  WalrusDataConfig,
  WalrusDataClientOptions,
  WalrusDataItem,
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
  WalrusRateLimitError,
  WalrusIndexError,
  WalrusMetrics,
  WalrusCache,
  WalrusIndex,
  WalrusIndexQuery,
  WalrusIndexResult,
  WalrusDataSchema,
  WalrusDataEvent,
  WalrusEventCallback,
  WalrusSubscriptionOptions
} from './types';

/**
 * Default configuration for Walrus Data Client
 */
const DEFAULT_CONFIG: WalrusDataConfig = {
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
 * Simple in-memory cache implementation
 */
class MemoryCache implements WalrusCache {
  private cache = new Map<string, { value: any; expires: number }>();
  private maxSize: number;

  constructor(maxSize = 1000) {
    this.maxSize = maxSize;
  }

  async get<T>(key: string): Promise<T | null> {
    const item = this.cache.get(key);
    if (!item) return null;
    
    if (Date.now() > item.expires) {
      this.cache.delete(key);
      return null;
    }
    
    return item.value as T;
  }

  async set<T>(key: string, value: T, ttl = 300000): Promise<void> { // 5 minutes default
    // Remove oldest entries if at capacity
    if (this.cache.size >= this.maxSize) {
      const firstKey = this.cache.keys().next().value;
      if (firstKey) this.cache.delete(firstKey);
    }
    
    this.cache.set(key, {
      value,
      expires: Date.now() + ttl
    });
  }

  async delete(key: string): Promise<void> {
    this.cache.delete(key);
  }

  async clear(): Promise<void> {
    this.cache.clear();
  }

  async size(): Promise<number> {
    return this.cache.size;
  }

  async keys(): Promise<string[]> {
    return Array.from(this.cache.keys());
  }
}

/**
 * Walrus Data Client - Main SDK class for generic data operations
 */
export class WalrusDataClient {
  private config: WalrusDataConfig;
  private walrusClient: SimpleWalrusClient;
  private cache?: WalrusCache;
  private requestCounter = 0;
  private indexes: Map<string, WalrusIndex> = new Map();
  private schemas: Map<string, WalrusDataSchema> = new Map();
  private eventHandlers: Map<string, WalrusEventCallback[]> = new Map();
  
  private metrics: WalrusMetrics = {
    requestCount: 0,
    avgResponseTime: 0,
    errorRate: 0,
    cacheHitRate: 0,
    storageLatency: 0,
    retrievalLatency: 0,
    indexQueryTime: 0,
    throughput: 0
  };

  constructor(options: WalrusDataClientOptions = {}) {
    this.config = {
      ...DEFAULT_CONFIG,
      ...options
    };

    // Initialize HTTP-based Walrus client
    this.walrusClient = new SimpleWalrusClient(
      this.config.publisherUrl,
      this.config.aggregatorUrl
    );
    
    // Initialize cache if enabled
    if (options.enableCaching !== false) {
      this.cache = new MemoryCache();
    }

    console.log('Walrus Data SDK v2.0.0 initialized with HTTP Walrus client');
  }

  /**
   * Store structured data on Walrus with indexing
   */
  async store<T = any>(
    data: T, 
    options: WalrusStoreOptions = {}
  ): Promise<WalrusStoreResult> {
    const startTime = Date.now();
    
    try {
      this.validateStoreOptions(options);
      
      // Create data item with metadata
      const dataId = this.generateDataId();
      const now = new Date();
      
      const dataItem: WalrusDataItem<T> = {
        id: dataId,
        blobId: '', // Will be set after storage
        data,
        metadata: {
          created: now,
          updated: now,
          version: 1,
          size: 0, // Will be calculated
          contentType: options.metadata?.contentType || 'application/json',
          author: options.metadata?.author,
          signature: options.metadata?.signature,
          indexes: options.customIndexes,
          ...options.metadata
        },
        contentHash: '',
        schema: options.schema,
        tags: options.tags,
        categories: options.categories
      };

      // Serialize data
      const serializedData = JSON.stringify(dataItem);
      const dataBuffer = Buffer.from(serializedData, 'utf-8');
      
      dataItem.metadata.size = dataBuffer.length;
      dataItem.contentHash = this.generateContentHash(serializedData);

      // Validate size
      if (dataBuffer.length > this.config.maxBlobSize) {
        throw new WalrusValidationError(
          `Data too large: ${dataBuffer.length} bytes (max: ${this.config.maxBlobSize})`
        );
      }

      // Store on Walrus
      const storeResult = await this.walrusClient.store({
        data: dataBuffer,
        epochs: options.epochs || this.config.defaultEpochs
      });

      dataItem.blobId = storeResult.blobId;

      // Cache the item if caching is enabled
      if (this.cache) {
        await this.cache.set(`data:${dataId}`, dataItem);
        await this.cache.set(`blob:${storeResult.blobId}`, dataItem);
      }

      // Update indexes if enabled
      if (options.enableIndexing !== false) {
        await this.updateIndexes(dataItem);
      }

      const responseTime = Date.now() - startTime;
      this.updateMetrics(responseTime, false, 'store');

      // Emit event
      this.emitEvent({
        type: 'created',
        dataId,
        blobId: storeResult.blobId,
        data: dataItem,
        timestamp: now
      });

      return {
        blobId: storeResult.blobId,
        dataId,
        size: dataBuffer.length,
        encodedSize: storeResult.encodedSize,
        cost: storeResult.cost.toString(),
        metadata: dataItem.metadata
      };

    } catch (error) {
      const responseTime = Date.now() - startTime;
      this.updateMetrics(responseTime, true, 'store');
      
      if (error instanceof WalrusDataError) {
        throw error;
      }
      throw new WalrusStorageError(`Failed to store data: ${error}`);
    }
  }

  /**
   * Retrieve data by ID or blob ID
   */
  async retrieve<T = any>(
    id: string, 
    isBlob = false
  ): Promise<WalrusRetrieveResult<T>> {
    const startTime = Date.now();
    let cached = false;
    
    try {
      // Check cache first
      if (this.cache) {
        const cacheKey = isBlob ? `blob:${id}` : `data:${id}`;
        const cachedItem = await this.cache.get<WalrusDataItem<T>>(cacheKey);
        if (cachedItem) {
          cached = true;
          this.updateCacheMetrics(true);
          return {
            item: cachedItem,
            cached: true,
            retrievalTime: Date.now() - startTime
          };
        }
        this.updateCacheMetrics(false);
      }

      // If we have a data ID but need blob ID, look it up
      let blobId = isBlob ? id : await this.lookupBlobId(id);
      
      if (!blobId) {
        throw new WalrusNotFoundError(`Data item with ID '${id}' not found`);
      }

      // Retrieve from Walrus
      const retrieveResult = await this.walrusClient.retrieve(blobId);
      
      // Parse the data
      const serializedData = new TextDecoder().decode(retrieveResult.data);
      const dataItem: WalrusDataItem<T> = JSON.parse(serializedData);

      // Verify integrity
      const expectedHash = this.generateContentHash(serializedData);
      if (dataItem.contentHash !== expectedHash) {
        throw new WalrusStorageError('Data integrity check failed');
      }

      // Cache the item
      if (this.cache) {
        await this.cache.set(`data:${dataItem.id}`, dataItem);
        await this.cache.set(`blob:${blobId}`, dataItem);
      }

      const responseTime = Date.now() - startTime;
      this.updateMetrics(responseTime, false, 'retrieve');

      return {
        item: dataItem,
        cached,
        retrievalTime: responseTime
      };

    } catch (error) {
      const responseTime = Date.now() - startTime;
      this.updateMetrics(responseTime, true, 'retrieve');
      
      if (error instanceof WalrusDataError) {
        throw error;
      }
      throw new WalrusNetworkError(`Failed to retrieve data: ${error}`);
    }
  }

  /**
   * Query data with O(1) indexed lookups when possible
   */
  async query<T = any>(
    query: WalrusSearchQuery<T>
  ): Promise<WalrusQueryResults<T>> {
    const startTime = Date.now();
    
    try {
      this.validateQuery(query);

      // Try to use indexes for O(1) lookup
      const indexResult = await this.tryIndexedQuery(query);
      if (indexResult) {
        const queryTime = Date.now() - startTime;
        this.updateMetrics(queryTime, false, 'query');
        return {
          ...indexResult,
          queryTime
        };
      }

      // Fallback to full scan (for development/small datasets)
      return await this.fullScanQuery(query, startTime);
      
    } catch (error) {
      const queryTime = Date.now() - startTime;
      this.updateMetrics(queryTime, true, 'query');
      throw error;
    }
  }

  /**
   * Get multiple items in bulk
   */
  async getBulk<T = any>(query: WalrusBulkQuery): Promise<WalrusBulkResult<T>> {
    const startTime = Date.now();
    const results: WalrusDataItem<T>[] = [];
    const errors: Array<{ id: string; error: string; code?: string }> = [];

    try {
      let idsToFetch: string[] = [];
      
      if (query.dataIds) {
        idsToFetch = query.dataIds;
      } else if (query.blobIds) {
        idsToFetch = query.blobIds;
      } else if (query.query) {
        const queryResult = await this.query(query.query);
        idsToFetch = queryResult.items.map(item => item.id);
      }

      // Process in batches to avoid overwhelming Walrus
      const batchSize = 10;
      for (let i = 0; i < idsToFetch.length; i += batchSize) {
        const batch = idsToFetch.slice(i, i + batchSize);
        const batchPromises = batch.map(async (id) => {
          try {
            const result = await this.retrieve<T>(id, query.blobIds !== undefined);
            return result.item;
          } catch (error) {
            errors.push({
              id,
              error: error instanceof Error ? error.message : String(error),
              code: error instanceof WalrusDataError ? error.code : undefined
            });
            return null;
          }
        });

        const batchResults = await Promise.all(batchPromises);
        results.push(...batchResults.filter(item => item !== null) as WalrusDataItem<T>[]);
      }

      const responseTime = Date.now() - startTime;
      this.updateMetrics(responseTime, false, 'bulk');

      return {
        items: results,
        errors,
        totalRequested: idsToFetch.length,
        totalReturned: results.length,
        totalErrors: errors.length
      };

    } catch (error) {
      const responseTime = Date.now() - startTime;
      this.updateMetrics(responseTime, true, 'bulk');
      throw error;
    }
  }

  /**
   * Get comprehensive statistics about indexed data
   */
  async getStats(): Promise<WalrusIndexStats> {
    const startTime = Date.now();
    
    try {
      // This would typically query an external index service
      // For now, return mock stats based on cache if available
      const stats: WalrusIndexStats = {
        totalItems: 0,
        totalBlobs: 0,
        totalSize: 0,
        schemas: {},
        categories: {},
        tags: {},
        authors: {},
        indexLastUpdated: new Date().toISOString(),
        indexSize: 0
      };

      if (this.cache) {
        const keys = await this.cache.keys();
        const dataKeys = keys.filter(key => key.startsWith('data:'));
        stats.totalItems = dataKeys.length;
        
        // Sample some items to build stats
        for (const key of dataKeys.slice(0, 100)) {
          const item = await this.cache.get<WalrusDataItem>(key);
          if (item) {
            stats.totalSize += item.metadata.size;
            
            if (item.schema) {
              stats.schemas[item.schema] = (stats.schemas[item.schema] || 0) + 1;
            }
            
            if (item.categories) {
              item.categories.forEach(cat => {
                stats.categories[cat] = (stats.categories[cat] || 0) + 1;
              });
            }
            
            if (item.tags) {
              item.tags.forEach(tag => {
                stats.tags[tag] = (stats.tags[tag] || 0) + 1;
              });
            }
            
            if (item.metadata.author) {
              stats.authors[item.metadata.author] = (stats.authors[item.metadata.author] || 0) + 1;
            }
          }
        }
      }

      const responseTime = Date.now() - startTime;
      this.updateMetrics(responseTime, false, 'stats');
      
      return stats;
      
    } catch (error) {
      const responseTime = Date.now() - startTime;
      this.updateMetrics(responseTime, true, 'stats');
      throw new WalrusIndexError(`Failed to get stats: ${error}`);
    }
  }

  /**
   * Health check for Walrus network and indexing
   */
  async healthCheck(): Promise<WalrusHealthCheck> {
    const startTime = Date.now();
    
    try {
      // Test Walrus connectivity
      const publisherTest = await this.testEndpoint(this.config.publisherUrl);
      const aggregatorTest = await this.testEndpoint(this.config.aggregatorUrl);
      
      const status = publisherTest && aggregatorTest ? 'healthy' : 'degraded';
      
      const health: WalrusHealthCheck = {
        status,
        version: '2.0.0',
        uptime: Date.now() - startTime,
        walrusStatus: {
          available: publisherTest && aggregatorTest,
          publisherLatency: publisherTest ? 100 : -1, // Mock values
          aggregatorLatency: aggregatorTest ? 100 : -1,
          nodes: publisherTest && aggregatorTest ? 1 : 0
        },
        indexStatus: {
          available: true,
          lastSync: new Date().toISOString(),
          items: 0, // Would be populated by real index
          syncLag: 0
        },
        timestamp: new Date().toISOString()
      };

      if (this.cache) {
        const cacheSize = await this.cache.size();
        health.cacheStatus = {
          available: true,
          hitRate: this.metrics.cacheHitRate,
          size: cacheSize,
          maxSize: 1000 // Default cache size
        };
      }

      return health;
      
    } catch (error) {
      return {
        status: 'unhealthy',
        version: '2.0.0',
        uptime: Date.now() - startTime,
        walrusStatus: {
          available: false,
          publisherLatency: -1,
          aggregatorLatency: -1,
          nodes: 0
        },
        indexStatus: {
          available: false,
          lastSync: new Date().toISOString(),
          items: 0,
          syncLag: -1
        },
        timestamp: new Date().toISOString()
      };
    }
  }

  /**
   * Get SDK metrics
   */
  getMetrics(): WalrusMetrics {
    return { ...this.metrics };
  }

  /**
   * Reset metrics
   */
  resetMetrics(): void {
    this.metrics = {
      requestCount: 0,
      avgResponseTime: 0,
      errorRate: 0,
      cacheHitRate: 0,
      storageLatency: 0,
      retrievalLatency: 0,
      indexQueryTime: 0,
      throughput: 0
    };
  }

  /**
   * Subscribe to real-time data events
   */
  subscribe<T = any>(
    callback: WalrusEventCallback<T>, 
    options: WalrusSubscriptionOptions = {}
  ): string {
    const subscriptionId = `sub-${Date.now()}-${Math.random()}`;
    
    if (!this.eventHandlers.has('all')) {
      this.eventHandlers.set('all', []);
    }
    
    this.eventHandlers.get('all')!.push(callback);
    
    return subscriptionId;
  }

  /**
   * Unsubscribe from events
   */
  unsubscribe(subscriptionId: string): void {
    // Implementation would remove the specific callback
    // For now, just clear all handlers
    this.eventHandlers.clear();
  }

  // Private methods

  private validateStoreOptions(options: WalrusStoreOptions): void {
    if (options.epochs && (options.epochs < 1 || options.epochs > 100)) {
      throw new WalrusValidationError('Epochs must be between 1 and 100');
    }
  }

  private validateQuery<T>(query: WalrusSearchQuery<T>): void {
    if (query.limit && (query.limit < 1 || query.limit > 1000)) {
      throw new WalrusValidationError('Limit must be between 1 and 1000');
    }
    
    if (query.offset && query.offset < 0) {
      throw new WalrusValidationError('Offset must be non-negative');
    }
  }

  private generateDataId(): string {
    return `data-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  private generateContentHash(content: string): string {
    // Simple hash function - in production, use a proper crypto hash
    let hash = 0;
    for (let i = 0; i < content.length; i++) {
      const char = content.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash).toString(16);
  }

  private async lookupBlobId(dataId: string): Promise<string | null> {
    // In a real implementation, this would query an external index
    // For now, check cache
    if (this.cache) {
      const item = await this.cache.get<WalrusDataItem>(`data:${dataId}`);
      return item?.blobId || null;
    }
    return null;
  }

  private async updateIndexes<T>(dataItem: WalrusDataItem<T>): Promise<void> {
    // In a real implementation, this would update external indexes
    // For now, just log the action
    console.log(`Indexing data item: ${dataItem.id}`);
  }

  private async tryIndexedQuery<T>(
    query: WalrusSearchQuery<T>
  ): Promise<WalrusQueryResults<T> | null> {
    // In a real implementation, this would use external indexes for O(1) lookups
    // For now, return null to fall back to full scan
    return null;
  }

  private async fullScanQuery<T>(
    query: WalrusSearchQuery<T>,
    startTime: number
  ): Promise<WalrusQueryResults<T>> {
    const items: WalrusDataItem<T>[] = [];
    
    if (this.cache) {
      const keys = await this.cache.keys();
      const dataKeys = keys.filter(key => key.startsWith('data:'));
      
      for (const key of dataKeys) {
        const item = await this.cache.get<WalrusDataItem<T>>(key);
        if (item && this.matchesQuery(item, query)) {
          items.push(item);
        }
      }
    }

    // Apply sorting
    if (query.sortBy) {
      items.sort((a, b) => {
        let aVal: any, bVal: any;
        
        switch (query.sortBy) {
          case 'created':
            aVal = new Date(a.metadata.created);
            bVal = new Date(b.metadata.created);
            break;
          case 'updated':
            aVal = new Date(a.metadata.updated);
            bVal = new Date(b.metadata.updated);
            break;
          case 'size':
            aVal = a.metadata.size;
            bVal = b.metadata.size;
            break;
          default:
            return 0;
        }
        
        if (query.sortOrder === 'desc') {
          return aVal > bVal ? -1 : aVal < bVal ? 1 : 0;
        } else {
          return aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
        }
      });
    }

    // Apply pagination
    const offset = query.offset || 0;
    const limit = query.limit || 100;
    const paginatedItems = items.slice(offset, offset + limit);

    return {
      items: paginatedItems,
      totalCount: items.length,
      queryTime: Date.now() - startTime,
      hasMore: items.length > offset + limit,
      nextOffset: items.length > offset + limit ? offset + limit : undefined
    };
  }

  private matchesQuery<T>(item: WalrusDataItem<T>, query: WalrusSearchQuery<T>): boolean {
    // Schema filter
    if (query.schema) {
      const schemas = Array.isArray(query.schema) ? query.schema : [query.schema];
      if (item.schema && !schemas.includes(item.schema)) {
        return false;
      }
    }

    // Tags filter
    if (query.tags && query.tags.length > 0) {
      if (!item.tags || !query.tags.some(tag => item.tags!.includes(tag))) {
        return false;
      }
    }

    // Categories filter
    if (query.categories && query.categories.length > 0) {
      if (!item.categories || !query.categories.some(cat => item.categories!.includes(cat))) {
        return false;
      }
    }

    // Date range filter
    if (query.dateRange) {
      const itemDate = new Date(item.metadata.created);
      if (query.dateRange.from && itemDate < query.dateRange.from) {
        return false;
      }
      if (query.dateRange.to && itemDate > query.dateRange.to) {
        return false;
      }
    }

    // Author filter
    if (query.author) {
      const authors = Array.isArray(query.author) ? query.author : [query.author];
      if (!item.metadata.author || !authors.includes(item.metadata.author)) {
        return false;
      }
    }

    // Custom filters
    if (query.customFilters && !query.customFilters(item)) {
      return false;
    }

    return true;
  }

  private async testEndpoint(url: string): Promise<boolean> {
    try {
      // Use AbortController for timeout instead of fetch timeout option
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);
      
      const response = await fetch(`${url}/health`, { 
        method: 'GET',
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      return response.ok;
    } catch {
      return false;
    }
  }

  private updateMetrics(
    responseTime: number, 
    isError: boolean, 
    operation: 'store' | 'retrieve' | 'query' | 'bulk' | 'stats'
  ): void {
    this.metrics.requestCount++;
    this.metrics.avgResponseTime = (this.metrics.avgResponseTime + responseTime) / 2;
    
    if (isError) {
      this.metrics.errorRate = ((this.metrics.errorRate * (this.metrics.requestCount - 1)) + 1) / this.metrics.requestCount;
    } else {
      this.metrics.errorRate = (this.metrics.errorRate * (this.metrics.requestCount - 1)) / this.metrics.requestCount;
    }

    // Update operation-specific metrics
    switch (operation) {
      case 'store':
        this.metrics.storageLatency = (this.metrics.storageLatency + responseTime) / 2;
        break;
      case 'retrieve':
        this.metrics.retrievalLatency = (this.metrics.retrievalLatency + responseTime) / 2;
        break;
      case 'query':
        this.metrics.indexQueryTime = (this.metrics.indexQueryTime + responseTime) / 2;
        break;
    }

    // Calculate throughput (requests per second)
    const now = Date.now();
    if (!this.lastThroughputUpdate) {
      this.lastThroughputUpdate = now;
      this.requestsInLastSecond = 1;
    } else if (now - this.lastThroughputUpdate >= 1000) {
      this.metrics.throughput = this.requestsInLastSecond / ((now - this.lastThroughputUpdate) / 1000);
      this.lastThroughputUpdate = now;
      this.requestsInLastSecond = 1;
    } else {
      this.requestsInLastSecond++;
    }
  }

  private lastThroughputUpdate?: number;
  private requestsInLastSecond = 0;

  private updateCacheMetrics(hit: boolean): void {
    const totalCacheAttempts = (this.metrics.cacheHitRate * this.metrics.requestCount) + 1;
    const totalHits = hit ? (this.metrics.cacheHitRate * this.metrics.requestCount) + 1 : (this.metrics.cacheHitRate * this.metrics.requestCount);
    this.metrics.cacheHitRate = totalHits / totalCacheAttempts;
  }

  private emitEvent<T>(event: WalrusDataEvent<T>): void {
    const handlers = this.eventHandlers.get('all') || [];
    handlers.forEach(handler => {
      try {
        handler(event);
      } catch (error) {
        console.error('Error in event handler:', error);
      }
    });
  }
}
>>>>>>> 0ea0660cc4587702e6e3ff1dd1f08bbd625a4929

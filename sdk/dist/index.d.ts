/**
 * Walrus Data SDK Type Definitions
 *
 * Generic TypeScript interfaces and types for querying structured data stored on Walrus
 */
interface WalrusDataConfig {
    publisherUrl: string;
    aggregatorUrl: string;
    timeout: number;
    retries: number;
    retryDelay: number;
    userAgent: string;
    maxBlobSize: number;
    defaultEpochs: number;
}
interface WalrusDataClientOptions {
    publisherUrl?: string;
    aggregatorUrl?: string;
    timeout?: number;
    retries?: number;
    retryDelay?: number;
    userAgent?: string;
    maxBlobSize?: number;
    defaultEpochs?: number;
    indexUrl?: string;
    enableCaching?: boolean;
    cacheTimeout?: number;
}
interface WalrusDataItem<T = any> {
    id: string;
    blobId: string;
    data: T;
    metadata: WalrusDataMetadata;
    contentHash: string;
    schema?: string;
    tags?: string[];
    categories?: string[];
}
interface WalrusDataMetadata {
    created: Date;
    updated: Date;
    version: number;
    size: number;
    contentType: string;
    author?: string;
    signature?: string;
    indexes?: Record<string, any>;
}
interface WalrusQueryOptions {
    schema?: string | string[];
    tags?: string[];
    categories?: string[];
    contentType?: string | string[];
    dateRange?: {
        from?: Date;
        to?: Date;
    };
    author?: string | string[];
    limit?: number;
    offset?: number;
    sortBy?: 'created' | 'updated' | 'size' | 'relevance';
    sortOrder?: 'asc' | 'desc';
    includeData?: boolean;
}
interface WalrusSearchQuery<T = any> extends WalrusQueryOptions {
    fullTextSearch?: string;
    fieldQueries?: Array<{
        field: string;
        value: any;
        operator: 'eq' | 'ne' | 'lt' | 'le' | 'gt' | 'ge' | 'in' | 'contains' | 'startsWith' | 'endsWith';
    }>;
    customFilters?: (item: WalrusDataItem<T>) => boolean;
}
interface WalrusQueryResults<T = any> {
    items: WalrusDataItem<T>[];
    totalCount: number;
    queryTime: number;
    hasMore: boolean;
    nextOffset?: number;
    aggregations?: Record<string, any>;
}
interface WalrusPaginationOptions {
    limit?: number;
    offset?: number;
    cursor?: string;
}
interface WalrusPaginatedResponse<T> {
    data: T[];
    totalCount: number;
    limit: number;
    offset: number;
    hasMore: boolean;
    nextCursor?: string;
}
interface WalrusStoreOptions {
    epochs?: number;
    metadata?: Partial<WalrusDataMetadata>;
    tags?: string[];
    categories?: string[];
    schema?: string;
    enableIndexing?: boolean;
    customIndexes?: Record<string, any>;
}
interface WalrusStoreResult {
    blobId: string;
    dataId: string;
    size: number;
    encodedSize: number;
    cost: string;
    metadata: WalrusDataMetadata;
}
interface WalrusRetrieveResult<T = any> {
    item: WalrusDataItem<T>;
    cached: boolean;
    retrievalTime: number;
}
interface WalrusBulkQuery {
    dataIds?: string[];
    blobIds?: string[];
    query?: WalrusSearchQuery;
    includeData?: boolean;
    includeMetadata?: boolean;
}
interface WalrusBulkResult<T = any> {
    items: WalrusDataItem<T>[];
    errors: Array<{
        id: string;
        error: string;
        code?: string;
    }>;
    totalRequested: number;
    totalReturned: number;
    totalErrors: number;
}
interface WalrusIndexStats {
    totalItems: number;
    totalBlobs: number;
    totalSize: number;
    schemas: Record<string, number>;
    categories: Record<string, number>;
    tags: Record<string, number>;
    authors: Record<string, number>;
    indexLastUpdated: string;
    indexSize: number;
}
interface WalrusHealthCheck {
    status: 'healthy' | 'degraded' | 'unhealthy';
    version: string;
    uptime: number;
    walrusStatus: {
        available: boolean;
        publisherLatency: number;
        aggregatorLatency: number;
        nodes: number;
    };
    indexStatus: {
        available: boolean;
        lastSync: string;
        items: number;
        syncLag: number;
    };
    cacheStatus?: {
        available: boolean;
        hitRate: number;
        size: number;
        maxSize: number;
    };
    timestamp: string;
}
declare abstract class WalrusDataError extends Error {
    readonly code: string;
    readonly details?: any;
    readonly statusCode?: number;
    readonly retryable?: boolean;
    constructor(message: string, code: string, details?: any, statusCode?: number, retryable?: boolean);
}
declare class WalrusNetworkError extends WalrusDataError {
    constructor(message: string, details?: any);
}
declare class WalrusValidationError extends WalrusDataError {
    constructor(message: string, details?: any);
}
declare class WalrusNotFoundError extends WalrusDataError {
    constructor(message: string, details?: any);
}
declare class WalrusStorageError extends WalrusDataError {
    constructor(message: string, details?: any);
}
declare class WalrusIndexError extends WalrusDataError {
    constructor(message: string, details?: any);
}
declare class WalrusRateLimitError extends WalrusDataError {
    constructor(message: string, details?: any);
}
interface WalrusCache {
    get<T>(key: string): Promise<T | null>;
    set<T>(key: string, value: T, ttl?: number): Promise<void>;
    delete(key: string): Promise<void>;
    clear(): Promise<void>;
    size(): Promise<number>;
    keys(): Promise<string[]>;
}
interface WalrusCacheOptions {
    ttl?: number;
    maxSize?: number;
    staleWhileRevalidate?: boolean;
    compress?: boolean;
}
interface WalrusIndex {
    name: string;
    type: 'btree' | 'hash' | 'fulltext' | 'geo' | 'custom';
    fields: string[];
    unique?: boolean;
    sparse?: boolean;
    options?: Record<string, any>;
}
interface WalrusIndexQuery {
    index: string;
    query: any;
    limit?: number;
    offset?: number;
}
interface WalrusIndexResult<T = any> {
    items: WalrusDataItem<T>[];
    totalCount: number;
    indexUsed: string;
    queryTime: number;
}
interface WalrusMetrics {
    requestCount: number;
    avgResponseTime: number;
    errorRate: number;
    cacheHitRate: number;
    storageLatency: number;
    retrievalLatency: number;
    indexQueryTime: number;
    throughput: number;
}
interface WalrusDataEvent<T = any> {
    type: 'created' | 'updated' | 'deleted';
    dataId: string;
    blobId?: string;
    data?: WalrusDataItem<T>;
    timestamp: Date;
    metadata?: Record<string, any>;
}
type WalrusEventCallback<T = any> = (event: WalrusDataEvent<T>) => void;
interface WalrusSubscriptionOptions {
    schemas?: string[];
    tags?: string[];
    categories?: string[];
    authors?: string[];
    eventTypes?: Array<'created' | 'updated' | 'deleted'>;
}
interface WalrusDataSchema {
    id: string;
    version: string;
    name: string;
    description?: string;
    properties: Record<string, {
        type: 'string' | 'number' | 'boolean' | 'object' | 'array' | 'date';
        required?: boolean;
        indexed?: boolean;
        searchable?: boolean;
        validate?: (value: any) => boolean;
    }>;
    indexes?: WalrusIndex[];
    examples?: any[];
}
type WalrusDataId = string;
type WalrusBlobId = string;
type WalrusContentHash = string;
interface WalrusResponse<T> {
    data: T;
    success: boolean;
    timestamp: string;
    requestId: string;
    cached?: boolean;
    metadata?: Record<string, any>;
}
interface WalrusRateLimit {
    limit: number;
    remaining: number;
    reset: Date;
    retryAfter?: number;
}

/**
 * Walrus Data SDK Client
 *
 * Main client class providing generic access to structured data stored on Walrus
 */

/**
 * Walrus Data Client - Main SDK class for generic data operations
 */
declare class WalrusDataClient {
    private config;
    private walrusClient;
    private cache?;
    private requestCounter;
    private indexes;
    private schemas;
    private eventHandlers;
    private metrics;
    constructor(options?: WalrusDataClientOptions);
    /**
     * Store structured data on Walrus with indexing
     */
    store<T = any>(data: T, options?: WalrusStoreOptions): Promise<WalrusStoreResult>;
    /**
     * Retrieve data by ID or blob ID
     */
    retrieve<T = any>(id: string, isBlob?: boolean): Promise<WalrusRetrieveResult<T>>;
    /**
     * Query data with O(1) indexed lookups when possible
     */
    query<T = any>(query: WalrusSearchQuery<T>): Promise<WalrusQueryResults<T>>;
    /**
     * Get multiple items in bulk
     */
    getBulk<T = any>(query: WalrusBulkQuery): Promise<WalrusBulkResult<T>>;
    /**
     * Get comprehensive statistics about indexed data
     */
    getStats(): Promise<WalrusIndexStats>;
    /**
     * Health check for Walrus network and indexing
     */
    healthCheck(): Promise<WalrusHealthCheck>;
    /**
     * Get SDK metrics
     */
    getMetrics(): WalrusMetrics;
    /**
     * Reset metrics
     */
    resetMetrics(): void;
    /**
     * Subscribe to real-time data events
     */
    subscribe<T = any>(callback: WalrusEventCallback<T>, options?: WalrusSubscriptionOptions): string;
    /**
     * Unsubscribe from events
     */
    unsubscribe(subscriptionId: string): void;
    private validateStoreOptions;
    private validateQuery;
    private generateDataId;
    private generateContentHash;
    private lookupBlobId;
    private updateIndexes;
    private tryIndexedQuery;
    private fullScanQuery;
    private matchesQuery;
    private testEndpoint;
    private updateMetrics;
    private lastThroughputUpdate?;
    private requestsInLastSecond;
    private updateCacheMetrics;
    private emitEvent;
}

/**
 * Walrus Data SDK Utilities
 *
 * Generic helper functions and utilities for the Walrus Data SDK
 */

/**
 * Validate a data ID format
 */
declare function validateDataId(dataId: string): boolean;
/**
 * Sanitize search query parameters
 */
declare function sanitizeQuery<T = any>(query: WalrusSearchQuery<T>): WalrusSearchQuery<T>;
/**
 * Generate a schema definition from sample data
 */
declare function generateSchema<T = any>(sampleData: T[], schemaId: string, schemaName?: string): WalrusDataSchema;
/**
 * Validate data against a schema
 */
declare function validateSchema<T = any>(data: T, schema: WalrusDataSchema): boolean;
/**
 * Create an optimized index configuration
 */
declare function createIndex(name: string, fields: string[], options?: {
    type?: 'btree' | 'hash' | 'fulltext' | 'geo' | 'custom';
    unique?: boolean;
    sparse?: boolean;
    [key: string]: any;
}): WalrusIndex;
/**
 * Optimize a query for better performance
 */
declare function optimizeQuery<T = any>(query: WalrusSearchQuery<T>): WalrusSearchQuery<T>;

/**
 * Walrus Data SDK
 *
 * A comprehensive TypeScript SDK for storing, querying, and indexing structured data
 * on the Walrus decentralized storage network with O(1) lookup capabilities
 *
 * @version 2.0.0
 * @author Walrus Data SDK Team
 */

/**
 * Default configuration for Walrus Data SDK
 */
declare const DEFAULT_CONFIG: WalrusDataConfig;
/**
 * Create a new Walrus Data client instance
 *
 * @param options - Configuration options
 * @returns WalrusDataClient instance
 */
declare function createClient(options?: WalrusDataClientOptions): WalrusDataClient;
/**
 * Create a client with optimized settings for specific use cases
 */
declare function createOptimizedClient(useCase: 'high-throughput' | 'low-latency' | 'large-data' | 'real-time', options?: WalrusDataClientOptions): WalrusDataClient;
/**
 * SDK version information
 */
declare const VERSION = "2.0.0";
declare const API_VERSION = "v2";
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
declare function store<T = any>(data: T, options?: WalrusStoreOptions & WalrusDataClientOptions): Promise<WalrusStoreResult>;
/**
 * Retrieve data from Walrus by ID
 *
 * @param id - Data ID or blob ID
 * @param isBlob - Whether the ID is a blob ID (default: false)
 * @param options - Client options
 * @returns Promise with retrieved data
 */
declare function retrieve<T = any>(id: string, isBlob?: boolean, options?: WalrusDataClientOptions): Promise<WalrusRetrieveResult<T>>;
/**
 * Query data with advanced filters and indexing
 *
 * @param query - Search query
 * @param options - Client options
 * @returns Promise with query results
 */
declare function query<T = any>(query: WalrusSearchQuery<T>, options?: WalrusDataClientOptions): Promise<WalrusQueryResults<T>>;
/**
 * Get health status of Walrus network
 *
 * @param options - Client options
 * @returns Promise with health check results
 */
declare function healthCheck(options?: WalrusDataClientOptions): Promise<WalrusHealthCheck>;
/**
 * Get statistics about indexed data
 *
 * @param options - Client options
 * @returns Promise with index statistics
 */
declare function getStats(options?: WalrusDataClientOptions): Promise<WalrusIndexStats>;
/**
 * Utility functions for working with Walrus data
 */
/**
 * Create a simple key-value store interface
 */
declare class WalrusKVStore {
    private client;
    constructor(options?: WalrusDataClientOptions);
    set(key: string, value: any): Promise<string>;
    get<T = any>(key: string): Promise<T | null>;
    delete(key: string): Promise<boolean>;
    exists(key: string): Promise<boolean>;
    keys(pattern?: string): Promise<string[]>;
}
/**
 * Create a document store interface
 */
declare class WalrusDocumentStore {
    private client;
    private collection;
    constructor(collection: string, options?: WalrusDataClientOptions);
    insert<T = any>(document: T, id?: string): Promise<string>;
    find<T = any>(query?: Partial<WalrusSearchQuery<T>>): Promise<T[]>;
    findOne<T = any>(query?: Partial<WalrusSearchQuery<T>>): Promise<T | null>;
    count(query?: Partial<WalrusSearchQuery>): Promise<number>;
}

/**
 * Helper function to create multiple stores
 */
declare function createStores(options?: WalrusDataClientOptions): {
    kv: (name?: string) => WalrusKVStore;
    documents: (collection: string) => WalrusDocumentStore;
    client: WalrusDataClient;
};

export { API_VERSION, DEFAULT_CONFIG, WalrusDocumentStore as DocumentStore, WalrusKVStore as KVStore, VERSION, WalrusBlobId, WalrusBulkQuery, WalrusBulkResult, WalrusCache, WalrusCacheOptions, WalrusContentHash, WalrusDataClient, WalrusDataClientOptions, WalrusDataConfig, WalrusDataError, WalrusDataEvent, WalrusDataId, WalrusDataItem, WalrusDataMetadata, WalrusDataSchema, WalrusDocumentStore, WalrusEventCallback, WalrusHealthCheck, WalrusIndex, WalrusIndexError, WalrusIndexQuery, WalrusIndexResult, WalrusIndexStats, WalrusKVStore, WalrusMetrics, WalrusNetworkError, WalrusNotFoundError, WalrusPaginatedResponse, WalrusPaginationOptions, WalrusQueryOptions, WalrusQueryResults, WalrusRateLimit, WalrusRateLimitError, WalrusResponse, WalrusRetrieveResult, WalrusSearchQuery, WalrusStorageError, WalrusStoreOptions, WalrusStoreResult, WalrusSubscriptionOptions, WalrusValidationError, createClient, createIndex, createOptimizedClient, createStores, generateSchema, getStats, healthCheck, optimizeQuery, query, retrieve, sanitizeQuery, store, validateDataId, validateSchema };

/**
 * Walrus Data SDK Type Definitions
 * 
 * Generic TypeScript interfaces and types for querying structured data stored on Walrus
 */

// Walrus SDK integration
import type { WalrusClient } from '@mysten/walrus';

// Core Configuration Types
export interface WalrusDataConfig {
  publisherUrl: string;
  aggregatorUrl: string;
  timeout: number;
  retries: number;
  retryDelay: number;
  userAgent: string;
  maxBlobSize: number;
  defaultEpochs: number;
}

export interface WalrusDataClientOptions {
  publisherUrl?: string;
  aggregatorUrl?: string;
  timeout?: number;
  retries?: number;
  retryDelay?: number;
  userAgent?: string;
  maxBlobSize?: number;
  defaultEpochs?: number;
  indexUrl?: string; // Optional external index service
  enableCaching?: boolean;
  cacheTimeout?: number;
}

// Generic Data Types
export interface WalrusDataItem<T = any> {
  id: string;
  blobId: string;
  data: T;
  metadata: WalrusDataMetadata;
  contentHash: string;
  schema?: string; // Optional schema identifier
  tags?: string[];
  categories?: string[];
}

export interface WalrusDataMetadata {
  created: Date;
  updated: Date;
  version: number;
  size: number;
  contentType: string;
  author?: string;
  signature?: string;
  indexes?: Record<string, any>; // For O(1) lookups
}

// Query and Search Types
export interface WalrusQueryOptions {
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
  includeData?: boolean; // Whether to fetch full data or just metadata
}

export interface WalrusSearchQuery<T = any> extends WalrusQueryOptions {
  fullTextSearch?: string;
  fieldQueries?: Array<{
    field: string;
    value: any;
    operator: 'eq' | 'ne' | 'lt' | 'le' | 'gt' | 'ge' | 'in' | 'contains' | 'startsWith' | 'endsWith';
  }>;
  customFilters?: (item: WalrusDataItem<T>) => boolean;
}

export interface WalrusQueryResults<T = any> {
  items: WalrusDataItem<T>[];
  totalCount: number;
  queryTime: number;
  hasMore: boolean;
  nextOffset?: number;
  aggregations?: Record<string, any>;
}

// Pagination Types
export interface WalrusPaginationOptions {
  limit?: number;
  offset?: number;
  cursor?: string; // For cursor-based pagination
}

export interface WalrusPaginatedResponse<T> {
  data: T[];
  totalCount: number;
  limit: number;
  offset: number;
  hasMore: boolean;
  nextCursor?: string;
}

// Storage Operations
export interface WalrusStoreOptions {
  epochs?: number;
  metadata?: Partial<WalrusDataMetadata>;
  tags?: string[];
  categories?: string[];
  schema?: string;
  enableIndexing?: boolean;
  customIndexes?: Record<string, any>;
}

export interface WalrusStoreResult {
  blobId: string;
  dataId: string;
  size: number;
  encodedSize: number;
  cost: string;
  metadata: WalrusDataMetadata;
}

export interface WalrusRetrieveResult<T = any> {
  item: WalrusDataItem<T>;
  cached: boolean;
  retrievalTime: number;
}

// Bulk Operations Types
export interface WalrusBulkQuery {
  dataIds?: string[];
  blobIds?: string[];
  query?: WalrusSearchQuery;
  includeData?: boolean;
  includeMetadata?: boolean;
}

export interface WalrusBulkResult<T = any> {
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

// Index and Statistics Types
export interface WalrusIndexStats {
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

// Health Check Types
export interface WalrusHealthCheck {
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
    syncLag: number; // in milliseconds
  };
  cacheStatus?: {
    available: boolean;
    hitRate: number;
    size: number;
    maxSize: number;
  };
  timestamp: string;
}

// Error Types
export abstract class WalrusDataError extends Error {
  public readonly code: string;
  public readonly details?: any;
  public readonly statusCode?: number;
  public readonly retryable?: boolean;

  constructor(message: string, code: string, details?: any, statusCode?: number, retryable = false) {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
    this.details = details;
    this.statusCode = statusCode;
    this.retryable = retryable;
  }
}

export class WalrusNetworkError extends WalrusDataError {
  constructor(message: string, details?: any) {
    super(message, 'NETWORK_ERROR', details, undefined, true);
  }
}

export class WalrusValidationError extends WalrusDataError {
  constructor(message: string, details?: any) {
    super(message, 'VALIDATION_ERROR', details, 400);
  }
}

export class WalrusNotFoundError extends WalrusDataError {
  constructor(message: string, details?: any) {
    super(message, 'NOT_FOUND', details, 404);
  }
}

export class WalrusStorageError extends WalrusDataError {
  constructor(message: string, details?: any) {
    super(message, 'STORAGE_ERROR', details, undefined, true);
  }
}

export class WalrusIndexError extends WalrusDataError {
  constructor(message: string, details?: any) {
    super(message, 'INDEX_ERROR', details, undefined, true);
  }
}

export class WalrusRateLimitError extends WalrusDataError {
  constructor(message: string, details?: any) {
    super(message, 'RATE_LIMIT', details, 429, true);
  }
}

// Cache Types
export interface WalrusCache {
  get<T>(key: string): Promise<T | null>;
  set<T>(key: string, value: T, ttl?: number): Promise<void>;
  delete(key: string): Promise<void>;
  clear(): Promise<void>;
  size(): Promise<number>;
  keys(): Promise<string[]>;
}

export interface WalrusCacheOptions {
  ttl?: number; // Time to live in milliseconds
  maxSize?: number; // Maximum cache entries
  staleWhileRevalidate?: boolean;
  compress?: boolean;
}

// Index Types for O(1) Lookups
export interface WalrusIndex {
  name: string;
  type: 'btree' | 'hash' | 'fulltext' | 'geo' | 'custom';
  fields: string[];
  unique?: boolean;
  sparse?: boolean;
  options?: Record<string, any>;
}

export interface WalrusIndexQuery {
  index: string;
  query: any;
  limit?: number;
  offset?: number;
}

export interface WalrusIndexResult<T = any> {
  items: WalrusDataItem<T>[];
  totalCount: number;
  indexUsed: string;
  queryTime: number;
}

// Monitoring Types
export interface WalrusMetrics {
  requestCount: number;
  avgResponseTime: number;
  errorRate: number;
  cacheHitRate: number;
  storageLatency: number;
  retrievalLatency: number;
  indexQueryTime: number;
  throughput: number; // requests per second
}

// Event Types for real-time updates
export interface WalrusDataEvent<T = any> {
  type: 'created' | 'updated' | 'deleted';
  dataId: string;
  blobId?: string;
  data?: WalrusDataItem<T>;
  timestamp: Date;
  metadata?: Record<string, any>;
}

export type WalrusEventCallback<T = any> = (event: WalrusDataEvent<T>) => void;

export interface WalrusSubscriptionOptions {
  schemas?: string[];
  tags?: string[];
  categories?: string[];
  authors?: string[];
  eventTypes?: Array<'created' | 'updated' | 'deleted'>;
}

// Schema Types for structured data validation
export interface WalrusDataSchema {
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

// Export additional utility types
export type WalrusDataId = string;
export type WalrusBlobId = string;
export type WalrusContentHash = string;

// Client response wrapper
export interface WalrusResponse<T> {
  data: T;
  success: boolean;
  timestamp: string;
  requestId: string;
  cached?: boolean;
  metadata?: Record<string, any>;
}

// Rate limiting
export interface WalrusRateLimit {
  limit: number;
  remaining: number;
  reset: Date;
  retryAfter?: number;
}
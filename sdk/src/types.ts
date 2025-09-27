/**
 * NOCAP SDK Type Definitions
 * 
 * TypeScript interfaces and types for the NOCAP Walrus SDK
 */

// Core Configuration Types
export interface NOCAPConfig {
  apiUrl: string;
  timeout: number;
  retries: number;
  retryDelay: number;
  userAgent: string;
}

export interface NOCAPClientOptions {
  apiUrl?: string;
  timeout?: number;
  retries?: number;
  retryDelay?: number;
  userAgent?: string;
  apiKey?: string; // For future authentication
}

// Fact Status Types
export type NOCAPFactStatus = 'verified' | 'review' | 'flagged';

// Tag Types
export interface NOCAPTag {
  name: string;
  category: 'topic' | 'region' | 'type' | 'methodology' | 'urgency';
}

// Source Types
export interface NOCAPSource {
  url: string;
  title?: string;
  description?: string;
  accessedAt?: string;
  archived?: boolean;
  archiveUrl?: string;
  credibilityScore?: number;
}

// Comment Types
export interface NOCAPComment {
  id: string;
  author: string;
  content: string;
  timestamp: string;
  parentId?: string;
  votes: {
    up: number;
    down: number;
  };
  edited?: boolean;
  editedAt?: string;
}

// Core Fact Types
export interface NOCAPFact {
  id: string;
  title: string;
  summary: string;
  status: NOCAPFactStatus;
  votes: number;
  comments: number;
  author: string;
  updated: string;
  walrusBlobId?: string;
  contentHash?: string;
  metadata?: {
    created: Date;
    lastModified: Date;
    version: number;
    contentType: 'text/plain' | 'text/markdown' | 'text/html';
    tags?: string[];
  };
}

export interface NOCAPFactDetails extends NOCAPFact {
  fullContent?: string;
  sources?: string[] | NOCAPSource[];
  tags: NOCAPTag[];
  keywords: string[];
  blobId: string;
}

// Search and Query Types
export interface NOCAPSearchQuery {
  keywords?: string[];
  tags?: string[];
  authors?: string[];
  status?: NOCAPFactStatus[];
  dateRange?: {
    from?: Date;
    to?: Date;
  };
  limit?: number;
  offset?: number;
}

export interface NOCAPSearchResults {
  facts: NOCAPFactDetails[];
  totalCount: number;
  searchTime: number;
  query: NOCAPSearchQuery;
}

// Pagination Types
export interface NOCAPPaginationOptions {
  limit?: number;
  offset?: number;
}

export interface NOCAPPaginatedResponse<T> {
  data: T[];
  totalCount: number;
  limit: number;
  offset: number;
  hasMore: boolean;
}

// Index and Statistics Types
export interface NOCAPIndexStats {
  totalFacts: number;
  totalKeywords: number;
  totalTags: number;
  totalAuthors: number;
  indexSize: number;
  lastUpdated?: string;
}

// Health Check Types
export interface NOCAPHealthCheck {
  status: 'healthy' | 'degraded' | 'unhealthy';
  version: string;
  uptime: number;
  walrusStatus: {
    available: boolean;
    latency: number;
    nodes: number;
  };
  indexStatus: {
    available: boolean;
    lastSync: string;
    facts: number;
  };
  timestamp: string;
}

// Error Types
export class NOCAPError extends Error {
  public readonly code: string;
  public readonly details?: any;
  public readonly statusCode?: number;

  constructor(message: string, code: string, details?: any, statusCode?: number) {
    super(message);
    this.name = 'NOCAPError';
    this.code = code;
    this.details = details;
    this.statusCode = statusCode;
  }
}

export class NOCAPNetworkError extends NOCAPError {
  constructor(message: string, details?: any) {
    super(message, 'NETWORK_ERROR', details);
  }
}

export class NOCAPValidationError extends NOCAPError {
  constructor(message: string, details?: any) {
    super(message, 'VALIDATION_ERROR', details, 400);
  }
}

export class NOCAPNotFoundError extends NOCAPError {
  constructor(message: string, details?: any) {
    super(message, 'NOT_FOUND', details, 404);
  }
}

export class NOCAPRateLimitError extends NOCAPError {
  constructor(message: string, details?: any) {
    super(message, 'RATE_LIMIT', details, 429);
  }
}

// Response wrapper types
export interface NOCAPResponse<T> {
  data: T;
  success: boolean;
  timestamp: string;
  requestId?: string;
}

export interface NOCAPErrorResponse {
  error: string;
  code: string;
  details?: any;
  timestamp: string;
  requestId?: string;
}

// Filtering and Sorting Types
export interface NOCAPFilterOptions {
  status?: NOCAPFactStatus[];
  tags?: string[];
  authors?: string[];
  dateRange?: {
    from?: Date;
    to?: Date;
  };
  hasFullContent?: boolean;
  hasSources?: boolean;
  minVotes?: number;
  maxVotes?: number;
}

export interface NOCAPSortOptions {
  field: 'created' | 'updated' | 'votes' | 'comments' | 'relevance';
  direction: 'asc' | 'desc';
}

// Analytics Types (for future use)
export interface NOCAPAnalytics {
  factTrends: {
    period: string;
    totalFacts: number;
    verifiedFacts: number;
    flaggedFacts: number;
    avgVotes: number;
  }[];
  topTags: {
    name: string;
    count: number;
    percentage: number;
  }[];
  topAuthors: {
    author: string;
    factCount: number;
    avgVotes: number;
  }[];
}

// Bulk Operations Types
export interface NOCAPBulkQuery {
  factIds: string[];
  includeContent?: boolean;
  includeSources?: boolean;
  includeComments?: boolean;
}

export interface NOCAPBulkResponse {
  facts: NOCAPFactDetails[];
  errors: {
    factId: string;
    error: string;
  }[];
  totalRequested: number;
  totalReturned: number;
}

// Subscription Types (for real-time updates)
export interface NOCAPSubscriptionOptions {
  tags?: string[];
  authors?: string[];
  status?: NOCAPFactStatus[];
  includeUpdates?: boolean;
  includeNew?: boolean;
}

export type NOCAPSubscriptionCallback = (fact: NOCAPFactDetails, type: 'new' | 'updated' | 'status_changed') => void;

// Export Options Types
export interface NOCAPExportOptions {
  format: 'json' | 'csv' | 'xml';
  query?: NOCAPSearchQuery;
  includeContent?: boolean;
  includeSources?: boolean;
  includeMetadata?: boolean;
  filename?: string;
}

// Rate Limiting Types
export interface NOCAPRateLimit {
  limit: number;
  remaining: number;
  reset: Date;
  retryAfter?: number;
}

// Cache Types
export interface NOCAPCacheOptions {
  ttl?: number; // Time to live in milliseconds
  staleWhileRevalidate?: boolean;
  cacheKey?: string;
}

// Monitoring Types
export interface NOCAPMetrics {
  requestCount: number;
  avgResponseTime: number;
  errorRate: number;
  cacheHitRate: number;
  walrusLatency: number;
}

// Feature Flags Types (for SDK configuration)
export interface NOCAPFeatureFlags {
  enableCache?: boolean;
  enableRetries?: boolean;
  enableAnalytics?: boolean;
  enableRealTimeUpdates?: boolean;
  enableBulkOperations?: boolean;
  maxConcurrentRequests?: number;
}

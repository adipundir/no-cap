/**
 * NOCAP SDK Type Definitions
 *
 * TypeScript interfaces and types for the NOCAP Walrus SDK
 */
interface NOCAPConfig {
    apiUrl: string;
    timeout: number;
    retries: number;
    retryDelay: number;
    userAgent: string;
}
interface NOCAPClientOptions {
    apiUrl?: string;
    timeout?: number;
    retries?: number;
    retryDelay?: number;
    userAgent?: string;
    apiKey?: string;
}
type NOCAPFactStatus = 'verified' | 'review' | 'flagged';
interface NOCAPTag {
    name: string;
    category: 'topic' | 'region' | 'type' | 'methodology' | 'urgency';
}
interface NOCAPSource {
    url: string;
    title?: string;
    description?: string;
    accessedAt?: string;
    archived?: boolean;
    archiveUrl?: string;
    credibilityScore?: number;
}
interface NOCAPComment {
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
interface NOCAPFact {
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
interface NOCAPFactDetails extends NOCAPFact {
    fullContent?: string;
    sources?: string[] | NOCAPSource[];
    tags: NOCAPTag[];
    keywords: string[];
    blobId: string;
}
interface NOCAPSearchQuery {
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
interface NOCAPSearchResults {
    facts: NOCAPFactDetails[];
    totalCount: number;
    searchTime: number;
    query: NOCAPSearchQuery;
}
interface NOCAPPaginationOptions {
    limit?: number;
    offset?: number;
}
interface NOCAPPaginatedResponse<T> {
    data: T[];
    totalCount: number;
    limit: number;
    offset: number;
    hasMore: boolean;
}
interface NOCAPIndexStats {
    totalFacts: number;
    totalKeywords: number;
    totalTags: number;
    totalAuthors: number;
    indexSize: number;
    lastUpdated?: string;
}
interface NOCAPHealthCheck {
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
declare class NOCAPError extends Error {
    readonly code: string;
    readonly details?: any;
    readonly statusCode?: number;
    constructor(message: string, code: string, details?: any, statusCode?: number);
}
interface NOCAPBulkQuery {
    factIds: string[];
    includeContent?: boolean;
    includeSources?: boolean;
    includeComments?: boolean;
}
interface NOCAPBulkResponse {
    facts: NOCAPFactDetails[];
    errors: {
        factId: string;
        error: string;
    }[];
    totalRequested: number;
    totalReturned: number;
}
interface NOCAPMetrics {
    requestCount: number;
    avgResponseTime: number;
    errorRate: number;
    cacheHitRate: number;
    walrusLatency: number;
}

/**
 * NOCAP SDK Client
 *
 * Main client class providing access to NOCAP verified facts database
 */

/**
 * NOCAP Client - Main SDK class
 */
declare class NOCAPClient {
    private config;
    private requestCounter;
    private metrics;
    constructor(options?: NOCAPClientOptions);
    /**
     * Get all facts with optional pagination
     */
    getFacts(options?: NOCAPPaginationOptions): Promise<NOCAPPaginatedResponse<NOCAPFact>>;
    /**
     * Get a specific fact by ID
     */
    getFact(factId: string): Promise<NOCAPFactDetails>;
    /**
     * Search facts using indexed search
     */
    searchFacts(query: NOCAPSearchQuery): Promise<NOCAPSearchResults>;
    /**
     * Search facts by keywords (convenience method)
     */
    searchByKeywords(keywords: string[], options?: NOCAPPaginationOptions): Promise<NOCAPSearchResults>;
    /**
     * Search facts by tags (convenience method)
     */
    searchByTags(tags: string[], options?: NOCAPPaginationOptions): Promise<NOCAPSearchResults>;
    /**
     * Get facts by author (convenience method)
     */
    getFactsByAuthor(author: string, options?: NOCAPPaginationOptions): Promise<NOCAPSearchResults>;
    /**
     * Get facts by status (convenience method)
     */
    getFactsByStatus(status: 'verified' | 'review' | 'flagged', options?: NOCAPPaginationOptions): Promise<NOCAPSearchResults>;
    /**
     * Get bulk facts by IDs
     */
    getBulkFacts(query: NOCAPBulkQuery): Promise<NOCAPBulkResponse>;
    /**
     * Get index statistics
     */
    getIndexStats(): Promise<NOCAPIndexStats>;
    /**
     * Health check
     */
    healthCheck(): Promise<NOCAPHealthCheck>;
    /**
     * Get SDK metrics
     */
    getMetrics(): NOCAPMetrics;
    /**
     * Reset SDK metrics
     */
    resetMetrics(): void;
    /**
     * Update configuration
     */
    updateConfig(updates: Partial<NOCAPConfig>): void;
    /**
     * Get current configuration
     */
    getConfig(): NOCAPConfig;
    private makeRequest;
    private validateSearchQuery;
    private extractKeywords;
    private updateMetrics;
}

/**
 * NOCAP SDK Utilities
 *
 * Helper functions and utilities for the NOCAP SDK
 */

/**
 * Validate a fact ID
 */
declare function validateFactId(factId: string): boolean;
/**
 * Sanitize search query parameters
 */
declare function sanitizeSearchQuery(query: NOCAPSearchQuery): NOCAPSearchQuery;

/**
 * Default configuration for NOCAP client
 */
declare const DEFAULT_CONFIG: NOCAPConfig;
/**
 * Create a new NOCAP client instance
 *
 * @param options - Configuration options
 * @returns NOCAPClient instance
 */
declare function createClient(options?: NOCAPClientOptions): NOCAPClient;
/**
 * SDK version information
 */
declare const VERSION = "1.0.0";
declare const API_VERSION = "v1";
/**
 * Quick access functions for common operations
 */
/**
 * Get all facts with optional pagination
 */
declare function getFacts(options?: NOCAPPaginationOptions & NOCAPClientOptions): Promise<NOCAPPaginatedResponse<NOCAPFact>>;
/**
 * Get a specific fact by ID
 */
declare function getFact(factId: string, options?: NOCAPClientOptions): Promise<NOCAPFactDetails>;
/**
 * Search facts by keywords, tags, etc.
 */
declare function searchFacts(query: NOCAPSearchQuery, options?: NOCAPClientOptions): Promise<NOCAPSearchResults>;
/**
 * Get SDK health status
 */
declare function healthCheck(options?: NOCAPClientOptions): Promise<NOCAPHealthCheck>;

export { API_VERSION, DEFAULT_CONFIG, NOCAPClient, NOCAPClientOptions, NOCAPComment, NOCAPConfig, NOCAPError, NOCAPFact, NOCAPFactDetails, NOCAPFactStatus, NOCAPHealthCheck, NOCAPIndexStats, NOCAPPaginationOptions, NOCAPSearchQuery, NOCAPSearchResults, NOCAPSource, NOCAPTag, VERSION, createClient, getFact, getFacts, healthCheck, sanitizeSearchQuery, searchFacts, validateFactId };

/**
 * NOCAP SDK Client
 * 
 * Main client class providing access to NOCAP verified facts database
 */

import {
  NOCAPConfig,
  NOCAPClientOptions,
  NOCAPFact,
  NOCAPFactDetails,
  NOCAPSearchQuery,
  NOCAPSearchResults,
  NOCAPPaginationOptions,
  NOCAPPaginatedResponse,
  NOCAPIndexStats,
  NOCAPHealthCheck,
  NOCAPError,
  NOCAPNetworkError,
  NOCAPValidationError,
  NOCAPNotFoundError,
  NOCAPRateLimitError,
  NOCAPBulkQuery,
  NOCAPBulkResponse,
  NOCAPRateLimit,
  NOCAPMetrics
} from './types';

/**
 * NOCAP Client - Main SDK class
 */
export class NOCAPClient {
  private config: NOCAPConfig;
  private requestCounter = 0;
  private metrics: NOCAPMetrics = {
    requestCount: 0,
    avgResponseTime: 0,
    errorRate: 0,
    cacheHitRate: 0,
    walrusLatency: 0
  };

  constructor(options: NOCAPClientOptions = {}) {
    this.config = {
      apiUrl: options.apiUrl || 'https://nocap.app/api',
      timeout: options.timeout || 30000,
      retries: options.retries || 3,
      retryDelay: options.retryDelay || 1000,
      userAgent: options.userAgent || 'nocap-sdk/1.0.0'
    };
  }

  /**
   * Get all facts with optional pagination
   */
  async getFacts(options?: NOCAPPaginationOptions): Promise<NOCAPPaginatedResponse<NOCAPFact>> {
    const startTime = Date.now();
    
    try {
      const params = new URLSearchParams();
      if (options?.limit) params.append('limit', options.limit.toString());
      if (options?.offset) params.append('offset', options.offset.toString());

      const response = await this.makeRequest(`/facts?${params}`);
      const responseTime = Date.now() - startTime;
      this.updateMetrics(responseTime, false);

      return {
        data: response.facts || [],
        totalCount: response.totalCount || 0,
        limit: options?.limit || 10,
        offset: options?.offset || 0,
        hasMore: (response.facts?.length || 0) === (options?.limit || 10)
      };
    } catch (error) {
      const responseTime = Date.now() - startTime;
      this.updateMetrics(responseTime, true);
      throw error;
    }
  }

  /**
   * Get a specific fact by ID
   */
  async getFact(factId: string): Promise<NOCAPFactDetails> {
    if (!factId || typeof factId !== 'string') {
      throw new NOCAPValidationError('Fact ID is required and must be a string');
    }

    const startTime = Date.now();
    
    try {
      const response = await this.makeRequest(`/facts/${encodeURIComponent(factId)}`);
      const responseTime = Date.now() - startTime;
      this.updateMetrics(responseTime, false);

      if (!response.fact) {
        throw new NOCAPNotFoundError(`Fact with ID '${factId}' not found`);
      }

      // Transform response to match NOCAPFactDetails interface
      return {
        ...response.fact,
        fullContent: response.fullContent,
        sources: response.sources || [],
        tags: response.fact.metadata?.tags?.map((tag: any) => 
          typeof tag === 'string' ? { name: tag, category: 'type' } : tag
        ) || [],
        keywords: this.extractKeywords(response.fact.title, response.fact.summary),
        blobId: response.fact.walrusBlobId || ''
      };
    } catch (error) {
      const responseTime = Date.now() - startTime;
      this.updateMetrics(responseTime, true);
      
      if (error instanceof NOCAPError) {
        throw error;
      }
      throw new NOCAPNetworkError(`Failed to fetch fact: ${error}`);
    }
  }

  /**
   * Search facts using indexed search
   */
  async searchFacts(query: NOCAPSearchQuery): Promise<NOCAPSearchResults> {
    const startTime = Date.now();
    
    try {
      // Validate search query
      this.validateSearchQuery(query);

      const response = await this.makeRequest('/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(query)
      });

      const responseTime = Date.now() - startTime;
      this.updateMetrics(responseTime, false);

      return {
        facts: response.facts || [],
        totalCount: response.totalCount || 0,
        searchTime: response.searchTime || responseTime,
        query: response.query || query
      };
    } catch (error) {
      const responseTime = Date.now() - startTime;
      this.updateMetrics(responseTime, true);
      throw error;
    }
  }

  /**
   * Search facts by keywords (convenience method)
   */
  async searchByKeywords(keywords: string[], options?: NOCAPPaginationOptions): Promise<NOCAPSearchResults> {
    return this.searchFacts({
      keywords,
      ...options
    });
  }

  /**
   * Search facts by tags (convenience method)
   */
  async searchByTags(tags: string[], options?: NOCAPPaginationOptions): Promise<NOCAPSearchResults> {
    return this.searchFacts({
      tags,
      ...options
    });
  }

  /**
   * Get facts by author (convenience method)
   */
  async getFactsByAuthor(author: string, options?: NOCAPPaginationOptions): Promise<NOCAPSearchResults> {
    return this.searchFacts({
      authors: [author],
      ...options
    });
  }

  /**
   * Get facts by status (convenience method)
   */
  async getFactsByStatus(status: 'verified' | 'review' | 'flagged', options?: NOCAPPaginationOptions): Promise<NOCAPSearchResults> {
    return this.searchFacts({
      status: [status],
      ...options
    });
  }

  /**
   * Get bulk facts by IDs
   */
  async getBulkFacts(query: NOCAPBulkQuery): Promise<NOCAPBulkResponse> {
    if (!query.factIds || !Array.isArray(query.factIds) || query.factIds.length === 0) {
      throw new NOCAPValidationError('factIds array is required and must not be empty');
    }

    if (query.factIds.length > 100) {
      throw new NOCAPValidationError('Maximum 100 fact IDs allowed per bulk request');
    }

    const startTime = Date.now();
    
    try {
      const response = await this.makeRequest('/facts/bulk', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(query)
      });

      const responseTime = Date.now() - startTime;
      this.updateMetrics(responseTime, false);

      return response;
    } catch (error) {
      const responseTime = Date.now() - startTime;
      this.updateMetrics(responseTime, true);
      throw error;
    }
  }

  /**
   * Get index statistics
   */
  async getIndexStats(): Promise<NOCAPIndexStats> {
    const startTime = Date.now();
    
    try {
      const response = await this.makeRequest('/index/stats');
      const responseTime = Date.now() - startTime;
      this.updateMetrics(responseTime, false);

      return response.stats;
    } catch (error) {
      const responseTime = Date.now() - startTime;
      this.updateMetrics(responseTime, true);
      throw error;
    }
  }

  /**
   * Health check
   */
  async healthCheck(): Promise<NOCAPHealthCheck> {
    const startTime = Date.now();
    
    try {
      const response = await this.makeRequest('/health');
      const responseTime = Date.now() - startTime;
      this.updateMetrics(responseTime, false);

      return {
        status: response.status || 'healthy',
        version: response.version || '1.0.0',
        uptime: response.uptime || 0,
        walrusStatus: response.walrusStatus || {
          available: true,
          latency: responseTime,
          nodes: 1
        },
        indexStatus: response.indexStatus || {
          available: true,
          lastSync: new Date().toISOString(),
          facts: 0
        },
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      const responseTime = Date.now() - startTime;
      this.updateMetrics(responseTime, true);
      
      return {
        status: 'unhealthy',
        version: '1.0.0',
        uptime: 0,
        walrusStatus: {
          available: false,
          latency: responseTime,
          nodes: 0
        },
        indexStatus: {
          available: false,
          lastSync: new Date().toISOString(),
          facts: 0
        },
        timestamp: new Date().toISOString()
      };
    }
  }

  /**
   * Get SDK metrics
   */
  getMetrics(): NOCAPMetrics {
    return { ...this.metrics };
  }

  /**
   * Reset SDK metrics
   */
  resetMetrics(): void {
    this.metrics = {
      requestCount: 0,
      avgResponseTime: 0,
      errorRate: 0,
      cacheHitRate: 0,
      walrusLatency: 0
    };
  }

  /**
   * Update configuration
   */
  updateConfig(updates: Partial<NOCAPConfig>): void {
    this.config = { ...this.config, ...updates };
  }

  /**
   * Get current configuration
   */
  getConfig(): NOCAPConfig {
    return { ...this.config };
  }

  // Private methods

  private async makeRequest(endpoint: string, options: RequestInit = {}): Promise<any> {
    const url = `${this.config.apiUrl}${endpoint}`;
    const requestId = `req-${++this.requestCounter}-${Date.now()}`;
    
    const requestOptions: RequestInit = {
      headers: {
        'User-Agent': this.config.userAgent,
        'X-Request-ID': requestId,
        ...options.headers
      },
      ...options
    };

    let lastError: Error | null = null;
    
    for (let attempt = 0; attempt <= this.config.retries; attempt++) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), this.config.timeout);
        
        const response = await fetch(url, {
          ...requestOptions,
          signal: controller.signal
        });
        
        clearTimeout(timeoutId);

        if (!response.ok) {
          const errorText = await response.text();
          let errorData;
          
          try {
            errorData = JSON.parse(errorText);
          } catch {
            errorData = { error: errorText };
          }

          switch (response.status) {
            case 404:
              throw new NOCAPNotFoundError(errorData.error || 'Resource not found', errorData);
            case 429:
              throw new NOCAPRateLimitError(errorData.error || 'Rate limit exceeded', errorData);
            case 400:
              throw new NOCAPValidationError(errorData.error || 'Invalid request', errorData);
            default:
              throw new NOCAPNetworkError(
                `HTTP ${response.status}: ${errorData.error || 'Unknown error'}`,
                { status: response.status, ...errorData }
              );
          }
        }

        const data = await response.json();
        return data;
        
      } catch (error) {
        lastError = error instanceof Error ? error : new Error(String(error));
        
        if (error instanceof NOCAPError || attempt === this.config.retries) {
          throw error;
        }
        
        // Wait before retrying
        await new Promise(resolve => setTimeout(resolve, this.config.retryDelay * (attempt + 1)));
      }
    }

    throw lastError || new NOCAPNetworkError('Unknown network error');
  }

  private validateSearchQuery(query: NOCAPSearchQuery): void {
    if (!query || typeof query !== 'object') {
      throw new NOCAPValidationError('Search query must be an object');
    }

    if (query.limit && (query.limit < 1 || query.limit > 100)) {
      throw new NOCAPValidationError('Limit must be between 1 and 100');
    }

    if (query.offset && query.offset < 0) {
      throw new NOCAPValidationError('Offset must be non-negative');
    }

    if (query.keywords && (!Array.isArray(query.keywords) || query.keywords.some(k => typeof k !== 'string'))) {
      throw new NOCAPValidationError('Keywords must be an array of strings');
    }

    if (query.tags && (!Array.isArray(query.tags) || query.tags.some(t => typeof t !== 'string'))) {
      throw new NOCAPValidationError('Tags must be an array of strings');
    }

    if (query.authors && (!Array.isArray(query.authors) || query.authors.some(a => typeof a !== 'string'))) {
      throw new NOCAPValidationError('Authors must be an array of strings');
    }

    if (query.status && (!Array.isArray(query.status) || query.status.some(s => !['verified', 'review', 'flagged'].includes(s)))) {
      throw new NOCAPValidationError('Status must be an array of valid status values');
    }

    if (query.dateRange) {
      if (query.dateRange.from && !(query.dateRange.from instanceof Date)) {
        throw new NOCAPValidationError('dateRange.from must be a Date object');
      }
      if (query.dateRange.to && !(query.dateRange.to instanceof Date)) {
        throw new NOCAPValidationError('dateRange.to must be a Date object');
      }
      if (query.dateRange.from && query.dateRange.to && query.dateRange.from > query.dateRange.to) {
        throw new NOCAPValidationError('dateRange.from must be before dateRange.to');
      }
    }
  }

  private extractKeywords(title: string, summary: string): string[] {
    const text = `${title} ${summary}`.toLowerCase();
    const words = text.match(/\b[a-zA-Z]{3,}\b/g) || [];
    const stopWords = new Set(['the', 'and', 'but', 'not', 'are', 'was', 'were', 'been', 'have', 'has', 'had']);
    
    return Array.from(new Set(words.filter(word => !stopWords.has(word))));
  }

  private updateMetrics(responseTime: number, isError: boolean): void {
    this.metrics.requestCount++;
    this.metrics.avgResponseTime = (this.metrics.avgResponseTime + responseTime) / 2;
    
    if (isError) {
      this.metrics.errorRate = ((this.metrics.errorRate * (this.metrics.requestCount - 1)) + 1) / this.metrics.requestCount;
    } else {
      this.metrics.errorRate = (this.metrics.errorRate * (this.metrics.requestCount - 1)) / this.metrics.requestCount;
    }
  }
}

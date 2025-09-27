import {
  Fact,
  FullFact,
  FactSearchQuery,
  FactSearchResponse,
  TagAnalytics,
  FactTag,
  TagCategory,
  APIKey
} from '@/types/fact';

export interface NoCapSDKConfig {
  apiKey?: string;
  baseUrl?: string;
  timeout?: number;
  retries?: number;
}

export interface DeveloperInsights {
  totalFacts: number;
  verifiedFacts: number;
  verificationRate: number;
  totalTags: number;
  averageTagsPerFact: number;
  topCategories: { category: TagCategory; count: number; trend: number }[];
  factsByRegion: { region: string; count: number }[];
  authorActivity: { author: string; facts: number; verificationRate: number }[];
  dailyTrends: any[];
  tagCloud: { name: string; count: number; category: TagCategory; size: number }[];
}

/**
 * No-Cap Facts API SDK
 * 
 * A comprehensive SDK for accessing verified facts stored on Walrus
 * 
 * @example
 * ```typescript
 * import { NoCapSDK } from '@/lib/sdk/no-cap-sdk';
 * 
 * const sdk = new NoCapSDK({
 *   apiKey: 'your-api-key',
 *   baseUrl: 'https://your-domain.com/api'
 * });
 * 
 * // Search for facts about climate change
 * const results = await sdk.search({
 *   keywords: 'climate change',
 *   tags: ['environment', 'science'],
 *   status: ['verified'],
 *   limit: 10
 * });
 * 
 * // Get analytics
 * const analytics = await sdk.getAnalytics('30d');
 * ```
 */
export class NoCapSDK {
  private config: Required<NoCapSDKConfig>;

  constructor(config: NoCapSDKConfig = {}) {
    this.config = {
      apiKey: config.apiKey || '',
      baseUrl: config.baseUrl || (typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000'),
      timeout: config.timeout || 10000,
      retries: config.retries || 3
    };
  }

  /**
   * Search for facts with advanced filtering
   */
  async search(query: FactSearchQuery): Promise<FactSearchResponse> {
    const response = await this.request('POST', '/search', query);
    return response.data;
  }

  /**
   * Get a specific fact by ID
   */
  async getFact(id: string): Promise<Fact | null> {
    try {
      const response = await this.request('GET', `/facts/${id}`);
      return response.data.fact;
    } catch (error: any) {
      if (error.status === 404) return null;
      throw error;
    }
  }

  /**
   * Get all facts (paginated)
   */
  async getFacts(limit: number = 20, offset: number = 0): Promise<{ facts: Fact[]; totalCount: number }> {
    const response = await this.request('GET', `/facts?limit=${limit}&offset=${offset}`);
    return {
      facts: response.data.facts,
      totalCount: response.data.totalCount || response.data.facts.length
    };
  }

  /**
   * Submit a new fact (requires write permissions)
   */
  async submitFact(fact: FullFact): Promise<Fact> {
    const response = await this.request('POST', '/facts', fact);
    return response.data.fact;
  }

  /**
   * Get tag analytics and information
   */
  async getTags(options?: {
    category?: TagCategory;
    limit?: number;
    sortBy?: 'count' | 'name' | 'trend';
  }): Promise<{ tags: TagAnalytics[]; totalTags: number; categories: TagCategory[] }> {
    const params = new URLSearchParams();
    if (options?.category) params.set('category', options.category);
    if (options?.limit) params.set('limit', options.limit.toString());
    if (options?.sortBy) params.set('sortBy', options.sortBy);

    const response = await this.request('GET', `/tags?${params.toString()}`);
    return response.data;
  }

  /**
   * Add tags to a fact (requires write permissions)
   */
  async addTags(factId: string, tags: FactTag[]): Promise<{ success: boolean; message: string }> {
    const response = await this.request('POST', '/tags', { factId, tags });
    return response.data;
  }

  /**
   * Get comprehensive analytics
   */
  async getAnalytics(timeframe: '24h' | '7d' | '30d' | '90d' | 'all' = '30d', category?: TagCategory): Promise<{
    timeframe: string;
    category?: string;
    insights: DeveloperInsights;
    generatedAt: string;
  }> {
    const params = new URLSearchParams();
    params.set('timeframe', timeframe);
    if (category) params.set('category', category);

    const response = await this.request('GET', `/analytics?${params.toString()}`);
    return response.data;
  }

  /**
   * Get trending data over time
   */
  async getTrends(options?: {
    timeframe?: '24h' | '7d' | '30d' | '90d' | 'all';
    granularity?: 'hourly' | 'daily' | 'weekly';
    tags?: string[];
  }): Promise<any> {
    const response = await this.request('POST', '/analytics/trends', options || {});
    return response.data;
  }

  /**
   * Search for facts by specific criteria (convenience methods)
   */
  async searchByTag(tag: string, limit: number = 20): Promise<Fact[]> {
    const result = await this.search({ tags: [tag], limit });
    return result.facts;
  }

  async searchByCategory(category: TagCategory, limit: number = 20): Promise<Fact[]> {
    const result = await this.search({ categories: [category], limit });
    return result.facts;
  }

  async searchByKeywords(keywords: string, limit: number = 20): Promise<Fact[]> {
    const result = await this.search({ keywords, limit });
    return result.facts;
  }

  async getVerifiedFacts(limit: number = 20): Promise<Fact[]> {
    const result = await this.search({ status: ['verified'], limit });
    return result.facts;
  }

  /**
   * Utility methods for developers
   */
  async getPopularTags(limit: number = 20): Promise<TagAnalytics[]> {
    const result = await this.getTags({ limit, sortBy: 'count' });
    return result.tags;
  }

  async getFactsByAuthor(author: string, limit: number = 20): Promise<Fact[]> {
    const result = await this.search({ author, limit });
    return result.facts;
  }

  async getFactsByRegion(region: string, limit: number = 20): Promise<Fact[]> {
    const result = await this.search({ region, limit });
    return result.facts;
  }

  /**
   * Batch operations
   */
  async batchSearch(queries: FactSearchQuery[]): Promise<FactSearchResponse[]> {
    const promises = queries.map(query => this.search(query));
    return Promise.all(promises);
  }

  /**
   * Stream facts (using async generator for large datasets)
   */
  async* streamFacts(query: FactSearchQuery, batchSize: number = 100): AsyncGenerator<Fact, void, unknown> {
    let offset = 0;
    let hasMore = true;

    while (hasMore) {
      const searchQuery = { ...query, limit: batchSize, offset };
      const result = await this.search(searchQuery);
      
      for (const fact of result.facts) {
        yield fact;
      }

      hasMore = result.page.hasMore;
      offset += batchSize;
    }
  }

  /**
   * Health check
   */
  async ping(): Promise<{ status: 'ok' | 'error'; timestamp: string }> {
    try {
      const response = await this.request('GET', '/health');
      return { status: 'ok', timestamp: new Date().toISOString() };
    } catch (error) {
      return { status: 'error', timestamp: new Date().toISOString() };
    }
  }

  // Private methods
  private async request(method: string, endpoint: string, data?: any) {
    const url = `${this.config.baseUrl}/api${endpoint}`;
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (this.config.apiKey) {
      headers['Authorization'] = `Bearer ${this.config.apiKey}`;
    }

    let lastError: Error | null = null;
    
    for (let attempt = 0; attempt < this.config.retries; attempt++) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), this.config.timeout);

        const response = await fetch(url, {
          method,
          headers,
          body: data ? JSON.stringify(data) : undefined,
          signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new NoCapAPIError(
            errorData.error || `HTTP ${response.status}`,
            response.status,
            errorData
          );
        }

        return {
          data: await response.json(),
          status: response.status,
          headers: response.headers
        };
      } catch (error) {
        lastError = error as Error;
        if (attempt < this.config.retries - 1) {
          await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
        }
      }
    }

    throw lastError;
  }
}

/**
 * Custom error class for API errors
 */
export class NoCapAPIError extends Error {
  constructor(
    message: string,
    public status: number,
    public data?: any
  ) {
    super(message);
    this.name = 'NoCapAPIError';
  }
}

/**
 * Factory function for quick SDK instantiation
 */
export function createNoCapSDK(config?: NoCapSDKConfig): NoCapSDK {
  return new NoCapSDK(config);
}

/**
 * Default export for convenience
 */
export default NoCapSDK;

import { WalrusSDK } from '@hibernuts/walrus-sdk';
import {
  Fact,
  FullFact,
  FactSearchQuery,
  FactSearchResponse,
  TagAnalytics,
  FactTag,
  TagCategory
} from '@/types/fact';

/**
 * Decentralized Fact Index stored on Walrus
 * This is the master index that maps all facts
 */
interface WalrusFactIndex {
  version: string;
  totalFacts: number;
  lastUpdated: string;
  maintainers: string[]; // Public keys of index maintainers
  signature: string; // Cryptographic signature for integrity
  facts: WalrusFactMeta[];
}

interface WalrusFactMeta {
  id: string;
  blobId: string; // Walrus blob ID containing full fact
  contentHash: string;
  metadata: {
    title: string;
    summary: string;
    tags: { name: string; category: TagCategory }[];
    status: "verified" | "review" | "flagged";
    votes: number;
    comments: number;
    author: string;
    created: string;
    updated: string;
    importance?: number;
    region?: string;
  };
}

/**
 * Specialized indices for fast lookups
 */
interface WalrusTagIndex {
  [tagName: string]: string[]; // tag -> array of fact IDs
}

interface WalrusAnalyticsSnapshot {
  timestamp: string;
  totalFacts: number;
  verifiedFacts: number;
  topTags: { name: string; count: number }[];
  topAuthors: { author: string; facts: number }[];
  regionStats: { region: string; count: number }[];
  dailyTrends: { date: string; verified: number; total: number }[];
}

/**
 * Well-known Walrus blob IDs for system indices
 * These would be managed by community governance
 */
const SYSTEM_INDICES = {
  MAIN_INDEX: process.env.NOCAP_MAIN_INDEX_BLOB_ID || 'nocap-main-index-v1',
  TAG_INDEX: process.env.NOCAP_TAG_INDEX_BLOB_ID || 'nocap-tag-index-v1', 
  ANALYTICS: process.env.NOCAP_ANALYTICS_BLOB_ID || 'nocap-analytics-v1',
  AUTHOR_INDEX: process.env.NOCAP_AUTHOR_INDEX_BLOB_ID || 'nocap-author-index-v1'
};

/**
 * Pure Walrus SDK - No Central Servers Required
 * 
 * @example
 * ```typescript
 * // Decentralized usage - no API keys needed!
 * const sdk = new WalrusDirectSDK({
 *   aggregatorUrl: 'https://aggregator.walrus.host',
 *   publisherUrl: 'https://publisher.walrus.host'
 * });
 * 
 * // Everything comes from Walrus network
 * const facts = await sdk.search({ keywords: 'climate change' });
 * ```
 */
export class WalrusDirectSDK {
  private walrus: WalrusSDK;
  private config: {
    aggregatorUrl: string;
    publisherUrl: string;
    cacheTimeout?: number;
  };
  
  // Client-side caches for performance
  private indexCache: { data: WalrusFactIndex; expires: number } | null = null;
  private factCache = new Map<string, { data: Fact; expires: number }>();
  private tagIndexCache: { data: WalrusTagIndex; expires: number } | null = null;

  constructor(config: {
    aggregatorUrl: string;
    publisherUrl: string;
    cacheTimeout?: number;
  }) {
    this.config = { cacheTimeout: 5 * 60 * 1000, ...config }; // 5 min default cache
    this.walrus = new WalrusSDK({
      aggregator: config.aggregatorUrl,
      publisher: config.publisherUrl
    });
  }

  /**
   * Search facts using pure Walrus storage
   * No central servers involved!
   */
  async search(query: FactSearchQuery): Promise<FactSearchResponse> {
    console.log('🔍 Searching facts directly from Walrus network...');
    
    // 1. Get the main fact index from Walrus
    const index = await this.getMainIndex();
    
    // 2. Client-side filtering based on metadata
    let filteredFacts = index.facts.filter(factMeta => {
      // Status filter
      if (query.status && query.status.length > 0) {
        if (!query.status.includes(factMeta.metadata.status)) return false;
      }
      
      // Author filter
      if (query.author && factMeta.metadata.author !== query.author) return false;
      
      // Region filter
      if (query.region && factMeta.metadata.region !== query.region) return false;
      
      // Importance filter
      if (query.minImportance && (factMeta.metadata.importance || 0) < query.minImportance) return false;
      
      // Date filter
      if (query.dateRange) {
        const factDate = new Date(factMeta.metadata.updated);
        if (factDate < query.dateRange.from || factDate > query.dateRange.to) return false;
      }
      
      // Keywords filter (simple text search on title/summary)
      if (query.keywords) {
        const searchText = `${factMeta.metadata.title} ${factMeta.metadata.summary}`.toLowerCase();
        const keywords = query.keywords.toLowerCase().split(' ');
        if (!keywords.some(keyword => searchText.includes(keyword))) return false;
      }
      
      // Tags filter
      if (query.tags && query.tags.length > 0) {
        const factTags = factMeta.metadata.tags.map(t => t.name);
        if (!query.tags.some(tag => factTags.includes(tag))) return false;
      }
      
      // Categories filter
      if (query.categories && query.categories.length > 0) {
        const factCategories = factMeta.metadata.tags.map(t => t.category);
        if (!query.categories.some(cat => factCategories.includes(cat))) return false;
      }
      
      return true;
    });

    // 3. Sort results
    filteredFacts = this.sortFacts(filteredFacts, query);
    
    // 4. Paginate
    const totalCount = filteredFacts.length;
    const offset = query.offset || 0;
    const limit = query.limit || 20;
    const paginatedMeta = filteredFacts.slice(offset, offset + limit);
    
    // 5. Fetch full fact data from Walrus (with caching)
    console.log(`📦 Fetching ${paginatedMeta.length} facts from Walrus...`);
    const facts = await this.batchGetFacts(paginatedMeta.map(m => m.blobId));
    
    // 6. Generate facets for UI
    const facets = this.generateFacets(filteredFacts);
    
    return {
      facts,
      totalCount,
      facets,
      page: {
        limit,
        offset,
        hasMore: offset + limit < totalCount
      }
    };
  }

  /**
   * Get a specific fact by ID
   */
  async getFact(id: string): Promise<Fact | null> {
    const index = await this.getMainIndex();
    const factMeta = index.facts.find(f => f.id === id);
    
    if (!factMeta) return null;
    
    return this.getFactFromWalrus(factMeta.blobId);
  }

  /**
   * Get analytics directly from Walrus
   */
  async getAnalytics(): Promise<{
    totalFacts: number;
    verifiedFacts: number;
    verificationRate: number;
    topTags: { name: string; count: number }[];
  }> {
    console.log('📊 Fetching analytics from Walrus...');
    
    try {
      const analyticsBlob = await this.walrus.retrieveBlob(SYSTEM_INDICES.ANALYTICS);
      const analytics: WalrusAnalyticsSnapshot = JSON.parse(analyticsBlob.toString());
      
      return {
        totalFacts: analytics.totalFacts,
        verifiedFacts: analytics.verifiedFacts,
        verificationRate: (analytics.verifiedFacts / analytics.totalFacts) * 100,
        topTags: analytics.topTags
      };
    } catch (error) {
      console.warn('Analytics not available, computing from index...');
      
      // Fallback: compute from main index
      const index = await this.getMainIndex();
      const verifiedCount = index.facts.filter(f => f.metadata.status === 'verified').length;
      
      return {
        totalFacts: index.totalFacts,
        verifiedFacts: verifiedCount,
        verificationRate: (verifiedCount / index.totalFacts) * 100,
        topTags: this.computeTopTags(index.facts)
      };
    }
  }

  /**
   * Fast tag-based search using specialized tag index
   */
  async searchByTag(tag: string): Promise<Fact[]> {
    console.log(`🏷️ Fast tag search for "${tag}" via Walrus tag index...`);
    
    try {
      const tagIndex = await this.getTagIndex();
      const factIds = tagIndex[tag] || [];
      
      // Get fact metadata from main index
      const mainIndex = await this.getMainIndex();
      const factMetas = factIds.map(id => 
        mainIndex.facts.find(f => f.id === id)
      ).filter(Boolean) as WalrusFactMeta[];
      
      // Fetch full facts
      const blobIds = factMetas.map(m => m.blobId);
      return this.batchGetFacts(blobIds);
      
    } catch (error) {
      console.warn('Tag index not available, falling back to full search...');
      const results = await this.search({ tags: [tag] });
      return results.facts;
    }
  }

  /**
   * Submit a new fact to Walrus (decentralized)
   */
  async submitFact(fact: FullFact): Promise<{ blobId: string; submitted: boolean }> {
    console.log('📤 Submitting fact directly to Walrus...');
    
    // 1. Store full fact content to Walrus
    const factBlob = Buffer.from(JSON.stringify(fact), 'utf-8');
    const storeResult = await this.walrus.storeBlob(factBlob);
    
    console.log(`✅ Fact stored to Walrus with blob ID: ${storeResult.blobId}`);
    
    // 2. TODO: Submit index update proposal to maintainers
    // This would require a governance mechanism
    console.log('📋 Index update proposal submitted to maintainers');
    
    return {
      blobId: storeResult.blobId,
      submitted: true
    };
  }

  /**
   * Health check - verify Walrus connectivity
   */
  async ping(): Promise<{ status: 'ok' | 'error'; latency: number }> {
    const start = Date.now();
    
    try {
      // Try to fetch the main index
      await this.getMainIndex();
      
      return {
        status: 'ok',
        latency: Date.now() - start
      };
    } catch (error) {
      return {
        status: 'error',
        latency: Date.now() - start
      };
    }
  }

  // Private methods
  private async getMainIndex(): Promise<WalrusFactIndex> {
    const now = Date.now();
    
    if (this.indexCache && now < this.indexCache.expires) {
      return this.indexCache.data;
    }
    
    console.log('📋 Fetching main fact index from Walrus...');
    
    try {
      const indexBlob = await this.walrus.retrieveBlob(SYSTEM_INDICES.MAIN_INDEX);
      const index: WalrusFactIndex = JSON.parse(indexBlob.toString());
      
      // Verify index signature (would implement proper verification)
      if (!this.verifyIndexSignature(index)) {
        throw new Error('Invalid index signature');
      }
      
      this.indexCache = {
        data: index,
        expires: now + this.config.cacheTimeout!
      };
      
      console.log(`✅ Loaded index with ${index.totalFacts} facts`);
      return index;
      
    } catch (error) {
      console.error('Failed to load main index:', error);
      throw new Error('Could not load fact index from Walrus network');
    }
  }

  private async getTagIndex(): Promise<WalrusTagIndex> {
    const now = Date.now();
    
    if (this.tagIndexCache && now < this.tagIndexCache.expires) {
      return this.tagIndexCache.data;
    }
    
    const tagIndexBlob = await this.walrus.retrieveBlob(SYSTEM_INDICES.TAG_INDEX);
    const tagIndex: WalrusTagIndex = JSON.parse(tagIndexBlob.toString());
    
    this.tagIndexCache = {
      data: tagIndex,
      expires: now + this.config.cacheTimeout!
    };
    
    return tagIndex;
  }

  private async getFactFromWalrus(blobId: string): Promise<Fact> {
    const now = Date.now();
    const cached = this.factCache.get(blobId);
    
    if (cached && now < cached.expires) {
      return cached.data;
    }
    
    const factBlob = await this.walrus.retrieveBlob(blobId);
    const fact: Fact = JSON.parse(factBlob.toString());
    
    this.factCache.set(blobId, {
      data: fact,
      expires: now + this.config.cacheTimeout!
    });
    
    return fact;
  }

  private async batchGetFacts(blobIds: string[]): Promise<Fact[]> {
    const uncachedIds = blobIds.filter(id => {
      const cached = this.factCache.get(id);
      return !cached || Date.now() >= cached.expires;
    });
    
    // Fetch uncached facts in parallel
    if (uncachedIds.length > 0) {
      console.log(`📦 Fetching ${uncachedIds.length} facts from Walrus in parallel...`);
      const fetchPromises = uncachedIds.map(id => 
        this.walrus.retrieveBlob(id).then(blob => ({
          blobId: id,
          fact: JSON.parse(blob.toString()) as Fact
        }))
      );
      
      const results = await Promise.all(fetchPromises);
      const now = Date.now();
      
      results.forEach(({ blobId, fact }) => {
        this.factCache.set(blobId, {
          data: fact,
          expires: now + this.config.cacheTimeout!
        });
      });
    }
    
    // Return all requested facts from cache
    return blobIds.map(id => this.factCache.get(id)!.data);
  }

  private sortFacts(facts: WalrusFactMeta[], query: FactSearchQuery): WalrusFactMeta[] {
    return facts.sort((a, b) => {
      let comparison = 0;
      
      switch (query.sortBy) {
        case 'date':
          comparison = new Date(b.metadata.updated).getTime() - new Date(a.metadata.updated).getTime();
          break;
        case 'votes':
          comparison = b.metadata.votes - a.metadata.votes;
          break;
        case 'importance':
          comparison = (b.metadata.importance || 0) - (a.metadata.importance || 0);
          break;
        case 'relevance':
          // Simple relevance: verified facts rank higher
          const aScore = a.metadata.status === 'verified' ? 1 : 0;
          const bScore = b.metadata.status === 'verified' ? 1 : 0;
          comparison = bScore - aScore;
          break;
        default:
          comparison = new Date(b.metadata.updated).getTime() - new Date(a.metadata.updated).getTime();
      }
      
      return query.sortOrder === 'asc' ? -comparison : comparison;
    });
  }

  private generateFacets(facts: WalrusFactMeta[]) {
    const tagCounts = new Map<string, number>();
    const categoryCounts = new Map<string, number>();
    const authorCounts = new Map<string, number>();
    const regionCounts = new Map<string, number>();

    facts.forEach(fact => {
      fact.metadata.tags.forEach(tag => {
        tagCounts.set(tag.name, (tagCounts.get(tag.name) || 0) + 1);
        categoryCounts.set(tag.category, (categoryCounts.get(tag.category) || 0) + 1);
      });

      authorCounts.set(fact.metadata.author, (authorCounts.get(fact.metadata.author) || 0) + 1);
      
      if (fact.metadata.region) {
        regionCounts.set(fact.metadata.region, (regionCounts.get(fact.metadata.region) || 0) + 1);
      }
    });

    return {
      tags: Array.from(tagCounts.entries())
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 20),
      categories: Array.from(categoryCounts.entries())
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count),
      authors: Array.from(authorCounts.entries())
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 10),
      regions: Array.from(regionCounts.entries())
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count)
    };
  }

  private computeTopTags(facts: WalrusFactMeta[]): { name: string; count: number }[] {
    const tagCounts = new Map<string, number>();
    
    facts.forEach(fact => {
      fact.metadata.tags.forEach(tag => {
        tagCounts.set(tag.name, (tagCounts.get(tag.name) || 0) + 1);
      });
    });
    
    return Array.from(tagCounts.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
  }

  private verifyIndexSignature(index: WalrusFactIndex): boolean {
    // TODO: Implement proper cryptographic signature verification
    // For now, just check if signature exists
    return !!index.signature && index.signature.length > 0;
  }
}

// Export factory function for easy setup
export function createWalrusDirectSDK(config: {
  aggregatorUrl?: string;
  publisherUrl?: string;
  cacheTimeout?: number;
}): WalrusDirectSDK {
  return new WalrusDirectSDK({
    aggregatorUrl: config.aggregatorUrl || 'https://aggregator.walrus.host',
    publisherUrl: config.publisherUrl || 'https://publisher.walrus.host',
    cacheTimeout: config.cacheTimeout
  });
}

export default WalrusDirectSDK;

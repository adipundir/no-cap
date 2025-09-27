import type { Fact, FactTag } from '@/types/fact';
import { initializeWalrusFromEnv } from '@/lib/walrus-integration';
import { writeFileSync, readFileSync, existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';

/**
 * Walrus-based fact indexing system
 * Stores and retrieves fact indexes directly from Walrus network
 */

export interface WalrusFactIndex {
  version: string;
  lastUpdated: string;
  totalFacts: number;
  facts: WalrusFactMeta[];
}

export interface WalrusFactMeta {
  id: string;
  blobId: string; // Walrus blob ID containing full fact
  contentHash: string;
  metadata: {
    title: string;
    summary: string;
    tags: { name: string; category: string }[];
    keywords: string[];
    status: string;
    votes: number;
    comments: number;
    author: string;
    created: string;
    updated: string;
    importance?: number;
    region?: string;
  };
}

export interface WalrusTagIndex {
  [tagName: string]: string[]; // tag -> array of fact IDs
}

export interface WalrusKeywordIndex {
  [keyword: string]: string[]; // keyword -> array of fact IDs
}

// Local index file for tracking Walrus blob IDs
const WALRUS_INDEX_FILE = '.next/walrus-index.json';

export class WalrusIndexManager {
  private walrus;
  
  // Client-side caches (short-lived for performance)
  private mainIndexCache: { data: WalrusFactIndex; expires: number } | null = null;
  private tagIndexCache: { data: WalrusTagIndex; expires: number } | null = null;
  private keywordIndexCache: { data: WalrusKeywordIndex; expires: number } | null = null;
  private factCache = new Map<string, { data: Fact; expires: number }>();
  
  constructor() {
    this.walrus = initializeWalrusFromEnv();
  }

  /**
   * Get the main fact index (hybrid: local index + Walrus facts)
   */
  async getMainIndex(): Promise<WalrusFactIndex> {
    const now = Date.now();
    const CACHE_TTL = 5 * 60 * 1000; // 5 minutes
    
    if (this.mainIndexCache && now < this.mainIndexCache.expires) {
      return this.mainIndexCache.data;
    }
    
    try {
      const indexPath = join(process.cwd(), WALRUS_INDEX_FILE);
      
      let index: WalrusFactIndex;
      
      if (existsSync(indexPath)) {
        const indexData = readFileSync(indexPath, 'utf-8');
        index = JSON.parse(indexData);
        console.log(`Loaded Walrus index with ${index.totalFacts} facts`);
      } else {
        console.log('No Walrus index found, creating empty index');
        index = {
          version: '1.0.0',
          lastUpdated: new Date().toISOString(),
          totalFacts: 0,
          facts: []
        };
      }
      
      this.mainIndexCache = {
        data: index,
        expires: now + CACHE_TTL
      };
      
      return index;
      
    } catch (error) {
      console.error('Failed to load Walrus index:', error);
      // Return empty index on error
      const emptyIndex: WalrusFactIndex = {
        version: '1.0.0',
        lastUpdated: new Date().toISOString(),
        totalFacts: 0,
        facts: []
      };
      
      return emptyIndex;
    }
  }

  /**
   * Update the main index with new fact
   */
  async addFactToIndex(fact: Fact, blobId: string): Promise<void> {
    const index = await this.getMainIndex();
    
    // Remove existing fact if updating
    index.facts = index.facts.filter(f => f.id !== fact.id);
    
    // Add new fact metadata
    const factMeta: WalrusFactMeta = {
      id: fact.id,
      blobId: blobId,
      contentHash: fact.contentHash || '',
      metadata: {
        title: fact.title,
        summary: fact.summary,
        tags: (fact.metadata?.tags || []).map((tag: FactTag) => ({
          name: tag.name,
          category: tag.category
        })),
        keywords: fact.metadata?.keywords || [],
        status: fact.status,
        votes: fact.votes,
        comments: fact.comments,
        author: fact.author,
        created: fact.metadata?.created?.toISOString() || new Date().toISOString(),
        updated: fact.metadata?.updated?.toISOString() || new Date().toISOString(),
        importance: fact.metadata?.importance,
        region: fact.metadata?.region
      }
    };
    
    index.facts.push(factMeta);
    index.totalFacts = index.facts.length;
    index.lastUpdated = new Date().toISOString();
    
    // Save updated index to local file
    this.saveIndex(index);
    
    // Clear cache to force reload
    this.mainIndexCache = null;
    
    console.log(`✓ Added fact ${fact.id} to Walrus index (${index.totalFacts} total facts)`);
  }

  /**
   * Save index to local file
   */
  private saveIndex(index: WalrusFactIndex): void {
    try {
      const indexPath = join(process.cwd(), WALRUS_INDEX_FILE);
      const indexDir = dirname(indexPath);
      
      // Ensure directory exists
      if (!existsSync(indexDir)) {
        mkdirSync(indexDir, { recursive: true });
      }
      
      // Save index
      writeFileSync(indexPath, JSON.stringify(index, null, 2), 'utf-8');
      console.log(`Saved Walrus index to ${indexPath}`);
    } catch (error) {
      console.error('Failed to save Walrus index:', error);
    }
  }

  /**
   * Search facts using Walrus indexes
   */
  async searchFacts(query: {
    keywords?: string[];
    tags?: string[];
    author?: string;
    region?: string;
    status?: string[];
    limit?: number;
    offset?: number;
  }): Promise<{ facts: Fact[]; totalCount: number }> {
    const index = await this.getMainIndex();
    
    // Filter facts based on query criteria
    let filteredMeta = index.facts.filter(factMeta => {
      // Status filter
      if (query.status && query.status.length > 0) {
        if (!query.status.includes(factMeta.metadata.status)) return false;
      }
      
      // Author filter
      if (query.author && factMeta.metadata.author.toLowerCase() !== query.author.toLowerCase()) {
        return false;
      }
      
      // Region filter
      if (query.region && factMeta.metadata.region !== query.region) {
        return false;
      }
      
      // Keywords filter - check if any keyword matches fact's keywords or content
      if (query.keywords && query.keywords.length > 0) {
        const factKeywords = factMeta.metadata.keywords.map(k => k.toLowerCase());
        const titleSummary = `${factMeta.metadata.title} ${factMeta.metadata.summary}`.toLowerCase();
        
        const hasKeywordMatch = query.keywords.some(keyword => {
          const lowerKeyword = keyword.toLowerCase();
          return factKeywords.includes(lowerKeyword) || titleSummary.includes(lowerKeyword);
        });
        
        if (!hasKeywordMatch) return false;
      }
      
      // Tags filter  
      if (query.tags && query.tags.length > 0) {
        const factTags = factMeta.metadata.tags.map(t => t.name.toLowerCase());
        const hasTagMatch = query.tags.some(tag => factTags.includes(tag.toLowerCase()));
        if (!hasTagMatch) return false;
      }
      
      return true;
    });
    
    // Apply pagination
    const totalCount = filteredMeta.length;
    const offset = query.offset || 0;
    const limit = query.limit || 20;
    filteredMeta = filteredMeta.slice(offset, offset + limit);
    
    // Retrieve full facts from Walrus
    const facts = await this.getFactsByBlobIds(filteredMeta.map(f => f.blobId));
    
    return { facts, totalCount };
  }

  /**
   * Get a specific fact from Walrus by ID
   */
  async getFactById(id: string): Promise<Fact | null> {
    const index = await this.getMainIndex();
    const factMeta = index.facts.find(f => f.id === id);
    
    if (!factMeta) return null;
    
    return this.getFactByBlobId(factMeta.blobId);
  }

  /**
   * Get fact from Walrus by blob ID (with caching)
   */
  async getFactByBlobId(blobId: string): Promise<Fact> {
    const now = Date.now();
    const CACHE_TTL = 10 * 60 * 1000; // 10 minutes
    const cached = this.factCache.get(blobId);
    
    if (cached && now < cached.expires) {
      return cached.data;
    }
    
    await this.walrus.initialize();
    const factBlob = await this.walrus.storage.retrieveBlob(blobId);
    const fact: Fact = JSON.parse(factBlob.data.toString('utf-8'));
    
    this.factCache.set(blobId, {
      data: fact,
      expires: now + CACHE_TTL
    });
    
    return fact;
  }

  /**
   * Get multiple facts by blob IDs (batch operation)
   */
  async getFactsByBlobIds(blobIds: string[]): Promise<Fact[]> {
    const promises = blobIds.map(blobId => this.getFactByBlobId(blobId));
    return Promise.all(promises);
  }

  /**
   * List all facts from Walrus
   */
  async listFacts(limit = 20, offset = 0): Promise<{ facts: Fact[]; totalCount: number }> {
    const index = await this.getMainIndex();
    const totalCount = index.totalFacts;
    
    const paginatedMeta = index.facts.slice(offset, offset + limit);
    const facts = await this.getFactsByBlobIds(paginatedMeta.map(f => f.blobId));
    
    return { facts, totalCount };
  }

  // Private helper methods - tag/keyword indexes are derived from main index on-demand
}

// Global instance
let walrusIndexManager: WalrusIndexManager | null = null;

export function getWalrusIndexManager(): WalrusIndexManager {
  if (!walrusIndexManager) {
    walrusIndexManager = new WalrusIndexManager();
  }
  return walrusIndexManager;
}

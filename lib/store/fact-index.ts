import type { Fact, FactTag } from '@/types/fact';
import type { StoredFactRecord } from './fact-store';

/**
 * Efficient in-memory indexing for facts
 * Provides O(1) lookups by keyword, tag, author, etc.
 */

interface IndexEntry {
  factIds: Set<string>;
  lastUpdated: Date;
}

export class FactIndex {
  // Core indexes
  private tagIndex = new Map<string, IndexEntry>();        // tag name -> fact IDs
  private keywordIndex = new Map<string, IndexEntry>();    // keyword -> fact IDs  
  private categoryIndex = new Map<string, IndexEntry>();   // category -> fact IDs
  private authorIndex = new Map<string, IndexEntry>();     // author -> fact IDs
  private regionIndex = new Map<string, IndexEntry>();     // region -> fact IDs
  private statusIndex = new Map<string, IndexEntry>();     // status -> fact IDs
  
  // Metadata
  private lastIndexUpdate = new Date();
  private totalIndexedFacts = 0;

  /**
   * Add a fact to all relevant indexes
   */
  indexFact(record: StoredFactRecord): void {
    const fact = record.fact;
    const now = new Date();

    // Index by tags
    if (fact.metadata?.tags) {
      fact.metadata.tags.forEach((tag: FactTag) => {
        this.addToIndex(this.tagIndex, tag.name.toLowerCase(), fact.id, now);
        this.addToIndex(this.categoryIndex, tag.category, fact.id, now);
      });
    }

    // Index by keywords
    if (fact.metadata?.keywords) {
      fact.metadata.keywords.forEach(keyword => {
        this.addToIndex(this.keywordIndex, keyword.toLowerCase(), fact.id, now);
      });
    }

    // Index by author
    this.addToIndex(this.authorIndex, fact.author.toLowerCase(), fact.id, now);

    // Index by status
    this.addToIndex(this.statusIndex, fact.status, fact.id, now);

    // Index by region
    if (fact.metadata?.region) {
      this.addToIndex(this.regionIndex, fact.metadata.region.toLowerCase(), fact.id, now);
    }

    // Index title and summary words as keywords
    this.indexTextContent(fact.title, fact.id, now);
    this.indexTextContent(fact.summary, fact.id, now);

    this.totalIndexedFacts++;
    this.lastIndexUpdate = now;
  }

  /**
   * Remove a fact from all indexes
   */
  removeFact(factId: string): void {
    const now = new Date();

    // Remove from all indexes
    [this.tagIndex, this.keywordIndex, this.categoryIndex, 
     this.authorIndex, this.regionIndex, this.statusIndex].forEach(index => {
      for (const [key, entry] of index.entries()) {
        entry.factIds.delete(factId);
        entry.lastUpdated = now;
        
        // Clean up empty entries
        if (entry.factIds.size === 0) {
          index.delete(key);
        }
      }
    });

    this.totalIndexedFacts = Math.max(0, this.totalIndexedFacts - 1);
    this.lastIndexUpdate = now;
  }

  /**
   * Update indexes for a modified fact
   */
  updateFact(factId: string, record: StoredFactRecord): void {
    this.removeFact(factId);
    this.indexFact(record);
  }

  /**
   * Fast lookup: Get fact IDs by tag
   */
  getFactsByTag(tag: string): string[] {
    const entry = this.tagIndex.get(tag.toLowerCase());
    return entry ? Array.from(entry.factIds) : [];
  }

  /**
   * Fast lookup: Get fact IDs by keyword
   */
  getFactsByKeyword(keyword: string): string[] {
    const entry = this.keywordIndex.get(keyword.toLowerCase());
    return entry ? Array.from(entry.factIds) : [];
  }

  /**
   * Fast lookup: Get fact IDs by category
   */
  getFactsByCategory(category: string): string[] {
    const entry = this.categoryIndex.get(category);
    return entry ? Array.from(entry.factIds) : [];
  }

  /**
   * Fast lookup: Get fact IDs by author
   */
  getFactsByAuthor(author: string): string[] {
    const entry = this.authorIndex.get(author.toLowerCase());
    return entry ? Array.from(entry.factIds) : [];
  }

  /**
   * Fast lookup: Get fact IDs by region
   */
  getFactsByRegion(region: string): string[] {
    const entry = this.regionIndex.get(region.toLowerCase());
    return entry ? Array.from(entry.factIds) : [];
  }

  /**
   * Fast lookup: Get fact IDs by status
   */
  getFactsByStatus(status: string): string[] {
    const entry = this.statusIndex.get(status);
    return entry ? Array.from(entry.factIds) : [];
  }

  /**
   * Complex search: Get fact IDs matching multiple criteria
   */
  searchFacts(criteria: {
    tags?: string[];
    keywords?: string[];
    categories?: string[];
    author?: string;
    region?: string;
    status?: string[];
  }): string[] {
    const criteriaResults: Set<string>[] = [];

    // Handle tags (OR within tags, AND with other criteria)
    if (criteria.tags && criteria.tags.length > 0) {
      const tagUnion = new Set<string>();
      criteria.tags.forEach(tag => {
        this.getFactsByTag(tag).forEach(id => tagUnion.add(id));
      });
      if (tagUnion.size > 0) {
        criteriaResults.push(tagUnion);
      }
    }

    // Handle keywords (OR within keywords, AND with other criteria)
    if (criteria.keywords && criteria.keywords.length > 0) {
      const keywordUnion = new Set<string>();
      criteria.keywords.forEach(keyword => {
        this.getFactsByKeyword(keyword).forEach(id => keywordUnion.add(id));
      });
      if (keywordUnion.size > 0) {
        criteriaResults.push(keywordUnion);
      }
    }

    // Handle categories (OR within categories, AND with other criteria)
    if (criteria.categories && criteria.categories.length > 0) {
      const categoryUnion = new Set<string>();
      criteria.categories.forEach(cat => {
        this.getFactsByCategory(cat).forEach(id => categoryUnion.add(id));
      });
      if (categoryUnion.size > 0) {
        criteriaResults.push(categoryUnion);
      }
    }

    // Handle author (exact match)
    if (criteria.author) {
      const authorResults = new Set(this.getFactsByAuthor(criteria.author));
      if (authorResults.size > 0) {
        criteriaResults.push(authorResults);
      }
    }

    // Handle region (exact match)
    if (criteria.region) {
      const regionResults = new Set(this.getFactsByRegion(criteria.region));
      if (regionResults.size > 0) {
        criteriaResults.push(regionResults);
      }
    }

    // Handle status (OR within statuses, AND with other criteria)
    if (criteria.status && criteria.status.length > 0) {
      const statusUnion = new Set<string>();
      criteria.status.forEach(status => {
        this.getFactsByStatus(status).forEach(id => statusUnion.add(id));
      });
      if (statusUnion.size > 0) {
        criteriaResults.push(statusUnion);
      }
    }

    if (criteriaResults.length === 0) {
      return [];
    }

    // Find intersection between different criteria types (AND operation)
    let result = criteriaResults[0];
    for (let i = 1; i < criteriaResults.length; i++) {
      result = new Set([...result].filter(id => criteriaResults[i].has(id)));
    }

    return Array.from(result);
  }

  /**
   * Get all available tags with their fact counts
   */
  getTagStats(): Array<{ name: string; count: number }> {
    return Array.from(this.tagIndex.entries())
      .map(([name, entry]) => ({ name, count: entry.factIds.size }))
      .sort((a, b) => b.count - a.count);
  }

  /**
   * Get all available categories with their fact counts
   */
  getCategoryStats(): Array<{ name: string; count: number }> {
    return Array.from(this.categoryIndex.entries())
      .map(([name, entry]) => ({ name, count: entry.factIds.size }))
      .sort((a, b) => b.count - a.count);
  }

  /**
   * Get index statistics
   */
  getIndexStats() {
    return {
      totalFacts: this.totalIndexedFacts,
      lastUpdated: this.lastIndexUpdate,
      indexes: {
        tags: this.tagIndex.size,
        keywords: this.keywordIndex.size,
        categories: this.categoryIndex.size,
        authors: this.authorIndex.size,
        regions: this.regionIndex.size,
        statuses: this.statusIndex.size,
      }
    };
  }

  /**
   * Get sample keywords for debugging
   */
  getSampleKeywords(limit = 20): string[] {
    return Array.from(this.keywordIndex.keys()).slice(0, limit);
  }

  /**
   * Get sample tags for debugging
   */
  getSampleTags(limit = 20): string[] {
    return Array.from(this.tagIndex.keys()).slice(0, limit);
  }

  /**
   * Clear all indexes
   */
  clear(): void {
    this.tagIndex.clear();
    this.keywordIndex.clear();
    this.categoryIndex.clear();
    this.authorIndex.clear();
    this.regionIndex.clear();
    this.statusIndex.clear();
    this.totalIndexedFacts = 0;
    this.lastIndexUpdate = new Date();
  }

  // Private helper methods

  private addToIndex(index: Map<string, IndexEntry>, key: string, factId: string, timestamp: Date): void {
    if (!index.has(key)) {
      index.set(key, {
        factIds: new Set(),
        lastUpdated: timestamp,
      });
    }
    
    const entry = index.get(key)!;
    entry.factIds.add(factId);
    entry.lastUpdated = timestamp;
  }

  private indexTextContent(text: string, factId: string, timestamp: Date): void {
    if (!text) return;

    // Extract meaningful words from text
    const words = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, ' ')
      .split(/\s+/)
      .filter(word => word.length >= 3 && !this.isStopWord(word));

    words.forEach(word => {
      this.addToIndex(this.keywordIndex, word, factId, timestamp);
    });
  }

  private isStopWord(word: string): boolean {
    const stopWords = new Set([
      'the', 'and', 'for', 'with', 'that', 'from', 'this', 'have', 'been', 
      'were', 'will', 'their', 'about', 'which', 'into', 'over', 'after',
      'before', 'being', 'under', 'between', 'within', 'without', 'they',
      'them', 'those', 'these', 'there', 'here', 'such', 'than', 'then',
      'when', 'while', 'where', 'what', 'your', 'yours', 'ours', 'hers',
      'him', 'her', 'how', 'why', 'who', 'whom', 'whose', 'can', 'could',
      'should', 'would', 'shall', 'might', 'must', 'may', 'also', 'very'
    ]);
    return stopWords.has(word);
  }
}

// Global index instance
let globalFactIndex: FactIndex | null = null;

/**
 * Get the global fact index instance
 */
export function getFactIndex(): FactIndex {
  if (!globalFactIndex) {
    globalFactIndex = new FactIndex();
  }
  return globalFactIndex;
}

/**
 * Rebuild index from current fact records
 */
export function rebuildFactIndex(records: StoredFactRecord[]): void {
  const index = getFactIndex();
  index.clear();
  
  records.forEach(record => {
    index.indexFact(record);
  });
}

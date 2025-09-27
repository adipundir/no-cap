import type { FactTag } from '@/lib/walrus-index';
import type { FullFact } from '@/types/fact';

/**
 * Normalizes various tag formats to consistent FactTag objects
 */
export function normalizeTags(tags: any[]): FactTag[] {
  if (!Array.isArray(tags)) return [];
  
  return tags.map((tag) => {
    if (typeof tag === 'string') {
      return {
        name: tag,
        category: categorizeTag(tag) as FactTag['category']
      };
    }
    
    if (tag && typeof tag === 'object' && tag.name) {
      return {
        name: tag.name,
        category: tag.category || categorizeTag(tag.name) as FactTag['category']
      };
    }
    
    // Fallback for unknown formats
    return {
      name: String(tag),
      category: 'type' as FactTag['category']
    };
  });
}

/**
 * Automatically categorizes tags based on content
 */
function categorizeTag(tagName: string): string {
  const tag = tagName.toLowerCase();
  
  // Topic categories
  if (['space', 'biology', 'physics', 'climate', 'ai', 'technology', 'medicine', 'neuroscience', 'chemistry', 'materials', 'astronomy', 'science'].includes(tag)) {
    return 'topic';
  }
  
  // Regional categories
  if (['global', 'europe', 'asia', 'america', 'africa', 'oceania', 'arctic', 'antarctic'].includes(tag)) {
    return 'region';
  }
  
  // Urgency categories  
  if (['urgent', 'critical', 'low', 'high', 'immediate', 'priority'].includes(tag)) {
    return 'urgency';
  }
  
  // Methodology categories
  if (['verified', 'peer-reviewed', 'experimental', 'observational', 'theoretical', 'clinical', 'survey'].includes(tag)) {
    return 'methodology';
  }
  
  // Default to type
  return 'type';
}

/**
 * Normalizes a full fact object to ensure consistent data structure
 */
export function normalizeFullFact(fact: FullFact): FullFact {
  return {
    ...fact,
    metadata: {
      ...fact.metadata,
      tags: fact.metadata.tags ? normalizeTags(fact.metadata.tags) : []
    }
  };
}

/**
 * Extracts keywords from fact content for indexing
 */
export function extractFactKeywords(fact: FullFact): string[] {
  const keywords = new Set<string>();
  
  // Extract from title, summary, and content
  const text = `${fact.title} ${fact.summary} ${fact.fullContent || ''}`.toLowerCase();
  
  // Use regex to extract meaningful words (3+ characters)
  const words = text.match(/\b[a-zA-Z]{3,}\b/g) || [];
  
  // Filter out stop words
  const stopWords = new Set([
    'the', 'and', 'but', 'not', 'are', 'was', 'were', 'been', 'have', 'has', 'had',
    'this', 'that', 'these', 'those', 'for', 'with', 'from', 'they', 'them', 'their',
    'will', 'can', 'may', 'might', 'could', 'would', 'should', 'must', 'shall',
    'its', 'our', 'your', 'his', 'her', 'who', 'what', 'when', 'where', 'why', 'how'
  ]);
  
  words.forEach(word => {
    if (!stopWords.has(word) && word.length >= 3) {
      keywords.add(word);
    }
  });
  
  return Array.from(keywords);
}

/**
 * Validates fact data structure
 */
export function validateFact(fact: any): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  if (!fact.id) errors.push('Missing required field: id');
  if (!fact.title) errors.push('Missing required field: title');
  if (!fact.summary) errors.push('Missing required field: summary');
  if (!fact.metadata) errors.push('Missing required field: metadata');
  
  if (fact.metadata) {
    if (!fact.metadata.created) errors.push('Missing required field: metadata.created');
    if (!fact.metadata.lastModified) errors.push('Missing required field: metadata.lastModified');
    if (typeof fact.metadata.version !== 'number') errors.push('Invalid field: metadata.version must be a number');
  }
  
  if (fact.sources && !Array.isArray(fact.sources)) {
    errors.push('Invalid field: sources must be an array');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Creates a checksum for fact content integrity
 */
export function generateFactChecksum(fact: FullFact): string {
  // Create deterministic string representation for hashing
  const checksumData = {
    id: fact.id,
    title: fact.title,
    summary: fact.summary,
    fullContent: fact.fullContent,
    sources: fact.sources?.sort(), // Sort for deterministic order
    created: fact.metadata.created.toISOString()
  };
  
  const dataString = JSON.stringify(checksumData, Object.keys(checksumData).sort());
  
  // Simple hash function (in production, use crypto.subtle.digest)
  let hash = 0;
  for (let i = 0; i < dataString.length; i++) {
    const char = dataString.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  
  return Math.abs(hash).toString(16);
}

import { NextRequest, NextResponse } from 'next/server';
import { 
  FactSearchQuery, 
  FactSearchResponse, 
  Fact,
  TagCategory,
  FactTag
} from '@/types/fact';
import { listFactRecords, getFactRecord } from '@/lib/store/fact-store';
import { getFactIndex } from '@/lib/store/fact-index';
import { ensureSeedFacts } from '@/lib/seed/facts';

/**
 * GET /api/search
 * Advanced search API for facts with tag filtering, full-text search, and faceted results
 */
export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url);
    
    // Parse search parameters
    const query: FactSearchQuery = {
      tags: searchParams.getAll('tags'),
      categories: searchParams.getAll('categories') as TagCategory[],
      keywords: searchParams.get('keywords') || undefined,
      status: searchParams.getAll('status') as any[],
      author: searchParams.get('author') || undefined,
      region: searchParams.get('region') || undefined,
      minImportance: searchParams.get('minImportance') ? parseInt(searchParams.get('minImportance')!) : undefined,
      dateRange: parseDateRange(searchParams.get('dateFrom'), searchParams.get('dateTo')),
      limit: parseInt(searchParams.get('limit') || '20'),
      offset: parseInt(searchParams.get('offset') || '0'),
      sortBy: (searchParams.get('sortBy') as any) || 'relevance',
      sortOrder: (searchParams.get('sortOrder') as any) || 'desc'
    };

    await ensureSeedFacts();
    const factIndex = getFactIndex();
    
    // Use indexed search for efficient lookups
    const searchCriteria = {
      tags: query.tags,
      categories: query.categories,
      keywords: query.keywords?.toLowerCase().split(' ').filter(k => k.length > 0),
      author: query.author,
      region: query.region,
      status: query.status,
    };

    // Get fact IDs using efficient indexed search
    const indexedFactIds = factIndex.searchFacts(searchCriteria);
    
    // Get full fact records and apply remaining filters
    let filteredFacts = indexedFactIds
      .map(id => getFactRecord(id)?.fact)
      .filter((fact): fact is Fact => fact !== undefined)
      .filter(fact => {
        // Importance filter
        if (query.minImportance && (fact.metadata?.importance || 0) < query.minImportance) {
          return false;
        }

        // Date range filter  
        if (query.dateRange) {
          const factDate = new Date(fact.updated);
          if (factDate < query.dateRange.from || factDate > query.dateRange.to) {
            return false;
          }
        }

        return true;
      });

    // Calculate relevance scores for sorting
    if (query.sortBy === 'relevance' && query.keywords) {
      filteredFacts = filteredFacts.map(fact => ({
        ...fact,
        _relevanceScore: calculateRelevanceScore(fact, query.keywords!)
      }));
    }

    // Sort results
    filteredFacts.sort((a, b) => {
      let comparison = 0;
      
      switch (query.sortBy) {
        case 'relevance':
          comparison = ((b as any)._relevanceScore || 0) - ((a as any)._relevanceScore || 0);
          break;
        case 'date':
          comparison = new Date(b.updated).getTime() - new Date(a.updated).getTime();
          break;
        case 'votes':
          comparison = b.votes - a.votes;
          break;
        case 'importance':
          comparison = (b.metadata?.importance || 0) - (a.metadata?.importance || 0);
          break;
        default:
          comparison = new Date(b.updated).getTime() - new Date(a.updated).getTime();
      }
      
      return query.sortOrder === 'asc' ? -comparison : comparison;
    });

    // Generate facets for UI filtering using index
    const facets = generateFacetsFromIndex(factIndex, filteredFacts);

    // Paginate results
    const totalCount = filteredFacts.length;
    const paginatedFacts = filteredFacts.slice(query.offset!, query.offset! + query.limit!);

    // Clean up temporary fields
    const cleanFacts = paginatedFacts.map(fact => {
      const { _relevanceScore, ...cleanFact } = fact as any;
      return cleanFact;
    });

    const response: FactSearchResponse = {
      facts: cleanFacts,
      totalCount,
      facets,
      page: {
        limit: query.limit!,
        offset: query.offset!,
        hasMore: query.offset! + query.limit! < totalCount
      }
    };

    return NextResponse.json(response);

  } catch (error) {
    console.error('Search API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

/**
 * POST /api/search
 * Advanced search with complex query objects
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const query: FactSearchQuery = await request.json();
    
    // Validate query
    if (query.limit && (query.limit < 1 || query.limit > 100)) {
      return NextResponse.json({ 
        error: 'Limit must be between 1 and 100' 
      }, { status: 400 });
    }

    // Convert to URL parameters and reuse GET logic
    const searchParams = new URLSearchParams();
    
    if (query.tags) query.tags.forEach(tag => searchParams.append('tags', tag));
    if (query.categories) query.categories.forEach(cat => searchParams.append('categories', cat));
    if (query.keywords) searchParams.set('keywords', query.keywords);
    if (query.status) query.status.forEach(status => searchParams.append('status', status));
    if (query.author) searchParams.set('author', query.author);
    if (query.region) searchParams.set('region', query.region);
    if (query.minImportance) searchParams.set('minImportance', query.minImportance.toString());
    if (query.dateRange) {
      searchParams.set('dateFrom', query.dateRange.from.toISOString());
      searchParams.set('dateTo', query.dateRange.to.toISOString());
    }
    if (query.limit) searchParams.set('limit', query.limit.toString());
    if (query.offset) searchParams.set('offset', query.offset.toString());
    if (query.sortBy) searchParams.set('sortBy', query.sortBy);
    if (query.sortOrder) searchParams.set('sortOrder', query.sortOrder);

    // Create new request with search params
    const url = new URL(request.url);
    url.search = searchParams.toString();
    
    const mockRequest = new NextRequest(url);
    return await GET(mockRequest);

  } catch (error) {
    console.error('Search POST API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Helper functions
function parseDateRange(dateFrom?: string | null, dateTo?: string | null) {
  if (!dateFrom || !dateTo) return undefined;
  
  try {
    return {
      from: new Date(dateFrom),
      to: new Date(dateTo)
    };
  } catch {
    return undefined;
  }
}

function calculateRelevanceScore(fact: Fact, keywords: string): number {
  let score = 0;
  const searchTerms = keywords.toLowerCase().split(' ');
  const title = fact.title.toLowerCase();
  const summary = fact.summary.toLowerCase();
  
  searchTerms.forEach(term => {
    // Title matches are worth more
    if (title.includes(term)) score += 3;
    if (summary.includes(term)) score += 1;
    
    // Tag matches are valuable
    fact.metadata?.tags?.forEach((tag: FactTag) => {
      if (tag.name.toLowerCase().includes(term)) score += 2;
    });
  });
  
  // Boost verified facts
  if (fact.status === 'verified') score *= 1.2;
  
  // Boost by importance
  score *= (fact.metadata?.importance || 1) / 5;
  
  return score;
}

function generateFacetsFromIndex(factIndex: ReturnType<typeof getFactIndex>, filteredFacts: Fact[]) {
  // Get facet data efficiently from the index
  const allTagStats = factIndex.getTagStats();
  const allCategoryStats = factIndex.getCategoryStats();
  
  // Count authors and regions from filtered facts
  const authorCounts = new Map<string, number>();
  const regionCounts = new Map<string, number>();

  filteredFacts.forEach(fact => {
    authorCounts.set(fact.author, (authorCounts.get(fact.author) || 0) + 1);
    if (fact.metadata?.region) {
      regionCounts.set(fact.metadata.region, (regionCounts.get(fact.metadata.region) || 0) + 1);
    }
  });

  return {
    tags: allTagStats.slice(0, 20), // Top 20 tags by popularity
    categories: allCategoryStats,    // All categories
    authors: Array.from(authorCounts.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10),
    regions: Array.from(regionCounts.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10)
  };
}

function generateFacets(allFacts: Fact[], filteredFacts: Fact[]) {
  // Legacy function - kept for compatibility
  const tagCounts = new Map<string, number>();
  const categoryCounts = new Map<string, number>();
  const authorCounts = new Map<string, number>();
  const regionCounts = new Map<string, number>();

  filteredFacts.forEach(fact => {
    // Count tags
    fact.metadata?.tags?.forEach((tag: FactTag) => {
      tagCounts.set(tag.name, (tagCounts.get(tag.name) || 0) + 1);
      categoryCounts.set(tag.category, (categoryCounts.get(tag.category) || 0) + 1);
    });

    // Count authors
    authorCounts.set(fact.author, (authorCounts.get(fact.author) || 0) + 1);

    // Count regions
    if (fact.metadata?.region) {
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
      .slice(0, 10)
  };
}

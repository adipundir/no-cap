import { NextRequest, NextResponse } from 'next/server';
import { 
  FactSearchQuery, 
  FactSearchResponse, 
  Fact,
  TagCategory,
  FactTag
} from '@/types/fact';
import { listFactRecords } from '@/lib/store/fact-store';
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
      dateRange: parseDate

Range(searchParams.get('dateFrom'), searchParams.get('dateTo')),
      limit: parseInt(searchParams.get('limit') || '20'),
      offset: parseInt(searchParams.get('offset') || '0'),
      sortBy: (searchParams.get('sortBy') as any) || 'relevance',
      sortOrder: (searchParams.get('sortOrder') as any) || 'desc'
    };

    await ensureSeedFacts();
    const records = listFactRecords();
    
    // Filter facts based on search criteria
    let filteredFacts = records.map(r => r.fact).filter(fact => {
      // Status filter
      if (query.status && query.status.length > 0 && !query.status.includes(fact.status)) {
        return false;
      }

      // Author filter
      if (query.author && fact.author.toLowerCase() !== query.author.toLowerCase()) {
        return false;
      }

      // Region filter
      if (query.region && fact.metadata?.region !== query.region) {
        return false;
      }

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

      // Tags filter
      if (query.tags && query.tags.length > 0) {
        const factTags = fact.metadata?.tags?.map((t: FactTag) => t.name) || [];
        if (!query.tags.some(tag => factTags.includes(tag))) {
          return false;
        }
      }

      // Category filter
      if (query.categories && query.categories.length > 0) {
        const factCategories = fact.metadata?.tags?.map((t: FactTag) => t.category) || [];
        if (!query.categories.some(cat => factCategories.includes(cat))) {
          return false;
        }
      }

      // Keywords filter (simple text search)
      if (query.keywords) {
        const searchText = `${fact.title} ${fact.summary}`.toLowerCase();
        const keywords = query.keywords.toLowerCase().split(' ');
        if (!keywords.some(keyword => searchText.includes(keyword))) {
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

    // Generate facets for UI filtering
    const facets = generateFacets(records.map(r => r.fact), filteredFacts);

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

function generateFacets(allFacts: Fact[], filteredFacts: Fact[]) {
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

import { NextRequest, NextResponse } from 'next/server';
import { initializeWalrusFromEnv } from '@/lib/walrus-integration';
import { getWalrusIndexManager } from '@/lib/walrus-index';
import type { FactSearchQuery } from '@/lib/walrus-index';

/**
 * GET /api/search
 * Search facts using indexed Walrus data
 * 
 * Query parameters:
 * - keywords: comma-separated keywords
 * - tags: comma-separated tags
 * - authors: comma-separated authors  
 * - status: comma-separated status values (verified, review, flagged)
 * - limit: number of results per page
 * - offset: number of results to skip
 * - from_date: ISO date string for date range start
 * - to_date: ISO date string for date range end
 */
export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url);
    
    // Parse search parameters
    const keywords = searchParams.get('keywords')?.split(',').map(k => k.trim()).filter(Boolean);
    const tags = searchParams.get('tags')?.split(',').map(t => t.trim()).filter(Boolean);
    const authors = searchParams.get('authors')?.split(',').map(a => a.trim()).filter(Boolean);
    const status = searchParams.get('status')?.split(',').map(s => s.trim()).filter(Boolean) as ('verified' | 'review' | 'flagged')[];
    const limit = parseInt(searchParams.get('limit') || '10');
    const offset = parseInt(searchParams.get('offset') || '0');
    const fromDateStr = searchParams.get('from_date');
    const toDateStr = searchParams.get('to_date');

    // Build search query
    const searchQuery: FactSearchQuery = {
      limit,
      offset
    };

    if (keywords && keywords.length > 0) {
      searchQuery.keywords = keywords;
    }

    if (tags && tags.length > 0) {
      searchQuery.tags = tags;
    }

    if (authors && authors.length > 0) {
      searchQuery.authors = authors;
    }

    if (status && status.length > 0) {
      searchQuery.status = status;
    }

    if (fromDateStr || toDateStr) {
      searchQuery.dateRange = {};
      if (fromDateStr) {
        searchQuery.dateRange.from = new Date(fromDateStr);
      }
      if (toDateStr) {
        searchQuery.dateRange.to = new Date(toDateStr);
      }
    }

    // Initialize Walrus and get index manager
    const walrus = initializeWalrusFromEnv();
    await walrus.initialize();
    
    const indexManager = getWalrusIndexManager(walrus.storage);
    await indexManager.initialize();

    // Perform search
    const results = await indexManager.searchFacts(searchQuery);

    // Return results
    return NextResponse.json({
      facts: results.facts,
      totalCount: results.totalCount,
      searchTime: results.searchTime,
      query: searchQuery
    });

  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json(
      { 
        error: 'Search failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/search  
 * Advanced search with complex queries
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const searchQuery: FactSearchQuery = await request.json();

    // Initialize Walrus and get index manager
    const walrus = initializeWalrusFromEnv();
    await walrus.initialize();
    
    const indexManager = getWalrusIndexManager(walrus.storage);
    await indexManager.initialize();

    // Perform search
    const results = await indexManager.searchFacts(searchQuery);

    // Return results with additional metadata
    return NextResponse.json({
      facts: results.facts,
      totalCount: results.totalCount,
      searchTime: results.searchTime,
      query: searchQuery,
      indexStats: indexManager.getIndexStats()
    });

  } catch (error) {
    console.error('Advanced search error:', error);
    return NextResponse.json(
      { 
        error: 'Advanced search failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

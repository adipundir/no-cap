import { NextRequest, NextResponse } from 'next/server';
import { initializeWalrusFromEnv } from '@/lib/walrus-integration';
import { normalizeFullFact } from '@/lib/utils/fact-normalizer';
import { getWalrusIndexManager } from '@/lib/walrus-index';
import type { Fact, FullFact } from '@/types/fact';
import { ensureSeedFacts } from '@/lib/seed/facts';

/**
 * GET /api/facts
 * Returns list of facts directly from Walrus
 */
export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    await ensureSeedFacts();
    
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = parseInt(searchParams.get('offset') || '0');
    
    const walrusIndex = getWalrusIndexManager();
    const { facts, totalCount } = await walrusIndex.listFacts(limit, offset);
    
    return NextResponse.json({ 
      facts, 
      totalCount,
      page: {
        limit,
        offset,
        hasMore: offset + limit < totalCount
      }
    });
  } catch (error) {
    console.error('Failed to list facts from Walrus:', error);
    return NextResponse.json({ error: 'Failed to retrieve facts' }, { status: 500 });
  }
}

/**
 * POST /api/facts
 * Persists fact content to Walrus and stores metadata
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = (await request.json()) as FullFact;
    if (!body || !body.id) {
      return NextResponse.json({ error: 'id is required' }, { status: 400 });
    }

    // Normalize the fact to ensure proper tags, keywords, and metadata
    const normalizedFact = normalizeFullFact(body);

    const walrus = initializeWalrusFromEnv();
    await walrus.initialize();

    // Store the full fact to Walrus as JSON
    const factData = JSON.stringify({
      id: normalizedFact.id,
      title: normalizedFact.title,
      summary: normalizedFact.summary,
      status: normalizedFact.status,
      votes: normalizedFact.votes,
      comments: normalizedFact.comments,
      author: normalizedFact.author,
      updated: normalizedFact.updated,
      fullContent: normalizedFact.fullContent,
      sources: normalizedFact.sources,
      metadata: normalizedFact.metadata,
    });

    const storeResult = await walrus.storage.storeBlob(factData, {
      mimeType: 'application/json'
    });

    const fact: Fact = {
      id: normalizedFact.id,
      title: normalizedFact.title,
      summary: normalizedFact.summary,
      status: normalizedFact.status,
      votes: normalizedFact.votes,
      comments: normalizedFact.comments,
      author: normalizedFact.author,
      updated: normalizedFact.updated,
      walrusBlobId: storeResult.metadata.blobId,
      contentHash: normalizedFact.contentHash,
      metadata: normalizedFact.metadata,
    };

    // Update the Walrus index with this new fact
    const walrusIndex = getWalrusIndexManager();
    await walrusIndex.addFactToIndex(fact, storeResult.metadata.blobId);

    return NextResponse.json({ fact }, { status: 201 });
  } catch (error) {
    console.error('Failed to store fact via Walrus:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}


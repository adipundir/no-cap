import { NextRequest, NextResponse } from 'next/server';
import { initializeWalrusFromEnv } from '@/lib/walrus-integration';
import { getWalrusIndexManager } from '@/lib/walrus-index';
import type { Fact, FullFact } from '@/types/fact';

/**
 * GET /api/facts
 * Returns list of facts from Walrus with indexed metadata
 */
export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '10');
    const offset = parseInt(searchParams.get('offset') || '0');

    // Initialize Walrus and get index manager
    const walrus = initializeWalrusFromEnv();
    await walrus.initialize();
    
    const indexManager = getWalrusIndexManager(walrus.storage);
    await indexManager.initialize();

    // Get facts from Walrus index (not local cache)
    const { facts, totalCount } = await indexManager.listFacts(limit, offset);

    return NextResponse.json({ 
      facts: facts.map(fact => ({
        id: fact.id,
        title: fact.title,
        summary: fact.summary,
        status: fact.status,
        votes: Math.floor(Math.random() * 1000), // Mock votes for now
        comments: Math.floor(Math.random() * 200), // Mock comments for now
        author: fact.metadata.author,
        updated: fact.metadata.updated.toISOString(),
        walrusBlobId: fact.blobId,
        metadata: {
          created: fact.metadata.created,
          lastModified: fact.metadata.updated,
          version: fact.metadata.version,
          contentType: 'text/plain' as const,
          tags: fact.tags.map(tag => tag.name)
        }
      } as Fact)),
      totalCount 
    });

  } catch (error) {
    console.error('Failed to retrieve facts from Walrus:', error);
    return NextResponse.json({ facts: [], totalCount: 0 }, { status: 200 });
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

    const walrus = initializeWalrusFromEnv();
    await walrus.initialize();

    const storeResult = await walrus.storage.storeFact({
      id: body.id,
      title: body.title,
      summary: body.summary,
      fullContent: body.fullContent,
      sources: body.sources,
      metadata: {
        author: body.author,
        created: new Date(body.metadata.created),
        updated: new Date(body.metadata.lastModified),
        version: body.metadata.version,
      },
    });

    const fact: Fact = {
      id: body.id,
      title: body.title,
      summary: body.summary,
      status: body.status,
      votes: body.votes,
      comments: body.comments,
      author: body.author,
      updated: body.updated,
      walrusBlobId: storeResult.walrusMetadata.blobId,
      contentHash: body.contentHash,
      metadata: body.metadata,
    };

    // No local cache writes; index manager will take care of indexing

    return NextResponse.json({ fact }, { status: 201 });
  } catch (error) {
    console.error('Failed to store fact via Walrus:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}


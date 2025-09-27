import { NextRequest, NextResponse } from 'next/server';
import { initializeWalrusFromEnv } from '@/lib/walrus-integration';
import type { Fact, FullFact } from '@/types/fact';
import {
  upsertFactRecord,
  listFactRecords,
  getFactRecord
} from '@/lib/store/fact-store';
import { ensureSeedFacts } from '@/lib/seed/facts';

/**
 * GET /api/facts
 * Returns list of facts with Walrus metadata
 */
export async function GET(): Promise<NextResponse> {
  await ensureSeedFacts();
  const records = listFactRecords();
  return NextResponse.json({ facts: records.map((record) => record.fact) });
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

    upsertFactRecord({
      fact,
      walrusBlobId: storeResult.walrusMetadata.blobId,
      walrusMetadata: storeResult.walrusMetadata,
    });

    return NextResponse.json({ fact }, { status: 201 });
  } catch (error) {
    console.error('Failed to store fact via Walrus:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}


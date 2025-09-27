import { NextRequest, NextResponse } from 'next/server';
import { initializeWalrusFromEnv } from '@/lib/walrus-integration';
import { normalizeFullFact } from '@/lib/utils/fact-normalizer';
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

    // Normalize the fact to ensure proper tags, keywords, and metadata
    const normalizedFact = normalizeFullFact(body);

    const walrus = initializeWalrusFromEnv();
    await walrus.initialize();

    const { status, votes, comments, author, updated, walrusBlobId, contentHash, ...factContent } = normalizedFact;

    const storeResult = await walrus.storage.storeFact({
      ...factContent,
      metadata: factContent.metadata,
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
      walrusBlobId: storeResult.walrusMetadata.blobId,
      contentHash: normalizedFact.contentHash,
      metadata: normalizedFact.metadata,
    };

    upsertFactRecord({
      fact,
      walrusBlobId: storeResult.walrusMetadata.blobId,
      walrusMetadata: storeResult.walrusMetadata,
      availabilityCertificate: storeResult.availabilityCertificate,
    });

    return NextResponse.json({ fact }, { status: 201 });
  } catch (error) {
    console.error('Failed to store fact via Walrus:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

/**
 * GET /api/facts/:id
 * Retrieve fact metadata and Walrus blob reference
 */
export async function fetchFact(id: string): Promise<Fact | null> {
  const record = getFactRecord(id);
  if (!record) {
    return null;
  }
  return record.fact;
}

import { NextRequest, NextResponse } from 'next/server';
import { initializeWalrusFromEnv } from '@/lib/walrus-integration';
import { getFactRecord, upsertFactRecord } from '@/lib/store/fact-store';
import type { Fact } from '@/types/fact';

interface RouteParams {
  params: {
    id: string;
  };
}

export async function GET(_request: NextRequest, { params }: RouteParams): Promise<NextResponse> {
  const { id } = params;
  const record = getFactRecord(id);
  if (!record) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
  return NextResponse.json({ fact: record.fact, walrus: record.walrusMetadata });
}

export async function PUT(request: NextRequest, { params }: RouteParams): Promise<NextResponse> {
  const { id } = params;
  const record = getFactRecord(id);
  if (!record) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  try {
    const updates = await request.json();
    const walrus = initializeWalrusFromEnv();
    await walrus.initialize();

    const updatedBlob = await walrus.storage.updateFact(record.fact.id, updates);
    const updatedFact: Fact = {
      ...record.fact,
      ...updates,
      metadata: updatedBlob.content.metadata,
      walrusBlobId: updatedBlob.walrusMetadata.blobId,
    };

    upsertFactRecord({
      fact: updatedFact,
      walrusBlobId: updatedBlob.walrusMetadata.blobId,
      walrusMetadata: updatedBlob.walrusMetadata,
      availabilityCertificate: updatedBlob.availabilityCertificate,
    });

    return NextResponse.json({ fact: updatedFact, walrus: updatedBlob.walrusMetadata });
  } catch (error) {
    console.error('Failed to update fact via Walrus:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

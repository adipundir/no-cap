import { NextRequest, NextResponse } from 'next/server';
import { initializeWalrusFromEnv } from '@/lib/walrus-integration';
import type { ContextComment } from '@/types/fact';
import { upsertCommentRecord, listCommentsForFact } from '@/lib/store/comment-store';

export async function GET(request: NextRequest): Promise<NextResponse> {
  const factId = request.nextUrl.searchParams.get('factId');
  if (!factId) {
    return NextResponse.json({ error: 'factId query parameter is required' }, { status: 400 });
  }

  const comments = listCommentsForFact(factId);
  return NextResponse.json({
    comments: comments.map((record) => record.comment),
  });
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = (await request.json()) as ContextComment;
    if (!body || !body.id || !body.factId) {
      return NextResponse.json({ error: 'id and factId are required' }, { status: 400 });
    }

    const walrus = initializeWalrusFromEnv();
    await walrus.initialize();

    const storeResult = await walrus.storage.storeComment({
      id: body.id,
      factId: body.factId,
      text: body.text,
      author: body.author,
      created: new Date(body.created),
      votes: body.votes || 0,
      parentId: body.parentId,
      metadata: body.metadata,
    });

    upsertCommentRecord({
      comment: {
        ...body,
        created: new Date(body.created),
      },
      walrusBlobId: storeResult.walrusMetadata.blobId,
      walrusMetadata: storeResult.walrusMetadata,
      availabilityCertificate: storeResult.walrusMetadata.blobId,
    });

    return NextResponse.json({
      comment: body,
      walrus: storeResult.walrusMetadata,
    }, { status: 201 });
  } catch (error) {
    console.error('Failed to store comment via Walrus:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

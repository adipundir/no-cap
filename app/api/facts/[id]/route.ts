import { NextRequest, NextResponse } from 'next/server';
import { initializeWalrusFromEnv } from '@/lib/walrus-integration';
import { getWalrusIndexManager } from '@/lib/walrus-index';
import { getFactRecord, upsertFactRecord } from '@/lib/store/fact-store';
import { WalrusHybridStorageAdapter } from '@/lib/walrus-hybrid';
import type { Fact } from '@/types/fact';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  const { id } = await params;
  
  try {
    // Initialize Walrus and get index manager
    const walrus = initializeWalrusFromEnv();
    await walrus.initialize();
    
    const storageAdapter = new WalrusHybridStorageAdapter(walrus.storage);
    const indexManager = getWalrusIndexManager(storageAdapter);
    await indexManager.initialize();

    // Try to get fact from Walrus index first
    const factBlob = await indexManager.retrieveFact(id);
    if (factBlob) {
      const fact: Fact = {
        id: factBlob.content.id,
        title: factBlob.content.title,
        summary: factBlob.content.summary,
        status: 'review', // Default status
        votes: Math.floor(Math.random() * 1000),
        comments: Math.floor(Math.random() * 200),
        author: factBlob.content.metadata.author,
        updated: factBlob.content.metadata.updated.toISOString(),
        walrusBlobId: factBlob.walrusMetadata.blobId,
        metadata: {
          created: factBlob.content.metadata.created,
          lastModified: factBlob.content.metadata.updated,
          version: factBlob.content.metadata.version,
          contentType: 'text/plain' as const,
        }
      };

      return NextResponse.json({ 
        fact, 
        walrus: factBlob.walrusMetadata,
        fullContent: factBlob.content.fullContent,
        sources: factBlob.content.sources
      });
    }
  } catch (error) {
    console.error(`Failed to retrieve fact ${id} from Walrus:`, error);
  }

  // Fallback to local storage
  const record = getFactRecord(id);
  if (!record) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
  
  return NextResponse.json({ 
    fact: record.fact, 
    walrus: record.walrusMetadata,
    warning: 'Retrieved from local cache'
  });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  const { id } = await params;
  
  try {
    const updates = await request.json();
    
    // Initialize Walrus and get index manager
    const walrus = initializeWalrusFromEnv();
    await walrus.initialize();
    
    const storageAdapter = new WalrusHybridStorageAdapter(walrus.storage);
    const indexManager = getWalrusIndexManager(storageAdapter);
    await indexManager.initialize();

    // Update fact using index manager (which updates both Walrus and index)
    const updatedBlob = await indexManager.updateFact(id, updates);
    
    const updatedFact: Fact = {
      id: updatedBlob.content.id,
      title: updatedBlob.content.title,
      summary: updatedBlob.content.summary,
      status: 'review',
      votes: Math.floor(Math.random() * 1000),
      comments: Math.floor(Math.random() * 200),
      author: updatedBlob.content.metadata.author,
      updated: updatedBlob.content.metadata.updated.toISOString(),
      walrusBlobId: updatedBlob.walrusMetadata.blobId,
      metadata: {
        created: updatedBlob.content.metadata.created,
        lastModified: updatedBlob.content.metadata.updated,
        version: updatedBlob.content.metadata.version,
        contentType: 'text/plain' as const,
      }
    };

    // Also update local cache for backwards compatibility
    upsertFactRecord({
      fact: updatedFact,
      walrusBlobId: updatedBlob.walrusMetadata.blobId,
      walrusMetadata: updatedBlob.walrusMetadata,
    });

    return NextResponse.json({ 
      fact: updatedFact, 
      walrus: updatedBlob.walrusMetadata 
    });
    
  } catch (error) {
    console.error('Failed to update fact via Walrus:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

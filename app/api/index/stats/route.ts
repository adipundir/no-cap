import { NextRequest, NextResponse } from 'next/server';
import { initializeWalrusFromEnv } from '@/lib/walrus-integration';
import { getWalrusIndexManager } from '@/lib/walrus-index';
import { WalrusHybridStorageAdapter } from '@/lib/walrus-hybrid';

/**
 * GET /api/index/stats
 * Get index statistics
 */
export async function GET(_request: NextRequest): Promise<NextResponse> {
  try {
    // Initialize Walrus and index manager
    const walrus = initializeWalrusFromEnv();
    await walrus.initialize();
    
    const storageAdapter = new WalrusHybridStorageAdapter(walrus.storage);
    const indexManager = getWalrusIndexManager(storageAdapter);
    await indexManager.initialize();

    // Get index statistics
    const stats = indexManager.getIndexStats();

    return NextResponse.json({
      stats: {
        ...stats,
        lastUpdated: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Index stats error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to retrieve index statistics',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

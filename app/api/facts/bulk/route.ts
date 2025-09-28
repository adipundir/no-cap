import { NextRequest, NextResponse } from 'next/server';
import { initializeWalrusFromEnv } from '@/lib/walrus-integration';
import { getWalrusIndexManager } from '@/lib/walrus-index';
import { WalrusHybridStorageAdapter } from '@/lib/walrus-hybrid';

// Base bulk types (previously from SDK)
interface WalrusBulkQuery {
  limit?: number;
  offset?: number;
}

interface WalrusBulkResult {
  success: boolean;
  data?: any;
  error?: string;
}

// NOCAP-specific bulk types
interface NOCAPBulkQuery extends WalrusBulkQuery {
  factIds: string[];
  includeContent?: boolean;
  includeSources?: boolean;
}

interface NOCAPBulkResponse {
  facts: any[];
  errors: { factId: string; error: string }[];
  totalRequested: number;
  totalReturned: number;
}

/**
 * POST /api/facts/bulk
 * Bulk retrieve facts by IDs
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const query: NOCAPBulkQuery = await request.json();

    // Validate input
    if (!query.factIds || !Array.isArray(query.factIds) || query.factIds.length === 0) {
      return NextResponse.json(
        { error: 'factIds array is required and must not be empty' },
        { status: 400 }
      );
    }

    if (query.factIds.length > 100) {
      return NextResponse.json(
        { error: 'Maximum 100 fact IDs allowed per bulk request' },
        { status: 400 }
      );
    }

    // Initialize Walrus and index manager
    const walrus = initializeWalrusFromEnv();
    await walrus.initialize();
    
    const storageAdapter = new WalrusHybridStorageAdapter(walrus.storage);
    const indexManager = getWalrusIndexManager(storageAdapter);
    await indexManager.initialize();

    const facts: any[] = [];
    const errors: { factId: string; error: string }[] = [];

    // Process each fact ID
    await Promise.allSettled(
      query.factIds.map(async (factId) => {
        try {
          const indexed = indexManager.getFact(factId);
          if (!indexed) {
            errors.push({ factId, error: 'Fact not found' });
            return;
          }

          const factDetail = {
            ...indexed,
            fullContent: query.includeContent ? indexed.fullContent : undefined,
            sources: query.includeSources ? indexed.sources : undefined,
          };

          facts.push(factDetail);
        } catch (error) {
          errors.push({ 
            factId, 
            error: error instanceof Error ? error.message : 'Unknown error'
          });
        }
      })
    );

    const response: NOCAPBulkResponse = {
      facts,
      errors,
      totalRequested: query.factIds.length,
      totalReturned: facts.length
    };

    return NextResponse.json(response);

  } catch (error) {
    console.error('Bulk facts error:', error);
    return NextResponse.json(
      { 
        error: 'Bulk retrieval failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

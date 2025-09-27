import { NextRequest, NextResponse } from 'next/server';
import { initializeWalrusFromEnv } from '@/lib/walrus-integration';
import { getWalrusIndexManager } from '@/lib/walrus-index';
import type { Fact } from '@/types/fact';

interface RouteParams {
  params: {
    id: string;
  };
}

export async function GET(_request: NextRequest, { params }: RouteParams): Promise<NextResponse> {
  try {
    const { id } = await params;
    
    const walrusIndex = getWalrusIndexManager();
    const fact = await walrusIndex.getFactById(id);
    
    if (!fact) {
      return NextResponse.json({ error: 'Fact not found' }, { status: 404 });
    }
    
    return NextResponse.json({ 
      fact,
      source: 'walrus',
      walrusBlobId: fact.walrusBlobId 
    });
  } catch (error) {
    console.error(`Failed to retrieve fact ${await params.id} from Walrus:`, error);
    return NextResponse.json({ error: 'Failed to retrieve fact' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: RouteParams): Promise<NextResponse> {
  try {
    const { id } = await params;
    const updates = await request.json();
    
    const walrusIndex = getWalrusIndexManager();
    
    // Get the existing fact
    const existingFact = await walrusIndex.getFactById(id);
    if (!existingFact) {
      return NextResponse.json({ error: 'Fact not found' }, { status: 404 });
    }

    // Update the fact (this would need implementation in walrus-index.ts)
    // For now, return not implemented
    return NextResponse.json({ error: 'Update not implemented yet' }, { status: 501 });
    
  } catch (error) {
    console.error('Failed to update fact via Walrus:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

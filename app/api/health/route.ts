import { NextRequest, NextResponse } from 'next/server';
import { initializeWalrusFromEnv } from '@/lib/walrus-integration';
import { getWalrusIndexManager } from '@/lib/walrus-index';
import { WalrusHybridStorageAdapter } from '@/lib/walrus-hybrid';

/**
 * GET /api/health
 * Health check endpoint for the NOCAP API and Walrus integration
 */
export async function GET(_request: NextRequest): Promise<NextResponse> {
  const startTime = Date.now();
  let status: 'healthy' | 'degraded' | 'unhealthy' = 'healthy';
  let walrusAvailable = false;
  let indexAvailable = false;
  let factCount = 0;

  try {
    // Test Walrus integration
    const walrus = initializeWalrusFromEnv();
    const healthCheck = await walrus.healthCheck();
    
    walrusAvailable = healthCheck.status !== 'unhealthy';
    if (healthCheck.status === 'degraded') {
      status = 'degraded';
    }

    // Test index manager
    try {
      const storageAdapter = new WalrusHybridStorageAdapter(walrus.storage);
      const indexManager = getWalrusIndexManager(storageAdapter);
      await indexManager.initialize();
      
      const stats = indexManager.getIndexStats();
      indexAvailable = true;
      factCount = stats.totalFacts;
    } catch (indexError) {
      console.warn('Index manager unavailable:', indexError);
      indexAvailable = false;
      status = 'degraded';
    }

  } catch (walrusError) {
    console.warn('Walrus integration unavailable:', walrusError);
    walrusAvailable = false;
    status = 'unhealthy';
  }

  const responseTime = Date.now() - startTime;

  // If both Walrus and index are down, mark as unhealthy
  if (!walrusAvailable && !indexAvailable) {
    status = 'unhealthy';
  }

  const healthResponse = {
    status,
    version: '1.0.0',
    uptime: process.uptime() * 1000, // Convert to milliseconds
    walrusStatus: {
      available: walrusAvailable,
      latency: responseTime,
      nodes: walrusAvailable ? 1 : 0
    },
    indexStatus: {
      available: indexAvailable,
      lastSync: new Date().toISOString(),
      facts: factCount
    },
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    responseTime
  };

  // Return appropriate HTTP status based on health
  const httpStatus = status === 'unhealthy' ? 503 : 200;

  return NextResponse.json(healthResponse, { status: httpStatus });
}

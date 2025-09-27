import { NextRequest, NextResponse } from 'next/server';
import { 
  createAPIKey,
  getUserAPIKeys,
  revokeAPIKey,
  getAPIKeyUsage,
  initializeDemoAPIKeys
} from '@/lib/api-auth';

/**
 * GET /api/keys
 * Get all API keys for a user or list demo keys
 */
export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    // Initialize demo keys for development
    initializeDemoAPIKeys();
    
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    
    if (userId) {
      const keys = getUserAPIKeys(userId);
      // Don't return the actual key values, only metadata
      const safeKeys = keys.map(key => ({
        id: key.id,
        name: key.name,
        permissions: key.permissions,
        rateLimit: key.rateLimit,
        usage: key.usage,
        active: key.active,
        keyPreview: key.key.substring(0, 12) + '...' // Show only first 12 chars
      }));
      
      return NextResponse.json({ keys: safeKeys });
    } else {
      // Return demo information for developers
      return NextResponse.json({
        message: 'API Key Management',
        demo: {
          availableTiers: {
            free: { requestsPerHour: 1000, permissions: ['read'] },
            premium: { requestsPerHour: 10000, permissions: ['read', 'write', 'analytics'] },
            enterprise: { requestsPerHour: 100000, permissions: ['read', 'write', 'analytics'] }
          },
          sampleUsage: {
            curl: 'curl -H "Authorization: Bearer YOUR_API_KEY" https://your-domain.com/api/search?keywords=climate',
            javascript: 'const sdk = new NoCapSDK({ apiKey: "YOUR_API_KEY" }); const facts = await sdk.search({ keywords: "climate" });'
          }
        }
      });
    }
  } catch (error) {
    console.error('API keys GET error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

/**
 * POST /api/keys
 * Create a new API key
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json();
    const { 
      name, 
      userId, 
      permissions = ['read'], 
      tier = 'free' 
    }: {
      name: string;
      userId?: string;
      permissions?: ('read' | 'write' | 'analytics')[];
      tier?: 'free' | 'premium' | 'enterprise';
    } = body;

    if (!name || name.trim().length === 0) {
      return NextResponse.json({ 
        error: 'API key name is required' 
      }, { status: 400 });
    }

    // Validate permissions
    const validPermissions = ['read', 'write', 'analytics'];
    const invalidPermissions = permissions.filter(p => !validPermissions.includes(p));
    if (invalidPermissions.length > 0) {
      return NextResponse.json({ 
        error: `Invalid permissions: ${invalidPermissions.join(', ')}. Valid: ${validPermissions.join(', ')}` 
      }, { status: 400 });
    }

    // Create the API key
    const apiKey = createAPIKey({
      name: name.trim(),
      userId,
      permissions,
      tier
    });

    return NextResponse.json({
      message: 'API key created successfully',
      apiKey: {
        id: apiKey.id,
        name: apiKey.name,
        key: apiKey.key, // Full key is returned only once during creation
        permissions: apiKey.permissions,
        rateLimit: apiKey.rateLimit,
        tier,
        usage: apiKey.usage,
        createdAt: apiKey.usage.createdAt
      },
      warning: 'Store this API key securely. It will not be shown again.'
    }, { status: 201 });

  } catch (error) {
    console.error('API key creation error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

/**
 * DELETE /api/keys/:id
 * Revoke an API key
 */
export async function DELETE(request: NextRequest): Promise<NextResponse> {
  try {
    // Extract key ID from URL or body
    const url = new URL(request.url);
    const keyId = url.pathname.split('/').pop();
    
    if (!keyId) {
      const body = await request.json();
      if (!body.keyId) {
        return NextResponse.json({ 
          error: 'API key ID is required' 
        }, { status: 400 });
      }
    }

    const success = revokeAPIKey(keyId || '');
    
    if (success) {
      return NextResponse.json({ 
        message: 'API key revoked successfully',
        keyId 
      });
    } else {
      return NextResponse.json({ 
        error: 'API key not found' 
      }, { status: 404 });
    }

  } catch (error) {
    console.error('API key revocation error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

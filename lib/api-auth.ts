import { NextRequest } from 'next/server';
import { APIKey } from '@/types/fact';

// In-memory storage for demo (would use a database in production)
const apiKeys = new Map<string, APIKey>();
const rateLimitStore = new Map<string, { requests: number; resetTime: number }>();

/**
 * Rate limiting configuration
 */
interface RateLimitConfig {
  windowMs: number; // Time window in milliseconds
  maxRequests: number; // Maximum requests per window
}

const DEFAULT_RATE_LIMITS: Record<string, RateLimitConfig> = {
  free: { windowMs: 60 * 60 * 1000, maxRequests: 1000 }, // 1000/hour
  premium: { windowMs: 60 * 60 * 1000, maxRequests: 10000 }, // 10000/hour
  enterprise: { windowMs: 60 * 60 * 1000, maxRequests: 100000 }, // 100000/hour
};

/**
 * Generate a new API key
 */
export function generateAPIKey(): string {
  return 'nocap_' + Math.random().toString(36).substring(2) + Date.now().toString(36);
}

/**
 * Create a new API key
 */
export function createAPIKey(params: {
  name: string;
  userId?: string;
  permissions: ('read' | 'write' | 'analytics')[];
  tier?: 'free' | 'premium' | 'enterprise';
}): APIKey {
  const key = generateAPIKey();
  const rateLimit = DEFAULT_RATE_LIMITS[params.tier || 'free'].maxRequests;
  
  const apiKey: APIKey = {
    id: Math.random().toString(36).substring(2),
    name: params.name,
    key,
    userId: params.userId,
    permissions: params.permissions,
    rateLimit,
    usage: {
      requests: 0,
      lastUsed: new Date(),
      createdAt: new Date()
    },
    active: true
  };

  apiKeys.set(key, apiKey);
  return apiKey;
}

/**
 * Validate API key and check permissions
 */
export function validateAPIKey(key: string, requiredPermission: 'read' | 'write' | 'analytics'): APIKey | null {
  if (!key) return null;
  
  // Remove 'Bearer ' prefix if present
  const cleanKey = key.replace(/^Bearer\s+/, '');
  
  const apiKey = apiKeys.get(cleanKey);
  if (!apiKey || !apiKey.active) return null;
  
  if (!apiKey.permissions.includes(requiredPermission)) return null;
  
  return apiKey;
}

/**
 * Check rate limit for an API key
 */
export function checkRateLimit(apiKey: APIKey): { 
  allowed: boolean; 
  remainingRequests: number; 
  resetTime: number;
  rateLimitHeaders: Record<string, string>;
} {
  const now = Date.now();
  const tier = apiKey.rateLimit <= 1000 ? 'free' : 
               apiKey.rateLimit <= 10000 ? 'premium' : 'enterprise';
  const config = DEFAULT_RATE_LIMITS[tier];
  
  const limitKey = apiKey.key;
  let rateLimitData = rateLimitStore.get(limitKey);
  
  if (!rateLimitData || now > rateLimitData.resetTime) {
    rateLimitData = {
      requests: 0,
      resetTime: now + config.windowMs
    };
    rateLimitStore.set(limitKey, rateLimitData);
  }
  
  const allowed = rateLimitData.requests < config.maxRequests;
  const remainingRequests = Math.max(0, config.maxRequests - rateLimitData.requests);
  
  if (allowed) {
    rateLimitData.requests++;
    apiKey.usage.requests++;
    apiKey.usage.lastUsed = new Date();
  }
  
  return {
    allowed,
    remainingRequests,
    resetTime: rateLimitData.resetTime,
    rateLimitHeaders: {
      'X-RateLimit-Limit': config.maxRequests.toString(),
      'X-RateLimit-Remaining': remainingRequests.toString(),
      'X-RateLimit-Reset': Math.ceil(rateLimitData.resetTime / 1000).toString(),
      'X-RateLimit-Window': (config.windowMs / 1000).toString()
    }
  };
}

/**
 * Middleware function to authenticate and rate limit API requests
 */
export function withAPIAuth(requiredPermission: 'read' | 'write' | 'analytics') {
  return function(handler: (request: NextRequest, apiKey: APIKey) => Promise<Response>) {
    return async function(request: NextRequest): Promise<Response> {
      try {
        // Extract API key from headers
        const authHeader = request.headers.get('Authorization') || 
                          request.headers.get('X-API-Key') ||
                          new URL(request.url).searchParams.get('api_key');

        if (!authHeader) {
          return new Response(JSON.stringify({ 
            error: 'API key required. Include in Authorization header, X-API-Key header, or api_key query parameter.' 
          }), { 
            status: 401,
            headers: { 'Content-Type': 'application/json' }
          });
        }

        // Validate API key
        const apiKey = validateAPIKey(authHeader, requiredPermission);
        if (!apiKey) {
          return new Response(JSON.stringify({ 
            error: `Invalid API key or insufficient permissions. Required: ${requiredPermission}` 
          }), { 
            status: 403,
            headers: { 'Content-Type': 'application/json' }
          });
        }

        // Check rate limit
        const rateLimit = checkRateLimit(apiKey);
        if (!rateLimit.allowed) {
          return new Response(JSON.stringify({ 
            error: 'Rate limit exceeded. Please try again later.',
            resetTime: rateLimit.resetTime
          }), { 
            status: 429,
            headers: {
              'Content-Type': 'application/json',
              ...rateLimit.rateLimitHeaders
            }
          });
        }

        // Call the handler with the validated API key
        const response = await handler(request, apiKey);

        // Add rate limit headers to response
        Object.entries(rateLimit.rateLimitHeaders).forEach(([key, value]) => {
          response.headers.set(key, value);
        });

        return response;

      } catch (error) {
        console.error('API auth error:', error);
        return new Response(JSON.stringify({ error: 'Internal server error' }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        });
      }
    };
  };
}

/**
 * Get all API keys for a user (admin function)
 */
export function getUserAPIKeys(userId: string): APIKey[] {
  return Array.from(apiKeys.values()).filter(key => key.userId === userId);
}

/**
 * Revoke an API key
 */
export function revokeAPIKey(keyId: string): boolean {
  for (const [key, apiKey] of apiKeys.entries()) {
    if (apiKey.id === keyId) {
      apiKey.active = false;
      return true;
    }
  }
  return false;
}

/**
 * Get usage statistics for an API key
 */
export function getAPIKeyUsage(keyId: string): APIKey['usage'] | null {
  for (const apiKey of apiKeys.values()) {
    if (apiKey.id === keyId) {
      return apiKey.usage;
    }
  }
  return null;
}

/**
 * Initialize some demo API keys for development
 */
export function initializeDemoAPIKeys() {
  if (apiKeys.size > 0) return; // Already initialized

  // Create demo keys
  createAPIKey({
    name: 'Demo Read-Only Key',
    permissions: ['read'],
    tier: 'free'
  });

  createAPIKey({
    name: 'Demo Full Access Key',
    permissions: ['read', 'write', 'analytics'],
    tier: 'premium'
  });

  console.log('Demo API keys initialized:', Array.from(apiKeys.keys()));
}

/**
 * Export functions for API key management endpoints
 */
export {
  apiKeys,
  rateLimitStore
};

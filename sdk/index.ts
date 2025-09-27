/**
 * NOCAP Walrus SDK
 * 
 * A comprehensive SDK for accessing verified facts from the NOCAP database
 * Built on top of Walrus decentralized storage protocol
 * 
 * @version 1.0.0
 * @author NOCAP Team
 */

export { NOCAPClient } from './client';
export type { NOCAPConfig, NOCAPClientOptions } from './types';
import type { 
  NOCAPConfig, 
  NOCAPClientOptions, 
  NOCAPPaginationOptions,
  NOCAPSearchQuery 
} from './types';
import { NOCAPClient } from './client';
export type {
  NOCAPFact,
  NOCAPFactDetails,
  NOCAPSearchQuery,
  NOCAPSearchResults,
  NOCAPFactStatus,
  NOCAPTag,
  NOCAPSource,
  NOCAPComment,
  NOCAPPaginationOptions,
  NOCAPIndexStats,
  NOCAPHealthCheck,
  NOCAPError
} from './types';

// Re-export useful utilities
export { validateFactId, sanitizeSearchQuery } from './utils';

/**
 * Default configuration for NOCAP client
 */
export const DEFAULT_CONFIG: NOCAPConfig = {
  apiUrl: 'https://nocap.app/api',
  timeout: 30000,
  retries: 3,
  retryDelay: 1000,
  userAgent: 'nocap-sdk/1.0.0'
};

/**
 * Create a new NOCAP client instance
 * 
 * @param options - Configuration options
 * @returns NOCAPClient instance
 */
export function createClient(options?: NOCAPClientOptions): NOCAPClient {
  return new NOCAPClient(options);
}

/**
 * SDK version information
 */
export const VERSION = '1.0.0';
export const API_VERSION = 'v1';

/**
 * Quick access functions for common operations
 */

/**
 * Get all facts with optional pagination
 */
export async function getFacts(options?: NOCAPPaginationOptions & NOCAPClientOptions) {
  const client = createClient(options);
  return client.getFacts(options);
}

/**
 * Get a specific fact by ID
 */
export async function getFact(factId: string, options?: NOCAPClientOptions) {
  const client = createClient(options);
  return client.getFact(factId);
}

/**
 * Search facts by keywords, tags, etc.
 */
export async function searchFacts(query: NOCAPSearchQuery, options?: NOCAPClientOptions) {
  const client = createClient(options);
  return client.searchFacts(query);
}

/**
 * Get SDK health status
 */
export async function healthCheck(options?: NOCAPClientOptions) {
  const client = createClient(options);
  return client.healthCheck();
}

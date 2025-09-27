/**
 * NOCAP SDK Utilities
 * 
 * Helper functions and utilities for the NOCAP SDK
 */

import {
  NOCAPSearchQuery,
  NOCAPValidationError,
  NOCAPFact,
  NOCAPFactDetails,
  NOCAPTag,
  NOCAPFactStatus
} from './types';

/**
 * Validate a fact ID
 */
export function validateFactId(factId: string): boolean {
  if (!factId || typeof factId !== 'string') {
    return false;
  }
  
  // Basic validation: alphanumeric, hyphens, underscores, at least 3 characters
  return /^[a-zA-Z0-9_-]{3,}$/.test(factId);
}

/**
 * Sanitize search query parameters
 */
export function sanitizeSearchQuery(query: NOCAPSearchQuery): NOCAPSearchQuery {
  const sanitized: NOCAPSearchQuery = {};

  // Sanitize keywords
  if (query.keywords) {
    sanitized.keywords = query.keywords
      .filter(keyword => keyword && typeof keyword === 'string')
      .map(keyword => keyword.trim().toLowerCase())
      .filter(keyword => keyword.length > 0);
  }

  // Sanitize tags
  if (query.tags) {
    sanitized.tags = query.tags
      .filter(tag => tag && typeof tag === 'string')
      .map(tag => tag.trim().toLowerCase())
      .filter(tag => tag.length > 0);
  }

  // Sanitize authors
  if (query.authors) {
    sanitized.authors = query.authors
      .filter(author => author && typeof author === 'string')
      .map(author => author.trim())
      .filter(author => author.length > 0);
  }

  // Sanitize status
  if (query.status) {
    const validStatuses: NOCAPFactStatus[] = ['verified', 'review', 'flagged'];
    sanitized.status = query.status.filter(status => validStatuses.includes(status));
  }

  // Sanitize date range
  if (query.dateRange) {
    sanitized.dateRange = {};
    if (query.dateRange.from instanceof Date) {
      sanitized.dateRange.from = query.dateRange.from;
    }
    if (query.dateRange.to instanceof Date) {
      sanitized.dateRange.to = query.dateRange.to;
    }
  }

  // Sanitize pagination
  if (query.limit) {
    sanitized.limit = Math.max(1, Math.min(100, Math.floor(query.limit)));
  }
  
  if (query.offset) {
    sanitized.offset = Math.max(0, Math.floor(query.offset));
  }

  return sanitized;
}

/**
 * Format a fact for display
 */
export function formatFact(fact: NOCAPFact | NOCAPFactDetails): string {
  const statusEmoji = getStatusEmoji(fact.status);
  const date = fact.metadata?.created ? new Date(fact.metadata.created).toLocaleDateString() : 'Unknown date';
  
  return `${statusEmoji} ${fact.title}
Summary: ${fact.summary}
Author: ${fact.author}
Status: ${fact.status}
Votes: ${fact.votes}
Comments: ${fact.comments}
Created: ${date}
ID: ${fact.id}`;
}

/**
 * Get emoji for fact status
 */
export function getStatusEmoji(status: NOCAPFactStatus): string {
  switch (status) {
    case 'verified': return '✅';
    case 'review': return '⏳';
    case 'flagged': return '🚩';
    default: return '❓';
  }
}

/**
 * Get color for fact status
 */
export function getStatusColor(status: NOCAPFactStatus): string {
  switch (status) {
    case 'verified': return '#10B981'; // Green
    case 'review': return '#F59E0B'; // Amber
    case 'flagged': return '#EF4444'; // Red
    default: return '#6B7280'; // Gray
  }
}

/**
 * Calculate reading time estimate
 */
export function calculateReadingTime(text: string): number {
  const wordsPerMinute = 200;
  const wordCount = text.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

/**
 * Truncate text to a specified length
 */
export function truncateText(text: string, maxLength: number, suffix: string = '...'): string {
  if (text.length <= maxLength) {
    return text;
  }
  
  return text.substring(0, maxLength - suffix.length) + suffix;
}

/**
 * Extract domain from URL
 */
export function extractDomain(url: string): string {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname.replace('www.', '');
  } catch {
    return url;
  }
}

/**
 * Format relative time
 */
export function formatRelativeTime(date: Date | string): string {
  const now = new Date();
  const target = new Date(date);
  const diffMs = now.getTime() - target.getTime();
  
  const units = [
    { name: 'year', ms: 365 * 24 * 60 * 60 * 1000 },
    { name: 'month', ms: 30 * 24 * 60 * 60 * 1000 },
    { name: 'week', ms: 7 * 24 * 60 * 60 * 1000 },
    { name: 'day', ms: 24 * 60 * 60 * 1000 },
    { name: 'hour', ms: 60 * 60 * 1000 },
    { name: 'minute', ms: 60 * 1000 },
    { name: 'second', ms: 1000 }
  ];

  for (const unit of units) {
    const diff = Math.floor(diffMs / unit.ms);
    if (diff >= 1) {
      return `${diff} ${unit.name}${diff > 1 ? 's' : ''} ago`;
    }
  }

  return 'Just now';
}

/**
 * Normalize tag format
 */
export function normalizeTag(tag: string | NOCAPTag): NOCAPTag {
  if (typeof tag === 'string') {
    return {
      name: tag,
      category: categorizeTag(tag)
    };
  }
  return tag;
}

/**
 * Categorize a tag automatically
 */
export function categorizeTag(tagName: string): NOCAPTag['category'] {
  const tag = tagName.toLowerCase();
  
  // Topic categories
  if (['space', 'biology', 'physics', 'climate', 'ai', 'technology', 'medicine', 'neuroscience', 'chemistry', 'materials', 'astronomy', 'science'].includes(tag)) {
    return 'topic';
  }
  
  // Regional categories
  if (['global', 'europe', 'asia', 'america', 'africa', 'oceania', 'arctic', 'antarctic'].includes(tag)) {
    return 'region';
  }
  
  // Urgency categories  
  if (['urgent', 'critical', 'low', 'high', 'immediate', 'priority'].includes(tag)) {
    return 'urgency';
  }
  
  // Methodology categories
  if (['verified', 'peer-reviewed', 'experimental', 'observational', 'theoretical', 'clinical', 'survey'].includes(tag)) {
    return 'methodology';
  }
  
  // Default to type
  return 'type';
}

/**
 * Generate fact URL (for sharing)
 */
export function generateFactUrl(factId: string, baseUrl: string = 'https://nocap.app'): string {
  return `${baseUrl}/facts/${encodeURIComponent(factId)}`;
}

/**
 * Parse fact ID from URL
 */
export function parseFactIdFromUrl(url: string): string | null {
  try {
    const urlObj = new URL(url);
    const pathParts = urlObj.pathname.split('/');
    
    if (pathParts.length >= 3 && pathParts[1] === 'facts') {
      return decodeURIComponent(pathParts[2]);
    }
  } catch {
    // Invalid URL
  }
  
  return null;
}

/**
 * Validate URL format
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Escape HTML characters
 */
export function escapeHtml(text: string): string {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

/**
 * Generate a simple hash of a string
 */
export function simpleHash(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash).toString(16);
}

/**
 * Debounce function calls
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

/**
 * Throttle function calls
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

/**
 * Deep clone an object
 */
export function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }
  
  if (obj instanceof Date) {
    return new Date(obj.getTime()) as T;
  }
  
  if (Array.isArray(obj)) {
    return obj.map(item => deepClone(item)) as T;
  }
  
  const cloned = {} as T;
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      cloned[key] = deepClone(obj[key]);
    }
  }
  
  return cloned;
}

/**
 * Check if object is empty
 */
export function isEmpty(obj: any): boolean {
  if (obj == null) return true;
  if (Array.isArray(obj)) return obj.length === 0;
  if (typeof obj === 'object') return Object.keys(obj).length === 0;
  if (typeof obj === 'string') return obj.trim().length === 0;
  return false;
}

/**
 * Retry function with exponential backoff
 */
export async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  baseDelay: number = 1000,
  maxDelay: number = 10000
): Promise<T> {
  let lastError: Error;
  
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      
      if (attempt === maxRetries) {
        throw lastError;
      }
      
      const delay = Math.min(baseDelay * Math.pow(2, attempt), maxDelay);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  
  throw lastError!;
}

/**
 * Walrus Data SDK Utilities
 * 
 * Generic helper functions and utilities for the Walrus Data SDK
 */

import {
  WalrusSearchQuery,
  WalrusValidationError,
  WalrusDataItem,
  WalrusDataSchema,
  WalrusIndex,
  WalrusDataMetadata
} from './types';

/**
 * Validate a data ID format
 */
export function validateDataId(dataId: string): boolean {
  if (!dataId || typeof dataId !== 'string') {
    return false;
  }
  
  // Basic validation: alphanumeric, hyphens, underscores, at least 3 characters
  return /^[a-zA-Z0-9_-]{3,}$/.test(dataId);
}

/**
 * Validate a blob ID format (Walrus-specific)
 */
export function validateBlobId(blobId: string): boolean {
  if (!blobId || typeof blobId !== 'string') {
    return false;
  }
  
  // Walrus blob IDs are typically longer and contain specific patterns
  return /^[a-zA-Z0-9_-]{20,}$/.test(blobId);
}

/**
 * Sanitize search query parameters
 */
export function sanitizeQuery<T = any>(query: WalrusSearchQuery<T>): WalrusSearchQuery<T> {
  const sanitized: WalrusSearchQuery<T> = {};

  // Sanitize schema filters
  if (query.schema) {
    if (Array.isArray(query.schema)) {
      sanitized.schema = query.schema
        .filter(schema => schema && typeof schema === 'string')
        .map(schema => schema.trim())
        .filter(schema => schema.length > 0);
    } else if (typeof query.schema === 'string' && query.schema.trim().length > 0) {
      sanitized.schema = query.schema.trim();
    }
  }

  // Sanitize tags
  if (query.tags) {
    sanitized.tags = query.tags
      .filter(tag => tag && typeof tag === 'string')
      .map(tag => tag.trim().toLowerCase())
      .filter(tag => tag.length > 0);
  }

  // Sanitize categories
  if (query.categories) {
    sanitized.categories = query.categories
      .filter(category => category && typeof category === 'string')
      .map(category => category.trim().toLowerCase())
      .filter(category => category.length > 0);
  }

  // Sanitize author filters
  if (query.author) {
    if (Array.isArray(query.author)) {
      sanitized.author = query.author
        .filter(author => author && typeof author === 'string')
        .map(author => author.trim())
        .filter(author => author.length > 0);
    } else if (typeof query.author === 'string' && query.author.trim().length > 0) {
      sanitized.author = query.author.trim();
    }
  }

  // Sanitize content type filters
  if (query.contentType) {
    if (Array.isArray(query.contentType)) {
      sanitized.contentType = query.contentType
        .filter(type => type && typeof type === 'string')
        .map(type => type.trim().toLowerCase());
    } else if (typeof query.contentType === 'string' && query.contentType.trim().length > 0) {
      sanitized.contentType = query.contentType.trim().toLowerCase();
    }
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
  if (query.limit !== undefined) {
    sanitized.limit = Math.max(1, Math.min(1000, Math.floor(query.limit)));
  }
  
  if (query.offset !== undefined) {
    sanitized.offset = Math.max(0, Math.floor(query.offset));
  }

  // Sanitize sorting
  if (query.sortBy) {
    const validSortFields = ['created', 'updated', 'size', 'relevance'];
    if (validSortFields.includes(query.sortBy)) {
      sanitized.sortBy = query.sortBy;
    }
  }

  if (query.sortOrder) {
    if (['asc', 'desc'].includes(query.sortOrder)) {
      sanitized.sortOrder = query.sortOrder;
    }
  }

  // Sanitize field queries
  if (query.fieldQueries) {
    sanitized.fieldQueries = query.fieldQueries
      .filter(fq => fq && typeof fq === 'object' && fq.field && fq.value !== undefined)
      .map(fq => ({
        field: String(fq.field).trim(),
        value: fq.value,
        operator: ['eq', 'ne', 'lt', 'le', 'gt', 'ge', 'in', 'contains', 'startsWith', 'endsWith'].includes(fq.operator) 
          ? fq.operator 
          : 'eq'
      }))
      .filter(fq => fq.field.length > 0);
  }

  // Copy other valid properties
  if (query.fullTextSearch && typeof query.fullTextSearch === 'string') {
    sanitized.fullTextSearch = query.fullTextSearch.trim();
  }

  if (query.includeData !== undefined) {
    sanitized.includeData = Boolean(query.includeData);
  }

  if (typeof query.customFilters === 'function') {
    sanitized.customFilters = query.customFilters;
  }

  return sanitized;
}

/**
 * Generate a schema definition from sample data
 */
export function generateSchema<T = any>(
  sampleData: T[], 
  schemaId: string,
  schemaName?: string
): WalrusDataSchema {
  if (!Array.isArray(sampleData) || sampleData.length === 0) {
    throw new WalrusValidationError('Sample data must be a non-empty array');
  }

  const schema: WalrusDataSchema = {
    id: schemaId,
    version: '1.0.0',
    name: schemaName || schemaId,
    description: `Auto-generated schema from ${sampleData.length} samples`,
    properties: {},
    indexes: [],
    examples: sampleData.slice(0, 3) // Include up to 3 examples
  };

  // Analyze sample data to infer property types
  const propertyStats = new Map<string, Map<string, number>>();

  sampleData.forEach(sample => {
    if (sample && typeof sample === 'object') {
      Object.keys(sample).forEach(key => {
        const value = (sample as any)[key];
        const type = inferType(value);
        
        if (!propertyStats.has(key)) {
          propertyStats.set(key, new Map());
        }
        
        const typeStats = propertyStats.get(key)!;
        typeStats.set(type, (typeStats.get(type) || 0) + 1);
      });
    }
  });

  // Generate property definitions
  propertyStats.forEach((typeStats, key) => {
    const mostCommonType = Array.from(typeStats.entries())
      .sort((a, b) => b[1] - a[1])[0][0] as any;
    
    const totalOccurrences = Array.from(typeStats.values()).reduce((sum, count) => sum + count, 0);
    const isRequired = totalOccurrences === sampleData.length;
    
    // Determine if field should be indexed (common for IDs, timestamps, etc.)
    const shouldIndex = key.toLowerCase().includes('id') || 
                       key.toLowerCase().includes('time') || 
                       key.toLowerCase().includes('date') ||
                       mostCommonType === 'string' && totalOccurrences > sampleData.length * 0.8;

    // Determine if field should be searchable (text fields)
    const shouldSearch = mostCommonType === 'string' && 
                        (key.toLowerCase().includes('name') || 
                         key.toLowerCase().includes('title') || 
                         key.toLowerCase().includes('description') ||
                         key.toLowerCase().includes('content'));

    schema.properties[key] = {
      type: mostCommonType,
      required: isRequired,
      indexed: shouldIndex,
      searchable: shouldSearch
    };
  });

  // Generate suggested indexes
  const indexableFields = Object.keys(schema.properties)
    .filter(key => schema.properties[key].indexed);

  if (indexableFields.length > 0) {
    // Create individual indexes for commonly queried fields
    indexableFields.forEach(field => {
      schema.indexes!.push({
        name: `idx_${field}`,
        type: 'btree',
        fields: [field],
        unique: field.toLowerCase().includes('id')
      });
    });

    // Create a compound index for common query patterns
    if (indexableFields.length >= 2) {
      schema.indexes!.push({
        name: 'idx_compound',
        type: 'btree',
        fields: indexableFields.slice(0, 3), // Up to 3 fields
        unique: false
      });
    }
  }

  // Create full-text search index if there are searchable fields
  const searchableFields = Object.keys(schema.properties)
    .filter(key => schema.properties[key].searchable);
  
  if (searchableFields.length > 0) {
    schema.indexes!.push({
      name: 'idx_fulltext',
      type: 'fulltext',
      fields: searchableFields,
      unique: false
    });
  }

  return schema;
}

/**
 * Validate data against a schema
 */
export function validateSchema<T = any>(data: T, schema: WalrusDataSchema): boolean {
  if (!data || typeof data !== 'object') {
    return false;
  }

  const dataObj = data as any;

  // Check required properties
  for (const [key, property] of Object.entries(schema.properties)) {
    if (property.required && !(key in dataObj)) {
      throw new WalrusValidationError(`Required property '${key}' is missing`);
    }

    if (key in dataObj) {
      const value = dataObj[key];
      const expectedType = property.type;
      const actualType = inferType(value);

      if (actualType !== expectedType) {
        throw new WalrusValidationError(
          `Property '${key}' has type '${actualType}' but expected '${expectedType}'`
        );
      }

      // Run custom validation if provided
      if (property.validate && !property.validate(value)) {
        throw new WalrusValidationError(`Property '${key}' failed custom validation`);
      }
    }
  }

  return true;
}

/**
 * Create an optimized index configuration
 */
export function createIndex(
  name: string,
  fields: string[],
  options: {
    type?: 'btree' | 'hash' | 'fulltext' | 'geo' | 'custom';
    unique?: boolean;
    sparse?: boolean;
    [key: string]: any;
  } = {}
): WalrusIndex {
  if (!name || !Array.isArray(fields) || fields.length === 0) {
    throw new WalrusValidationError('Index name and fields are required');
  }

  return {
    name: name.toLowerCase().replace(/[^a-z0-9_]/g, '_'),
    type: options.type || (fields.length === 1 ? 'btree' : 'btree'),
    fields: fields.filter(field => field && typeof field === 'string'),
    unique: options.unique || false,
    sparse: options.sparse || false,
    options: { ...options, type: undefined, unique: undefined, sparse: undefined }
  };
}

/**
 * Optimize a query for better performance
 */
export function optimizeQuery<T = any>(query: WalrusSearchQuery<T>): WalrusSearchQuery<T> {
  const optimized = { ...sanitizeQuery(query) };

  // Optimize limit and offset
  if (!optimized.limit || optimized.limit > 100) {
    optimized.limit = 100; // Reasonable default for performance
  }

  // Optimize sorting - prefer indexed fields
  if (!optimized.sortBy || optimized.sortBy === 'relevance') {
    optimized.sortBy = 'created'; // Most commonly indexed field
    optimized.sortOrder = 'desc'; // Most recent first
  }

  // Optimize field queries - prioritize exact matches
  if (optimized.fieldQueries) {
    optimized.fieldQueries.sort((a, b) => {
      // Exact matches first
      if (a.operator === 'eq' && b.operator !== 'eq') return -1;
      if (b.operator === 'eq' && a.operator !== 'eq') return 1;
      
      // Then range queries
      if (['lt', 'le', 'gt', 'ge'].includes(a.operator) && 
          !['lt', 'le', 'gt', 'ge', 'eq'].includes(b.operator)) return -1;
      if (['lt', 'le', 'gt', 'ge'].includes(b.operator) && 
          !['lt', 'le', 'gt', 'ge', 'eq'].includes(a.operator)) return 1;
      
      return 0;
    });
  }

  // Optimize date range queries
  if (optimized.dateRange) {
    // Ensure from <= to
    if (optimized.dateRange.from && optimized.dateRange.to && 
        optimized.dateRange.from > optimized.dateRange.to) {
      [optimized.dateRange.from, optimized.dateRange.to] = 
        [optimized.dateRange.to, optimized.dateRange.from];
    }
  }

  return optimized;
}

/**
 * Format data item for display
 */
export function formatDataItem<T = any>(item: WalrusDataItem<T>): string {
  const date = new Date(item.metadata.created).toLocaleDateString();
  const size = formatBytes(item.metadata.size);
  
  return `📦 ${item.id}
Schema: ${item.schema || 'untyped'}
Created: ${date}
Size: ${size}
Author: ${item.metadata.author || 'unknown'}
Tags: ${item.tags?.join(', ') || 'none'}
Categories: ${item.categories?.join(', ') || 'none'}
Blob: ${item.blobId}`;
}

/**
 * Format bytes to human-readable format
 */
export function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

/**
 * Calculate reading time estimate for text content
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
 * Generate URL-safe identifier
 */
export function generateId(prefix: string = 'data'): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substr(2, 9);
  return `${prefix}-${timestamp}-${random}`;
}

/**
 * Parse identifier to extract components
 */
export function parseId(id: string): { prefix: string; timestamp: number; random: string } | null {
  try {
    const parts = id.split('-');
    if (parts.length !== 3) return null;
    
    return {
      prefix: parts[0],
      timestamp: parseInt(parts[1], 36),
      random: parts[2]
    };
  } catch {
    return null;
  }
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
 * Escape HTML characters for safe display
 */
export function escapeHtml(text: string): string {
  const div = typeof document !== 'undefined' ? document.createElement('div') : null;
  if (div) {
    div.textContent = text;
    return div.innerHTML;
  }
  
  // Fallback for non-browser environments
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
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
 * Generate content hash for integrity verification
 */
export function generateContentHash(content: string | object): string {
  const str = typeof content === 'string' ? content : JSON.stringify(content);
  return simpleHash(str);
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

/**
 * Batch process items with rate limiting
 */
export async function batchProcess<T, R>(
  items: T[],
  processor: (item: T) => Promise<R>,
  options: {
    batchSize?: number;
    delayBetweenBatches?: number;
    maxConcurrency?: number;
  } = {}
): Promise<R[]> {
  const {
    batchSize = 10,
    delayBetweenBatches = 100,
    maxConcurrency = 5
  } = options;

  const results: R[] = [];
  
  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize);
    
    // Process batch with limited concurrency
    const batchPromises = batch.map(item => processor(item));
    const batchResults = await Promise.all(batchPromises);
    
    results.push(...batchResults);
    
    // Delay between batches to avoid overwhelming the system
    if (i + batchSize < items.length && delayBetweenBatches > 0) {
      await new Promise(resolve => setTimeout(resolve, delayBetweenBatches));
    }
  }
  
  return results;
}

// Private helper functions

/**
 * Infer the type of a value for schema generation
 */
function inferType(value: any): 'string' | 'number' | 'boolean' | 'object' | 'array' | 'date' {
  if (value === null || value === undefined) {
    return 'string'; // Default to string for null values
  }
  
  if (Array.isArray(value)) {
    return 'array';
  }
  
  if (value instanceof Date) {
    return 'date';
  }
  
  if (typeof value === 'string') {
    // Check if it looks like a date
    if (/^\d{4}-\d{2}-\d{2}/.test(value) || !isNaN(Date.parse(value))) {
      const date = new Date(value);
      if (date.toString() !== 'Invalid Date') {
        return 'date';
      }
    }
    return 'string';
  }
  
  if (typeof value === 'number') {
    return 'number';
  }
  
  if (typeof value === 'boolean') {
    return 'boolean';
  }
  
  if (typeof value === 'object') {
    return 'object';
  }
  
  return 'string'; // Default fallback
}
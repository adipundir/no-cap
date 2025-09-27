// Walrus Protocol Integration Types
// Based on Walrus decentralized storage protocol built on Sui blockchain

// Core Walrus blob operations
export interface WalrusBlobMetadata {
  blobId: string;
  size: number;
  mimeType?: string;
  createdAt: Date;
  expiresAt?: Date;
  erasureCodingParams?: {
    redundancy: number;
    threshold: number;
  };
}

export interface WalrusStoreResponse {
  blobId: string;
  availabilityCertificate: string;
  metadata: WalrusBlobMetadata;
  transactionId?: string; // Sui transaction hash
}

export interface WalrusRetrieveResponse {
  data: Buffer | Uint8Array;
  metadata: WalrusBlobMetadata;
}

// Storage operation interfaces
export interface WalrusStorageOperation {
  id: string;
  type: 'store' | 'retrieve' | 'delete';
  blobId?: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  createdAt: Date;
  completedAt?: Date;
  error?: string;
}

export interface WalrusStorageConfig {
  aggregatorUrl: string;
  publisherUrl: string;
  apiUrl?: string;
  suiNetworkUrl?: string;
  defaultExpiration?: number; // in milliseconds
  maxBlobSize?: number; // in bytes
}

import type { FactTag } from '@/types/fact';

// Fact-specific storage interfaces
export interface FactContent {
  id: string;
  title: string;
  summary: string;
  fullContent?: string;
  sources?: string[];
  metadata: {
    author: string;
    created: Date;
    updated: Date;
    version: number;
    contentType?: 'text/plain' | 'text/markdown' | 'text/html';
    tags?: FactTag[];
    keywords?: string[];
    region?: string;
    importance?: number;
  };
}

export interface FactContentBlob {
  factId: string;
  content: FactContent;
  walrusMetadata: WalrusBlobMetadata;
}

export interface ContextComment {
  id: string;
  factId: string;
  text: string;
  author: string;
  created: Date;
  parentId?: string; // for threaded comments
  votes: number;
  metadata?: Record<string, any>;
}

export interface ContextCommentBlob {
  commentId: string;
  factId: string;
  comment: ContextComment;
  walrusMetadata: WalrusBlobMetadata;
}

// Service layer interfaces
export interface WalrusStorageService {
  // Core blob operations
  storeBlob(data: Buffer | Uint8Array | string, options?: StoreOptions): Promise<WalrusStoreResponse>;
  retrieveBlob(blobId: string): Promise<WalrusRetrieveResponse>;
  deleteBlob(blobId: string): Promise<boolean>;
  getBlobMetadata(blobId: string): Promise<WalrusBlobMetadata>;
  
  // Fact-specific operations
  storeFact(fact: FactContent): Promise<FactContentBlob>;
  retrieveFact(factId: string): Promise<FactContentBlob>;
  updateFact(factId: string, updates: Partial<FactContent>): Promise<FactContentBlob>;
  
  // Context/comment operations
  storeComment(comment: ContextComment): Promise<ContextCommentBlob>;
  retrieveComment(commentId: string): Promise<ContextCommentBlob>;
  retrieveFactComments(factId: string): Promise<ContextCommentBlob[]>;
  
  // Batch operations
  storeMultipleComments(comments: ContextComment[]): Promise<ContextCommentBlob[]>;
  retrieveMultipleFacts(factIds: string[]): Promise<FactContentBlob[]>;
}

export interface StoreOptions {
  mimeType?: string;
  expirationDuration?: number; // in milliseconds
  redundancy?: number;
  encryption?: boolean;
  metadata?: Record<string, any>;
}

export interface RetrieveOptions {
  timeout?: number;
  preferredNodes?: string[];
  fallbackToCache?: boolean;
}

// Error types
export class WalrusError extends Error {
  constructor(
    message: string,
    public code: string,
    public details?: Record<string, any>
  ) {
    super(message);
    this.name = 'WalrusError';
  }
}

export class WalrusStorageError extends WalrusError {
  constructor(message: string, details?: Record<string, any>) {
    super(message, 'STORAGE_ERROR', details);
  }
}

export class WalrusRetrievalError extends WalrusError {
  constructor(message: string, details?: Record<string, any>) {
    super(message, 'RETRIEVAL_ERROR', details);
  }
}

export class WalrusNetworkError extends WalrusError {
  constructor(message: string, details?: Record<string, any>) {
    super(message, 'NETWORK_ERROR', details);
  }
}

// Event types for real-time updates
export interface WalrusStorageEvent {
  type: 'blob_stored' | 'blob_retrieved' | 'blob_deleted' | 'operation_failed';
  blobId: string;
  timestamp: Date;
  metadata?: Record<string, any>;
}

export type WalrusEventHandler = (event: WalrusStorageEvent) => void;

// Cache interface for improved performance
export interface WalrusCache {
  get(blobId: string): Promise<WalrusRetrieveResponse | null>;
  set(blobId: string, data: WalrusRetrieveResponse, ttl?: number): Promise<void>;
  delete(blobId: string): Promise<boolean>;
  clear(): Promise<void>;
}

// Aggregated interfaces for application integration
export interface WalrusIntegration {
  storage: WalrusStorageService;
  cache?: WalrusCache;
  config: WalrusStorageConfig;
  
  // Lifecycle methods
  initialize(): Promise<void>;
  shutdown(): Promise<void>;
  
  // Health check
  healthCheck(): Promise<{
    status: 'healthy' | 'degraded' | 'unhealthy';
    latency: number;
    availableNodes: number;
  }>;
}

import { WalrusSDK } from '@hibernuts/walrus-sdk';
import {
  WalrusStorageService,
  WalrusStorageConfig,
  WalrusStoreResponse,
  WalrusRetrieveResponse,
  WalrusBlobMetadata,
  FactContent,
  FactContentBlob,
  ContextComment,
  ContextCommentBlob,
  StoreOptions,
  WalrusStorageError,
  WalrusRetrievalError,
  WalrusNetworkError,
  WalrusCache,
  WalrusStorageEvent,
  WalrusEventHandler
} from '@/types/walrus';

/**
 * Walrus Storage Service Implementation
 * Provides high-level storage operations for the no-cap fact-checking application
 */
export class WalrusStorageServiceImpl implements WalrusStorageService {
  private walrusSDK: WalrusSDK;
  private config: WalrusStorageConfig;
  private cache?: WalrusCache;
  private eventHandlers: Map<string, WalrusEventHandler[]> = new Map();

  constructor(config: WalrusStorageConfig, cache?: WalrusCache) {
    this.config = config;
    this.cache = cache;
    this.walrusSDK = new WalrusSDK({
      aggregator: config.aggregatorUrl,
      publisher: config.publisherUrl,
      apiUrl: config.apiUrl || config.aggregatorUrl,
    });
  }

  /**
   * Core blob operations
   */
  async storeBlob(
    data: Buffer | Uint8Array | string, 
    options?: StoreOptions
  ): Promise<WalrusStoreResponse> {
    try {
      // Convert string to Buffer if needed
      const blobData = typeof data === 'string' ? Buffer.from(data, 'utf-8') : data;
      
      // Store blob using Walrus SDK
      const response = await this.walrusSDK.storeBlob(blobData);
      
      if (!response || !response.blobId) {
        throw new WalrusStorageError('Failed to store blob: Invalid response from Walrus');
      }

      const metadata: WalrusBlobMetadata = {
        blobId: response.blobId,
        size: blobData.length,
        mimeType: options?.mimeType,
        createdAt: new Date(),
        expiresAt: options?.expirationDuration 
          ? new Date(Date.now() + options.expirationDuration) 
          : undefined,
        erasureCodingParams: {
          redundancy: options?.redundancy || 3,
          threshold: Math.ceil((options?.redundancy || 3) * 0.67)
        }
      };

      const storeResponse: WalrusStoreResponse = {
        blobId: response.blobId,
        availabilityCertificate: response.certificate || '',
        metadata,
        transactionId: response.transactionId
      };

      // Cache the stored data for quick retrieval
      if (this.cache) {
        const retrieveResponse: WalrusRetrieveResponse = {
          data: blobData,
          metadata
        };
        await this.cache.set(response.blobId, retrieveResponse, options?.expirationDuration);
      }

      // Emit storage event
      this.emitEvent({
        type: 'blob_stored',
        blobId: response.blobId,
        timestamp: new Date(),
        metadata: { size: blobData.length, mimeType: options?.mimeType }
      });

      return storeResponse;
    } catch (error) {
      this.emitEvent({
        type: 'operation_failed',
        blobId: '',
        timestamp: new Date(),
        metadata: { operation: 'store', error: error.message }
      });
      
      throw new WalrusStorageError(
        `Failed to store blob: ${error.message}`,
        { originalError: error, dataSize: data.length }
      );
    }
  }

  async retrieveBlob(blobId: string): Promise<WalrusRetrieveResponse> {
    try {
      // Check cache first
      if (this.cache) {
        const cached = await this.cache.get(blobId);
        if (cached) {
          return cached;
        }
      }

      // Retrieve from Walrus
      const response = await this.walrusSDK.retrieveBlob(blobId);
      
      if (!response) {
        throw new WalrusRetrievalError(`Blob not found: ${blobId}`);
      }

      const retrieveResponse: WalrusRetrieveResponse = {
        data: response,
        metadata: await this.getBlobMetadata(blobId)
      };

      // Update cache
      if (this.cache) {
        await this.cache.set(blobId, retrieveResponse);
      }

      this.emitEvent({
        type: 'blob_retrieved',
        blobId,
        timestamp: new Date(),
        metadata: { size: response.length }
      });

      return retrieveResponse;
    } catch (error) {
      this.emitEvent({
        type: 'operation_failed',
        blobId,
        timestamp: new Date(),
        metadata: { operation: 'retrieve', error: error.message }
      });

      throw new WalrusRetrievalError(
        `Failed to retrieve blob ${blobId}: ${error.message}`,
        { blobId, originalError: error }
      );
    }
  }

  async deleteBlob(blobId: string): Promise<boolean> {
    try {
      // Note: Walrus may not support direct deletion - this is a logical delete
      // Remove from cache
      if (this.cache) {
        await this.cache.delete(blobId);
      }

      this.emitEvent({
        type: 'blob_deleted',
        blobId,
        timestamp: new Date()
      });

      return true;
    } catch (error) {
      throw new WalrusStorageError(`Failed to delete blob ${blobId}: ${error.message}`);
    }
  }

  async getBlobMetadata(blobId: string): Promise<WalrusBlobMetadata> {
    // In a real implementation, this would query Walrus for metadata
    // For now, return basic metadata
    return {
      blobId,
      size: 0,
      createdAt: new Date(),
      erasureCodingParams: {
        redundancy: 3,
        threshold: 2
      }
    };
  }

  /**
   * Fact-specific operations
   */
  async storeFact(fact: FactContent): Promise<FactContentBlob> {
    try {
      const factJson = JSON.stringify(fact, null, 2);
      const storeResponse = await this.storeBlob(factJson, {
        mimeType: 'application/json',
        metadata: { type: 'fact', factId: fact.id }
      });

      return {
        factId: fact.id,
        content: fact,
        walrusMetadata: storeResponse.metadata
      };
    } catch (error) {
      throw new WalrusStorageError(`Failed to store fact ${fact.id}: ${error.message}`);
    }
  }

  async retrieveFact(factId: string): Promise<FactContentBlob> {
    try {
      // In a real app, you'd maintain a mapping of factId -> blobId
      // For now, assume factId is the blobId
      const retrieveResponse = await this.retrieveBlob(factId);
      const factContent: FactContent = JSON.parse(retrieveResponse.data.toString('utf-8'));

      return {
        factId,
        content: factContent,
        walrusMetadata: retrieveResponse.metadata
      };
    } catch (error) {
      throw new WalrusRetrievalError(`Failed to retrieve fact ${factId}: ${error.message}`);
    }
  }

  async updateFact(factId: string, updates: Partial<FactContent>): Promise<FactContentBlob> {
    try {
      // Retrieve existing fact
      const existingFact = await this.retrieveFact(factId);
      
      // Merge updates
      const updatedFact: FactContent = {
        ...existingFact.content,
        ...updates,
        metadata: {
          ...existingFact.content.metadata,
          updated: new Date(),
          version: existingFact.content.metadata.version + 1
        }
      };

      // Store updated fact
      return await this.storeFact(updatedFact);
    } catch (error) {
      throw new WalrusStorageError(`Failed to update fact ${factId}: ${error.message}`);
    }
  }

  /**
   * Context/comment operations
   */
  async storeComment(comment: ContextComment): Promise<ContextCommentBlob> {
    try {
      const commentJson = JSON.stringify(comment, null, 2);
      const storeResponse = await this.storeBlob(commentJson, {
        mimeType: 'application/json',
        metadata: { type: 'comment', commentId: comment.id, factId: comment.factId }
      });

      return {
        commentId: comment.id,
        factId: comment.factId,
        comment,
        walrusMetadata: storeResponse.metadata
      };
    } catch (error) {
      throw new WalrusStorageError(`Failed to store comment ${comment.id}: ${error.message}`);
    }
  }

  async retrieveComment(commentId: string): Promise<ContextCommentBlob> {
    try {
      const retrieveResponse = await this.retrieveBlob(commentId);
      const comment: ContextComment = JSON.parse(retrieveResponse.data.toString('utf-8'));

      return {
        commentId,
        factId: comment.factId,
        comment,
        walrusMetadata: retrieveResponse.metadata
      };
    } catch (error) {
      throw new WalrusRetrievalError(`Failed to retrieve comment ${commentId}: ${error.message}`);
    }
  }

  async retrieveFactComments(factId: string): Promise<ContextCommentBlob[]> {
    // In a real implementation, you'd maintain an index of factId -> commentIds
    // This is a placeholder that would need proper indexing
    throw new Error('retrieveFactComments requires proper indexing implementation');
  }

  /**
   * Batch operations
   */
  async storeMultipleComments(comments: ContextComment[]): Promise<ContextCommentBlob[]> {
    const results: ContextCommentBlob[] = [];
    
    // Process in parallel for better performance
    const storePromises = comments.map(comment => this.storeComment(comment));
    const storedComments = await Promise.allSettled(storePromises);

    storedComments.forEach((result, index) => {
      if (result.status === 'fulfilled') {
        results.push(result.value);
      } else {
        console.error(`Failed to store comment ${comments[index].id}:`, result.reason);
      }
    });

    return results;
  }

  async retrieveMultipleFacts(factIds: string[]): Promise<FactContentBlob[]> {
    const results: FactContentBlob[] = [];
    
    const retrievePromises = factIds.map(factId => this.retrieveFact(factId));
    const retrievedFacts = await Promise.allSettled(retrievePromises);

    retrievedFacts.forEach((result, index) => {
      if (result.status === 'fulfilled') {
        results.push(result.value);
      } else {
        console.error(`Failed to retrieve fact ${factIds[index]}:`, result.reason);
      }
    });

    return results;
  }

  /**
   * Event handling
   */
  addEventListener(eventType: string, handler: WalrusEventHandler): void {
    if (!this.eventHandlers.has(eventType)) {
      this.eventHandlers.set(eventType, []);
    }
    this.eventHandlers.get(eventType)!.push(handler);
  }

  removeEventListener(eventType: string, handler: WalrusEventHandler): void {
    const handlers = this.eventHandlers.get(eventType);
    if (handlers) {
      const index = handlers.indexOf(handler);
      if (index > -1) {
        handlers.splice(index, 1);
      }
    }
  }

  private emitEvent(event: WalrusStorageEvent): void {
    const handlers = this.eventHandlers.get(event.type);
    if (handlers) {
      handlers.forEach(handler => {
        try {
          handler(event);
        } catch (error) {
          console.error('Error in event handler:', error);
        }
      });
    }
  }
}

/**
 * Simple in-memory cache implementation
 */
export class MemoryWalrusCache implements WalrusCache {
  private cache: Map<string, { data: WalrusRetrieveResponse; expires?: number }> = new Map();
  private cleanupInterval: NodeJS.Timeout;

  constructor(private defaultTtl: number = 300000) { // 5 minutes default
    // Clean up expired entries every minute
    this.cleanupInterval = setInterval(() => this.cleanup(), 60000);
  }

  async get(blobId: string): Promise<WalrusRetrieveResponse | null> {
    const entry = this.cache.get(blobId);
    if (!entry) return null;

    if (entry.expires && Date.now() > entry.expires) {
      this.cache.delete(blobId);
      return null;
    }

    return entry.data;
  }

  async set(blobId: string, data: WalrusRetrieveResponse, ttl?: number): Promise<void> {
    const expires = ttl ? Date.now() + ttl : Date.now() + this.defaultTtl;
    this.cache.set(blobId, { data, expires });
  }

  async delete(blobId: string): Promise<boolean> {
    return this.cache.delete(blobId);
  }

  async clear(): Promise<void> {
    this.cache.clear();
  }

  private cleanup(): void {
    const now = Date.now();
    for (const [blobId, entry] of this.cache.entries()) {
      if (entry.expires && now > entry.expires) {
        this.cache.delete(blobId);
      }
    }
  }

  destroy(): void {
    clearInterval(this.cleanupInterval);
    this.cache.clear();
  }
}

/**
 * Factory function to create Walrus storage service
 */
export function createWalrusStorage(
  config: WalrusStorageConfig, 
  enableCache: boolean = true
): WalrusStorageService {
  const cache = enableCache ? new MemoryWalrusCache() : undefined;
  return new WalrusStorageServiceImpl(config, cache);
}
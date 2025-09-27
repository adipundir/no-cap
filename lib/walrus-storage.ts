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
  RetrieveOptions,
  WalrusStorageError,
  WalrusRetrievalError,
  WalrusNetworkError,
  WalrusStorageEvent,
  WalrusEventHandler,
  WalrusCache,
} from '@/types/walrus';

/**
 * In-memory cache implementation for Walrus blobs
 * In production, consider using Redis or another distributed cache
 */
class MemoryWalrusCache implements WalrusCache {
  private cache = new Map<string, { data: WalrusRetrieveResponse; expires: number }>();

  async get(blobId: string): Promise<WalrusRetrieveResponse | null> {
    const cached = this.cache.get(blobId);
    if (!cached) return null;
    
    if (Date.now() > cached.expires) {
      this.cache.delete(blobId);
      return null;
    }
    
    return cached.data;
  }

  async set(blobId: string, data: WalrusRetrieveResponse, ttl: number = 3600000): Promise<void> {
    this.cache.set(blobId, {
      data,
      expires: Date.now() + ttl
    });
  }

  async delete(blobId: string): Promise<boolean> {
    return this.cache.delete(blobId);
  }

  async clear(): Promise<void> {
    this.cache.clear();
  }
}

/**
 * Walrus Storage Service Implementation
 * Handles blob storage operations for facts and comments using Walrus Protocol
 */
export class WalrusStorageServiceImpl implements WalrusStorageService {
  private walrusSDK: WalrusSDK;
  private cache: WalrusCache;
  private eventHandlers: Map<string, WalrusEventHandler[]> = new Map();
  private factBlobIndex = new Map<string, string>(); // factId -> blobId
  private commentBlobIndex = new Map<string, string>(); // commentId -> blobId

  constructor(
    private config: WalrusStorageConfig,
    cache?: WalrusCache
  ) {
    this.walrusSDK = new WalrusSDK({
      aggregator: config.aggregatorUrl,
      publisher: config.publisherUrl,
      apiUrl: config.apiUrl,
    });
    
    this.cache = cache || new MemoryWalrusCache();
  }

  // Core blob operations
  async storeBlob(
    data: Buffer | Uint8Array | string, 
    options?: StoreOptions
  ): Promise<WalrusStoreResponse> {
    try {
      const buffer = this.ensureBuffer(data);
      
      // Validate blob size
      if (this.config.maxBlobSize && buffer.length > this.config.maxBlobSize) {
        throw new WalrusStorageError('Blob size exceeds maximum allowed size', {
          size: buffer.length,
          maxSize: this.config.maxBlobSize
        });
      }

      const response = await this.walrusSDK.storeBlob(buffer);
      
      const metadata: WalrusBlobMetadata = {
        blobId: response.blobId,
        size: buffer.length,
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
        availabilityCertificate: response.availabilityCertificate || '',
        metadata,
        transactionId: response.transactionId
      };

      // Cache the stored blob
      const retrieveResponse: WalrusRetrieveResponse = {
        data: buffer,
        metadata
      };
      await this.cache.set(response.blobId, retrieveResponse, options?.expirationDuration);

      this.emitEvent({
        type: 'blob_stored',
        blobId: response.blobId,
        timestamp: new Date(),
        metadata: { size: buffer.length, mimeType: options?.mimeType }
      });

      return storeResponse;
    } catch (error) {
      const blobError = new WalrusStorageError(
        `Failed to store blob: ${error instanceof Error ? error.message : 'Unknown error'}`,
        { originalError: error }
      );
      
      this.emitEvent({
        type: 'operation_failed',
        blobId: 'unknown',
        timestamp: new Date(),
        metadata: { operation: 'store', error: blobError.message }
      });
      
      throw blobError;
    }
  }

  async retrieveBlob(blobId: string): Promise<WalrusRetrieveResponse> {
    try {
      // Check cache first
      const cached = await this.cache.get(blobId);
      if (cached) {
        this.emitEvent({
          type: 'blob_retrieved',
          blobId,
          timestamp: new Date(),
          metadata: { source: 'cache' }
        });
        return cached;
      }

      const response = await this.walrusSDK.getBlob(blobId);
      
      const retrieveResponse: WalrusRetrieveResponse = {
        data: response.data,
        metadata: {
          blobId,
          size: response.data.length,
          createdAt: new Date(), // This should ideally come from Walrus metadata
          mimeType: response.contentType
        }
      };

      // Cache for future requests
      await this.cache.set(blobId, retrieveResponse);

      this.emitEvent({
        type: 'blob_retrieved',
        blobId,
        timestamp: new Date(),
        metadata: { source: 'network', size: response.data.length }
      });

      return retrieveResponse;
    } catch (error) {
      const retrievalError = new WalrusRetrievalError(
        `Failed to retrieve blob ${blobId}: ${error instanceof Error ? error.message : 'Unknown error'}`,
        { blobId, originalError: error }
      );
      
      this.emitEvent({
        type: 'operation_failed',
        blobId,
        timestamp: new Date(),
        metadata: { operation: 'retrieve', error: retrievalError.message }
      });
      
      throw retrievalError;
    }
  }

  async deleteBlob(blobId: string): Promise<boolean> {
    try {
      // Remove from cache
      await this.cache.delete(blobId);
      
      // Note: Walrus doesn't support explicit deletion - blobs expire naturally
      // This method primarily handles cleanup of local references
      
      this.emitEvent({
        type: 'blob_deleted',
        blobId,
        timestamp: new Date(),
        metadata: { operation: 'delete' }
      });

      return true;
    } catch (error) {
      throw new WalrusStorageError(
        `Failed to delete blob ${blobId}: ${error instanceof Error ? error.message : 'Unknown error'}`,
        { blobId, originalError: error }
      );
    }
  }

  async getBlobMetadata(blobId: string): Promise<WalrusBlobMetadata> {
    try {
      // Try to get from cache first
      const cached = await this.cache.get(blobId);
      if (cached) {
        return cached.metadata;
      }

      // For Walrus, we might need to retrieve the blob to get full metadata
      // In a production system, you'd want a separate metadata endpoint
      const response = await this.retrieveBlob(blobId);
      return response.metadata;
    } catch (error) {
      throw new WalrusRetrievalError(
        `Failed to get metadata for blob ${blobId}: ${error instanceof Error ? error.message : 'Unknown error'}`,
        { blobId, originalError: error }
      );
    }
  }

  // Fact-specific operations
  async storeFact(fact: FactContent): Promise<FactContentBlob> {
    try {
      const factData = JSON.stringify(fact);
      const storeResponse = await this.storeBlob(factData, {
        mimeType: 'application/json',
        metadata: { type: 'fact', factId: fact.id }
      });

      // Index the fact
      this.factBlobIndex.set(fact.id, storeResponse.blobId);

      return {
        factId: fact.id,
        content: fact,
        walrusMetadata: storeResponse.metadata
      };
    } catch (error) {
      throw new WalrusStorageError(
        `Failed to store fact ${fact.id}: ${error instanceof Error ? error.message : 'Unknown error'}`,
        { factId: fact.id, originalError: error }
      );
    }
  }

  async retrieveFact(factId: string): Promise<FactContentBlob> {
    try {
      const blobId = this.factBlobIndex.get(factId);
      if (!blobId) {
        throw new WalrusRetrievalError(`No blob found for fact ${factId}`, { factId });
      }

      const response = await this.retrieveBlob(blobId);
      const fact: FactContent = JSON.parse(response.data.toString());

      return {
        factId,
        content: fact,
        walrusMetadata: response.metadata
      };
    } catch (error) {
      throw new WalrusRetrievalError(
        `Failed to retrieve fact ${factId}: ${error instanceof Error ? error.message : 'Unknown error'}`,
        { factId, originalError: error }
      );
    }
  }

  async updateFact(factId: string, updates: Partial<FactContent>): Promise<FactContentBlob> {
    try {
      const existingFact = await this.retrieveFact(factId);
      const updatedFact: FactContent = {
        ...existingFact.content,
        ...updates,
        metadata: {
          ...existingFact.content.metadata,
          updated: new Date(),
          version: existingFact.content.metadata.version + 1
        }
      };

      return await this.storeFact(updatedFact);
    } catch (error) {
      throw new WalrusStorageError(
        `Failed to update fact ${factId}: ${error instanceof Error ? error.message : 'Unknown error'}`,
        { factId, originalError: error }
      );
    }
  }

  // Context/comment operations
  async storeComment(comment: ContextComment): Promise<ContextCommentBlob> {
    try {
      const commentData = JSON.stringify(comment);
      const storeResponse = await this.storeBlob(commentData, {
        mimeType: 'application/json',
        metadata: { type: 'comment', commentId: comment.id, factId: comment.factId }
      });

      // Index the comment
      this.commentBlobIndex.set(comment.id, storeResponse.blobId);

      return {
        commentId: comment.id,
        factId: comment.factId,
        comment,
        walrusMetadata: storeResponse.metadata
      };
    } catch (error) {
      throw new WalrusStorageError(
        `Failed to store comment ${comment.id}: ${error instanceof Error ? error.message : 'Unknown error'}`,
        { commentId: comment.id, originalError: error }
      );
    }
  }

  async retrieveComment(commentId: string): Promise<ContextCommentBlob> {
    try {
      const blobId = this.commentBlobIndex.get(commentId);
      if (!blobId) {
        throw new WalrusRetrievalError(`No blob found for comment ${commentId}`, { commentId });
      }

      const response = await this.retrieveBlob(blobId);
      const comment: ContextComment = JSON.parse(response.data.toString());

      return {
        commentId,
        factId: comment.factId,
        comment,
        walrusMetadata: response.metadata
      };
    } catch (error) {
      throw new WalrusRetrievalError(
        `Failed to retrieve comment ${commentId}: ${error instanceof Error ? error.message : 'Unknown error'}`,
        { commentId, originalError: error }
      );
    }
  }

  async retrieveFactComments(factId: string): Promise<ContextCommentBlob[]> {
    // In a production system, you'd want to maintain an index of comments per fact
    // For now, this is a simplified implementation
    const comments: ContextCommentBlob[] = [];
    
    for (const [commentId, blobId] of this.commentBlobIndex) {
      try {
        const comment = await this.retrieveComment(commentId);
        if (comment.factId === factId) {
          comments.push(comment);
        }
      } catch (error) {
        // Log error but continue with other comments
        console.warn(`Failed to retrieve comment ${commentId}:`, error);
      }
    }

    return comments;
  }

  // Batch operations
  async storeMultipleComments(comments: ContextComment[]): Promise<ContextCommentBlob[]> {
    const results = await Promise.allSettled(
      comments.map(comment => this.storeComment(comment))
    );

    return results
      .filter((result): result is PromiseFulfilledResult<ContextCommentBlob> => 
        result.status === 'fulfilled'
      )
      .map(result => result.value);
  }

  async retrieveMultipleFacts(factIds: string[]): Promise<FactContentBlob[]> {
    const results = await Promise.allSettled(
      factIds.map(factId => this.retrieveFact(factId))
    );

    return results
      .filter((result): result is PromiseFulfilledResult<FactContentBlob> => 
        result.status === 'fulfilled'
      )
      .map(result => result.value);
  }

  // Event handling
  addEventListener(type: string, handler: WalrusEventHandler): void {
    if (!this.eventHandlers.has(type)) {
      this.eventHandlers.set(type, []);
    }
    this.eventHandlers.get(type)!.push(handler);
  }

  removeEventListener(type: string, handler: WalrusEventHandler): void {
    const handlers = this.eventHandlers.get(type);
    if (handlers) {
      const index = handlers.indexOf(handler);
      if (index > -1) {
        handlers.splice(index, 1);
      }
    }
  }

  private emitEvent(event: WalrusStorageEvent): void {
    const handlers = this.eventHandlers.get(event.type) || [];
    handlers.forEach(handler => {
      try {
        handler(event);
      } catch (error) {
        console.error('Error in event handler:', error);
      }
    });
  }

  // Utility methods
  private ensureBuffer(data: Buffer | Uint8Array | string): Buffer {
    if (Buffer.isBuffer(data)) {
      return data;
    }
    if (data instanceof Uint8Array) {
      return Buffer.from(data);
    }
    return Buffer.from(data, 'utf-8');
  }

  // Health check
  async healthCheck(): Promise<{
    status: 'healthy' | 'degraded' | 'unhealthy';
    latency: number;
    availableNodes: number;
  }> {
    const startTime = Date.now();
    
    try {
      // Perform a simple operation to check health
      const testData = Buffer.from('health-check');
      const response = await this.storeBlob(testData, {
        metadata: { type: 'health-check' }
      });
      
      // Clean up test blob
      await this.deleteBlob(response.blobId);
      
      const latency = Date.now() - startTime;
      
      return {
        status: latency < 5000 ? 'healthy' : 'degraded',
        latency,
        availableNodes: 1 // This would be determined by actual node discovery
      };
    } catch (error) {
      return {
        status: 'unhealthy',
        latency: Date.now() - startTime,
        availableNodes: 0
      };
    }
  }
}

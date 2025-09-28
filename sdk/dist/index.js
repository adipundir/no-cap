"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  API_VERSION: () => API_VERSION,
  DEFAULT_CONFIG: () => DEFAULT_CONFIG2,
  DocumentStore: () => WalrusDocumentStore,
  KVStore: () => WalrusKVStore,
  VERSION: () => VERSION,
  WalrusDataClient: () => WalrusDataClient,
  WalrusDocumentStore: () => WalrusDocumentStore,
  WalrusKVStore: () => WalrusKVStore,
  createClient: () => createClient,
  createIndex: () => createIndex,
  createOptimizedClient: () => createOptimizedClient,
  createStores: () => createStores,
  generateSchema: () => generateSchema,
  getStats: () => getStats,
  healthCheck: () => healthCheck,
  optimizeQuery: () => optimizeQuery,
  query: () => query,
  retrieve: () => retrieve,
  sanitizeQuery: () => sanitizeQuery,
  store: () => store,
  validateDataId: () => validateDataId,
  validateSchema: () => validateSchema
});
module.exports = __toCommonJS(src_exports);

// src/types.ts
var WalrusDataError = class extends Error {
  constructor(message, code, details, statusCode, retryable = false) {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
    this.details = details;
    this.statusCode = statusCode;
    this.retryable = retryable;
  }
};
var WalrusNetworkError = class extends WalrusDataError {
  constructor(message, details) {
    super(message, "NETWORK_ERROR", details, void 0, true);
  }
};
var WalrusValidationError = class extends WalrusDataError {
  constructor(message, details) {
    super(message, "VALIDATION_ERROR", details, 400);
  }
};
var WalrusNotFoundError = class extends WalrusDataError {
  constructor(message, details) {
    super(message, "NOT_FOUND", details, 404);
  }
};
var WalrusStorageError = class extends WalrusDataError {
  constructor(message, details) {
    super(message, "STORAGE_ERROR", details, void 0, true);
  }
};
var WalrusIndexError = class extends WalrusDataError {
  constructor(message, details) {
    super(message, "INDEX_ERROR", details, void 0, true);
  }
};

// src/client.ts
var SimpleWalrusClient = class {
  constructor(publisherUrl, aggregatorUrl) {
    this.publisherUrl = publisherUrl;
    this.aggregatorUrl = aggregatorUrl;
  }
  async store(options) {
    try {
      const body = options.data instanceof Buffer ? new Uint8Array(options.data) : options.data;
      const response = await fetch(`${this.publisherUrl}/v1/store?epochs=${options.epochs}`, {
        method: "PUT",
        body,
        headers: {
          "Content-Type": "application/octet-stream"
        }
      });
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      const result = await response.json();
      return {
        blobId: result.alreadyCertified?.blobId || result.newlyCreated?.blobObject?.blobId || "unknown",
        encodedSize: result.alreadyCertified?.encodedSize || result.newlyCreated?.encodedSize || 0,
        cost: "0"
        // Simplified for now
      };
    } catch (error) {
      throw new Error(`Walrus store failed: ${error}`);
    }
  }
  async retrieve(blobId) {
    try {
      const response = await fetch(`${this.aggregatorUrl}/v1/${blobId}`);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      const data = await response.arrayBuffer();
      return { data };
    } catch (error) {
      throw new Error(`Walrus retrieve failed: ${error}`);
    }
  }
};
var DEFAULT_CONFIG = {
  publisherUrl: "https://publisher.walrus-testnet.walrus.space",
  aggregatorUrl: "https://aggregator.walrus-testnet.walrus.space",
  timeout: 3e4,
  retries: 3,
  retryDelay: 1e3,
  userAgent: "walrus-data-sdk/2.0.0",
  maxBlobSize: 10 * 1024 * 1024,
  // 10MB
  defaultEpochs: 5
};
var MemoryCache = class {
  constructor(maxSize = 1e3) {
    this.cache = /* @__PURE__ */ new Map();
    this.maxSize = maxSize;
  }
  async get(key) {
    const item = this.cache.get(key);
    if (!item)
      return null;
    if (Date.now() > item.expires) {
      this.cache.delete(key);
      return null;
    }
    return item.value;
  }
  async set(key, value, ttl = 3e5) {
    if (this.cache.size >= this.maxSize) {
      const firstKey = this.cache.keys().next().value;
      if (firstKey)
        this.cache.delete(firstKey);
    }
    this.cache.set(key, {
      value,
      expires: Date.now() + ttl
    });
  }
  async delete(key) {
    this.cache.delete(key);
  }
  async clear() {
    this.cache.clear();
  }
  async size() {
    return this.cache.size;
  }
  async keys() {
    return Array.from(this.cache.keys());
  }
};
var WalrusDataClient = class {
  constructor(options = {}) {
    this.requestCounter = 0;
    this.indexes = /* @__PURE__ */ new Map();
    this.schemas = /* @__PURE__ */ new Map();
    this.eventHandlers = /* @__PURE__ */ new Map();
    this.metrics = {
      requestCount: 0,
      avgResponseTime: 0,
      errorRate: 0,
      cacheHitRate: 0,
      storageLatency: 0,
      retrievalLatency: 0,
      indexQueryTime: 0,
      throughput: 0
    };
    this.requestsInLastSecond = 0;
    this.config = {
      ...DEFAULT_CONFIG,
      ...options
    };
    this.walrusClient = new SimpleWalrusClient(
      this.config.publisherUrl,
      this.config.aggregatorUrl
    );
    if (options.enableCaching !== false) {
      this.cache = new MemoryCache();
    }
    console.log("Walrus Data SDK v2.0.0 initialized with HTTP Walrus client");
  }
  /**
   * Store structured data on Walrus with indexing
   */
  async store(data, options = {}) {
    const startTime = Date.now();
    try {
      this.validateStoreOptions(options);
      const dataId = this.generateDataId();
      const now = /* @__PURE__ */ new Date();
      const dataItem = {
        id: dataId,
        blobId: "",
        // Will be set after storage
        data,
        metadata: {
          created: now,
          updated: now,
          version: 1,
          size: 0,
          // Will be calculated
          contentType: options.metadata?.contentType || "application/json",
          author: options.metadata?.author,
          signature: options.metadata?.signature,
          indexes: options.customIndexes,
          ...options.metadata
        },
        contentHash: "",
        schema: options.schema,
        tags: options.tags,
        categories: options.categories
      };
      const serializedData = JSON.stringify(dataItem);
      const dataBuffer = Buffer.from(serializedData, "utf-8");
      dataItem.metadata.size = dataBuffer.length;
      dataItem.contentHash = this.generateContentHash(serializedData);
      if (dataBuffer.length > this.config.maxBlobSize) {
        throw new WalrusValidationError(
          `Data too large: ${dataBuffer.length} bytes (max: ${this.config.maxBlobSize})`
        );
      }
      const storeResult = await this.walrusClient.store({
        data: dataBuffer,
        epochs: options.epochs || this.config.defaultEpochs
      });
      dataItem.blobId = storeResult.blobId;
      if (this.cache) {
        await this.cache.set(`data:${dataId}`, dataItem);
        await this.cache.set(`blob:${storeResult.blobId}`, dataItem);
      }
      if (options.enableIndexing !== false) {
        await this.updateIndexes(dataItem);
      }
      const responseTime = Date.now() - startTime;
      this.updateMetrics(responseTime, false, "store");
      this.emitEvent({
        type: "created",
        dataId,
        blobId: storeResult.blobId,
        data: dataItem,
        timestamp: now
      });
      return {
        blobId: storeResult.blobId,
        dataId,
        size: dataBuffer.length,
        encodedSize: storeResult.encodedSize,
        cost: storeResult.cost.toString(),
        metadata: dataItem.metadata
      };
    } catch (error) {
      const responseTime = Date.now() - startTime;
      this.updateMetrics(responseTime, true, "store");
      if (error instanceof WalrusDataError) {
        throw error;
      }
      throw new WalrusStorageError(`Failed to store data: ${error}`);
    }
  }
  /**
   * Retrieve data by ID or blob ID
   */
  async retrieve(id, isBlob = false) {
    const startTime = Date.now();
    let cached = false;
    try {
      if (this.cache) {
        const cacheKey = isBlob ? `blob:${id}` : `data:${id}`;
        const cachedItem = await this.cache.get(cacheKey);
        if (cachedItem) {
          cached = true;
          this.updateCacheMetrics(true);
          return {
            item: cachedItem,
            cached: true,
            retrievalTime: Date.now() - startTime
          };
        }
        this.updateCacheMetrics(false);
      }
      let blobId = isBlob ? id : await this.lookupBlobId(id);
      if (!blobId) {
        throw new WalrusNotFoundError(`Data item with ID '${id}' not found`);
      }
      const retrieveResult = await this.walrusClient.retrieve(blobId);
      const serializedData = new TextDecoder().decode(retrieveResult.data);
      const dataItem = JSON.parse(serializedData);
      const expectedHash = this.generateContentHash(serializedData);
      if (dataItem.contentHash !== expectedHash) {
        throw new WalrusStorageError("Data integrity check failed");
      }
      if (this.cache) {
        await this.cache.set(`data:${dataItem.id}`, dataItem);
        await this.cache.set(`blob:${blobId}`, dataItem);
      }
      const responseTime = Date.now() - startTime;
      this.updateMetrics(responseTime, false, "retrieve");
      return {
        item: dataItem,
        cached,
        retrievalTime: responseTime
      };
    } catch (error) {
      const responseTime = Date.now() - startTime;
      this.updateMetrics(responseTime, true, "retrieve");
      if (error instanceof WalrusDataError) {
        throw error;
      }
      throw new WalrusNetworkError(`Failed to retrieve data: ${error}`);
    }
  }
  /**
   * Query data with O(1) indexed lookups when possible
   */
  async query(query2) {
    const startTime = Date.now();
    try {
      this.validateQuery(query2);
      const indexResult = await this.tryIndexedQuery(query2);
      if (indexResult) {
        const queryTime = Date.now() - startTime;
        this.updateMetrics(queryTime, false, "query");
        return {
          ...indexResult,
          queryTime
        };
      }
      return await this.fullScanQuery(query2, startTime);
    } catch (error) {
      const queryTime = Date.now() - startTime;
      this.updateMetrics(queryTime, true, "query");
      throw error;
    }
  }
  /**
   * Get multiple items in bulk
   */
  async getBulk(query2) {
    const startTime = Date.now();
    const results = [];
    const errors = [];
    try {
      let idsToFetch = [];
      if (query2.dataIds) {
        idsToFetch = query2.dataIds;
      } else if (query2.blobIds) {
        idsToFetch = query2.blobIds;
      } else if (query2.query) {
        const queryResult = await this.query(query2.query);
        idsToFetch = queryResult.items.map((item) => item.id);
      }
      const batchSize = 10;
      for (let i = 0; i < idsToFetch.length; i += batchSize) {
        const batch = idsToFetch.slice(i, i + batchSize);
        const batchPromises = batch.map(async (id) => {
          try {
            const result = await this.retrieve(id, query2.blobIds !== void 0);
            return result.item;
          } catch (error) {
            errors.push({
              id,
              error: error instanceof Error ? error.message : String(error),
              code: error instanceof WalrusDataError ? error.code : void 0
            });
            return null;
          }
        });
        const batchResults = await Promise.all(batchPromises);
        results.push(...batchResults.filter((item) => item !== null));
      }
      const responseTime = Date.now() - startTime;
      this.updateMetrics(responseTime, false, "bulk");
      return {
        items: results,
        errors,
        totalRequested: idsToFetch.length,
        totalReturned: results.length,
        totalErrors: errors.length
      };
    } catch (error) {
      const responseTime = Date.now() - startTime;
      this.updateMetrics(responseTime, true, "bulk");
      throw error;
    }
  }
  /**
   * Get comprehensive statistics about indexed data
   */
  async getStats() {
    const startTime = Date.now();
    try {
      const stats = {
        totalItems: 0,
        totalBlobs: 0,
        totalSize: 0,
        schemas: {},
        categories: {},
        tags: {},
        authors: {},
        indexLastUpdated: (/* @__PURE__ */ new Date()).toISOString(),
        indexSize: 0
      };
      if (this.cache) {
        const keys = await this.cache.keys();
        const dataKeys = keys.filter((key) => key.startsWith("data:"));
        stats.totalItems = dataKeys.length;
        for (const key of dataKeys.slice(0, 100)) {
          const item = await this.cache.get(key);
          if (item) {
            stats.totalSize += item.metadata.size;
            if (item.schema) {
              stats.schemas[item.schema] = (stats.schemas[item.schema] || 0) + 1;
            }
            if (item.categories) {
              item.categories.forEach((cat) => {
                stats.categories[cat] = (stats.categories[cat] || 0) + 1;
              });
            }
            if (item.tags) {
              item.tags.forEach((tag) => {
                stats.tags[tag] = (stats.tags[tag] || 0) + 1;
              });
            }
            if (item.metadata.author) {
              stats.authors[item.metadata.author] = (stats.authors[item.metadata.author] || 0) + 1;
            }
          }
        }
      }
      const responseTime = Date.now() - startTime;
      this.updateMetrics(responseTime, false, "stats");
      return stats;
    } catch (error) {
      const responseTime = Date.now() - startTime;
      this.updateMetrics(responseTime, true, "stats");
      throw new WalrusIndexError(`Failed to get stats: ${error}`);
    }
  }
  /**
   * Health check for Walrus network and indexing
   */
  async healthCheck() {
    const startTime = Date.now();
    try {
      const publisherTest = await this.testEndpoint(this.config.publisherUrl);
      const aggregatorTest = await this.testEndpoint(this.config.aggregatorUrl);
      const status = publisherTest && aggregatorTest ? "healthy" : "degraded";
      const health = {
        status,
        version: "2.0.0",
        uptime: Date.now() - startTime,
        walrusStatus: {
          available: publisherTest && aggregatorTest,
          publisherLatency: publisherTest ? 100 : -1,
          // Mock values
          aggregatorLatency: aggregatorTest ? 100 : -1,
          nodes: publisherTest && aggregatorTest ? 1 : 0
        },
        indexStatus: {
          available: true,
          lastSync: (/* @__PURE__ */ new Date()).toISOString(),
          items: 0,
          // Would be populated by real index
          syncLag: 0
        },
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      };
      if (this.cache) {
        const cacheSize = await this.cache.size();
        health.cacheStatus = {
          available: true,
          hitRate: this.metrics.cacheHitRate,
          size: cacheSize,
          maxSize: 1e3
          // Default cache size
        };
      }
      return health;
    } catch (error) {
      return {
        status: "unhealthy",
        version: "2.0.0",
        uptime: Date.now() - startTime,
        walrusStatus: {
          available: false,
          publisherLatency: -1,
          aggregatorLatency: -1,
          nodes: 0
        },
        indexStatus: {
          available: false,
          lastSync: (/* @__PURE__ */ new Date()).toISOString(),
          items: 0,
          syncLag: -1
        },
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      };
    }
  }
  /**
   * Get SDK metrics
   */
  getMetrics() {
    return { ...this.metrics };
  }
  /**
   * Reset metrics
   */
  resetMetrics() {
    this.metrics = {
      requestCount: 0,
      avgResponseTime: 0,
      errorRate: 0,
      cacheHitRate: 0,
      storageLatency: 0,
      retrievalLatency: 0,
      indexQueryTime: 0,
      throughput: 0
    };
  }
  /**
   * Subscribe to real-time data events
   */
  subscribe(callback, options = {}) {
    const subscriptionId = `sub-${Date.now()}-${Math.random()}`;
    if (!this.eventHandlers.has("all")) {
      this.eventHandlers.set("all", []);
    }
    this.eventHandlers.get("all").push(callback);
    return subscriptionId;
  }
  /**
   * Unsubscribe from events
   */
  unsubscribe(subscriptionId) {
    this.eventHandlers.clear();
  }
  // Private methods
  validateStoreOptions(options) {
    if (options.epochs && (options.epochs < 1 || options.epochs > 100)) {
      throw new WalrusValidationError("Epochs must be between 1 and 100");
    }
  }
  validateQuery(query2) {
    if (query2.limit && (query2.limit < 1 || query2.limit > 1e3)) {
      throw new WalrusValidationError("Limit must be between 1 and 1000");
    }
    if (query2.offset && query2.offset < 0) {
      throw new WalrusValidationError("Offset must be non-negative");
    }
  }
  generateDataId() {
    return `data-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
  generateContentHash(content) {
    let hash = 0;
    for (let i = 0; i < content.length; i++) {
      const char = content.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash;
    }
    return Math.abs(hash).toString(16);
  }
  async lookupBlobId(dataId) {
    if (this.cache) {
      const item = await this.cache.get(`data:${dataId}`);
      return item?.blobId || null;
    }
    return null;
  }
  async updateIndexes(dataItem) {
    console.log(`Indexing data item: ${dataItem.id}`);
  }
  async tryIndexedQuery(query2) {
    return null;
  }
  async fullScanQuery(query2, startTime) {
    const items = [];
    if (this.cache) {
      const keys = await this.cache.keys();
      const dataKeys = keys.filter((key) => key.startsWith("data:"));
      for (const key of dataKeys) {
        const item = await this.cache.get(key);
        if (item && this.matchesQuery(item, query2)) {
          items.push(item);
        }
      }
    }
    if (query2.sortBy) {
      items.sort((a, b) => {
        let aVal, bVal;
        switch (query2.sortBy) {
          case "created":
            aVal = new Date(a.metadata.created);
            bVal = new Date(b.metadata.created);
            break;
          case "updated":
            aVal = new Date(a.metadata.updated);
            bVal = new Date(b.metadata.updated);
            break;
          case "size":
            aVal = a.metadata.size;
            bVal = b.metadata.size;
            break;
          default:
            return 0;
        }
        if (query2.sortOrder === "desc") {
          return aVal > bVal ? -1 : aVal < bVal ? 1 : 0;
        } else {
          return aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
        }
      });
    }
    const offset = query2.offset || 0;
    const limit = query2.limit || 100;
    const paginatedItems = items.slice(offset, offset + limit);
    return {
      items: paginatedItems,
      totalCount: items.length,
      queryTime: Date.now() - startTime,
      hasMore: items.length > offset + limit,
      nextOffset: items.length > offset + limit ? offset + limit : void 0
    };
  }
  matchesQuery(item, query2) {
    if (query2.schema) {
      const schemas = Array.isArray(query2.schema) ? query2.schema : [query2.schema];
      if (item.schema && !schemas.includes(item.schema)) {
        return false;
      }
    }
    if (query2.tags && query2.tags.length > 0) {
      if (!item.tags || !query2.tags.some((tag) => item.tags.includes(tag))) {
        return false;
      }
    }
    if (query2.categories && query2.categories.length > 0) {
      if (!item.categories || !query2.categories.some((cat) => item.categories.includes(cat))) {
        return false;
      }
    }
    if (query2.dateRange) {
      const itemDate = new Date(item.metadata.created);
      if (query2.dateRange.from && itemDate < query2.dateRange.from) {
        return false;
      }
      if (query2.dateRange.to && itemDate > query2.dateRange.to) {
        return false;
      }
    }
    if (query2.author) {
      const authors = Array.isArray(query2.author) ? query2.author : [query2.author];
      if (!item.metadata.author || !authors.includes(item.metadata.author)) {
        return false;
      }
    }
    if (query2.customFilters && !query2.customFilters(item)) {
      return false;
    }
    return true;
  }
  async testEndpoint(url) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5e3);
      const response = await fetch(`${url}/health`, {
        method: "GET",
        signal: controller.signal
      });
      clearTimeout(timeoutId);
      return response.ok;
    } catch {
      return false;
    }
  }
  updateMetrics(responseTime, isError, operation) {
    this.metrics.requestCount++;
    this.metrics.avgResponseTime = (this.metrics.avgResponseTime + responseTime) / 2;
    if (isError) {
      this.metrics.errorRate = (this.metrics.errorRate * (this.metrics.requestCount - 1) + 1) / this.metrics.requestCount;
    } else {
      this.metrics.errorRate = this.metrics.errorRate * (this.metrics.requestCount - 1) / this.metrics.requestCount;
    }
    switch (operation) {
      case "store":
        this.metrics.storageLatency = (this.metrics.storageLatency + responseTime) / 2;
        break;
      case "retrieve":
        this.metrics.retrievalLatency = (this.metrics.retrievalLatency + responseTime) / 2;
        break;
      case "query":
        this.metrics.indexQueryTime = (this.metrics.indexQueryTime + responseTime) / 2;
        break;
    }
    const now = Date.now();
    if (!this.lastThroughputUpdate) {
      this.lastThroughputUpdate = now;
      this.requestsInLastSecond = 1;
    } else if (now - this.lastThroughputUpdate >= 1e3) {
      this.metrics.throughput = this.requestsInLastSecond / ((now - this.lastThroughputUpdate) / 1e3);
      this.lastThroughputUpdate = now;
      this.requestsInLastSecond = 1;
    } else {
      this.requestsInLastSecond++;
    }
  }
  updateCacheMetrics(hit) {
    const totalCacheAttempts = this.metrics.cacheHitRate * this.metrics.requestCount + 1;
    const totalHits = hit ? this.metrics.cacheHitRate * this.metrics.requestCount + 1 : this.metrics.cacheHitRate * this.metrics.requestCount;
    this.metrics.cacheHitRate = totalHits / totalCacheAttempts;
  }
  emitEvent(event) {
    const handlers = this.eventHandlers.get("all") || [];
    handlers.forEach((handler) => {
      try {
        handler(event);
      } catch (error) {
        console.error("Error in event handler:", error);
      }
    });
  }
};

// src/utils.ts
function validateDataId(dataId) {
  if (!dataId || typeof dataId !== "string") {
    return false;
  }
  return /^[a-zA-Z0-9_-]{3,}$/.test(dataId);
}
function sanitizeQuery(query2) {
  const sanitized = {};
  if (query2.schema) {
    if (Array.isArray(query2.schema)) {
      sanitized.schema = query2.schema.filter((schema) => schema && typeof schema === "string").map((schema) => schema.trim()).filter((schema) => schema.length > 0);
    } else if (typeof query2.schema === "string" && query2.schema.trim().length > 0) {
      sanitized.schema = query2.schema.trim();
    }
  }
  if (query2.tags) {
    sanitized.tags = query2.tags.filter((tag) => tag && typeof tag === "string").map((tag) => tag.trim().toLowerCase()).filter((tag) => tag.length > 0);
  }
  if (query2.categories) {
    sanitized.categories = query2.categories.filter((category) => category && typeof category === "string").map((category) => category.trim().toLowerCase()).filter((category) => category.length > 0);
  }
  if (query2.author) {
    if (Array.isArray(query2.author)) {
      sanitized.author = query2.author.filter((author) => author && typeof author === "string").map((author) => author.trim()).filter((author) => author.length > 0);
    } else if (typeof query2.author === "string" && query2.author.trim().length > 0) {
      sanitized.author = query2.author.trim();
    }
  }
  if (query2.contentType) {
    if (Array.isArray(query2.contentType)) {
      sanitized.contentType = query2.contentType.filter((type) => type && typeof type === "string").map((type) => type.trim().toLowerCase());
    } else if (typeof query2.contentType === "string" && query2.contentType.trim().length > 0) {
      sanitized.contentType = query2.contentType.trim().toLowerCase();
    }
  }
  if (query2.dateRange) {
    sanitized.dateRange = {};
    if (query2.dateRange.from instanceof Date) {
      sanitized.dateRange.from = query2.dateRange.from;
    }
    if (query2.dateRange.to instanceof Date) {
      sanitized.dateRange.to = query2.dateRange.to;
    }
  }
  if (query2.limit !== void 0) {
    sanitized.limit = Math.max(1, Math.min(1e3, Math.floor(query2.limit)));
  }
  if (query2.offset !== void 0) {
    sanitized.offset = Math.max(0, Math.floor(query2.offset));
  }
  if (query2.sortBy) {
    const validSortFields = ["created", "updated", "size", "relevance"];
    if (validSortFields.includes(query2.sortBy)) {
      sanitized.sortBy = query2.sortBy;
    }
  }
  if (query2.sortOrder) {
    if (["asc", "desc"].includes(query2.sortOrder)) {
      sanitized.sortOrder = query2.sortOrder;
    }
  }
  if (query2.fieldQueries) {
    sanitized.fieldQueries = query2.fieldQueries.filter((fq) => fq && typeof fq === "object" && fq.field && fq.value !== void 0).map((fq) => ({
      field: String(fq.field).trim(),
      value: fq.value,
      operator: ["eq", "ne", "lt", "le", "gt", "ge", "in", "contains", "startsWith", "endsWith"].includes(fq.operator) ? fq.operator : "eq"
    })).filter((fq) => fq.field.length > 0);
  }
  if (query2.fullTextSearch && typeof query2.fullTextSearch === "string") {
    sanitized.fullTextSearch = query2.fullTextSearch.trim();
  }
  if (query2.includeData !== void 0) {
    sanitized.includeData = Boolean(query2.includeData);
  }
  if (typeof query2.customFilters === "function") {
    sanitized.customFilters = query2.customFilters;
  }
  return sanitized;
}
function generateSchema(sampleData, schemaId, schemaName) {
  if (!Array.isArray(sampleData) || sampleData.length === 0) {
    throw new WalrusValidationError("Sample data must be a non-empty array");
  }
  const schema = {
    id: schemaId,
    version: "1.0.0",
    name: schemaName || schemaId,
    description: `Auto-generated schema from ${sampleData.length} samples`,
    properties: {},
    indexes: [],
    examples: sampleData.slice(0, 3)
    // Include up to 3 examples
  };
  const propertyStats = /* @__PURE__ */ new Map();
  sampleData.forEach((sample) => {
    if (sample && typeof sample === "object") {
      Object.keys(sample).forEach((key) => {
        const value = sample[key];
        const type = inferType(value);
        if (!propertyStats.has(key)) {
          propertyStats.set(key, /* @__PURE__ */ new Map());
        }
        const typeStats = propertyStats.get(key);
        typeStats.set(type, (typeStats.get(type) || 0) + 1);
      });
    }
  });
  propertyStats.forEach((typeStats, key) => {
    const mostCommonType = Array.from(typeStats.entries()).sort((a, b) => b[1] - a[1])[0][0];
    const totalOccurrences = Array.from(typeStats.values()).reduce((sum, count) => sum + count, 0);
    const isRequired = totalOccurrences === sampleData.length;
    const shouldIndex = key.toLowerCase().includes("id") || key.toLowerCase().includes("time") || key.toLowerCase().includes("date") || mostCommonType === "string" && totalOccurrences > sampleData.length * 0.8;
    const shouldSearch = mostCommonType === "string" && (key.toLowerCase().includes("name") || key.toLowerCase().includes("title") || key.toLowerCase().includes("description") || key.toLowerCase().includes("content"));
    schema.properties[key] = {
      type: mostCommonType,
      required: isRequired,
      indexed: shouldIndex,
      searchable: shouldSearch
    };
  });
  const indexableFields = Object.keys(schema.properties).filter((key) => schema.properties[key].indexed);
  if (indexableFields.length > 0) {
    indexableFields.forEach((field) => {
      schema.indexes.push({
        name: `idx_${field}`,
        type: "btree",
        fields: [field],
        unique: field.toLowerCase().includes("id")
      });
    });
    if (indexableFields.length >= 2) {
      schema.indexes.push({
        name: "idx_compound",
        type: "btree",
        fields: indexableFields.slice(0, 3),
        // Up to 3 fields
        unique: false
      });
    }
  }
  const searchableFields = Object.keys(schema.properties).filter((key) => schema.properties[key].searchable);
  if (searchableFields.length > 0) {
    schema.indexes.push({
      name: "idx_fulltext",
      type: "fulltext",
      fields: searchableFields,
      unique: false
    });
  }
  return schema;
}
function validateSchema(data, schema) {
  if (!data || typeof data !== "object") {
    return false;
  }
  const dataObj = data;
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
      if (property.validate && !property.validate(value)) {
        throw new WalrusValidationError(`Property '${key}' failed custom validation`);
      }
    }
  }
  return true;
}
function createIndex(name, fields, options = {}) {
  if (!name || !Array.isArray(fields) || fields.length === 0) {
    throw new WalrusValidationError("Index name and fields are required");
  }
  return {
    name: name.toLowerCase().replace(/[^a-z0-9_]/g, "_"),
    type: options.type || (fields.length === 1 ? "btree" : "btree"),
    fields: fields.filter((field) => field && typeof field === "string"),
    unique: options.unique || false,
    sparse: options.sparse || false,
    options: { ...options, type: void 0, unique: void 0, sparse: void 0 }
  };
}
function optimizeQuery(query2) {
  const optimized = { ...sanitizeQuery(query2) };
  if (!optimized.limit || optimized.limit > 100) {
    optimized.limit = 100;
  }
  if (!optimized.sortBy || optimized.sortBy === "relevance") {
    optimized.sortBy = "created";
    optimized.sortOrder = "desc";
  }
  if (optimized.fieldQueries) {
    optimized.fieldQueries.sort((a, b) => {
      if (a.operator === "eq" && b.operator !== "eq")
        return -1;
      if (b.operator === "eq" && a.operator !== "eq")
        return 1;
      if (["lt", "le", "gt", "ge"].includes(a.operator) && !["lt", "le", "gt", "ge", "eq"].includes(b.operator))
        return -1;
      if (["lt", "le", "gt", "ge"].includes(b.operator) && !["lt", "le", "gt", "ge", "eq"].includes(a.operator))
        return 1;
      return 0;
    });
  }
  if (optimized.dateRange) {
    if (optimized.dateRange.from && optimized.dateRange.to && optimized.dateRange.from > optimized.dateRange.to) {
      [optimized.dateRange.from, optimized.dateRange.to] = [optimized.dateRange.to, optimized.dateRange.from];
    }
  }
  return optimized;
}
function inferType(value) {
  if (value === null || value === void 0) {
    return "string";
  }
  if (Array.isArray(value)) {
    return "array";
  }
  if (value instanceof Date) {
    return "date";
  }
  if (typeof value === "string") {
    if (/^\d{4}-\d{2}-\d{2}/.test(value) || !isNaN(Date.parse(value))) {
      const date = new Date(value);
      if (date.toString() !== "Invalid Date") {
        return "date";
      }
    }
    return "string";
  }
  if (typeof value === "number") {
    return "number";
  }
  if (typeof value === "boolean") {
    return "boolean";
  }
  if (typeof value === "object") {
    return "object";
  }
  return "string";
}

// src/index.ts
var DEFAULT_CONFIG2 = {
  publisherUrl: "https://publisher.walrus-testnet.walrus.space",
  aggregatorUrl: "https://aggregator.walrus-testnet.walrus.space",
  timeout: 3e4,
  retries: 3,
  retryDelay: 1e3,
  userAgent: "walrus-data-sdk/2.0.0",
  maxBlobSize: 10 * 1024 * 1024,
  // 10MB
  defaultEpochs: 5
};
function createClient(options) {
  return new WalrusDataClient(options);
}
function createOptimizedClient(useCase, options) {
  let optimizedOptions;
  switch (useCase) {
    case "high-throughput":
      optimizedOptions = {
        timeout: 6e4,
        retries: 1,
        enableCaching: true,
        cacheTimeout: 6e5,
        // 10 minutes
        ...options
      };
      break;
    case "low-latency":
      optimizedOptions = {
        timeout: 5e3,
        retries: 0,
        enableCaching: true,
        cacheTimeout: 6e4,
        // 1 minute
        ...options
      };
      break;
    case "large-data":
      optimizedOptions = {
        timeout: 3e5,
        // 5 minutes
        maxBlobSize: 50 * 1024 * 1024,
        // 50MB
        retries: 5,
        retryDelay: 2e3,
        ...options
      };
      break;
    case "real-time":
      optimizedOptions = {
        timeout: 1e4,
        retries: 2,
        enableCaching: false,
        // Always get fresh data
        ...options
      };
      break;
    default:
      optimizedOptions = options || {};
  }
  return new WalrusDataClient(optimizedOptions);
}
var VERSION = "2.0.0";
var API_VERSION = "v2";
async function store(data, options) {
  const client = createClient(options);
  return client.store(data, options);
}
async function retrieve(id, isBlob = false, options) {
  const client = createClient(options);
  return client.retrieve(id, isBlob);
}
async function query(query2, options) {
  const client = createClient(options);
  return client.query(query2);
}
async function healthCheck(options) {
  const client = createClient(options);
  return client.healthCheck();
}
async function getStats(options) {
  const client = createClient(options);
  return client.getStats();
}
var WalrusKVStore = class {
  constructor(options) {
    this.client = createClient(options);
  }
  async set(key, value) {
    const result = await this.client.store({ key, value }, {
      schema: "kv-store",
      categories: ["key-value"]
    });
    return result.dataId;
  }
  async get(key) {
    try {
      const results = await this.client.query({
        schema: ["kv-store"],
        fieldQueries: [{ field: "key", value: key, operator: "eq" }],
        limit: 1
      });
      return results.items.length > 0 ? results.items[0].data.value : null;
    } catch (error) {
      return null;
    }
  }
  async delete(key) {
    const results = await this.client.query({
      schema: ["kv-store"],
      fieldQueries: [{ field: "key", value: key, operator: "eq" }],
      limit: 1
    });
    if (results.items.length > 0) {
      await this.client.store({
        key,
        value: null,
        deleted: true,
        deletedAt: /* @__PURE__ */ new Date()
      }, {
        schema: "kv-store",
        categories: ["key-value", "deleted"]
      });
      return true;
    }
    return false;
  }
  async exists(key) {
    const results = await this.client.query({
      schema: ["kv-store"],
      fieldQueries: [{ field: "key", value: key, operator: "eq" }],
      limit: 1
    });
    return results.items.length > 0;
  }
  async keys(pattern) {
    const results = await this.client.query({
      schema: ["kv-store"],
      limit: 1e3
    });
    let keys = results.items.map((item) => item.data.key);
    if (pattern) {
      const regex = new RegExp(pattern.replace(/\*/g, ".*"));
      keys = keys.filter((key) => regex.test(key));
    }
    return keys;
  }
};
var WalrusDocumentStore = class {
  constructor(collection, options) {
    this.client = createClient(options);
    this.collection = collection;
  }
  async insert(document2, id) {
    const result = await this.client.store(document2, {
      schema: `document-${this.collection}`,
      categories: ["document", this.collection],
      metadata: id ? { contentType: "application/json" } : void 0
    });
    return result.dataId;
  }
  async find(query2 = {}) {
    const results = await this.client.query({
      ...query2,
      schema: [`document-${this.collection}`],
      categories: ["document", this.collection]
    });
    return results.items.map((item) => item.data);
  }
  async findOne(query2 = {}) {
    const results = await this.find({ ...query2, limit: 1 });
    return results.length > 0 ? results[0] : null;
  }
  async count(query2 = {}) {
    const results = await this.client.query({
      ...query2,
      schema: [`document-${this.collection}`],
      categories: ["document", this.collection],
      includeData: false,
      limit: 0
    });
    return results.totalCount;
  }
};
function createStores(options) {
  return {
    kv: (name = "default") => new WalrusKVStore({ ...options }),
    documents: (collection) => new WalrusDocumentStore(collection, options),
    client: createClient(options)
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  API_VERSION,
  DEFAULT_CONFIG,
  DocumentStore,
  KVStore,
  VERSION,
  WalrusDataClient,
  WalrusDocumentStore,
  WalrusKVStore,
  createClient,
  createIndex,
  createOptimizedClient,
  createStores,
  generateSchema,
  getStats,
  healthCheck,
  optimizeQuery,
  query,
  retrieve,
  sanitizeQuery,
  store,
  validateDataId,
  validateSchema
});

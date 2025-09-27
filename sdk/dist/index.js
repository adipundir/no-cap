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
  DEFAULT_CONFIG: () => DEFAULT_CONFIG,
  NOCAPClient: () => NOCAPClient,
  VERSION: () => VERSION,
  createClient: () => createClient,
  getFact: () => getFact,
  getFacts: () => getFacts,
  healthCheck: () => healthCheck,
  sanitizeSearchQuery: () => sanitizeSearchQuery,
  searchFacts: () => searchFacts,
  validateFactId: () => validateFactId
});
module.exports = __toCommonJS(src_exports);

// src/types.ts
var NOCAPError = class extends Error {
  constructor(message, code, details, statusCode) {
    super(message);
    this.name = "NOCAPError";
    this.code = code;
    this.details = details;
    this.statusCode = statusCode;
  }
};
var NOCAPNetworkError = class extends NOCAPError {
  constructor(message, details) {
    super(message, "NETWORK_ERROR", details);
  }
};
var NOCAPValidationError = class extends NOCAPError {
  constructor(message, details) {
    super(message, "VALIDATION_ERROR", details, 400);
  }
};
var NOCAPNotFoundError = class extends NOCAPError {
  constructor(message, details) {
    super(message, "NOT_FOUND", details, 404);
  }
};
var NOCAPRateLimitError = class extends NOCAPError {
  constructor(message, details) {
    super(message, "RATE_LIMIT", details, 429);
  }
};

// src/client.ts
var NOCAPClient = class {
  constructor(options = {}) {
    this.requestCounter = 0;
    this.metrics = {
      requestCount: 0,
      avgResponseTime: 0,
      errorRate: 0,
      cacheHitRate: 0,
      walrusLatency: 0
    };
    this.config = {
      apiUrl: options.apiUrl || "https://nocap.app/api",
      timeout: options.timeout || 3e4,
      retries: options.retries || 3,
      retryDelay: options.retryDelay || 1e3,
      userAgent: options.userAgent || "nocap-sdk/1.0.0"
    };
  }
  /**
   * Get all facts with optional pagination
   */
  async getFacts(options) {
    const startTime = Date.now();
    try {
      const params = new URLSearchParams();
      if (options?.limit)
        params.append("limit", options.limit.toString());
      if (options?.offset)
        params.append("offset", options.offset.toString());
      const response = await this.makeRequest(`/facts?${params}`);
      const responseTime = Date.now() - startTime;
      this.updateMetrics(responseTime, false);
      return {
        data: response.facts || [],
        totalCount: response.totalCount || 0,
        limit: options?.limit || 10,
        offset: options?.offset || 0,
        hasMore: (response.facts?.length || 0) === (options?.limit || 10)
      };
    } catch (error) {
      const responseTime = Date.now() - startTime;
      this.updateMetrics(responseTime, true);
      throw error;
    }
  }
  /**
   * Get a specific fact by ID
   */
  async getFact(factId) {
    if (!factId || typeof factId !== "string") {
      throw new NOCAPValidationError("Fact ID is required and must be a string");
    }
    const startTime = Date.now();
    try {
      const response = await this.makeRequest(`/facts/${encodeURIComponent(factId)}`);
      const responseTime = Date.now() - startTime;
      this.updateMetrics(responseTime, false);
      if (!response.fact) {
        throw new NOCAPNotFoundError(`Fact with ID '${factId}' not found`);
      }
      return {
        ...response.fact,
        fullContent: response.fullContent,
        sources: response.sources || [],
        tags: response.fact.metadata?.tags?.map(
          (tag) => typeof tag === "string" ? { name: tag, category: "type" } : tag
        ) || [],
        keywords: this.extractKeywords(response.fact.title, response.fact.summary),
        blobId: response.fact.walrusBlobId || ""
      };
    } catch (error) {
      const responseTime = Date.now() - startTime;
      this.updateMetrics(responseTime, true);
      if (error instanceof NOCAPError) {
        throw error;
      }
      throw new NOCAPNetworkError(`Failed to fetch fact: ${error}`);
    }
  }
  /**
   * Search facts using indexed search
   */
  async searchFacts(query) {
    const startTime = Date.now();
    try {
      this.validateSearchQuery(query);
      const response = await this.makeRequest("/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(query)
      });
      const responseTime = Date.now() - startTime;
      this.updateMetrics(responseTime, false);
      return {
        facts: response.facts || [],
        totalCount: response.totalCount || 0,
        searchTime: response.searchTime || responseTime,
        query: response.query || query
      };
    } catch (error) {
      const responseTime = Date.now() - startTime;
      this.updateMetrics(responseTime, true);
      throw error;
    }
  }
  /**
   * Search facts by keywords (convenience method)
   */
  async searchByKeywords(keywords, options) {
    return this.searchFacts({
      keywords,
      ...options
    });
  }
  /**
   * Search facts by tags (convenience method)
   */
  async searchByTags(tags, options) {
    return this.searchFacts({
      tags,
      ...options
    });
  }
  /**
   * Get facts by author (convenience method)
   */
  async getFactsByAuthor(author, options) {
    return this.searchFacts({
      authors: [author],
      ...options
    });
  }
  /**
   * Get facts by status (convenience method)
   */
  async getFactsByStatus(status, options) {
    return this.searchFacts({
      status: [status],
      ...options
    });
  }
  /**
   * Get bulk facts by IDs
   */
  async getBulkFacts(query) {
    if (!query.factIds || !Array.isArray(query.factIds) || query.factIds.length === 0) {
      throw new NOCAPValidationError("factIds array is required and must not be empty");
    }
    if (query.factIds.length > 100) {
      throw new NOCAPValidationError("Maximum 100 fact IDs allowed per bulk request");
    }
    const startTime = Date.now();
    try {
      const response = await this.makeRequest("/facts/bulk", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(query)
      });
      const responseTime = Date.now() - startTime;
      this.updateMetrics(responseTime, false);
      return response;
    } catch (error) {
      const responseTime = Date.now() - startTime;
      this.updateMetrics(responseTime, true);
      throw error;
    }
  }
  /**
   * Get index statistics
   */
  async getIndexStats() {
    const startTime = Date.now();
    try {
      const response = await this.makeRequest("/index/stats");
      const responseTime = Date.now() - startTime;
      this.updateMetrics(responseTime, false);
      return response.stats;
    } catch (error) {
      const responseTime = Date.now() - startTime;
      this.updateMetrics(responseTime, true);
      throw error;
    }
  }
  /**
   * Health check
   */
  async healthCheck() {
    const startTime = Date.now();
    try {
      const response = await this.makeRequest("/health");
      const responseTime = Date.now() - startTime;
      this.updateMetrics(responseTime, false);
      return {
        status: response.status || "healthy",
        version: response.version || "1.0.0",
        uptime: response.uptime || 0,
        walrusStatus: response.walrusStatus || {
          available: true,
          latency: responseTime,
          nodes: 1
        },
        indexStatus: response.indexStatus || {
          available: true,
          lastSync: (/* @__PURE__ */ new Date()).toISOString(),
          facts: 0
        },
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      };
    } catch (error) {
      const responseTime = Date.now() - startTime;
      this.updateMetrics(responseTime, true);
      return {
        status: "unhealthy",
        version: "1.0.0",
        uptime: 0,
        walrusStatus: {
          available: false,
          latency: responseTime,
          nodes: 0
        },
        indexStatus: {
          available: false,
          lastSync: (/* @__PURE__ */ new Date()).toISOString(),
          facts: 0
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
   * Reset SDK metrics
   */
  resetMetrics() {
    this.metrics = {
      requestCount: 0,
      avgResponseTime: 0,
      errorRate: 0,
      cacheHitRate: 0,
      walrusLatency: 0
    };
  }
  /**
   * Update configuration
   */
  updateConfig(updates) {
    this.config = { ...this.config, ...updates };
  }
  /**
   * Get current configuration
   */
  getConfig() {
    return { ...this.config };
  }
  // Private methods
  async makeRequest(endpoint, options = {}) {
    const url = `${this.config.apiUrl}${endpoint}`;
    const requestId = `req-${++this.requestCounter}-${Date.now()}`;
    const requestOptions = {
      headers: {
        "User-Agent": this.config.userAgent,
        "X-Request-ID": requestId,
        ...options.headers
      },
      ...options
    };
    let lastError = null;
    for (let attempt = 0; attempt <= this.config.retries; attempt++) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), this.config.timeout);
        const response = await fetch(url, {
          ...requestOptions,
          signal: controller.signal
        });
        clearTimeout(timeoutId);
        if (!response.ok) {
          const errorText = await response.text();
          let errorData;
          try {
            errorData = JSON.parse(errorText);
          } catch {
            errorData = { error: errorText };
          }
          switch (response.status) {
            case 404:
              throw new NOCAPNotFoundError(errorData.error || "Resource not found", errorData);
            case 429:
              throw new NOCAPRateLimitError(errorData.error || "Rate limit exceeded", errorData);
            case 400:
              throw new NOCAPValidationError(errorData.error || "Invalid request", errorData);
            default:
              throw new NOCAPNetworkError(
                `HTTP ${response.status}: ${errorData.error || "Unknown error"}`,
                { status: response.status, ...errorData }
              );
          }
        }
        const data = await response.json();
        return data;
      } catch (error) {
        lastError = error instanceof Error ? error : new Error(String(error));
        if (error instanceof NOCAPError || attempt === this.config.retries) {
          throw error;
        }
        await new Promise((resolve) => setTimeout(resolve, this.config.retryDelay * (attempt + 1)));
      }
    }
    throw lastError || new NOCAPNetworkError("Unknown network error");
  }
  validateSearchQuery(query) {
    if (!query || typeof query !== "object") {
      throw new NOCAPValidationError("Search query must be an object");
    }
    if (query.limit && (query.limit < 1 || query.limit > 100)) {
      throw new NOCAPValidationError("Limit must be between 1 and 100");
    }
    if (query.offset && query.offset < 0) {
      throw new NOCAPValidationError("Offset must be non-negative");
    }
    if (query.keywords && (!Array.isArray(query.keywords) || query.keywords.some((k) => typeof k !== "string"))) {
      throw new NOCAPValidationError("Keywords must be an array of strings");
    }
    if (query.tags && (!Array.isArray(query.tags) || query.tags.some((t) => typeof t !== "string"))) {
      throw new NOCAPValidationError("Tags must be an array of strings");
    }
    if (query.authors && (!Array.isArray(query.authors) || query.authors.some((a) => typeof a !== "string"))) {
      throw new NOCAPValidationError("Authors must be an array of strings");
    }
    if (query.status && (!Array.isArray(query.status) || query.status.some((s) => !["verified", "review", "flagged"].includes(s)))) {
      throw new NOCAPValidationError("Status must be an array of valid status values");
    }
    if (query.dateRange) {
      if (query.dateRange.from && !(query.dateRange.from instanceof Date)) {
        throw new NOCAPValidationError("dateRange.from must be a Date object");
      }
      if (query.dateRange.to && !(query.dateRange.to instanceof Date)) {
        throw new NOCAPValidationError("dateRange.to must be a Date object");
      }
      if (query.dateRange.from && query.dateRange.to && query.dateRange.from > query.dateRange.to) {
        throw new NOCAPValidationError("dateRange.from must be before dateRange.to");
      }
    }
  }
  extractKeywords(title, summary) {
    const text = `${title} ${summary}`.toLowerCase();
    const words = text.match(/\b[a-zA-Z]{3,}\b/g) || [];
    const stopWords = /* @__PURE__ */ new Set(["the", "and", "but", "not", "are", "was", "were", "been", "have", "has", "had"]);
    return Array.from(new Set(words.filter((word) => !stopWords.has(word))));
  }
  updateMetrics(responseTime, isError) {
    this.metrics.requestCount++;
    this.metrics.avgResponseTime = (this.metrics.avgResponseTime + responseTime) / 2;
    if (isError) {
      this.metrics.errorRate = (this.metrics.errorRate * (this.metrics.requestCount - 1) + 1) / this.metrics.requestCount;
    } else {
      this.metrics.errorRate = this.metrics.errorRate * (this.metrics.requestCount - 1) / this.metrics.requestCount;
    }
  }
};

// src/utils.ts
function validateFactId(factId) {
  if (!factId || typeof factId !== "string") {
    return false;
  }
  return /^[a-zA-Z0-9_-]{3,}$/.test(factId);
}
function sanitizeSearchQuery(query) {
  const sanitized = {};
  if (query.keywords) {
    sanitized.keywords = query.keywords.filter((keyword) => keyword && typeof keyword === "string").map((keyword) => keyword.trim().toLowerCase()).filter((keyword) => keyword.length > 0);
  }
  if (query.tags) {
    sanitized.tags = query.tags.filter((tag) => tag && typeof tag === "string").map((tag) => tag.trim().toLowerCase()).filter((tag) => tag.length > 0);
  }
  if (query.authors) {
    sanitized.authors = query.authors.filter((author) => author && typeof author === "string").map((author) => author.trim()).filter((author) => author.length > 0);
  }
  if (query.status) {
    const validStatuses = ["verified", "review", "flagged"];
    sanitized.status = query.status.filter((status) => validStatuses.includes(status));
  }
  if (query.dateRange) {
    sanitized.dateRange = {};
    if (query.dateRange.from instanceof Date) {
      sanitized.dateRange.from = query.dateRange.from;
    }
    if (query.dateRange.to instanceof Date) {
      sanitized.dateRange.to = query.dateRange.to;
    }
  }
  if (query.limit) {
    sanitized.limit = Math.max(1, Math.min(100, Math.floor(query.limit)));
  }
  if (query.offset) {
    sanitized.offset = Math.max(0, Math.floor(query.offset));
  }
  return sanitized;
}

// src/index.ts
var DEFAULT_CONFIG = {
  apiUrl: "https://nocap.app/api",
  timeout: 3e4,
  retries: 3,
  retryDelay: 1e3,
  userAgent: "nocap-sdk/1.0.0"
};
function createClient(options) {
  return new NOCAPClient(options);
}
var VERSION = "1.0.0";
var API_VERSION = "v1";
async function getFacts(options) {
  const client = createClient(options);
  return client.getFacts(options);
}
async function getFact(factId, options) {
  const client = createClient(options);
  return client.getFact(factId);
}
async function searchFacts(query, options) {
  const client = createClient(options);
  return client.searchFacts(query);
}
async function healthCheck(options) {
  const client = createClient(options);
  return client.healthCheck();
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  API_VERSION,
  DEFAULT_CONFIG,
  NOCAPClient,
  VERSION,
  createClient,
  getFact,
  getFacts,
  healthCheck,
  sanitizeSearchQuery,
  searchFacts,
  validateFactId
});

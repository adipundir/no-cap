export type FactStatus = "verified" | "review" | "flagged";

export type Fact = {
  id: string;
  title: string;
  summary: string;
  status: FactStatus;
  votes: number; // total cap votes (for list display only)
  comments: number;
  author: string;
  updated: string;
  // Walrus integration fields
  walrusBlobId?: string; // Reference to full content stored in Walrus
  contentHash?: string; // Hash of the content for integrity verification
  metadata?: {
    created: Date;
    lastModified: Date;
    version: number;
    contentType: 'text/plain' | 'text/markdown' | 'text/html';
    tags?: string[];
  }; // Optional metadata when full fact is available
};

// Enhanced tagging system
export type TagCategory = "domain" | "topic" | "methodology" | "urgency" | "region" | "custom";

export type FactTag = {
  name: string;
  category: TagCategory;
  confidence?: number; // 0-1 for AI-suggested tags
  addedBy?: string; // user who added the tag
  addedAt?: Date;
};

// Extended fact type with full content for Walrus storage
export type FullFact = Fact & {
  fullContent?: string;
  sources?: string[];
  metadata: {
    author: string;
    created: Date;
    updated: Date;
    lastModified: Date;
    version: number;
    contentType: 'text/plain' | 'text/markdown' | 'text/html';
    tags: FactTag[]; // Now required and enhanced
    categories?: string[]; // Auto-generated from tags
    keywords?: string[]; // Extracted keywords for search
    language?: string;
    region?: string;
    importance?: number; // 1-10 importance score
  };
};

export type Tallies = {
  capVotes: number;
  noCapVotes: number;
  capStake: number; // reviewers stake on cap
  noCapStake: number; // reviewers stake on no cap
  posterStake: number; // fact poster stake
};

export type ContextItem = {
  id: string;
  text: string;
  votes?: number;
};

// API-specific types for developer consumption
export type FactSearchQuery = {
  tags?: string[]; // Filter by specific tags
  categories?: TagCategory[]; // Filter by tag categories
  keywords?: string; // Full-text search
  status?: FactStatus[]; // Filter by verification status
  author?: string; // Filter by author
  region?: string; // Filter by region
  minImportance?: number; // Minimum importance score
  dateRange?: {
    from: Date;
    to: Date;
  };
  limit?: number;
  offset?: number;
  sortBy?: 'relevance' | 'date' | 'votes' | 'importance';
  sortOrder?: 'asc' | 'desc';
};

export type FactSearchResponse = {
  facts: Fact[];
  totalCount: number;
  facets: {
    tags: { name: string; count: number }[];
    categories: { name: string; count: number }[];
    authors: { name: string; count: number }[];
    regions: { name: string; count: number }[];
  };
  page: {
    limit: number;
    offset: number;
    hasMore: boolean;
  };
};

export type TagAnalytics = {
  name: string;
  category: TagCategory;
  count: number;
  trend: number; // percentage change over time
  relatedTags: string[];
  averageImportance?: number;
  verificationRate?: number; // percentage of facts with this tag that are verified
};

// Developer API key and usage tracking
export type APIKey = {
  id: string;
  name: string;
  key: string;
  userId?: string;
  permissions: ('read' | 'write' | 'analytics')[];
  rateLimit: number; // requests per hour
  usage: {
    requests: number;
    lastUsed: Date;
    createdAt: Date;
  };
  active: boolean;
};



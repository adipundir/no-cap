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
  metadata?: FullFact["metadata"]; // Optional metadata when full fact is available
};

// Extended fact type with full content for Walrus storage
export type FullFact = Fact & {
  fullContent?: string;
  sources?: string[];
  metadata: {
    created: Date;
    lastModified: Date;
    version: number;
    contentType: 'text/plain' | 'text/markdown' | 'text/html';
    tags?: string[];
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



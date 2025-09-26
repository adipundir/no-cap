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



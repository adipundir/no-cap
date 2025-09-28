import type { Fact } from "@/types/fact";

// Mock voting data for facts
export interface MockVotingData {
  factId: string;
  capVotes: number;
  noCapVotes: number;
  capStake: number;
  noCapStake: number;
  posterStake: number;
  window: string;
  outcome: string;
}

export const MOCK_VOTING_DATA: MockVotingData[] = [
  {
    factId: "fact-1",
    capVotes: 847,
    noCapVotes: 400,
    capStake: 420,
    noCapStake: 180,
    posterStake: 25,
    window: "36h",
    outcome: "Pending"
  },
  {
    factId: "fact-2", 
    capVotes: 567,
    noCapVotes: 325,
    capStake: 285,
    noCapStake: 140,
    posterStake: 20,
    window: "42h",
    outcome: "Pending"
  },
  {
    factId: "fact-3",
    capVotes: 1534,
    noCapVotes: 622,
    capStake: 680,
    noCapStake: 240,
    posterStake: 35,
    window: "28h",
    outcome: "Pending"
  },
  {
    factId: "fact-4",
    capVotes: 2103,
    noCapVotes: 1318,
    capStake: 890,
    noCapStake: 450,
    posterStake: 40,
    window: "18h",
    outcome: "Pending"
  },
  {
    factId: "fact-5",
    capVotes: 1245,
    noCapVotes: 589,
    capStake: 520,
    noCapStake: 220,
    posterStake: 30,
    window: "12h",
    outcome: "Pending"
  },
  {
    factId: "fact-6",
    capVotes: 1890,
    noCapVotes: 899,
    capStake: 735,
    noCapStake: 285,
    posterStake: 32,
    window: "8h",
    outcome: "Pending"
  },
  {
    factId: "fact-7",
    capVotes: 3121,
    noCapVotes: 1441,
    capStake: 1240,
    noCapStake: 580,
    posterStake: 50,
    window: "4h",
    outcome: "Pending"
  },
  {
    factId: "fact-8",
    capVotes: 2567,
    noCapVotes: 1323,
    capStake: 980,
    noCapStake: 420,
    posterStake: 45,
    window: "2h",
    outcome: "Pending"
  }
];

export const MOCK_FACTS: Fact[] = [
  {
    id: "fact-1",
    title: "Climate Change Impact on Arctic Ice",
    summary: "Arctic sea ice is declining at a rate of 13% per decade, with significant implications for global weather patterns and sea levels.",
    status: "verified",
    votes: 1247,
    comments: 89,
    author: "Dr. Sarah Johnson",
    updated: "2 hours ago",
    walrusBlobId: "mock-climate-arctic-001",
    metadata: {
      created: new Date("2024-01-15"),
      lastModified: new Date(),
      version: 1,
      contentType: "text/plain",
      tags: ["climate", "arctic", "environment"]
    }
  },
  {
    id: "fact-2", 
    title: "Breakthrough in Quantum Computing",
    summary: "Researchers achieved a 99.9% fidelity rate in quantum error correction, marking a major milestone toward practical quantum computers.",
    status: "review",
    votes: 892,
    comments: 156,
    author: "Prof. Michael Chen",
    updated: "4 hours ago",
    walrusBlobId: "mock-quantum-breakthrough-002",
    metadata: {
      created: new Date("2024-01-14"),
      lastModified: new Date(),
      version: 1,
      contentType: "text/plain",
      tags: ["quantum", "computing", "technology"]
    }
  },
  {
    id: "fact-3",
    title: "New Species Discovery in Deep Ocean",
    summary: "Marine biologists discovered 15 new species of deep-sea creatures at depths exceeding 4,000 meters in the Pacific Ocean.",
    status: "verified",
    votes: 2156,
    comments: 234,
    author: "Dr. Elena Rodriguez",
    updated: "6 hours ago", 
    walrusBlobId: "mock-ocean-species-003",
    metadata: {
      created: new Date("2024-01-13"),
      lastModified: new Date(),
      version: 1,
      contentType: "text/plain",
      tags: ["biology", "ocean", "discovery"]
    }
  },
  {
    id: "fact-4",
    title: "AI Model Achieves Human-Level Performance",
    summary: "A new language model demonstrates human-level performance across multiple reasoning tasks, raising questions about AI capabilities.",
    status: "review",
    votes: 3421,
    comments: 567,
    author: "Dr. Alex Kumar",
    updated: "8 hours ago",
    walrusBlobId: "mock-ai-performance-004", 
    metadata: {
      created: new Date("2024-01-12"),
      lastModified: new Date(),
      version: 1,
      contentType: "text/plain",
      tags: ["ai", "machine-learning", "technology"]
    }
  },
  {
    id: "fact-5",
    title: "Revolutionary Solar Panel Efficiency",
    summary: "New perovskite-silicon tandem solar cells achieve 33.7% efficiency, potentially transforming renewable energy adoption.",
    status: "verified",
    votes: 1834,
    comments: 145,
    author: "Dr. Lisa Wang",
    updated: "12 hours ago",
    walrusBlobId: "mock-solar-efficiency-005",
    metadata: {
      created: new Date("2024-01-11"),
      lastModified: new Date(),
      version: 1,
      contentType: "text/plain",
      tags: ["renewable", "energy", "solar"]
    }
  },
  {
    id: "fact-6",
    title: "Gene Therapy Breakthrough for Blindness",
    summary: "Clinical trials show 90% success rate in restoring vision to patients with inherited retinal dystrophy using CRISPR gene editing.",
    status: "verified",
    votes: 2789,
    comments: 312,
    author: "Dr. Maria Gonzalez",
    updated: "1 day ago",
    walrusBlobId: "mock-gene-therapy-006",
    metadata: {
      created: new Date("2024-01-10"),
      lastModified: new Date(),
      version: 1,
      contentType: "text/plain",
      tags: ["genetics", "medicine", "crispr"]
    }
  },
  {
    id: "fact-7",
    title: "Space Telescope Discovers Exoplanet with Water",
    summary: "James Webb Space Telescope detects water vapor in the atmosphere of K2-18 b, a potentially habitable exoplanet 124 light-years away.",
    status: "verified",
    votes: 4562,
    comments: 678,
    author: "Dr. Robert Kim",
    updated: "2 days ago",
    walrusBlobId: "mock-exoplanet-water-007",
    metadata: {
      created: new Date("2024-01-09"),
      lastModified: new Date(),
      version: 1,
      contentType: "text/plain",
      tags: ["space", "astronomy", "exoplanets"]
    }
  },
  {
    id: "fact-8",
    title: "Fusion Energy Milestone Achieved",
    summary: "National Ignition Facility achieves net energy gain from nuclear fusion reaction for the third consecutive time, proving reproducibility.",
    status: "review",
    votes: 3890,
    comments: 445,
    author: "Dr. Jennifer Lee",
    updated: "3 days ago",
    walrusBlobId: "mock-fusion-milestone-008",
    metadata: {
      created: new Date("2024-01-08"),
      lastModified: new Date(),
      version: 1,
      contentType: "text/plain",
      tags: ["energy", "fusion", "physics"]
    }
  }
];

export function getMockFacts(): Fact[] {
  return MOCK_FACTS;
}

export function getMockFactById(id: string): Fact | undefined {
  return MOCK_FACTS.find(fact => fact.id === id);
}

export function getMockVotingData(): MockVotingData[] {
  return MOCK_VOTING_DATA;
}

export function getMockVotingDataById(factId: string): MockVotingData | undefined {
  return MOCK_VOTING_DATA.find(data => data.factId === factId);
}

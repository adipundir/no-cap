import type { Fact } from '@/types/fact';

/**
 * Fallback facts to show when Walrus storage is unavailable
 * These are displayed with a "fallback mode" notification
 */
export const FALLBACK_FACTS: Fact[] = [
  {
    id: 'fallback-1',
    title: 'Bitcoin reached $100,000 for the first time in 2024',
    summary: 'Bitcoin cryptocurrency crossed the historic $100,000 milestone, marking a significant achievement in the crypto market.',
    status: 'verified',
    votes: 2847,
    comments: 156,
    author: 'crypto-tracker',
    updated: '2h ago',
    walrusBlobId: 'fallback-bitcoin-100k',
    metadata: {
      created: new Date('2024-12-01T10:00:00Z'),
      lastModified: new Date('2024-12-01T12:00:00Z'),
      version: 1,
      contentType: 'text/plain',
      tags: ['bitcoin', 'cryptocurrency', 'milestone', 'price']
    }
  },
  {
    id: 'fallback-2', 
    title: 'World Chain processes over 10M transactions daily',
    summary: 'The World Chain Layer 2 network has achieved a new milestone processing more than 10 million transactions per day.',
    status: 'verified',
    votes: 1923,
    comments: 89,
    author: 'blockchain-analyst',
    updated: '4h ago', 
    walrusBlobId: 'fallback-worldchain-10m',
    metadata: {
      created: new Date('2024-12-01T08:00:00Z'),
      lastModified: new Date('2024-12-01T08:30:00Z'),
      version: 1,
      contentType: 'text/plain',
      tags: ['worldchain', 'layer2', 'scaling', 'transactions']
    }
  },
  {
    id: 'fallback-3',
    title: 'Walrus decentralized storage network launches mainnet',
    summary: 'The Walrus protocol has successfully launched its mainnet, providing decentralized storage solutions built on Sui blockchain.',
    status: 'review',
    votes: 1456,
    comments: 67,
    author: 'storage-researcher',
    updated: '6h ago',
    walrusBlobId: 'fallback-walrus-mainnet',
    metadata: {
      created: new Date('2024-12-01T06:00:00Z'),
      lastModified: new Date('2024-12-01T06:15:00Z'),
      version: 1,
      contentType: 'text/plain',
      tags: ['walrus', 'storage', 'mainnet', 'sui', 'decentralized']
    }
  },
  {
    id: 'fallback-4',
    title: 'OpenAI releases GPT-5 with significant improvements',
    summary: 'OpenAI has announced GPT-5 with enhanced reasoning capabilities, better factual accuracy, and reduced hallucination rates.',
    status: 'review',
    votes: 3421,
    comments: 234,
    author: 'ai-watcher',
    updated: '8h ago',
    walrusBlobId: 'fallback-gpt5-release',
    metadata: {
      created: new Date('2024-12-01T04:00:00Z'),
      lastModified: new Date('2024-12-01T04:30:00Z'),
      version: 1,
      contentType: 'text/plain',
      tags: ['ai', 'openai', 'gpt', 'machine-learning']
    }
  },
  {
    id: 'fallback-5',
    title: 'Ethereum gas fees drop to lowest levels since 2020',
    summary: 'Average transaction fees on Ethereum mainnet have decreased significantly due to Layer 2 adoption and recent protocol optimizations.',
    status: 'verified',
    votes: 2156,
    comments: 143,
    author: 'eth-researcher',
    updated: '12h ago',
    walrusBlobId: 'fallback-eth-gas-low',
    metadata: {
      created: new Date('2024-11-30T20:00:00Z'),
      lastModified: new Date('2024-11-30T20:15:00Z'),
      version: 1,
      contentType: 'text/plain',
      tags: ['ethereum', 'gas-fees', 'layer2', 'optimization']
    }
  },
  {
    id: 'fallback-6',
    title: 'Solana network achieves 99.9% uptime in 2024',
    summary: 'The Solana blockchain has demonstrated significant stability improvements, maintaining 99.9% uptime throughout 2024 with minimal outages.',
    status: 'verified',
    votes: 1789,
    comments: 92,
    author: 'solana-validator',
    updated: '1d ago',
    walrusBlobId: 'fallback-solana-uptime',
    metadata: {
      created: new Date('2024-11-30T12:00:00Z'),
      lastModified: new Date('2024-11-30T12:30:00Z'),
      version: 1,
      contentType: 'text/plain',
      tags: ['solana', 'uptime', 'reliability', 'blockchain']
    }
  }
];

/**
 * Get fallback facts with randomized engagement metrics
 */
export function getFallbackFacts(limit: number = 10, offset: number = 0): { 
  facts: Fact[], 
  totalCount: number, 
  isFallback: boolean 
} {
  // Add some randomization to make it feel more dynamic
  const factsWithRandomization = FALLBACK_FACTS.map(fact => ({
    ...fact,
    votes: fact.votes + Math.floor(Math.random() * 50) - 25, // ±25 variation
    comments: fact.comments + Math.floor(Math.random() * 10) - 5, // ±5 variation
  }));

  const paginatedFacts = factsWithRandomization.slice(offset, offset + limit);

  return {
    facts: paginatedFacts,
    totalCount: FALLBACK_FACTS.length,
    isFallback: true
  };
}

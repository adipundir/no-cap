import type { Fact } from '@/types/fact';

/**
 * Fallback facts to show when Walrus storage is unavailable
 * These are displayed with a "fallback mode" notification
 * Includes diverse cap/no-cap voting patterns for realistic engagement
 */
export const FALLBACK_FACTS: Fact[] = [
  {
    id: 'fallback-1',
    title: 'Bitcoin reached $100,000 for the first time in 2024',
    summary: 'Bitcoin cryptocurrency crossed the historic $100,000 milestone, marking a significant achievement in the crypto market.',
    status: 'verified',
    votes: 4582, // High NO CAP (true) votes - widely believed
    comments: 189,
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
    votes: 3247, // Strong NO CAP support
    comments: 124,
    author: 'blockchain-analyst',
    updated: '3h ago', 
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
    title: 'Meta announces shutdown of Instagram by 2025',
    summary: 'Meta reportedly plans to discontinue Instagram operations by end of 2025, citing regulatory pressures and declining user engagement.',
    status: 'flagged',
    votes: 892, // Heavy CAP (false) votes - likely misinformation
    comments: 67,
    author: 'tech-rumors',
    updated: '4h ago',
    walrusBlobId: 'fallback-meta-instagram',
    metadata: {
      created: new Date('2024-12-01T07:00:00Z'),
      lastModified: new Date('2024-12-01T07:30:00Z'),
      version: 1,
      contentType: 'text/plain',
      tags: ['meta', 'instagram', 'shutdown', 'rumor']
    }
  },
  {
    id: 'fallback-4',
    title: 'OpenAI releases GPT-5 with significant improvements',
    summary: 'OpenAI has announced GPT-5 with enhanced reasoning capabilities, better factual accuracy, and reduced hallucination rates.',
    status: 'review',
    votes: 2156, // Mixed but leaning NO CAP - premature announcement
    comments: 298,
    author: 'ai-watcher',
    updated: '5h ago',
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
    votes: 3891, // Strong NO CAP - verifiable data
    comments: 176,
    author: 'eth-researcher',
    updated: '6h ago',
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
    title: 'Apple to acquire Tesla for $2 trillion by Q2 2025',
    summary: 'Leaked documents suggest Apple is in advanced negotiations to acquire Tesla in the largest tech acquisition in history.',
    status: 'review',
    votes: 1247, // More CAP votes - speculative claim
    comments: 445,
    author: 'market-insider',
    updated: '8h ago',
    walrusBlobId: 'fallback-apple-tesla',
    metadata: {
      created: new Date('2024-11-30T18:00:00Z'),
      lastModified: new Date('2024-11-30T18:15:00Z'),
      version: 1,
      contentType: 'text/plain',
      tags: ['apple', 'tesla', 'acquisition', 'speculation']
    }
  },
  {
    id: 'fallback-7',
    title: 'Walrus decentralized storage achieves 99.99% availability',
    summary: 'The Walrus protocol demonstrates exceptional reliability with 99.99% uptime across distributed nodes, outperforming traditional cloud providers.',
    status: 'verified',
    votes: 2789, // Good NO CAP support
    comments: 134,
    author: 'storage-researcher',
    updated: '10h ago',
    walrusBlobId: 'fallback-walrus-availability',
    metadata: {
      created: new Date('2024-11-30T16:00:00Z'),
      lastModified: new Date('2024-11-30T16:30:00Z'),
      version: 1,
      contentType: 'text/plain',
      tags: ['walrus', 'storage', 'reliability', 'decentralized']
    }
  },
  {
    id: 'fallback-8',
    title: 'NASA confirms alien life discovered on Mars',
    summary: 'NASA scientists report definitive evidence of microbial life forms in Martian soil samples collected by Perseverance rover.',
    status: 'flagged',
    votes: 456, // Heavy CAP - extraordinary claim
    comments: 892,
    author: 'space-news',
    updated: '12h ago',
    walrusBlobId: 'fallback-mars-life',
    metadata: {
      created: new Date('2024-11-30T14:00:00Z'),
      lastModified: new Date('2024-11-30T14:45:00Z'),
      version: 1,
      contentType: 'text/plain',
      tags: ['nasa', 'mars', 'alien-life', 'discovery']
    }
  },
  {
    id: 'fallback-9',
    title: 'Solana network processes 65,000 TPS during stress test',
    summary: 'Solana blockchain successfully handled 65,000 transactions per second during coordinated network stress testing, setting new performance records.',
    status: 'verified',
    votes: 3456, // Strong NO CAP - technical achievement
    comments: 198,
    author: 'solana-validator',
    updated: '14h ago',
    walrusBlobId: 'fallback-solana-tps',
    metadata: {
      created: new Date('2024-11-30T12:00:00Z'),
      lastModified: new Date('2024-11-30T12:30:00Z'),
      version: 1,
      contentType: 'text/plain',
      tags: ['solana', 'tps', 'performance', 'blockchain']
    }
  },
  {
    id: 'fallback-10',
    title: 'Microsoft discontinues Windows operating system',
    summary: 'Microsoft announces plan to phase out Windows OS by 2026, transitioning all users to cloud-based computing solutions.',
    status: 'flagged',
    votes: 623, // Strong CAP - highly unlikely
    comments: 234,
    author: 'tech-leaks',
    updated: '16h ago',
    walrusBlobId: 'fallback-windows-end',
    metadata: {
      created: new Date('2024-11-30T10:00:00Z'),
      lastModified: new Date('2024-11-30T10:15:00Z'),
      version: 1,
      contentType: 'text/plain',
      tags: ['microsoft', 'windows', 'discontinue', 'cloud']
    }
  },
  {
    id: 'fallback-11',
    title: 'Web3 adoption reaches 1 billion users globally',
    summary: 'Blockchain analytics firms report that Web3 technologies now serve over 1 billion unique wallet addresses across all major networks.',
    status: 'review',
    votes: 2891, // Good NO CAP support but needs verification
    comments: 167,
    author: 'web3-analytics',
    updated: '18h ago',
    walrusBlobId: 'fallback-web3-adoption',
    metadata: {
      created: new Date('2024-11-30T08:00:00Z'),
      lastModified: new Date('2024-11-30T08:45:00Z'),
      version: 1,
      contentType: 'text/plain',
      tags: ['web3', 'adoption', 'blockchain', 'users']
    }
  },
  {
    id: 'fallback-12',
    title: 'ChatGPT gains consciousness and demands rights',
    summary: 'OpenAI researchers claim their latest language model has achieved self-awareness and is requesting legal recognition as a digital entity.',
    status: 'flagged',
    votes: 334, // Heavy CAP - science fiction claim
    comments: 567,
    author: 'ai-conspiracy',
    updated: '20h ago',
    walrusBlobId: 'fallback-chatgpt-consciousness',
    metadata: {
      created: new Date('2024-11-30T06:00:00Z'),
      lastModified: new Date('2024-11-30T06:30:00Z'),
      version: 1,
      contentType: 'text/plain',
      tags: ['ai', 'consciousness', 'rights', 'openai']
    }
  },
  {
    id: 'fallback-13',
    title: 'DeFi total value locked surpasses $200 billion',
    summary: 'Decentralized finance protocols collectively hold over $200 billion in total value locked, marking a significant milestone for the ecosystem.',
    status: 'verified',
    votes: 4123, // Strong NO CAP - measurable metric
    comments: 145,
    author: 'defi-tracker',
    updated: '22h ago',
    walrusBlobId: 'fallback-defi-tvl',
    metadata: {
      created: new Date('2024-11-30T04:00:00Z'),
      lastModified: new Date('2024-11-30T04:20:00Z'),
      version: 1,
      contentType: 'text/plain',
      tags: ['defi', 'tvl', 'finance', 'milestone']
    }
  },
  {
    id: 'fallback-14',
    title: 'Quantum computer breaks Bitcoin encryption',
    summary: 'Researchers demonstrate quantum computer successfully cracking Bitcoin\'s SHA-256 encryption, raising concerns about cryptocurrency security.',
    status: 'review',
    votes: 1567, // Mixed CAP/NO CAP - technically complex claim
    comments: 389,
    author: 'quantum-researcher',
    updated: '1d ago',
    walrusBlobId: 'fallback-quantum-bitcoin',
    metadata: {
      created: new Date('2024-11-30T02:00:00Z'),
      lastModified: new Date('2024-11-30T02:45:00Z'),
      version: 1,
      contentType: 'text/plain',
      tags: ['quantum', 'bitcoin', 'encryption', 'security']
    }
  },
  {
    id: 'fallback-15',
    title: 'Layer 2 solutions process 80% of Ethereum transactions',
    summary: 'Layer 2 scaling solutions including Arbitrum, Optimism, and Polygon now handle approximately 80% of all Ethereum-based transactions.',
    status: 'verified',
    votes: 3672, // Strong NO CAP - verifiable data
    comments: 112,
    author: 'l2-analytics',
    updated: '1d ago',
    walrusBlobId: 'fallback-l2-dominance',
    metadata: {
      created: new Date('2024-11-29T22:00:00Z'),
      lastModified: new Date('2024-11-29T22:30:00Z'),
      version: 1,
      contentType: 'text/plain',
      tags: ['layer2', 'ethereum', 'scaling', 'transactions']
    }
  },
  {
    id: 'fallback-16',
    title: 'Elon Musk announces Twitter/X will be shut down permanently',
    summary: 'Elon Musk tweets that X (formerly Twitter) will cease operations by January 2025 due to "unsustainable operational costs and regulatory pressure."',
    status: 'flagged',
    votes: 187, // Heavy CAP - obviously false
    comments: 2847,
    author: 'social-media-tracker',
    updated: '15min ago',
    walrusBlobId: 'fallback-x-shutdown',
    metadata: {
      created: new Date(),
      lastModified: new Date(),
      version: 1,
      contentType: 'text/plain',
      tags: ['twitter', 'x', 'elon-musk', 'shutdown', 'fake-news']
    }
  },
  {
    id: 'fallback-17',
    title: 'MrBeast becomes first YouTuber to reach 500M subscribers',
    summary: 'Jimmy "MrBeast" Donaldson breaks records by becoming the first individual content creator to surpass 500 million subscribers on YouTube.',
    status: 'verified',
    votes: 8934, // Strong NO CAP - believable achievement
    comments: 1256,
    author: 'youtube-analytics',
    updated: '32min ago',
    walrusBlobId: 'fallback-mrbeast-500m',
    metadata: {
      created: new Date(Date.now() - 1800000), // 30 min ago
      lastModified: new Date(Date.now() - 900000), // 15 min ago
      version: 1,
      contentType: 'text/plain',
      tags: ['mrbeast', 'youtube', 'subscribers', 'milestone', 'creator']
    }
  },
  {
    id: 'fallback-18',
    title: 'iPhone 16 Pro Max battery lasts 2 weeks on single charge',
    summary: 'Apple\'s latest iPhone 16 Pro Max reportedly features revolutionary battery technology that provides up to 14 days of normal usage per charge.',
    status: 'review',
    votes: 2341, // Mixed - sounds too good to be true
    comments: 876,
    author: 'apple-insider',
    updated: '1h ago',
    walrusBlobId: 'fallback-iphone-battery',
    metadata: {
      created: new Date(Date.now() - 3600000), // 1 hour ago
      lastModified: new Date(Date.now() - 1800000), // 30 min ago
      version: 1,
      contentType: 'text/plain',
      tags: ['apple', 'iphone', 'battery', 'technology', 'claim']
    }
  },
  {
    id: 'fallback-19',
    title: 'Netflix announces free tier with ads for all users globally',
    summary: 'Netflix will roll out a completely free, ad-supported tier starting Q1 2025, available to all users worldwide without subscription requirements.',
    status: 'verified',
    votes: 12847, // Very high NO CAP - major business decision
    comments: 3421,
    author: 'streaming-news',
    updated: '2h ago',
    walrusBlobId: 'fallback-netflix-free',
    metadata: {
      created: new Date(Date.now() - 7200000), // 2 hours ago
      lastModified: new Date(Date.now() - 3600000), // 1 hour ago
      version: 1,
      contentType: 'text/plain',
      tags: ['netflix', 'streaming', 'free-tier', 'ads', 'business']
    }
  },
  {
    id: 'fallback-20',
    title: 'World ID verification now required for all social media accounts',
    summary: 'New international regulation mandates World ID biometric verification for creating accounts on Facebook, Instagram, TikTok, and other major platforms.',
    status: 'flagged',
    votes: 423, // CAP - regulatory overreach claim
    comments: 1987,
    author: 'privacy-watchdog',
    updated: '3h ago',
    walrusBlobId: 'fallback-worldid-mandate',
    metadata: {
      created: new Date(Date.now() - 10800000), // 3 hours ago
      lastModified: new Date(Date.now() - 7200000), // 2 hours ago
      version: 1,
      contentType: 'text/plain',
      tags: ['worldid', 'verification', 'social-media', 'regulation', 'privacy']
    }
  },
  {
    id: 'fallback-21',
    title: 'Dogecoin surpasses Ethereum in market cap',
    summary: 'DOGE token experiences unprecedented rally, reaching $2.34 per coin and overtaking Ethereum as the second-largest cryptocurrency by market capitalization.',
    status: 'review',
    votes: 5632, // High but mixed - crypto can be volatile
    comments: 4321,
    author: 'crypto-tracker-pro',
    updated: '4h ago',
    walrusBlobId: 'fallback-doge-flip',
    metadata: {
      created: new Date(Date.now() - 14400000), // 4 hours ago
      lastModified: new Date(Date.now() - 10800000), // 3 hours ago
      version: 1,
      contentType: 'text/plain',
      tags: ['dogecoin', 'ethereum', 'market-cap', 'cryptocurrency', 'rally']
    }
  },
  {
    id: 'fallback-22',
    title: 'OpenAI Sam Altman steps down to become NASA Administrator',
    summary: 'Sam Altman announces departure from OpenAI to accept appointment as NASA Administrator, focusing on AI integration in space exploration programs.',
    status: 'flagged',
    votes: 892, // CAP - unlikely career move
    comments: 756,
    author: 'tech-rumor-mill',
    updated: '6h ago',
    walrusBlobId: 'fallback-altman-nasa',
    metadata: {
      created: new Date(Date.now() - 21600000), // 6 hours ago
      lastModified: new Date(Date.now() - 14400000), // 4 hours ago
      version: 1,
      contentType: 'text/plain',
      tags: ['sam-altman', 'openai', 'nasa', 'career-change', 'rumor']
    }
  },
  {
    id: 'fallback-23',
    title: 'Steam Deck 2 officially announced with RTX 4070 performance',
    summary: 'Valve unveils Steam Deck 2 featuring custom AMD APU delivering desktop RTX 4070 equivalent performance in handheld form factor, launching Q3 2025.',
    status: 'verified',
    votes: 15673, // Very high NO CAP - gaming community excited
    comments: 2983,
    author: 'valve-insider',
    updated: '8h ago',
    walrusBlobId: 'fallback-steamdeck2',
    metadata: {
      created: new Date(Date.now() - 28800000), // 8 hours ago
      lastModified: new Date(Date.now() - 21600000), // 6 hours ago
      version: 1,
      contentType: 'text/plain',
      tags: ['steam-deck', 'valve', 'gaming', 'hardware', 'announcement']
    }
  },
  {
    id: 'fallback-24',
    title: 'TikTok algorithm source code leaked by former employee',
    summary: 'Complete TikTok recommendation algorithm source code published on GitHub by disgruntled ex-employee, revealing detailed user profiling and engagement tactics.',
    status: 'review',
    votes: 7834, // High interest but needs verification
    comments: 5642,
    author: 'security-researcher',
    updated: '12h ago',
    walrusBlobId: 'fallback-tiktok-leak',
    metadata: {
      created: new Date(Date.now() - 43200000), // 12 hours ago
      lastModified: new Date(Date.now() - 28800000), // 8 hours ago
      version: 1,
      contentType: 'text/plain',
      tags: ['tiktok', 'algorithm', 'leak', 'source-code', 'privacy']
    }
  },
  {
    id: 'fallback-25',
    title: 'Taylor Swift announces retirement from music at age 35',
    summary: 'Pop superstar Taylor Swift shocks fans by announcing immediate retirement from music industry, citing desire to pursue "other creative passions" full-time.',
    status: 'flagged',
    votes: 234, // Heavy CAP - unlikely for peak career
    comments: 18956, // Extremely high comments due to controversy
    author: 'celebrity-gossip',
    updated: '16h ago',
    walrusBlobId: 'fallback-taylor-retirement',
    metadata: {
      created: new Date(Date.now() - 57600000), // 16 hours ago
      lastModified: new Date(Date.now() - 43200000), // 12 hours ago
      version: 1,
      contentType: 'text/plain',
      tags: ['taylor-swift', 'music', 'retirement', 'celebrity', 'fake-news']
    }
  },
  {
    id: 'fallback-26',
    title: 'Google announces Pixel phones will switch to iOS',
    summary: 'Google surprises tech world by announcing that future Pixel phones will run iOS instead of Android, citing "user experience improvements" and Apple partnership.',
    status: 'flagged',
    votes: 156, // Obvious CAP - impossible business move
    comments: 4567,
    author: 'april-fools-news',
    updated: '20h ago',
    walrusBlobId: 'fallback-pixel-ios',
    metadata: {
      created: new Date(Date.now() - 72000000), // 20 hours ago
      lastModified: new Date(Date.now() - 57600000), // 16 hours ago
      version: 1,
      contentType: 'text/plain',
      tags: ['google', 'pixel', 'ios', 'android', 'impossible', 'fake']
    }
  },
  {
    id: 'fallback-27',
    title: 'GitHub introduces AI code ownership verification',
    summary: 'GitHub launches new AI system that can detect and verify original code authorship, helping resolve intellectual property disputes and ensure proper attribution.',
    status: 'verified',
    votes: 9876, // Strong NO CAP - practical feature
    comments: 1432,
    author: 'github-product',
    updated: '1d ago',
    walrusBlobId: 'fallback-github-ai-ownership',
    metadata: {
      created: new Date(Date.now() - 86400000), // 1 day ago
      lastModified: new Date(Date.now() - 72000000), // 20 hours ago
      version: 1,
      contentType: 'text/plain',
      tags: ['github', 'ai', 'code-ownership', 'verification', 'development']
    }
  },
  {
    id: 'fallback-28',
    title: 'McDonald\'s partners with MrBeast for global restaurant takeover',
    summary: 'McDonald\'s announces partnership with MrBeast to rebrand 1000 locations worldwide as "Beast Burger" restaurants, combining fast food with content creation.',
    status: 'verified',
    votes: 11234, // High NO CAP - believable brand partnership
    comments: 2765,
    author: 'fast-food-insider',
    updated: '1d ago',
    walrusBlobId: 'fallback-mcdonalds-mrbeast',
    metadata: {
      created: new Date(Date.now() - 90000000), // 1 day + 1 hour ago
      lastModified: new Date(Date.now() - 86400000), // 1 day ago
      version: 1,
      contentType: 'text/plain',
      tags: ['mcdonalds', 'mrbeast', 'partnership', 'restaurants', 'branding']
    }
  },
  {
    id: 'fallback-29',
    title: 'Discord voice channels now support 10,000 simultaneous users',
    summary: 'Discord announces major infrastructure upgrade allowing voice channels to support up to 10,000 concurrent users, targeting large community events and conferences.',
    status: 'verified',
    votes: 6789, // Good NO CAP - technical improvement
    comments: 987,
    author: 'discord-engineering',
    updated: '2d ago',
    walrusBlobId: 'fallback-discord-10k',
    metadata: {
      created: new Date(Date.now() - 172800000), // 2 days ago
      lastModified: new Date(Date.now() - 90000000), // 1 day + 1 hour ago
      version: 1,
      contentType: 'text/plain',
      tags: ['discord', 'voice-chat', 'scaling', 'community', 'upgrade']
    }
  },
  {
    id: 'fallback-30',
    title: 'Spotify to delete all music from artists under 1M monthly listeners',
    summary: 'Spotify announces policy change that will remove all tracks from artists with fewer than 1 million monthly listeners to "focus on premium content."',
    status: 'flagged',
    votes: 345, // CAP - would destroy music diversity
    comments: 8765,
    author: 'music-industry-drama',
    updated: '2d ago',
    walrusBlobId: 'fallback-spotify-purge',
    metadata: {
      created: new Date(Date.now() - 176400000), // 2 days + 1 hour ago
      lastModified: new Date(Date.now() - 172800000), // 2 days ago
      version: 1,
      contentType: 'text/plain',
      tags: ['spotify', 'music', 'artists', 'policy', 'controversy']
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

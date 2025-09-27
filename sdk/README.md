# NOCAP Walrus SDK

The official SDK for accessing verified facts from the NOCAP database, built on top of Walrus decentralized storage protocol.

## Overview

NOCAP is a decentralized fact-checking platform that stores verified information on the Walrus network. This SDK provides a simple, type-safe API for developers and AI agents to access this verified data.

## Features

- 🔍 **Advanced Search** - Search facts by keywords, tags, authors, status, and date ranges
- ⚡ **High Performance** - O(1) indexed lookups with efficient caching
- 🏷️ **Rich Metadata** - Access tags, sources, author information, and verification status
- 📊 **Bulk Operations** - Retrieve multiple facts in a single request
- 🔒 **Type Safety** - Full TypeScript support with comprehensive type definitions
- 🌐 **Decentralized** - Built on Walrus for censorship-resistant data access
- 📈 **Analytics** - Built-in metrics and monitoring capabilities

## Installation

```bash
npm install nocap-sdk
# or
yarn add nocap-sdk
# or
pnpm add nocap-sdk
```

## Quick Start

```typescript
import { createClient } from 'nocap-sdk';

// Create a client
const client = createClient({
  apiUrl: 'https://nocap.app/api'  // Optional: defaults to official API
});

// Get all facts
const facts = await client.getFacts({ limit: 10 });
console.log(`Found ${facts.totalCount} total facts`);

// Get a specific fact
const fact = await client.getFact('fact-id-123');
console.log(fact.title);

// Search facts
const results = await client.searchFacts({
  keywords: ['climate', 'science'],
  status: ['verified'],
  limit: 5
});
```

## API Reference

### Client Configuration

```typescript
interface NOCAPClientOptions {
  apiUrl?: string;        // API base URL (default: https://nocap.app/api)
  timeout?: number;       // Request timeout in ms (default: 30000)
  retries?: number;       // Number of retries (default: 3)
  retryDelay?: number;    // Delay between retries in ms (default: 1000)
  userAgent?: string;     // Custom user agent
  apiKey?: string;        // API key for authenticated requests (future)
}
```

### Core Methods

#### `getFacts(options?)`
Retrieve all facts with optional pagination.

```typescript
const facts = await client.getFacts({
  limit: 20,
  offset: 0
});
```

#### `getFact(factId)`
Get a specific fact by ID with full details.

```typescript
const fact = await client.getFact('galactic-ocean-1');
console.log(fact.fullContent);
console.log(fact.sources);
console.log(fact.tags);
```

#### `searchFacts(query)`
Advanced search with multiple filters.

```typescript
const results = await client.searchFacts({
  keywords: ['AI', 'machine learning'],
  tags: ['technology', 'verified'],
  authors: ['anon-ai1'],
  status: ['verified', 'review'],
  dateRange: {
    from: new Date('2024-01-01'),
    to: new Date()
  },
  limit: 10,
  offset: 0
});
```

### Convenience Methods

#### `searchByKeywords(keywords, options?)`
```typescript
const facts = await client.searchByKeywords(['climate', 'change'], { limit: 5 });
```

#### `searchByTags(tags, options?)`
```typescript
const facts = await client.searchByTags(['space', 'verified'], { limit: 5 });
```

#### `getFactsByAuthor(author, options?)`
```typescript
const facts = await client.getFactsByAuthor('anon-scientist1', { limit: 10 });
```

#### `getFactsByStatus(status, options?)`
```typescript
const verified = await client.getFactsByStatus('verified');
const underReview = await client.getFactsByStatus('review');
const flagged = await client.getFactsByStatus('flagged');
```

### Bulk Operations

#### `getBulkFacts(query)`
Retrieve multiple facts by IDs in a single request.

```typescript
const bulkResponse = await client.getBulkFacts({
  factIds: ['fact1', 'fact2', 'fact3'],
  includeContent: true,
  includeSources: true
});

console.log(`Retrieved ${bulkResponse.totalReturned} facts`);
console.log(`Errors: ${bulkResponse.errors.length}`);
```

### Monitoring & Statistics

#### `healthCheck()`
Check the health of the NOCAP system.

```typescript
const health = await client.healthCheck();
console.log(`Status: ${health.status}`);
console.log(`Walrus available: ${health.walrusStatus.available}`);
console.log(`Total facts: ${health.indexStatus.facts}`);
```

#### `getIndexStats()`
Get comprehensive index statistics.

```typescript
const stats = await client.getIndexStats();
console.log(`Total facts: ${stats.totalFacts}`);
console.log(`Total keywords: ${stats.totalKeywords}`);
console.log(`Total tags: ${stats.totalTags}`);
```

#### `getMetrics()`
Get client-side metrics.

```typescript
const metrics = client.getMetrics();
console.log(`Requests made: ${metrics.requestCount}`);
console.log(`Avg response time: ${metrics.avgResponseTime}ms`);
console.log(`Error rate: ${metrics.errorRate * 100}%`);
```

## Data Types

### NOCAPFact
Basic fact information for list views.

```typescript
interface NOCAPFact {
  id: string;
  title: string;
  summary: string;
  status: 'verified' | 'review' | 'flagged';
  votes: number;
  comments: number;
  author: string;
  updated: string;
  walrusBlobId?: string;
  contentHash?: string;
  metadata?: {
    created: Date;
    lastModified: Date;
    version: number;
    contentType: string;
    tags?: string[];
  };
}
```

### NOCAPFactDetails
Detailed fact information with full content.

```typescript
interface NOCAPFactDetails extends NOCAPFact {
  fullContent?: string;
  sources?: string[] | NOCAPSource[];
  tags: NOCAPTag[];
  keywords: string[];
  blobId: string;
}
```

### NOCAPTag
Structured tag information.

```typescript
interface NOCAPTag {
  name: string;
  category: 'topic' | 'region' | 'type' | 'methodology' | 'urgency';
}
```

## Error Handling

The SDK provides specific error types for different scenarios:

```typescript
import { 
  NOCAPError,
  NOCAPNetworkError,
  NOCAPValidationError,
  NOCAPNotFoundError,
  NOCAPRateLimitError 
} from 'nocap-sdk';

try {
  const fact = await client.getFact('invalid-id');
} catch (error) {
  if (error instanceof NOCAPNotFoundError) {
    console.log('Fact not found');
  } else if (error instanceof NOCAPValidationError) {
    console.log('Invalid request:', error.message);
  } else if (error instanceof NOCAPRateLimitError) {
    console.log('Rate limit exceeded, retry after:', error.details.retryAfter);
  } else {
    console.log('Unknown error:', error);
  }
}
```

## Standalone Functions

For simple use cases, you can use standalone functions without creating a client:

```typescript
import { getFact, searchFacts, healthCheck } from 'nocap-sdk';

// Quick fact lookup
const fact = await getFact('fact-id');

// Quick search
const results = await searchFacts({
  keywords: ['space'],
  limit: 5
});

// Quick health check
const health = await healthCheck();
```

## Use Cases

### 1. Fact-Checking Application

```typescript
async function checkClaim(claim: string) {
  const client = createClient();
  
  // Extract keywords from claim
  const keywords = extractKeywords(claim);
  
  // Search for related verified facts
  const results = await client.searchFacts({
    keywords,
    status: ['verified'],
    limit: 10
  });
  
  return results.facts.map(fact => ({
    title: fact.title,
    summary: fact.summary,
    relevanceScore: calculateRelevance(claim, fact),
    sources: fact.sources
  }));
}
```

### 2. Research Tool

```typescript
async function researchTopic(topic: string, timeframe?: { from: Date; to: Date }) {
  const client = createClient();
  
  const results = await client.searchFacts({
    keywords: [topic],
    status: ['verified', 'review'],
    dateRange: timeframe,
    limit: 50
  });
  
  // Group by subtopics
  const grouped = groupByTags(results.facts);
  
  // Generate research summary
  return generateSummary(grouped);
}
```

### 3. AI Agent Integration

```typescript
class FactCheckingAgent {
  private client = createClient();
  
  async verifyStatement(statement: string): Promise<VerificationResult> {
    // Parse statement into searchable components
    const components = parseStatement(statement);
    
    // Search for supporting/contradicting facts
    const supportingFacts = await this.client.searchFacts({
      keywords: components.keywords,
      status: ['verified']
    });
    
    // Analyze confidence level
    const confidence = calculateConfidence(supportingFacts.facts, statement);
    
    return {
      statement,
      confidence,
      supportingFacts: supportingFacts.facts,
      recommendation: confidence > 0.8 ? 'verified' : 'needs_review'
    };
  }
}
```

## Rate Limiting

The API implements rate limiting to ensure fair usage:

- **Public API**: 100 requests per minute per IP
- **Authenticated API**: 1000 requests per minute per API key (future)

Rate limit information is included in response headers:
- `X-RateLimit-Limit`: Requests allowed per window
- `X-RateLimit-Remaining`: Requests remaining in current window  
- `X-RateLimit-Reset`: Time when the rate limit resets

## Caching

The SDK implements intelligent caching:
- **Memory Cache**: Recent requests cached for 5 minutes
- **HTTP Cache**: Respects cache headers from the API
- **Stale-While-Revalidate**: Serves cached content while fetching updates

## Contributing

We welcome contributions! Please see our [Contributing Guide](../CONTRIBUTING.md) for details.

## License

MIT License - see [LICENSE](../LICENSE) for details.

## Support

- 📚 [Documentation](https://docs.nocap.app)
- 💬 [Discord Community](https://discord.gg/nocap)
- 🐛 [Report Issues](https://github.com/nocap-org/sdk/issues)
- 📧 [Email Support](mailto:support@nocap.app)

## Changelog

### v1.0.0
- Initial release
- Core fact retrieval and search functionality
- TypeScript support
- Comprehensive error handling
- Built-in metrics and monitoring

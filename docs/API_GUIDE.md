# No-Cap Facts API Developer Guide

## Overview

The No-Cap Facts API provides developers with access to a verified knowledge graph stored on Walrus, featuring comprehensive tagging, search capabilities, and analytics. Build applications on top of verified facts with our powerful API and SDK.

## Quick Start

### 1. Get an API Key

```bash
# Create an API key
curl -X POST https://your-domain.com/api/keys \
  -H "Content-Type: application/json" \
  -d '{
    "name": "My App",
    "permissions": ["read", "analytics"],
    "tier": "free"
  }'
```

### 2. Make Your First Request

```bash
# Search for verified facts about climate
curl -H "Authorization: Bearer YOUR_API_KEY" \
  "https://your-domain.com/api/search?keywords=climate&status=verified&limit=5"
```

### 3. Use the SDK (Recommended)

```javascript
import { NoCapSDK } from '@/lib/sdk/no-cap-sdk';

const sdk = new NoCapSDK({
  apiKey: 'YOUR_API_KEY',
  baseUrl: 'https://your-domain.com'
});

// Search for facts
const results = await sdk.search({
  keywords: 'artificial intelligence',
  tags: ['technology', 'ai'],
  status: ['verified'],
  limit: 10
});

console.log(`Found ${results.totalCount} facts`);
results.facts.forEach(fact => {
  console.log(`${fact.title}: ${fact.summary}`);
});
```

## Authentication

All API requests require authentication via API key. Include your key in one of these ways:

- **Authorization header**: `Authorization: Bearer YOUR_API_KEY`
- **Custom header**: `X-API-Key: YOUR_API_KEY`
- **Query parameter**: `?api_key=YOUR_API_KEY`

### API Tiers

| Tier | Requests/Hour | Permissions | Price |
|------|---------------|-------------|--------|
| Free | 1,000 | read | Free |
| Premium | 10,000 | read, write, analytics | Contact us |
| Enterprise | 100,000 | read, write, analytics | Contact us |

## Core Endpoints

### Facts API

#### GET /api/facts
Get all facts with basic filtering

```bash
curl -H "Authorization: Bearer YOUR_API_KEY" \
  "https://your-domain.com/api/facts?limit=20&offset=0"
```

#### GET /api/facts/{id}
Get a specific fact by ID

```bash
curl -H "Authorization: Bearer YOUR_API_KEY" \
  "https://your-domain.com/api/facts/fact-id-123"
```

#### POST /api/facts
Submit a new fact (requires `write` permission)

```bash
curl -X POST https://your-domain.com/api/facts \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "id": "unique-fact-id",
    "title": "Fact Title",
    "summary": "Brief summary",
    "fullContent": "Detailed content...",
    "status": "review",
    "author": "author-id",
    "metadata": {
      "tags": [
        {"name": "science", "category": "domain"},
        {"name": "climate", "category": "topic"}
      ],
      "importance": 8,
      "region": "global",
      "contentType": "text/markdown"
    }
  }'
```

### Search API

#### GET /api/search
Simple search with URL parameters

```bash
# Search by keywords
curl -H "Authorization: Bearer YOUR_API_KEY" \
  "https://your-domain.com/api/search?keywords=quantum+computing&limit=10"

# Search by tags
curl -H "Authorization: Bearer YOUR_API_KEY" \
  "https://your-domain.com/api/search?tags=technology&tags=physics"

# Search by category
curl -H "Authorization: Bearer YOUR_API_KEY" \
  "https://your-domain.com/api/search?categories=domain&categories=methodology"

# Complex search
curl -H "Authorization: Bearer YOUR_API_KEY" \
  "https://your-domain.com/api/search?keywords=climate&status=verified&minImportance=7&sortBy=importance&limit=20"
```

#### POST /api/search
Advanced search with complex queries

```bash
curl -X POST https://your-domain.com/api/search \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "keywords": "artificial intelligence machine learning",
    "tags": ["ai", "technology"],
    "categories": ["domain", "topic"],
    "status": ["verified"],
    "minImportance": 6,
    "dateRange": {
      "from": "2023-01-01T00:00:00Z",
      "to": "2024-01-01T00:00:00Z"
    },
    "region": "global",
    "sortBy": "relevance",
    "limit": 25,
    "offset": 0
  }'
```

**Response Format:**
```json
{
  "facts": [...],
  "totalCount": 150,
  "facets": {
    "tags": [{"name": "ai", "count": 45}],
    "categories": [{"name": "domain", "count": 30}],
    "authors": [{"name": "researcher-1", "count": 12}],
    "regions": [{"name": "global", "count": 89}]
  },
  "page": {
    "limit": 25,
    "offset": 0,
    "hasMore": true
  }
}
```

### Tags API

#### GET /api/tags
Get tag analytics and information

```bash
# Get all tags
curl -H "Authorization: Bearer YOUR_API_KEY" \
  "https://your-domain.com/api/tags"

# Filter by category
curl -H "Authorization: Bearer YOUR_API_KEY" \
  "https://your-domain.com/api/tags?category=domain&limit=20&sortBy=count"
```

**Response:**
```json
{
  "tags": [
    {
      "name": "artificial-intelligence",
      "category": "domain",
      "count": 234,
      "trend": 15.2,
      "averageImportance": 7.8,
      "verificationRate": 89.5
    }
  ],
  "totalTags": 1205,
  "categories": ["domain", "topic", "methodology", "urgency", "region", "custom"]
}
```

#### POST /api/tags
Add tags to a fact (requires `write` permission)

```bash
curl -X POST https://your-domain.com/api/tags \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "factId": "fact-id-123",
    "tags": [
      {"name": "blockchain", "category": "technology"},
      {"name": "urgent", "category": "urgency"}
    ]
  }'
```

### Analytics API

#### GET /api/analytics
Get comprehensive analytics (requires `analytics` permission)

```bash
# Get 30-day analytics
curl -H "Authorization: Bearer YOUR_API_KEY" \
  "https://your-domain.com/api/analytics?timeframe=30d"

# Filter by category
curl -H "Authorization: Bearer YOUR_API_KEY" \
  "https://your-domain.com/api/analytics?timeframe=7d&category=domain"
```

**Response:**
```json
{
  "timeframe": "30d",
  "insights": {
    "totalFacts": 15420,
    "verifiedFacts": 12336,
    "verificationRate": 80.0,
    "totalTags": 3456,
    "averageTagsPerFact": 3.2,
    "topCategories": [
      {"category": "domain", "count": 8234, "trend": 12.3}
    ],
    "factsByRegion": [
      {"region": "global", "count": 9876}
    ],
    "tagCloud": [
      {"name": "ai", "count": 456, "category": "domain", "size": 8}
    ]
  }
}
```

#### POST /api/analytics/trends
Get trend data over time

```bash
curl -X POST https://your-domain.com/api/analytics/trends \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "timeframe": "30d",
    "granularity": "daily",
    "tags": ["ai", "blockchain"]
  }'
```

## SDK Usage Examples

### Basic Operations

```javascript
const sdk = new NoCapSDK({ apiKey: 'YOUR_API_KEY' });

// Get verified facts
const verifiedFacts = await sdk.getVerifiedFacts(20);

// Search by keywords
const aiResearch = await sdk.searchByKeywords('artificial intelligence research');

// Search by tag
const climateData = await sdk.searchByTag('climate-change');

// Get popular tags
const popularTags = await sdk.getPopularTags(50);
```

### Advanced Queries

```javascript
// Complex search
const results = await sdk.search({
  keywords: 'renewable energy solar wind',
  tags: ['energy', 'environment'],
  categories: ['domain', 'topic'],
  status: ['verified'],
  minImportance: 7,
  dateRange: {
    from: new Date('2023-01-01'),
    to: new Date('2024-01-01')
  },
  sortBy: 'importance',
  limit: 50
});

// Get analytics
const analytics = await sdk.getAnalytics('90d', 'domain');
console.log(`Verification rate: ${analytics.insights.verificationRate}%`);
```

### Streaming Large Datasets

```javascript
// Stream facts for large datasets
for await (const fact of sdk.streamFacts({ status: ['verified'] }, 100)) {
  console.log(`Processing fact: ${fact.title}`);
  // Process each fact
}
```

### Batch Operations

```javascript
// Multiple searches in parallel
const [techFacts, scienceFacts, healthFacts] = await sdk.batchSearch([
  { tags: ['technology'], limit: 10 },
  { tags: ['science'], limit: 10 },
  { tags: ['health'], limit: 10 }
]);
```

## Tag System

### Tag Categories

- **domain**: Subject area (e.g., "technology", "science", "health")
- **topic**: Specific topics (e.g., "artificial-intelligence", "climate-change")
- **methodology**: Research methods (e.g., "peer-reviewed", "meta-analysis")
- **urgency**: Time sensitivity (e.g., "breaking", "historical")
- **region**: Geographic scope (e.g., "global", "usa", "europe")
- **custom**: User-defined tags

### Best Practices

1. **Use consistent naming**: lowercase, hyphen-separated (e.g., "machine-learning")
2. **Choose appropriate categories**: Domain for broad areas, topic for specific subjects
3. **Be specific but discoverable**: Balance specificity with searchability
4. **Use importance scores**: 1-10 scale where 10 is highest importance

## Rate Limiting

All endpoints are rate limited based on your API tier:

- Rate limit headers are included in every response
- When exceeded, you'll receive a 429 status with reset time
- Implement exponential backoff for retries

**Rate Limit Headers:**
```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1640995200
X-RateLimit-Window: 3600
```

## Error Handling

### HTTP Status Codes

- **200**: Success
- **400**: Bad Request (invalid parameters)
- **401**: Unauthorized (missing/invalid API key)
- **403**: Forbidden (insufficient permissions)
- **429**: Rate limit exceeded
- **500**: Internal server error

### Error Response Format

```json
{
  "error": "Rate limit exceeded. Please try again later.",
  "code": "RATE_LIMIT_EXCEEDED",
  "resetTime": 1640995200
}
```

### SDK Error Handling

```javascript
try {
  const results = await sdk.search({ keywords: 'test' });
} catch (error) {
  if (error instanceof NoCapAPIError) {
    console.log(`API Error ${error.status}: ${error.message}`);
    if (error.status === 429) {
      // Handle rate limiting
      console.log('Rate limited, retrying in 60 seconds...');
      setTimeout(() => retry(), 60000);
    }
  }
}
```

## Webhooks (Coming Soon)

Subscribe to real-time updates for fact verification and tag changes:

```javascript
// Register webhook (future feature)
await sdk.registerWebhook({
  url: 'https://your-app.com/webhooks/facts',
  events: ['fact.verified', 'fact.tagged'],
  tags: ['climate-change', 'ai'] // Optional filter
});
```

## Use Cases

### Knowledge Base Integration
```javascript
// Integrate verified facts into your knowledge base
const facts = await sdk.search({
  status: ['verified'],
  minImportance: 8,
  tags: ['your-domain-tag']
});

facts.facts.forEach(fact => {
  yourKnowledgeBase.addFact(fact);
});
```

### Content Verification
```javascript
// Check if content matches verified facts
const userClaim = "AI will replace all jobs by 2025";
const relatedFacts = await sdk.searchByKeywords(userClaim);

const verification = relatedFacts.find(fact => 
  fact.status === 'verified' && 
  fact.metadata.importance >= 7
);
```

### Research Dashboard
```javascript
// Build analytics for research topics
const analytics = await sdk.getAnalytics('30d');
const trends = await sdk.getTrends({
  timeframe: '90d',
  tags: ['research-topic']
});

// Display verification rates, trending topics, etc.
```

## Support

- **Documentation**: [API Reference](https://your-domain.com/docs)
- **Issues**: [GitHub Issues](https://github.com/your-org/no-cap)
- **Discord**: [Developer Community](https://discord.gg/your-server)
- **Email**: developers@your-domain.com

## Changelog

### v1.0.0 (2024-01-15)
- Initial release with search, tags, and analytics APIs
- JavaScript/TypeScript SDK
- Rate limiting and API key management

### Coming Soon
- Webhooks for real-time updates
- GraphQL endpoint
- Python and Go SDKs
- Advanced ML-based fact suggestions

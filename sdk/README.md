# Walrus Data SDK

A comprehensive TypeScript SDK for storing, querying, and indexing structured data on the [Walrus](https://walrus.space) decentralized storage network with O(1) lookup capabilities.

## 🚀 Features

- **🌐 Decentralized Storage** - Built on top of the Walrus network for censorship-resistant data storage
- **⚡ O(1) Queries** - Efficient indexed lookups with intelligent caching
- **🏷️ Schema Support** - Auto-generate and validate schemas from your data
- **📊 Advanced Querying** - Complex filters, full-text search, and range queries
- **🔧 Multiple Interfaces** - Generic client, KV store, and document store patterns
- **📦 Bulk Operations** - Efficiently handle large datasets
- **🔄 Real-time Events** - Subscribe to data changes and updates
- **💾 Smart Caching** - Automatic caching with configurable TTL and strategies
- **🔒 Type Safety** - Full TypeScript support with comprehensive types
- **📈 Performance Optimized** - Built-in metrics, query optimization, and batch processing

## 📦 Installation

```bash
npm install walrus-data-sdk
# or
yarn add walrus-data-sdk
# or
pnpm add walrus-data-sdk
```

## 🎯 Quick Start

### Basic Usage

```typescript
import { createClient } from 'walrus-data-sdk';

// Create a client
const client = createClient();

// Store structured data
const result = await client.store({
  name: 'John Doe',
  email: 'john@example.com',
  age: 30,
  skills: ['JavaScript', 'TypeScript', 'React']
}, {
  schema: 'user-profile',
  tags: ['user', 'profile'],
  categories: ['personal-data']
});

console.log(`Stored with ID: ${result.dataId}`);

// Retrieve data
const retrieved = await client.retrieve(result.dataId);
console.log('Retrieved:', retrieved.item.data);

// Query data
const users = await client.query({
  schema: ['user-profile'],
  fieldQueries: [
    { field: 'age', value: 25, operator: 'ge' } // Age >= 25
  ],
  tags: ['user'],
  limit: 10
});

console.log(`Found ${users.totalCount} users`);
```

### Key-Value Store

```typescript
import { KVStore } from 'walrus-data-sdk';

const kv = new KVStore();

// Set values
await kv.set('user:123', { name: 'Alice', email: 'alice@example.com' });
await kv.set('config:theme', 'dark');

// Get values
const user = await kv.get('user:123');
const theme = await kv.get('config:theme');

// List keys
const userKeys = await kv.keys('user:*');
```

### Document Store

```typescript
import { DocumentStore } from 'walrus-data-sdk';

const users = new DocumentStore('users');

// Insert documents
const userId = await users.insert({
  name: 'Bob Wilson',
  email: 'bob@example.com',
  role: 'admin'
});

// Query documents
const admins = await users.find({
  fieldQueries: [{ field: 'role', value: 'admin', operator: 'eq' }]
});

// Count documents
const totalUsers = await users.count();
```

## 🏗️ Architecture

The SDK provides multiple layers of abstraction:

```
┌─────────────────────────────────────────────┐
│                Applications                 │
├─────────────────────────────────────────────┤
│    KV Store    │ Document Store │  Custom   │
├─────────────────────────────────────────────┤
│             Walrus Data Client              │
├─────────────────────────────────────────────┤
│    Query Engine    │    Index Layer        │
├─────────────────────────────────────────────┤
│         Cache Layer (Optional)              │
├─────────────────────────────────────────────┤
│             Walrus SDK (@mysten)            │
├─────────────────────────────────────────────┤
│          Walrus Network (Testnet)           │
└─────────────────────────────────────────────┘
```

## 🔧 Configuration

### Client Options

```typescript
import { createClient } from 'walrus-data-sdk';

const client = createClient({
  publisherUrl: 'https://publisher.walrus-testnet.walrus.space',
  aggregatorUrl: 'https://aggregator.walrus-testnet.walrus.space',
  timeout: 30000,          // 30 second timeout
  retries: 3,              // 3 retry attempts
  retryDelay: 1000,        // 1 second between retries
  maxBlobSize: 10485760,   // 10MB max blob size
  defaultEpochs: 5,        // Default storage epochs
  enableCaching: true,     // Enable client-side caching
  cacheTimeout: 300000     // 5 minute cache TTL
});
```

### Optimized Clients

```typescript
import { createOptimizedClient } from 'walrus-data-sdk';

// High-throughput applications
const throughputClient = createOptimizedClient('high-throughput');

// Low-latency applications  
const latencyClient = createOptimizedClient('low-latency');

// Large data storage
const largeDataClient = createOptimizedClient('large-data');

// Real-time applications
const realtimeClient = createOptimizedClient('real-time');
```

## 📋 Core API Reference

### WalrusDataClient

#### Store Data
```typescript
await client.store<T>(data: T, options?: {
  schema?: string;           // Schema identifier
  tags?: string[];          // Searchable tags
  categories?: string[];    // Data categories
  epochs?: number;          // Storage duration
  metadata?: object;        // Additional metadata
  enableIndexing?: boolean; // Enable automatic indexing
});
```

#### Retrieve Data
```typescript
await client.retrieve<T>(
  id: string,              // Data ID or Blob ID
  isBlob?: boolean        // Whether ID is a blob ID
);
```

#### Query Data
```typescript
await client.query<T>({
  schema?: string | string[];           // Schema filters
  tags?: string[];                     // Tag filters
  categories?: string[];               // Category filters
  author?: string | string[];          // Author filters
  contentType?: string | string[];     // Content type filters
  
  // Field-specific queries
  fieldQueries?: Array<{
    field: string;
    value: any;
    operator: 'eq' | 'ne' | 'lt' | 'le' | 'gt' | 'ge' | 
              'in' | 'contains' | 'startsWith' | 'endsWith';
  }>;
  
  // Date range filtering
  dateRange?: {
    from?: Date;
    to?: Date;
  };
  
  // Text search
  fullTextSearch?: string;
  
  // Pagination and sorting
  limit?: number;
  offset?: number;
  sortBy?: 'created' | 'updated' | 'size' | 'relevance';
  sortOrder?: 'asc' | 'desc';
  
  // Performance options
  includeData?: boolean;               // Include full data or just metadata
  customFilters?: (item) => boolean;   // Custom filter function
});
```

#### Bulk Operations
```typescript
await client.getBulk({
  dataIds?: string[];      // List of data IDs
  blobIds?: string[];      // List of blob IDs  
  query?: SearchQuery;     // Query to determine IDs
  includeData?: boolean;   // Include full data
  includeMetadata?: boolean; // Include metadata
});
```

## 🏷️ Schema Management

### Auto-Generate Schemas

```typescript
import { generateSchema, validateSchema } from 'walrus-data-sdk';

const sampleData = [
  { id: 1, name: 'John', email: 'john@example.com', age: 30 },
  { id: 2, name: 'Jane', email: 'jane@example.com', age: 25 }
];

// Generate schema from sample data
const schema = generateSchema(sampleData, 'user-profile');

// Validate data against schema
const isValid = validateSchema(newUserData, schema);
```

### Custom Schemas

```typescript
const customSchema = {
  id: 'product-catalog',
  version: '1.0.0',
  name: 'Product Catalog Schema',
  properties: {
    id: { type: 'string', required: true, indexed: true },
    name: { type: 'string', required: true, searchable: true },
    price: { type: 'number', required: true, indexed: true },
    category: { type: 'string', required: true, indexed: true },
    inStock: { type: 'boolean', required: true, indexed: true }
  },
  indexes: [
    { name: 'idx_category_price', type: 'btree', fields: ['category', 'price'] },
    { name: 'idx_name_fulltext', type: 'fulltext', fields: ['name'] }
  ]
};
```

## 🔍 Advanced Querying

### Complex Filters

```typescript
// Multi-field query with various operators
const results = await client.query({
  schema: ['product'],
  fieldQueries: [
    { field: 'category', value: 'Electronics', operator: 'eq' },
    { field: 'price', value: 1000, operator: 'lt' },
    { field: 'rating', value: 4.0, operator: 'ge' },
    { field: 'name', value: 'iPhone', operator: 'contains' }
  ],
  tags: ['featured'],
  dateRange: {
    from: new Date('2024-01-01'),
    to: new Date()
  },
  sortBy: 'created',
  sortOrder: 'desc',
  limit: 20
});
```

### Full-Text Search

```typescript
const searchResults = await client.query({
  schema: ['article', 'blog-post'],
  fullTextSearch: 'machine learning artificial intelligence',
  fieldQueries: [
    { field: 'status', value: 'published', operator: 'eq' }
  ],
  sortBy: 'relevance',
  limit: 10
});
```

### Custom Filters

```typescript
const filtered = await client.query({
  schema: ['user-profile'],
  customFilters: (item) => {
    const user = item.data;
    return user.age >= 18 && user.skills?.length > 2;
  }
});
```

## 📊 Performance & Optimization

### Query Optimization

```typescript
import { optimizeQuery } from 'walrus-data-sdk';

const slowQuery = {
  limit: 1000,
  sortBy: 'relevance',
  fieldQueries: [
    { field: 'name', value: 'John', operator: 'contains' }
  ]
};

// Automatically optimize query for better performance
const fastQuery = optimizeQuery(slowQuery);
```

### Indexing

```typescript
import { createIndex } from 'walrus-data-sdk';

// Create efficient indexes
const nameIndex = createIndex('idx_name', ['name'], { type: 'btree' });
const emailIndex = createIndex('idx_email', ['email'], { type: 'hash', unique: true });
const fullTextIndex = createIndex('idx_content', ['title', 'content'], { type: 'fulltext' });
```

### Caching

```typescript
// Built-in caching with configurable options
const client = createClient({
  enableCaching: true,
  cacheTimeout: 600000,  // 10 minutes
});

// Manual cache control
const result = await client.retrieve(id); // First call - from Walrus
const cached = await client.retrieve(id);  // Second call - from cache
```

## 🔄 Real-Time Features

### Event Subscriptions

```typescript
// Subscribe to data changes
const subscriptionId = client.subscribe((event) => {
  console.log(`${event.type}: ${event.dataId}`);
  
  if (event.type === 'created') {
    console.log('New data:', event.data);
  }
}, {
  schemas: ['user-profile'],
  eventTypes: ['created', 'updated'],
  authors: ['admin']
});

// Unsubscribe when done
client.unsubscribe(subscriptionId);
```

## 📈 Monitoring & Health

### Health Checks

```typescript
import { healthCheck } from 'walrus-data-sdk';

const health = await healthCheck();
console.log(`Status: ${health.status}`);
console.log(`Walrus available: ${health.walrusStatus.available}`);
console.log(`Cache hit rate: ${health.cacheStatus?.hitRate}%`);
```

### Statistics

```typescript
import { getStats } from 'walrus-data-sdk';

const stats = await getStats();
console.log(`Total items: ${stats.totalItems}`);
console.log(`Total size: ${stats.totalSize} bytes`);
console.log(`Top schemas:`, Object.keys(stats.schemas));
```

### Client Metrics

```typescript
const metrics = client.getMetrics();
console.log(`Requests: ${metrics.requestCount}`);
console.log(`Avg response time: ${metrics.avgResponseTime}ms`);
console.log(`Error rate: ${metrics.errorRate * 100}%`);
console.log(`Cache hit rate: ${metrics.cacheHitRate * 100}%`);
```

## 🛡️ Error Handling

### Error Types

```typescript
import {
  WalrusDataError,
  WalrusNetworkError,
  WalrusValidationError,
  WalrusNotFoundError,
  WalrusStorageError,
  WalrusRateLimitError
} from 'walrus-data-sdk';

try {
  const result = await client.store(data);
} catch (error) {
  if (error instanceof WalrusValidationError) {
    console.log('Validation failed:', error.message);
  } else if (error instanceof WalrusStorageError) {
    console.log('Storage failed:', error.message);
    // Retry logic here
  } else if (error instanceof WalrusNetworkError) {
    console.log('Network error:', error.message);
    // Fallback strategy
  }
}
```

### Retry Strategies

```typescript
import { retryWithBackoff } from 'walrus-data-sdk';

const result = await retryWithBackoff(
  () => client.store(data),
  3,    // max retries
  1000, // base delay
  10000 // max delay
);
```

## 🌟 Use Cases

### Content Management

```typescript
const articles = new DocumentStore('articles');

// Create article
await articles.insert({
  title: 'Getting Started with Walrus',
  content: 'Walrus is a decentralized storage network...',
  author: 'tech-writer',
  status: 'published',
  tags: ['tutorial', 'walrus', 'storage']
});

// Find recent articles
const recent = await articles.find({
  fieldQueries: [{ field: 'status', value: 'published', operator: 'eq' }],
  dateRange: { from: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
  sortBy: 'created',
  limit: 10
});
```

### IoT Data Collection

```typescript
// Store sensor readings
const readings = await Promise.all(
  sensorData.map(reading => client.store(reading, {
    schema: 'sensor-reading',
    tags: ['iot', 'sensor', reading.sensorId],
    categories: ['telemetry']
  }))
);

// Query recent data
const recentReadings = await client.query({
  schema: ['sensor-reading'],
  fieldQueries: [{ field: 'sensorId', value: 'temp-01', operator: 'eq' }],
  dateRange: { from: new Date(Date.now() - 60 * 60 * 1000) }, // Last hour
  sortBy: 'created'
});
```

### E-Commerce Catalog

```typescript
// Store products
await client.store({
  sku: 'LAPTOP-001',
  name: 'Gaming Laptop Pro',
  category: 'Electronics',
  price: 1299.99,
  inStock: true,
  specifications: {
    cpu: 'Intel i7',
    ram: '16GB',
    storage: '1TB SSD'
  }
}, {
  schema: 'product',
  tags: ['laptop', 'gaming', 'electronics'],
  categories: ['catalog']
});

// Search products
const laptops = await client.query({
  schema: ['product'],
  fullTextSearch: 'laptop gaming',
  fieldQueries: [
    { field: 'category', value: 'Electronics', operator: 'eq' },
    { field: 'price', value: 2000, operator: 'lt' },
    { field: 'inStock', value: true, operator: 'eq' }
  ]
});
```

## 🔧 Migration from v1.x

If migrating from the NOCAP-specific v1.x SDK:

### Client Creation
```typescript
// v1.x (NOCAP-specific)
import { createClient } from 'nocap-sdk';
const client = createClient({ apiUrl: 'https://nocap.app/api' });

// v2.x (Generic)
import { createClient } from 'walrus-data-sdk';
const client = createClient({ 
  publisherUrl: 'https://publisher.walrus-testnet.walrus.space' 
});
```

### Data Storage
```typescript
// v1.x - Fact-specific
const fact = await client.getFact(factId);

// v2.x - Generic data
const item = await client.retrieve(dataId);
```

### Querying
```typescript
// v1.x - Fact search
const facts = await client.searchFacts({ 
  keywords: ['climate'], 
  status: ['verified'] 
});

// v2.x - Generic query
const items = await client.query({ 
  fullTextSearch: 'climate',
  fieldQueries: [{ field: 'status', value: 'verified', operator: 'eq' }]
});
```

## 🚧 Roadmap

- **Q1 2024**
  - ✅ v2.0.0 Generic SDK Release
  - ✅ Real Walrus Integration
  - ✅ O(1) Query Capabilities
  - ✅ Advanced Caching

- **Q2 2024** 
  - 🔄 External Index Service Integration
  - 🔄 GraphQL Query Interface
  - 🔄 Real-time Subscriptions via WebSockets
  - 🔄 Multi-language Support (Python, Rust)

- **Q3 2024**
  - 📋 Enterprise Features (Auth, RBAC)
  - 📋 Data Migration Tools
  - 📋 Performance Monitoring Dashboard
  - 📋 Cloud-hosted Index Service

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Setup

```bash
git clone https://github.com/walrus-data/sdk.git
cd sdk
npm install
npm run dev
```

### Running Tests

```bash
npm test              # Unit tests
npm run test:integration  # Integration tests
npm run test:coverage     # Coverage report
```

### Building

```bash
npm run build         # Build for production
npm run build:docs    # Generate documentation
```

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

## 🔗 Links

- 🌐 **Walrus Network**: [https://walrus.space](https://walrus.space)
- 📚 **SDK Documentation**: [https://docs.walrus-data.dev](https://docs.walrus-data.dev)
- 🐛 **Report Issues**: [GitHub Issues](https://github.com/walrus-data/sdk/issues)
- 💬 **Discord Community**: [Join our Discord](https://discord.gg/walrus-data)
- 📧 **Email Support**: [support@walrus-data.dev](mailto:support@walrus-data.dev)

## 📊 Changelog

### v2.0.0 - 2024-01-15

**🚀 Major Release - Generic Walrus Data SDK**

#### Breaking Changes
- Complete rewrite from NOCAP-specific to generic Walrus data SDK
- New API design with `WalrusDataClient` replacing `NOCAPClient`
- Schema-based data organization instead of fact-based
- Updated error types and validation

#### New Features
- **Real Walrus Integration**: Direct integration with `@mysten/walrus` SDK
- **O(1) Query Capabilities**: Efficient indexed lookups with caching
- **Schema Management**: Auto-generation and validation of data schemas
- **Multiple Store Interfaces**: KV store, document store, and generic client
- **Advanced Querying**: Complex filters, full-text search, field queries
- **Bulk Operations**: Efficient handling of large datasets
- **Real-time Events**: Subscribe to data changes and updates
- **Performance Optimization**: Built-in metrics and query optimization
- **Smart Caching**: Configurable caching with TTL strategies

#### Migration
- See migration guide above for upgrading from v1.x
- Breaking changes require code updates
- Improved TypeScript support and type safety

---

**Built with ❤️ for the decentralized web**
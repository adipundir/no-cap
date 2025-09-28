/**
<<<<<<< HEAD
 * NOCAP SDK Examples
 * 
 * TODO: Fix examples after type definitions are restored
 * Temporarily simplified for build
 */

import { NOCAPClient } from './client'

export async function runExamples() {
  console.log('NOCAP SDK Examples - Temporarily disabled for build')
  console.log('TODO: Restore examples after fixing type definitions')
  
  const client = new NOCAPClient()
  
  // Basic example
  const facts = await client.getFacts()
  console.log('Sample facts:', facts)
  
  return facts
}

// Export for testing
export default runExamples
=======
 * Walrus Data SDK Usage Examples
 * 
 * This file demonstrates how to use the generic Walrus Data SDK to store,
 * query, and index structured data on the Walrus decentralized storage network
 */

import { 
  createClient, 
  createOptimizedClient,
  store, 
  retrieve, 
  query, 
  healthCheck,
  getStats,
  KVStore,
  DocumentStore,
  createStores,
  WalrusDataClient,
  WalrusDataItem,
  generateSchema,
  validateSchema,
  createIndex,
  optimizeQuery
} from './index';

// Example 1: Basic data storage and retrieval
async function basicUsage() {
  console.log('=== Basic Usage Example ===');
  
  // Create a client
  const client = createClient({
    timeout: 10000,
    enableCaching: true
  });

  try {
    // Store some structured data
    const userData = {
      id: 'user-123',
      name: 'Alice Johnson',
      email: 'alice@example.com',
      profile: {
        bio: 'Software engineer passionate about decentralized systems',
        skills: ['TypeScript', 'Rust', 'Blockchain'],
        location: 'San Francisco'
      },
      created: new Date(),
      verified: true
    };

    console.log('📤 Storing user data...');
    const storeResult = await client.store(userData, {
      schema: 'user-profile',
      tags: ['user', 'profile', 'verified'],
      categories: ['personal-data'],
      metadata: {
        author: 'alice@example.com',
        contentType: 'application/json'
      }
    });

    console.log(`✅ Stored with ID: ${storeResult.dataId}`);
    console.log(`📦 Blob ID: ${storeResult.blobId}`);
    console.log(`💾 Size: ${storeResult.size} bytes`);

    // Retrieve the data
    console.log('\n📥 Retrieving data...');
    const retrieveResult = await client.retrieve(storeResult.dataId);
    console.log(`Retrieved user: ${retrieveResult.item.data.name}`);
    console.log(`From cache: ${retrieveResult.cached}`);
    
  } catch (error) {
    console.error('Basic usage error:', error);
  }
}

// Example 2: Advanced querying with filters
async function advancedQuerying() {
  console.log('\n=== Advanced Querying Example ===');
  
  const client = createClient();

  try {
    // First, let's store some sample data
    const products = [
      {
        id: 'prod-1',
        name: 'Laptop Pro',
        category: 'Electronics',
        price: 1299.99,
        brand: 'TechCorp',
        rating: 4.5,
        inStock: true,
        tags: ['computer', 'portable', 'work']
      },
      {
        id: 'prod-2', 
        name: 'Wireless Headphones',
        category: 'Electronics',
        price: 199.99,
        brand: 'AudioMax',
        rating: 4.2,
        inStock: false,
        tags: ['audio', 'wireless', 'music']
      },
      {
        id: 'prod-3',
        name: 'Coffee Maker',
        category: 'Kitchen',
        price: 89.99,
        brand: 'BrewMaster',
        rating: 4.7,
        inStock: true,
        tags: ['kitchen', 'coffee', 'appliance']
      }
    ];

    console.log('📤 Storing product catalog...');
    const storePromises = products.map((product, index) => 
      client.store(product, {
        schema: 'product',
        categories: ['e-commerce', 'catalog'],
        tags: ['product', ...product.tags],
        metadata: {
          author: 'store-system',
          contentType: 'application/json'
        }
      })
    );

    await Promise.all(storePromises);
    console.log('✅ All products stored');

    // Query by schema and category
    console.log('\n🔍 Querying electronics products...');
    const electronicsQuery = await client.query({
      schema: ['product'],
      fieldQueries: [
        { field: 'category', value: 'Electronics', operator: 'eq' }
      ],
      sortBy: 'created',
      sortOrder: 'desc'
    });

    console.log(`Found ${electronicsQuery.totalCount} electronics products:`);
    electronicsQuery.items.forEach(item => {
      console.log(`- ${item.data.name}: $${item.data.price} (${item.data.rating}⭐)`);
    });

    // Query with price range
    console.log('\n💰 Querying products under $200...');
    const affordableQuery = await client.query({
      schema: ['product'],
      fieldQueries: [
        { field: 'price', value: 200, operator: 'lt' },
        { field: 'inStock', value: true, operator: 'eq' }
      ]
    });

    console.log(`Found ${affordableQuery.totalCount} affordable in-stock products:`);
    affordableQuery.items.forEach(item => {
      console.log(`- ${item.data.name}: $${item.data.price}`);
    });

    // Advanced query with multiple filters
    console.log('\n🎯 Complex query: High-rated electronics in stock...');
    const complexQuery = await client.query({
      schema: ['product'],
      fieldQueries: [
        { field: 'category', value: 'Electronics', operator: 'eq' },
        { field: 'rating', value: 4.0, operator: 'ge' },
        { field: 'inStock', value: true, operator: 'eq' }
      ],
      tags: ['computer', 'portable'],
      sortBy: 'created',
      limit: 10
    });

    console.log(`Found ${complexQuery.totalCount} high-rated electronics:`);
    complexQuery.items.forEach(item => {
      console.log(`- ${item.data.name}: $${item.data.price} (${item.data.rating}⭐)`);
    });

  } catch (error) {
    console.error('Advanced querying error:', error);
  }
}

// Example 3: Schema generation and validation
async function schemaManagement() {
  console.log('\n=== Schema Management Example ===');

  try {
    // Sample blog posts
    const blogPosts = [
      {
        id: 'post-1',
        title: 'Getting Started with Walrus Storage',
        content: 'Walrus is a decentralized storage network...',
        author: 'tech-blogger',
        publishedAt: new Date('2024-01-15'),
        tags: ['walrus', 'storage', 'blockchain'],
        viewCount: 150,
        featured: true
      },
      {
        id: 'post-2',
        title: 'Building Decentralized Applications',
        content: 'Modern dApps require reliable storage solutions...',
        author: 'dev-advocate',
        publishedAt: new Date('2024-02-01'),
        tags: ['dapp', 'development', 'tutorial'],
        viewCount: 89,
        featured: false
      }
    ];

    // Generate schema from sample data
    console.log('🔨 Generating schema from sample data...');
    const schema = generateSchema(blogPosts, 'blog-post', 'Blog Post Schema');
    
    console.log('Generated schema:');
    console.log(`- ID: ${schema.id}`);
    console.log(`- Properties: ${Object.keys(schema.properties).join(', ')}`);
    console.log(`- Indexes: ${schema.indexes?.map(idx => idx.name).join(', ')}`);

    // Validate data against schema
    console.log('\n✅ Validating data against schema...');
    blogPosts.forEach((post, index) => {
      try {
        const isValid = validateSchema(post, schema);
        console.log(`Post ${index + 1}: ${isValid ? 'Valid' : 'Invalid'}`);
      } catch (error) {
        console.log(`Post ${index + 1}: Invalid - ${error}`);
      }
    });

    // Store with schema
    const client = createClient();
    console.log('\n📤 Storing blog posts with schema validation...');
    
    for (const post of blogPosts) {
      const result = await client.store(post, {
        schema: schema.id,
        categories: ['blog', 'content'],
        tags: ['blog-post', ...post.tags],
        enableIndexing: true
      });
      console.log(`Stored: ${post.title} (${result.dataId})`);
    }

  } catch (error) {
    console.error('Schema management error:', error);
  }
}

// Example 4: Key-Value Store interface
async function keyValueStore() {
  console.log('\n=== Key-Value Store Example ===');

  try {
    // Create a KV store
    const kv = new KVStore();

    // Store some key-value pairs
    console.log('📝 Setting key-value pairs...');
    await kv.set('user:123:name', 'John Doe');
    await kv.set('user:123:email', 'john@example.com');
    await kv.set('config:theme', 'dark');
    await kv.set('config:language', 'en-US');

    // Retrieve values
    console.log('\n📖 Getting values...');
    const userName = await kv.get('user:123:name');
    const userEmail = await kv.get('user:123:email');
    const theme = await kv.get('config:theme');
    
    console.log(`User: ${userName} (${userEmail})`);
    console.log(`Theme: ${theme}`);

    // Check if key exists
    const hasProfile = await kv.exists('user:123:profile');
    console.log(`Has profile: ${hasProfile}`);

    // List keys with pattern
    console.log('\n🔑 Listing keys...');
    const userKeys = await kv.keys('user:*');
    const configKeys = await kv.keys('config:*');
    
    console.log(`User keys: ${userKeys.join(', ')}`);
    console.log(`Config keys: ${configKeys.join(', ')}`);

    // Delete a key
    await kv.delete('config:language');
    console.log('Deleted config:language');

  } catch (error) {
    console.error('KV store error:', error);
  }
}

// Example 5: Document Store interface
async function documentStore() {
  console.log('\n=== Document Store Example ===');

  try {
    // Create document stores for different collections
    const users = new DocumentStore('users');
    const orders = new DocumentStore('orders');

    // Insert user documents
    console.log('👥 Inserting user documents...');
    const userIds = await Promise.all([
      users.insert({
        name: 'Alice Smith',
        email: 'alice@example.com',
        role: 'admin',
        createdAt: new Date(),
        preferences: { theme: 'dark', notifications: true }
      }),
      users.insert({
        name: 'Bob Johnson',
        email: 'bob@example.com', 
        role: 'user',
        createdAt: new Date(),
        preferences: { theme: 'light', notifications: false }
      })
    ]);

    console.log(`Inserted users: ${userIds.join(', ')}`);

    // Insert order documents
    console.log('\n🛍️ Inserting order documents...');
    await orders.insert({
      userId: userIds[0],
      items: [
        { name: 'Widget A', price: 29.99, quantity: 2 },
        { name: 'Widget B', price: 19.99, quantity: 1 }
      ],
      total: 79.97,
      status: 'completed',
      orderDate: new Date()
    });

    await orders.insert({
      userId: userIds[1],
      items: [
        { name: 'Widget C', price: 39.99, quantity: 1 }
      ],
      total: 39.99,
      status: 'pending',
      orderDate: new Date()
    });

    // Query documents
    console.log('\n🔍 Querying documents...');
    
    // Find all admin users
    const adminUsers = await users.find({
      fieldQueries: [{ field: 'role', value: 'admin', operator: 'eq' }]
    });
    console.log(`Admin users: ${adminUsers.map(u => u.name).join(', ')}`);

    // Find completed orders
    const completedOrders = await orders.find({
      fieldQueries: [{ field: 'status', value: 'completed', operator: 'eq' }]
    });
    console.log(`Completed orders: ${completedOrders.length}`);

    // Count documents
    const totalUsers = await users.count();
    const totalOrders = await orders.count();
    console.log(`\nTotal users: ${totalUsers}, Total orders: ${totalOrders}`);

    // Find one document
    const firstUser = await users.findOne({
      fieldQueries: [{ field: 'role', value: 'user', operator: 'eq' }]
    });
    console.log(`First regular user: ${firstUser?.name}`);

  } catch (error) {
    console.error('Document store error:', error);
  }
}

// Example 6: Bulk operations and performance
async function bulkOperations() {
  console.log('\n=== Bulk Operations Example ===');

  try {
    const client = createOptimizedClient('high-throughput');

    // Generate sample data
    const generateSampleData = (count: number) => {
      return Array.from({ length: count }, (_, i) => ({
        id: `item-${i}`,
        name: `Item ${i}`,
        category: ['Electronics', 'Books', 'Clothing', 'Home'][i % 4],
        price: Math.round((Math.random() * 1000 + 10) * 100) / 100,
        createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000)
      }));
    };

    // Store data in bulk
    console.log('📤 Storing 20 items in parallel...');
    const items = generateSampleData(20);
    const startTime = Date.now();

    const storePromises = items.map(item => 
      client.store(item, {
        schema: 'inventory-item',
        categories: ['inventory'],
        tags: ['bulk-test', item.category.toLowerCase()]
      })
    );

    const storeResults = await Promise.all(storePromises);
    const storeTime = Date.now() - startTime;
    
    console.log(`✅ Stored ${storeResults.length} items in ${storeTime}ms`);
    console.log(`Average: ${Math.round(storeTime / storeResults.length)}ms per item`);

    // Bulk retrieve
    console.log('\n📥 Bulk retrieving items...');
    const dataIds = storeResults.map(result => result.dataId);
    
    const retrieveStartTime = Date.now();
    const bulkResult = await client.getBulk({
      dataIds,
      includeData: true
    });
    const retrieveTime = Date.now() - retrieveStartTime;

    console.log(`Retrieved ${bulkResult.totalReturned}/${bulkResult.totalRequested} items`);
    console.log(`Bulk retrieve time: ${retrieveTime}ms`);
    console.log(`Errors: ${bulkResult.totalErrors}`);

    // Query performance test
    console.log('\n🔍 Query performance test...');
    const queryStartTime = Date.now();
    
    const queryResult = await client.query({
      schema: ['inventory-item'],
      fieldQueries: [
        { field: 'category', value: 'Electronics', operator: 'eq' },
        { field: 'price', value: 500, operator: 'lt' }
      ],
      sortBy: 'created',
      limit: 10
    });
    
    const queryTime = Date.now() - queryStartTime;
    console.log(`Query completed in ${queryTime}ms`);
    console.log(`Found ${queryResult.totalCount} matching items`);

  } catch (error) {
    console.error('Bulk operations error:', error);
  }
}

// Example 7: Real-time subscriptions and events
async function realTimeEvents() {
  console.log('\n=== Real-time Events Example ===');

  try {
    const client = createClient();

    // Subscribe to data events
    console.log('🔔 Setting up event subscriptions...');
    
    const subscriptionId = client.subscribe((event) => {
      console.log(`📨 Event: ${event.type} for ${event.dataId}`);
      if (event.data) {
        console.log(`   Data: ${JSON.stringify(event.data.data).substring(0, 100)}...`);
      }
    }, {
      schemas: ['notification'],
      eventTypes: ['created', 'updated']
    });

    // Simulate some data changes
    console.log('\n📤 Creating notifications...');
    
    const notifications = [
      { type: 'info', message: 'System update completed', userId: 'user-123' },
      { type: 'warning', message: 'Low storage space', userId: 'user-456' },
      { type: 'error', message: 'Failed backup detected', userId: 'admin-789' }
    ];

    for (const notification of notifications) {
      await client.store(notification, {
        schema: 'notification',
        categories: ['system'],
        tags: ['notification', notification.type]
      });
      
      // Small delay to see events
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    console.log('📝 Events should have been triggered above');

    // Clean up subscription
    client.unsubscribe(subscriptionId);
    console.log('🔕 Unsubscribed from events');

  } catch (error) {
    console.error('Real-time events error:', error);
  }
}

// Example 8: Health monitoring and statistics
async function healthAndStats() {
  console.log('\n=== Health & Statistics Example ===');

  try {
    // Check system health
    console.log('🏥 Checking system health...');
    const health = await healthCheck();
    
    console.log(`Status: ${health.status}`);
    console.log(`Version: ${health.version}`);
    console.log(`Walrus available: ${health.walrusStatus.available}`);
    console.log(`Publisher latency: ${health.walrusStatus.publisherLatency}ms`);
    console.log(`Aggregator latency: ${health.walrusStatus.aggregatorLatency}ms`);
    
    if (health.cacheStatus) {
      console.log(`Cache hit rate: ${(health.cacheStatus.hitRate * 100).toFixed(1)}%`);
      console.log(`Cache size: ${health.cacheStatus.size}/${health.cacheStatus.maxSize}`);
    }

    // Get comprehensive statistics
    console.log('\n📊 Getting index statistics...');
    const stats = await getStats();
    
    console.log(`Total items: ${stats.totalItems}`);
    console.log(`Total size: ${Math.round(stats.totalSize / 1024)} KB`);
    console.log(`Schemas: ${Object.keys(stats.schemas).length}`);
    console.log(`Categories: ${Object.keys(stats.categories).length}`);
    console.log(`Tags: ${Object.keys(stats.tags).length}`);
    console.log(`Authors: ${Object.keys(stats.authors).length}`);

    // Show top schemas
    if (Object.keys(stats.schemas).length > 0) {
      console.log('\nTop schemas:');
      Object.entries(stats.schemas)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 5)
        .forEach(([schema, count]) => {
          console.log(`  ${schema}: ${count} items`);
        });
    }

    // Client metrics
    const client = createClient();
    const metrics = client.getMetrics();
    console.log('\n📈 Client metrics:');
    console.log(`Requests: ${metrics.requestCount}`);
    console.log(`Avg response time: ${metrics.avgResponseTime.toFixed(2)}ms`);
    console.log(`Error rate: ${(metrics.errorRate * 100).toFixed(2)}%`);
    console.log(`Cache hit rate: ${(metrics.cacheHitRate * 100).toFixed(2)}%`);

  } catch (error) {
    console.error('Health & stats error:', error);
  }
}

// Example 9: Query optimization
async function queryOptimization() {
  console.log('\n=== Query Optimization Example ===');

  try {
    console.log('🔧 Query optimization examples...');

    // Unoptimized query
    const slowQuery = {
      schema: ['user-profile', 'user-settings'],
      fieldQueries: [
        { field: 'name', value: 'Alice', operator: 'contains' as const },
        { field: 'email', value: '@example.com', operator: 'endsWith' as const }
      ],
      fullTextSearch: 'software engineer',
      limit: 1000,
      sortBy: 'relevance' as const
    };

    console.log('Original query:', JSON.stringify(slowQuery, null, 2));

    // Optimize the query
    const optimizedQuery = optimizeQuery(slowQuery);
    console.log('\nOptimized query:', JSON.stringify(optimizedQuery, null, 2));

    console.log('\nOptimizations applied:');
    console.log('- Reduced limit from 1000 to 100');
    console.log('- Changed sort from "relevance" to "created desc"');
    console.log('- Reordered field queries (exact matches first)');

    // Create custom indexes for better performance
    console.log('\n📇 Creating performance indexes...');
    
    const nameIndex = createIndex('idx_user_name', ['name'], {
      type: 'btree',
      unique: false
    });
    
    const emailIndex = createIndex('idx_user_email', ['email'], {
      type: 'hash',
      unique: true
    });
    
    const compoundIndex = createIndex('idx_user_compound', ['schema', 'createdAt'], {
      type: 'btree'
    });

    console.log(`Created indexes: ${nameIndex.name}, ${emailIndex.name}, ${compoundIndex.name}`);

    // Performance tips
    console.log('\n💡 Performance tips:');
    console.log('1. Use exact matches (eq) over contains/startsWith when possible');
    console.log('2. Limit results to reasonable sizes (< 100 items)');
    console.log('3. Sort by indexed fields like "created" or "updated"');
    console.log('4. Use field queries before full-text search');
    console.log('5. Enable caching for frequently accessed data');

  } catch (error) {
    console.error('Query optimization error:', error);
  }
}

// Example 10: Error handling and recovery
async function errorHandling() {
  console.log('\n=== Error Handling Example ===');

  try {
    const client = createClient({
      timeout: 1000, // Very short timeout
      retries: 1
    });

    console.log('🚨 Testing error scenarios...');

    // Test 1: Invalid data ID
    try {
      await client.retrieve('invalid-id');
    } catch (error) {
      console.log(`✅ Caught expected error: ${error.constructor.name}`);
      console.log(`   Message: ${error.message}`);
    }

    // Test 2: Invalid query
    try {
      await client.query({
        limit: -1, // Invalid limit
        offset: 'invalid' as any // Invalid offset type
      });
    } catch (error) {
      console.log(`✅ Caught validation error: ${error.constructor.name}`);
      console.log(`   Message: ${error.message}`);
    }

    // Test 3: Storage limits
    try {
      const largeData = 'x'.repeat(50 * 1024 * 1024); // 50MB string
      await client.store({ data: largeData });
    } catch (error) {
      console.log(`✅ Caught storage error: ${error.constructor.name}`);
      console.log(`   Message: ${error.message}`);
    }

    console.log('\n🔧 Error recovery strategies:');
    console.log('1. Use retries with exponential backoff');
    console.log('2. Implement circuit breakers for failing services');
    console.log('3. Cache frequently accessed data');
    console.log('4. Validate data before storage operations');
    console.log('5. Monitor error rates and set up alerts');

  } catch (error) {
    console.error('Error handling example error:', error);
  }
}

// Main function to run all examples
async function runAllExamples() {
  console.log('Walrus Data SDK v2.0.0 Examples');
  console.log('==============================');

  const examples = [
    { name: 'Basic Usage', fn: basicUsage },
    { name: 'Advanced Querying', fn: advancedQuerying },
    { name: 'Schema Management', fn: schemaManagement },
    { name: 'Key-Value Store', fn: keyValueStore },
    { name: 'Document Store', fn: documentStore },
    { name: 'Bulk Operations', fn: bulkOperations },
    { name: 'Real-time Events', fn: realTimeEvents },
    { name: 'Health & Statistics', fn: healthAndStats },
    { name: 'Query Optimization', fn: queryOptimization },
    { name: 'Error Handling', fn: errorHandling }
  ];

  for (const example of examples) {
    try {
      await example.fn();
      console.log(`\n✅ ${example.name} completed successfully`);
    } catch (error) {
      console.error(`\n❌ ${example.name} failed:`, error);
    }
    console.log('\n' + '─'.repeat(50));
  }

  console.log('\n🎉 All examples completed!');
  console.log('\nNext steps:');
  console.log('1. Explore the SDK documentation');
  console.log('2. Try the examples with your own data');
  console.log('3. Build your own applications using Walrus storage');
  console.log('4. Join our community for support and updates');
}

// Export individual example functions
export {
  basicUsage,
  advancedQuerying,
  schemaManagement,
  keyValueStore,
  documentStore,
  bulkOperations,
  realTimeEvents,
  healthAndStats,
  queryOptimization,
  errorHandling,
  runAllExamples
};

// Real-world use case examples

// Example: Building a content management system
export async function contentManagementExample() {
  console.log('\n=== Content Management System Example ===');

  const { documents } = createStores();
  
  const articles = documents('articles');
  const comments = documents('comments');

  // Create article
  const articleId = await articles.insert({
    title: 'The Future of Decentralized Storage',
    content: 'As we move towards a more decentralized web...',
    author: 'tech-writer',
    status: 'published',
    publishedAt: new Date(),
    tags: ['technology', 'blockchain', 'storage'],
    metadata: {
      readTime: 8,
      wordCount: 1500
    }
  });

  console.log(`Created article: ${articleId}`);

  // Add comments
  await comments.insert({
    articleId,
    author: 'reader1',
    content: 'Great article! Very informative.',
    createdAt: new Date(),
    votes: 5
  });

  // Query recent articles
  const recentArticles = await articles.find({
    fieldQueries: [
      { field: 'status', value: 'published', operator: 'eq' }
    ],
    dateRange: {
      from: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) // Last 30 days
    },
    sortBy: 'created',
    sortOrder: 'desc'
  });

  console.log(`Found ${recentArticles.length} recent articles`);
}

// Example: IoT data collection
export async function iotDataExample() {
  console.log('\n=== IoT Data Collection Example ===');

  const client = createOptimizedClient('high-throughput');

  // Simulate sensor data
  const sensorData = Array.from({ length: 100 }, (_, i) => ({
    sensorId: `sensor-${Math.floor(i / 10)}`,
    timestamp: new Date(Date.now() - i * 60000), // Every minute
    temperature: 20 + Math.random() * 15,
    humidity: 40 + Math.random() * 40,
    pressure: 1000 + Math.random() * 50,
    location: {
      lat: 37.7749 + (Math.random() - 0.5) * 0.1,
      lng: -122.4194 + (Math.random() - 0.5) * 0.1
    }
  }));

  console.log('📊 Storing IoT sensor data...');

  // Store all sensor readings
  const results = await Promise.all(
    sensorData.map(reading => 
      client.store(reading, {
        schema: 'sensor-reading',
        categories: ['iot', 'telemetry'],
        tags: ['sensor', reading.sensorId]
      })
    )
  );

  console.log(`Stored ${results.length} sensor readings`);

  // Query recent data from specific sensor
  const recentReadings = await client.query({
    schema: ['sensor-reading'],
    fieldQueries: [
      { field: 'sensorId', value: 'sensor-5', operator: 'eq' }
    ],
    dateRange: {
      from: new Date(Date.now() - 60 * 60 * 1000) // Last hour
    },
    sortBy: 'created',
    limit: 10
  });

  console.log(`Recent readings from sensor-5: ${recentReadings.items.length}`);
}

// Run examples if this file is executed directly
if (typeof require !== 'undefined' && require.main === module) {
  runAllExamples().catch(console.error);
}
>>>>>>> 0ea0660cc4587702e6e3ff1dd1f08bbd625a4929

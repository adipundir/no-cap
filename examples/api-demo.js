#!/usr/bin/env node

/**
 * No-Cap Facts API Demo
 * 
 * This script demonstrates both centralized and decentralized access to No-Cap Facts
 * 
 * Centralized (requires API key): node examples/api-demo.js --mode=centralized
 * Decentralized (no API key): node examples/api-demo.js --mode=decentralized
 */

const { NoCapSDK } = require('../lib/sdk/no-cap-sdk.ts');
const { WalrusDirectSDK } = require('../lib/sdk/walrus-direct-sdk.ts');

// Configuration
const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:3000';
const API_KEY = process.env.NOCAP_API_KEY; // Get from /api/keys

async function main() {
  console.log('🚀 No-Cap Facts API Demo\n');
  
  // Check which mode to run
  const args = process.argv.slice(2);
  const mode = args.find(arg => arg.startsWith('--mode='))?.split('=')[1] || 'decentralized';
  
  let sdk;
  
  if (mode === 'centralized') {
    console.log('🏢 Running in CENTRALIZED mode (requires API key)');
    if (!API_KEY) {
      console.error('❌ API_KEY required for centralized mode');
      console.log('💡 Get your API key at /api/keys or run in decentralized mode');
      process.exit(1);
    }
    
    sdk = new NoCapSDK({
      apiKey: API_KEY,
      baseUrl: API_BASE_URL
    });
    
  } else {
    console.log('🌐 Running in DECENTRALIZED mode (no API key needed!)');
    console.log('   Connecting directly to Walrus network...\n');
    
    sdk = new WalrusDirectSDK({
      aggregatorUrl: process.env.WALRUS_AGGREGATOR || 'https://aggregator.walrus.host',
      publisherUrl: process.env.WALRUS_PUBLISHER || 'https://publisher.walrus.host',
      cacheTimeout: 5 * 60 * 1000 // 5 minutes
    });
  }

  try {
    // 1. Health Check
    console.log('1. Health Check');
    const health = await sdk.ping();
    console.log(`   Status: ${health.status}\n`);

    // 2. Search for verified facts
    console.log('2. Searching for verified facts about "climate"...');
    const climateResults = await sdk.search({
      keywords: 'climate change global warming',
      status: ['verified'],
      limit: 5,
      sortBy: 'importance'
    });
    
    console.log(`   Found ${climateResults.totalCount} results:`);
    climateResults.facts.slice(0, 3).forEach((fact, i) => {
      console.log(`   ${i + 1}. ${fact.title}`);
      console.log(`      Summary: ${fact.summary.substring(0, 100)}...`);
      console.log(`      Tags: ${fact.metadata?.tags?.map(t => t.name).join(', ') || 'None'}\n`);
    });

    // 3. Get popular tags
    console.log('3. Getting popular tags...');
    const tagsResult = await sdk.getTags({ limit: 10, sortBy: 'count' });
    console.log('   Top tags:');
    tagsResult.tags.slice(0, 5).forEach((tag, i) => {
      console.log(`   ${i + 1}. ${tag.name} (${tag.category}) - ${tag.count} facts`);
    });
    console.log();

    // 4. Search by specific tags
    console.log('4. Searching facts tagged with "technology"...');
    const techFacts = await sdk.searchByTag('technology', 3);
    console.log(`   Found ${techFacts.length} technology facts:`);
    techFacts.forEach((fact, i) => {
      console.log(`   ${i + 1}. ${fact.title} - ${fact.status}`);
    });
    console.log();

    // 5. Get analytics
    console.log('5. Getting 30-day analytics...');
    const analytics = await sdk.getAnalytics('30d');
    console.log(`   Total facts: ${analytics.insights.totalFacts}`);
    console.log(`   Verified: ${analytics.insights.verifiedFacts} (${analytics.insights.verificationRate.toFixed(1)}%)`);
    console.log(`   Total tags: ${analytics.insights.totalTags}`);
    console.log(`   Avg tags per fact: ${analytics.insights.averageTagsPerFact.toFixed(1)}`);
    
    if (analytics.insights.topCategories.length > 0) {
      console.log('   Top categories:');
      analytics.insights.topCategories.slice(0, 3).forEach((cat, i) => {
        console.log(`   ${i + 1}. ${cat.category}: ${cat.count} tags`);
      });
    }
    console.log();

    // 6. Advanced search with multiple filters
    console.log('6. Advanced search: AI facts with high importance...');
    const aiResults = await sdk.search({
      keywords: 'artificial intelligence machine learning',
      tags: ['technology', 'ai'],
      status: ['verified'],
      minImportance: 7,
      sortBy: 'importance',
      limit: 3
    });
    
    console.log(`   Found ${aiResults.totalCount} high-importance AI facts:`);
    aiResults.facts.forEach((fact, i) => {
      console.log(`   ${i + 1}. ${fact.title} (importance: ${fact.metadata?.importance || 'N/A'})`);
    });
    console.log();

    // 7. Demonstrate faceted search results
    if (aiResults.facets) {
      console.log('7. Available facets for AI search:');
      if (aiResults.facets.tags.length > 0) {
        console.log(`   Related tags: ${aiResults.facets.tags.slice(0, 5).map(t => `${t.name}(${t.count})`).join(', ')}`);
      }
      if (aiResults.facets.authors.length > 0) {
        console.log(`   Top authors: ${aiResults.facets.authors.slice(0, 3).map(a => `${a.name}(${a.count})`).join(', ')}`);
      }
      console.log();
    }

    // 8. Stream large datasets (demonstration)
    console.log('8. Streaming verified facts (first 5)...');
    let count = 0;
    for await (const fact of sdk.streamFacts({ status: ['verified'] }, 10)) {
      if (count >= 5) break;
      console.log(`   Stream ${count + 1}: ${fact.title}`);
      count++;
    }
    console.log();

    // 9. Batch operations
    console.log('9. Batch search across multiple domains...');
    const batchResults = await sdk.batchSearch([
      { tags: ['science'], limit: 2 },
      { tags: ['technology'], limit: 2 },
      { tags: ['health'], limit: 2 }
    ]);
    
    ['Science', 'Technology', 'Health'].forEach((domain, i) => {
      console.log(`   ${domain}: ${batchResults[i].totalCount} total facts`);
    });
    console.log();

    console.log('✅ Demo completed successfully!');
    console.log('\n💡 Next steps:');
    console.log('   - Get your API key: POST /api/keys');
    console.log('   - Read the docs: /docs/API_GUIDE.md');
    console.log('   - Join our Discord for support');
    console.log('   - Star us on GitHub!');

  } catch (error) {
    if (error.name === 'NoCapAPIError') {
      console.error(`❌ API Error ${error.status}: ${error.message}`);
      if (error.status === 401) {
        console.error('💡 Hint: Set NOCAP_API_KEY environment variable or create an API key at /api/keys');
      }
    } else {
      console.error('❌ Demo failed:', error.message);
    }
  }
}

// Usage examples for different scenarios
async function useCaseExamples() {
  const sdk = new NoCapSDK({ apiKey: API_KEY, baseUrl: API_BASE_URL });

  console.log('\n📚 Use Case Examples:\n');

  // Knowledge Base Integration
  console.log('🔍 Knowledge Base Integration:');
  console.log(`
const facts = await sdk.search({
  status: ['verified'],
  minImportance: 8,
  tags: ['your-domain-tag']
});

facts.facts.forEach(fact => {
  yourKnowledgeBase.addFact({
    id: fact.id,
    title: fact.title,
    content: fact.summary,
    source: 'nocap-verified',
    tags: fact.metadata.tags.map(t => t.name)
  });
});
  `);

  // Content Verification
  console.log('✅ Content Verification:');
  console.log(`
const userClaim = "AI will replace all jobs by 2025";
const relatedFacts = await sdk.searchByKeywords(userClaim);

const verification = relatedFacts.find(fact => 
  fact.status === 'verified' && 
  fact.metadata.importance >= 7
);

if (verification) {
  showFactCheck(verification);
}
  `);

  // Research Dashboard
  console.log('📊 Research Dashboard:');
  console.log(`
const analytics = await sdk.getAnalytics('30d');
const trends = await sdk.getTrends({
  timeframe: '90d',
  tags: ['climate-change']
});

displayMetrics({
  verificationRate: analytics.insights.verificationRate,
  trendingTopics: trends.topTags,
  authorActivity: analytics.insights.authorActivity
});
  `);
}

if (require.main === module) {
  main().then(() => {
    if (process.env.SHOW_EXAMPLES === 'true') {
      useCaseExamples();
    }
  });
}

module.exports = { main, useCaseExamples };

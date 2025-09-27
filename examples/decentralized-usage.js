#!/usr/bin/env node

/**
 * Pure Decentralized No-Cap Facts Usage Example
 * 
 * This demonstrates how developers can access verified facts
 * directly from Walrus without any central servers or API keys
 * 
 * Run with: node examples/decentralized-usage.js
 */

const { WalrusDirectSDK } = require('../lib/sdk/walrus-direct-sdk');

async function decentralizedDemo() {
  console.log('🌐 Pure Decentralized No-Cap Facts Demo');
  console.log('   No servers, no API keys, no central authority!\n');

  // Initialize SDK - only needs Walrus endpoints
  const sdk = new WalrusDirectSDK({
    aggregatorUrl: 'https://aggregator.walrus.host',
    publisherUrl: 'https://publisher.walrus.host'
  });

  try {
    console.log('⚡ Connecting to Walrus network...');
    const health = await sdk.ping();
    console.log(`   Network status: ${health.status} (${health.latency}ms)\n`);

    // 1. Search verified climate facts
    console.log('🔍 1. Searching verified climate facts from Walrus...');
    const climateResults = await sdk.search({
      keywords: 'climate change global warming',
      status: ['verified'],
      minImportance: 7,
      limit: 3
    });
    
    console.log(`   Found ${climateResults.totalCount} verified climate facts:`);
    climateResults.facts.forEach((fact, i) => {
      console.log(`   ${i + 1}. ${fact.title}`);
      console.log(`      Status: ${fact.status}, Votes: ${fact.votes}`);
      console.log(`      Walrus ID: ${fact.walrusBlobId}`);
      console.log(`      Tags: ${fact.metadata?.tags?.map(t => t.name).join(', ') || 'None'}\n`);
    });

    // 2. Fast tag-based search using specialized indices
    console.log('🏷️  2. Fast tag search using Walrus tag index...');
    const techFacts = await sdk.searchByTag('technology');
    console.log(`   Found ${techFacts.length} technology facts via tag index:`);
    techFacts.slice(0, 3).forEach((fact, i) => {
      console.log(`   ${i + 1}. ${fact.title} - ${fact.status}`);
    });
    console.log();

    // 3. Get real-time analytics from Walrus
    console.log('📊 3. Getting analytics directly from Walrus...');
    const analytics = await sdk.getAnalytics();
    console.log(`   Total facts: ${analytics.totalFacts}`);
    console.log(`   Verified: ${analytics.verifiedFacts} (${analytics.verificationRate.toFixed(1)}%)`);
    console.log('   Top tags:');
    analytics.topTags.slice(0, 5).forEach((tag, i) => {
      console.log(`   ${i + 1}. ${tag.name}: ${tag.count} facts`);
    });
    console.log();

    // 4. Submit a new fact to the network
    console.log('📤 4. Submitting a fact directly to Walrus...');
    const newFact = {
      id: `demo-fact-${Date.now()}`,
      title: 'Demo Fact About Decentralization',
      summary: 'Decentralized systems eliminate single points of failure and censorship.',
      status: 'review',
      votes: 0,
      comments: 0,
      author: 'demo-user',
      updated: new Date().toISOString(),
      fullContent: `
        # The Power of Decentralization
        
        Decentralized systems offer several key advantages:
        
        - **Censorship Resistance**: No central authority can block access
        - **Permanence**: Data survives even if original creators disappear  
        - **Transparency**: All operations are cryptographically verifiable
        - **Global Access**: Anyone can participate without permission
        
        This fact itself is stored permanently on Walrus!
      `,
      metadata: {
        created: new Date(),
        lastModified: new Date(),
        version: 1,
        contentType: 'text/markdown',
        tags: [
          { name: 'decentralization', category: 'topic' },
          { name: 'technology', category: 'domain' },
          { name: 'blockchain', category: 'methodology' }
        ],
        importance: 6,
        region: 'global'
      }
    };

    const submission = await sdk.submitFact(newFact);
    console.log(`   ✅ Fact submitted to Walrus!`);
    console.log(`   Blob ID: ${submission.blobId}`);
    console.log(`   Permanent URL: https://aggregator.walrus.host/v1/${submission.blobId}\n`);

    // 5. Demonstrate client-side caching
    console.log('⚡ 5. Testing client-side caching...');
    const start1 = Date.now();
    await sdk.search({ keywords: 'climate change', limit: 5 });
    const firstSearch = Date.now() - start1;
    
    const start2 = Date.now();
    await sdk.search({ keywords: 'climate change', limit: 5 }); // Should be cached
    const cachedSearch = Date.now() - start2;
    
    console.log(`   First search: ${firstSearch}ms (from Walrus)`);
    console.log(`   Cached search: ${cachedSearch}ms (from local cache)`);
    console.log(`   Speed improvement: ${Math.round(firstSearch/cachedSearch)}x faster\n`);

    console.log('✅ Decentralized demo completed successfully!\n');
    
    console.log('🚀 What makes this special:');
    console.log('   • No API keys or accounts needed');
    console.log('   • No central servers or databases');
    console.log('   • Data is permanently stored and verifiable'); 
    console.log('   • Works from anywhere in the world');
    console.log('   • Censorship resistant');
    console.log('   • You own your queries (no tracking)');
    console.log('   • Open source and transparent\n');
    
    console.log('🌟 This is the future of knowledge: decentralized, permanent, and free!');

  } catch (error) {
    console.error('❌ Demo failed:', error.message);
    
    if (error.message.includes('Could not load fact index')) {
      console.log('\n💡 Troubleshooting:');
      console.log('   • Check your internet connection');
      console.log('   • Verify Walrus network is accessible');
      console.log('   • Make sure fact indices have been initialized');
      console.log('   • Try running the centralized version first');
    }
  }
}

// Comparison with traditional APIs
async function apiComparison() {
  console.log('\n📋 Traditional API vs Decentralized Comparison:\n');
  
  console.log('Traditional Centralized API:');
  console.log('❌ Requires API key registration');
  console.log('❌ Rate limits and usage restrictions');
  console.log('❌ Depends on company servers staying online');
  console.log('❌ Company controls data and can censor/modify');
  console.log('❌ Privacy concerns (queries are tracked)');
  console.log('❌ Geographic restrictions possible');
  console.log('❌ Costs scale with usage');
  
  console.log('\nDecentralized Walrus-based API:');
  console.log('✅ No registration - just start using');
  console.log('✅ No rate limits (only Walrus network capacity)');
  console.log('✅ Works forever - data survives any company');
  console.log('✅ Cryptographically verifiable - no tampering');
  console.log('✅ Private - your queries aren\'t tracked');
  console.log('✅ Global access from anywhere');
  console.log('✅ Minimal costs (only Walrus retrieval fees)');
  
  console.log('\n🎯 Best of both worlds:');
  console.log('   • Performance through smart caching');
  console.log('   • Reliability through decentralization');
  console.log('   • Developer experience through great SDKs');
}

// Run the demo
if (require.main === module) {
  decentralizedDemo().then(() => {
    if (process.env.SHOW_COMPARISON === 'true') {
      apiComparison();
    }
  });
}

module.exports = { decentralizedDemo, apiComparison };

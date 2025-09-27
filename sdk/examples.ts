/**
 * NOCAP SDK Usage Examples
 * 
 * This file demonstrates how to use the NOCAP SDK to access verified facts
 */

import { createClient, NOCAPClient, searchFacts, getFact } from './index';

// Example 1: Basic client setup and fact retrieval
async function basicUsage() {
  console.log('=== Basic Usage Example ===');
  
  // Create a client
  const client = createClient({
    apiUrl: 'https://nocap.app/api',
    timeout: 10000
  });

  try {
    // Get all facts with pagination
    const factsResponse = await client.getFacts({ limit: 10, offset: 0 });
    console.log(`Found ${factsResponse.totalCount} total facts`);
    console.log(`Retrieved ${factsResponse.data.length} facts`);
    
    // Get a specific fact
    if (factsResponse.data.length > 0) {
      const firstFact = factsResponse.data[0];
      const factDetails = await client.getFact(firstFact.id);
      console.log(`Fact: ${factDetails.title}`);
      console.log(`Status: ${factDetails.status}`);
      console.log(`Author: ${factDetails.author}`);
    }
    
  } catch (error) {
    console.error('Error:', error);
  }
}

// Example 2: Search functionality
async function searchExamples() {
  console.log('\n=== Search Examples ===');
  
  const client = createClient();

  try {
    // Search by keywords
    console.log('\n--- Search by Keywords ---');
    const keywordResults = await client.searchByKeywords(['climate', 'warming'], { limit: 5 });
    console.log(`Found ${keywordResults.totalCount} facts about climate warming`);
    keywordResults.facts.forEach(fact => {
      console.log(`- ${fact.title} (${fact.status})`);
    });

    // Search by tags
    console.log('\n--- Search by Tags ---');
    const tagResults = await client.searchByTags(['space', 'verified'], { limit: 5 });
    console.log(`Found ${tagResults.totalCount} verified space facts`);
    tagResults.facts.forEach(fact => {
      console.log(`- ${fact.title} by ${fact.author}`);
    });

    // Advanced search with multiple filters
    console.log('\n--- Advanced Search ---');
    const advancedResults = await client.searchFacts({
      keywords: ['AI', 'machine learning'],
      status: ['verified'],
      dateRange: {
        from: new Date('2024-01-01'),
        to: new Date()
      },
      limit: 3
    });
    
    console.log(`Found ${advancedResults.totalCount} verified AI facts since 2024`);
    advancedResults.facts.forEach(fact => {
      console.log(`- ${fact.title}`);
      console.log(`  Summary: ${fact.summary.substring(0, 100)}...`);
    });

  } catch (error) {
    console.error('Search error:', error);
  }
}

// Example 3: Bulk operations
async function bulkOperations() {
  console.log('\n=== Bulk Operations Example ===');
  
  const client = createClient();

  try {
    // First get some fact IDs
    const facts = await client.getFacts({ limit: 5 });
    const factIds = facts.data.map(fact => fact.id);

    if (factIds.length > 0) {
      // Bulk retrieve facts
      const bulkResponse = await client.getBulkFacts({
        factIds,
        includeContent: true,
        includeSources: true
      });

      console.log(`Bulk retrieved ${bulkResponse.totalReturned}/${bulkResponse.totalRequested} facts`);
      
      if (bulkResponse.errors.length > 0) {
        console.log('Errors encountered:');
        bulkResponse.errors.forEach(error => {
          console.log(`- ${error.factId}: ${error.error}`);
        });
      }

      bulkResponse.facts.forEach(fact => {
        console.log(`- ${fact.title}`);
        if (fact.sources && fact.sources.length > 0) {
          console.log(`  Sources: ${fact.sources.length} available`);
        }
      });
    }

  } catch (error) {
    console.error('Bulk operation error:', error);
  }
}

// Example 4: Statistics and monitoring
async function statisticsAndMonitoring() {
  console.log('\n=== Statistics and Monitoring Example ===');
  
  const client = createClient();

  try {
    // Get health status
    const health = await client.healthCheck();
    console.log(`System status: ${health.status}`);
    console.log(`Walrus available: ${health.walrusStatus.available}`);
    console.log(`Index facts: ${health.indexStatus.facts}`);

    // Get index statistics
    const stats = await client.getIndexStats();
    console.log('\nIndex Statistics:');
    console.log(`- Total facts: ${stats.totalFacts}`);
    console.log(`- Total keywords: ${stats.totalKeywords}`);
    console.log(`- Total tags: ${stats.totalTags}`);
    console.log(`- Total authors: ${stats.totalAuthors}`);
    console.log(`- Index size: ${(stats.indexSize / 1024).toFixed(2)} KB`);

    // Get client metrics
    const metrics = client.getMetrics();
    console.log('\nClient Metrics:');
    console.log(`- Requests made: ${metrics.requestCount}`);
    console.log(`- Average response time: ${metrics.avgResponseTime.toFixed(2)}ms`);
    console.log(`- Error rate: ${(metrics.errorRate * 100).toFixed(2)}%`);

  } catch (error) {
    console.error('Statistics error:', error);
  }
}

// Example 5: Error handling
async function errorHandlingExample() {
  console.log('\n=== Error Handling Example ===');
  
  const client = createClient({
    timeout: 1000, // Very short timeout to demo error handling
    retries: 1
  });

  try {
    // This will likely fail due to short timeout
    await client.getFact('non-existent-fact-id');
  } catch (error: any) {
    console.log('Caught error:', error.name);
    console.log('Error code:', error.code);
    console.log('Error message:', error.message);
    
    if (error.statusCode) {
      console.log('HTTP Status:', error.statusCode);
    }
  }

  try {
    // Invalid search query
    await client.searchFacts({
      limit: 1000, // Exceeds maximum
      offset: -1    // Negative offset
    });
  } catch (error: any) {
    console.log('Validation error:', error.message);
  }
}

// Example 6: Status-based filtering
async function statusFilteringExample() {
  console.log('\n=== Status Filtering Example ===');
  
  const client = createClient();

  try {
    // Get verified facts only
    const verifiedFacts = await client.getFactsByStatus('verified', { limit: 5 });
    console.log(`Verified facts: ${verifiedFacts.totalCount}`);
    
    // Get facts under review
    const reviewFacts = await client.getFactsByStatus('review', { limit: 5 });
    console.log(`Facts under review: ${reviewFacts.totalCount}`);
    
    // Get flagged facts
    const flaggedFacts = await client.getFactsByStatus('flagged', { limit: 5 });
    console.log(`Flagged facts: ${flaggedFacts.totalCount}`);

    console.log('\nVerified fact examples:');
    verifiedFacts.facts.slice(0, 3).forEach(fact => {
      console.log(`- ${fact.title} (${fact.votes} votes)`);
    });

  } catch (error) {
    console.error('Status filtering error:', error);
  }
}

// Example 7: Using convenience functions
async function convenienceFunctionsExample() {
  console.log('\n=== Convenience Functions Example ===');

  try {
    // Use standalone functions instead of client
    console.log('Using standalone search function:');
    const searchResults = await searchFacts({
      keywords: ['space'],
      limit: 3
    });
    
    console.log(`Found ${searchResults.totalCount} space-related facts`);

    if (searchResults.facts.length > 0) {
      // Get details of first result using standalone function
      const fact = await getFact(searchResults.facts[0].id);
      console.log(`\nFirst result: ${fact.title}`);
      console.log(`Tags: ${fact.tags.map(tag => tag.name).join(', ')}`);
    }

  } catch (error) {
    console.error('Convenience functions error:', error);
  }
}

// Example 8: Real-world use case - Building a fact checker
async function factCheckerExample() {
  console.log('\n=== Fact Checker Use Case Example ===');
  
  const client = createClient();

  async function checkClaim(claim: string): Promise<void> {
    console.log(`\nChecking claim: "${claim}"`);
    
    // Extract keywords from claim
    const keywords = claim.toLowerCase()
      .split(/\W+/)
      .filter(word => word.length > 3)
      .slice(0, 5); // Take top 5 keywords

    console.log(`Search keywords: ${keywords.join(', ')}`);

    try {
      // Search for related facts
      const results = await client.searchFacts({
        keywords,
        status: ['verified'], // Only look at verified facts
        limit: 5
      });

      if (results.facts.length > 0) {
        console.log(`Found ${results.totalCount} potentially related verified facts:`);
        results.facts.forEach((fact, index) => {
          console.log(`${index + 1}. ${fact.title}`);
          console.log(`   Summary: ${fact.summary}`);
          console.log(`   Confidence indicators: ${fact.votes} votes, ${fact.comments} comments`);
          console.log('');
        });
      } else {
        console.log('No verified facts found related to this claim.');
        console.log('Consider submitting this claim for verification.');
      }

    } catch (error) {
      console.error('Error checking claim:', error);
    }
  }

  // Test with sample claims
  await checkClaim("Climate change is causing Arctic ice to melt faster");
  await checkClaim("AI language models show emergent reasoning abilities");
  await checkClaim("This is a completely fictional claim that should not match anything");
}

// Main function to run all examples
async function runAllExamples() {
  console.log('NOCAP SDK Examples');
  console.log('==================');

  await basicUsage();
  await searchExamples();
  await bulkOperations();
  await statisticsAndMonitoring();
  await errorHandlingExample();
  await statusFilteringExample();
  await convenienceFunctionsExample();
  await factCheckerExample();

  console.log('\n=== Examples Complete ===');
}

// Export for use in other files
export {
  basicUsage,
  searchExamples,
  bulkOperations,
  statisticsAndMonitoring,
  errorHandlingExample,
  statusFilteringExample,
  convenienceFunctionsExample,
  factCheckerExample,
  runAllExamples
};

// Run examples if this file is executed directly
if (typeof require !== 'undefined' && require.main === module) {
  runAllExamples().catch(console.error);
}

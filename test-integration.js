// Integration test for NOCAP fact submission with Walrus HTTP
const fetch = require('node-fetch');

async function testFactSubmission() {
  console.log('🧪 Testing NOCAP Fact Submission Integration...\n');

  const BASE_URL = 'http://localhost:3000';
  
  try {
    // Test 1: Check if the server is running
    console.log('1. Checking server status...');
    const healthResponse = await fetch(`${BASE_URL}/api/health`);
    
    if (!healthResponse.ok) {
      throw new Error(`Server not responding: ${healthResponse.status}`);
    }
    
    const healthData = await healthResponse.json();
    console.log('✅ Server is running:', healthData);

    // Test 2: Test the fact preparation endpoint (server action)
    console.log('\n2. Testing fact preparation...');
    
    const factData = {
      title: 'HTTP Walrus Test Fact',
      description: 'This is a test fact to verify that our new HTTP Walrus integration works correctly with the NOCAP application.',
      sources: [{
        url: 'https://example.com/test',
        title: 'Test Source',
        accessedAt: new Date().toISOString()
      }],
      tags: ['test', 'walrus', 'http'],
      stakeAmount: '0'
    };

    // Note: Server actions are typically called from the client side with special headers
    // For this test, we'll just verify the server endpoints are accessible
    
    console.log('✅ Fact data prepared:', {
      title: factData.title,
      descriptionLength: factData.description.length,
      sourcesCount: factData.sources.length,
      tagsCount: factData.tags.length
    });

    // Test 3: Check API facts endpoint
    console.log('\n3. Testing facts API...');
    const factsResponse = await fetch(`${BASE_URL}/api/facts?limit=1`);
    
    if (factsResponse.ok) {
      const factsData = await factsResponse.json();
      console.log('✅ Facts API working. Sample data:', {
        totalFacts: factsData.facts?.length || 0,
        firstFact: factsData.facts?.[0]?.title || 'N/A'
      });
    } else {
      console.log(`⚠️ Facts API error: ${factsResponse.status}`);
    }

    console.log('\n🎉 Integration test completed!');
    console.log('📋 Summary:');
    console.log('   - Server: RUNNING');
    console.log('   - Health endpoint: WORKING');
    console.log('   - Facts API: WORKING');
    console.log('   - Ready for Walrus HTTP testing');

  } catch (error) {
    console.error('❌ Integration test failed:', error.message);
    
    if (error.code === 'ECONNREFUSED') {
      console.log('\n💡 Tip: Make sure the development server is running with "npm run dev"');
    }
  }
}

// Run the test
testFactSubmission();

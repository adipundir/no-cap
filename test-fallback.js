// Test fallback functionality by checking API response
const fetch = require('node-fetch');

async function testFallbackFunctionality() {
  console.log('🧪 Testing Fallback Functionality...\n');

  const BASE_URL = 'http://localhost:3000';
  
  try {
    // Test the facts API endpoint
    console.log('1. Testing facts API endpoint...');
    const response = await fetch(`${BASE_URL}/api/facts?limit=5`);
    
    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }
    
    const data = await response.json();
    
    console.log('✅ API Response received');
    console.log('📊 Response data:', {
      totalFacts: data.facts?.length || 0,
      isFallback: data.isFallback || false,
      fallbackReason: data.fallbackReason || 'N/A',
      firstFactTitle: data.facts?.[0]?.title || 'N/A'
    });

    // Check if fallback mode is active
    if (data.isFallback) {
      console.log('\n🔄 FALLBACK MODE DETECTED');
      console.log('   Reason:', data.fallbackReason);
      console.log('   Sample facts are being served');
      
      // Verify fallback facts structure
      if (data.facts && data.facts.length > 0) {
        const sampleFact = data.facts[0];
        console.log('   Sample fact structure:', {
          id: sampleFact.id,
          title: sampleFact.title?.slice(0, 50) + '...',
          walrusBlobId: sampleFact.walrusBlobId,
          status: sampleFact.status,
          votes: sampleFact.votes,
          comments: sampleFact.comments
        });
      }
      
      console.log('\n✅ Fallback functionality is working correctly!');
    } else {
      console.log('\n🐋 WALRUS MODE ACTIVE');
      console.log('   Real Walrus storage is being used');
      console.log('   To test fallback, Walrus storage needs to fail');
    }

    // Test pagination
    console.log('\n2. Testing pagination with fallback...');
    const pageResponse = await fetch(`${BASE_URL}/api/facts?limit=2&offset=2`);
    
    if (pageResponse.ok) {
      const pageData = await pageResponse.json();
      console.log('✅ Pagination test:', {
        factsReturned: pageData.facts?.length || 0,
        isFallback: pageData.isFallback || false
      });
    }

    console.log('\n🎉 Fallback functionality test completed!');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    
    if (error.code === 'ECONNREFUSED') {
      console.log('\n💡 Tip: Make sure the development server is running with "npm run dev"');
    }
  }
}

// Run the test
testFallbackFunctionality();

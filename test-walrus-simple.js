// Simple test for Walrus HTTP endpoints
const fetch = globalThis.fetch || require('node-fetch');

async function testWalrusEndpoints() {
  console.log('🐋 Testing Walrus HTTP Endpoints...\n');

  const PUBLISHER_URL = 'https://publisher.walrus-testnet.walrus.space';
  const AGGREGATOR_URL = 'https://aggregator.walrus-testnet.walrus.space';

  try {
    // Test 1: Publisher health check
    console.log('1. Testing publisher endpoint...');
    const publisherStart = Date.now();
    const publisherResponse = await fetch(`${PUBLISHER_URL}/v1/store?epochs=1`, {
      method: 'OPTIONS'
    });
    const publisherLatency = Date.now() - publisherStart;
    
    console.log(`✅ Publisher: ${publisherResponse.status} (${publisherLatency}ms)`);

    // Test 2: Aggregator health check
    console.log('2. Testing aggregator endpoint...');
    const aggregatorStart = Date.now();
    const aggregatorResponse = await fetch(`${AGGREGATOR_URL}/v1/status`, {
      method: 'GET'
    });
    const aggregatorLatency = Date.now() - aggregatorStart;
    
    console.log(`✅ Aggregator: ${aggregatorResponse.status} (${aggregatorLatency}ms)`);

    // Test 3: Try to store a small blob (this might fail if we don't have proper setup)
    console.log('3. Testing blob storage...');
    const testData = 'Hello Walrus HTTP Test!';
    const blob = new Uint8Array(Buffer.from(testData, 'utf-8'));
    
    try {
      const storeResponse = await fetch(`${PUBLISHER_URL}/v1/store?epochs=1`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/octet-stream',
        },
        body: blob,
      });

      if (storeResponse.ok) {
        const result = await storeResponse.json();
        const blobId = result.newlyCreated?.blobObject?.blobId || result.alreadyCertified?.blobId;
        console.log(`✅ Blob stored! ID: ${blobId}`);

        // Test 4: Try to retrieve the blob
        if (blobId) {
          console.log('4. Testing blob retrieval...');
          const retrieveResponse = await fetch(`${AGGREGATOR_URL}/v1/${blobId}`);
          
          if (retrieveResponse.ok) {
            const retrievedData = await retrieveResponse.arrayBuffer();
            const retrievedText = new TextDecoder().decode(new Uint8Array(retrievedData));
            console.log(`✅ Blob retrieved! Data: "${retrievedText}"`);
            console.log(`✅ Data integrity: ${retrievedText === testData ? 'PASSED' : 'FAILED'}`);
          } else {
            console.log(`⚠️ Retrieval failed: ${retrieveResponse.status}`);
          }
        }
      } else {
        const errorText = await storeResponse.text();
        console.log(`⚠️ Storage failed: ${storeResponse.status} - ${errorText}`);
      }
    } catch (storeError) {
      console.log(`⚠️ Storage error: ${storeError.message}`);
    }

    console.log('\n🎉 Walrus HTTP endpoint test completed!');
    console.log('📊 Network Assessment:');
    console.log(`   Publisher: ${publisherResponse.ok ? 'HEALTHY' : 'UNHEALTHY'} (${publisherLatency}ms)`);
    console.log(`   Aggregator: ${aggregatorResponse.ok ? 'HEALTHY' : 'UNHEALTHY'} (${aggregatorLatency}ms)`);

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

// Run the test
testWalrusEndpoints();

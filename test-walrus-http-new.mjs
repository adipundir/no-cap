#!/usr/bin/env node

// Test script for new Walrus HTTP integration
import { getWalrusHybridService } from './lib/walrus-hybrid.js'

async function testWalrusHTTP() {
  console.log('🐋 Testing New Walrus HTTP Integration...\n')

  try {
    // Get the hybrid service
    console.log('1. Getting Walrus hybrid service...')
    const walrus = getWalrusHybridService()
    console.log('✅ Hybrid service created successfully\n')

    // Check service status
    console.log('2. Checking Walrus service status...')
    const status = await walrus.getStatus()
    console.log('✅ Status check result:', status, '\n')

    // Force a health check
    console.log('3. Running health check...')
    const isHealthy = await walrus.forceHealthCheck()
    console.log('✅ Health check result:', isHealthy ? 'HEALTHY' : 'UNHEALTHY', '\n')

    // Test storing a small JSON blob
    console.log('4. Testing JSON storage...')
    const testData = {
      title: 'Test Fact',
      description: 'This is a test fact stored via HTTP',
      timestamp: new Date().toISOString(),
      source: 'walrus-http-test'
    }

    const storeResult = await walrus.storeJSON(testData)
    console.log('✅ JSON stored successfully:', {
      blobId: storeResult.blobId,
      source: storeResult.source,
      size: storeResult.size,
      cost: storeResult.cost
    }, '\n')

    // Test retrieving the data
    console.log('5. Testing JSON retrieval...')
    const retrievedData = await walrus.retrieveJSON(storeResult.blobId)
    console.log('✅ JSON retrieved successfully:', retrievedData, '\n')

    // Verify data integrity
    console.log('6. Verifying data integrity...')
    const isDataValid = JSON.stringify(testData) === JSON.stringify(retrievedData)
    console.log('✅ Data integrity check:', isDataValid ? 'PASSED' : 'FAILED', '\n')

    // Get mock storage stats
    console.log('7. Getting storage statistics...')
    const mockStats = walrus.getMockStats()
    console.log('✅ Mock storage stats:', mockStats, '\n')

    // Final status
    const finalStatus = await walrus.getStatus()
    console.log('🎉 Test completed successfully!')
    console.log('📊 Final Status:', {
      walrusHealthy: finalStatus.walrusHealthy,
      totalMockBlobs: finalStatus.totalMockBlobs,
      lastHealthCheck: finalStatus.lastHealthCheck.toISOString()
    })

    if (storeResult.source === 'walrus') {
      console.log('\n🚀 SUCCESS: Using real Walrus network storage!')
    } else {
      console.log('\n⚠️  FALLBACK: Using mock storage (Walrus network unavailable)')
    }

  } catch (error) {
    console.error('❌ Test failed:', error.message)
    console.error('Stack:', error.stack)
    process.exit(1)
  }
}

// Run the test
testWalrusHTTP().catch(console.error)

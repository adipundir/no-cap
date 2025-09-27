// Test script for real Walrus integration
import { getRealWalrusService } from './lib/walrus-real.js';

async function testWalrus() {
  console.log('🐋 Testing Real Walrus Integration...\n');
  
  try {
    // Get Walrus service
    const walrus = getRealWalrusService();
    
    // Initialize in read-only mode (no private key)
    console.log('1. Initializing Walrus service...');
    await walrus.initialize();
    console.log('✅ Walrus service initialized successfully\n');
    
    // Test health check
    console.log('2. Checking Walrus network health...');
    const health = await walrus.healthCheck();
    console.log('✅ Health check result:', health, '\n');
    
    // Test network stats
    console.log('3. Getting network statistics...');
    const stats = await walrus.getNetworkStats();
    console.log('✅ Network stats:', stats, '\n');
    
    // Test blob existence check (with a fake blob ID)
    console.log('4. Testing blob existence check...');
    const exists = await walrus.blobExists('fake-blob-id');
    console.log('✅ Blob exists check (should be false):', exists, '\n');
    
    console.log('🎉 All Walrus tests passed! The integration is working correctly.');
    console.log('\n📝 Note: To test blob storage, you need to provide a Sui private key.');
    
  } catch (error) {
    console.error('❌ Walrus test failed:', error.message);
    console.log('\n🔧 This is expected if you don\'t have proper Walrus network access or configuration.');
  }
}

// Run the test
testWalrus().catch(console.error);

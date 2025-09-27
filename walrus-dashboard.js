// Walrus Storage Dashboard - Check current status
const { default: fetch } = require('node-fetch');
const fs = require('fs');

async function checkAPIStatus() {
  console.log('🔍 WALRUS STORAGE DASHBOARD\n');
  
  // Wait for server to be ready
  console.log('⏳ Waiting for dev server...');
  let serverReady = false;
  let attempts = 0;
  
  while (!serverReady && attempts < 10) {
    try {
      const response = await fetch('http://localhost:3000/api/health');
      if (response.ok) {
        serverReady = true;
        console.log('✅ Dev server is ready');
      }
    } catch (error) {
      // Try the facts endpoint directly
      try {
        const response = await fetch('http://localhost:3000/api/facts');
        if (response.status !== 500) {
          serverReady = true;
          console.log('✅ Dev server is ready (via facts endpoint)');
        }
      } catch (e) {
        attempts++;
        console.log(`⏳ Attempt ${attempts}/10 - waiting for server...`);
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    }
  }
  
  if (!serverReady) {
    console.log('❌ Dev server not accessible. Please run: npm run dev');
    return;
  }
  
  // Check facts API
  console.log('\n📊 CHECKING FACTS API...');
  try {
    const response = await fetch('http://localhost:3000/api/facts');
    
    if (!response.ok) {
      console.log(`❌ API Error: ${response.status} ${response.statusText}`);
      const errorText = await response.text();
      console.log('Error details:', errorText.slice(0, 200));
      return;
    }
    
    const data = await response.json();
    const facts = data.facts || [];
    
    console.log(`✅ API returned ${facts.length} facts`);
    
    // Analyze Walrus data
    const factsWithWalrus = facts.filter(f => f.walrusBlobId);
    const factsWithoutWalrus = facts.filter(f => !f.walrusBlobId);
    
    console.log('\n🐋 WALRUS ANALYSIS:');
    console.log(`   📦 Facts with Walrus storage: ${factsWithWalrus.length}`);
    console.log(`   📄 Facts without Walrus storage: ${factsWithoutWalrus.length}`);
    
    if (factsWithWalrus.length > 0) {
      console.log('\n✅ WALRUS FACTS FOUND:');
      factsWithWalrus.slice(0, 3).forEach((fact, i) => {
        console.log(`   ${i + 1}. "${fact.title}"`);
        console.log(`      Blob ID: ${fact.walrusBlobId}`);
        console.log(`      Status: ${fact.status || 'unknown'}`);
      });
    }
    
    if (factsWithoutWalrus.length > 0) {
      console.log('\n⚠️  FACTS WITHOUT WALRUS:');
      factsWithoutWalrus.slice(0, 3).forEach((fact, i) => {
        console.log(`   ${i + 1}. "${fact.title}"`);
      });
    }
    
  } catch (error) {
    console.log('❌ Error checking API:', error.message);
  }
  
  // Check local files
  console.log('\n📁 CHECKING LOCAL FILES...');
  
  const factsFile = './public/facts-data.json';
  if (fs.existsSync(factsFile)) {
    try {
      const fileData = JSON.parse(fs.readFileSync(factsFile, 'utf-8'));
      console.log(`✅ Found facts file with ${fileData.facts?.length || 0} facts`);
      console.log(`   Last updated: ${fileData.lastUpdated || 'unknown'}`);
    } catch (error) {
      console.log('❌ Error reading facts file:', error.message);
    }
  } else {
    console.log('⚠️  No facts file found at public/facts-data.json');
  }
  
  // Check feed page filter
  console.log('\n🔍 CHECKING FEED PAGE...');
  const feedPath = './app/(app)/feed/page.tsx';
  if (fs.existsSync(feedPath)) {
    const feedContent = fs.readFileSync(feedPath, 'utf-8');
    
    if (feedContent.includes('walrusBlobId')) {
      console.log('⚠️  Feed is filtering for walrusBlobId');
      console.log('   This will only show facts with Walrus storage');
    } else {
      console.log('✅ Feed is showing all facts (no Walrus filter)');
    }
  }
  
  // Recommendations
  console.log('\n💡 RECOMMENDATIONS:');
  
  if (factsWithWalrus.length === 0) {
    console.log('   🔧 No facts have Walrus storage yet');
    console.log('   📝 Run the populate-walrus.js script to add Walrus data');
    console.log('   🌐 Or submit new facts through the app');
  } else {
    console.log('   ✅ You have facts with Walrus storage!');
    console.log('   🔄 You can restore the Walrus filter in feed page if desired');
    console.log('   🧪 Test the hybrid Walrus service for real storage');
  }
  
  console.log('\n🎯 QUICK ACTIONS:');
  console.log('   📱 Visit: http://localhost:3000/feed');
  console.log('   ➕ Submit: http://localhost:3000/submit');
  console.log('   🔧 Dashboard: http://localhost:3000/dashboard');
}

checkAPIStatus().catch(console.error);

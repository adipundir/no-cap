// Check what data is stored in Walrus and populate feed if needed
const { default: fetch } = require('node-fetch');

async function checkWalrusData() {
  console.log('🔍 CHECKING WALRUS STORAGE DATA...\n');
  
  try {
    // First, check what facts are in your database
    console.log('1. Checking facts in your database...');
    const factsResponse = await fetch('http://localhost:3000/api/facts');
    
    if (!factsResponse.ok) {
      console.log('❌ Could not fetch facts from API. Is your app running on localhost:3000?');
      console.log('💡 Run: npm run dev');
      return;
    }
    
    const factsData = await factsResponse.json();
    const facts = factsData.facts || [];
    
    console.log(`✅ Found ${facts.length} facts in database`);
    
    if (facts.length === 0) {
      console.log('\n📝 No facts found! Let\'s create some test data...');
      await createTestFacts();
      return;
    }
    
    // Check which facts have Walrus blob IDs
    const factsWithWalrus = facts.filter(f => f.walrusBlobId);
    const factsWithoutWalrus = facts.filter(f => !f.walrusBlobId);
    
    console.log(`\n📊 ANALYSIS:`);
    console.log(`  ✅ Facts with Walrus storage: ${factsWithWalrus.length}`);
    console.log(`  ⚠️  Facts without Walrus storage: ${factsWithoutWalrus.length}`);
    
    // Test retrieving Walrus data for facts that have blob IDs
    if (factsWithWalrus.length > 0) {
      console.log('\n🐋 Testing Walrus retrieval...');
      
      for (const fact of factsWithWalrus.slice(0, 3)) { // Test first 3
        console.log(`\n📦 Testing fact: "${fact.title}"`);
        console.log(`   Blob ID: ${fact.walrusBlobId}`);
        
        try {
          // Try to retrieve from Walrus
          const walrusResponse = await fetch(`https://aggregator.walrus-testnet.walrus.space/v1/${fact.walrusBlobId}`);
          
          if (walrusResponse.ok) {
            const data = await walrusResponse.text();
            console.log(`   ✅ Retrieved from Walrus (${data.length} bytes)`);
            
            try {
              const parsed = JSON.parse(data);
              console.log(`   📄 Content: ${parsed.title || 'No title'}`);
            } catch (e) {
              console.log(`   📄 Content: Raw data (${data.slice(0, 50)}...)`);
            }
          } else {
            console.log(`   ❌ Failed to retrieve: ${walrusResponse.status} ${walrusResponse.statusText}`);
          }
        } catch (error) {
          console.log(`   ❌ Network error: ${error.message}`);
        }
      }
    }
    
    // Show feed filtering issue
    console.log('\n🔍 FEED FILTERING ANALYSIS:');
    console.log('Your feed page is filtering to only show facts with walrusBlobId');
    console.log(`Currently showing: ${factsWithWalrus.length} facts`);
    
    if (factsWithWalrus.length === 0) {
      console.log('\n💡 SOLUTIONS:');
      console.log('1. Remove the Walrus filter temporarily');
      console.log('2. Create new facts with Walrus storage');
      console.log('3. Migrate existing facts to Walrus');
    }
    
  } catch (error) {
    console.error('❌ Error checking data:', error.message);
  }
}

async function createTestFacts() {
  console.log('\n🏗️  Creating test facts with Walrus storage...');
  
  const testFacts = [
    {
      title: "Ethereum's Proof of Stake reduces energy consumption by 99.95%",
      summary: "The Ethereum merge to Proof of Stake dramatically reduced the network's energy consumption compared to Proof of Work mining.",
      author: "crypto-researcher",
      sources: [
        {
          url: "https://ethereum.org/en/energy-consumption/",
          title: "Ethereum Energy Consumption",
          accessedAt: new Date().toISOString()
        }
      ],
      tags: ["ethereum", "proof-of-stake", "energy", "environment"]
    },
    {
      title: "World Chain processes over 1M transactions daily",
      summary: "World Chain, the Layer 2 solution by Worldcoin, has reached significant adoption with over 1 million daily transactions.",
      author: "blockchain-analyst", 
      sources: [
        {
          url: "https://worldchain.org/stats",
          title: "World Chain Statistics",
          accessedAt: new Date().toISOString()
        }
      ],
      tags: ["worldchain", "layer2", "scaling", "adoption"]
    },
    {
      title: "Walrus storage network achieves 99.9% availability",
      summary: "The decentralized Walrus storage network demonstrates high reliability with 99.9% uptime across distributed nodes.",
      author: "storage-expert",
      sources: [
        {
          url: "https://docs.walrus.space/reliability",
          title: "Walrus Network Reliability",
          accessedAt: new Date().toISOString()
        }
      ],
      tags: ["walrus", "storage", "decentralized", "reliability"]
    }
  ];
  
  for (const factData of testFacts) {
    try {
      console.log(`📝 Creating: "${factData.title}"`);
      
      const response = await fetch('http://localhost:3000/api/facts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(factData)
      });
      
      if (response.ok) {
        const result = await response.json();
        console.log(`   ✅ Created with ID: ${result.id}`);
      } else {
        const error = await response.text();
        console.log(`   ❌ Failed: ${response.status} - ${error}`);
      }
    } catch (error) {
      console.log(`   ❌ Error: ${error.message}`);
    }
  }
  
  console.log('\n🎉 Test facts created! Check your feed page now.');
}

async function checkFeedFilter() {
  console.log('\n🔍 Checking feed page filter...');
  
  try {
    // Read the feed page to see the current filter
    const fs = require('fs');
    const feedPagePath = './app/(app)/feed/page.tsx';
    
    if (fs.existsSync(feedPagePath)) {
      const content = fs.readFileSync(feedPagePath, 'utf-8');
      
      if (content.includes('walrusBlobId')) {
        console.log('⚠️  Feed is filtering for walrusBlobId - this might hide facts without Walrus storage');
        console.log('💡 Consider removing this filter or ensuring all facts have Walrus storage');
      } else {
        console.log('✅ Feed is not filtering by walrusBlobId');
      }
    }
  } catch (error) {
    console.log('❌ Could not check feed filter:', error.message);
  }
}

// Run the check
console.log('Starting Walrus data check...');
console.log('Make sure your app is running (npm run dev) for API access\n');

checkWalrusData()
  .then(() => checkFeedFilter())
  .catch(console.error);

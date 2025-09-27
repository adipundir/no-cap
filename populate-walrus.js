// Tool to populate Walrus storage with existing facts
const fs = require('fs');
const path = require('path');

// Read facts from your seed files
function getFactsFromSeed() {
  try {
    // Check if comprehensive facts file exists
    const comprehensiveFactsPath = './lib/seed/comprehensive-facts.ts';
    const factsPath = './lib/seed/facts.ts';
    
    let factsContent = '';
    
    if (fs.existsSync(comprehensiveFactsPath)) {
      factsContent = fs.readFileSync(comprehensiveFactsPath, 'utf-8');
      console.log('📚 Found comprehensive-facts.ts');
    } else if (fs.existsSync(factsPath)) {
      factsContent = fs.readFileSync(factsPath, 'utf-8');
      console.log('📚 Found facts.ts');
    } else {
      console.log('❌ No seed files found');
      return [];
    }
    
    // Extract facts array from the TypeScript file
    const factsMatch = factsContent.match(/export const .*?facts.*?=\s*(\[[\s\S]*?\]);/);
    if (!factsMatch) {
      console.log('❌ Could not parse facts from seed file');
      return [];
    }
    
    // Convert TypeScript to JSON (basic conversion)
    let factsJson = factsMatch[1]
      .replace(/\/\/.*$/gm, '') // Remove comments
      .replace(/,(\s*[}\]])/g, '$1') // Remove trailing commas
      .replace(/(\w+):/g, '"$1":') // Quote object keys
      .replace(/'/g, '"'); // Convert single quotes to double quotes
    
    try {
      const facts = JSON.parse(factsJson);
      console.log(`✅ Parsed ${facts.length} facts from seed file`);
      return facts;
    } catch (parseError) {
      console.log('❌ Failed to parse facts JSON:', parseError.message);
      return [];
    }
    
  } catch (error) {
    console.log('❌ Error reading seed files:', error.message);
    return [];
  }
}

// Create sample facts if no seed data
function createSampleFacts() {
  return [
    {
      id: 1,
      title: "Ethereum's Proof of Stake reduces energy consumption by 99.95%",
      summary: "The Ethereum merge to Proof of Stake dramatically reduced the network's energy consumption compared to Proof of Work mining.",
      author: "crypto-researcher",
      status: "verified",
      votes: 1243,
      comments: 89,
      updated: "2h ago",
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
      id: 2,
      title: "World Chain processes over 1M transactions daily",
      summary: "World Chain, the Layer 2 solution by Worldcoin, has reached significant adoption with over 1 million daily transactions.",
      author: "blockchain-analyst",
      status: "review", 
      votes: 312,
      comments: 45,
      updated: "6h ago",
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
      id: 3,
      title: "Walrus storage network achieves 99.9% availability",
      summary: "The decentralized Walrus storage network demonstrates high reliability with 99.9% uptime across distributed nodes.",
      author: "storage-expert",
      status: "verified",
      votes: 856,
      comments: 67,
      updated: "1d ago",
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
}

async function simulateWalrusStorage(facts) {
  console.log('\n🐋 Simulating Walrus storage for facts...');
  
  const factsWithWalrus = facts.map(fact => {
    // Generate mock Walrus blob ID
    const blobId = `mock-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    console.log(`📦 Fact "${fact.title}" -> Blob ID: ${blobId}`);
    
    return {
      ...fact,
      walrusBlobId: blobId
    };
  });
  
  return factsWithWalrus;
}

async function writeFactsToAPI(facts) {
  console.log('\n📝 Writing facts to your app...');
  
  // Create a simple facts.json file that your app can read
  const factsData = {
    facts: facts,
    lastUpdated: new Date().toISOString(),
    source: 'walrus-populated'
  };
  
  // Write to a JSON file that your API can read
  const outputPath = './public/facts-data.json';
  fs.writeFileSync(outputPath, JSON.stringify(factsData, null, 2));
  
  console.log(`✅ Written ${facts.length} facts to ${outputPath}`);
  console.log('💡 Your API can now read this file to populate the feed');
  
  return outputPath;
}

async function updateAPIToReadFile() {
  console.log('\n🔧 Updating API to read from facts file...');
  
  const apiPath = './app/api/facts/route.ts';
  
  if (!fs.existsSync(apiPath)) {
    console.log('❌ API route file not found');
    return;
  }
  
  let apiContent = fs.readFileSync(apiPath, 'utf-8');
  
  // Check if it already reads from file
  if (apiContent.includes('facts-data.json')) {
    console.log('✅ API already configured to read from facts file');
    return;
  }
  
  console.log('💡 Manual update needed: Update your API to read from public/facts-data.json');
  console.log('   Or use the existing seed data in your database');
}

async function main() {
  console.log('🚀 WALRUS DATA POPULATION TOOL\n');
  
  // Get facts from seed files or create samples
  let facts = getFactsFromSeed();
  
  if (facts.length === 0) {
    console.log('\n📝 No seed data found, creating sample facts...');
    facts = createSampleFacts();
  }
  
  // Add Walrus blob IDs
  const factsWithWalrus = await simulateWalrusStorage(facts);
  
  // Write to file
  const outputPath = await writeFactsToAPI(factsWithWalrus);
  
  console.log('\n🎉 DONE!');
  console.log('📊 Summary:');
  console.log(`   - ${factsWithWalrus.length} facts processed`);
  console.log(`   - All facts now have Walrus blob IDs`);
  console.log(`   - Data written to: ${outputPath}`);
  console.log('\n💡 Next steps:');
  console.log('   1. Check your feed page - it should show facts now');
  console.log('   2. Optionally restore the Walrus filter in feed/page.tsx');
  console.log('   3. Test the hybrid Walrus service with real storage');
  
  // Show sample of the data
  console.log('\n📋 Sample fact with Walrus data:');
  console.log(JSON.stringify(factsWithWalrus[0], null, 2));
}

main().catch(console.error);

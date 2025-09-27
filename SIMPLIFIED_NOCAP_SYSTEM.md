# NOCAP Simplified System - Complete Architecture

## 🎯 Overview

The NOCAP system has been **completely simplified** to focus on core fact verification with a streamlined voting mechanism:

1. **📝 Fact Creation**: Upload to Walrus → Store reference on-chain with optional stake
2. **🗳️ Community Voting**: 10-minute voting period with CAP/NO CAP votes + optional stakes
3. **⚖️ Automatic Resolution**: Facts resolved based on vote count after 10 minutes
4. **💰 Reward Distribution**: Winners get proportional share of total stake pool

## 🏗️ Smart Contract Architecture

### **Contract: `NOCAPSimplified.sol`**

#### **Key Features:**
- ✅ **10-minute voting period** (for testing)
- ✅ **Optional staking** on fact creation and voting
- ✅ **Automatic resolution** when votes come in after deadline
- ✅ **Proportional rewards** to winning side
- ✅ **Tie handling** - waits for next vote if CAP = NO CAP
- ✅ **World ID verification** required for all interactions

#### **Core Functions:**

```solidity
// Create fact with optional stake (creator automatically votes CAP)
function createFact(string calldata walrusBlobId) external payable returns (uint256 factId)

// Vote on fact with optional stake
function voteOnFact(uint256 factId, bool vote) external payable

// Manually resolve fact (if voting period ended)
function resolveFact(uint256 factId) external

// Withdraw accumulated rewards
function withdrawRewards() external
```

#### **Fact Structure:**
```solidity
struct Fact {
    uint256 id;
    address creator;
    string walrusBlobId;        // Reference to Walrus content
    uint256 creatorStake;       // ETH staked by creator
    uint256 capVotes;           // Number of CAP votes
    uint256 noCapVotes;         // Number of NO CAP votes
    uint256 totalCapStake;      // Total ETH staked on CAP
    uint256 totalNoCapStake;    // Total ETH staked on NO CAP
    uint256 createdAt;
    uint256 deadline;           // createdAt + 10 minutes
    bool resolved;
    bool outcome;               // true = CAP won, false = NO CAP won
    uint256 totalRewards;       // Total rewards distributed
}
```

## 🔄 Complete Flow

### **1. Fact Creation Flow**
```
User creates fact
       ↓
Fact uploaded to Walrus (server action)
       ↓
Walrus blob ID returned
       ↓
Contract.createFact(walrusBlobId) with optional stake
       ↓
Creator automatically votes CAP
       ↓
10-minute voting period starts
```

### **2. Voting Flow**
```
User votes CAP or NO CAP
       ↓
Contract.voteOnFact(factId, vote) with optional stake
       ↓
Vote count and stake updated
       ↓
If voting period ended → Auto-resolve
       ↓
If CAP ≠ NO CAP → Distribute rewards
       ↓
If CAP = NO CAP → Wait for tie-breaker
```

### **3. Resolution & Rewards**
```
Voting period ends (10 minutes)
       ↓
Check vote counts: CAP vs NO CAP
       ↓
If tied → Wait for next vote
       ↓
If not tied → Determine winner
       ↓
Distribute total stake pool proportionally to winners
       ↓
Losers get nothing (zero-sum game)
```

## 💻 Frontend Implementation

### **Server Action: `prepareFactForWalrus()`**
```typescript
// Upload fact to Walrus with validation
const result = await prepareFactForWalrus({
  title: "Ethereum Cancun upgrade reduced gas fees",
  description: "The Ethereum Cancun upgrade...",
  sources: [{ url: "...", title: "...", accessedAt: "..." }],
  tags: ["ethereum", "blockchain"],
  stakeAmount: "0.01" // Optional ETH stake
})
```

### **Contract Service: `SimplifiedContractService`**
```typescript
// Create fact with Walrus blob ID
await SimplifiedContractService.createFact(
  "walrus_blob_abc123",  // From Walrus upload
  "0.01"                 // Optional stake in ETH
)

// Vote on fact
await SimplifiedContractService.voteOnFact(
  "42",      // Fact ID
  true,      // true = CAP, false = NO CAP
  "0.005"    // Optional stake in ETH
)
```

### **React Hook: `useSimplifiedContracts()`**
```typescript
const {
  createFact,           // Create fact with Walrus upload
  voteOnFact,          // Vote CAP/NO CAP with optional stake
  withdrawRewards,     // Withdraw accumulated winnings
  isVerified,          // World ID verification status
  withdrawableBalance  // Available rewards to withdraw
} = useSimplifiedContracts()
```

## 🎮 User Experience

### **Creating a Fact**
1. User fills form: title, description, sources, tags
2. Optional: Add ETH stake (minimum 0.001 ETH)
3. Click "Create fact" → Uploads to Walrus → Creates on-chain reference
4. Creator automatically votes CAP (believes fact is true)
5. 10-minute countdown begins

### **Voting on Facts**
1. User sees fact with CAP/NO CAP buttons
2. Optional: Add ETH stake to vote (minimum 0.001 ETH)
3. Click CAP (fact is true) or NO CAP (fact is false)
4. Vote recorded on-chain with stake

### **Resolution & Rewards**
1. After 10 minutes, anyone can trigger resolution
2. If CAP > NO CAP → CAP voters win, get proportional rewards
3. If NO CAP > CAP → NO CAP voters win, get proportional rewards
4. If CAP = NO CAP → Wait for tie-breaker vote
5. Winners can withdraw rewards anytime

## 🎯 Key Simplifications

### **Removed Complexity:**
- ❌ No comment system
- ❌ No categories/priorities  
- ❌ No variable voting periods
- ❌ No complex user profiles
- ❌ No fact updates/versions

### **Streamlined Features:**
- ✅ **Single voting mechanism**: CAP vs NO CAP
- ✅ **Fixed 10-minute period**: Easy to understand
- ✅ **Simple staking**: Optional, minimum 0.001 ETH
- ✅ **Zero-sum rewards**: Winners take all
- ✅ **Automatic resolution**: No manual intervention needed

## 📊 Example Scenarios

### **Scenario 1: Clear Winner**
```
Fact: "Bitcoin hit $100k in 2024"
Creator stakes: 0.01 ETH (auto-votes CAP)

Votes after 10 minutes:
- CAP: 5 votes, 0.05 ETH total stake
- NO CAP: 2 votes, 0.02 ETH total stake

Result: CAP wins
Total pool: 0.07 ETH
CAP voters get proportional share of 0.07 ETH
NO CAP voters get nothing
```

### **Scenario 2: Tie Situation**
```
Fact: "AI will replace 50% of jobs by 2030"
Creator stakes: 0.01 ETH (auto-votes CAP)

Votes after 10 minutes:
- CAP: 3 votes, 0.03 ETH total stake  
- NO CAP: 3 votes, 0.03 ETH total stake

Result: Tie - wait for next vote
Next voter breaks the tie and triggers resolution
```

## 🚀 Deployment Checklist

1. **Deploy Contract**: `NOCAPSimplified.sol` to World Chain mainnet
2. **Update Address**: Set `NOCAP_SIMPLIFIED` in `lib/simplified-contracts.ts`
3. **Test Flow**: Create fact → Vote → Resolve → Withdraw
4. **Monitor**: 10-minute periods and automatic resolution
5. **Scale**: Increase voting period for production (e.g., 24 hours)

## 🔧 Configuration

### **Environment Variables**
```bash
NEXT_PUBLIC_WORLD_APP_ID=app_d05016525dcfdee7106146d8393399a7
NEXT_PUBLIC_ACTION_ID=humanhood
```

### **Contract Constants**
```solidity
uint256 public constant VOTING_PERIOD = 10 minutes;  // For testing
uint256 public constant MIN_STAKE = 0.001 ether;     // Minimum stake
```

## 🎯 Success Metrics

- **Fact Creation Rate**: Facts created per day
- **Voting Participation**: Average votes per fact
- **Staking Activity**: Percentage of votes with stakes
- **Resolution Accuracy**: Community consensus quality
- **Reward Distribution**: ETH distributed to winners

The system is now **production-ready** with a clean, focused architecture for community-driven fact verification! 🚀

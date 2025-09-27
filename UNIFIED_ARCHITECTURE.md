# NOCAP Unified Architecture

## Overview

NOCAP now features a **unified, human-only architecture** that integrates World ID verification directly into the smart contract and enforces human verification at every interaction point. This ensures that only verified humans can participate in the fact-checking protocol.

## 🏗️ Architecture Components

### 1. Unified Smart Contract (`NOCAPUnified.sol`)

A single, comprehensive smart contract that handles:

- **World ID Verification**: Direct integration with World ID for on-chain human verification
- **User Profiles**: Comprehensive tracking of user metrics and reputation
- **Fact Management**: Submit, vote, and resolve facts with optional ETH staking
- **Reward Distribution**: Automatic reward distribution based on voting accuracy
- **Human-Only Enforcement**: Every function requires World ID verification

#### Key Features:

```solidity
struct UserProfile {
    bool isVerified;           // World ID verification status
    uint256 reputation;       // Reputation score (starts at 100)
    uint256 factsSubmitted;   // Total facts submitted
    uint256 factsVerified;    // Facts that were verified as true
    uint256 factsFalse;       // Facts that were verified as false
    uint256 votesCorrect;     // Votes that matched final outcome
    uint256 votesIncorrect;   // Votes that didn't match final outcome
    uint256 totalStaked;      // Total ETH staked across all activities
    uint256 rewardsEarned;    // Total rewards earned
    uint256 joinedAt;         // Timestamp when user first verified
    uint256 lastActive;       // Last activity timestamp
}
```

### 2. IDKit Integration (`IDKitVerification` component)

- **Seamless Verification**: Uses `@worldcoin/idkit` for smooth World ID verification
- **User Profile Display**: Shows comprehensive user statistics and metrics
- **Real-time Updates**: Automatically updates user profile after verification
- **Error Handling**: Graceful error handling with toast notifications

### 3. Unified Contract Service (`UnifiedContractService`)

Provides a clean interface for all contract interactions:

```typescript
// Verification
static async verifyAndRegister(walletAddress, root, nullifierHash, proof)

// Fact submission
static async submitFact(title, description, votingPeriodHours)
static async submitFactWithStake(title, description, stakeAmount, votingPeriodHours)

// Voting
static async voteFact(factId, vote, stakeAmount?)

// Data retrieval
static async getUserProfile(walletAddress)
static async getFact(factId)
static async isUserVerified(walletAddress)
```

### 4. React Hook (`useUnifiedContracts`)

Provides React components with easy access to contract functionality:

```typescript
const {
  // State
  isLoading, walletAddress, isVerified, userProfile, ethBalance,
  
  // Actions
  verifyAndRegister, submitFact, submitFactWithStake, voteFact,
  
  // Data fetching
  getUserProfile, isUserVerified, getFact
} = useUnifiedContracts()
```

## 🔐 Human-Only Enforcement

### Contract Level
- `onlyVerifiedHuman` modifier on all interactive functions
- World ID nullifier tracking prevents proof reuse
- Automatic verification status checking

### Frontend Level
- Verification status checks before allowing interactions
- Clear messaging when verification is required
- Seamless redirect to verification flow

### User Experience
1. **Connect World App Wallet** - Native wallet integration
2. **Verify with World ID** - IDKit-powered verification
3. **Participate** - Submit facts, vote, earn rewards

## 📊 User Metrics & Reputation

### Reputation System
- **Starting Score**: 100 points for new users
- **Correct Votes**: +10 reputation
- **Incorrect Votes**: -5 reputation
- **Verified Facts**: +10 reputation
- **False Facts**: -5 reputation

### Tracked Metrics
- Facts submitted (total)
- Facts verified as true/false
- Voting accuracy (correct/incorrect)
- Total ETH staked
- Total rewards earned
- Join date and last activity

### Gamification Elements
- **Leaderboards**: Top users by reputation
- **Badges**: Achievement system (to be implemented)
- **Streaks**: Consecutive correct votes (to be implemented)

## 💰 Economic Model

### Free Participation
- Users can submit facts and vote without staking
- Basic reputation building through participation

### Optional ETH Staking
- **Fact Submission**: Stake ETH to show confidence
- **Voting**: Stake on votes for higher rewards
- **Rewards**: Proportional to stake amount for correct votes
- **Penalties**: Lose stake for incorrect votes

### Platform Fees
- 2.5% platform fee on all reward distributions
- Fees collected for protocol maintenance and development

## 🚀 Deployment Guide

### 1. Deploy Smart Contract

```bash
# Deploy NOCAPUnified.sol to World Chain
# Constructor parameters:
# - _worldIdAddress: World ID contract address on World Chain
# - _appId: Your World App ID
# - _actionId: "humanhood" for human verification
```

### 2. Update Contract Address

```typescript
// In lib/unified-contracts.ts
export const WORLD_CHAIN_CONTRACTS = {
  NOCAP_UNIFIED: '0xYourDeployedContractAddress',
}
```

### 3. Configure Environment Variables

```bash
# .env
NEXT_PUBLIC_WORLD_APP_ID=app_d05016525dcfdee7106146d8393399a7
NEXT_PUBLIC_ACTION_ID=humanhood
```

### 4. Deploy Frontend

```bash
npm run build
# Deploy to Vercel or your preferred platform
```

## 🔧 Development Setup

### Prerequisites
- Node.js 18+
- World App for testing
- World Chain testnet/mainnet access

### Installation
```bash
npm install
npm run dev
```

### Key Dependencies
- `@worldcoin/idkit`: World ID verification widget
- `@worldcoin/minikit-js`: World App integration
- `viem`: Ethereum interaction library

## 📱 User Flow

### New User Journey
1. **Landing**: User visits NOCAP
2. **World App**: Navigate to World App page
3. **Wallet Connect**: Connect World App wallet
4. **World ID Verification**: Complete IDKit verification
5. **On-Chain Registration**: Proof submitted to contract
6. **Profile Created**: User profile with initial reputation
7. **Participation**: Can now submit facts and vote

### Returning User
1. **Auto-Detection**: System checks verification status
2. **Profile Display**: Shows user metrics and reputation
3. **Direct Participation**: Immediate access to all features

## 🛡️ Security Features

### Sybil Resistance
- World ID ensures one unique human per account
- Nullifier tracking prevents proof reuse
- On-chain verification for maximum security

### Economic Security
- Staking mechanisms align incentives
- Reputation system builds long-term trust
- Platform fees ensure sustainable operation

### Privacy Protection
- World ID preserves user anonymity
- No personal information stored on-chain
- Zero-knowledge proofs for verification

## 🎯 Future Enhancements

### Planned Features
1. **Advanced Gamification**: Badges, streaks, achievements
2. **Social Features**: User profiles, following, messaging
3. **Mobile App**: Native mobile application
4. **Cross-Chain**: Support for multiple blockchains
5. **AI Integration**: Automated fact-checking assistance

### Governance
- Community voting on protocol changes
- Reputation-weighted governance
- Transparent decision-making process

## 📈 Metrics & Analytics

### Key Performance Indicators
- Total verified users
- Facts submitted per day
- Voting accuracy rates
- Average stake amounts
- User retention rates

### Success Metrics
- High verification rates (>90%)
- Accurate fact-checking (>80% correct votes)
- Growing user base
- Sustainable economic model

## 🤝 Community

### Participation Guidelines
1. **Be Human**: Complete World ID verification
2. **Be Accurate**: Research facts thoroughly
3. **Be Fair**: Vote based on evidence
4. **Be Respectful**: Maintain community standards

### Rewards for Quality
- Higher reputation for accurate contributions
- ETH rewards for correct votes
- Recognition for top contributors
- Potential governance rights

---

**NOCAP: Where only humans verify facts, and truth is rewarded.**

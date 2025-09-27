# NOCAP 🚀

**Community-driven fact verification. Anonymous reviews. On-chain transparency.**

NOCAP is a platform where people can submit claims, and the community votes on whether they're true or false. Think of it as a fact-checking app powered by real people and secured by blockchain technology.

## What does NOCAP do?

### 📝 **Submit Facts**
- Share any claim or statement you want verified
- Add sources to back up your claim
- Optionally stake ETH to show confidence in your fact

### 🗳️ **Community Voting**
- Vote **CAP** if you think the claim is **false**
- Vote **NO CAP** if you think the claim is **true**
- Stake ETH on your vote to earn rewards if you're right

### 💰 **Earn Rewards**
- Win ETH when you vote correctly
- Rewards are distributed proportionally based on your stake
- The more confident you are, the more you can earn

### 🔒 **Human-Only**
- Only verified humans can participate
- Anonymous voting protects your privacy
- All votes are recorded transparently on the blockchain

## How it works

1. **Someone submits a fact** → "The Earth is round"
2. **Community votes for 10 minutes** → CAP (false) or NO CAP (true)
3. **Majority wins** → In this case, NO CAP wins
4. **Rewards distributed** → Everyone who voted NO CAP gets paid

## For Developers 👨‍💻

Want to integrate NOCAP's verified facts into your app? Use our SDK:

```bash
npm install nocap-sdk
```

**📦 [NOCAP SDK on NPM](https://www.npmjs.com/package/nocap-sdk)**

The SDK gives you access to:
- All verified facts and their voting results
- Real-time fact verification status
- Community voting data
- Perfect for AI training, fact-checking bots, or knowledge bases

```javascript
import { NOCAPClient } from 'nocap-sdk'

const client = new NOCAPClient()
const facts = await client.getFacts({ status: 'verified' })
```

## Why NOCAP?

- **🎯 Accurate**: Community wisdom beats individual bias
- **💰 Incentivized**: People earn money for being right
- **🔐 Secure**: Blockchain ensures transparency and immutability
- **👥 Anonymous**: Vote without revealing your identity
- **🤖 AI-Ready**: Clean, structured data perfect for AI systems

## Get Started

1. **Visit the app**: [Launch NOCAP](https://nocap.app)
2. **Connect your wallet**: Use World App for seamless experience
3. **Start voting**: Help verify facts and earn rewards
4. **Submit facts**: Share claims you want the community to verify

## Tech Stack

- **Frontend**: Next.js, React, TailwindCSS
- **Blockchain**: World Chain (Ethereum-compatible)
- **Storage**: Walrus (decentralized storage)
- **Wallet**: World App integration
- **API**: 1inch Balance API integration

---

**Built for the community, powered by truth.** 🌍

*NOCAP is part of the World Chain ecosystem, ensuring human-verified, decentralized fact-checking for the future of information.*
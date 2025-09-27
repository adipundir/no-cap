# 🌐 Ethereum Sepolia Configuration

NOCAP is configured to run on **Ethereum Sepolia testnet** with World App integration.

## 🔧 Network Configuration

### **Ethereum Sepolia Testnet**
- **Chain ID**: `11155111`
- **Network Name**: Ethereum Sepolia
- **Currency**: ETH (testnet)
- **Explorer**: https://sepolia.etherscan.io
- **RPC URL**: `https://sepolia.infura.io/v3/YOUR_KEY` or `https://rpc.sepolia.org`

## 🎯 World App Integration

### **World ID Configuration**
```typescript
// Environment variables
NEXT_PUBLIC_WORLD_APP_ID=app_d05016525dcfdee7106146d8393399a7
NEXT_PUBLIC_ACTION_ID=humanhood
```

### **Wallet Authentication**
```typescript
const walletAuthPayload: WalletAuthInput = {
  nonce,
  statement: 'Connect to NOCAP for community-driven fact verification on Ethereum Sepolia',
  expirationTime: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
  notBefore: new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
  requestId: Date.now().toString()
}
```

## 🔗 Smart Contract Addresses (Sepolia)

### **World ID Contract**
- **Address**: `0x469449f251692e0779667583026b5a1e99512157`
- **Explorer**: https://sepolia.etherscan.io/address/0x469449f251692e0779667583026b5a1e99512157

### **PYUSD Contract (Mock for Testing)**
- **Address**: Deploy your own mock PYUSD for testing
- **Decimals**: 6

## 🚰 Getting Testnet Assets

### **Sepolia ETH Faucets**
- https://sepoliafaucet.com
- https://www.alchemy.com/faucets/ethereum-sepolia
- https://faucet.quicknode.com/ethereum/sepolia

### **Mock PYUSD**
Deploy a mock ERC20 token for testing PYUSD functionality.

## 🔍 Verification

### **How to Verify Your App is on Sepolia:**

1. **In World App**: Connect wallet and check network info
2. **Transaction Explorer**: All transactions appear on https://sepolia.etherscan.io
3. **Chain ID Check**: Network shows `11155111`
4. **Gas Fees**: Users pay with testnet ETH (not sponsored)

## ⚠️ Important Notes

### **Gas Fees**
- Unlike Worldchain, **users pay gas fees** with testnet ETH
- Make sure users have testnet ETH for transactions
- Gas fees are typically very low on Sepolia

### **World ID Verification**
- World ID verification still works on Sepolia
- Proofs are generated off-chain and verified on-chain
- Use your `humanhood` action for verification

### **Development vs Production**
- **Sepolia**: For testing and development
- **Ethereum Mainnet**: For production (higher gas costs)
- **Worldchain**: Alternative with sponsored gas fees

## 🛠️ Smart Contract Deployment

### **Deploy to Sepolia**
```bash
# Using Foundry
forge create src/NOCAPFactChecker.sol:NOCAPFactChecker \
  --rpc-url https://sepolia.infura.io/v3/YOUR_KEY \
  --private-key YOUR_PRIVATE_KEY \
  --constructor-args WORLD_ID_ADDRESS PYUSD_ADDRESS EXTERNAL_NULLIFIER_HASH
```

### **Verify Contract**
```bash
forge verify-contract CONTRACT_ADDRESS \
  src/NOCAPFactChecker.sol:NOCAPFactChecker \
  --chain sepolia \
  --etherscan-api-key YOUR_ETHERSCAN_KEY
```

## 🎯 User Experience

### **Connection Flow**
1. User opens World App
2. Navigates to NOCAP miniapp
3. Clicks "Connect World App Wallet"
4. World App connects to Ethereum Sepolia
5. User can verify with World ID
6. User can interact with smart contracts (paying gas with testnet ETH)

This configuration provides a **real Ethereum experience** while still leveraging World App's seamless wallet integration and World ID verification system.

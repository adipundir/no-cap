# PYUSD Integration Guide

This guide explains how to integrate PayPal USD (PYUSD) with your World Mini App for testnet development.

## 🪙 PYUSD Testnet Support

### Supported Networks

#### 1. **Solana Devnet** (Recommended)
- **PYUSD Contract**: `CXk2AMBfi3TwaEL2468s6zP8xq9NxTXjp9gjMgzeUynM`
- **Faucet**: [Google Cloud Web3 Faucet](https://cloud.google.com/application/web3/faucet/solana)
- **Explorer**: [Solana Explorer (Devnet)](https://explorer.solana.com/?cluster=devnet)
- **Features**: Native PYUSD support with Token Extensions

#### 2. **Ethereum Sepolia**
- **PYUSD Contract**: Deploy mock ERC-20 contract (see below)
- **Faucet**: [Sepolia Faucet](https://sepoliafaucet.com)
- **Explorer**: [Sepolia Etherscan](https://sepolia.etherscan.io)
- **Features**: ERC-20 standard compatibility

## 🚀 Quick Setup

### 1. Install Dependencies
```bash
npm install --legacy-peer-deps
```

### 2. Connect Wallet
The `MultiChainWallet` component supports both networks:
- Select between Solana Devnet or Ethereum Sepolia
- Connects using World App's SIWE authentication
- Displays PYUSD contract addresses and balances

### 3. Get Test PYUSD

#### For Solana Devnet:
1. Visit [Google Cloud Web3 Faucet](https://cloud.google.com/application/web3/faucet/solana)
2. Enter your Solana wallet address
3. Request PYUSD tokens
4. Tokens will appear in your wallet

#### For Ethereum Sepolia:
1. Deploy a mock PYUSD contract (see Smart Contracts section)
2. Mint test tokens to your address
3. Use Sepolia faucet for ETH gas fees

## 🔧 Smart Contracts

### Mock PYUSD Contract (Ethereum Sepolia)

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MockPYUSD is ERC20, Ownable {
    uint8 private _decimals = 6; // PYUSD uses 6 decimals
    
    constructor() ERC20("Mock PayPal USD", "PYUSD") Ownable(msg.sender) {
        // Mint initial supply for testing
        _mint(msg.sender, 1000000 * 10**_decimals);
    }
    
    function decimals() public view virtual override returns (uint8) {
        return _decimals;
    }
    
    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
    
    function faucet() public {
        // Allow anyone to mint 100 PYUSD for testing
        _mint(msg.sender, 100 * 10**_decimals);
    }
}
```

### Deployment Script
```javascript
// scripts/deploy-mock-pyusd.js
const { ethers } = require("hardhat");

async function main() {
    const MockPYUSD = await ethers.getContractFactory("MockPYUSD");
    const pyusd = await MockPYUSD.deploy();
    await pyusd.waitForDeployment();
    
    console.log("Mock PYUSD deployed to:", await pyusd.getAddress());
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
```

## 🔗 Integration with World ID

### Binding PYUSD to World ID Verification

```typescript
// Use wallet address as signal for World ID verification
const handleVerification = async () => {
    const proof = await MiniKit.commandsAsync.verify({
        action: 'nocap-pyusd-verify',
        signal: walletAddress, // Binds proof to PYUSD wallet
        verification_level: VerificationLevel.Orb
    });
    
    // Proof is now bound to the PYUSD wallet address
    console.log('PYUSD wallet verified:', {
        wallet: walletAddress,
        chain: selectedChain,
        nullifier: proof.nullifier_hash
    });
};
```

### Smart Contract Integration

```solidity
// Example: PYUSD payment with World ID verification
function verifiedPayment(
    address recipient,
    uint256 amount,
    uint256 root,
    uint256 nullifierHash,
    uint256[8] calldata proof
) external {
    // Verify World ID proof
    worldId.verifyProof(
        root,
        1, // groupId for Orb verification
        abi.encodePacked(msg.sender).hashToField(),
        nullifierHash,
        externalNullifierHash,
        proof
    );
    
    // Execute PYUSD transfer
    pyusdToken.transferFrom(msg.sender, recipient, amount);
    
    // Store nullifier to prevent reuse
    nullifierHashes[nullifierHash] = true;
    
    emit VerifiedPayment(msg.sender, recipient, amount, nullifierHash);
}
```

## 📊 Balance Checking

### Solana (PYUSD SPL Token)
```typescript
import { Connection, PublicKey } from '@solana/web3.js';
import { getAssociatedTokenAddress, getAccount } from '@solana/spl-token';

async function getPYUSDBalance(walletAddress: string): Promise<string> {
    const connection = new Connection('https://api.devnet.solana.com');
    const wallet = new PublicKey(walletAddress);
    const pyusdMint = new PublicKey('CXk2AMBfi3TwaEL2468s6zP8xq9NxTXjp9gjMgzeUynM');
    
    try {
        const tokenAccount = await getAssociatedTokenAddress(pyusdMint, wallet);
        const account = await getAccount(connection, tokenAccount);
        return (Number(account.amount) / 1e6).toString(); // PYUSD has 6 decimals
    } catch (error) {
        return '0';
    }
}
```

### Ethereum (ERC-20)
```typescript
import { ethers } from 'ethers';

async function getPYUSDBalance(walletAddress: string, contractAddress: string): Promise<string> {
    const provider = new ethers.JsonRpcProvider('https://sepolia.infura.io/v3/YOUR_KEY');
    const contract = new ethers.Contract(
        contractAddress,
        ['function balanceOf(address) view returns (uint256)', 'function decimals() view returns (uint8)'],
        provider
    );
    
    try {
        const [balance, decimals] = await Promise.all([
            contract.balanceOf(walletAddress),
            contract.decimals()
        ]);
        return ethers.formatUnits(balance, decimals);
    } catch (error) {
        return '0';
    }
}
```

## 🎯 Use Cases for NOCAP

### 1. **Incentivized Fact-Checking**
- Pay PYUSD rewards for accurate fact-checking
- World ID ensures one-person-one-vote
- Prevent Sybil attacks on reward distribution

### 2. **Stake-Based Verification**
- Users stake PYUSD to submit fact-checks
- Accurate submissions get rewards
- Inaccurate submissions lose stake

### 3. **Community Governance**
- PYUSD holders vote on platform decisions
- World ID prevents fake voting accounts
- Transparent on-chain governance

## 🔐 Security Considerations

### 1. **Testnet Only**
- Never use real PYUSD in development
- Always test on Devnet/Sepolia first
- Clearly mark testnet interfaces

### 2. **World ID Integration**
- Always verify proofs on-chain or backend
- Store nullifier hashes to prevent reuse
- Use wallet address as signal for binding

### 3. **Smart Contract Security**
- Audit contracts before mainnet deployment
- Use established patterns (OpenZeppelin)
- Test extensively with various scenarios

## 📚 Resources

- [PYUSD Documentation](https://docs.paxos.com/guides/stablecoin/pyusd)
- [Solana Token Extensions](https://spl.solana.com/token-2022)
- [World ID Smart Contracts](https://docs.world.org/world-id/on-chain)
- [Google Cloud Web3 Faucet](https://cloud.google.com/application/web3/faucet)

## 🐛 Troubleshooting

### Common Issues

1. **"Insufficient PYUSD balance"**
   - Use the appropriate faucet for your network
   - Check contract address is correct
   - Verify wallet is connected to right network

2. **"Token account not found" (Solana)**
   - Create associated token account first
   - Use `getOrCreateAssociatedTokenAccount`
   - Check wallet has SOL for account creation

3. **"Contract not found" (Ethereum)**
   - Verify you're on Sepolia testnet
   - Deploy mock PYUSD contract if needed
   - Check contract address in component

### Debug Commands

```bash
# Check Solana token account
spl-token accounts --owner YOUR_WALLET_ADDRESS --url devnet

# Check Ethereum balance
cast balance YOUR_WALLET_ADDRESS --rpc-url https://sepolia.infura.io/v3/YOUR_KEY

# Verify contract deployment
cast code CONTRACT_ADDRESS --rpc-url https://sepolia.infura.io/v3/YOUR_KEY
```

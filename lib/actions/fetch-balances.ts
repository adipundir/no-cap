'use server'

import { createOneInchBalanceService, type TokenBalance, CHAIN_IDS } from '@/lib/services/oneinch-balance';

export interface UserBalances {
  eth: string;
  wld: string;
  totalValueUSD: number;
  lastUpdated: string;
  error?: string;
}

/**
 * Server action to fetch user's ETH and WLD balances using 1inch API for hackathon
 * Falls back to World Chain RPC if 1inch API is unavailable
 */
export async function fetchUserBalances(walletAddress: string): Promise<UserBalances> {
  try {
    const oneInchService = createOneInchBalanceService();
    
    if (oneInchService) {
      // Use 1inch API for enhanced balance data
      const [ethBalance, wldBalance] = await Promise.all([
        oneInchService.getETHBalance(walletAddress, CHAIN_IDS.ETHEREUM),
        oneInchService.getWLDBalance(walletAddress, CHAIN_IDS.ETHEREUM),
      ]);

      return {
        eth: ethBalance?.balanceFormatted || '0',
        wld: wldBalance?.balanceFormatted || '0',
        totalValueUSD: (ethBalance?.valueUSD || 0) + (wldBalance?.valueUSD || 0),
        lastUpdated: new Date().toISOString(),
      };
    } else {
      // Fallback to World Chain RPC
      return await fetchBalancesViaWorldChain(walletAddress);
    }

  } catch (error) {
    console.error('Failed to fetch balances via 1inch, falling back to RPC:', error);
    return await fetchBalancesViaWorldChain(walletAddress);
  }
}

/**
 * Fallback method using World Chain RPC when 1inch API is not available
 */
async function fetchBalancesViaWorldChain(walletAddress: string): Promise<UserBalances> {
  try {
    const [ethBalance, wldBalance] = await Promise.all([
      fetchETHBalanceOnWorldChain(walletAddress),
      fetchWLDBalanceOnWorldChain(walletAddress),
    ]);

    return {
      eth: ethBalance.toFixed(4),
      wld: wldBalance.toFixed(2),
      totalValueUSD: 0, // No USD conversion in fallback mode
      lastUpdated: new Date().toISOString(),
      error: 'Using World Chain RPC fallback - add ONEINCH_API_KEY for enhanced features',
    };

  } catch (error) {
    console.error('Failed to fetch balances via World Chain RPC:', error);
    
    return {
      eth: '0.0000',
      wld: '0.00',
      totalValueUSD: 0,
      lastUpdated: new Date().toISOString(),
      error: 'Failed to fetch balances',
    };
  }
}

/**
 * Fetch ETH balance on World Chain mainnet
 */
async function fetchETHBalanceOnWorldChain(walletAddress: string): Promise<number> {
  try {
    const worldChainRpc = process.env.WORLD_CHAIN_RPC_URL || 'https://worldchain-mainnet.g.alchemy.com/public';
    
    const response = await fetch(worldChainRpc, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '2.0',
        method: 'eth_getBalance',
        params: [walletAddress, 'latest'],
        id: 1,
      }),
    });

    const data = await response.json();
    if (data.result) {
      const balanceWei = BigInt(data.result);
      return Number(balanceWei) / 1e18;
    }
    
    return 0;
  } catch (error) {
    console.error('Failed to fetch ETH balance on World Chain:', error);
    return 0;
  }
}

/**
 * Fetch WLD balance on World Chain mainnet
 */
async function fetchWLDBalanceOnWorldChain(walletAddress: string): Promise<number> {
  try {
    // WLD token contract address on World Chain (you'll need to update this with the correct address)
    const WLD_CONTRACT_WORLD_CHAIN = '0x163f8c2467924be0ae7b5347228cabf260318753'; // TODO: Update with World Chain WLD contract
    const worldChainRpc = process.env.WORLD_CHAIN_RPC_URL || 'https://worldchain-mainnet.g.alchemy.com/public';
    
    // ERC-20 balanceOf function signature
    const balanceOfSignature = '0x70a08231';
    const paddedAddress = walletAddress.slice(2).padStart(64, '0');
    const data = balanceOfSignature + paddedAddress;

    const response = await fetch(worldChainRpc, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '2.0',
        method: 'eth_call',
        params: [
          {
            to: WLD_CONTRACT_WORLD_CHAIN,
            data: data,
          },
          'latest'
        ],
        id: 1,
      }),
    });

    const result = await response.json();
    if (result.result && result.result !== '0x') {
      const balanceWei = BigInt(result.result);
      return Number(balanceWei) / 1e18; // WLD has 18 decimals
    }
    
    return 0;
  } catch (error) {
    console.error('Failed to fetch WLD balance on World Chain:', error);
    return 0;
  }
}

/**
 * Hackathon-specific function: Get portfolio data using 1inch API
 */
export async function getPortfolioForHackathon(walletAddress: string): Promise<{
  totalValueUSD: number;
  tokens: TokenBalance[];
  chains: string[];
  lastUpdated: string;
  powered_by: string;
  error?: string;
}> {
  try {
    const oneInchService = createOneInchBalanceService();
    
    if (!oneInchService) {
      return {
        totalValueUSD: 0,
        tokens: [],
        chains: [],
        lastUpdated: new Date().toISOString(),
        powered_by: '1inch API (not configured)',
        error: 'ONEINCH_API_KEY required for hackathon features',
      };
    }

    // Fetch comprehensive balance data for hackathon demo
    const balanceResponse = await oneInchService.getBalances(walletAddress, CHAIN_IDS.ETHEREUM);
    
    return {
      totalValueUSD: balanceResponse.totalValueUSD,
      tokens: balanceResponse.balances.slice(0, 10), // Top 10 tokens
      chains: ['Ethereum'], // Can be extended to multiple chains
      lastUpdated: balanceResponse.lastUpdated,
      powered_by: '1inch Balance API',
    };

  } catch (error) {
    console.error('Failed to fetch portfolio for hackathon:', error);
    
    return {
      totalValueUSD: 0,
      tokens: [],
      chains: [],
      lastUpdated: new Date().toISOString(),
      powered_by: '1inch API (error)',
      error: 'Failed to fetch portfolio data',
    };
  }
}


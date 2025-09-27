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
 * Server action to fetch user's ETH and WLD balances using 1inch API
 */
export async function fetchUserBalances(walletAddress: string): Promise<UserBalances> {
  try {
    const oneInchService = createOneInchBalanceService();
    
    if (!oneInchService) {
      // Fallback to direct RPC calls if 1inch API key is not available
      return await fetchBalancesViaRPC(walletAddress);
    }

    // Fetch balances from 1inch API
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

  } catch (error) {
    console.error('Failed to fetch balances via 1inch:', error);
    
    // Fallback to direct RPC calls
    return await fetchBalancesViaRPC(walletAddress);
  }
}

/**
 * Fallback method using free alternatives (no API key needed)
 */
async function fetchBalancesViaRPC(walletAddress: string): Promise<UserBalances> {
  try {
    // Use multiple free methods in parallel
    const [ethBalance, wldBalance] = await Promise.all([
      fetchETHBalanceViaRPC(walletAddress),
      fetchWLDBalanceViaRPC(walletAddress),
    ]);

    return {
      eth: ethBalance.toFixed(4),
      wld: wldBalance.toFixed(2),
      totalValueUSD: 0, // Would need price API for USD values
      lastUpdated: new Date().toISOString(),
      error: process.env.ONEINCH_API_KEY ? undefined : 'Using free RPC - add ONEINCH_API_KEY for USD values & more tokens',
    };

  } catch (error) {
    console.error('Failed to fetch balances via RPC:', error);
    
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
 * Fetch ETH balance using free RPC
 */
async function fetchETHBalanceViaRPC(walletAddress: string): Promise<number> {
  try {
    // Try multiple free RPC endpoints
    const rpcEndpoints = [
      'https://worldchain-mainnet.g.alchemy.com/public',
      'https://eth.llamarpc.com',
      'https://rpc.ankr.com/eth',
      'https://ethereum.publicnode.com',
    ];

    for (const rpcUrl of rpcEndpoints) {
      try {
        const response = await fetch(rpcUrl, {
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
      } catch (error) {
        console.warn(`RPC endpoint ${rpcUrl} failed:`, error);
        continue;
      }
    }
    
    return 0;
  } catch (error) {
    console.error('All ETH RPC endpoints failed:', error);
    return 0;
  }
}

/**
 * Fetch WLD balance using free RPC (ERC-20 token)
 */
async function fetchWLDBalanceViaRPC(walletAddress: string): Promise<number> {
  try {
    // WLD token contract address on Ethereum
    const WLD_CONTRACT = '0x163f8c2467924be0ae7b5347228cabf260318753';
    
    // ERC-20 balanceOf function signature
    const balanceOfSignature = '0x70a08231';
    const paddedAddress = walletAddress.slice(2).padStart(64, '0');
    const data = balanceOfSignature + paddedAddress;

    const rpcEndpoints = [
      'https://eth.llamarpc.com',
      'https://rpc.ankr.com/eth',
      'https://ethereum.publicnode.com',
    ];

    for (const rpcUrl of rpcEndpoints) {
      try {
        const response = await fetch(rpcUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            jsonrpc: '2.0',
            method: 'eth_call',
            params: [
              {
                to: WLD_CONTRACT,
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
      } catch (error) {
        console.warn(`WLD RPC endpoint ${rpcUrl} failed:`, error);
        continue;
      }
    }
    
    return 0;
  } catch (error) {
    console.error('All WLD RPC endpoints failed:', error);
    return 0;
  }
}

/**
 * Server action to fetch balances for multiple tokens
 */
export async function fetchMultiTokenBalances(
  walletAddress: string, 
  tokenSymbols: string[] = ['ETH', 'WLD', 'USDC', 'USDT']
): Promise<{
  balances: TokenBalance[];
  totalValueUSD: number;
  lastUpdated: string;
  error?: string;
}> {
  try {
    const oneInchService = createOneInchBalanceService();
    
    if (!oneInchService) {
      return {
        balances: [],
        totalValueUSD: 0,
        lastUpdated: new Date().toISOString(),
        error: 'ONEINCH_API_KEY not configured',
      };
    }

    const tokens = await oneInchService.getSpecificTokens(walletAddress, tokenSymbols, CHAIN_IDS.ETHEREUM);
    const totalValueUSD = tokens.reduce((sum, token) => sum + (token.valueUSD || 0), 0);

    return {
      balances: tokens,
      totalValueUSD,
      lastUpdated: new Date().toISOString(),
    };

  } catch (error) {
    console.error('Failed to fetch multi-token balances:', error);
    
    return {
      balances: [],
      totalValueUSD: 0,
      lastUpdated: new Date().toISOString(),
      error: 'Failed to fetch token balances',
    };
  }
}

/**
 * Server action to get portfolio overview
 */
export async function fetchPortfolioOverview(walletAddress: string): Promise<{
  totalValueUSD: number;
  topTokens: TokenBalance[];
  chainDistribution: { [chainName: string]: number };
  lastUpdated: string;
  error?: string;
}> {
  try {
    const oneInchService = createOneInchBalanceService();
    
    if (!oneInchService) {
      return {
        totalValueUSD: 0,
        topTokens: [],
        chainDistribution: {},
        lastUpdated: new Date().toISOString(),
        error: 'ONEINCH_API_KEY not configured',
      };
    }

    // For now, just fetch Ethereum balances
    // TODO: Expand to multiple chains when needed
    const balanceResponse = await oneInchService.getBalances(walletAddress, CHAIN_IDS.ETHEREUM);
    
    // Get top 5 tokens by value
    const topTokens = balanceResponse.balances
      .filter(token => (token.valueUSD || 0) > 0)
      .sort((a, b) => (b.valueUSD || 0) - (a.valueUSD || 0))
      .slice(0, 5);

    return {
      totalValueUSD: balanceResponse.totalValueUSD,
      topTokens,
      chainDistribution: {
        'Ethereum': balanceResponse.totalValueUSD,
      },
      lastUpdated: balanceResponse.lastUpdated,
    };

  } catch (error) {
    console.error('Failed to fetch portfolio overview:', error);
    
    return {
      totalValueUSD: 0,
      topTokens: [],
      chainDistribution: {},
      lastUpdated: new Date().toISOString(),
      error: 'Failed to fetch portfolio data',
    };
  }
}

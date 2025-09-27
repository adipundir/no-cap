'use server'

export interface UserBalances {
  eth: string;
  wld: string;
  totalValueUSD: number;
  lastUpdated: string;
  error?: string;
}

/**
 * Server action to fetch user's ETH and WLD balances on World Chain mainnet
 */
export async function fetchUserBalances(walletAddress: string): Promise<UserBalances> {
  try {
    // Fetch balances directly from World Chain mainnet
    const [ethBalance, wldBalance] = await Promise.all([
      fetchETHBalanceOnWorldChain(walletAddress),
      fetchWLDBalanceOnWorldChain(walletAddress),
    ]);

    return {
      eth: ethBalance.toFixed(4),
      wld: wldBalance.toFixed(2),
      totalValueUSD: 0, // No USD conversion needed
      lastUpdated: new Date().toISOString(),
    };

  } catch (error) {
    console.error('Failed to fetch balances on World Chain:', error);
    
    return {
      eth: '0.0000',
      wld: '0.00',
      totalValueUSD: 0,
      lastUpdated: new Date().toISOString(),
      error: 'Failed to fetch balances from World Chain',
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


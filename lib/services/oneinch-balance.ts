/**
 * 1inch Balance API Integration
 * Fetches real token balances for users across multiple chains
 */

export interface TokenBalance {
  address: string;
  symbol: string;
  name: string;
  decimals: number;
  balance: string;
  balanceFormatted: string;
  price?: number;
  valueUSD?: number;
}

export interface BalanceResponse {
  balances: TokenBalance[];
  totalValueUSD: number;
  lastUpdated: string;
}

export class OneInchBalanceService {
  private readonly apiKey: string;
  private readonly baseUrl = 'https://api.1inch.dev';
  
  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  /**
   * Get token balances for a wallet address on a specific chain
   */
  async getBalances(
    walletAddress: string, 
    chainId: number = 1 // Default to Ethereum mainnet
  ): Promise<BalanceResponse> {
    try {
      const response = await fetch(
        `${this.baseUrl}/balance/v1.2/${chainId}/balances/${walletAddress}`,
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Accept': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error(`1inch API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      
      // Transform the response to our format
      const balances: TokenBalance[] = Object.entries(data).map(([address, tokenData]: [string, any]) => ({
        address,
        symbol: tokenData.symbol || 'UNKNOWN',
        name: tokenData.name || 'Unknown Token',
        decimals: tokenData.decimals || 18,
        balance: tokenData.balance || '0',
        balanceFormatted: this.formatBalance(tokenData.balance || '0', tokenData.decimals || 18),
        price: tokenData.price,
        valueUSD: tokenData.price ? parseFloat(this.formatBalance(tokenData.balance || '0', tokenData.decimals || 18)) * tokenData.price : undefined,
      }));

      const totalValueUSD = balances.reduce((sum, token) => sum + (token.valueUSD || 0), 0);

      return {
        balances,
        totalValueUSD,
        lastUpdated: new Date().toISOString(),
      };
    } catch (error) {
      console.error('Failed to fetch balances from 1inch:', error);
      throw error;
    }
  }

  /**
   * Get ETH balance specifically (native token)
   */
  async getETHBalance(walletAddress: string, chainId: number = 1): Promise<TokenBalance | null> {
    try {
      const balances = await this.getBalances(walletAddress, chainId);
      
      // Find ETH (native token) - usually has address 0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
      const ethToken = balances.balances.find(
        token => token.address.toLowerCase() === '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee' ||
                 token.symbol.toUpperCase() === 'ETH'
      );

      return ethToken || null;
    } catch (error) {
      console.error('Failed to fetch ETH balance:', error);
      return null;
    }
  }

  /**
   * Get WLD token balance specifically
   */
  async getWLDBalance(walletAddress: string, chainId: number = 1): Promise<TokenBalance | null> {
    try {
      const balances = await this.getBalances(walletAddress, chainId);
      
      // Find WLD token
      const wldToken = balances.balances.find(
        token => token.symbol.toUpperCase() === 'WLD'
      );

      return wldToken || null;
    } catch (error) {
      console.error('Failed to fetch WLD balance:', error);
      return null;
    }
  }

  /**
   * Get multiple specific tokens
   */
  async getSpecificTokens(
    walletAddress: string, 
    tokenSymbols: string[], 
    chainId: number = 1
  ): Promise<TokenBalance[]> {
    try {
      const balances = await this.getBalances(walletAddress, chainId);
      
      return balances.balances.filter(token => 
        tokenSymbols.some(symbol => token.symbol.toUpperCase() === symbol.toUpperCase())
      );
    } catch (error) {
      console.error('Failed to fetch specific tokens:', error);
      return [];
    }
  }

  /**
   * Format balance from wei to human readable
   */
  private formatBalance(balance: string, decimals: number): string {
    const balanceBigInt = BigInt(balance);
    const divisor = BigInt(10 ** decimals);
    
    const wholePart = balanceBigInt / divisor;
    const fractionalPart = balanceBigInt % divisor;
    
    if (fractionalPart === BigInt(0)) {
      return wholePart.toString();
    }
    
    const fractionalStr = fractionalPart.toString().padStart(decimals, '0');
    const trimmedFractional = fractionalStr.replace(/0+$/, '');
    
    if (trimmedFractional === '') {
      return wholePart.toString();
    }
    
    return `${wholePart}.${trimmedFractional}`;
  }

  /**
   * Get supported chains
   */
  static getSupportedChains(): { [key: number]: string } {
    return {
      1: 'Ethereum',
      56: 'BNB Chain',
      137: 'Polygon',
      42161: 'Arbitrum',
      10: 'Optimism',
      43114: 'Avalanche',
      250: 'Fantom',
      100: 'Gnosis',
      1313161554: 'Aurora',
      // Add World Chain when supported
      480: 'World Chain', // This might not be supported yet
    };
  }
}

// Utility function to create service instance
export function createOneInchBalanceService(): OneInchBalanceService | null {
  const apiKey = process.env.ONEINCH_API_KEY;
  
  if (!apiKey) {
    console.warn('1inch API key not found. Set ONEINCH_API_KEY environment variable.');
    return null;
  }
  
  return new OneInchBalanceService(apiKey);
}

// Chain ID constants
export const CHAIN_IDS = {
  ETHEREUM: 1,
  BNB_CHAIN: 56,
  POLYGON: 137,
  ARBITRUM: 42161,
  OPTIMISM: 10,
  AVALANCHE: 43114,
  WORLD_CHAIN: 480, // May not be supported by 1inch yet
} as const;

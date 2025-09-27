'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { getPortfolioForHackathon } from '@/lib/actions/fetch-balances'
import type { TokenBalance } from '@/lib/services/oneinch-balance'
import { DollarSign, TrendingUp, Coins, ExternalLink } from 'lucide-react'

interface HackathonPortfolioProps {
  walletAddress: string;
}

export default function HackathonPortfolio({ walletAddress }: HackathonPortfolioProps) {
  const [portfolio, setPortfolio] = useState<{
    totalValueUSD: number;
    tokens: TokenBalance[];
    chains: string[];
    lastUpdated: string;
    powered_by: string;
    error?: string;
  } | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const fetchPortfolio = async () => {
    if (!walletAddress) return
    
    setIsLoading(true)
    try {
      const data = await getPortfolioForHackathon(walletAddress)
      setPortfolio(data)
    } catch (error) {
      console.error('Failed to fetch portfolio:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchPortfolio()
  }, [walletAddress])

  if (!walletAddress) {
    return (
      <Card className="p-6">
        <div className="text-center text-muted-foreground">
          <Coins className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>Connect your wallet to view portfolio</p>
        </div>
      </Card>
    )
  }

  if (isLoading) {
    return (
      <Card className="p-6">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading portfolio data...</p>
        </div>
      </Card>
    )
  }

  if (!portfolio) {
    return (
      <Card className="p-6">
        <div className="text-center text-muted-foreground">
          <p>Failed to load portfolio data</p>
          <Button variant="outline" size="sm" onClick={fetchPortfolio} className="mt-2">
            Retry
          </Button>
        </div>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Portfolio Overview</h3>
          <Badge variant="outline" className="text-xs">
            Powered by {portfolio.powered_by}
          </Badge>
        </div>

        {portfolio.error ? (
          <div className="text-center py-4">
            <p className="text-muted-foreground mb-2">{portfolio.error}</p>
            <p className="text-xs text-muted-foreground">
              Add ONEINCH_API_KEY environment variable for full hackathon features
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                <DollarSign className="h-4 w-4 text-green-600" />
                <span className="text-2xl font-bold">
                  ${portfolio.totalValueUSD.toFixed(2)}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">Total Value</p>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                <Coins className="h-4 w-4 text-blue-600" />
                <span className="text-2xl font-bold">{portfolio.tokens.length}</span>
              </div>
              <p className="text-xs text-muted-foreground">Tokens</p>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                <TrendingUp className="h-4 w-4 text-purple-600" />
                <span className="text-2xl font-bold">{portfolio.chains.length}</span>
              </div>
              <p className="text-xs text-muted-foreground">Chains</p>
            </div>
          </div>
        )}
      </Card>

      {/* Token List */}
      {portfolio.tokens.length > 0 && (
        <Card className="p-6">
          <h4 className="font-semibold mb-4">Token Holdings</h4>
          <div className="space-y-3">
            {portfolio.tokens.map((token, index) => (
              <div key={token.address || index} className="flex items-center justify-between p-3 rounded-lg border">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
                    {token.symbol.slice(0, 2)}
                  </div>
                  <div>
                    <p className="font-medium">{token.symbol}</p>
                    <p className="text-xs text-muted-foreground">{token.name}</p>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="font-medium">{token.balanceFormatted}</p>
                  {token.valueUSD && (
                    <p className="text-xs text-muted-foreground">
                      ${token.valueUSD.toFixed(2)}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Hackathon Info */}
      <Card className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <ExternalLink className="h-5 w-5 text-white" />
          </div>
          <div className="flex-1">
            <p className="font-medium text-sm">🏆 Hackathon Integration</p>
            <p className="text-xs text-muted-foreground">
              Real-time portfolio data powered by 1inch Balance API
            </p>
          </div>
          <Badge variant="secondary" className="text-xs">
            Live Data
          </Badge>
        </div>
      </Card>
    </div>
  )
}

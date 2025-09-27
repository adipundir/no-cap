'use client'

import { useState, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useToast } from '@/hooks/use-toast'
import { ArrowLeftRight, ExternalLink, Loader2, AlertCircle, CheckCircle, Bridge } from 'lucide-react'
import { ETHEREUM_CONTRACTS, WORLD_CHAIN_CONTRACTS, HYPERLANE_CONFIG } from '@/lib/world-chain-contracts'

interface HyperlanePYUSDBridgeProps {
  walletAddress?: string
  onBridgeSuccess?: (txHash: string, amount: string, direction: 'to-world' | 'to-ethereum') => void
  onBridgeError?: (error: any) => void
}

export function HyperlanePYUSDBridge({ 
  walletAddress, 
  onBridgeSuccess, 
  onBridgeError 
}: HyperlanePYUSDBridgeProps) {
  const [amount, setAmount] = useState('')
  const [direction, setDirection] = useState<'to-world' | 'to-ethereum'>('to-world')
  const [isBridging, setIsBridging] = useState(false)
  const [ethereumBalance, setEthereumBalance] = useState('0.00')
  const [worldBalance, setWorldBalance] = useState('0.00')
  const { toast } = useToast()

  const handleBridge = useCallback(async () => {
    if (!walletAddress || !amount || parseFloat(amount) <= 0) {
      toast({
        type: 'error',
        title: 'Invalid Input',
        description: 'Please enter a valid amount and connect your wallet.',
      })
      return
    }

    setIsBridging(true)
    try {
      if (direction === 'to-world') {
        // Bridge PYUSD from Ethereum to World Chain
        toast({
          type: 'info',
          title: 'Bridging to World Chain',
          description: 'Initiating PYUSD bridge from Ethereum to World Chain via Hyperlane...',
        })

        // This would use Hyperlane Warp Route SDK
        // For now, we'll simulate the transaction
        const txHash = await simulateHyperlaneBridge(
          ETHEREUM_CONTRACTS.PYUSD,
          ETHEREUM_CONTRACTS.HYPERLANE_PYUSD_WARP,
          amount,
          walletAddress,
          HYPERLANE_CONFIG.WORLD_CHAIN_DOMAIN
        )

        toast({
          type: 'success',
          title: 'Bridge Initiated!',
          description: `Bridging ${amount} PYUSD to World Chain. TX: ${txHash.slice(0, 10)}...`,
        })

        onBridgeSuccess?.(txHash, amount, 'to-world')
      } else {
        // Bridge wPYUSD from World Chain back to Ethereum
        toast({
          type: 'info',
          title: 'Bridging to Ethereum',
          description: 'Initiating wPYUSD bridge from World Chain to Ethereum via Hyperlane...',
        })

        const txHash = await simulateHyperlaneBridge(
          WORLD_CHAIN_CONTRACTS.WPYUSD,
          WORLD_CHAIN_CONTRACTS.HYPERLANE_MAILBOX,
          amount,
          walletAddress,
          HYPERLANE_CONFIG.ETHEREUM_DOMAIN
        )

        toast({
          type: 'success',
          title: 'Bridge Initiated!',
          description: `Bridging ${amount} wPYUSD to Ethereum. TX: ${txHash.slice(0, 10)}...`,
        })

        onBridgeSuccess?.(txHash, amount, 'to-ethereum')
      }

      // Reset form
      setAmount('')
    } catch (error: any) {
      console.error('Bridge error:', error)
      toast({
        type: 'error',
        title: 'Bridge Failed',
        description: error.message || 'Failed to initiate bridge transaction.',
      })
      onBridgeError?.(error)
    } finally {
      setIsBridging(false)
    }
  }, [walletAddress, amount, direction, toast, onBridgeSuccess, onBridgeError])

  const switchDirection = () => {
    setDirection(direction === 'to-world' ? 'to-ethereum' : 'to-world')
    setAmount('')
  }

  const isValidAmount = amount && parseFloat(amount) > 0 && parseFloat(amount) >= 1 // Min 1 PYUSD

  return (
    <Card className="p-6">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Bridge className="h-5 w-5" />
            PYUSD Bridge
          </h3>
          <Badge variant="outline" className="flex items-center gap-1">
            <ExternalLink className="h-3 w-3" />
            Hyperlane
          </Badge>
        </div>

        {/* Bridge Direction */}
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
            <div className="text-center flex-1">
              <p className="text-sm font-medium">From</p>
              <p className="text-xs text-muted-foreground mt-1">
                {direction === 'to-world' ? 'Ethereum Mainnet' : 'World Chain'}
              </p>
              <p className="text-lg font-semibold mt-2">
                {direction === 'to-world' ? 'PYUSD' : 'wPYUSD'}
              </p>
              <p className="text-xs text-muted-foreground">
                Balance: {direction === 'to-world' ? ethereumBalance : worldBalance}
              </p>
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={switchDirection}
              className="mx-4"
              disabled={isBridging}
            >
              <ArrowLeftRight className="h-4 w-4" />
            </Button>

            <div className="text-center flex-1">
              <p className="text-sm font-medium">To</p>
              <p className="text-xs text-muted-foreground mt-1">
                {direction === 'to-world' ? 'World Chain' : 'Ethereum Mainnet'}
              </p>
              <p className="text-lg font-semibold mt-2">
                {direction === 'to-world' ? 'wPYUSD' : 'PYUSD'}
              </p>
              <p className="text-xs text-muted-foreground">
                Balance: {direction === 'to-world' ? worldBalance : ethereumBalance}
              </p>
            </div>
          </div>

          {/* Amount Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Amount</label>
            <div className="relative">
              <input
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full rounded-lg border bg-background px-3 py-2 text-sm pr-16"
                disabled={isBridging}
                min="1"
                step="0.01"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                {direction === 'to-world' ? 'PYUSD' : 'wPYUSD'}
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              Minimum: 1 {direction === 'to-world' ? 'PYUSD' : 'wPYUSD'}
            </p>
          </div>

          {/* Bridge Info */}
          <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-md">
            <div className="flex items-start gap-2">
              <AlertCircle className="h-4 w-4 text-blue-500 mt-0.5" />
              <div className="text-sm text-blue-800 dark:text-blue-200">
                <p className="font-medium mb-1">Hyperlane Bridge</p>
                <ul className="text-xs space-y-1 text-blue-700 dark:text-blue-300">
                  <li>• Cross-chain bridge powered by Hyperlane</li>
                  <li>• Bridge time: ~10-30 minutes</li>
                  <li>• Gas fees paid on both chains</li>
                  <li>• 1:1 peg maintained automatically</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Bridge Button */}
          <Button
            onClick={handleBridge}
            disabled={!walletAddress || !isValidAmount || isBridging}
            className="w-full"
            size="lg"
          >
            {isBridging ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Bridging...
              </>
            ) : (
              <>
                <Bridge className="mr-2 h-4 w-4" />
                Bridge {direction === 'to-world' ? 'to World Chain' : 'to Ethereum'}
              </>
            )}
          </Button>

          {!walletAddress && (
            <div className="text-center text-sm text-muted-foreground">
              Connect your wallet to start bridging
            </div>
          )}
        </div>

        {/* Bridge Status */}
        <div className="pt-4 border-t border-border">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Powered by Hyperlane</span>
            <a
              href="https://hyperlane.xyz"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-foreground"
            >
              Learn more <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      </div>
    </Card>
  )
}

// Simulate Hyperlane bridge transaction (replace with actual Hyperlane SDK)
async function simulateHyperlaneBridge(
  tokenAddress: string,
  bridgeAddress: string,
  amount: string,
  recipient: string,
  destinationDomain: number
): Promise<string> {
  // In a real implementation, this would use the Hyperlane Warp Route SDK
  // to initiate the bridge transaction
  
  // Simulate transaction hash
  await new Promise(resolve => setTimeout(resolve, 2000))
  return '0x' + Math.random().toString(16).substring(2, 66)
}

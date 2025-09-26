'use client'

import { useState, useCallback, useEffect } from 'react'
import { MiniKit, WalletAuthInput } from '@worldcoin/minikit-js'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, AlertCircle, Loader2, Wallet, User, LogOut, Coins } from 'lucide-react'

type SupportedChain = 'ethereum-sepolia' | 'solana-devnet'

interface ChainConfig {
  name: string
  displayName: string
  pyusdContract: string
  faucetUrl: string
  explorerUrl: string
  icon: string
}

const CHAIN_CONFIGS: Record<SupportedChain, ChainConfig> = {
  'ethereum-sepolia': {
    name: 'ethereum-sepolia',
    displayName: 'Ethereum Sepolia',
    pyusdContract: '0x...', // Mock PYUSD contract on Sepolia (you'll need to deploy)
    faucetUrl: 'https://sepoliafaucet.com',
    explorerUrl: 'https://sepolia.etherscan.io',
    icon: '⟠'
  },
  'solana-devnet': {
    name: 'solana-devnet',
    displayName: 'Solana Devnet',
    pyusdContract: 'CXk2AMBfi3TwaEL2468s6zP8xq9NxTXjp9gjMgzeUynM',
    faucetUrl: 'https://cloud.google.com/application/web3/faucet/solana',
    explorerUrl: 'https://explorer.solana.com/?cluster=devnet',
    icon: '◎'
  }
}

interface MultiChainWalletProps {
  onAuthSuccess?: (address: string, signature: string, chain: SupportedChain) => void
  onAuthError?: (error: any) => void
}

export function MultiChainWallet({ onAuthSuccess, onAuthError }: MultiChainWalletProps) {
  const [isConnecting, setIsConnecting] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const [selectedChain, setSelectedChain] = useState<SupportedChain>('solana-devnet')
  const [walletAddress, setWalletAddress] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [pyusdBalance, setPyusdBalance] = useState<string>('0')

  // Check if already connected on mount
  useEffect(() => {
    if (MiniKit.isInstalled()) {
      const address = MiniKit.walletAddress
      if (address) {
        setWalletAddress(address)
        setIsConnected(true)
        // TODO: Fetch PYUSD balance
      }
    }
  }, [])

  const generateNonce = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
  }

  const handleConnect = useCallback(async () => {
    if (!MiniKit.isInstalled()) {
      setErrorMessage('MiniKit is not installed. Please open this app in World App.')
      return
    }

    setIsConnecting(true)
    setErrorMessage('')

    try {
      const nonce = generateNonce()
      const chainConfig = CHAIN_CONFIGS[selectedChain]
      
      const walletAuthPayload: WalletAuthInput = {
        nonce,
        statement: `Connect to NOCAP on ${chainConfig.displayName} for PYUSD transactions and fact verification`,
        expirationTime: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000), // 7 days
        notBefore: new Date(new Date().getTime() - 24 * 60 * 60 * 1000), // 24 hours ago
        requestId: `${selectedChain}-${Date.now()}`
      }

      const { finalPayload } = await MiniKit.commandsAsync.walletAuth(walletAuthPayload)

      if (finalPayload.status === 'error') {
        setErrorMessage(finalPayload.error_code || 'Wallet authentication failed')
        onAuthError?.(finalPayload)
        return
      }

      // Success! Extract wallet info
      const { address, signature, message } = finalPayload
      setWalletAddress(address)
      setIsConnected(true)
      
      console.log('Multi-chain wallet authenticated:', {
        address,
        signature,
        message,
        chain: selectedChain,
        pyusdContract: chainConfig.pyusdContract
      })

      // TODO: Fetch PYUSD balance for the connected wallet
      // This would require chain-specific balance checking logic

      onAuthSuccess?.(address, signature, selectedChain)
    } catch (error) {
      console.error('Wallet auth error:', error)
      setErrorMessage('An unexpected error occurred')
      onAuthError?.(error)
    } finally {
      setIsConnecting(false)
    }
  }, [selectedChain, onAuthSuccess, onAuthError])

  const handleDisconnect = useCallback(() => {
    setWalletAddress('')
    setIsConnected(false)
    setErrorMessage('')
    setPyusdBalance('0')
  }, [])

  const formatAddress = (address: string) => {
    if (!address) return ''
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  const currentChain = CHAIN_CONFIGS[selectedChain]

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Wallet className="h-5 w-5" />
            PYUSD Wallet Connection
          </h3>
          {isConnected && (
            <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
              Connected
            </Badge>
          )}
        </div>

        {/* Chain Selection */}
        {!isConnected && (
          <div className="space-y-3">
            <label className="text-sm font-medium">Select Network</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {Object.entries(CHAIN_CONFIGS).map(([chainKey, config]) => (
                <button
                  key={chainKey}
                  onClick={() => setSelectedChain(chainKey as SupportedChain)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    selectedChain === chainKey
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{config.icon}</span>
                    <div className="text-left">
                      <p className="font-medium text-sm">{config.displayName}</p>
                      <p className="text-xs text-muted-foreground">PYUSD Available</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
        
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">
            {isConnected 
              ? `Connected to ${currentChain.displayName} with PYUSD support`
              : `Connect your wallet to ${currentChain.displayName} for PYUSD transactions and World ID verification`
            }
          </p>

          {isConnected && walletAddress && (
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-md">
                <User className="h-4 w-4 text-green-500" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-green-800 dark:text-green-200">
                    {currentChain.icon} {currentChain.displayName}
                  </p>
                  <p className="text-xs font-mono text-green-700 dark:text-green-300">
                    {formatAddress(walletAddress)}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleDisconnect}
                  className="text-green-700 hover:text-green-800 dark:text-green-300"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>

              {/* PYUSD Balance */}
              <div className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-md">
                <Coins className="h-4 w-4 text-blue-500" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-blue-800 dark:text-blue-200">
                    PYUSD Balance
                  </p>
                  <p className="text-xs text-blue-700 dark:text-blue-300">
                    {pyusdBalance} PYUSD
                  </p>
                </div>
                <a
                  href={currentChain.faucetUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-blue-600 hover:text-blue-800 underline"
                >
                  Get Testnet PYUSD
                </a>
              </div>
            </div>
          )}

          {errorMessage && (
            <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-900/20 rounded-md">
              <AlertCircle className="h-4 w-4 text-red-500" />
              <p className="text-sm text-red-700 dark:text-red-300">{errorMessage}</p>
            </div>
          )}
        </div>

        {!isConnected && (
          <Button 
            onClick={handleConnect} 
            disabled={isConnecting}
            className="w-full"
          >
            {isConnecting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Connecting to {currentChain.displayName}...
              </>
            ) : (
              <>
                <Wallet className="mr-2 h-4 w-4" />
                Connect to {currentChain.displayName}
              </>
            )}
          </Button>
        )}

        {isConnected && (
          <div className="pt-2 border-t border-border">
            <div className="grid grid-cols-2 gap-4 text-xs text-muted-foreground">
              <div>
                <p className="font-medium">Network</p>
                <p>{currentChain.displayName}</p>
              </div>
              <div>
                <p className="font-medium">PYUSD Contract</p>
                <p className="font-mono break-all">{formatAddress(currentChain.pyusdContract)}</p>
              </div>
            </div>
            
            <div className="mt-3 flex gap-2">
              <a
                href={`${currentChain.explorerUrl}/address/${walletAddress}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-blue-600 hover:text-blue-800 underline"
              >
                View on Explorer
              </a>
              <span className="text-xs text-muted-foreground">•</span>
              <a
                href={currentChain.faucetUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-blue-600 hover:text-blue-800 underline"
              >
                Get Test Tokens
              </a>
            </div>
          </div>
        )}
      </div>
    </Card>
  )
}

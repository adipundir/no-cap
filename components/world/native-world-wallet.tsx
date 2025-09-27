'use client'

import { useState, useCallback, useEffect } from 'react'
import { MiniKit, WalletAuthInput } from '@worldcoin/minikit-js'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, AlertCircle, Loader2, Wallet, User, LogOut, Coins } from 'lucide-react'

interface NativeWorldWalletProps {
  onAuthSuccess?: (address: string, signature: string) => void
  onAuthError?: (error: any) => void
}

export function NativeWorldWallet({ onAuthSuccess, onAuthError }: NativeWorldWalletProps) {
  const [isConnecting, setIsConnecting] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [wpyusdBalance, setWpyusdBalance] = useState<string>('0')

  // Check if already connected on mount
  useEffect(() => {
    // Note: MiniKit doesn't expose walletAddress directly
    // Wallet connection state should be managed through authentication flow
    // This effect can be used for other initialization if needed
  }, [])

  const fetchWpyusdBalance = async (address: string) => {
    try {
      // This would fetch wPYUSD balance from World Chain
      // For demo purposes, we'll simulate this
      console.log('Fetching wPYUSD balance for:', address)
      // In reality, you'd call the wPYUSD contract or use an API
      setWpyusdBalance('100.50') // Mock balance
    } catch (error) {
      console.error('Error fetching wPYUSD balance:', error)
    }
  }

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
      
      const walletAuthPayload: WalletAuthInput = {
        nonce,
        statement: 'Connect to NOCAP for community-driven fact verification on World Chain',
        expirationTime: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000), // 7 days
        notBefore: new Date(new Date().getTime() - 24 * 60 * 60 * 1000), // 24 hours ago
        requestId: Date.now().toString()
      }

      const { finalPayload } = await MiniKit.commandsAsync.walletAuth(walletAuthPayload)

      if (finalPayload.status === 'error') {
        setErrorMessage(finalPayload.error_code || 'Wallet authentication failed')
        onAuthError?.(finalPayload)
        return
      }

      // Success! World App provides the wallet address and signature
      const { address, signature, message } = finalPayload
      setWalletAddress(address)
      setIsConnected(true)
      
      // Fetch wPYUSD balance
      await fetchWpyusdBalance(address)
      
      console.log('World App wallet connected:', {
        address,
        signature,
        message,
        nonce,
        // World App automatically handles the network
        network: 'World App Native'
      })

      onAuthSuccess?.(address, signature)
    } catch (error) {
      console.error('Wallet auth error:', error)
      setErrorMessage('An unexpected error occurred')
      onAuthError?.(error)
    } finally {
      setIsConnecting(false)
    }
  }, [onAuthSuccess, onAuthError])

  const handleDisconnect = useCallback(() => {
    setWalletAddress('')
    setIsConnected(false)
    setErrorMessage('')
    setWpyusdBalance('0')
  }, [])

  const formatAddress = (address: string) => {
    if (!address) return ''
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Wallet className="h-5 w-5" />
            World App Wallet
          </h3>
          {isConnected && (
            <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
              Connected
            </Badge>
          )}
        </div>
        
        <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
            {isConnected 
              ? 'Your World App wallet is connected to World Chain with gas sponsorship.'
              : 'Connect your built-in World App wallet for seamless World Chain transactions.'
            }
          </p>

          {isConnected && walletAddress && (
            <div className="space-y-3">
              {/* Wallet Info */}
              <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-md">
                <User className="h-4 w-4 text-green-500" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-green-800 dark:text-green-200">
                    🌍 World App Wallet
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

              {/* wPYUSD Balance */}
              <div className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-md">
                <Coins className="h-4 w-4 text-blue-500" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-blue-800 dark:text-blue-200">
                    wPYUSD Balance
                  </p>
                  <p className="text-xs text-blue-700 dark:text-blue-300">
                    {wpyusdBalance} wPYUSD
                  </p>
                </div>
                <a
                  href="/bridge"
                  className="text-xs text-blue-600 hover:text-blue-800 underline"
                >
                  Bridge PYUSD
                </a>
              </div>

              {/* Network Info */}
              <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-md">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <p className="text-sm font-medium text-purple-800 dark:text-purple-200">
                    Connected to World Chain
                  </p>
                </div>
                <p className="text-xs text-purple-700 dark:text-purple-300 mt-1">
                  Mainnet • Chain ID: 480 • Gas Sponsored
                </p>
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
                Connecting to World App Wallet...
              </>
            ) : (
              <>
                <Wallet className="mr-2 h-4 w-4" />
                Connect World App Wallet
              </>
            )}
          </Button>
        )}

        {isConnected && (
          <div className="pt-2 border-t border-border">
            <div className="grid grid-cols-2 gap-4 text-xs text-muted-foreground">
              <div>
                <p className="font-medium">Network</p>
                <p>World Chain</p>
              </div>
              <div>
                <p className="font-medium">Gas Fees</p>
                <p>Sponsored</p>
              </div>
            </div>
            
            <div className="mt-3 flex gap-2">
              <a
                href={`https://worldscan.org/address/${walletAddress}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-blue-600 hover:text-blue-800 underline"
              >
                View on Worldscan
              </a>
              <span className="text-xs text-muted-foreground">•</span>
              <a
                href="https://bridge.worldchain.org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-blue-600 hover:text-blue-800 underline"
              >
                Bridge Assets
              </a>
            </div>
          </div>
        )}
      </div>
    </Card>
  )
}

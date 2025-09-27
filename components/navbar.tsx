'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { MiniKit, WalletAuthInput, VerifyCommandInput, VerificationLevel, ISuccessResult } from '@worldcoin/minikit-js'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useToast } from '@/hooks/use-toast'
import { useUnifiedContracts } from '@/hooks/use-unified-contracts'
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { 
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet'
import { 
  Wallet, 
  Menu, 
  Home, 
  FileText, 
  BarChart3, 
  Plus,
  User,
  LogOut,
  Loader2,
  AlertCircle,
  Coins,
  CheckCircle
} from 'lucide-react'

export function Navbar() {
  const [isWalletConnected, setIsWalletConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState<string>('')
  const [isConnecting, setIsConnecting] = useState(false)
  const [ethBalance, setEthBalance] = useState<string>('0.0000')
  const [wldBalance, setWldBalance] = useState<string>('0.0000')
  const [isVerified, setIsVerified] = useState(false)
  const [isVerifying, setIsVerifying] = useState(false)
  const [isLoadingBalances, setIsLoadingBalances] = useState(false)
  const { toast } = useToast()
  const { verifyAndRegister, checkVerificationStatus, setWalletConnection } = useUnifiedContracts()

  const fetchBalances = useCallback(async (address: string) => {
    if (!address) return
    
    setIsLoadingBalances(true)
    try {
      // Fetch ETH balance from World Chain
      const ethResponse = await fetch('https://worldchain-mainnet.g.alchemy.com/public', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jsonrpc: '2.0',
          method: 'eth_getBalance',
          params: [address, 'latest'],
          id: 1,
        }),
      })
      
      const ethData = await ethResponse.json()
      if (ethData.result) {
        // Convert from wei to ETH
        const ethBalanceWei = BigInt(ethData.result)
        const ethBalanceEth = Number(ethBalanceWei) / 1e18
        setEthBalance(ethBalanceEth.toFixed(4))
      }

      // Fetch WLD balance (ERC-20 token)
      const wldTokenAddress = '0x2cFc85d8E48F8EAB294be644d9E25C3030863003' // WLD on World Chain
      
      // ERC-20 balanceOf function call data
      const balanceOfData = '0x70a08231' + address.slice(2).padStart(64, '0')
      
      const wldResponse = await fetch('https://worldchain-mainnet.g.alchemy.com/public', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jsonrpc: '2.0',
          method: 'eth_call',
          params: [
            {
              to: wldTokenAddress,
              data: balanceOfData,
            },
            'latest'
          ],
          id: 2,
        }),
      })
      
      const wldData = await wldResponse.json()
      if (wldData.result && wldData.result !== '0x') {
        // Convert from wei to WLD (18 decimals)
        const wldBalanceWei = BigInt(wldData.result)
        const wldBalanceTokens = Number(wldBalanceWei) / 1e18
        setWldBalance(wldBalanceTokens.toFixed(2))
      } else {
        setWldBalance('0.00')
      }
      
    } catch (error) {
      console.error('Error fetching balances:', error)
      // Keep existing values on error
    } finally {
      setIsLoadingBalances(false)
    }
  }, [])

  const generateNonce = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
  }

  // Auto-verification function triggered after wallet connection
  const handleAutoVerification = useCallback(async (address: string) => {
    try {
      // First check if user is already verified on-chain
      await setWalletConnection(address)
      
      // Check if contracts are deployed (not 0x0000...)
      const contractsDeployed = process.env.NEXT_PUBLIC_CONTRACTS_DEPLOYED === 'true'
      
      if (!contractsDeployed) {
        console.log('Contracts not deployed yet, skipping auto-verification')
        toast({
          type: 'info',
          title: 'Welcome!',
          description: 'Wallet connected successfully. Contract deployment pending for full verification.',
        })
        return
      }
      
      const verified = await checkVerificationStatus()
      
      if (verified) {
        setIsVerified(true)
        toast({
          type: 'info',
          title: 'Already Verified',
          description: 'Your World ID is already verified on-chain.',
        })
        return
      }

      // User not verified - trigger World ID verification automatically
      setIsVerifying(true)
      
      toast({
        type: 'info',
        title: 'Verifying Humanity',
        description: 'Please complete World ID verification to prove your humanity...',
      })

      const verifyPayload: VerifyCommandInput = {
        action: process.env.NEXT_PUBLIC_ACTION_ID || 'humanhood',
        signal: address,
        verification_level: VerificationLevel.Orb
      }

      const { finalPayload } = await MiniKit.commandsAsync.verify(verifyPayload)

      if (finalPayload.status === 'error') {
        toast({
          type: 'error',
          title: 'Verification Failed',
          description: finalPayload.error_code || 'World ID verification failed. You can try again later.',
        })
        return
      }

      // World ID verification successful - now submit to blockchain
      const result = finalPayload as ISuccessResult
      
      toast({
        type: 'info',
        title: 'Submitting to Blockchain',
        description: 'Recording your verification on World Chain...',
      })

      const txHash = await verifyAndRegister(
        result.merkle_root,
        result.nullifier_hash,
        Array.isArray(result.proof) ? result.proof : [result.proof]
      )

      setIsVerified(true)
      
      toast({
        type: 'success',
        title: 'Humanity Verified!',
        description: `You're now verified on World Chain. TX: ${txHash.slice(0, 10)}...`,
      })

    } catch (error: any) {
      console.error('Auto-verification error:', error)
      
      // Handle specific contract errors
      if (error.message?.includes('0x0000') || error.message?.includes('not deployed')) {
        toast({
          type: 'info',
          title: 'Contract Pending',
          description: 'Smart contracts are being deployed. Verification will be available soon.',
        })
      } else if (!error.message?.includes('cancelled') && !error.message?.includes('denied')) {
        toast({
          type: 'error',
          title: 'Verification Error',
          description: 'Auto-verification failed. You can verify manually later.',
        })
      }
    } finally {
      setIsVerifying(false)
    }
  }, [toast, checkVerificationStatus, setWalletConnection, verifyAndRegister])

  // Check wallet connection status on mount
  useEffect(() => {
    // World App native wallet doesn't persist connection state
    // Connection is managed through walletAuth flow
  }, [])

  const handleWalletConnect = useCallback(async () => {
    if (!MiniKit.isInstalled()) {
      toast({
        type: 'error',
        title: 'World App Required',
        description: 'Please open this app in World App to connect your wallet.',
      })
      return
    }

    setIsConnecting(true)

    try {
      const nonce = generateNonce()
      
      const walletAuthPayload: WalletAuthInput = {
        nonce,
        statement: 'Connect to NOCAP for community-driven fact verification on World Chain',
        expirationTime: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
        notBefore: new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
        requestId: Date.now().toString()
      }

      const { finalPayload } = await MiniKit.commandsAsync.walletAuth(walletAuthPayload)

      if (finalPayload.status === 'error') {
        toast({
          type: 'error',
          title: 'Connection Failed',
          description: finalPayload.error_code || 'Failed to connect wallet. Please try again.',
        })
        return
      }

      const { address, signature, message } = finalPayload
      setWalletAddress(address)
      setIsWalletConnected(true)
      await fetchBalances(address)
      
      toast({
        type: 'success',
        title: 'Wallet Connected',
        description: `Successfully connected ${address.slice(0, 6)}...${address.slice(-4)}`,
      })
      
      console.log('World App wallet connected:', { address, signature, message })
      
      // Automatically trigger World ID verification after wallet connection
      await handleAutoVerification(address)
      
    } catch (error) {
      console.error('Wallet auth error:', error)
      toast({
        type: 'error',
        title: 'Connection Error',
        description: 'An unexpected error occurred while connecting your wallet.',
      })
    } finally {
      setIsConnecting(false)
    }
  }, [toast, fetchBalances, handleAutoVerification])



  const handleDisconnect = useCallback(() => {
    setWalletAddress('')
    setIsWalletConnected(false)
    setEthBalance('0.0000')
    setWldBalance('0.0000')
    setIsVerified(false)
    setIsVerifying(false)
    setIsLoadingBalances(false)
    
    toast({
      type: 'info',
      title: 'Wallet Disconnected',
      description: 'Your wallet has been disconnected successfully.',
    })
  }, [toast])


  const formatAddress = (address: string) => {
    if (!address) return ''
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  const navItems = [
    { href: '/feed', label: 'Feed', icon: FileText },
    { href: '/submit', label: 'Submit', icon: Plus },
    { href: '/dashboard', label: 'Dashboard', icon: BarChart3 },
  ]

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background">
      <div className="w-full px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="font-thin text-xl text-foreground">
              NOCAP
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center space-x-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </div>

          {/* Wallet Connection */}
          <div className="flex items-center space-x-4">
            {/* Desktop Wallet */}
            <div className="hidden md:block">
              {isWalletConnected ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex items-center space-x-2">
                      <Wallet className="h-4 w-4" />
                      <span>{formatAddress(walletAddress)}</span>
                      <div className="flex gap-1">
                        <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                          Connected
                        </Badge>
                        {isVerified && (
                          <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                            Verified
                          </Badge>
                        )}
                        {isVerifying && (
                          <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                            Verifying...
                          </Badge>
                        )}
                      </div>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-80">
                    <div className="p-4 space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold flex items-center gap-2">
                          <Wallet className="h-4 w-4" />
                          World App Wallet
                        </h3>
                        <div className="flex gap-1">
                          <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                            Connected
                          </Badge>
                          {isVerified && (
                            <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                              Verified
                            </Badge>
                          )}
                          {isVerifying && (
                            <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                              Verifying...
                            </Badge>
                          )}
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-md">
                          <User className="h-4 w-4 text-green-500" />
                          <div className="flex-1">
                            <p className="text-sm font-medium text-green-800 dark:text-green-200">
                              🌍 World App Wallet
                            </p>
                            <p className="text-xs font-mono text-green-700 dark:text-green-300">
                              {walletAddress}
                            </p>
                            <p className="text-xs text-green-600 dark:text-green-400">
                              World Chain Mainnet
                            </p>
                          </div>
                        </div>

                                {/* ETH Balance */}
                                <div className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-md">
                                  <Coins className="h-4 w-4 text-blue-500" />
                                  <div className="flex-1">
                                    <p className="text-sm font-medium text-blue-800 dark:text-blue-200">
                                      ETH Balance
                                    </p>
                                    <p className="text-xs text-blue-700 dark:text-blue-300">
                                      {isLoadingBalances ? (
                                        <span className="flex items-center gap-1">
                                          <Loader2 className="h-3 w-3 animate-spin" />
                                          Loading...
                                        </span>
                                      ) : (
                                        `${ethBalance} ETH`
                                      )}
                                    </p>
                                  </div>
                                </div>

                                {/* WLD Balance */}
                                <div className="flex items-center gap-3 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-md">
                                  <div className="h-4 w-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                                    <span className="text-xs font-bold text-white">W</span>
                                  </div>
                                  <div className="flex-1">
                                    <p className="text-sm font-medium text-purple-800 dark:text-purple-200">
                                      WLD Balance
                                    </p>
                                    <p className="text-xs text-purple-700 dark:text-purple-300">
                                      {isLoadingBalances ? (
                                        <span className="flex items-center gap-1">
                                          <Loader2 className="h-3 w-3 animate-spin" />
                                          Loading...
                                        </span>
                                      ) : (
                                        `${wldBalance} WLD`
                                      )}
                                    </p>
                                  </div>
                                </div>

                                {/* Refresh Balances Button */}
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => fetchBalances(walletAddress)}
                                  disabled={isLoadingBalances}
                                  className="w-full flex items-center gap-2 text-xs"
                                >
                                  {isLoadingBalances ? (
                                    <Loader2 className="h-3 w-3 animate-spin" />
                                  ) : (
                                    <Coins className="h-3 w-3" />
                                  )}
                                  Refresh Balances
                                </Button>

                                {/* Verification Status */}
                                <div className={`flex items-center gap-3 p-3 rounded-md ${
                                  isVerified 
                                    ? 'bg-blue-50 dark:bg-blue-900/20' 
                                    : isVerifying 
                                      ? 'bg-yellow-50 dark:bg-yellow-900/20'
                                      : 'bg-orange-50 dark:bg-orange-900/20'
                                }`}>
                                  {isVerified ? (
                                    <CheckCircle className="h-4 w-4 text-blue-500" />
                                  ) : isVerifying ? (
                                    <Loader2 className="h-4 w-4 text-yellow-500 animate-spin" />
                                  ) : (
                                    <AlertCircle className="h-4 w-4 text-orange-500" />
                                  )}
                                  <div className="flex-1">
                                    <p className={`text-sm font-medium ${
                                      isVerified 
                                        ? 'text-blue-800 dark:text-blue-200' 
                                        : isVerifying 
                                          ? 'text-yellow-800 dark:text-yellow-200'
                                          : 'text-orange-800 dark:text-orange-200'
                                    }`}>
                                      {isVerified ? 'World ID Verified' : isVerifying ? 'Verifying...' : 'Not Verified'}
                                    </p>
                                    <p className={`text-xs ${
                                      isVerified 
                                        ? 'text-blue-700 dark:text-blue-300' 
                                        : isVerifying 
                                          ? 'text-yellow-700 dark:text-yellow-300'
                                          : 'text-orange-700 dark:text-orange-300'
                                    }`}>
                                      {isVerified 
                                        ? 'Humanity verified on-chain' 
                                        : isVerifying 
                                          ? 'Please complete verification...'
                                          : 'Connect wallet to auto-verify'
                                      }
                                    </p>
                                  </div>
                                </div>


                        <Button 
                          variant="outline" 
                          onClick={handleDisconnect}
                          className="w-full flex items-center gap-2"
                        >
                          <LogOut className="h-4 w-4" />
                          Disconnect
                        </Button>
                      </div>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                        <Button 
                          onClick={handleWalletConnect}
                          disabled={isConnecting}
                          className="flex items-center space-x-2"
                        >
                          {isConnecting ? (
                            <>
                              <Loader2 className="h-4 w-4 animate-spin" />
                              <span>Signing In...</span>
                            </>
                          ) : (
                            <>
                              <Wallet className="h-4 w-4" />
                              <span>Sign In</span>
                            </>
                          )}
                        </Button>
              )}
            </div>

            {/* Mobile Wallet (outside menu) */}
            <div className="md:hidden">
              {isWalletConnected ? (
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                  onClick={handleDisconnect}
                >
                  <Wallet className="h-4 w-4" />
                  <span>{formatAddress(walletAddress)}</span>
                </Button>
              ) : (
                        <Button
                          onClick={handleWalletConnect}
                          disabled={isConnecting}
                          size="sm"
                          className="flex items-center gap-2"
                        >
                          {isConnecting ? (
                            <>
                              <Loader2 className="h-4 w-4 animate-spin" />
                              <span>Signing In...</span>
                            </>
                          ) : (
                            <>
                              <Wallet className="h-4 w-4" />
                              <span>Sign In</span>
                            </>
                          )}
                        </Button>
              )}
            </div>

            {/* Mobile Menu */}
            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-80">
                  <div className="flex flex-col space-y-6 mt-6">
                    {/* Mobile Navigation */}
                    <div className="space-y-4">
                      <Link
                        href="/"
                        className="flex items-center space-x-2 text-sm font-medium hover:text-foreground transition-colors"
                      >
                        <Home className="h-4 w-4" />
                        <span>Home</span>
                      </Link>
                      {navItems.map((item) => {
                        const Icon = item.icon
                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="flex items-center space-x-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                          >
                            <Icon className="h-4 w-4" />
                            <span>{item.label}</span>
                          </Link>
                        )
                      })}
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>

    </nav>
  )
}

'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { MiniKit, WalletAuthInput } from '@worldcoin/minikit-js'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { toast } from "sonner"
import { useSimplifiedContracts } from '@/hooks/use-simplified-contracts'
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger 
} from '@/components/ui/sheet'
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu'
import { 
  Menu, 
  Wallet, 
  ExternalLink, 
  LogOut, 
  RefreshCw,
  Sun,
  Moon
} from 'lucide-react'
import { useTheme } from 'next-themes'

export default function Navbar() {
  const { theme, setTheme } = useTheme()
  const [isWalletConnected, setIsWalletConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState<string>('')
  const [isConnecting, setIsConnecting] = useState(false)
  const [ethBalance, setEthBalance] = useState<string>('0.0000')
  const [wldBalance, setWldBalance] = useState<string>('0.0000')
  const [isLoadingBalances, setIsLoadingBalances] = useState(false)
  const { setWalletConnection } = useSimplifiedContracts()

  const fetchBalances = useCallback(async (address: string) => {
    if (!address) return

    setIsLoadingBalances(true)
    try {
      // Fetch ETH balance
      const rpcUrl = process.env.NEXT_PUBLIC_WORLD_CHAIN_RPC || 'https://worldchain-mainnet.g.alchemy.com/public'
      const ethResponse = await fetch(rpcUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jsonrpc: '2.0',
          method: 'eth_getBalance',
          params: [address, 'latest'],
          id: 1
        })
      })
      
      const ethData = await ethResponse.json()
      if (ethData.result) {
        const ethBalanceWei = BigInt(ethData.result)
        const ethBalanceEth = Number(ethBalanceWei) / 1e18
        setEthBalance(ethBalanceEth.toFixed(4))
      }

      // Fetch WLD balance (ERC-20 token)
      const wldTokenAddress = '0x163f8c2467924be0ae7b5347228cabf260318753'
      const balanceOfSignature = '0x70a08231' // balanceOf(address)
      const paddedAddress = address.slice(2).padStart(64, '0')
      
      const wldResponse = await fetch(rpcUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jsonrpc: '2.0',
          method: 'eth_call',
          params: [{
            to: wldTokenAddress,
            data: balanceOfSignature + paddedAddress
          }, 'latest'],
          id: 2
        })
      })
      
      const wldData = await wldResponse.json()
      if (wldData.result && wldData.result !== '0x') {
        const wldBalanceWei = BigInt(wldData.result)
        const wldBalanceTokens = Number(wldBalanceWei) / 1e18
        setWldBalance(wldBalanceTokens.toFixed(4))
      }
    } catch (error) {
      console.error('Error fetching balances:', error)
    } finally {
      setIsLoadingBalances(false)
    }
  }, [])

  // Check wallet connection status on mount
  useEffect(() => {
    if (typeof window !== 'undefined' && MiniKit.isInstalled()) {
      // Check if already connected
      // This would need to be implemented based on MiniKit's API
    }
  }, [])

  const handleWalletConnect = useCallback(async () => {
    if (!MiniKit.isInstalled()) {
      toast.error('Please open this app in World App to connect your wallet')
      return
    }

    setIsConnecting(true)
    try {
      const nonce = Math.floor(Math.random() * 1000000).toString()
      
      const walletAuthPayload: WalletAuthInput = {
        nonce,
        statement: 'Connect to NOCAP for community-driven fact verification on World Chain',
        expirationTime: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
        notBefore: new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
      }

      const { finalPayload } = await MiniKit.commandsAsync.walletAuth(walletAuthPayload)
      
      if (finalPayload.status === 'error') {
        throw new Error(finalPayload.error_code || 'Wallet connection failed')
      }

      const { address } = finalPayload
      
      setIsWalletConnected(true)
      setWalletAddress(address)
      setWalletConnection(address)
      
      // Fetch balances
      await fetchBalances(address)
      
      toast.success('Wallet connected successfully!')
      
    } catch (error) {
      console.error('Wallet connection error:', error)
      toast.error('Failed to connect wallet. Please try again.')
    } finally {
      setIsConnecting(false)
    }
  }, [fetchBalances, setWalletConnection])

  const handleDisconnect = useCallback(() => {
    setIsWalletConnected(false)
    setWalletAddress('')
    setEthBalance('0.0000')
    setWldBalance('0.0000')
    setIsLoadingBalances(false)
    
    toast('Wallet disconnected')
  }, [])

  const handleRefreshBalances = useCallback(() => {
    if (walletAddress) {
      fetchBalances(walletAddress)
    }
  }, [walletAddress, fetchBalances])

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link className="mr-6 flex items-center space-x-2" href="/">
            <span className="hidden font-bold text-white sm:inline-block" style={{ fontWeight: 100 }}>
              NOCAP
            </span>
          </Link>
        </div>

        {/* Mobile menu */}
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0">
            <Link
              className="flex items-center"
              href="/"
            >
              <span className="font-bold">NOCAP</span>
            </Link>
            <div className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
              <div className="flex flex-col space-y-3">
                <Link href="/feed">Feed</Link>
                <Link href="/submit">Submit</Link>
                <Link href="/dashboard">Dashboard</Link>
              </div>
            </div>
          </SheetContent>
        </Sheet>

        {/* Desktop navigation */}
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <div className="hidden md:flex md:space-x-6">
              <Link
                href="/feed"
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                Feed
              </Link>
              <Link
                href="/submit"
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                Submit
              </Link>
              <Link
                href="/dashboard"
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                Dashboard
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {/* Theme toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>

            {/* Wallet connection */}
            {!isWalletConnected ? (
              <Button 
                onClick={handleWalletConnect} 
                disabled={isConnecting}
                size="sm"
              >
                {isConnecting ? 'Connecting...' : 'Sign In'}
              </Button>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <Wallet className="h-4 w-4" />
                    <div className="hidden sm:flex sm:flex-col sm:items-start">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono">
                          {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
                        </span>
                        <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                          Connected
                        </Badge>
                      </div>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80">
                  <div className="p-4">
                    <div className="space-y-4">
                      {/* Wallet Info */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Wallet Address</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleRefreshBalances}
                            disabled={isLoadingBalances}
                          >
                            <RefreshCw className={`h-3 w-3 ${isLoadingBalances ? 'animate-spin' : ''}`} />
                          </Button>
                        </div>
                        <p className="text-xs font-mono text-muted-foreground break-all">
                          {walletAddress}
                        </p>
                      </div>

                      {/* Balances */}
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 bg-muted rounded-md">
                          <div>
                            <p className="text-sm font-medium">ETH</p>
                            <p className="text-xs text-muted-foreground">World Chain</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-mono">
                              {isLoadingBalances ? '...' : ethBalance}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center p-3 bg-muted rounded-md">
                          <div>
                            <p className="text-sm font-medium">WLD</p>
                            <p className="text-xs text-muted-foreground">Worldcoin Token</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-mono">
                              {isLoadingBalances ? '...' : wldBalance}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="space-y-2">
                        <a
                          href={`https://worldscan.org/address/${walletAddress}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-xs text-blue-600 hover:text-blue-800 underline"
                        >
                          View on Explorer
                          <ExternalLink className="h-3 w-3" />
                        </a>
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
                  </div>
                  
                  <div className="p-2 border-t">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={handleDisconnect} 
                      className="w-full justify-start text-red-600 hover:text-red-700"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Disconnect
                    </Button>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

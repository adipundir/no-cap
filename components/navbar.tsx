'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { MiniKit, WalletAuthInput } from '@worldcoin/minikit-js'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useToast } from '@/hooks/use-toast'
import { useEnvironmentDetection } from '@/components/world/environment-detector'
import { QRWalletConnect } from '@/components/world/qr-wallet-connect'
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
  Globe,
  User,
  LogOut,
  Loader2,
  AlertCircle,
  Coins,
  QrCode,
  X
} from 'lucide-react'

export function Navbar() {
  const [isWalletConnected, setIsWalletConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState<string>('')
  const [isConnecting, setIsConnecting] = useState(false)
  const [pyusdBalance, setPyusdBalance] = useState<string>('0')
  const [showQRModal, setShowQRModal] = useState(false)
  const { toast } = useToast()
  const environment = useEnvironmentDetection()

  // Check wallet connection status on mount
  useEffect(() => {
    // Note: MiniKit doesn't expose walletAddress directly
    // Wallet connection state should be managed through authentication flow
    // This effect can be used for other initialization if needed
  }, [])

  const fetchPyusdBalance = async (address: string) => {
    try {
      // Mock PYUSD balance - in real app, fetch from contract/API
      setPyusdBalance('100.50')
    } catch (error) {
      console.error('Error fetching PYUSD balance:', error)
    }
  }

  const generateNonce = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
  }

  const handleWalletConnect = useCallback(async () => {
    // Check environment and use appropriate connection method
    if (environment.isWorldApp) {
      // Native World App connection
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
          statement: 'Connect to NOCAP for community-driven fact verification with PYUSD rewards',
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
        await fetchPyusdBalance(address)
        
        toast({
          type: 'success',
          title: 'Wallet Connected',
          description: `Successfully connected ${address.slice(0, 6)}...${address.slice(-4)}`,
        })
        
        console.log('World App wallet connected:', { address, signature, message })
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
    } else {
      // Web browser - show QR modal
      setShowQRModal(true)
    }
  }, [environment.isWorldApp, toast])

  const handleDisconnect = () => {
    setWalletAddress('')
    setIsWalletConnected(false)
    setPyusdBalance('0')
    setShowQRModal(false)
    
    // Clear QR wallet connection if exists
    if (typeof window !== 'undefined') {
      localStorage.removeItem('qr-wallet-address')
    }
    
    toast({
      type: 'info',
      title: 'Wallet Disconnected',
      description: 'Your wallet has been disconnected successfully.',
    })
  }

  const handleQRAuthSuccess = (address: string, signature: string) => {
    setWalletAddress(address)
    setIsWalletConnected(true)
    setShowQRModal(false)
    fetchPyusdBalance(address)
  }

  const handleQRAuthError = (error: any) => {
    console.error('QR auth error:', error)
    setShowQRModal(false)
  }

  const formatAddress = (address: string) => {
    if (!address) return ''
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  const navItems = [
    { href: '/feed', label: 'Feed', icon: FileText },
    { href: '/submit', label: 'Submit', icon: Plus },
    { href: '/dashboard', label: 'Dashboard', icon: BarChart3 },
    { href: '/world', label: 'World App', icon: Globe },
  ]

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="font-thin text-xl text-white">
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
                      <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                        Connected
                      </Badge>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-80">
                    <div className="p-4 space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold flex items-center gap-2">
                          <Wallet className="h-4 w-4" />
                          World App Wallet
                        </h3>
                        <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                          Connected
                        </Badge>
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
                          </div>
                        </div>

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
                      <span>Connecting...</span>
                    </>
                  ) : (
                    <>
                      {environment.isWorldApp ? (
                        <Wallet className="h-4 w-4" />
                      ) : (
                        <QrCode className="h-4 w-4" />
                      )}
                      <span>
                        {environment.isWorldApp ? 'Connect Wallet' : 'Scan QR Code'}
                      </span>
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

                    {/* Mobile Wallet */}
                    <div className="border-t border-border pt-6">
                      {isWalletConnected ? (
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <h3 className="font-semibold flex items-center gap-2">
                              <Wallet className="h-4 w-4" />
                              World App Wallet
                            </h3>
                            <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                              Connected
                            </Badge>
                          </div>
                          
                          <div className="space-y-3">
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
                            </div>

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
                      ) : (
                        <div className="space-y-4">
                          <h3 className="font-semibold flex items-center gap-2">
                            <Wallet className="h-4 w-4" />
                            Connect Wallet
                          </h3>

                          <Button 
                            onClick={handleWalletConnect}
                            disabled={isConnecting}
                            className="w-full flex items-center gap-2"
                          >
                            {isConnecting ? (
                              <>
                                <Loader2 className="h-4 w-4 animate-spin" />
                                Connecting...
                              </>
                            ) : (
                              <>
                                {environment.isWorldApp ? (
                                  <Wallet className="h-4 w-4" />
                                ) : (
                                  <QrCode className="h-4 w-4" />
                                )}
                                {environment.isWorldApp ? 'Connect World App Wallet' : 'Scan QR Code'}
                              </>
                            )}
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>

      {/* QR Code Modal for Web Browsers */}
      {showQRModal && !environment.isWorldApp && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold">Connect with World App</h2>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setShowQRModal(false)}
                className="h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="p-4">
              <QRWalletConnect 
                onAuthSuccess={handleQRAuthSuccess}
                onAuthError={handleQRAuthError}
              />
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

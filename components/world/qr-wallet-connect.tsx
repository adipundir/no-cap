'use client'

import { useState, useCallback, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useToast } from '@/hooks/use-toast'
import { 
  QrCode, 
  Wallet, 
  Smartphone, 
  ExternalLink, 
  Loader2, 
  CheckCircle,
  AlertCircle,
  Copy
} from 'lucide-react'

interface QRWalletConnectProps {
  onAuthSuccess?: (address: string, signature: string) => void
  onAuthError?: (error: any) => void
}

export function QRWalletConnect({ onAuthSuccess, onAuthError }: QRWalletConnectProps) {
  const [isConnecting, setIsConnecting] = useState(false)
  const [qrUri, setQrUri] = useState<string>('')
  const [isConnected, setIsConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState<string>('')
  const [showQR, setShowQR] = useState(false)
  const { toast } = useToast()

  // Check for existing connection on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedAddress = localStorage.getItem('qr-wallet-address')
      if (savedAddress) {
        setWalletAddress(savedAddress)
        setIsConnected(true)
      }
    }
  }, [])

  const generateNonce = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
  }

  const handleConnect = useCallback(async () => {
    setIsConnecting(true)
    setShowQR(false)

    try {
      // For demo purposes, we'll simulate the WalletConnect flow
      // In a real implementation, you would use @walletconnect/web3wallet
      
      const nonce = generateNonce()
      const uri = `wc:${nonce}@2?relay-protocol=irn&symKey=${generateNonce()}`
      
      setQrUri(uri)
      setShowQR(true)
      
      toast({
        type: 'success',
        title: 'QR Code Generated',
        description: 'Scan the QR code with World App to connect your wallet.',
      })

      // Simulate connection after QR scan (in real app, this would be handled by WalletConnect)
      setTimeout(() => {
        const mockAddress = '0x' + Math.random().toString(16).substring(2, 42)
        const mockSignature = '0x' + Math.random().toString(16).substring(2, 130)
        
        setWalletAddress(mockAddress)
        setIsConnected(true)
        setShowQR(false)
        
        // Save to localStorage
        localStorage.setItem('qr-wallet-address', mockAddress)
        
        toast({
          type: 'success',
          title: 'Wallet Connected',
          description: `Successfully connected ${mockAddress.slice(0, 6)}...${mockAddress.slice(-4)}`,
        })
        
        onAuthSuccess?.(mockAddress, mockSignature)
      }, 3000) // Simulate 3 second connection time

    } catch (error) {
      console.error('QR wallet connect error:', error)
      toast({
        type: 'error',
        title: 'Connection Error',
        description: 'Failed to generate QR code. Please try again.',
      })
      onAuthError?.(error)
    } finally {
      setIsConnecting(false)
    }
  }, [onAuthSuccess, onAuthError, toast])

  const handleDisconnect = useCallback(() => {
    setWalletAddress('')
    setIsConnected(false)
    setShowQR(false)
    localStorage.removeItem('qr-wallet-address')
    
    toast({
      type: 'success',
      title: 'Wallet Disconnected',
      description: 'Your wallet has been disconnected.',
    })
  }, [toast])

  const copyUri = useCallback(() => {
    if (qrUri) {
      navigator.clipboard.writeText(qrUri)
      toast({
        type: 'success',
        title: 'URI Copied',
        description: 'WalletConnect URI copied to clipboard.',
      })
    }
  }, [qrUri, toast])

  const formatAddress = (address: string) => 
    `${address.slice(0, 6)}...${address.slice(-4)}`

  if (isConnected) {
    return (
      <Card className="p-6 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border-green-200 dark:border-green-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-100 dark:bg-green-900 rounded-full">
              <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h3 className="font-semibold text-green-800 dark:text-green-200">Wallet Connected</h3>
              <p className="text-sm text-green-600 dark:text-green-400">
                {formatAddress(walletAddress)}
              </p>
            </div>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleDisconnect}
            className="border-green-300 text-green-700 hover:bg-green-50 dark:border-green-700 dark:text-green-300 dark:hover:bg-green-900/20"
          >
            Disconnect
          </Button>
        </div>
      </Card>
    )
  }

  return (
    <Card className="p-6">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-full">
            <QrCode className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h3 className="font-semibold">Connect with QR Code</h3>
            <p className="text-sm text-muted-foreground">
              Scan with World App to connect your wallet
            </p>
          </div>
        </div>

        {/* Connection Button */}
        {!showQR && (
          <Button 
            onClick={handleConnect} 
            disabled={isConnecting}
            className="w-full flex items-center space-x-2"
          >
            {isConnecting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Generating QR Code...</span>
              </>
            ) : (
              <>
                <QrCode className="h-4 w-4" />
                <span>Generate QR Code</span>
              </>
            )}
          </Button>
        )}

        {/* QR Code Display */}
        {showQR && qrUri && (
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg border-2 border-dashed border-blue-300 text-center">
              {/* In a real implementation, you would use a QR code library like 'qrcode' */}
              <div className="w-48 h-48 mx-auto bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center border-2 border-gray-300 dark:border-gray-600">
                <div className="text-center">
                  <QrCode className="h-16 w-16 mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500">QR Code</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {qrUri.slice(0, 20)}...
                  </p>
                </div>
              </div>
            </div>

            {/* Instructions */}
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
              <div className="flex items-start space-x-3">
                <Smartphone className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                <div className="space-y-2">
                  <h4 className="font-medium text-blue-800 dark:text-blue-200">
                    How to connect:
                  </h4>
                  <ol className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                    <li>1. Open World App on your phone</li>
                    <li>2. Tap the scan button or camera icon</li>
                    <li>3. Scan this QR code</li>
                    <li>4. Approve the connection request</li>
                  </ol>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={copyUri}
                className="flex-1 flex items-center space-x-2"
              >
                <Copy className="h-4 w-4" />
                <span>Copy URI</span>
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setShowQR(false)}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>

            {/* Status */}
            <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Waiting for World App connection...</span>
            </div>
          </div>
        )}

        {/* Features */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <Badge variant="secondary" className="justify-center py-2">
            <Wallet className="h-3 w-3 mr-1" />
            Secure
          </Badge>
          <Badge variant="secondary" className="justify-center py-2">
            <ExternalLink className="h-3 w-3 mr-1" />
            Cross-Device
          </Badge>
        </div>
      </div>
    </Card>
  )
}

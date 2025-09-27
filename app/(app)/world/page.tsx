'use client'

import { useState } from 'react'
import { WorldAppStatus } from '@/components/world/world-app-status'
import { NativeWorldWallet } from '@/components/world/native-world-wallet'
import { EnhancedWorldIDVerification } from '@/components/world/enhanced-world-id-verification'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { VerificationLevel } from '@worldcoin/minikit-js'
import { Shield, Wallet, Globe, Zap, Users, Lock, CheckCircle } from 'lucide-react'

export default function WorldMiniApp() {
  const [isWalletConnected, setIsWalletConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState<string>('')
  const [verificationResult, setVerificationResult] = useState<any>(null)

  const handleWalletAuthSuccess = (address: string, signature: string) => {
    console.log('World App wallet authenticated:', { address, signature })
    setWalletAddress(address)
    setIsWalletConnected(true)
  }

  const handleWalletAuthError = (error: any) => {
    console.error('Wallet auth failed:', error)
    setIsWalletConnected(false)
  }

  const handleVerificationSuccess = (result: any) => {
    console.log('World ID verified:', result)
    setVerificationResult(result)
  }

  const handleVerificationError = (error: any) => {
    console.error('Verification failed:', error)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Globe className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              World Mini App
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Experience the power of World ID verification and seamless payments in the World App ecosystem.
          </p>
        </div>

        {/* Status Card */}
        <div className="mb-8">
          <WorldAppStatus />
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 text-center">
            <Wallet className="h-8 w-8 text-blue-500 mx-auto mb-3" />
            <h3 className="font-semibold mb-2">World App Wallet</h3>
            <p className="text-sm text-muted-foreground">
              Native wallet with gas-sponsored transactions and PYUSD support
            </p>
          </Card>
          
          <Card className="p-6 text-center">
            <Shield className="h-8 w-8 text-green-500 mx-auto mb-3" />
            <h3 className="font-semibold mb-2">World ID Verification</h3>
            <p className="text-sm text-muted-foreground">
              Prove your humanity with privacy-preserving identity verification
            </p>
          </Card>
          
          <Card className="p-6 text-center">
            <Zap className="h-8 w-8 text-purple-500 mx-auto mb-3" />
            <h3 className="font-semibold mb-2">On-Chain Ready</h3>
            <p className="text-sm text-muted-foreground">
              Generate proofs for direct smart contract verification
            </p>
          </Card>
        </div>

        {/* Authentication Flow */}
        <div className="space-y-6">
          {/* Step 1: Wallet Authentication */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 font-semibold text-sm">
                1
              </div>
              <h2 className="text-xl font-semibold">Connect World App Wallet</h2>
              {isWalletConnected && <CheckCircle className="h-5 w-5 text-green-500" />}
            </div>
            
            <NativeWorldWallet
              onAuthSuccess={handleWalletAuthSuccess}
              onAuthError={handleWalletAuthError}
            />
          </div>

          {/* Step 2: World ID Verification (only show if wallet connected) */}
          {isWalletConnected && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 font-semibold text-sm">
                  2
                </div>
                <h2 className="text-xl font-semibold">Verify Your Humanity</h2>
                {verificationResult && <CheckCircle className="h-5 w-5 text-green-500" />}
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <EnhancedWorldIDVerification
              walletAddress={walletAddress}
              action="humanhood"
              signal={walletAddress}
              verificationLevel={VerificationLevel.Orb}
              enableOnChainVerification={true}
              onSuccess={handleVerificationSuccess}
              onError={handleVerificationError}
            />

                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Lock className="h-5 w-5" />
                    Why Verify?
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Shield className="h-5 w-5 text-blue-500 mt-0.5" />
                      <div>
                        <h4 className="font-medium">Sybil Resistance</h4>
                        <p className="text-sm text-muted-foreground">
                          Prevent fake accounts and ensure one-person-one-vote
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <Users className="h-5 w-5 text-green-500 mt-0.5" />
                      <div>
                        <h4 className="font-medium">Community Trust</h4>
                        <p className="text-sm text-muted-foreground">
                          Build trust in the fact-checking community
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <Zap className="h-5 w-5 text-purple-500 mt-0.5" />
                      <div>
                        <h4 className="font-medium">Privacy Preserved</h4>
                        <p className="text-sm text-muted-foreground">
                          Your identity remains anonymous while proving humanity
                        </p>
                      </div>
                    </div>
                  </div>

                  {verificationResult && (
                    <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <h4 className="font-medium text-green-800 dark:text-green-200 mb-2">
                        ✓ Verification Complete
                      </h4>
                      <p className="text-sm text-green-700 dark:text-green-300">
                        You're now verified and ready to participate in NOCAP!
                      </p>
                    </div>
                  )}
                </Card>
              </div>
            </div>
          )}

          {/* Success State */}
          {isWalletConnected && verificationResult && (
            <div className="mt-8">
              <Card className="p-6 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border-green-200 dark:border-green-800">
                <div className="text-center space-y-4">
                  <CheckCircle className="h-12 w-12 text-green-500 mx-auto" />
                  <div>
                    <h3 className="text-xl font-semibold text-green-800 dark:text-green-200">
                      Ready for NOCAP!
                    </h3>
                    <p className="text-green-700 dark:text-green-300 mt-2">
                      Your wallet is connected and humanity is verified. You can now participate in community fact-checking.
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                      🌍 {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
                    </Badge>
                    <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                      World ID: Verified
                    </Badge>
                    <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                      Gas Sponsored
                    </Badge>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

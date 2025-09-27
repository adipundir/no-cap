'use client'

import { useState } from 'react'
import { NativeWorldWallet } from '@/components/world/native-world-wallet'
import { IDKitVerification } from '@/components/world/idkit-verification'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useUnifiedContracts } from '@/hooks/use-unified-contracts'
import { 
  Shield, 
  Wallet, 
  Globe, 
  Zap, 
  Users, 
  Lock, 
  CheckCircle, 
  Award, 
  TrendingUp,
  FileText,
  Vote,
  ArrowRight
} from 'lucide-react'

export default function WorldMiniApp() {
  const [walletAddress, setWalletAddress] = useState<string>('')
  const [isWalletConnected, setIsWalletConnected] = useState(false)
  const [userProfile, setUserProfile] = useState<any>(null)
  const { setWalletConnection } = useUnifiedContracts()

  const handleWalletAuthSuccess = async (address: string) => {
    setWalletAddress(address)
    setIsWalletConnected(true)
    
    // Initialize the unified contracts hook with wallet address
    await setWalletConnection(address)
  }

  const handleWalletAuthError = (error: any) => {
    console.error('Wallet authentication failed:', error)
    setWalletAddress('')
    setIsWalletConnected(false)
  }

  const handleVerificationSuccess = (profile: any) => {
    setUserProfile(profile)
  }

  const handleVerificationError = (error: any) => {
    console.error('World ID verification failed:', error)
    setUserProfile(null)
  }

  const isFullySetup = isWalletConnected && userProfile?.isVerified

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-4xl px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Globe className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              NOCAP: Human-Verified Fact Checking
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join the community-driven fact-checking protocol. Only verified humans can participate, ensuring trust and authenticity.
          </p>
        </div>

        {/* Features Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 text-center">
            <Shield className="h-8 w-8 text-green-500 mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Human Verification</h3>
            <p className="text-sm text-muted-foreground">
              World ID ensures only unique humans can participate, preventing bots and manipulation
            </p>
          </Card>
          
          <Card className="p-6 text-center">
            <Award className="h-8 w-8 text-blue-500 mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Reputation System</h3>
            <p className="text-sm text-muted-foreground">
              Build your reputation through accurate fact-checking and earn rewards
            </p>
          </Card>
          
          <Card className="p-6 text-center">
            <TrendingUp className="h-8 w-8 text-purple-500 mx-auto mb-3" />
            <h3 className="font-semibold mb-2">ETH Staking</h3>
            <p className="text-sm text-muted-foreground">
              Optional staking to show confidence in your submissions and votes
            </p>
          </Card>
        </div>

        {/* Setup Flow */}
        <div className="space-y-8">
          {/* Step 1: Connect World App Wallet */}
          <Card className="p-6 space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg">
                1
              </div>
              <h2 className="text-xl font-semibold flex-1">Connect World App Wallet</h2>
              {isWalletConnected && <CheckCircle className="h-5 w-5 text-green-500" />}
            </div>
            
            <div className="pl-14">
              <NativeWorldWallet
                onAuthSuccess={handleWalletAuthSuccess}
                onAuthError={handleWalletAuthError}
              />
            </div>
          </Card>

          {/* Step 2: World ID Verification */}
          <Card className="p-6 space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg">
                2
              </div>
              <h2 className="text-xl font-semibold">Verify Your Humanity</h2>
              {userProfile?.isVerified && <CheckCircle className="h-5 w-5 text-green-500" />}
            </div>
            
            <div className="pl-14">
              {isWalletConnected ? (
                <IDKitVerification
                  onVerificationSuccess={handleVerificationSuccess}
                  onVerificationError={handleVerificationError}
                  showUserProfile={true}
                />
              ) : (
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    Please connect your World App wallet first to proceed with verification.
                  </p>
                </div>
              )}
            </div>
          </Card>

          {/* Success State & Actions */}
          {isFullySetup && (
            <Card className="p-6 space-y-6 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
              <div className="text-center space-y-4">
                <CheckCircle className="h-12 w-12 text-green-500 mx-auto" />
                <div>
                  <h3 className="text-xl font-semibold text-green-800 dark:text-green-200">
                    🎉 You're All Set!
                  </h3>
                  <p className="text-green-700 dark:text-green-300 mt-2">
                    Your World App wallet is connected and your humanity is verified. You can now participate in the NOCAP protocol.
                  </p>
                </div>
                
                <div className="flex flex-wrap gap-2 justify-center">
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100">
                    <Wallet className="mr-1 h-3 w-3" />
                    Wallet: {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
                  </Badge>
                  <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100">
                    <Shield className="mr-1 h-3 w-3" />
                    World ID Verified
                  </Badge>
                  <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-800 dark:text-purple-100">
                    <Award className="mr-1 h-3 w-3" />
                    Reputation: {userProfile?.reputation || 100}
                  </Badge>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link href="/submit">
                  <Button className="w-full" size="lg">
                    <FileText className="mr-2 h-4 w-4" />
                    Submit a Fact
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                
                <Link href="/feed">
                  <Button variant="outline" className="w-full" size="lg">
                    <Vote className="mr-2 h-4 w-4" />
                    Vote on Facts
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>

              {/* Quick Stats */}
              {userProfile && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-green-200 dark:border-green-800">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">{userProfile.factsSubmitted || 0}</p>
                    <p className="text-xs text-green-700 dark:text-green-300">Facts Submitted</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">{userProfile.votesCorrect || 0}</p>
                    <p className="text-xs text-blue-700 dark:text-blue-300">Correct Votes</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-purple-600">{userProfile.reputation || 100}</p>
                    <p className="text-xs text-purple-700 dark:text-purple-300">Reputation</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-orange-600">
                      {((userProfile.rewardsEarned || 0) / 1e18).toFixed(3)}
                    </p>
                    <p className="text-xs text-orange-700 dark:text-orange-300">ETH Earned</p>
                  </div>
                </div>
              )}
            </Card>
          )}

          {/* Protocol Information */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Lock className="h-5 w-5" />
              How NOCAP Works
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-blue-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Human-Only Protocol</h4>
                    <p className="text-sm text-muted-foreground">
                      World ID verification ensures only unique humans can participate, preventing bots and sybil attacks.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Users className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Community Verification</h4>
                    <p className="text-sm text-muted-foreground">
                      Facts are verified through community voting, with reputation and staking mechanisms ensuring quality.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Award className="h-5 w-5 text-purple-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Reputation & Rewards</h4>
                    <p className="text-sm text-muted-foreground">
                      Build reputation through accurate fact-checking and earn ETH rewards for correct votes.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Zap className="h-5 w-5 text-orange-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Optional Staking</h4>
                    <p className="text-sm text-muted-foreground">
                      Stake ETH to show confidence in your submissions and votes, earning higher rewards for accuracy.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
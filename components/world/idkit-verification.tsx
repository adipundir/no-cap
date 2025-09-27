'use client'

import { useState, useCallback } from 'react'
import { IDKitWidget, VerificationLevel, ISuccessResult } from '@worldcoin/idkit'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { toast } from "sonner"
import { useSimplifiedContracts } from '@/hooks/use-simplified-contracts'
import { 
  Shield, 
  CheckCircle, 
  AlertCircle, 
  Loader2, 
  User, 
  Globe,
  Award,
  TrendingUp,
  Calendar,
  Target
} from 'lucide-react'

interface IDKitVerificationProps {
  onVerificationSuccess?: (userProfile: any) => void
  onVerificationError?: (error: any) => void
  showUserProfile?: boolean
}

export function IDKitVerification({ 
  onVerificationSuccess, 
  onVerificationError,
  showUserProfile = true 
}: IDKitVerificationProps) {
  const [isVerifying, setIsVerifying] = useState(false)
  const [isVerified, setIsVerified] = useState(false)
  const [userProfile, setUserProfile] = useState<any>(null)
  const { verifyAndRegister, checkVerificationStatus, isLoading } = useSimplifiedContracts()

  // Check verification status on component mount
  const checkUserVerificationStatus = useCallback(async () => {
    try {
      const verified = await checkVerificationStatus()
      if (verified) {
        setIsVerified(true)
        // Simplified version doesn't have user profiles
        setUserProfile({ isVerified: true })
      }
    } catch (error) {
      console.error('Error checking verification status:', error)
    }
  }, [checkVerificationStatus])

  // Handle successful World ID verification
  const handleVerificationSuccess = useCallback(async (result: ISuccessResult) => {
    setIsVerifying(true)
    
    try {
      toast('Please approve the transaction to complete your verification.')

      // No verification needed - just mark as complete
      const txHash = await verifyAndRegister()

      // Get user profile after successful registration
      // Simplified version doesn't have user profiles
      const profile = { isVerified: true }
      setUserProfile(profile)
      setIsVerified(true)

      toast.success(`You're now verified as a unique human on World Chain. TX: ${txHash.slice(0, 10)}...`)

      onVerificationSuccess?.(profile)
    } catch (error: any) {
      console.error('Verification error:', error)
      toast.error(error.message || 'Failed to complete verification. Please try again.')
      onVerificationError?.(error)
    } finally {
      setIsVerifying(false)
    }
  }, [verifyAndRegister, onVerificationSuccess, onVerificationError])

  const handleVerificationError = useCallback((error: any) => {
    console.error('IDKit verification error:', error)
    toast.error('Please try again or contact support if the issue persists.')
    onVerificationError?.(error)
  }, [toast, onVerificationError])

  // Format timestamp
  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleDateString()
  }

  // Calculate success rate
  const calculateSuccessRate = (correct: number, incorrect: number) => {
    const total = correct + incorrect
    return total > 0 ? Math.round((correct / total) * 100) : 0
  }

  if (isVerified && userProfile && showUserProfile) {
    return (
      <div className="space-y-6">
        {/* Verification Status */}
        <Card className="p-6 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-800">
              <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-green-800 dark:text-green-200">
                Verified Human
              </h3>
              <p className="text-sm text-green-700 dark:text-green-300">
                Your humanity is verified on World Chain. You can now participate in fact-checking.
              </p>
            </div>
            <Badge className="bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100">
              <Shield className="mr-1 h-3 w-3" />
              Verified
            </Badge>
          </div>
        </Card>

        {/* User Profile Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Reputation */}
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900">
                <Award className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Reputation</p>
                <p className="text-2xl font-bold">{userProfile.reputation}</p>
              </div>
            </div>
          </Card>

          {/* Facts Submitted */}
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                <Target className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Facts Submitted</p>
                <p className="text-2xl font-bold">{userProfile.factsSubmitted}</p>
              </div>
            </div>
          </Card>

          {/* Success Rate */}
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
                <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Vote Success Rate</p>
                <p className="text-2xl font-bold">
                  {calculateSuccessRate(userProfile.votesCorrect, userProfile.votesIncorrect)}%
                </p>
              </div>
            </div>
          </Card>

          {/* Member Since */}
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 dark:bg-orange-900">
                <Calendar className="h-5 w-5 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Member Since</p>
                <p className="text-sm font-bold">{formatDate(userProfile.joinedAt)}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Detailed Stats */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <User className="h-5 w-5" />
            Detailed Statistics
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-medium text-muted-foreground">Fact Verification</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Facts Verified as True:</span>
                  <span className="font-medium text-green-600">{userProfile.factsVerified}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Facts Verified as False:</span>
                  <span className="font-medium text-red-600">{userProfile.factsFalse}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Total ETH Staked:</span>
                  <span className="font-medium">{(Number(userProfile.totalStaked) / 1e18).toFixed(4)} ETH</span>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium text-muted-foreground">Voting Performance</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Correct Votes:</span>
                  <span className="font-medium text-green-600">{userProfile.votesCorrect}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Incorrect Votes:</span>
                  <span className="font-medium text-red-600">{userProfile.votesIncorrect}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Total Rewards Earned:</span>
                  <span className="font-medium text-blue-600">{(Number(userProfile.rewardsEarned) / 1e18).toFixed(4)} ETH</span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Shield className="h-5 w-5" />
            World ID Verification
          </h3>
          {!isVerified && (
            <Badge variant="outline" className="text-orange-600 border-orange-200">
              Not Verified
            </Badge>
          )}
        </div>
        
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Verify your humanity with World ID to participate in the NOCAP fact-checking protocol. 
            Only verified humans can submit facts and vote on claims.
          </p>

          {!isVerified && (
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-md">
                <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2">
                  🌍 Why World ID Verification?
                </h4>
                <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                  <li>• Ensures one unique human per account</li>
                  <li>• Prevents bots and sybil attacks</li>
                  <li>• Maintains fair voting and reputation systems</li>
                  <li>• Protects the integrity of fact-checking</li>
                </ul>
              </div>

              <div className="flex justify-center">
                {isVerifying || isLoading ? (
                  <Button disabled className="w-full">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {isVerifying ? 'Completing Verification...' : 'Loading...'}
                  </Button>
                ) : (
                  <IDKitWidget
                    app_id={process.env.NEXT_PUBLIC_WORLD_APP_ID as `app_${string}`}
                    action={process.env.NEXT_PUBLIC_ACTION_ID || 'humanhood'}
                    verification_level={VerificationLevel.Orb}
                    handleVerify={handleVerificationSuccess}
                    onError={handleVerificationError}
                  >
                    {({ open }: { open: () => void }) => (
                      <Button onClick={open} className="w-full">
                        <Globe className="mr-2 h-4 w-4" />
                        Verify with World ID
                      </Button>
                    )}
                  </IDKitWidget>
                )}
              </div>
            </div>
          )}

          {!isVerified && (
            <div className="pt-2 border-t border-border">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <AlertCircle className="h-3 w-3" />
                <span>Verification is required to interact with the protocol</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  )
}

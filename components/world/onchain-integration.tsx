'use client'

import { useState, useCallback, useEffect } from 'react'
import { MiniKit } from '@worldcoin/minikit-js'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { CheckCircle, AlertCircle, Loader2, FileText, Vote, Coins, Shield } from 'lucide-react'

interface OnChainIntegrationProps {
  walletAddress: string
  worldIdProof?: any
  selectedChain: 'ethereum-sepolia' | 'solana-devnet'
}

interface Claim {
  id: number
  submitter: string
  contentHash: string
  sources: string[]
  timestamp: number
  totalVotes: number
  truthfulVotes: number
  falseVotes: number
  isResolved: boolean
  isTruthful: boolean
  rewardPool: string
}

export function OnChainIntegration({ walletAddress, worldIdProof, selectedChain }: OnChainIntegrationProps) {
  const [isVerifyingOnChain, setIsVerifyingOnChain] = useState(false)
  const [isUserVerified, setIsUserVerified] = useState(false)
  const [userReputation, setUserReputation] = useState(0)
  const [claims, setClaims] = useState<Claim[]>([])
  const [isSubmittingClaim, setIsSubmittingClaim] = useState(false)
  const [newClaimContent, setNewClaimContent] = useState('')
  const [newClaimSources, setNewClaimSources] = useState('')
  const [selectedClaimId, setSelectedClaimId] = useState<number | null>(null)
  const [voteStake, setVoteStake] = useState('1')
  const [isVoting, setIsVoting] = useState(false)

  // Contract addresses (these would be deployed contracts)
  const CONTRACT_ADDRESSES = {
    'ethereum-sepolia': '0x...', // Deploy NOCAPFactChecker to Sepolia
    'solana-devnet': '...' // Solana program ID
  }

  const PYUSD_ADDRESSES = {
    'ethereum-sepolia': '0x...', // Mock PYUSD on Sepolia
    'solana-devnet': 'CXk2AMBfi3TwaEL2468s6zP8xq9NxTXjp9gjMgzeUynM'
  }

  // Check if user is already verified on-chain
  useEffect(() => {
    if (walletAddress) {
      checkUserVerificationStatus()
      loadClaims()
    }
  }, [walletAddress, selectedChain])

  const checkUserVerificationStatus = async () => {
    try {
      // This would call the smart contract to check if user is verified
      // For now, we'll simulate this
      console.log('Checking verification status for:', walletAddress)
      // const isVerified = await contract.verifiedUsers(walletAddress)
      // const reputation = await contract.userReputation(walletAddress)
      // setIsUserVerified(isVerified)
      // setUserReputation(reputation)
    } catch (error) {
      console.error('Error checking verification status:', error)
    }
  }

  const loadClaims = async () => {
    try {
      // This would load claims from the smart contract
      console.log('Loading claims from contract...')
      // const totalClaims = await contract.getTotalClaims()
      // const claimsData = []
      // for (let i = 0; i < totalClaims; i++) {
      //   const claim = await contract.getClaim(i)
      //   claimsData.push(claim)
      // }
      // setClaims(claimsData)
    } catch (error) {
      console.error('Error loading claims:', error)
    }
  }

  const verifyUserOnChain = useCallback(async () => {
    if (!worldIdProof || !walletAddress) return

    setIsVerifyingOnChain(true)
    try {
      // Prepare the World ID proof for on-chain verification
      const { nullifier_hash, merkle_root, proof } = worldIdProof

      console.log('Submitting World ID verification to smart contract:', {
        signal: walletAddress,
        root: merkle_root,
        nullifierHash: nullifier_hash,
        proof: proof
      })

      // This would call the smart contract's verifyUser function
      // const tx = await contract.verifyUser(
      //   walletAddress, // signal
      //   merkle_root,   // root
      //   nullifier_hash, // nullifierHash
      //   proof          // proof array
      // )
      // await tx.wait()

      // Simulate successful verification
      setIsUserVerified(true)
      setUserReputation(100)
      
      console.log('✅ User verified on-chain successfully!')
    } catch (error) {
      console.error('❌ On-chain verification failed:', error)
    } finally {
      setIsVerifyingOnChain(false)
    }
  }, [worldIdProof, walletAddress])

  const submitClaim = useCallback(async () => {
    if (!newClaimContent.trim()) return

    setIsSubmittingClaim(true)
    try {
      const sources = newClaimSources.split('\n').filter(s => s.trim())
      
      // Upload content to IPFS (simplified)
      const contentHash = `Qm${Math.random().toString(36).substring(2, 15)}` // Mock IPFS hash
      
      console.log('Submitting claim to smart contract:', {
        contentHash,
        sources,
        initialReward: '0' // Could add PYUSD reward
      })

      // This would call the smart contract's submitClaim function
      // const tx = await contract.submitClaim(contentHash, sources, 0)
      // await tx.wait()

      // Simulate successful submission
      const newClaim: Claim = {
        id: claims.length,
        submitter: walletAddress,
        contentHash,
        sources,
        timestamp: Date.now(),
        totalVotes: 0,
        truthfulVotes: 0,
        falseVotes: 0,
        isResolved: false,
        isTruthful: false,
        rewardPool: '0'
      }
      setClaims([...claims, newClaim])
      setNewClaimContent('')
      setNewClaimSources('')
      
      console.log('✅ Claim submitted successfully!')
    } catch (error) {
      console.error('❌ Claim submission failed:', error)
    } finally {
      setIsSubmittingClaim(false)
    }
  }, [newClaimContent, newClaimSources, claims, walletAddress])

  const voteOnClaim = useCallback(async (claimId: number, isTruthful: boolean) => {
    setIsVoting(true)
    try {
      const stakeAmount = parseFloat(voteStake) * 1e6 // Convert to PYUSD wei (6 decimals)
      
      console.log('Voting on claim:', {
        claimId,
        isTruthful,
        stakeAmount
      })

      // This would call the smart contract's voteOnClaim function
      // First approve PYUSD spending
      // const approveTx = await pyusdContract.approve(contractAddress, stakeAmount)
      // await approveTx.wait()
      
      // Then vote
      // const voteTx = await contract.voteOnClaim(claimId, isTruthful, stakeAmount)
      // await voteTx.wait()

      // Simulate successful vote
      const updatedClaims = claims.map(claim => {
        if (claim.id === claimId) {
          return {
            ...claim,
            totalVotes: claim.totalVotes + 1,
            truthfulVotes: isTruthful ? claim.truthfulVotes + 1 : claim.truthfulVotes,
            falseVotes: !isTruthful ? claim.falseVotes + 1 : claim.falseVotes,
            rewardPool: (parseFloat(claim.rewardPool) + parseFloat(voteStake)).toString()
          }
        }
        return claim
      })
      setClaims(updatedClaims)
      
      console.log('✅ Vote cast successfully!')
    } catch (error) {
      console.error('❌ Voting failed:', error)
    } finally {
      setIsVoting(false)
    }
  }, [voteStake, claims])

  return (
    <div className="space-y-6">
      {/* On-Chain Verification Status */}
      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Shield className="h-5 w-5" />
              On-Chain Verification
            </h3>
            {isUserVerified && (
              <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                Verified On-Chain
              </Badge>
            )}
          </div>

          {!isUserVerified && worldIdProof && (
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Submit your World ID proof to the smart contract for on-chain verification.
              </p>
              <Button 
                onClick={verifyUserOnChain} 
                disabled={isVerifyingOnChain}
                className="w-full"
              >
                {isVerifyingOnChain ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Verifying On-Chain...
                  </>
                ) : (
                  <>
                    <Shield className="mr-2 h-4 w-4" />
                    Verify On-Chain
                  </>
                )}
              </Button>
            </div>
          )}

          {isUserVerified && (
            <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-md">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <div className="flex-1">
                <p className="text-sm font-medium text-green-800 dark:text-green-200">
                  Verified on {selectedChain === 'solana-devnet' ? 'Solana' : 'Ethereum'}
                </p>
                <p className="text-xs text-green-700 dark:text-green-300">
                  Reputation Score: {userReputation}
                </p>
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Submit New Claim */}
      {isUserVerified && (
        <Card className="p-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Submit Fact-Check Claim
            </h3>
            
            <div className="space-y-3">
              <div>
                <Label htmlFor="claim-content">Claim Content</Label>
                <Input
                  id="claim-content"
                  placeholder="Enter the claim to be fact-checked..."
                  value={newClaimContent}
                  onChange={(e) => setNewClaimContent(e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor="claim-sources">Sources (one per line)</Label>
                <textarea
                  id="claim-sources"
                  className="w-full p-2 border rounded-md resize-none"
                  rows={3}
                  placeholder="https://example.com/source1&#10;https://example.com/source2"
                  value={newClaimSources}
                  onChange={(e) => setNewClaimSources(e.target.value)}
                />
              </div>
              
              <Button 
                onClick={submitClaim} 
                disabled={isSubmittingClaim || !newClaimContent.trim()}
                className="w-full"
              >
                {isSubmittingClaim ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <FileText className="mr-2 h-4 w-4" />
                    Submit Claim
                  </>
                )}
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Claims List */}
      <Card className="p-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Vote className="h-5 w-5" />
            Active Claims ({claims.length})
          </h3>
          
          {claims.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">
              No claims submitted yet. Be the first to submit a fact-check claim!
            </p>
          ) : (
            <div className="space-y-4">
              {claims.map((claim) => (
                <div key={claim.id} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="font-medium">Claim #{claim.id}</p>
                      <p className="text-sm text-muted-foreground">
                        Content Hash: {claim.contentHash}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Submitted by: {claim.submitter.slice(0, 6)}...{claim.submitter.slice(-4)}
                      </p>
                    </div>
                    <div className="text-right">
                      <Badge className={claim.isResolved ? 'bg-gray-100' : 'bg-blue-100'}>
                        {claim.isResolved ? 'Resolved' : 'Active'}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="font-medium">Total Votes</p>
                      <p>{claim.totalVotes}</p>
                    </div>
                    <div>
                      <p className="font-medium">Truthful</p>
                      <p className="text-green-600">{claim.truthfulVotes}</p>
                    </div>
                    <div>
                      <p className="font-medium">False</p>
                      <p className="text-red-600">{claim.falseVotes}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Coins className="h-4 w-4" />
                    <span className="text-sm">Reward Pool: {claim.rewardPool} PYUSD</span>
                  </div>
                  
                  {!claim.isResolved && isUserVerified && (
                    <div className="flex gap-2 pt-2">
                      <Input
                        type="number"
                        placeholder="Stake (PYUSD)"
                        value={voteStake}
                        onChange={(e) => setVoteStake(e.target.value)}
                        className="w-32"
                        min="1"
                        step="0.1"
                      />
                      <Button
                        size="sm"
                        onClick={() => voteOnClaim(claim.id, true)}
                        disabled={isVoting}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        Vote True
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => voteOnClaim(claim.id, false)}
                        disabled={isVoting}
                      >
                        Vote False
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}

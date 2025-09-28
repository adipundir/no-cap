'use client'

import { useState, useCallback, useEffect } from 'react'
import { NOCAPContractService } from '@/lib/nocap-contracts'
import { verifyProofAndCreateFact, verifyProofForVoting } from '@/lib/actions/verify-proof'
import { MiniKit, VerifyCommandInput, VerificationLevel, ISuccessResult } from '@worldcoin/minikit-js'
import { toast } from 'sonner'

export function useSimplifiedContracts() {
  const [isLoading, setIsLoading] = useState(false)
  const [walletAddress, setWalletAddress] = useState<string>('')
  const [isVerified, setIsVerified] = useState(true) // No verification required
  const [withdrawableBalance, setWithdrawableBalance] = useState('0')

  // Set wallet connection
  const setWalletConnection = useCallback((address: string) => {
    setWalletAddress(address)
  }, [])

  /**
   * No verification needed - always return success
   */
  const verifyAndRegister = useCallback(async () => {
    setIsVerified(true)
    toast.success('Ready to create facts! No verification required.')
    return 'no_verification_needed'
  }, [])

  /**
   * Create a fact with proof of humanhood and optional stake
   */
  const createFact = useCallback(async (
    title: string,
    description: string,
    sources: Array<{url: string, title: string, accessedAt: string}> = [],
    tags: string[] = [],
    stakeAmount?: string
  ) => {
    if (!MiniKit.isInstalled()) {
      throw new Error('World App is required for proof verification')
    }

    setIsLoading(true)
    try {
      // 1. Request proof of humanhood
      toast('Please verify your humanity with World ID...')

      const verifyPayload: VerifyCommandInput = {
        action: process.env.NEXT_PUBLIC_ACTION_ID || 'humanhood',
        signal: walletAddress || '0x0000000000000000000000000000000000000000',
        verification_level: VerificationLevel.Orb
      }

      const { finalPayload } = await MiniKit.commandsAsync.verify(verifyPayload)

      if (finalPayload.status === 'error') {
        throw new Error(finalPayload.error_code || 'World ID verification failed')
      }

      // 2. Verify proof and prepare fact for Walrus
      toast('Verifying proof and preparing fact...')

      const result = await verifyProofAndCreateFact(
        {
          payload: finalPayload as ISuccessResult,
          action: process.env.NEXT_PUBLIC_ACTION_ID || 'humanhood',
          signal: walletAddress
        },
        {
          title,
          description,
          sources,
          tags,
          stakeAmount
        }
      )

      if (!result.success || !result.walrusBlobId) {
        throw new Error(result.error || 'Failed to verify proof or store fact')
      }

      // 3. Submit fact to contract
      toast('Creating fact on World Chain...')

      const result2 = await NOCAPContractService.createFact(
        result.walrusBlobId,
        stakeAmount
      )

      if (!result2.success) {
        throw new Error(result2.error || 'Failed to create fact on contract')
      }

      toast.success(`Fact created successfully! TX: ${result2.transactionId?.slice(0, 10)}...`)

      return result2.transactionId || 'success'
    } catch (error: any) {
      console.error('Create fact error:', error)
      if (error.message?.includes('cancelled') || error.message?.includes('denied')) {
        toast.error('Verification cancelled. Please try again.')
      } else {
        toast.error(error.message || 'Failed to create fact. Please try again.')
      }
      throw error
    } finally {
      setIsLoading(false)
    }
  }, [walletAddress])

  /**
   * Vote on a fact with proof of humanhood and optional stake
   */
  const voteOnFact = useCallback(async (
    factId: string,
    vote: boolean, // true = NO CAP (true), false = CAP (false)
    stakeAmount?: string
  ) => {
    if (!MiniKit.isInstalled()) {
      throw new Error('World App is required for proof verification')
    }

    setIsLoading(true)
    try {
      // 1. Request proof of humanhood for voting
      toast('Please verify your humanity to vote...')

      const verifyPayload: VerifyCommandInput = {
        action: 'voting-action', // Different action for voting
        signal: `${factId}-${vote}`, // Include fact ID and vote in signal
        verification_level: VerificationLevel.Orb
      }

      const { finalPayload } = await MiniKit.commandsAsync.verify(verifyPayload)

      if (finalPayload.status === 'error') {
        throw new Error(finalPayload.error_code || 'World ID verification failed')
      }

      // 2. Verify proof for voting
      toast('Verifying proof...')

      const verificationResult = await verifyProofForVoting(
        {
          payload: finalPayload as ISuccessResult,
          action: 'voting-action',
          signal: `${factId}-${vote}`
        },
        factId,
        vote
      )

      if (!verificationResult.success || !verificationResult.canVote) {
        throw new Error(verificationResult.error || 'Proof verification failed')
      }

      // 3. Submit vote to contract
      const voteText = vote ? 'NO CAP' : 'CAP'
      const stakeText = stakeAmount ? ` with ${stakeAmount} ETH stake` : ''
      
      toast(`Casting ${voteText} vote${stakeText}...`)

      const voteResult = await NOCAPContractService.voteOnFact(
        parseInt(factId),
        vote,
        stakeAmount
      )

      if (!voteResult.success) {
        throw new Error(voteResult.error || 'Failed to cast vote on contract')
      }

      toast.success(`Vote cast successfully! TX: ${voteResult.transactionId?.slice(0, 10)}...`)

      return voteResult.transactionId || 'success'
    } catch (error: any) {
      console.error('Vote error:', error)
      if (error.message?.includes('cancelled') || error.message?.includes('denied')) {
        toast.error('Verification cancelled. Please try again.')
      } else {
        toast.error(error.message || 'Failed to cast vote. Please try again.')
      }
      throw error
    } finally {
      setIsLoading(false)
    }
  }, [])

  /**
   * Resolve a fact manually (if voting period ended)
   */
  const resolveFact = useCallback(async (factId: string) => {
    setIsLoading(true)
    try {
      toast('Resolving fact...')

      const resolveResult = await NOCAPContractService.resolveFact(parseInt(factId))

      if (!resolveResult.success) {
        throw new Error(resolveResult.error || 'Failed to resolve fact on contract')
      }

      toast.success(`Fact resolved! TX: ${resolveResult.transactionId?.slice(0, 10)}...`)

      return resolveResult.transactionId || 'success'
    } catch (error: any) {
      console.error('Resolve fact error:', error)
      toast.error(error.message || 'Failed to resolve fact. Please try again.')
      throw error
    } finally {
      setIsLoading(false)
    }
  }, [])

  /**
   * Withdraw accumulated rewards
   */
  const withdrawRewards = useCallback(async () => {
    setIsLoading(true)
    try {
      toast('Withdrawing rewards...')

      const withdrawResult = await NOCAPContractService.withdrawRewards()

      if (!withdrawResult.success) {
        throw new Error(withdrawResult.error || 'Failed to withdraw rewards')
      }

      // Update withdrawable balance
      await fetchWithdrawableBalance()

      toast.success(`Rewards withdrawn! TX: ${withdrawResult.transactionId?.slice(0, 10)}...`)

      return withdrawResult.transactionId || 'success'
    } catch (error: any) {
      console.error('Withdraw rewards error:', error)
      toast.error(error.message || 'Failed to withdraw rewards. Please try again.')
      throw error
    } finally {
      setIsLoading(false)
    }
  }, [])

  /**
   * Check if user is verified
   */
  const checkVerificationStatus = useCallback(async (): Promise<boolean> => {
    // No verification needed - always true
    setIsVerified(true)
    return true
  }, [])

  /**
   * Fetch user's withdrawable balance
   */
  const fetchWithdrawableBalance = useCallback(async () => {
    if (!walletAddress) return

    try {
      const balance = await NOCAPContractService.getWithdrawableBalance(walletAddress)
      setWithdrawableBalance(balance)
    } catch (error) {
      console.error('Error fetching withdrawable balance:', error)
    }
  }, [walletAddress])

  /**
   * Get contract statistics
   */
  const getContractStats = useCallback(async () => {
    try {
      return await NOCAPContractService.getStats()
    } catch (error) {
      console.error('Error fetching contract stats:', error)
      return {
        totalFacts: 0,
        totalResolved: 0,
        totalStaked: "0"
      }
    }
  }, [])

  // Auto-fetch data when wallet connects
  useEffect(() => {
    if (walletAddress) {
      checkVerificationStatus()
      fetchWithdrawableBalance()
    }
  }, [walletAddress, checkVerificationStatus, fetchWithdrawableBalance])

  return {
    // State
    isLoading,
    walletAddress,
    isVerified,
    withdrawableBalance,

    // Actions
    setWalletConnection,
    verifyAndRegister,
    createFact,
    voteOnFact,
    resolveFact,
    withdrawRewards,

    // Queries
    checkVerificationStatus,
    fetchWithdrawableBalance,
    getContractStats
  }
}

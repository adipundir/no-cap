'use client'

import { useState, useCallback, useEffect } from 'react'
import { UnifiedContractService } from '@/lib/unified-contracts'
import { useToast } from '@/hooks/use-toast'

export function useUnifiedContracts() {
  const [isLoading, setIsLoading] = useState(false)
  const [walletAddress, setWalletAddress] = useState<string>('')
  const [isVerified, setIsVerified] = useState(false)
  const [userProfile, setUserProfile] = useState<any>(null)
  const [ethBalance, setEthBalance] = useState('0.0000')
  const { toast } = useToast()

  // Get wallet address from MiniKit (if available)
  useEffect(() => {
    // This would be set when wallet is connected
    // For now, we'll manage this through the wallet connection flow
  }, [])

  /**
   * Verify user with World ID and register on-chain
   */
  const verifyAndRegister = useCallback(async (
    merkleRoot: string,
    nullifierHash: string,
    proof: string[]
  ) => {
    if (!walletAddress) {
      throw new Error('Wallet not connected')
    }

    setIsLoading(true)
    try {
      const txHash = await UnifiedContractService.verifyAndRegister(
        walletAddress,
        merkleRoot,
        nullifierHash,
        proof
      )

      // Update local state
      setIsVerified(true)
      
      // Fetch updated profile
      await fetchUserProfile()

      return txHash
    } catch (error) {
      console.error('Verification error:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }, [walletAddress])

  /**
   * Submit a fact (free)
   */
  const submitFact = useCallback(async (
    title: string,
    description: string,
    votingPeriodHours: number = 48
  ) => {
    setIsLoading(true)
    try {
      toast({
        // variant: default (info),
        title: 'Submitting Fact',
        description: 'Please approve the transaction in World App.',
      })

      const txHash = await UnifiedContractService.submitFact(
        title,
        description,
        votingPeriodHours
      )

      // Update user profile to reflect new fact submission
      await fetchUserProfile()

      toast({
        // variant: default (success),
        title: 'Fact Submitted!',
        description: `Your fact has been submitted for community verification. TX: ${txHash.slice(0, 10)}...`,
      })

      return txHash
    } catch (error: any) {
      console.error('Submit fact error:', error)
      toast({
        variant: 'destructive',
        title: 'Submission Failed',
        description: error.message || 'Failed to submit fact. Please try again.',
      })
      throw error
    } finally {
      setIsLoading(false)
    }
  }, [toast])

  /**
   * Submit a fact with ETH stake
   */
  const submitFactWithStake = useCallback(async (
    title: string,
    description: string,
    stakeAmount: string,
    votingPeriodHours: number = 48
  ) => {
    setIsLoading(true)
    try {
      toast({
        // variant: default (info),
        title: 'Submitting Fact with Stake',
        description: `Staking ${stakeAmount} ETH. Please approve the transaction in World App.`,
      })

      const txHash = await UnifiedContractService.submitFactWithStake(
        title,
        description,
        stakeAmount,
        votingPeriodHours
      )

      // Update user profile and ETH balance
      await Promise.all([fetchUserProfile(), fetchETHBalance()])

      toast({
        // variant: default (success),
        title: 'Fact Submitted with Stake!',
        description: `Your fact has been submitted with ${stakeAmount} ETH stake. TX: ${txHash.slice(0, 10)}...`,
      })

      return txHash
    } catch (error: any) {
      console.error('Submit fact with stake error:', error)
      toast({
        variant: 'destructive',
        title: 'Submission Failed',
        description: error.message || 'Failed to submit fact with stake. Please try again.',
      })
      throw error
    } finally {
      setIsLoading(false)
    }
  }, [toast])

  /**
   * Vote on a fact with optional stake
   */
  const voteFact = useCallback(async (
    factId: string,
    vote: boolean,
    stakeAmount?: string
  ) => {
    setIsLoading(true)
    try {
      const stakeText = stakeAmount ? ` with ${stakeAmount} ETH stake` : ''
      toast({
        // variant: default (info),
        title: 'Casting Vote',
        description: `Voting ${vote ? 'TRUE' : 'FALSE'}${stakeText}. Please approve the transaction.`,
      })

      const txHash = await UnifiedContractService.voteFact(factId, vote, stakeAmount)

      // Update user profile and ETH balance
      await Promise.all([fetchUserProfile(), fetchETHBalance()])

      toast({
        // variant: default (success),
        title: 'Vote Cast!',
        description: `Your vote has been recorded${stakeText}. TX: ${txHash.slice(0, 10)}...`,
      })

      return txHash
    } catch (error: any) {
      console.error('Vote error:', error)
      toast({
        variant: 'destructive',
        title: 'Vote Failed',
        description: error.message || 'Failed to cast vote. Please try again.',
      })
      throw error
    } finally {
      setIsLoading(false)
    }
  }, [toast])

  /**
   * Resolve a fact
   */
  const resolveFact = useCallback(async (factId: string) => {
    setIsLoading(true)
    try {
      toast({
        // variant: default (info),
        title: 'Resolving Fact',
        description: 'Please approve the transaction to resolve this fact.',
      })

      const txHash = await UnifiedContractService.resolveFact(factId)

      toast({
        // variant: default (success),
        title: 'Fact Resolved!',
        description: `The fact has been resolved and rewards distributed. TX: ${txHash.slice(0, 10)}...`,
      })

      return txHash
    } catch (error: any) {
      console.error('Resolve fact error:', error)
      toast({
        variant: 'destructive',
        title: 'Resolution Failed',
        description: error.message || 'Failed to resolve fact. Please try again.',
      })
      throw error
    } finally {
      setIsLoading(false)
    }
  }, [toast])

  /**
   * Fetch user profile from contract
   */
  const fetchUserProfile = useCallback(async () => {
    if (!walletAddress) return null

    try {
      const profile = await UnifiedContractService.getUserProfile(walletAddress)
      setUserProfile(profile)
      return profile
    } catch (error) {
      console.error('Error fetching user profile:', error)
      return null
    }
  }, [walletAddress])

  /**
   * Check if user is verified
   */
  const checkVerificationStatus = useCallback(async () => {
    if (!walletAddress) return false

    try {
      const verified = await UnifiedContractService.isUserVerified(walletAddress)
      setIsVerified(verified)
      return verified
    } catch (error) {
      console.error('Error checking verification status:', error)
      return false
    }
  }, [walletAddress])

  /**
   * Fetch ETH balance
   */
  const fetchETHBalance = useCallback(async () => {
    if (!walletAddress) return '0.0000'

    try {
      const balance = await UnifiedContractService.getETHBalance(walletAddress)
      setEthBalance(balance)
      return balance
    } catch (error) {
      console.error('Error fetching ETH balance:', error)
      return '0.0000'
    }
  }, [walletAddress])

  /**
   * Get fact details
   */
  const getFact = useCallback(async (factId: string) => {
    try {
      return await UnifiedContractService.getFact(factId)
    } catch (error) {
      console.error('Error fetching fact:', error)
      throw error
    }
  }, [])

  /**
   * Get total facts count
   */
  const getTotalFacts = useCallback(async () => {
    try {
      return await UnifiedContractService.getTotalFacts()
    } catch (error) {
      console.error('Error fetching total facts:', error)
      return 0
    }
  }, [])

  /**
   * Load all facts from contract
   */
  const loadAllFacts = useCallback(async () => {
    try {
      return await UnifiedContractService.loadAllFacts()
    } catch (error) {
      console.error('Error loading all facts:', error)
      return []
    }
  }, [])

  /**
   * Load active facts only
   */
  const loadActiveFacts = useCallback(async () => {
    try {
      return await UnifiedContractService.loadActiveFacts()
    } catch (error) {
      console.error('Error loading active facts:', error)
      return []
    }
  }, [])

  /**
   * Load resolved facts only
   */
  const loadResolvedFacts = useCallback(async () => {
    try {
      return await UnifiedContractService.loadResolvedFacts()
    } catch (error) {
      console.error('Error loading resolved facts:', error)
      return []
    }
  }, [])

  /**
   * Load facts by user
   */
  const loadUserFacts = useCallback(async (userAddress?: string) => {
    try {
      const address = userAddress || walletAddress
      if (!address) return []
      return await UnifiedContractService.loadUserFacts(address)
    } catch (error) {
      console.error('Error loading user facts:', error)
      return []
    }
  }, [walletAddress])

  /**
   * Check if user has voted on a fact
   */
  const hasUserVoted = useCallback(async (factId: string, userAddress?: string) => {
    try {
      const address = userAddress || walletAddress
      if (!address) return false
      return await UnifiedContractService.hasUserVoted(factId, address)
    } catch (error) {
      console.error('Error checking vote status:', error)
      return false
    }
  }, [walletAddress])

  /**
   * Get votes for a fact
   */
  const getFactVotes = useCallback(async (factId: string) => {
    try {
      return await UnifiedContractService.getFactVotes(factId)
    } catch (error) {
      console.error('Error fetching fact votes:', error)
      return []
    }
  }, [])

  /**
   * Set wallet address (called from wallet connection)
   */
  const setWalletConnection = useCallback(async (address: string) => {
    setWalletAddress(address)
    
    // Fetch initial data
    await Promise.all([
      checkVerificationStatus(),
      fetchUserProfile(),
      fetchETHBalance()
    ])
  }, [checkVerificationStatus, fetchUserProfile, fetchETHBalance])

  /**
   * Convenience functions
   */
  const getUserProfile = useCallback(() => userProfile, [userProfile])
  const isUserVerified = useCallback(() => isVerified, [isVerified])
  const getETHBalance = useCallback(() => ethBalance, [ethBalance])

  return {
    // State
    isLoading,
    walletAddress,
    isVerified,
    userProfile,
    ethBalance,
    
    // Actions
    verifyAndRegister,
    submitFact,
    submitFactWithStake,
    voteFact,
    resolveFact,
    
    // Data fetching
    fetchUserProfile,
    checkVerificationStatus,
    fetchETHBalance,
    getFact,
    getTotalFacts,
    loadAllFacts,
    loadActiveFacts,
    loadResolvedFacts,
    loadUserFacts,
    hasUserVoted,
    getFactVotes,
    
    // Convenience getters
    getUserProfile,
    isUserVerified,
    getETHBalance,
    
    // Wallet management
    setWalletConnection,
  }
}

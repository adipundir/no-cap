'use client'

import { useState, useCallback } from 'react'
import { WorldChainContractService } from '@/lib/world-chain-contracts'
import { useToast } from '@/hooks/use-toast'

export function useWorldChainContracts() {
  const [isLoading, setIsLoading] = useState(false)
  const [isVerified, setIsVerified] = useState(false)
  const [ethBalance, setEthBalance] = useState('0.0000')
  const { toast } = useToast()

  /**
   * Verify World ID proof on-chain
   */
  const verifyWorldID = useCallback(async (
    walletAddress: string,
    root: string,
    nullifierHash: string,
    proof: string[]
  ) => {
    setIsLoading(true)
    try {
      toast({
        type: 'info',
        title: 'Verifying World ID',
        description: 'Submitting your World ID proof to the blockchain...',
      })

      const txHash = await WorldChainContractService.verifyWorldID(
        walletAddress,
        root,
        nullifierHash,
        proof
      )

      setIsVerified(true)
      toast({
        type: 'success',
        title: 'World ID Verified!',
        description: `Transaction confirmed: ${txHash.slice(0, 10)}...`,
      })

      return txHash
    } catch (error: any) {
      console.error('World ID verification failed:', error)
      toast({
        type: 'error',
        title: 'Verification Failed',
        description: error.message || 'Failed to verify World ID on-chain',
      })
      throw error
    } finally {
      setIsLoading(false)
    }
  }, [toast])

  /**
   * Submit a new fact claim (free)
   */
  const submitFact = useCallback(async (
    title: string,
    description: string
  ) => {
    setIsLoading(true)
    try {
      toast({
        type: 'info',
        title: 'Submitting Fact',
        description: 'Creating your fact claim on World Chain...',
      })

      const txHash = await WorldChainContractService.submitFact(title, description)

      toast({
        type: 'success',
        title: 'Fact Submitted!',
        description: `Your fact claim is now live. TX: ${txHash.slice(0, 10)}...`,
      })

      return txHash
    } catch (error: any) {
      console.error('Fact submission failed:', error)
      toast({
        type: 'error',
        title: 'Submission Failed',
        description: error.message || 'Failed to submit fact claim',
      })
      throw error
    } finally {
      setIsLoading(false)
    }
  }, [toast])

  /**
   * Submit a new fact claim with ETH stake
   */
  const submitFactWithStake = useCallback(async (
    title: string,
    description: string,
    stakeAmount: string
  ) => {
    setIsLoading(true)
    try {
      toast({
        type: 'info',
        title: 'Submitting Fact with Stake',
        description: `Staking ${stakeAmount} ETH and creating your fact claim...`,
      })

      const txHash = await WorldChainContractService.submitFactWithStake(
        title,
        description,
        stakeAmount
      )

      toast({
        type: 'success',
        title: 'Fact Submitted with Stake!',
        description: `Your fact claim is live with ${stakeAmount} ETH stake. TX: ${txHash.slice(0, 10)}...`,
      })

      return txHash
    } catch (error: any) {
      console.error('Fact submission with stake failed:', error)
      toast({
        type: 'error',
        title: 'Submission Failed',
        description: error.message || 'Failed to submit fact claim with stake',
      })
      throw error
    } finally {
      setIsLoading(false)
    }
  }, [toast])

  /**
   * Vote on a fact claim (with optional ETH stake)
   */
  const voteFact = useCallback(async (factId: string, vote: boolean, stakeAmount?: string) => {
    setIsLoading(true)
    try {
      const stakeText = stakeAmount ? ` with ${stakeAmount} ETH stake` : ''
      toast({
        type: 'info',
        title: 'Submitting Vote',
        description: `Voting ${vote ? 'TRUE' : 'FALSE'} on fact claim${stakeText}...`,
      })

      const txHash = await WorldChainContractService.voteFact(factId, vote, stakeAmount)

      toast({
        type: 'success',
        title: 'Vote Submitted!',
        description: `Your vote has been recorded${stakeText}. TX: ${txHash.slice(0, 10)}...`,
      })

      return txHash
    } catch (error: any) {
      console.error('Voting failed:', error)
      toast({
        type: 'error',
        title: 'Vote Failed',
        description: error.message || 'Failed to submit vote',
      })
      throw error
    } finally {
      setIsLoading(false)
    }
  }, [toast])

  /**
   * Check if user is verified
   */
  const checkVerificationStatus = useCallback(async (walletAddress: string) => {
    try {
      const verified = await WorldChainContractService.isUserVerified(walletAddress)
      setIsVerified(verified)
      return verified
    } catch (error) {
      console.error('Error checking verification:', error)
      return false
    }
  }, [])

  /**
   * Fetch ETH balance
   */
  const fetchETHBalance = useCallback(async (walletAddress: string) => {
    try {
      const balance = await WorldChainContractService.getETHBalance(walletAddress)
      setEthBalance(balance)
      return balance
    } catch (error) {
      console.error('Error fetching ETH balance:', error)
      return '0.0000'
    }
  }, [])

  /**
   * Get fact details
   */
  const getFact = useCallback(async (factId: string) => {
    try {
      return await WorldChainContractService.getFact(factId)
    } catch (error) {
      console.error('Error fetching fact:', error)
      return null
    }
  }, [])

  return {
    // State
    isLoading,
    isVerified,
    ethBalance,
    
    // Actions
    verifyWorldID,
    submitFact,
    submitFactWithStake,
    voteFact,
    checkVerificationStatus,
    fetchETHBalance,
    getFact,
  }
}

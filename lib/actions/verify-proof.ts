'use server'

import { ISuccessResult, verifyCloudProof, IVerifyResponse } from '@worldcoin/minikit-js'

export interface ProofVerificationRequest {
  payload: ISuccessResult
  action: string
  signal?: string
}

export interface ProofVerificationResult {
  success: boolean
  verified?: boolean
  error?: string
}

/**
 * Server action to verify World ID proof
 * This replaces the /api/verify endpoint
 */
export async function verifyWorldIDProof(
  request: ProofVerificationRequest
): Promise<ProofVerificationResult> {
  try {
    const { payload, action, signal } = request

    // Validate required fields
    if (!payload.merkle_root || !payload.nullifier_hash || !payload.proof) {
      return {
        success: false,
        error: 'Missing required proof fields'
      }
    }

    // Use the official verifyCloudProof function from MiniKit
    const app_id = process.env.NEXT_PUBLIC_APP_ID as `app_${string}`
    
    if (!app_id) {
      return {
        success: false,
        error: 'App ID not configured. Please set NEXT_PUBLIC_APP_ID in your environment.'
      }
    }

    // Check if API key is configured (verifyCloudProof will use WLD_API_KEY from environment)
    if (!process.env.WLD_API_KEY) {
      return {
        success: false,
        error: 'World ID API key not configured. Please set WLD_API_KEY in your environment.'
      }
    }
    
    const verifyRes = (await verifyCloudProof(payload, app_id, action, signal)) as IVerifyResponse

    if (verifyRes.success) {
      return {
        success: true,
        verified: true
      }
    } else {
      return {
        success: false,
        error: verifyRes.detail || 'Proof verification failed'
      }
    }

  } catch (error: any) {
    console.error('Proof verification error:', error)
    return {
      success: false,
      error: error.message || 'Failed to verify proof'
    }
  }
}

/**
 * Server action to verify proof and create fact
 * Combines proof verification with fact creation
 */
export async function verifyProofAndCreateFact(
  proofRequest: ProofVerificationRequest,
  factData: {
    title: string
    description: string
    sources?: Array<{url: string, title: string, accessedAt: string}>
    tags?: string[]
    stakeAmount?: string
  }
): Promise<{
  success: boolean
  walrusBlobId?: string
  contentHash?: string
  proofVerified?: boolean
  error?: string
}> {
  try {
    // 1. First verify the proof
    const proofResult = await verifyWorldIDProof(proofRequest)
    
    if (!proofResult.success || !proofResult.verified) {
      return {
        success: false,
        proofVerified: false,
        error: proofResult.error || 'Proof verification failed'
      }
    }

    // 2. If proof is valid, prepare fact for Walrus
    const { prepareFactForWalrus } = await import('@/lib/actions/submit-fact')
    
    const walrusResult = await prepareFactForWalrus(factData)

    if (!walrusResult.success) {
      return {
        success: false,
        proofVerified: true,
        error: walrusResult.error || 'Failed to store fact on Walrus'
      }
    }

    return {
      success: true,
      proofVerified: true,
      walrusBlobId: walrusResult.walrusBlobId,
      contentHash: walrusResult.contentHash
    }

  } catch (error: any) {
    console.error('Verify proof and create fact error:', error)
    return {
      success: false,
      error: error.message || 'Failed to verify proof and create fact'
    }
  }
}

/**
 * Server action to verify proof for voting
 */
export async function verifyProofForVoting(
  proofRequest: ProofVerificationRequest,
  factId: string,
  vote: boolean
): Promise<{
  success: boolean
  proofVerified?: boolean
  canVote?: boolean
  error?: string
}> {
  try {
    // 1. Verify the proof
    const proofResult = await verifyWorldIDProof(proofRequest)
    
    if (!proofResult.success || !proofResult.verified) {
      return {
        success: false,
        proofVerified: false,
        error: proofResult.error || 'Proof verification failed'
      }
    }

    // 2. Additional voting validation could go here
    // - Check if user has already voted on this fact
    // - Check if voting period is still active
    // - etc.

    return {
      success: true,
      proofVerified: true,
      canVote: true
    }

  } catch (error: any) {
    console.error('Verify proof for voting error:', error)
    return {
      success: false,
      error: error.message || 'Failed to verify proof for voting'
    }
  }
}

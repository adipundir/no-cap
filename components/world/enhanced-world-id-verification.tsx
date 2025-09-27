'use client'

import { useState, useCallback } from 'react'
import { MiniKit, VerifyCommandInput, VerificationLevel, ISuccessResult } from '@worldcoin/minikit-js'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useToast } from '@/hooks/use-toast'
import { CheckCircle, AlertCircle, Loader2, Shield, Link as LinkIcon } from 'lucide-react'
import { useWorldChainContracts } from '@/hooks/use-world-chain-contracts'

interface EnhancedWorldIDVerificationProps {
  walletAddress?: string
  action: string
  signal?: string
  verificationLevel?: VerificationLevel
  onSuccess?: (result: ISuccessResult, txHash?: string) => void
  onError?: (error: any) => void
  enableOnChainVerification?: boolean
}

export function EnhancedWorldIDVerification({
  walletAddress,
  action,
  signal,
  verificationLevel = VerificationLevel.Orb,
  onSuccess,
  onError,
  enableOnChainVerification = true
}: EnhancedWorldIDVerificationProps) {
  const [isVerifying, setIsVerifying] = useState(false)
  const [verificationStatus, setVerificationStatus] = useState<'idle' | 'proof-generated' | 'on-chain-verified' | 'error'>('idle')
  const [verificationResult, setVerificationResult] = useState<ISuccessResult | null>(null)
  const [onChainTxHash, setOnChainTxHash] = useState<string>('')
  const { toast } = useToast()
  const { verifyWorldID, isLoading: isContractLoading } = useWorldChainContracts()

  const handleVerify = useCallback(async () => {
    if (!MiniKit.isInstalled()) {
      toast({
        type: 'error',
        title: 'World App Required',
        description: 'Please open this app in World App to verify your identity.',
      })
      setVerificationStatus('error')
      return
    }

    setIsVerifying(true)
    setVerificationStatus('idle')

    try {
      // Step 1: Generate World ID proof
      toast({
        type: 'info',
        title: 'Generating Proof',
        description: 'Creating your World ID proof...',
      })

      const verifyPayload: VerifyCommandInput = {
        action,
        signal: signal || walletAddress,
        verification_level: verificationLevel
      }

      const { finalPayload } = await MiniKit.commandsAsync.verify(verifyPayload)

      if (finalPayload.status === 'error') {
        const errorMsg = finalPayload.error_code || 'World ID verification failed'
        toast({
          type: 'error',
          title: 'Verification Failed',
          description: errorMsg,
        })
        setVerificationStatus('error')
        onError?.(finalPayload)
        return
      }

      // World ID proof generated successfully
      const result = finalPayload as ISuccessResult
      setVerificationResult(result)
      setVerificationStatus('proof-generated')

      toast({
        type: 'success',
        title: 'World ID Proof Generated',
        description: 'Your humanity has been verified!',
      })

      // Step 2: Submit to blockchain (if enabled and wallet connected)
      if (enableOnChainVerification && walletAddress) {
        try {
          toast({
            type: 'info',
            title: 'Submitting to Blockchain',
            description: 'Recording your verification on World Chain...',
          })

          const txHash = await verifyWorldID(
            walletAddress,
            result.merkle_root,
            result.nullifier_hash,
            result.proof.split(',')
          )

          setOnChainTxHash(txHash)
          setVerificationStatus('on-chain-verified')
          
          toast({
            type: 'success',
            title: 'On-Chain Verification Complete!',
            description: 'Your World ID is now verified on World Chain.',
          })

          onSuccess?.(result, txHash)
        } catch (contractError) {
          // Proof generated but on-chain verification failed
          console.error('On-chain verification failed:', contractError)
          toast({
            type: 'error',
            title: 'On-Chain Verification Failed',
            description: 'World ID proof generated but blockchain submission failed.',
          })
          onSuccess?.(result) // Still call success with proof
        }
      } else {
        // Just proof generation, no on-chain verification
        onSuccess?.(result)
      }

    } catch (error: any) {
      console.error('World ID verification error:', error)
      toast({
        type: 'error',
        title: 'Verification Error',
        description: error.message || 'An unexpected error occurred during verification.',
      })
      setVerificationStatus('error')
      onError?.(error)
    } finally {
      setIsVerifying(false)
    }
  }, [action, signal, walletAddress, verificationLevel, onSuccess, onError, enableOnChainVerification, toast, verifyWorldID])

  const getStatusBadge = () => {
    switch (verificationStatus) {
      case 'proof-generated':
        return <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">Proof Generated</Badge>
      case 'on-chain-verified':
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">On-Chain Verified</Badge>
      case 'error':
        return <Badge variant="destructive">Verification Failed</Badge>
      default:
        return <Badge variant="outline">Not Verified</Badge>
    }
  }

  const getStatusIcon = () => {
    if (isVerifying || isContractLoading) {
      return <Loader2 className="h-5 w-5 animate-spin text-blue-500" />
    }
    
    switch (verificationStatus) {
      case 'proof-generated':
        return <Shield className="h-5 w-5 text-blue-500" />
      case 'on-chain-verified':
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case 'error':
        return <AlertCircle className="h-5 w-5 text-red-500" />
      default:
        return <Shield className="h-5 w-5 text-gray-400" />
    }
  }

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            {getStatusIcon()}
            World ID Verification
          </h3>
          {getStatusBadge()}
        </div>
        
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">
            {verificationStatus === 'idle' && 'Verify your humanity with World ID to access NOCAP features.'}
            {verificationStatus === 'proof-generated' && 'World ID proof generated successfully! You can now interact with the platform.'}
            {verificationStatus === 'on-chain-verified' && 'Your World ID verification is recorded on World Chain blockchain.'}
            {verificationStatus === 'error' && 'Verification failed. Please try again.'}
          </p>

          {verificationResult && (
            <div className="space-y-3">
              {/* Verification Details */}
              <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-md">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <p className="text-sm font-medium text-green-800 dark:text-green-200">
                    World ID Verified
                  </p>
                </div>
                <div className="text-xs text-green-700 dark:text-green-300 space-y-1">
                  <p>Nullifier: {verificationResult.nullifier_hash.slice(0, 20)}...</p>
                  <p>Merkle Root: {verificationResult.merkle_root.slice(0, 20)}...</p>
                </div>
              </div>

              {/* On-Chain Status */}
              {enableOnChainVerification && walletAddress && (
                <div className={`p-3 rounded-md ${
                  verificationStatus === 'on-chain-verified' 
                    ? 'bg-green-50 dark:bg-green-900/20' 
                    : 'bg-blue-50 dark:bg-blue-900/20'
                }`}>
                  <div className="flex items-center gap-2 mb-2">
                    <LinkIcon className={`h-4 w-4 ${
                      verificationStatus === 'on-chain-verified' ? 'text-green-500' : 'text-blue-500'
                    }`} />
                    <p className={`text-sm font-medium ${
                      verificationStatus === 'on-chain-verified' 
                        ? 'text-green-800 dark:text-green-200'
                        : 'text-blue-800 dark:text-blue-200'
                    }`}>
                      {verificationStatus === 'on-chain-verified' ? 'On-Chain Verified' : 'Proof Generated'}
                    </p>
                  </div>
                  {onChainTxHash && (
                    <div className="text-xs text-green-700 dark:text-green-300">
                      <a
                        href={`https://worldscan.org/tx/${onChainTxHash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline hover:no-underline"
                      >
                        View Transaction: {onChainTxHash.slice(0, 20)}...
                      </a>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {verificationStatus === 'idle' && (
          <Button 
            onClick={handleVerify} 
            disabled={isVerifying || isContractLoading}
            className="w-full"
          >
            {isVerifying || isContractLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {isVerifying ? 'Generating Proof...' : 'Submitting to Blockchain...'}
              </>
            ) : (
              <>
                <Shield className="mr-2 h-4 w-4" />
                Verify with World ID
              </>
            )}
          </Button>
        )}

        {verificationStatus === 'proof-generated' && enableOnChainVerification && walletAddress && (
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-2">
              World ID proof ready for blockchain submission
            </p>
            <Button 
              onClick={handleVerify} 
              disabled={isContractLoading}
              variant="outline"
              size="sm"
            >
              {isContractLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting to Blockchain...
                </>
              ) : (
                <>
                  <LinkIcon className="mr-2 h-4 w-4" />
                  Submit to World Chain
                </>
              )}
            </Button>
          </div>
        )}
      </div>
    </Card>
  )
}

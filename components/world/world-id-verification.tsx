'use client'

import { useState, useCallback } from 'react'
import { MiniKit, VerifyCommandInput, VerificationLevel, ISuccessResult } from '@worldcoin/minikit-js'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useToast } from '@/hooks/use-toast'
import { CheckCircle, AlertCircle, Loader2, Shield } from 'lucide-react'
import { useWorldChainContracts } from '@/hooks/use-world-chain-contracts'

interface WorldIDVerificationProps {
  action: string
  signal?: string
  verificationLevel?: VerificationLevel
  onSuccess?: (result: ISuccessResult) => void
  onError?: (error: any) => void
}

export function WorldIDVerification({
  action,
  signal,
  verificationLevel = VerificationLevel.Orb,
  onSuccess,
  onError
}: WorldIDVerificationProps) {
  const [isVerifying, setIsVerifying] = useState(false)
  const [verificationStatus, setVerificationStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const { toast } = useToast()

  const handleVerify = useCallback(async () => {
    if (!MiniKit.isInstalled()) {
      toast({
        title: 'World App Required',
        description: 'Please open this app in World App to verify your identity.',
        variant: 'destructive',
      })
      setVerificationStatus('error')
      return
    }

    setIsVerifying(true)
    setVerificationStatus('idle')

    try {
      const verifyPayload: VerifyCommandInput = {
        action,
        signal,
        verification_level: verificationLevel
      }

      const { finalPayload } = await MiniKit.commandsAsync.verify(verifyPayload)

      if (finalPayload.status === 'error') {
        toast({
          title: 'Verification Failed',
          description: finalPayload.error_code || 'World ID verification failed. Please try again.',
          variant: 'destructive',
        })
        setVerificationStatus('error')
        onError?.(finalPayload)
        return
      }

      // World ID verification successful - ready for on-chain verification
      console.log('World ID proof received:', {
        nullifier_hash: (finalPayload as ISuccessResult).nullifier_hash,
        merkle_root: (finalPayload as ISuccessResult).merkle_root,
        proof: (finalPayload as ISuccessResult).proof,
        verification_level: (finalPayload as ISuccessResult).verification_level
      })

      setVerificationStatus('success')
      toast({
        title: 'Identity Verified',
        description: 'Your World ID has been successfully verified and proof generated!',
      })
      onSuccess?.(finalPayload as ISuccessResult)
    } catch (error) {
      console.error('Verification error:', error)
      toast({
        title: 'Verification Error',
        description: 'An unexpected error occurred during verification.',
        variant: 'destructive',
      })
      setVerificationStatus('error')
      onError?.(error)
    } finally {
      setIsVerifying(false)
    }
  }, [action, signal, verificationLevel, onSuccess, onError, toast])

  const getStatusIcon = () => {
    switch (verificationStatus) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case 'error':
        return <AlertCircle className="h-5 w-5 text-red-500" />
      default:
        return null
    }
  }

  const getStatusBadge = () => {
    switch (verificationStatus) {
      case 'success':
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Verified</Badge>
      case 'error':
        return <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">Failed</Badge>
      default:
        return null
    }
  }

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">World ID Verification</h3>
          {getStatusBadge()}
        </div>
        
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">
            Generate a World ID proof for on-chain verification. This proof will be used in your smart contract.
          </p>
          <div className="text-xs text-muted-foreground space-y-1">
            <p><strong>Action:</strong> {action}</p>
            {signal && <p><strong>Signal:</strong> {signal}</p>}
            <p><strong>Level:</strong> {verificationLevel}</p>
          </div>
        </div>


        {verificationStatus === 'success' && (
          <div className="flex items-center gap-2 p-3 bg-green-50 dark:bg-green-900/20 rounded-md">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <p className="text-sm text-green-700 dark:text-green-300">
              World ID proof generated! Ready for on-chain verification.
            </p>
          </div>
        )}

        <Button 
          onClick={handleVerify} 
          disabled={isVerifying || verificationStatus === 'success'}
          className="w-full"
        >
          {isVerifying ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Verifying...
            </>
          ) : verificationStatus === 'success' ? (
            <>
              <CheckCircle className="mr-2 h-4 w-4" />
              Proof Generated
            </>
          ) : (
            'Generate World ID Proof'
          )}
        </Button>
      </div>
    </Card>
  )
}

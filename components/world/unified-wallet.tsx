'use client'

import { useEnvironmentDetection } from './environment-detector'
import { NativeWorldWallet } from './native-world-wallet'
import { QRWalletConnect } from './qr-wallet-connect'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Smartphone, 
  Monitor, 
  Wifi, 
  Shield,
  Info
} from 'lucide-react'

interface UnifiedWalletProps {
  onAuthSuccess?: (address: string, signature: string) => void
  onAuthError?: (error: any) => void
}

export function UnifiedWallet({ onAuthSuccess, onAuthError }: UnifiedWalletProps) {
  const environment = useEnvironmentDetection()

  // Show loading state while detecting environment
  if (!environment.userAgent) {
    return (
      <Card className="p-6">
        <div className="flex items-center justify-center space-x-2 text-muted-foreground">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
          <span>Detecting environment...</span>
        </div>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {/* Environment Info */}
      <Card className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-blue-200 dark:border-blue-800">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-full">
            {environment.isWorldApp ? (
              <Smartphone className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            ) : (
              <Monitor className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            )}
          </div>
          <div className="flex-1">
            <div className="flex items-center space-x-2">
              <h3 className="font-medium text-blue-800 dark:text-blue-200">
                {environment.isWorldApp ? 'World App Detected' : 'Web Browser Detected'}
              </h3>
              <Badge 
                variant="secondary" 
                className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
              >
                {environment.isWorldApp ? 'Native' : 'QR Connect'}
              </Badge>
            </div>
            <p className="text-sm text-blue-600 dark:text-blue-400">
              {environment.isWorldApp 
                ? 'Using native World App wallet integration'
                : 'Connect by scanning QR code with World App'
              }
            </p>
          </div>
        </div>
      </Card>

      {/* Connection Method */}
      {environment.isWorldApp ? (
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Shield className="h-4 w-4 text-green-600" />
            <span className="text-sm font-medium text-green-700 dark:text-green-300">
              Native World App Connection
            </span>
          </div>
          <NativeWorldWallet 
            onAuthSuccess={onAuthSuccess}
            onAuthError={onAuthError}
          />
        </div>
      ) : (
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Wifi className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
              QR Code Connection
            </span>
          </div>
          <QRWalletConnect 
            onAuthSuccess={onAuthSuccess}
            onAuthError={onAuthError}
          />
        </div>
      )}

      {/* Additional Info for Web Users */}
      {!environment.isWorldApp && (
        <Card className="p-4 bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800">
          <div className="flex items-start space-x-3">
            <Info className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5" />
            <div className="space-y-2">
              <h4 className="font-medium text-amber-800 dark:text-amber-200">
                Don't have World App?
              </h4>
              <p className="text-sm text-amber-700 dark:text-amber-300">
                Download World App from the App Store or Google Play to access native features 
                like gas-free transactions and seamless World ID verification.
              </p>
              <div className="flex space-x-2 mt-2">
                <Badge variant="outline" className="text-xs">
                  iOS & Android
                </Badge>
                <Badge variant="outline" className="text-xs">
                  Free Download
                </Badge>
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}

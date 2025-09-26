'use client'

import { useEffect, useState } from 'react'
import { MiniKit } from '@worldcoin/minikit-js'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Smartphone, Globe, CheckCircle, XCircle } from 'lucide-react'

export function WorldAppStatus() {
  const [isInstalled, setIsInstalled] = useState(false)
  const [isChecking, setIsChecking] = useState(true)

  useEffect(() => {
    // Check if MiniKit is installed
    const checkInstallation = () => {
      const installed = MiniKit.isInstalled()
      setIsInstalled(installed)
      setIsChecking(false)
    }

    // Small delay to ensure MiniKit is properly initialized
    const timer = setTimeout(checkInstallation, 100)

    return () => clearTimeout(timer)
  }, [])

  if (isChecking) {
    return (
      <Card className="p-4">
        <div className="flex items-center gap-3">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
          <span className="text-sm">Checking World App status...</span>
        </div>
      </Card>
    )
  }

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {isInstalled ? (
            <Smartphone className="h-5 w-5 text-green-500" />
          ) : (
            <Globe className="h-5 w-5 text-orange-500" />
          )}
          <div>
            <p className="font-medium text-sm">
              {isInstalled ? 'Running in World App' : 'Running in Browser'}
            </p>
            <p className="text-xs text-muted-foreground">
              {isInstalled 
                ? 'All World ID features are available' 
                : 'Open in World App for full functionality'
              }
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {isInstalled ? (
            <CheckCircle className="h-4 w-4 text-green-500" />
          ) : (
            <XCircle className="h-4 w-4 text-orange-500" />
          )}
          <Badge 
            className={
              isInstalled 
                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                : "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
            }
          >
            {isInstalled ? 'Connected' : 'Browser Mode'}
          </Badge>
        </div>
      </div>
    </Card>
  )
}

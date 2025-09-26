'use client'

import { useEffect, useState } from 'react'
import { MiniKit } from '@worldcoin/minikit-js'

export interface EnvironmentInfo {
  isWorldApp: boolean
  isMobile: boolean
  isWebBrowser: boolean
  userAgent: string
}

export function useEnvironmentDetection(): EnvironmentInfo {
  const [environment, setEnvironment] = useState<EnvironmentInfo>({
    isWorldApp: false,
    isMobile: false,
    isWebBrowser: false,
    userAgent: ''
  })

  useEffect(() => {
    if (typeof window === 'undefined') return

    const userAgent = navigator.userAgent
    const isWorldApp = MiniKit.isInstalled()
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)
    const isWebBrowser = !isWorldApp && typeof window !== 'undefined'

    setEnvironment({
      isWorldApp,
      isMobile,
      isWebBrowser,
      userAgent
    })
  }, [])

  return environment
}

export function EnvironmentDetector({ children }: { children: (env: EnvironmentInfo) => React.ReactNode }) {
  const environment = useEnvironmentDetection()
  return <>{children(environment)}</>
}

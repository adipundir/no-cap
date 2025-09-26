'use client'

import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/hooks/use-toast"

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const { toasts, dismiss } = useToast()

  return (
    <>
      {children}
      <Toaster toasts={toasts} onRemove={dismiss} />
    </>
  )
}

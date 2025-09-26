import * as React from "react"
import { Toast, type Toast as ToastType } from "./toast"

interface ToasterProps {
  toasts: ToastType[]
  onRemove: (id: string) => void
}

export function Toaster({ toasts, onRemove }: ToasterProps) {
  return (
    <div className="fixed top-0 right-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="animate-in slide-in-from-top-full duration-300 sm:slide-in-from-bottom-full"
        >
          <Toast
            {...toast}
            onClose={() => onRemove(toast.id)}
          />
        </div>
      ))}
    </div>
  )
}

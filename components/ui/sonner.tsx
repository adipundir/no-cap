"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner, ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      position="bottom-right"
      closeButton
      richColors
      expand={true}
      toastOptions={{
        style: {
          background: theme === 'dark' ? '#0a0a0a' : '#ffffff',
          color: theme === 'dark' ? '#fafafa' : '#0a0a0a',
          border: `1px solid ${theme === 'dark' ? '#27272a' : '#e4e4e7'}`,
          boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
        },
        className: 'group toast',
        descriptionClassName: 'text-muted-foreground',
      }}
      {...props}
    />
  )
}

export { Toaster }

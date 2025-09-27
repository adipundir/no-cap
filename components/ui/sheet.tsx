"use client"

import * as React from "react"
import { createPortal } from "react-dom"
import { cn } from "@/lib/utils"
import { X } from "lucide-react"

const Sheet = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <div ref={ref} className={className} {...props}>
      <SheetContext.Provider value={{ isOpen, setIsOpen }}>
        {children}
      </SheetContext.Provider>
    </div>
  )
})
Sheet.displayName = "Sheet"

const SheetContext = React.createContext<{
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}>({
  isOpen: false,
  setIsOpen: () => {}
})

const SheetTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    asChild?: boolean
  }
>(({ className, asChild, children, ...props }, ref) => {
  const { setIsOpen } = React.useContext(SheetContext)
  
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement<any>, {
      ...(children.props as any),
      onClick: (e: React.MouseEvent) => {
        (children.props as any)?.onClick?.(e)
        setIsOpen(true)
      }
    } as any)
  }
  
  return (
    <button
      ref={ref}
      className={className}
      onClick={() => setIsOpen(true)}
      {...props}
    >
      {children}
    </button>
  )
})
SheetTrigger.displayName = "SheetTrigger"

const SheetContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    side?: 'top' | 'right' | 'bottom' | 'left'
  }
>(({ className, side = 'right', children, ...props }, ref) => {
  const { isOpen, setIsOpen } = React.useContext(SheetContext)
  
  if (!isOpen) return null
  
  const sideClasses = {
    top: 'top-0 left-0 right-0 h-auto',
    right: 'top-0 right-0 h-full w-full',
    bottom: 'bottom-0 left-0 right-0 h-auto',
    left: 'top-0 left-0 h-full w-full'
  }
  
  const slideClasses = {
    top: 'animate-in slide-in-from-top',
    right: 'animate-in slide-in-from-right',
    bottom: 'animate-in slide-in-from-bottom',
    left: 'animate-in slide-in-from-left'
  }
  
  const portalTarget = typeof document !== 'undefined' ? document.body : null

  const content = (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 z-[100] bg-background"
        onClick={() => setIsOpen(false)}
      />
      
      {/* Sheet */}
      <div
        ref={ref}
        className={cn(
          "fixed z-[110] bg-background p-6 shadow-lg border w-full max-w-none overflow-y-auto",
          sideClasses[side],
          slideClasses[side],
          className
        )}
        {...props}
      >
        <button
          onClick={() => setIsOpen(false)}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>
        {children}
      </div>
    </>
  )

  if (!portalTarget) return null
  return createPortal(content, portalTarget)
})
SheetContent.displayName = "SheetContent"

const SheetClose = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    asChild?: boolean
  }
>(({ className, asChild, children, ...props }, ref) => {
  const { setIsOpen } = React.useContext(SheetContext)

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement<any>, {
      ...(children.props as any),
      onClick: (e: React.MouseEvent) => {
        (children.props as any)?.onClick?.(e)
        setIsOpen(false)
      }
    } as any)
  }

  return (
    <button
      ref={ref}
      className={className}
      onClick={() => setIsOpen(false)}
      {...props}
    >
      {children}
    </button>
  )
})
SheetClose.displayName = "SheetClose"

export { Sheet, SheetTrigger, SheetContent, SheetClose }

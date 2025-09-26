import * as React from "react"
import { cn } from "@/lib/utils"

const DropdownMenu = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    open?: boolean
    onOpenChange?: (open: boolean) => void
  }
>(({ className, open, onOpenChange, children, ...props }, ref) => {
  const [isOpen, setIsOpen] = React.useState(open || false)
  
  React.useEffect(() => {
    if (open !== undefined) {
      setIsOpen(open)
    }
  }, [open])

  const handleToggle = () => {
    const newOpen = !isOpen
    setIsOpen(newOpen)
    onOpenChange?.(newOpen)
  }

  return (
    <div ref={ref} className={cn("relative", className)} {...props}>
      <DropdownMenuContext.Provider value={{ isOpen, onToggle: handleToggle }}>
        {children}
      </DropdownMenuContext.Provider>
    </div>
  )
})
DropdownMenu.displayName = "DropdownMenu"

const DropdownMenuContext = React.createContext<{
  isOpen: boolean
  onToggle: () => void
}>({
  isOpen: false,
  onToggle: () => {}
})

const DropdownMenuTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    asChild?: boolean
  }
>(({ className, asChild, children, ...props }, ref) => {
  const { onToggle } = React.useContext(DropdownMenuContext)
  
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement<any>, {
      ...(children.props as any),
      onClick: (e: React.MouseEvent) => {
        (children.props as any)?.onClick?.(e)
        onToggle()
      }
    } as any)
  }
  
  return (
    <button
      ref={ref}
      className={className}
      onClick={onToggle}
      {...props}
    >
      {children}
    </button>
  )
})
DropdownMenuTrigger.displayName = "DropdownMenuTrigger"

const DropdownMenuContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    align?: 'start' | 'center' | 'end'
  }
>(({ className, align = 'center', children, ...props }, ref) => {
  const { isOpen } = React.useContext(DropdownMenuContext)
  
  if (!isOpen) return null
  
  const alignClass = {
    start: 'left-0',
    center: 'left-1/2 -translate-x-1/2',
    end: 'right-0'
  }[align]
  
  return (
    <div
      ref={ref}
      className={cn(
        "absolute top-full mt-2 z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95",
        alignClass,
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
})
DropdownMenuContent.displayName = "DropdownMenuContent"

export { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent }

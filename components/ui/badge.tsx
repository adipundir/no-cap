import * as React from "react";
import { cn } from "@/lib/utils";

export type BadgeVariant = "default" | "secondary" | "outline";

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
        variant === "default" &&
          "border-transparent bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900",
        variant === "secondary" &&
          "border-transparent bg-gray-200 text-gray-900 dark:bg-gray-800 dark:text-gray-100",
        variant === "outline" &&
          "border-gray-300 text-gray-700 dark:border-gray-700 dark:text-gray-300",
        className
      )}
      {...props}
    />
  );
}



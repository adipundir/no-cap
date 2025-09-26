import * as React from "react";
import { cn } from "@/lib/utils";

export function Card(
  props: React.HTMLAttributes<HTMLDivElement> & { 
    variant?: "default" | "module" 
  }
): React.ReactElement {
  const { className, variant = "default", ...rest } = props;
  return (
    <div
      className={cn(
        "relative overflow-hidden",
        variant === "default" && "rounded-2xl border border-gray-200/70 bg-white/80 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.4),0_4px_20px_-8px_rgba(0,0,0,0.2)] backdrop-blur-md dark:border-gray-800 dark:bg-gray-900/70",
        variant === "module" && "module grain-card",
        className
      )}
      {...rest}
    />
  );
}

export function CardTitle(
  props: React.HTMLAttributes<HTMLHeadingElement>
): React.ReactElement {
  const { className, ...rest } = props;
  return (
    <h3 className={cn("text-lg font-semibold tracking-tight", className)} {...rest} />
  );
}

export function CardDescription(
  props: React.HTMLAttributes<HTMLParagraphElement>
): React.ReactElement {
  const { className, ...rest } = props;
  return (
    <p className={cn("text-sm text-gray-600 dark:text-gray-400", className)} {...rest} />
  );
}

export function CardContent(
  props: React.HTMLAttributes<HTMLDivElement>
): React.ReactElement {
  const { className, ...rest } = props;
  return <div className={cn("mt-4 space-y-4", className)} {...rest} />;
}

export function CardFooter(
  props: React.HTMLAttributes<HTMLDivElement>
): React.ReactElement {
  const { className, ...rest } = props;
  return (
    <div className={cn("mt-6 flex items-center justify-between", className)} {...rest} />
  );
}



"use client";
import React from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface HeroModuleProps {
  title: string;
  description: string;
  badge?: string;
  children?: React.ReactNode;
  className?: string;
  align?: "center" | "left";
}

export function HeroModule({ 
  title, 
  description, 
  badge, 
  children,
  className,
  align = "center"
}: HeroModuleProps) {
  return (
    <section className={cn(
      "relative py-20 md:py-28",
      align === "center" && "text-center",
      className
    )}>
      {badge && <Badge className="mb-6">{badge}</Badge>}
      <h1 className={cn(
        "glow relative text-4xl font-semibold tracking-tight text-gray-900 md:text-6xl dark:text-white mb-6",
        align === "center" ? "mx-auto" : ""
      )}>
        {title}
      </h1>
      <p className={cn(
        "text-gray-600 md:text-lg dark:text-gray-300 mb-8 pt-8",
        align === "center" ? "max-w-2xl mx-auto" : "max-w-2xl"
      )}>
        {description}
      </p>
      
      {children}
      
      <div className="pointer-events-none absolute inset-x-0 -bottom-20 mx-auto h-48 w-3/4 rounded-[40px] bg-gradient-to-t from-gray-200/50 to-transparent blur-2xl dark:from-gray-800/30" />
    </section>
  );
}





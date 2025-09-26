"use client";
import React from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface FeatureModuleProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  className?: string;
}

export function FeatureModule({ title, description, icon, className }: FeatureModuleProps) {
  return (
    <Card variant="module" className={className}>
      <div className="module-header">
        <div className="flex items-center gap-3">
          {icon && (
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100">
              {icon}
            </div>
          )}
          <h3 className="text-lg font-semibold">{title}</h3>
        </div>
      </div>
      <div className="module-content">
        <p className="text-gray-600 dark:text-gray-400">{description}</p>
      </div>
    </Card>
  );
}

export function FeatureGrid({ 
  children,
  columns = 3,
  className
}: { 
  children: React.ReactNode; 
  columns?: 1 | 2 | 3 | 4;
  className?: string;
}) {
  return (
    <div 
      className={cn(
        "module-grid", 
        columns === 1 && "grid-cols-1",
        columns === 2 && "grid-cols-1 md:grid-cols-2",
        columns === 3 && "grid-cols-1 md:grid-cols-3",
        columns === 4 && "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
        className
      )}
    >
      {children}
    </div>
  );
}





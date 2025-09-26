"use client";
import React from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StepModuleProps {
  number: number;
  title: string;
  description: string;
  icon?: React.ReactNode;
  className?: string;
}

export function StepModule({ number, title, description, icon, className }: StepModuleProps) {
  return (
    <Card variant="module" className={className}>
      <div className="relative p-6">
        <div className="absolute -top-2 -left-2 flex h-8 w-8 items-center justify-center rounded-full bg-gray-900 text-white text-sm font-medium dark:bg-white dark:text-gray-900">
          {number}
        </div>
        {icon && (
          <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100">
            {icon}
          </div>
        )}
        <h3 className="mb-2 text-lg font-semibold">{title}</h3>
        <p className="text-gray-600 dark:text-gray-400">{description}</p>
      </div>
    </Card>
  );
}

export function StepGrid({ 
  children,
  columns = 4,
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





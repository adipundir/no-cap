"use client";
import * as React from "react";
import { cn } from "@/lib/utils";

type ChipItem = {
  label: string;
  icon?: React.ReactNode;
};

export function FloatingChips({ items, className }: { items: ChipItem[]; className?: string }) {
  const positions = React.useMemo(() => {
    // Generate random but stable positions on mount with spacing constraints
    const placed: { top: number; left: number; delay: number; duration: number }[] = [];
    const minDistance = 14; // in percentage points (euclidean) to keep chips apart

    const inSafeBands = () => {
      // two vertical bands away from center content
      // 18%-34% (upper mid) or 66%-84% (lower mid)
      const useTopBand = Math.random() < 0.5;
      const top = (useTopBand ? 18 : 66) + Math.random() * 16; // 18-34 or 66-82
      const left = 12 + Math.random() * 76; // 12-88
      return { top, left };
    };

    const isFar = (a: { top: number; left: number }, b: { top: number; left: number }) => {
      const dx = a.left - b.left;
      const dy = a.top - b.top;
      return Math.sqrt(dx * dx + dy * dy) >= minDistance;
    };

    for (let i = 0; i < items.length; i++) {
      let attempt = 0;
      let pos = inSafeBands();
      while (attempt < 40) {
        if (placed.every(p => isFar(pos, p))) break;
        pos = inSafeBands();
        attempt++;
      }
      placed.push({
        top: pos.top,
        left: pos.left,
        delay: Math.random() * 2,
        duration: 5 + Math.random() * 3,
      });
    }
    return placed;
  }, [items]);

  return (
    <div className={cn("pointer-events-none absolute inset-0 -z-10", className)}>
      {items.map((item, idx) => {
        const p = positions[idx];
        return (
          <div
            key={idx}
            className="absolute rounded-2xl border bg-card px-3 py-1.5 text-xs md:text-sm opacity-70 shadow-sm"
            style={{
              top: `${p.top}%`,
              left: `${p.left}%`,
              transform: "translate(-50%, -50%)",
              animation: `float ${p.duration}s ease-in-out ${p.delay}s infinite`,
            }}
          >
            <div className="flex items-center gap-2">
              {item.icon}
              {item.label}
            </div>
          </div>
        );
      })}
    </div>
  );
}



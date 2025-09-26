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
    const minDistance = 28; // much wider spacing between chips

    const inSafeBands = () => {
      // two vertical bands far from center content
      // 8%-24% (upper) or 76%-92% (lower)
      const useTopBand = Math.random() < 0.5;
      const top = (useTopBand ? 8 : 76) + Math.random() * 16; // 8-24 or 76-92
      const left = 10 + Math.random() * 80; // 10-90
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



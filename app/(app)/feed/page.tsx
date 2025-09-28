"use client";

import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Shield, Clock, TriangleAlert, MessageSquare, GraduationCap, WifiOff } from "lucide-react";
// import { useEffect, useState } from "react";
// import { toast } from "sonner";
import { getMockFacts } from "@/components/data/mock-facts";
import type { Fact } from "@/types/fact";

function StatusBadge({ status }: { status: Fact["status"] }) {
  if (status === "verified") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs">
        <Shield className="h-3 w-3" /> Verified
      </span>
    );
  }
  if (status === "review") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs">
        <Clock className="h-3 w-3" /> Under review
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs">
      <TriangleAlert className="h-3 w-3" /> Flagged
    </span>
  );
}

export default function FeedPage() {
  // const [facts, setFacts] = useState<Fact[]>([]);
  // const [isFallback, setIsFallback] = useState(false);
  // const [fallbackShown, setFallbackShown] = useState(false);

  // useEffect(() => {
  //   async function fetchFacts() {
  //     try {
  //       const response = await fetch("/api/facts");
  //       if (!response.ok) {
  //         throw new Error("Failed to fetch facts");
  //       }
  //       const data = await response.json();
  //       
  //       setFacts(data.facts || []);
  //       setIsFallback(data.isFallback || false);
  //       
  //       // Show toast notification for fallback mode (only once)
  //       if (data.isFallback && !fallbackShown) {
  //         toast.warning("Fallback Facts", {
  //           description: "Showing sample facts while Walrus storage is unavailable",
  //           icon: <WifiOff className="h-4 w-4" />,
  //           duration: 6000,
  //         });
  //         setFallbackShown(true);
  //       }
  //     } catch (error) {
  //       console.error("Failed to load facts:", error);
  //       toast.error("Failed to load facts", {
  //         description: "Please try again later"
  //       });
  //     }
  //   }

  //   fetchFacts();
  // }, [fallbackShown]);

  // Using mock data for now - replace with real API call when ready
  const facts = getMockFacts();
  const isFallback = false; // Set to true when using fallback mode

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-5xl px-4 pt-3 pb-6">
        <div className="mb-4 flex flex-col items-center gap-3">
          <h1 className="text-4xl md:text-5xl font-light tracking-tight leading-none text-center">Feed</h1>
          
          {/* Commented out fallback indicator - uncomment when using fallback mode */}
          {/* {isFallback && (
            <div className="flex items-center gap-2 px-3 py-1.5 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-full">
              <WifiOff className="h-3 w-3 text-orange-600 dark:text-orange-400" />
              <span className="text-xs font-medium text-orange-700 dark:text-orange-300">
                Fallback Mode - Sample Facts
              </span>
            </div>
          )} */}
        </div>
        {/* Feed list */}
        <div className="space-y-4">
          {facts.map((fact) => (
            <Card key={fact.id} variant="module" className="p-0">
              <div className="module-content">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="space-y-1">
                    <h3 className="text-base font-semibold">{fact.title}</h3>
                    <p className="text-sm text-muted-foreground max-w-3xl">{fact.summary}</p>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span>by {fact.author}</span>
                      <span>·</span>
                      <span>{fact.updated}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <StatusBadge status={fact.status} />
                  </div>
                </div>
              </div>
              <div className="module-footer">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-4 text-muted-foreground">
                    <span className="inline-flex items-center gap-1"><GraduationCap className="h-4 w-4" /> {fact.votes}</span>
                    <span className="inline-flex items-center gap-1"><MessageSquare className="h-4 w-4" /> {fact.comments}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button size="sm" asChild><Link href={`/facts/${fact.id}`}>Cap / No Cap</Link></Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}



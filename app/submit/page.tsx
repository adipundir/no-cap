"use client";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function SubmitPage() {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [stake, setStake] = useState(10);
  const [durationHrs, setDurationHrs] = useState(48); // fact lifeline in hours (28-60)

  // No real submission yet; this is a visual-only stub
  const isValid =
    title.trim().length > 10 &&
    summary.trim().length > 20 &&
    stake > 0 &&
    durationHrs >= 28 &&
    durationHrs <= 60;

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-3xl px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-xl font-semibold">Create a fact</h1>
          <Badge variant="outline">Stake with PYUD</Badge>
        </div>

        <Card variant="module" className="p-0">
          <div className="module-content space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium">Claim title</label>
              <input
                className="w-full rounded-lg border bg-background px-3 py-2 text-sm"
                placeholder="e.g., Ethereum Cancun upgrade reduced gas fees by 50%"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Summary / context</label>
              <textarea
                className="w-full rounded-lg border bg-background px-3 py-2 text-sm"
                rows={5}
                placeholder="Add a short explanation with links and context. The raw media can be stored in Walrus."
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="md:col-span-1">
                <label className="mb-1 block text-sm font-medium">Stake (PYUD)</label>
                <input
                  type="number"
                  min={1}
                  className="w-full rounded-lg border bg-background px-3 py-2 text-sm"
                  value={stake}
                  onChange={(e) => setStake(parseInt(e.target.value || "0", 10))}
                />
              </div>
              <div className="md:col-span-2 text-sm text-muted-foreground">
                Your stake helps prevent spam. If the outcome is True, you earn back stake + rewards. If False, stake is redistributed to correct reviewers.
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="md:col-span-1">
                <label className="mb-1 block text-sm font-medium">Fact lifeline (hours)</label>
                <input
                  type="range"
                  min={28}
                  max={60}
                  value={durationHrs}
                  onChange={(e) => setDurationHrs(parseInt(e.target.value, 10))}
                  className="w-full"
                />
                <div className="mt-1 text-xs text-muted-foreground">{durationHrs}h</div>
              </div>
              <div className="md:col-span-2 text-sm text-muted-foreground">
                Voting window the fact remains open. Minimum 28h, maximum 60h.
                {" "}
                <span className="block mt-1">Ends approximately: {new Date(Date.now() + durationHrs * 3600 * 1000).toLocaleString()}</span>
              </div>
            </div>
          </div>
          <div className="module-footer flex items-center justify-between">
            <Link href="/feed" className="text-sm text-muted-foreground hover:underline">Cancel</Link>
            <Button disabled={!isValid}>Submit fact</Button>
          </div>
        </Card>
      </div>
    </div>
  );
}



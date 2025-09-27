"use client";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { nanoid } from "nanoid";

export default function SubmitPage() {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [stake, setStake] = useState(10);
  const [durationHrs, setDurationHrs] = useState(48);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const isValid =
    title.trim().length > 10 &&
    summary.trim().length > 20 &&
    durationHrs >= 28 &&
    durationHrs <= 60;

  async function handleSubmit() {
    if (!isValid || isSubmitting) return;

    setIsSubmitting(true);
    const factId = nanoid();

    try {
      const response = await fetch("/api/facts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: factId,
          title,
          summary,
          fullContent: summary,
          sources: [],
          status: "review",
          votes: 0,
          comments: 0,
          author: "anon",
          updated: new Date().toISOString(),
          metadata: {
            author: "anon",
            created: new Date().toISOString(),
            updated: new Date().toISOString(),
            version: 1,
            contentType: "text/plain",
          },
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit fact");
      }

      router.push(`/facts/${factId}`);
    } catch (error) {
      console.error("Failed to submit fact:", error);
      alert("Failed to submit fact. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-3xl px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-xl font-semibold">Create a fact</h1>
          <Badge variant="outline">No stake required</Badge>
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
                <label className="mb-1 block text-sm font-medium">Stake (PYUD) <span className="text-xs text-muted-foreground">- Optional</span></label>
                <input
                  type="number"
                  min={0}
                  className="w-full rounded-lg border bg-background px-3 py-2 text-sm"
                  value={stake}
                  onChange={(e) => setStake(parseInt(e.target.value || "0", 10))}
                />
              </div>
              <div className="md:col-span-2 text-sm text-muted-foreground">
                Optional stake to show confidence in your claim. Higher stakes may increase visibility and credibility.
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
            <Button disabled={!isValid || isSubmitting} onClick={handleSubmit}>
              {isSubmitting ? "Submitting..." : "Submit fact"}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
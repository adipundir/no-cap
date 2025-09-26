"use client";
import { useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Clock, TriangleAlert, ArrowLeft, GraduationCap } from "lucide-react";

export default function FactDetail() {
  const params = useParams();
  const router = useRouter();
  const id = Array.isArray(params?.id) ? params?.id[0] : (params?.id as string);

  const fact = useMemo(() => ({
    id,
    title: "Example fact title",
    summary: "Short description of the claim. Stored media/comments would live in Walrus.",
    status: "review" as "verified" | "review" | "flagged",
  }), [id]);

  const [choice, setChoice] = useState<"cap" | "nocap" | "context" | null>(null);
  const [stake, setStake] = useState(5);
  const [context, setContext] = useState("");

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-4xl px-4 py-8 space-y-6">
        <div className="flex items-center gap-3">
          <Link href="/feed" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:underline">
            <ArrowLeft className="h-4 w-4" /> Back to feed
          </Link>
        </div>

        <Card variant="module" className="p-0">
          <div className="module-content space-y-3">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-semibold">{fact.title}</h1>
              <Badge variant="outline">Under review</Badge>
            </div>
            <p className="text-sm text-muted-foreground">{fact.summary}</p>
          </div>
        </Card>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <Card variant="module" className="p-0 md:col-span-2">
            <div className="module-header">
              <h2 className="text-base font-semibold">Cap / No Cap</h2>
            </div>
            <div className="module-content space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <Button variant={choice === "cap" ? "default" : "outline"} onClick={() => setChoice("cap")}>
                  <GraduationCap className="mr-2 h-4 w-4" /> Cap
                </Button>
                <Button variant={choice === "nocap" ? "default" : "outline"} onClick={() => setChoice("nocap")}>
                  No Cap
                </Button>
                <Button variant={choice === "context" ? "default" : "outline"} onClick={() => setChoice("context")}>Needs Context</Button>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Stake (PYUD)</label>
                <input
                  type="number"
                  min={1}
                  className="w-48 rounded-lg border bg-background px-3 py-2 text-sm"
                  value={stake}
                  onChange={(e) => setStake(parseInt(e.target.value || "0", 10))}
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Context (required)</label>
                <textarea
                  className="w-full rounded-lg border bg-background px-3 py-2 text-sm"
                  rows={4}
                  placeholder="Add a brief context or reasoning for your Cap / No Cap."
                  value={context}
                  onChange={(e) => setContext(e.target.value)}
                />
              </div>
            </div>
            <div className="module-footer flex items-center justify-end">
              <Button disabled={!choice || stake <= 0 || context.trim().length < 10}>Submit</Button>
            </div>
          </Card>

          <Card variant="module" className="p-0">
            <div className="module-header">
              <h2 className="text-base font-semibold">Status</h2>
            </div>
            <div className="module-content space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Window</span>
                <span>48h</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Outcome</span>
                <span>Pending</span>
              </div>
            </div>
          </Card>
        </div>

        <Card variant="module" className="p-0">
          <div className="module-header">
            <h2 className="text-base font-semibold">Comments</h2>
          </div>
          <div className="module-content space-y-4">
            {["Solid evidence from EIP data.", "Need more sources."] .map((c, i) => (
              <div key={i} className="rounded-lg border bg-background px-3 py-2 text-sm">{c}</div>
            ))}
          </div>
          <div className="module-footer">
            <input className="w-full rounded-lg border bg-background px-3 py-2 text-sm" placeholder="Add an anonymous comment (Walrus)." />
          </div>
        </Card>
      </div>
    </div>
  );
}



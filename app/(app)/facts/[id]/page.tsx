"use client";
import { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Clock, TriangleAlert, ArrowLeft, GraduationCap } from "lucide-react";
import { DEFAULT_ECON_PARAMS, previewReturn } from "@/lib/economics";
import { getMockFactById, getMockVotingDataById } from "@/components/data/mock-facts";
import type { Fact } from "@/types/fact";

function StatusBadge({ status }: { status: Fact["status"] }) {
  if (status === "verified") {
    return (
      <Badge variant="outline" className="flex items-center gap-2">
        <Shield className="h-4 w-4" /> Verified
      </Badge>
    );
  }
  if (status === "review") {
    return (
      <Badge variant="outline" className="flex items-center gap-2">
        <Clock className="h-4 w-4" /> Under review
      </Badge>
    );
  }
  return (
    <Badge variant="outline" className="flex items-center gap-2">
      <TriangleAlert className="h-4 w-4" /> Flagged
    </Badge>
  );
}

export default function FactDetail() {
  const params = useParams();
  const id = Array.isArray(params?.id) ? params?.id[0] : (params?.id as string);

  // Use mock data instead of API calls
  const fact = getMockFactById(id);
  const votingData = getMockVotingDataById(id);
  
  const [choice, setChoice] = useState<"cap" | "nocap" | null>(null);
  const [stake, setStake] = useState(5);

  const tallies = useMemo(() => ({
    capVotes: votingData?.capVotes ?? 0,
    noCapVotes: votingData?.noCapVotes ?? 0,
    capStake: votingData?.capStake ?? 0,
    noCapStake: votingData?.noCapStake ?? 0,
    posterStake: votingData?.posterStake ?? 0,
  }), [votingData]);
  const totalVotes = tallies.capVotes + tallies.noCapVotes;
  const votingStake = tallies.capStake + tallies.noCapStake;
  const totalStake = votingStake + tallies.posterStake;
  const capPct = Math.round((tallies.capVotes / Math.max(1, totalVotes)) * 100);
  const noCapPct = 100 - capPct;
  const leader = tallies.capVotes >= tallies.noCapVotes ? "Caps" : "No Caps";

  const preview = choice
    ? previewReturn(choice, Math.max(0, stake), tallies, DEFAULT_ECON_PARAMS, 1)
    : null;


  if (!fact) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-semibold">Fact Not Found</h1>
          <p className="text-muted-foreground">The fact you're looking for doesn't exist.</p>
          <Link href="/feed">
            <Button>Back to Feed</Button>
          </Link>
        </div>
      </div>
    );
  }

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
              <StatusBadge status={fact.status} />
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
              {preview && (
                <div className="rounded-lg border bg-background p-3 text-sm">
                  <div className="mb-2 font-medium">Your expected return</div>
                  <div className="grid grid-cols-1 gap-1 md:grid-cols-3">
                    <div className="flex items-center justify-between"><span className="text-muted-foreground">If your side wins</span><span>{preview.winReturn.toFixed(2)} PYUD</span></div>
                    <div className="flex items-center justify-between"><span className="text-muted-foreground">Reward portion</span><span>{preview.winPool.toFixed(2)} PYUD</span></div>
                    <div className="flex items-center justify-between"><span className="text-muted-foreground">If your side loses</span><span>{preview.loseReturn.toFixed(2)} PYUD</span></div>
                  </div>
                </div>
              )}
            </div>
            <div className="module-footer flex items-center justify-end">
              <Button
                disabled={!choice || stake <= 0}
                onClick={() => {
                  alert(`Vote recorded: ${choice?.toUpperCase()} with ${stake} PYUD stake! 🎉\n\nYour vote will be processed when the prediction market goes live.`);
                }}
              >
                Submit Vote
              </Button>
            </div>
          </Card>

          <Card variant="module" className="p-0">
            <div className="module-header">
              <h2 className="text-base font-semibold">Status</h2>
            </div>
            <div className="module-content space-y-4 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Window</span>
                <span>{votingData?.window ?? "48h"}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Outcome</span>
                <span>{votingData?.outcome ?? "Pending"}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Total stake</span>
                <span>{totalStake} PYUD</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Poster stake</span>
                <span>{tallies.posterStake} PYUD</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Voting stake</span>
                <span>{votingStake} PYUD</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Caps</span>
                <span>{tallies.capVotes} ({capPct}%) · {tallies.capStake} PYUD</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">No Caps</span>
                <span>{tallies.noCapVotes} ({noCapPct}%) · {tallies.noCapStake} PYUD</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full border">
                <div className="h-full bg-foreground/80" style={{ width: `${capPct}%` }} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Leader</span>
                <span>{leader}</span>
              </div>
            </div>
          </Card>
        </div>

      </div>
    </div>
  );
}



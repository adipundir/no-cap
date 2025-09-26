import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Shield, Clock, TriangleAlert, MessageSquare, ThumbsUp, ArrowLeft, Plus, GraduationCap } from "lucide-react";

type Fact = {
  id: string;
  title: string;
  summary: string;
  status: "verified" | "review" | "flagged";
  votes: number;
  comments: number;
  author: string; // can be anon handle
  updated: string;
};

const sampleFacts: Fact[] = [
  {
    id: "1",
    title: "Saturn's moon Enceladus contains hydrothermal vents in its subsurface ocean",
    summary:
      "Cassini data suggests warm hydrothermal activity, consistent with silica nanoparticles found in plumes.",
    status: "verified",
    votes: 1243,
    comments: 89,
    author: "anon-4f8c",
    updated: "2h ago",
  },
  {
    id: "2",
    title: "A new exoplanet has been found in Alpha Centauri",
    summary:
      "A circulating blog post claims a discovery, but no peer-reviewed source currently corroborates it.",
    status: "review",
    votes: 312,
    comments: 45,
    author: "anon-a21e",
    updated: "6h ago",
  },
  {
    id: "3",
    title: "Photosynthesis can operate efficiently under starlight intensity on exoplanets",
    summary:
      "Claim under dispute; dependent on stellar spectrum and atmospheric composition assumptions.",
    status: "flagged",
    votes: 158,
    comments: 23,
    author: "anon-9921",
    updated: "1d ago",
  },
];

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
  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-5xl px-4 py-8 space-y-6">
        {/* Top bar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:underline">
              <ArrowLeft className="h-4 w-4" />
              Back
            </Link>
            <h1 className="text-xl font-semibold">Community Feed</h1>
          </div>
          <div className="hidden items-center gap-2 md:flex">
            <Badge variant="outline">Verified humans</Badge>
            <Badge variant="outline">Anonymous reviews</Badge>
            <Badge variant="outline">On-chain</Badge>
            <Button asChild>
              <Link href="/submit" className="inline-flex items-center gap-2"><Plus className="h-4 w-4" /> Create fact</Link>
            </Button>
          </div>
        </div>

        {/* Feed list */}
        <div className="space-y-4">
          {sampleFacts.map((f) => (
            <Card key={f.id} variant="module" className="p-0">
              <div className="module-content">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="space-y-1">
                    <h3 className="text-base font-semibold">{f.title}</h3>
                    <p className="text-sm text-muted-foreground max-w-3xl">{f.summary}</p>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span>by {f.author}</span>
                      <span>·</span>
                      <span>{f.updated}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <StatusBadge status={f.status} />
                  </div>
                </div>
              </div>
              <div className="module-footer">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-4 text-muted-foreground">
                    <span className="inline-flex items-center gap-1"><GraduationCap className="h-4 w-4" /> {f.votes}</span>
                    <span className="inline-flex items-center gap-1"><MessageSquare className="h-4 w-4" /> {f.comments}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button size="sm" asChild><Link href={`/facts/${f.id}`}>Cap / No Cap</Link></Button>
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



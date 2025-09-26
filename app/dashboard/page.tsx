import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, CheckCircle2, Clock, AlertTriangle } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="min-h-screen">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 py-8 lg:grid-cols-12">
        {/* Sidebar */}
        <aside className="lg:col-span-3">
          <div className="module grain-card sticky top-4">
            <div className="module-header">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold tracking-wide">NOCAP</h2>
                <Badge variant="outline">Beta</Badge>
              </div>
            </div>
            <div className="module-content space-y-2">
              <Link href="/" className="block rounded-lg px-3 py-2 text-sm text-foreground/80 hover:bg-muted">Overview</Link>
              <Link href="#claims" className="block rounded-lg px-3 py-2 text-sm text-foreground/80 hover:bg-muted">Claims</Link>
              <Link href="#reviews" className="block rounded-lg px-3 py-2 text-sm text-foreground/80 hover:bg-muted">Reviews</Link>
              <Link href="#rewards" className="block rounded-lg px-3 py-2 text-sm text-foreground/80 hover:bg-muted">Rewards</Link>
              <Link href="#settings" className="block rounded-lg px-3 py-2 text-sm text-foreground/80 hover:bg-muted">Settings</Link>
            </div>
            <div className="module-footer">
              <Button className="w-full">Launch App</Button>
            </div>
          </div>
        </aside>

        {/* Main */}
        <main className="lg:col-span-9 space-y-6">
          {/* Topbar */}
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold">Overview</h1>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="hidden md:inline-flex">Verified humans</Badge>
              <Badge variant="outline" className="hidden md:inline-flex">Anonymous reviews</Badge>
              <Badge variant="outline" className="hidden md:inline-flex">On-chain</Badge>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {[{
              title: "Open claims",
              value: "128",
              icon: <Clock className="h-4 w-4" />,
            }, {
              title: "Verified facts",
              value: "2,341",
              icon: <CheckCircle2 className="h-4 w-4" />,
            }, {
              title: "Flagged items",
              value: "14",
              icon: <AlertTriangle className="h-4 w-4" />,
            }].map((s, i) => (
              <Card key={i} variant="module" className="p-0">
                <div className="module-content">
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span className="flex items-center gap-2">{s.icon} {s.title}</span>
                  </div>
                  <div className="mt-2 text-3xl font-semibold tracking-tight">{s.value}</div>
                </div>
              </Card>
            ))}
          </div>

          {/* Activity */}
          <Card variant="module" id="activity" className="p-0">
            <div className="module-header">
              <h2 className="text-base font-semibold">Recent activity</h2>
            </div>
            <div className="module-content p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="px-4 py-3">Claim</th>
                      <th className="px-4 py-3">Status</th>
                      <th className="px-4 py-3">Reviews</th>
                      <th className="px-4 py-3">Updated</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[{
                      claim: "Mars has liquid water present today",
                      status: "Under review",
                      reviews: 34,
                      updated: "2h ago",
                    }, {
                      claim: "Saturn's moon Enceladus has hydrothermal vents",
                      status: "Verified",
                      reviews: 128,
                      updated: "6h ago",
                    }, {
                      claim: "A new exoplanet was found in Alpha Centauri",
                      status: "Flagged",
                      reviews: 19,
                      updated: "1d ago",
                    }].map((row, i) => (
                      <tr key={i} className="border-b last:border-0">
                        <td className="px-4 py-3">{row.claim}</td>
                        <td className="px-4 py-3">
                          {row.status === "Verified" && (
                            <span className="inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs"><Shield className="h-3 w-3" />Verified</span>
                          )}
                          {row.status === "Under review" && (
                            <span className="inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs"><Clock className="h-3 w-3" />Under review</span>
                          )}
                          {row.status === "Flagged" && (
                            <span className="inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs"><AlertTriangle className="h-3 w-3" />Flagged</span>
                          )}
                        </td>
                        <td className="px-4 py-3">{row.reviews}</td>
                        <td className="px-4 py-3">{row.updated}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Card>
        </main>
      </div>
    </div>
  );
}



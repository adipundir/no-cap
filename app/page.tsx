import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ShieldCheck, Code, Coins } from "lucide-react";
import TextPressure from "@/components/TextPressure";

export default function Home() {
  return (
    <div className="page-bg min-h-screen flex flex-col select-none" style={{ userSelect: 'none', WebkitUserSelect: 'none', touchAction: 'manipulation' }}>
      {/* HERO SECTION */}
      <main className="flex-1 flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-4xl text-center">
          <div className="relative h-[240px] md:h-[300px] mb-4 md:mb-12">
            <TextPressure
              text="NOCAP"
              flex={true}
              alpha={false}
              stroke={false}
              width={true}
              weight={true}
              italic={true}
              textColor="var(--foreground)"
              strokeColor="#ff0000"
              minFontSize={60}
            />
          </div>
          
          <div className="space-y-5 md:space-y-6">
            <p className="text-[16px] md:text-lg text-muted-foreground max-w-2xl mx-auto">
              Community-driven fact verification. Anonymous reviews. On-chain transparency.
            </p>
            
            <Button size="lg" className="px-8 py-3 text-base md:text-lg" asChild>
              <a href="/feed">Launch App</a>
            </Button>

            {/* Minimal stats to fill space */}
            <div className="flex items-center justify-center space-x-8 text-xs text-muted-foreground">
            </div>
            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3 max-w-4xl mx-auto">
              <Card variant="module" className="p-4">
                <div className="flex flex-col items-center text-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-accent flex items-center justify-center shrink-0">
                    <ShieldCheck className="h-5 w-5 flex-shrink-0" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">Human-verified</div>
                    <p className="text-xs text-muted-foreground">Only verified humans can participate.</p>
                  </div>
                </div>
              </Card>
              <Card variant="module" className="p-4">
                <div className="flex flex-col items-center text-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-accent flex items-center justify-center shrink-0">
                    <Code className="h-5 w-5 flex-shrink-0" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">Developer API</div>
                    <p className="text-xs text-muted-foreground">SDK and REST endpoints for AI agents.</p>
                  </div>
                </div>
              </Card>
              <Card variant="module" className="p-4">
                <div className="flex flex-col items-center text-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-accent flex items-center justify-center shrink-0">
                    <Coins className="h-5 w-5 flex-shrink-0" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">On-chain rewards</div>
                    <p className="text-xs text-muted-foreground">Stake ETH. Earn for correct calls.</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-border py-8 text-center text-xs md:text-sm text-muted-foreground">
        <div className="mx-auto max-w-7xl px-4">
          © {new Date().getFullYear()} NOCAP — Verified humans, anonymous reviews
        </div>
      </footer>
    </div>
  );
}
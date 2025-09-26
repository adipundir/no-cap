import { Button } from "@/components/ui/button";
import TextPressure from "@/components/TextPressure";
import { Shield, Users, GraduationCap } from "lucide-react";
import { FloatingChips } from "@/components/floating-chips";

export default function Home() {
  return (
    <div className="page-bg min-h-screen flex flex-col">
      {/* HERO SECTION */}
      <main className="flex-1 flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-4xl">
          <div style={{ position: 'relative', height: '320px', marginBottom: '2rem' }}>
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
          
          <div className="relative text-center space-y-6">
            <p className="mt-2 text-[16px] md:text-lg text-muted-foreground max-w-2xl mx-auto">
              Community-driven fact verification. Anonymous reviews. On-chain transparency.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="px-8 py-3 text-base md:text-lg" asChild>
                <a href="/feed">Launch App</a>
              </Button>
              <Button size="lg" variant="outline" className="px-8 py-3 text-base md:text-lg" asChild>
                <a href="/world">World Mini App</a>
              </Button>
            </div>

            {/* Randomized floating chips */}
            <FloatingChips
              items={[
                { label: "On-chain", icon: <Shield className="h-4 w-4" /> },
                { label: "Anonymous caps", icon: <GraduationCap className="h-4 w-4" /> },
                { label: "Rewards", icon: <Users className="h-4 w-4" /> },
                { label: "Sybil-resistant" },
                { label: "Community-led" },
              ]}
            />
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground">
        <div className="mx-auto max-w-7xl px-4">
          © {new Date().getFullYear()} NOCAP — Verified humans, anonymous reviews
        </div>
      </footer>
    </div>
  );
}
import { Button } from "@/components/ui/button";
import TextPressure from "@/components/TextPressure";
import CardNav from "@/components/CardNav";
import { Shield, Vote, Users } from "lucide-react";
import { FloatingChips } from "@/components/floating-chips";

export default function Home() {
  return (
    <div className="page-bg min-h-screen flex flex-col">
      <CardNav
        items={[
          { label: "About", links: [ { label: "Company" }, { label: "Careers" } ] },
          { label: "Projects", links: [ { label: "Featured" }, { label: "Case Studies" } ] },
          { label: "Contact", links: [ { label: "Email" }, { label: "Twitter" }, { label: "LinkedIn" } ] }
        ]}
      />
      {/* HERO SECTION */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 pt-10 md:pt-14">
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
            
            <Button size="lg" className="px-8 py-3 text-base md:text-lg" asChild>
              <a href="/feed">Launch App</a>
            </Button>

            {/* Randomized floating chips */}
            <FloatingChips
              items={[
                { label: "On-chain", icon: <Shield className="h-4 w-4" /> },
                { label: "Anonymous votes", icon: <Vote className="h-4 w-4" /> },
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
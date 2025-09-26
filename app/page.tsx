import { Button } from "@/components/ui/button";
import TextPressure from "@/components/TextPressure";

export default function Home() {
  return (
    <div className="page-bg min-h-screen flex flex-col items-center justify-center">
      {/* HERO SECTION */}
      <main className="flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-4xl text-center">
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
          
          <div className="space-y-6">
            <p className="text-[16px] md:text-lg text-muted-foreground max-w-2xl mx-auto">
              Community-driven fact verification. Anonymous reviews. On-chain transparency.
            </p>
            
            <Button size="lg" className="px-8 py-3 text-base md:text-lg" asChild>
              <a href="/feed">Launch App</a>
            </Button>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="absolute bottom-0 w-full border-t border-border py-8 text-center text-sm text-muted-foreground">
        <div className="mx-auto max-w-7xl px-4">
          © {new Date().getFullYear()} NOCAP — Verified humans, anonymous reviews
        </div>
      </footer>
    </div>
  );
}
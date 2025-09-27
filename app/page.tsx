import { Button } from "@/components/ui/button";
import TextPressure from "@/components/TextPressure";
import CurvedLoop from "@/components/CurvedLoop";

export default function Home() {
  return (
    <div className="page-bg min-h-screen flex flex-col select-none" style={{ userSelect: 'none', WebkitUserSelect: 'none', touchAction: 'manipulation' }}>
      {/* HERO SECTION */}
      <main className="flex flex-col items-center justify-center px-4 py-8">
        <div className="w-full max-w-sm text-center">
          <div className="relative h-[180px] mb-4">
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
              minFontSize={50}
            />
          </div>
          
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground px-4">
              Community-driven fact verification. Anonymous reviews. On-chain transparency.
            </p>
            
            <Button size="lg" className="px-6 py-2" asChild>
              <a href="/feed">Launch App</a>
            </Button>

            {/* CurvedLoop Animation */}
            <div className="mt-6">
              <CurvedLoop 
                marqueeText="Verify ✦ Facts ✦ Earn ✦ Rewards ✦ Stay ✦ Anonymous ✦"
                speed={2}
                curveAmount={300}
                direction="right"
                interactive={true}
                className="text-muted-foreground"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
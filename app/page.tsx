import { Button } from "@/components/ui/button";
import TextPressure from "@/components/TextPressure";
import CurvedLoop from "@/components/CurvedLoop";

export default function Home() {
  return (
    <div className="page-bg min-h-screen flex flex-col select-none" style={{ userSelect: 'none', WebkitUserSelect: 'none', touchAction: 'manipulation' }}>
      {/* HERO SECTION */}
      <main className="flex flex-col items-center justify-center px-4 py-6 md:py-12 h-[100dvh] md:h-auto">
        <div className="w-full max-w-sm md:max-w-4xl text-center flex flex-col items-center justify-center">
          <div className="relative h-[150px] md:h-[260px] mb-10 mt-36 md:mb-20 w-full md:mt-0" >
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
          
          <div className="space-y-2 md:space-y-4">
            <p className="text-sm md:text-lg text-muted-foreground max-w-2xl mx-auto px-2 md:px-0 md:leading-relaxed mb-2">
              Community-driven fact verification. Anonymous reviews. On-chain transparency.
            </p>
            
            <Button size="lg" className="px-6 py-2 md:px-8 md:py-3 text-base md:text-lg mb-8 md:mb-12" asChild>
              <a href="/feed">Launch App</a>
            </Button>

            {/* CurvedLoop Animation */}
            <div className="mt-8 md:mt-12">
              <CurvedLoop 
                marqueeText="Verify ✦ Facts ✦ Earn ✦ Rewards ✦ Stay ✦ Anonymous ✦"
                speed={2}
                curveAmount={260}
                direction="right"
                interactive={true}
                topPadding={50}
                bottomPadding={8}
                className="text-muted-foreground"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
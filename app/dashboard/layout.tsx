import { WalletConnectButton } from "@/components/wallet-connect";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <div className="sticky top-0 z-40 w-full border-b bg-background/70 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-end px-4 py-3">
          <WalletConnectButton />
        </div>
      </div>
      {children}
    </div>
  );
}



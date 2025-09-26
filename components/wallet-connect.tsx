"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";

function truncate(addr: string): string {
  return addr.length > 10 ? `${addr.slice(0, 6)}…${addr.slice(-4)}` : addr;
}

export function WalletConnectButton() {
  const [address, setAddress] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  const connect = async () => {
    if (typeof window === "undefined") return;
    const eth = (window as any).ethereum;
    if (!eth) {
      alert("No wallet found. Please install a web3 wallet (e.g., MetaMask).");
      return;
    }
    try {
      setLoading(true);
      const accounts = await eth.request({ method: "eth_requestAccounts" });
      setAddress(accounts?.[0] ?? null);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button variant="outline" size="sm" onClick={connect} disabled={loading}>
      {address ? truncate(address) : loading ? "Connecting…" : "Connect Wallet"}
    </Button>
  );
}



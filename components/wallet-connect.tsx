"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";

function truncate(addr: string): string {
  return addr.length > 10 ? `${addr.slice(0, 6)}…${addr.slice(-4)}` : addr;
}

export function WalletConnectButton() {
  const [address, setAddress] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  // On mount, try to restore from provider/localStorage
  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const eth = (window as any).ethereum;
    const stored = window.localStorage.getItem("nocap:wallet");
    if (stored) setAddress(stored);
    const read = async () => {
      if (!eth) return;
      try {
        const accounts = await eth.request({ method: "eth_accounts" });
        if (accounts && accounts[0]) {
          setAddress(accounts[0]);
          window.localStorage.setItem("nocap:wallet", accounts[0]);
        }
      } catch {}
    };
    read();

    const onAccounts = (accs: string[]) => {
      const next = accs?.[0] ?? null;
      setAddress(next);
      if (next) window.localStorage.setItem("nocap:wallet", next);
      else window.localStorage.removeItem("nocap:wallet");
    };
    if (eth && eth.on) eth.on("accountsChanged", onAccounts);
    return () => {
      if (eth && eth.removeListener) eth.removeListener("accountsChanged", onAccounts);
    };
  }, []);

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
      const addr = accounts?.[0] ?? null;
      setAddress(addr);
      if (addr) window.localStorage.setItem("nocap:wallet", addr);
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



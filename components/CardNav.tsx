"use client";
import * as React from "react";
import Link from "next/link";
import { WalletConnectButton } from "@/components/wallet-connect";

export default function CardNav() {
  return (
    <div className="sticky top-0 z-50 w-full px-4 pt-4">
      <div className="module grain-card mx-auto w-full max-w-3xl rounded-full border bg-card shadow-sm">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="w-28" />
          <Link href="/" className="text-sm font-semibold tracking-wide">NOCAP</Link>
          <div className="w-28 flex justify-end"><WalletConnectButton /></div>
        </div>
      </div>
    </div>
  );
}



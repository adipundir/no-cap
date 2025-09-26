"use client";
import * as React from "react";
import Link from "next/link";

export default function CardNav() {
  return (
    <div className="sticky top-0 z-50 w-full px-4 pt-4">
      <div className="module grain-card mx-auto w-full max-w-3xl rounded-full border bg-card shadow-sm">
        <div className="flex items-center justify-center px-6 py-3 text-center">
          <Link href="/" className="text-sm font-semibold tracking-wide mx-auto">NOCAP</Link>
        </div>
      </div>
    </div>
  );
}



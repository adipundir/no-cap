"use client";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200/70 bg-white/70 backdrop-blur-md dark:border-gray-800 dark:bg-gray-950/60">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2 text-sm font-semibold">
          <div className="h-6 w-6 rounded bg-gray-900 dark:bg-gray-100" />
          NOCAP
        </Link>
        <nav className="hidden items-center gap-6 text-sm md:flex">
          <Link href="#how" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">How it works</Link>
          <Link href="#features" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">Features</Link>
          <Link href="#onchain" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">On-chain</Link>
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button className="hidden md:inline-flex">Launch app</Button>
        </div>
      </div>
    </header>
  );
}



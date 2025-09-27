import { NextResponse } from 'next/server';
import { ensureSeedFacts } from '@/lib/seed/facts';

export async function POST(): Promise<NextResponse> {
  await ensureSeedFacts();
  return NextResponse.json({ status: 'seeded' });
}


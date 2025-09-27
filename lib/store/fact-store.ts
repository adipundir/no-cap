import type { Fact } from '@/types/fact';
import type { WalrusBlobMetadata } from '@/types/walrus';

export type StoredFactRecord = {
  fact: Fact;
  walrusBlobId: string;
  walrusMetadata: WalrusBlobMetadata;
  availabilityCertificate?: string;
};

const factRecords = new Map<string, StoredFactRecord>();

export function upsertFactRecord(record: StoredFactRecord): void {
  factRecords.set(record.fact.id, record);
}

export function listFactRecords(): StoredFactRecord[] {
  return Array.from(factRecords.values());
}

export function getFactRecord(id: string): StoredFactRecord | undefined {
  return factRecords.get(id);
}

export function clearFactRecords(): void {
  factRecords.clear();
}

import type { Fact } from '@/types/fact';
import type { WalrusBlobMetadata } from '@/types/walrus';
import { writeFileSync, readFileSync, existsSync } from 'fs';
import { join } from 'path';

export type StoredFactRecord = {
  fact: Fact;
  walrusBlobId: string;
  walrusMetadata: WalrusBlobMetadata;
  availabilityCertificate?: string;
};

const factRecords = new Map<string, StoredFactRecord>();
const FACTS_CACHE_FILE = join(process.cwd(), '.next', 'facts-cache.json');

// Load cached facts on startup (development only)
function loadCachedFacts() {
  if (process.env.NODE_ENV === 'development' && existsSync(FACTS_CACHE_FILE)) {
    try {
      const cached = JSON.parse(readFileSync(FACTS_CACHE_FILE, 'utf-8'));
      for (const record of cached) {
        // Restore Date objects
        if (record.walrusMetadata.createdAt) {
          record.walrusMetadata.createdAt = new Date(record.walrusMetadata.createdAt);
        }
        if (record.walrusMetadata.expiresAt) {
          record.walrusMetadata.expiresAt = new Date(record.walrusMetadata.expiresAt);
        }
        factRecords.set(record.fact.id, record);
      }
    } catch (error) {
      console.log('Could not load cached facts:', error);
    }
  }
}

// Save facts to cache (development only)
function saveCachedFacts() {
  if (process.env.NODE_ENV === 'development') {
    try {
      const records = Array.from(factRecords.values());
      writeFileSync(FACTS_CACHE_FILE, JSON.stringify(records, null, 2));
    } catch (error) {
      console.log('Could not save facts cache:', error);
    }
  }
}

// Initialize cache
loadCachedFacts();

export function upsertFactRecord(record: StoredFactRecord): void {
  factRecords.set(record.fact.id, record);
  saveCachedFacts();
}

export function listFactRecords(): StoredFactRecord[] {
  return Array.from(factRecords.values());
}

export function getFactRecord(id: string): StoredFactRecord | undefined {
  return factRecords.get(id);
}

export function clearFactRecords(): void {
  factRecords.clear();
  saveCachedFacts();
}

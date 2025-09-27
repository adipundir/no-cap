import { initializeWalrusFromEnv } from '@/lib/walrus-integration';
import { upsertFactRecord, listFactRecords } from '@/lib/store/fact-store';
import { normalizeFullFact, generateFactChecksum } from '@/lib/utils/fact-normalizer';
import type { FullFact, Fact } from '@/types/fact';

import { COMPREHENSIVE_SAMPLE_FACTS } from './comprehensive-facts';

const SAMPLE_FACTS = COMPREHENSIVE_SAMPLE_FACTS;

let seeded = false;
let seedingPromise: Promise<void> | null = null;

export async function ensureSeedFacts(): Promise<void> {
  if (process.env.NODE_ENV === 'test') {
    return;
  }

  // Check if we have the basic seeded facts (not user-submitted ones)
  const currentFacts = listFactRecords();
  const hasSeededFacts = SAMPLE_FACTS.some(sample => 
    currentFacts.some(record => record.fact.id === sample.id)
  );

  if (hasSeededFacts) {
    seeded = true;
    return;
  }

  if (seedingPromise) {
    return seedingPromise;
  }

  seedingPromise = (async () => {
    try {
      const walrus = initializeWalrusFromEnv();
      await walrus.initialize();

      // Only seed facts that don't already exist
      const existingFactIds = new Set(listFactRecords().map(r => r.fact.id));

      for (const sample of SAMPLE_FACTS) {
        // Skip if this seeded fact already exists
        if (existingFactIds.has(sample.id)) {
          continue;
        }

        const { status, votes, comments, author, updated, walrusBlobId, contentHash, metadata, ...factContent } = sample;

        const stored = await walrus.storage.storeFact({
          ...factContent,
          metadata: {
            author: author,
            created: metadata.created,
            updated: metadata.lastModified,
            version: metadata.version,
          },
        });

        const fact: Fact = {
          id: sample.id,
          title: sample.title,
          summary: sample.summary,
          status: sample.status,
          votes: sample.votes,
          comments: sample.comments,
          author: sample.author,
          updated: sample.updated,
          walrusBlobId: stored.walrusMetadata.blobId,
          contentHash: sample.contentHash,
          metadata: metadata,
        };

        upsertFactRecord({
          fact,
          walrusBlobId: stored.walrusMetadata.blobId,
          walrusMetadata: stored.walrusMetadata,
        });
      }

      seeded = true;
    } catch (error) {
      console.error('Failed to seed sample facts:', error);
    } finally {
      seedingPromise = null;
    }
  })();

  return seedingPromise;
}


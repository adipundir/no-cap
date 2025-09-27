import { initializeWalrusFromEnv } from '@/lib/walrus-integration';
import { upsertFactRecord, listFactRecords } from '@/lib/store/fact-store';
import type { FullFact, Fact } from '@/types/fact';

const SAMPLE_FACTS: FullFact[] = [
  {
    id: 'galactic-ocean-1',
    title: "Saturn's moon Enceladus contains hydrothermal vents",
    summary: 'Cassini data suggests warm hydrothermal activity consistent with silica nanoparticles found in plumes.',
    fullContent: 'Cassini flybys detected silica nanoparticles in the plume of Enceladus. Their composition and size imply they formed in warm hydrothermal environments beneath the icy crust, suggesting liquid water pockets heated by tidal forces.',
    sources: ['https://saturn.jpl.nasa.gov/resources/7038/enceladus-hydrothermal-activity/'],
    metadata: {
      author: 'anon-4f8c',
      created: new Date('2024-06-01T12:00:00Z'),
      updated: new Date('2024-07-15T09:30:00Z'),
      version: 1,
      contentType: 'text/plain',
      tags: ['space', 'science'],
    },
    status: 'verified',
    votes: 1243,
    comments: 89,
    author: 'anon-4f8c',
    updated: '2h ago',
    walrusBlobId: undefined,
    contentHash: undefined,
  },
  {
    id: 'alpha-centauri-2',
    title: 'No confirmed exoplanets yet in Alpha Centauri',
    summary: 'A circulating blog post claims a discovery, but no peer-reviewed source currently corroborates it.',
    fullContent: 'Despite frequent rumors, the closest verified detection is the Proxima Centauri b discovery in 2016. The Alpha Centauri AB system has ongoing radial velocity campaigns, but no statistically significant detection has been published.',
    sources: ['https://www.eso.org/public/news/eso1629/'],
    metadata: {
      author: 'anon-a21e',
      created: new Date('2024-06-21T10:00:00Z'),
      updated: new Date('2024-08-02T11:15:00Z'),
      version: 1,
      contentType: 'text/plain',
      tags: ['space', 'verification'],
    },
    status: 'review',
    votes: 312,
    comments: 45,
    author: 'anon-a21e',
    updated: '6h ago',
    walrusBlobId: undefined,
    contentHash: undefined,
  },
  {
    id: 'bio-photosynthesis-3',
    title: 'Photosynthesis viability on low-light exoplanets is uncertain',
    summary: 'Claim under dispute; dependent on stellar spectrum and atmospheric composition assumptions.',
    fullContent: 'Modeling indicates that a red dwarf spectrum shifts photon energy toward longer wavelengths. Some photosynthetic pathways might adapt, but maintaining Earth-like yields requires atmospheric transparency and slow stellar flare activity.',
    sources: ['https://iopscience.iop.org/article/10.3847/PSJ/aaf1a9'],
    metadata: {
      author: 'anon-9921',
      created: new Date('2024-07-10T14:45:00Z'),
      updated: new Date('2024-07-26T08:20:00Z'),
      version: 1,
      contentType: 'text/plain',
      tags: ['biology', 'space'],
    },
    status: 'flagged',
    votes: 158,
    comments: 23,
    author: 'anon-9921',
    updated: '1d ago',
    walrusBlobId: undefined,
    contentHash: undefined,
  },
];

let seeded = false;
let seedingPromise: Promise<void> | null = null;

export async function ensureSeedFacts(): Promise<void> {
  if (seeded || process.env.NODE_ENV === 'test') {
    return;
  }

  if (listFactRecords().length > 0) {
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

      for (const sample of SAMPLE_FACTS) {
        const { status, votes, comments, author, updated, walrusBlobId, contentHash, metadata, ...factContent } = sample;

        const stored = await walrus.storage.storeFact({
          ...factContent,
          metadata: metadata,
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
          availabilityCertificate: stored.availabilityCertificate,
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


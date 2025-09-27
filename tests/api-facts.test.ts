import { describe, it, expect, beforeEach, vi } from 'vitest';
import { initializeWalrusFromEnv } from '@/lib/walrus-integration';
import { upsertFactRecord, clearFactRecords, listFactRecords } from '@/lib/store/fact-store';
import { GET as listFacts, POST as createFact } from '@/app/api/facts/route';

vi.mock('@/lib/walrus-integration', () => {
  const storeFact = vi.fn(async (fact: any) => ({
    factId: fact.id,
    content: fact,
    walrusMetadata: {
      blobId: 'blob-' + fact.id,
      size: JSON.stringify(fact).length,
      createdAt: new Date(),
    },
    availabilityCertificate: 'cert-' + fact.id,
  }));

  return {
    initializeWalrusFromEnv: vi.fn(() => ({
      initialize: vi.fn(async () => {}),
      storage: {
        storeFact,
      },
    })),
    __storeFactMock: storeFact,
  };
});

describe('Facts API', () => {
  beforeEach(() => {
    clearFactRecords();
    vi.mocked(initializeWalrusFromEnv).mockClear();
  });

  it('POST /api/facts stores fact and returns metadata', async () => {
    const payload = {
      id: 'fact-123',
      title: 'Test fact',
      summary: 'Summary',
      status: 'review',
      votes: 0,
      comments: 0,
      author: 'anon',
      updated: new Date().toISOString(),
      fullContent: 'Full content',
      sources: [],
      metadata: {
        author: 'anon',
        created: new Date().toISOString(),
        updated: new Date().toISOString(),
        version: 1,
        contentType: 'text/plain',
      },
    };

    const request = new Request('https://example.com/api/facts', {
      method: 'POST',
      body: JSON.stringify(payload),
    });

    const response = await createFact(request as any);
    expect(response.status).toBe(201);
    const body = await response.json();
    expect(body.fact.walrusBlobId).toBe('blob-fact-123');
    expect(listFactRecords().length).toBe(1);
  });

  it('GET /api/facts returns stored facts', async () => {
    upsertFactRecord({
      fact: {
        id: 'fact-1',
        title: 'Existing fact',
        summary: 'Summary',
        status: 'review',
        votes: 0,
        comments: 0,
        author: 'anon',
        updated: new Date().toISOString(),
        walrusBlobId: 'blob-fact-1',
      },
      walrusBlobId: 'blob-fact-1',
      walrusMetadata: {
        blobId: 'blob-fact-1',
        size: 10,
        createdAt: new Date(),
      },
    });

    const response = await listFacts();
    const body = await response.json();
    expect(body.facts).toHaveLength(1);
    expect(body.facts[0].id).toBe('fact-1');
  });
});


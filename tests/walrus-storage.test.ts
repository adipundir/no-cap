import { describe, it, expect, beforeEach, vi } from 'vitest';
import { WalrusStorageServiceImpl, MemoryWalrusCache } from '@/lib/walrus-storage';
import type { WalrusStorageConfig } from '@/types/walrus';

const storeBlobMock = vi.fn(async (data: Buffer | Uint8Array) => {
  return {
    blobId: 'blob-' + Buffer.from(data).toString('hex').slice(0, 6),
    certificate: 'certificate-123',
    transactionId: 'tx-abc',
  };
});

let retrieveBlobMockData: Record<string, Buffer> = {};

const retrieveBlobMock = vi.fn(async (blobId: string) => {
  if (!retrieveBlobMockData[blobId]) {
    throw new Error('Blob not found');
  }
  return retrieveBlobMockData[blobId];
});

vi.mock('@hibernuts/walrus-sdk', () => {
  return {
    WalrusSDK: class {
      constructor() {}
      storeBlob = storeBlobMock;
      retrieveBlob = retrieveBlobMock;
    },
  };
});

const baseConfig: WalrusStorageConfig = {
  aggregatorUrl: 'https://aggregator.local',
  publisherUrl: 'https://publisher.local',
};

describe('WalrusStorageServiceImpl', () => {
  beforeEach(() => {
    storeBlobMock.mockClear();
    retrieveBlobMock.mockClear();
    retrieveBlobMockData = {};
  });

  it('stores raw blobs and serves cached retrievals without hitting Walrus', async () => {
    const cache = new MemoryWalrusCache(1000);
    const service = new WalrusStorageServiceImpl(baseConfig, cache);

    const data = Buffer.from('hello walrus');
    const response = await service.storeBlob(data, { mimeType: 'text/plain' });

    expect(response.blobId).toMatch(/^blob-/);
    expect(storeBlobMock).toHaveBeenCalledTimes(1);

    retrieveBlobMockData[response.blobId] = data;

    const retrieved = await service.retrieveBlob(response.blobId);
    expect(retrieved.data.toString()).toBe('hello walrus');
    expect(retrieveBlobMock).not.toHaveBeenCalled();
  });

  it('falls back to Walrus retrieval when cache is disabled', async () => {
    const service = new WalrusStorageServiceImpl(baseConfig);
    const data = Buffer.from('direct walrus');
    const blobId = 'blob-direct';
    retrieveBlobMockData[blobId] = data;

    const retrieved = await service.retrieveBlob(blobId);
    expect(retrieved.data.toString()).toBe('direct walrus');
    expect(retrieveBlobMock).toHaveBeenCalledTimes(1);
  });

  it('serializes fact content into Walrus', async () => {
    const service = new WalrusStorageServiceImpl(baseConfig);

    const fact = {
      id: 'fact-1',
      title: 'Sample fact',
      summary: 'Stored via Walrus',
      fullContent: 'Detailed explanation',
      sources: ['https://example.com'],
      metadata: {
        author: 'anon',
        created: new Date('2024-01-01T00:00:00.000Z'),
        updated: new Date('2024-01-01T00:00:00.000Z'),
        version: 1,
      },
    };

    const result = await service.storeFact(fact);
    expect(storeBlobMock).toHaveBeenCalledWith(expect.any(Buffer));
    expect(result.factId).toBe('fact-1');
    expect(result.walrusMetadata.blobId).toMatch(/^blob-/);

    const storedBuffer = storeBlobMock.mock.calls[0][0] as Buffer;
    const storedJson = JSON.parse(storedBuffer.toString('utf-8'));
    expect(storedJson.title).toBe('Sample fact');
    expect(storedJson.metadata.author).toBe('anon');
  });

  it('wraps Walrus errors when storage fails', async () => {
    storeBlobMock.mockRejectedValueOnce(new Error('network down'));
    const service = new WalrusStorageServiceImpl(baseConfig);

    await expect(service.storeBlob('fail')).rejects.toThrowError(/network down/);
  });
});


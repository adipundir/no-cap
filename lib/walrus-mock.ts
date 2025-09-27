// Mock Walrus SDK for development when real endpoints aren't available
import { writeFileSync, readFileSync, existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';

const MOCK_STORAGE_DIR = '.next/walrus-blobs';
const MOCK_INDEX_FILE = '.next/walrus-blobs/index.json';

export class MockWalrusSDK {
  private config: any;
  private mockStorage: Map<string, Buffer> = new Map();

  constructor(config: any) {
    this.config = config;
    this.loadFromDisk();
  }

  private loadFromDisk() {
    try {
      if (existsSync(MOCK_INDEX_FILE)) {
        const indexData = JSON.parse(readFileSync(MOCK_INDEX_FILE, 'utf-8'));
        Object.keys(indexData).forEach(blobId => {
          const filePath = join(process.cwd(), MOCK_STORAGE_DIR, `${blobId}.blob`);
          if (existsSync(filePath)) {
            const data = readFileSync(filePath);
            this.mockStorage.set(blobId, data);
          }
        });
        console.log(`Loaded ${this.mockStorage.size} mock Walrus blobs from disk`);
      }
    } catch (error) {
      console.log('Could not load mock Walrus storage:', error);
    }
  }

  private saveToDisk(blobId: string, data: Buffer) {
    try {
      const storageDir = join(process.cwd(), MOCK_STORAGE_DIR);
      if (!existsSync(storageDir)) {
        mkdirSync(storageDir, { recursive: true });
      }

      // Save blob data
      const blobPath = join(storageDir, `${blobId}.blob`);
      writeFileSync(blobPath, data);

      // Update index
      let index: Record<string, boolean> = {};
      if (existsSync(MOCK_INDEX_FILE)) {
        index = JSON.parse(readFileSync(MOCK_INDEX_FILE, 'utf-8'));
      }
      index[blobId] = true;
      writeFileSync(MOCK_INDEX_FILE, JSON.stringify(index, null, 2));
    } catch (error) {
      console.error('Could not save mock blob to disk:', error);
    }
  }

  async storeBlob(data: Buffer | Uint8Array): Promise<{
    blobId: string;
    certificate?: string;
    transactionId?: string;
  }> {
    // Generate a mock blob ID
    const blobId = `mock-blob-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    // Store the data in our mock storage
    const buffer = Buffer.from(data);
    this.mockStorage.set(blobId, buffer);
    
    // Persist to disk
    this.saveToDisk(blobId, buffer);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 100));
    
    return {
      blobId,
      certificate: `mock-cert-${blobId}`,
      transactionId: `mock-tx-${blobId}`,
    };
  }

  async retrieveBlob(blobId: string): Promise<Buffer> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 50));
    
    const data = this.mockStorage.get(blobId);
    if (!data) {
      throw new Error(`Mock blob not found: ${blobId}`);
    }
    
    return data;
  }
}

// Environment flag to use mock instead of real SDK
export const shouldUseMockWalrus = process.env.WALRUS_USE_MOCK === 'true' || 
  process.env.NODE_ENV === 'development';

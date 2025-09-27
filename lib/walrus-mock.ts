import { writeFileSync, readFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';

// Mock Walrus SDK for development when real endpoints aren't available
export class MockWalrusSDK {
  private config: any;
  private mockStorage: Map<string, Buffer> = new Map();
  private blobsDirectory: string;
  private indexFile: string;

  constructor(config: any) {
    this.config = config;
    this.blobsDirectory = join(process.cwd(), '.next', 'walrus-blobs');
    this.indexFile = join(this.blobsDirectory, 'blob-index.json');
    
    // Ensure directory exists
    if (!existsSync(this.blobsDirectory)) {
      mkdirSync(this.blobsDirectory, { recursive: true });
    }
    
    // Load existing blobs from disk
    this.loadFromDisk();
  }

  async storeBlob(data: Buffer | Uint8Array): Promise<{
    blobId: string;
    certificate?: string;
    transactionId?: string;
  }> {
    // Generate a mock blob ID
    const blobId = `mock-blob-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    // Store the data in our mock storage and persist to disk
    const buffer = Buffer.from(data);
    this.mockStorage.set(blobId, buffer);
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
    
    let data = this.mockStorage.get(blobId);
    
    // If not in memory, try to load from disk
    if (!data) {
      const diskData = this.loadBlobFromDisk(blobId);
      if (diskData) {
        data = diskData;
        this.mockStorage.set(blobId, data);
      }
    }
    
    if (!data) {
      throw new Error(`Mock blob not found: ${blobId}`);
    }
    
    return data;
  }

  private loadFromDisk(): void {
    if (existsSync(this.indexFile)) {
      try {
        const indexData = JSON.parse(readFileSync(this.indexFile, 'utf-8'));
        const blobIds: string[] = indexData.blobIds || [];
        
        for (const blobId of blobIds) {
          const blobData = this.loadBlobFromDisk(blobId);
          if (blobData) {
            this.mockStorage.set(blobId, blobData);
          }
        }
        
        console.log(`Loaded ${blobIds.length} blobs from disk`);
      } catch (error) {
        console.error('Failed to load blob index:', error);
      }
    }
  }

  private loadBlobFromDisk(blobId: string): Buffer | null {
    try {
      const blobPath = join(this.blobsDirectory, `${blobId}.blob`);
      if (existsSync(blobPath)) {
        return readFileSync(blobPath);
      }
    } catch (error) {
      console.error(`Failed to load blob ${blobId} from disk:`, error);
    }
    return null;
  }

  private saveToDisk(blobId: string, data: Buffer): void {
    try {
      // Save blob data
      const blobPath = join(this.blobsDirectory, `${blobId}.blob`);
      writeFileSync(blobPath, data);
      
      // Update index
      this.updateBlobIndex(blobId);
    } catch (error) {
      console.error(`Failed to save blob ${blobId} to disk:`, error);
    }
  }

  private updateBlobIndex(blobId: string): void {
    try {
      let indexData = { blobIds: [] as string[] };
      
      if (existsSync(this.indexFile)) {
        indexData = JSON.parse(readFileSync(this.indexFile, 'utf-8'));
      }
      
      if (!indexData.blobIds.includes(blobId)) {
        indexData.blobIds.push(blobId);
        writeFileSync(this.indexFile, JSON.stringify(indexData, null, 2));
      }
    } catch (error) {
      console.error('Failed to update blob index:', error);
    }
  }
}

// Environment flag to use mock instead of real SDK
export const shouldUseMockWalrus = process.env.WALRUS_USE_MOCK === 'true' || 
  process.env.NODE_ENV === 'development';

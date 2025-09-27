// Mock Walrus SDK for development when real endpoints aren't available
export class MockWalrusSDK {
  private config: any;
  private mockStorage: Map<string, Buffer> = new Map();

  constructor(config: any) {
    this.config = config;
  }

  async storeBlob(data: Buffer | Uint8Array): Promise<{
    blobId: string;
    certificate?: string;
    transactionId?: string;
  }> {
    // Generate a mock blob ID
    const blobId = `mock-blob-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    // Store the data in our mock storage
    this.mockStorage.set(blobId, Buffer.from(data));
    
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

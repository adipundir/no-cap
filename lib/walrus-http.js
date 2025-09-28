// Walrus HTTP API Integration - No Sui Wallet Required!
// Uses direct HTTP calls to Walrus publisher/aggregator endpoints
const WALRUS_HTTP_CONFIG = {
    publisherUrl: process.env.NEXT_PUBLIC_WALRUS_PUBLISHER_URL || 'https://publisher.walrus-testnet.walrus.space',
    aggregatorUrl: process.env.NEXT_PUBLIC_WALRUS_AGGREGATOR_URL || 'https://aggregator.walrus-testnet.walrus.space',
    maxBlobSize: 10 * 1024 * 1024, // 10MB
};
/**
 * Walrus HTTP Service - Direct API calls, no Sui wallet needed!
 * Perfect for World Chain apps that need decentralized storage
 */
export class WalrusHttpService {
    constructor(config) {
        this.config = { ...WALRUS_HTTP_CONFIG, ...config };
    }
    /**
     * Store blob using HTTP PUT to Walrus publisher
     * No Sui wallet required - just HTTP!
     */
    async storeBlob(data, epochs = 5) {
        try {
            // Convert data to Uint8Array
            let blob;
            if (typeof data === 'string') {
                blob = new Uint8Array(Buffer.from(data, 'utf-8'));
            }
            else if (Buffer.isBuffer(data)) {
                blob = new Uint8Array(data);
            }
            else {
                blob = data;
            }
            // Check size limit
            if (blob.length > this.config.maxBlobSize) {
                throw new Error(`Blob too large: ${blob.length} bytes (max: ${this.config.maxBlobSize})`);
            }
            console.log(`📤 Storing ${blob.length} bytes on Walrus via HTTP...`);
            // Store via HTTP PUT
            const response = await fetch(`${this.config.publisherUrl}/v1/store?epochs=${epochs}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/octet-stream',
                },
                body: blob,
            });
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Walrus store failed: ${response.status} ${response.statusText} - ${errorText}`);
            }
            const result = await response.json();
            console.log('✅ Stored on Walrus:', {
                blobId: result.newlyCreated?.blobObject?.blobId || result.alreadyCertified?.blobId,
                size: blob.length
            });
            return {
                blobId: result.newlyCreated?.blobObject?.blobId || result.alreadyCertified?.blobId,
                size: blob.length,
                encodedSize: result.newlyCreated?.blobObject?.encodedSize || blob.length,
                cost: result.cost || '0'
            };
        }
        catch (error) {
            console.error('❌ Walrus store error:', error);
            throw new Error(`Failed to store on Walrus: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }
    /**
     * Retrieve blob using HTTP GET from Walrus aggregator
     * No wallet needed - just HTTP!
     */
    async retrieveBlob(blobId) {
        try {
            console.log(`📥 Retrieving blob ${blobId} from Walrus...`);
            const response = await fetch(`${this.config.aggregatorUrl}/v1/${blobId}`, {
                method: 'GET',
            });
            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error(`Blob not found: ${blobId}`);
                }
                const errorText = await response.text();
                throw new Error(`Walrus retrieve failed: ${response.status} ${response.statusText} - ${errorText}`);
            }
            const arrayBuffer = await response.arrayBuffer();
            const data = new Uint8Array(arrayBuffer);
            console.log('✅ Retrieved from Walrus:', {
                blobId,
                size: data.length,
                contentType: response.headers.get('content-type')
            });
            return {
                data,
                contentType: response.headers.get('content-type') || undefined,
                size: data.length
            };
        }
        catch (error) {
            console.error('❌ Walrus retrieve error:', error);
            throw new Error(`Failed to retrieve from Walrus: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }
    /**
     * Store JSON data on Walrus
     */
    async storeJSON(data, epochs = 5) {
        const jsonString = JSON.stringify(data, null, 2);
        return this.storeBlob(jsonString, epochs);
    }
    /**
     * Retrieve and parse JSON data from Walrus
     */
    async retrieveJSON(blobId) {
        const result = await this.retrieveBlob(blobId);
        const text = new TextDecoder().decode(result.data);
        return JSON.parse(text);
    }
    /**
     * Check if blob exists on Walrus
     */
    async blobExists(blobId) {
        try {
            const response = await fetch(`${this.config.aggregatorUrl}/v1/${blobId}`, {
                method: 'HEAD', // Just check headers, don't download
            });
            return response.ok;
        }
        catch (error) {
            return false;
        }
    }
    /**
     * Get blob info without downloading content
     */
    async getBlobInfo(blobId) {
        try {
            const response = await fetch(`${this.config.aggregatorUrl}/v1/${blobId}`, {
                method: 'HEAD',
            });
            if (!response.ok) {
                return { exists: false };
            }
            return {
                exists: true,
                size: response.headers.get('content-length') ? parseInt(response.headers.get('content-length')) : undefined,
                contentType: response.headers.get('content-type') || undefined
            };
        }
        catch (error) {
            return { exists: false };
        }
    }
    /**
     * Health check for Walrus endpoints
     */
    async healthCheck() {
        const checkEndpoint = async (url) => {
            const start = Date.now();
            try {
                const response = await fetch(url, { method: 'HEAD' });
                return {
                    status: response.ok ? 'healthy' : 'unhealthy',
                    latency: Date.now() - start
                };
            }
            catch (error) {
                return {
                    status: 'unhealthy',
                    latency: Date.now() - start
                };
            }
        };
        const [publisher, aggregator] = await Promise.all([
            checkEndpoint(this.config.publisherUrl),
            checkEndpoint(this.config.aggregatorUrl)
        ]);
        return { publisher, aggregator };
    }
    /**
     * Batch store multiple blobs
     */
    async storeBatch(blobs, epochs = 5) {
        const results = [];
        // Process in parallel for better performance
        const promises = blobs.map(blob => this.storeBlob(blob, epochs));
        const settled = await Promise.allSettled(promises);
        for (const result of settled) {
            if (result.status === 'fulfilled') {
                results.push(result.value);
            }
            else {
                console.error('Batch store error:', result.reason);
            }
        }
        return results;
    }
    /**
     * Batch retrieve multiple blobs
     */
    async retrieveBatch(blobIds) {
        const promises = blobIds.map(async (blobId) => {
            try {
                return await this.retrieveBlob(blobId);
            }
            catch (error) {
                console.error(`Batch retrieve error for ${blobId}:`, error);
                return null;
            }
        });
        return Promise.all(promises);
    }
}
// Global instance
let walrusHttpService = null;
/**
 * Get or create the global Walrus HTTP service
 */
export function getWalrusHttpService() {
    if (!walrusHttpService) {
        walrusHttpService = new WalrusHttpService();
    }
    return walrusHttpService;
}
/**
 * Initialize Walrus HTTP service with custom config
 */
export function initializeWalrusHttp(config) {
    walrusHttpService = new WalrusHttpService(config);
    return walrusHttpService;
}
export default WalrusHttpService;

/**
 * NOCAP SDK Utilities
 * 
 * TODO: Restore full utilities after fixing type definitions
 * Temporarily simplified for build
 */

/**
 * Validate a fact ID
 */
export function validateFactId(factId: string): boolean {
  return typeof factId === 'string' && factId.length > 0
}

/**
 * Format a timestamp
 */
export function formatTimestamp(timestamp: string | Date): string {
  const date = typeof timestamp === 'string' ? new Date(timestamp) : timestamp
  return date.toISOString()
}

/**
 * Generate a unique ID
 */
export function generateId(): string {
  return Math.random().toString(36).substr(2, 9)
}

/**
 * Sleep utility
 */
export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * Retry utility
 */
export async function retry<T>(
  fn: () => Promise<T>,
  maxAttempts: number = 3,
  delay: number = 1000
): Promise<T> {
  let lastError: Error
  
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn()
    } catch (error) {
      lastError = error as Error
      if (attempt < maxAttempts) {
        await sleep(delay * attempt)
      }
    }
  }
  
  throw lastError!
}
/**
 * NOCAP SDK Examples
 * 
 * TODO: Fix examples after type definitions are restored
 * Temporarily simplified for build
 */

import { NOCAPClient } from './client'

export async function runExamples() {
  console.log('NOCAP SDK Examples - Temporarily disabled for build')
  console.log('TODO: Restore examples after fixing type definitions')
  
  const client = new NOCAPClient()
  
  // Basic example
  const facts = await client.getFacts()
  console.log('Sample facts:', facts)
  
  return facts
}

// Export for testing
export default runExamples
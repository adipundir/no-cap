import crypto from 'crypto';
import { Fact, FactTag } from '@/types/fact';

export type WebhookEvent = 
  | 'fact.created'
  | 'fact.updated' 
  | 'fact.verified'
  | 'fact.flagged'
  | 'fact.tagged'
  | 'tag.created';

export interface WebhookSubscription {
  id: string;
  url: string;
  events: WebhookEvent[];
  userId?: string;
  tags?: string[]; // Filter by specific tags
  categories?: string[]; // Filter by tag categories
  secret?: string; // For signature verification
  active: boolean;
  createdAt: Date;
  lastDelivered?: Date;
  failureCount: number;
}

export interface WebhookPayload {
  event: WebhookEvent;
  timestamp: string;
  data: {
    fact?: Fact;
    tags?: FactTag[];
    changes?: Record<string, any>;
  };
  subscription: {
    id: string;
    events: WebhookEvent[];
  };
}

// In-memory storage (would use database in production)
const webhookSubscriptions = new Map<string, WebhookSubscription>();
const deliveryQueue: Array<{ subscription: WebhookSubscription; payload: WebhookPayload }> = [];

/**
 * Register a new webhook subscription
 */
export function registerWebhook(params: {
  url: string;
  events: WebhookEvent[];
  userId?: string;
  tags?: string[];
  categories?: string[];
  secret?: string;
}): WebhookSubscription {
  const id = crypto.randomUUID();
  
  const subscription: WebhookSubscription = {
    id,
    url: params.url,
    events: params.events,
    userId: params.userId,
    tags: params.tags,
    categories: params.categories,
    secret: params.secret,
    active: true,
    createdAt: new Date(),
    failureCount: 0
  };

  webhookSubscriptions.set(id, subscription);
  return subscription;
}

/**
 * Remove a webhook subscription
 */
export function unregisterWebhook(id: string): boolean {
  return webhookSubscriptions.delete(id);
}

/**
 * Get webhook subscriptions for a user
 */
export function getUserWebhooks(userId: string): WebhookSubscription[] {
  return Array.from(webhookSubscriptions.values())
    .filter(sub => sub.userId === userId);
}

/**
 * Trigger webhook event
 */
export async function triggerWebhookEvent(
  event: WebhookEvent,
  data: WebhookPayload['data']
): Promise<void> {
  const relevantSubscriptions = Array.from(webhookSubscriptions.values())
    .filter(sub => {
      if (!sub.active) return false;
      if (!sub.events.includes(event)) return false;

      // Filter by tags if specified
      if (sub.tags && data.fact) {
        const factTags = data.fact.metadata?.tags?.map(t => t.name) || [];
        if (!sub.tags.some(tag => factTags.includes(tag))) return false;
      }

      // Filter by categories if specified
      if (sub.categories && data.fact) {
        const factCategories = data.fact.metadata?.tags?.map(t => t.category) || [];
        if (!sub.categories.some(cat => factCategories.includes(cat as any))) return false;
      }

      return true;
    });

  // Queue webhooks for delivery
  for (const subscription of relevantSubscriptions) {
    const payload: WebhookPayload = {
      event,
      timestamp: new Date().toISOString(),
      data,
      subscription: {
        id: subscription.id,
        events: subscription.events
      }
    };

    deliveryQueue.push({ subscription, payload });
  }

  // Process delivery queue
  await processDeliveryQueue();
}

/**
 * Process webhook delivery queue
 */
async function processDeliveryQueue(): Promise<void> {
  while (deliveryQueue.length > 0) {
    const item = deliveryQueue.shift();
    if (!item) continue;

    try {
      await deliverWebhook(item.subscription, item.payload);
      item.subscription.lastDelivered = new Date();
      item.subscription.failureCount = 0;
    } catch (error) {
      console.error(`Webhook delivery failed for ${item.subscription.id}:`, error);
      item.subscription.failureCount++;
      
      // Disable subscription after 10 failures
      if (item.subscription.failureCount >= 10) {
        item.subscription.active = false;
        console.warn(`Webhook ${item.subscription.id} disabled due to repeated failures`);
      } else {
        // Retry with exponential backoff
        setTimeout(() => {
          deliveryQueue.push(item);
        }, Math.pow(2, item.subscription.failureCount) * 1000);
      }
    }
  }
}

/**
 * Deliver webhook to endpoint
 */
async function deliverWebhook(
  subscription: WebhookSubscription,
  payload: WebhookPayload
): Promise<void> {
  const body = JSON.stringify(payload);
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'User-Agent': 'No-Cap-Webhooks/1.0',
    'X-Webhook-Event': payload.event,
    'X-Webhook-ID': subscription.id,
    'X-Webhook-Timestamp': payload.timestamp
  };

  // Add signature if secret is configured
  if (subscription.secret) {
    const signature = crypto
      .createHmac('sha256', subscription.secret)
      .update(body)
      .digest('hex');
    headers['X-Webhook-Signature'] = `sha256=${signature}`;
  }

  const response = await fetch(subscription.url, {
    method: 'POST',
    headers,
    body,
    signal: AbortSignal.timeout(10000) // 10 second timeout
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }
}

/**
 * Verify webhook signature
 */
export function verifyWebhookSignature(
  payload: string,
  signature: string,
  secret: string
): boolean {
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');
  
  const receivedSignature = signature.replace('sha256=', '');
  return crypto.timingSafeEqual(
    Buffer.from(expectedSignature, 'hex'),
    Buffer.from(receivedSignature, 'hex')
  );
}

/**
 * Convenience functions for common webhook events
 */
export async function triggerFactCreated(fact: Fact): Promise<void> {
  await triggerWebhookEvent('fact.created', { fact });
}

export async function triggerFactVerified(fact: Fact): Promise<void> {
  await triggerWebhookEvent('fact.verified', { fact });
}

export async function triggerFactTagged(fact: Fact, tags: FactTag[]): Promise<void> {
  await triggerWebhookEvent('fact.tagged', { fact, tags });
}

export async function triggerFactUpdated(
  fact: Fact, 
  changes: Record<string, any>
): Promise<void> {
  await triggerWebhookEvent('fact.updated', { fact, changes });
}

/**
 * Get webhook statistics
 */
export function getWebhookStats(): {
  totalSubscriptions: number;
  activeSubscriptions: number;
  failedSubscriptions: number;
  queueLength: number;
} {
  const subscriptions = Array.from(webhookSubscriptions.values());
  
  return {
    totalSubscriptions: subscriptions.length,
    activeSubscriptions: subscriptions.filter(s => s.active).length,
    failedSubscriptions: subscriptions.filter(s => s.failureCount > 0).length,
    queueLength: deliveryQueue.length
  };
}

/**
 * Clean up inactive subscriptions
 */
export function cleanupWebhooks(): number {
  let removed = 0;
  for (const [id, subscription] of webhookSubscriptions.entries()) {
    // Remove subscriptions that have been inactive for 30 days
    const daysSinceLastDelivery = subscription.lastDelivered
      ? (Date.now() - subscription.lastDelivered.getTime()) / (1000 * 60 * 60 * 24)
      : (Date.now() - subscription.createdAt.getTime()) / (1000 * 60 * 60 * 24);
      
    if (!subscription.active && daysSinceLastDelivery > 30) {
      webhookSubscriptions.delete(id);
      removed++;
    }
  }
  return removed;
}

// Export for testing and admin functions
export { webhookSubscriptions, deliveryQueue };

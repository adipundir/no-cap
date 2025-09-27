import { NextRequest, NextResponse } from 'next/server';
import {
  registerWebhook,
  unregisterWebhook,
  getUserWebhooks,
  getWebhookStats,
  cleanupWebhooks,
  WebhookEvent
} from '@/lib/webhooks';
import { withAPIAuth } from '@/lib/api-auth';

/**
 * GET /api/webhooks
 * Get user's webhook subscriptions or webhook stats
 */
export const GET = withAPIAuth('read')(async (request: NextRequest, apiKey) => {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId') || apiKey.userId;
    const stats = searchParams.get('stats') === 'true';

    if (stats) {
      // Return system stats (admin only)
      const webhookStats = getWebhookStats();
      return NextResponse.json({ stats: webhookStats });
    }

    if (userId) {
      const webhooks = getUserWebhooks(userId);
      // Don't expose secrets in the response
      const safeWebhooks = webhooks.map(webhook => ({
        ...webhook,
        secret: webhook.secret ? '••••••••' : undefined
      }));
      
      return NextResponse.json({ webhooks: safeWebhooks });
    }

    return NextResponse.json({
      message: 'Webhook Management API',
      availableEvents: [
        'fact.created',
        'fact.updated', 
        'fact.verified',
        'fact.flagged',
        'fact.tagged',
        'tag.created'
      ],
      documentation: 'https://your-domain.com/docs/webhooks'
    });

  } catch (error) {
    console.error('Webhooks GET error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
});

/**
 * POST /api/webhooks
 * Register a new webhook subscription
 */
export const POST = withAPIAuth('write')(async (request: NextRequest, apiKey) => {
  try {
    const body = await request.json();
    const {
      url,
      events,
      tags,
      categories,
      secret
    }: {
      url: string;
      events: WebhookEvent[];
      tags?: string[];
      categories?: string[];
      secret?: string;
    } = body;

    // Validation
    if (!url || !events || events.length === 0) {
      return NextResponse.json({
        error: 'URL and events are required'
      }, { status: 400 });
    }

    // Validate URL format
    try {
      new URL(url);
    } catch {
      return NextResponse.json({
        error: 'Invalid URL format'
      }, { status: 400 });
    }

    // Validate events
    const validEvents: WebhookEvent[] = [
      'fact.created', 'fact.updated', 'fact.verified', 
      'fact.flagged', 'fact.tagged', 'tag.created'
    ];
    
    const invalidEvents = events.filter(event => !validEvents.includes(event));
    if (invalidEvents.length > 0) {
      return NextResponse.json({
        error: `Invalid events: ${invalidEvents.join(', ')}. Valid events: ${validEvents.join(', ')}`
      }, { status: 400 });
    }

    // Register webhook
    const webhook = registerWebhook({
      url,
      events,
      userId: apiKey.userId,
      tags,
      categories,
      secret
    });

    return NextResponse.json({
      message: 'Webhook registered successfully',
      webhook: {
        id: webhook.id,
        url: webhook.url,
        events: webhook.events,
        tags: webhook.tags,
        categories: webhook.categories,
        active: webhook.active,
        createdAt: webhook.createdAt,
        secret: webhook.secret ? '••••••••' : undefined
      }
    }, { status: 201 });

  } catch (error) {
    console.error('Webhook registration error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
});

/**
 * DELETE /api/webhooks/{id}
 * Remove a webhook subscription
 */
export async function DELETE(request: NextRequest): Promise<NextResponse> {
  try {
    // Extract webhook ID from URL
    const url = new URL(request.url);
    const pathSegments = url.pathname.split('/');
    const webhookId = pathSegments[pathSegments.length - 1];

    if (!webhookId || webhookId === 'webhooks') {
      return NextResponse.json({
        error: 'Webhook ID is required'
      }, { status: 400 });
    }

    const success = unregisterWebhook(webhookId);
    
    if (success) {
      return NextResponse.json({
        message: 'Webhook unregistered successfully',
        webhookId
      });
    } else {
      return NextResponse.json({
        error: 'Webhook not found'
      }, { status: 404 });
    }

  } catch (error) {
    console.error('Webhook deletion error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

/**
 * PUT /api/webhooks/{id}
 * Update a webhook subscription
 */
export async function PUT(request: NextRequest): Promise<NextResponse> {
  try {
    const url = new URL(request.url);
    const pathSegments = url.pathname.split('/');
    const webhookId = pathSegments[pathSegments.length - 1];

    if (!webhookId || webhookId === 'webhooks') {
      return NextResponse.json({
        error: 'Webhook ID is required'
      }, { status: 400 });
    }

    const body = await request.json();
    const { active }: { active?: boolean } = body;

    // For now, only support activating/deactivating webhooks
    // Full update functionality would require more complex logic
    
    return NextResponse.json({
      message: 'Webhook update functionality coming soon',
      supportedUpdates: ['active status'],
      currentlySupported: false
    }, { status: 501 });

  } catch (error) {
    console.error('Webhook update error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

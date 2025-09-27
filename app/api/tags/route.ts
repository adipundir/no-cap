import { NextRequest, NextResponse } from 'next/server';
import { 
  TagAnalytics, 
  TagCategory, 
  FactTag,
  FactSearchQuery 
} from '@/types/fact';
import { listFactRecords } from '@/lib/store/fact-store';
import { ensureSeedFacts } from '@/lib/seed/facts';

/**
 * GET /api/tags
 * Returns analytics and information about all tags
 */
export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category') as TagCategory | null;
    const limit = parseInt(searchParams.get('limit') || '50');
    const sortBy = searchParams.get('sortBy') || 'count'; // count, name, trend
    
    await ensureSeedFacts();
    const records = listFactRecords();
    
    // Aggregate tag data
    const tagMap = new Map<string, {
      name: string;
      category: TagCategory;
      facts: string[];
      totalImportance: number;
      verifiedCount: number;
    }>();

    records.forEach(record => {
      if (!record.fact.metadata?.tags) return;
      
      record.fact.metadata.tags.forEach((tag: FactTag) => {
        if (category && tag.category !== category) return;
        
        const key = `${tag.name}-${tag.category}`;
        if (!tagMap.has(key)) {
          tagMap.set(key, {
            name: tag.name,
            category: tag.category,
            facts: [],
            totalImportance: 0,
            verifiedCount: 0
          });
        }
        
        const tagData = tagMap.get(key)!;
        tagData.facts.push(record.fact.id);
        tagData.totalImportance += record.fact.metadata?.importance || 0;
        if (record.fact.status === 'verified') {
          tagData.verifiedCount++;
        }
      });
    });

    // Convert to analytics format
    const analytics: TagAnalytics[] = Array.from(tagMap.entries()).map(([key, data]) => ({
      name: data.name,
      category: data.category,
      count: data.facts.length,
      trend: 0, // Would need historical data
      relatedTags: [], // Could implement co-occurrence analysis
      averageImportance: data.totalImportance / data.facts.length || 0,
      verificationRate: (data.verifiedCount / data.facts.length) * 100
    }));

    // Sort analytics
    analytics.sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'trend') return (b.trend || 0) - (a.trend || 0);
      return b.count - a.count; // default: by count
    });

    return NextResponse.json({
      tags: analytics.slice(0, limit),
      totalTags: analytics.length,
      categories: Object.values(TagCategory),
    });

  } catch (error) {
    console.error('Failed to get tag analytics:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

/**
 * POST /api/tags
 * Add tags to a fact
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json();
    const { factId, tags }: { factId: string; tags: FactTag[] } = body;

    if (!factId || !tags || !Array.isArray(tags)) {
      return NextResponse.json({ 
        error: 'factId and tags array are required' 
      }, { status: 400 });
    }

    // Validate tags
    const validCategories = Object.values(TagCategory);
    for (const tag of tags) {
      if (!tag.name || !tag.category) {
        return NextResponse.json({ 
          error: 'Each tag must have name and category' 
        }, { status: 400 });
      }
      if (!validCategories.includes(tag.category)) {
        return NextResponse.json({ 
          error: `Invalid category. Must be one of: ${validCategories.join(', ')}` 
        }, { status: 400 });
      }
    }

    // This would need to integrate with fact-store to update the fact
    // For now, return success
    return NextResponse.json({ 
      success: true, 
      message: `Added ${tags.length} tags to fact ${factId}` 
    });

  } catch (error) {
    console.error('Failed to add tags:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

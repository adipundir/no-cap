import { NextRequest, NextResponse } from 'next/server';
import { TagAnalytics, Fact, FactTag, TagCategory } from '@/types/fact';
import { listFactRecords } from '@/lib/store/fact-store';
import { ensureSeedFacts } from '@/lib/seed/facts';

export type AnalyticsTimeframe = '24h' | '7d' | '30d' | '90d' | 'all';

export type FactTrend = {
  date: string;
  verifiedCount: number;
  totalCount: number;
  topTags: string[];
};

export type DeveloperInsights = {
  totalFacts: number;
  verifiedFacts: number;
  verificationRate: number;
  totalTags: number;
  averageTagsPerFact: number;
  topCategories: { category: TagCategory; count: number; trend: number }[];
  factsByRegion: { region: string; count: number }[];
  authorActivity: { author: string; facts: number; verificationRate: number }[];
  dailyTrends: FactTrend[];
  tagCloud: { name: string; count: number; category: TagCategory; size: number }[];
};

/**
 * GET /api/analytics
 * Comprehensive analytics API for developers
 */
export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url);
    const timeframe = (searchParams.get('timeframe') || '30d') as AnalyticsTimeframe;
    const category = searchParams.get('category') as TagCategory | null;
    
    await ensureSeedFacts();
    const records = listFactRecords();
    const facts = records.map(r => r.fact);
    
    // Filter facts by timeframe
    const filteredFacts = filterFactsByTimeframe(facts, timeframe);
    
    const insights = generateInsights(filteredFacts, category);
    
    return NextResponse.json({
      timeframe,
      category,
      insights,
      generatedAt: new Date().toISOString()
    });

  } catch (error) {
    console.error('Analytics API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

/**
 * GET /api/analytics/trends
 * Time-series data for fact verification trends
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json();
    const { 
      timeframe = '30d', 
      granularity = 'daily',
      tags = []
    }: {
      timeframe?: AnalyticsTimeframe;
      granularity?: 'hourly' | 'daily' | 'weekly';
      tags?: string[];
    } = body;
    
    await ensureSeedFacts();
    const records = listFactRecords();
    let facts = records.map(r => r.fact);
    
    // Filter by tags if specified
    if (tags.length > 0) {
      facts = facts.filter(fact => 
        fact.metadata?.tags?.some((tag: FactTag) => tags.includes(tag.name))
      );
    }
    
    const trends = generateTrends(facts, timeframe, granularity);
    
    return NextResponse.json({
      timeframe,
      granularity,
      tags,
      trends,
      totalDataPoints: trends.length
    });

  } catch (error) {
    console.error('Trends API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Helper functions
function filterFactsByTimeframe(facts: Fact[], timeframe: AnalyticsTimeframe): Fact[] {
  if (timeframe === 'all') return facts;
  
  const now = new Date();
  const cutoffDate = new Date();
  
  switch (timeframe) {
    case '24h':
      cutoffDate.setHours(now.getHours() - 24);
      break;
    case '7d':
      cutoffDate.setDate(now.getDate() - 7);
      break;
    case '30d':
      cutoffDate.setDate(now.getDate() - 30);
      break;
    case '90d':
      cutoffDate.setDate(now.getDate() - 90);
      break;
  }
  
  return facts.filter(fact => new Date(fact.updated) >= cutoffDate);
}

function generateInsights(facts: Fact[], categoryFilter?: TagCategory | null): DeveloperInsights {
  const verifiedFacts = facts.filter(f => f.status === 'verified');
  const allTags = facts.flatMap(f => f.metadata?.tags || []);
  const filteredTags = categoryFilter 
    ? allTags.filter(tag => tag.category === categoryFilter)
    : allTags;
  
  // Tag analytics
  const tagCounts = new Map<string, { count: number; category: TagCategory; verified: number }>();
  facts.forEach(fact => {
    fact.metadata?.tags?.forEach((tag: FactTag) => {
      if (categoryFilter && tag.category !== categoryFilter) return;
      
      const key = tag.name;
      if (!tagCounts.has(key)) {
        tagCounts.set(key, { count: 0, category: tag.category, verified: 0 });
      }
      const tagData = tagCounts.get(key)!;
      tagData.count++;
      if (fact.status === 'verified') tagData.verified++;
    });
  });
  
  // Category analytics
  const categoryCounts = new Map<TagCategory, { count: number; verified: number }>();
  Object.values(TagCategory).forEach(cat => {
    categoryCounts.set(cat, { count: 0, verified: 0 });
  });
  
  allTags.forEach(tag => {
    const catData = categoryCounts.get(tag.category)!;
    catData.count++;
  });
  
  verifiedFacts.forEach(fact => {
    fact.metadata?.tags?.forEach((tag: FactTag) => {
      const catData = categoryCounts.get(tag.category)!;
      catData.verified++;
    });
  });
  
  // Region analytics
  const regionCounts = new Map<string, number>();
  facts.forEach(fact => {
    if (fact.metadata?.region) {
      regionCounts.set(fact.metadata.region, (regionCounts.get(fact.metadata.region) || 0) + 1);
    }
  });
  
  // Author analytics
  const authorStats = new Map<string, { facts: number; verified: number }>();
  facts.forEach(fact => {
    if (!authorStats.has(fact.author)) {
      authorStats.set(fact.author, { facts: 0, verified: 0 });
    }
    const authorData = authorStats.get(fact.author)!;
    authorData.facts++;
    if (fact.status === 'verified') authorData.verified++;
  });
  
  // Generate tag cloud (top 50 tags with size based on frequency)
  const tagCloudEntries = Array.from(tagCounts.entries())
    .sort(([,a], [,b]) => b.count - a.count)
    .slice(0, 50);
  
  const maxCount = Math.max(...tagCloudEntries.map(([,data]) => data.count));
  const tagCloud = tagCloudEntries.map(([name, data]) => ({
    name,
    count: data.count,
    category: data.category,
    size: Math.ceil((data.count / maxCount) * 10) // Size from 1-10
  }));
  
  return {
    totalFacts: facts.length,
    verifiedFacts: verifiedFacts.length,
    verificationRate: facts.length > 0 ? (verifiedFacts.length / facts.length) * 100 : 0,
    totalTags: tagCounts.size,
    averageTagsPerFact: facts.length > 0 ? allTags.length / facts.length : 0,
    topCategories: Array.from(categoryCounts.entries()).map(([category, data]) => ({
      category,
      count: data.count,
      trend: 0 // Would need historical data
    })).sort((a, b) => b.count - a.count),
    factsByRegion: Array.from(regionCounts.entries())
      .map(([region, count]) => ({ region, count }))
      .sort((a, b) => b.count - a.count),
    authorActivity: Array.from(authorStats.entries())
      .map(([author, stats]) => ({
        author,
        facts: stats.facts,
        verificationRate: (stats.verified / stats.facts) * 100
      }))
      .sort((a, b) => b.facts - a.facts)
      .slice(0, 20),
    dailyTrends: generateDailyTrends(facts),
    tagCloud
  };
}

function generateDailyTrends(facts: Fact[]): FactTrend[] {
  const trends = new Map<string, { verified: number; total: number; tags: Map<string, number> }>();
  
  facts.forEach(fact => {
    const date = new Date(fact.updated).toISOString().split('T')[0];
    if (!trends.has(date)) {
      trends.set(date, { verified: 0, total: 0, tags: new Map() });
    }
    const dayData = trends.get(date)!;
    dayData.total++;
    if (fact.status === 'verified') dayData.verified++;
    
    fact.metadata?.tags?.forEach((tag: FactTag) => {
      dayData.tags.set(tag.name, (dayData.tags.get(tag.name) || 0) + 1);
    });
  });
  
  return Array.from(trends.entries())
    .map(([date, data]) => ({
      date,
      verifiedCount: data.verified,
      totalCount: data.total,
      topTags: Array.from(data.tags.entries())
        .sort(([,a], [,b]) => b - a)
        .slice(0, 5)
        .map(([tag]) => tag)
    }))
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(-30); // Last 30 days
}

function generateTrends(
  facts: Fact[], 
  timeframe: AnalyticsTimeframe, 
  granularity: 'hourly' | 'daily' | 'weekly'
): FactTrend[] {
  // This would be more sophisticated in a real implementation
  // For now, return daily trends
  return generateDailyTrends(facts);
}

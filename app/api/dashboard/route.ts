export const dynamic = "force-dynamic";
import { NextResponse } from 'next/server';
import { requireWorkspaceSession } from '@/lib/auth';
import { db } from '@/lib/db';

export async function GET(req: Request) {
  try {
    const sessionUser = await requireWorkspaceSession();
    if (!sessionUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { workspaceId } = sessionUser;
    const { searchParams } = new URL(req.url);
    const daysParam = parseInt(searchParams.get('days') || '30', 10);
    const days = isNaN(daysParam) ? 30 : daysParam;

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    // 1. Fetch total feedback count for period
    const totalFeedback = await db.feedback.count({
      where: {
        workspaceId,
        createdAt: { gte: startDate },
      },
    });

    // 2. Fetch new this week
    const newThisWeek = await db.feedback.count({
      where: {
        workspaceId,
        createdAt: { gte: sevenDaysAgo },
      },
    });

    // 3. Sentiment Breakdown counts
    const posCount = await db.feedback.count({
      where: { workspaceId, sentiment: 'POS', createdAt: { gte: startDate } },
    });
    const neuCount = await db.feedback.count({
      where: { workspaceId, sentiment: 'NEU', createdAt: { gte: startDate } },
    });
    const negCount = await db.feedback.count({
      where: { workspaceId, sentiment: 'NEG', createdAt: { gte: startDate } },
    });

    const negPercent = totalFeedback > 0 ? Math.round((negCount / totalFeedback) * 100) : 0;

    // 4. Feedback list for charts & recent
    const feedbackList = await db.feedback.findMany({
      where: {
        workspaceId,
        createdAt: { gte: startDate },
      },
      include: {
        themes: {
          include: {
            theme: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    // 5. Volume over time chart data
    const volumeMap = new Map<string, { date: string; positive: number; neutral: number; negative: number; total: number }>();
    
    // Initialize date keys
    for (let i = days; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const key = d.toISOString().split('T')[0];
      volumeMap.set(key, { date: key, positive: 0, neutral: 0, negative: 0, total: 0 });
    }

    feedbackList.forEach((item) => {
      const key = new Date(item.createdAt).toISOString().split('T')[0];
      const entry = volumeMap.get(key) || { date: key, positive: 0, neutral: 0, negative: 0, total: 0 };
      if (item.sentiment === 'POS') entry.positive++;
      else if (item.sentiment === 'NEU') entry.neutral++;
      else if (item.sentiment === 'NEG') entry.negative++;
      entry.total++;
      volumeMap.set(key, entry);
    });

    const volumeChart = Array.from(volumeMap.values());

    // 6. Theme breakdown chart data
    const themeCountMap = new Map<string, { id: string; name: string; color: string; count: number; negCount: number }>();

    feedbackList.forEach((item) => {
      item.themes.forEach((ft) => {
        const existing = themeCountMap.get(ft.theme.id) || {
          id: ft.theme.id,
          name: ft.theme.name,
          color: ft.theme.color,
          count: 0,
          negCount: 0,
        };
        existing.count++;
        if (item.sentiment === 'NEG') existing.negCount++;
        themeCountMap.set(ft.theme.id, existing);
      });
    });

    const topThemesList = Array.from(themeCountMap.values())
      .sort((a, b) => b.count - a.count)
      .slice(0, 6);

    const topTrendingTheme = topThemesList.length > 0 ? topThemesList[0].name : 'N/A';

    // 7. Recent 5 items
    const recentFeedback = feedbackList.slice(0, 5).map((f) => ({
      id: f.id,
      content: f.content,
      channel: f.channel,
      sentiment: f.sentiment,
      status: f.status,
      createdAt: f.createdAt,
      customerLabel: f.customerLabel,
      featureArea: f.featureArea,
      themes: f.themes.map((t) => t.theme.name),
    }));

    return NextResponse.json({
      kpis: {
        totalFeedback,
        negPercent,
        newThisWeek,
        topTrendingTheme,
      },
      charts: {
        volumeOverTime: volumeChart,
        sentimentBreakdown: [
          { name: 'Positive', value: posCount, color: '#10b981' },
          { name: 'Neutral', value: neuCount, color: '#f59e0b' },
          { name: 'Negative', value: negCount, color: '#ef4444' },
        ],
        topThemes: topThemesList,
      },
      recentFeedback,
      trendingThemes: topThemesList.slice(0, 4),
    });
  } catch (error: any) {
    console.error('Dashboard GET error:', error);
    return NextResponse.json({ error: 'Server error loading dashboard' }, { status: 500 });
  }
}

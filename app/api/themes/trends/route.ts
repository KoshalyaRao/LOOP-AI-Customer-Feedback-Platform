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
    const days = parseInt(searchParams.get('days') || '30', 10);

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    // Get top 5 themes
    const themes = await db.theme.findMany({
      where: { workspaceId },
      include: {
        feedback: {
          include: {
            feedback: true,
          },
        },
      },
    });

    const sortedThemes = themes
      .map((t) => ({ ...t, count: t.feedback.length }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    // Build timeline dates
    const dateMap = new Map<string, any>();
    for (let i = days; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      const obj: any = { date: dateStr };
      sortedThemes.forEach((t) => {
        obj[t.name] = 0;
      });
      dateMap.set(dateStr, obj);
    }

    // Populate counts
    sortedThemes.forEach((theme) => {
      theme.feedback.forEach((ft) => {
        const fDate = new Date(ft.feedback.createdAt);
        if (fDate >= startDate) {
          const dateStr = fDate.toISOString().split('T')[0];
          const entry = dateMap.get(dateStr);
          if (entry && entry[theme.name] !== undefined) {
            entry[theme.name]++;
          }
        }
      });
    });

    const seriesData = Array.from(dateMap.values());
    const themeNames = sortedThemes.map((t) => ({ name: t.name, color: t.color }));

    return NextResponse.json({
      seriesData,
      themeNames,
    });
  } catch (error: any) {
    console.error('Theme trends GET error:', error);
    return NextResponse.json({ error: 'Server error loading trend charts' }, { status: 500 });
  }
}

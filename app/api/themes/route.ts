export const = "force-dynamic";
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

    const themes = await db.theme.findMany({
      where: { workspaceId },
      include: {
        feedback: {
          include: {
            feedback: true,
          },
        },
      },
      orderBy: { name: 'asc' },
    });

    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    const sixtyDaysAgo = new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000);

    const formattedThemes = themes.map((theme) => {
      const allFeedbackItems = theme.feedback.map((ft) => ft.feedback);
      const totalCount = allFeedbackItems.length;

      let posCount = 0;
      let negCount = 0;
      let neuCount = 0;

      let currentPeriodCount = 0;
      let prevPeriodCount = 0;

      allFeedbackItems.forEach((f) => {
        if (f.sentiment === 'POS') posCount++;
        else if (f.sentiment === 'NEG') negCount++;
        else neuCount++;

        const fTime = new Date(f.createdAt).getTime();
        if (fTime >= thirtyDaysAgo.getTime()) {
          currentPeriodCount++;
        } else if (fTime >= sixtyDaysAgo.getTime()) {
          prevPeriodCount++;
        }
      });

      const posPercent = totalCount > 0 ? Math.round((posCount / totalCount) * 100) : 0;
      const negPercent = totalCount > 0 ? Math.round((negCount / totalCount) * 100) : 0;

      // Spike & Trend calculation
      let trend: 'up' | 'down' | 'stable' = 'stable';
      let isSpike = false;

      if (prevPeriodCount === 0) {
        trend = currentPeriodCount > 2 ? 'up' : 'stable';
      } else {
        const growth = (currentPeriodCount - prevPeriodCount) / prevPeriodCount;
        if (growth > 0.25) trend = 'up';
        else if (growth < -0.25) trend = 'down';
        else trend = 'stable';

        if (growth >= 0.40 && currentPeriodCount >= 5) {
          isSpike = true;
        }
      }

      return {
        id: theme.id,
        name: theme.name,
        description: theme.description,
        color: theme.color,
        createdAt: theme.createdAt,
        feedbackCount: totalCount,
        posCount,
        negCount,
        neuCount,
        posPercent,
        negPercent,
        trend,
        isSpike,
      };
    });

    // Sort by feedbackCount descending
    formattedThemes.sort((a, b) => b.feedbackCount - a.feedbackCount);

    return NextResponse.json(formattedThemes);
  } catch (error: any) {
    console.error('Themes GET error:', error);
    return NextResponse.json({ error: 'Server error fetching themes' }, { status: 500 });
  }
}

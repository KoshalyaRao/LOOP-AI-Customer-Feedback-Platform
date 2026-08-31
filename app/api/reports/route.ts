import { NextResponse } from 'next/server';
import { requireWorkspaceSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { canGenerateReport } from '@/lib/permissions';
import { generateReportSchema } from '@/lib/validations';
import { generateVoCReportJson } from '@/lib/ai';
import { FeedbackSentiment } from '@/types';

export async function GET(req: Request) {
  try {
    const sessionUser = await requireWorkspaceSession();
    if (!sessionUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { workspaceId } = sessionUser;

    const reports = await db.report.findMany({
      where: { workspaceId },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        title: true,
        periodStart: true,
        periodEnd: true,
        createdAt: true,
        generatedBy: true,
      },
    });

    return NextResponse.json(reports);
  } catch (error: any) {
    console.error('Reports GET error:', error);
    return NextResponse.json({ error: 'Server error fetching reports' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const sessionUser = await requireWorkspaceSession();
    if (!sessionUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!canGenerateReport(sessionUser.role)) {
      return NextResponse.json(
        { error: 'Access Denied: Permission required to generate Voice of Customer reports' },
        { status: 403 }
      );
    }

    const { workspaceId, name: userName } = sessionUser;
    const body = await req.json();
    const result = generateReportSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: 'Invalid report parameters', details: result.error.format() },
        { status: 400 }
      );
    }

    const periodDays = result.data.periodDays;
    const periodEnd = new Date();
    const periodStart = new Date(periodEnd.getTime() - periodDays * 24 * 60 * 60 * 1000);

    // Calculate real stats from database
    const total = await db.feedback.count({
      where: { workspaceId, createdAt: { gte: periodStart } },
    });

    const posCount = await db.feedback.count({
      where: { workspaceId, sentiment: 'POS', createdAt: { gte: periodStart } },
    });
    const neuCount = await db.feedback.count({
      where: { workspaceId, sentiment: 'NEU', createdAt: { gte: periodStart } },
    });
    const negCount = await db.feedback.count({
      where: { workspaceId, sentiment: 'NEG', createdAt: { gte: periodStart } },
    });

    // Theme stats
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

    const themeStats = themes.map((t) => {
      const itemsInPeriod = t.feedback
        .map((ft) => ft.feedback)
        .filter((f) => new Date(f.createdAt) >= periodStart);

      const count = itemsInPeriod.length;
      const negs = itemsInPeriod.filter((f) => f.sentiment === 'NEG').length;
      const negPercent = count > 0 ? Math.round((negs / count) * 100) : 0;

      return {
        name: t.name,
        count,
        negPercent,
        trend: negPercent > 40 ? '↓' : negPercent < 15 ? '↑' : '→',
      };
    }).sort((a, b) => b.count - a.count);

    // Quotes
    const rawSampleQuotes = await db.feedback.findMany({
      where: { workspaceId, createdAt: { gte: periodStart } },
      take: 6,
      orderBy: { createdAt: 'desc' },
      select: {
        content: true,
        channel: true,
        sentiment: true,
        customerLabel: true,
      },
    });

    const sampleQuotes = rawSampleQuotes.map((q) => ({
      content: q.content,
      channel: q.channel,
      sentiment: q.sentiment as FeedbackSentiment,
      customerLabel: q.customerLabel,
    }));

    // Spikes
    const spikeThemes = themeStats.filter((t) => t.negPercent >= 40 && t.count >= 3).map((t) => `High negative spike detected in ${t.name} feedback.`);

    // Generate JSON report content
    const reportContent = await generateVoCReportJson(periodDays, {
      total,
      posCount,
      neuCount,
      negCount,
      themes: themeStats,
      sampleQuotes,
      spikes: spikeThemes,
    });

    const title = result.data.customTitle || `Voice of Customer Report (${periodDays} Days)`;

    const createdReport = await db.report.create({
      data: {
        title,
        periodStart,
        periodEnd,
        contentJson: JSON.stringify(reportContent),
        workspaceId,
        generatedBy: userName,
      },
    });

    return NextResponse.json(createdReport, { status: 201 });
  } catch (error: any) {
    console.error('Generate report POST error:', error);
    return NextResponse.json({ error: 'Server error generating VoC report' }, { status: 500 });
  }
}

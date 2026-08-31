import { NextResponse } from 'next/server';
import { requireWorkspaceSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { feedbackSchema } from '@/lib/validations';
import { canCreateFeedback } from '@/lib/permissions';
import { classifyFeedback } from '@/lib/ai';

export async function GET(req: Request) {
  try {
    const sessionUser = await requireWorkspaceSession();
    if (!sessionUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { workspaceId } = sessionUser;
    const { searchParams } = new URL(req.url);

    const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10));
    const limit = Math.max(1, Math.min(100, parseInt(searchParams.get('limit') || '15', 10)));
    const search = searchParams.get('search') || '';
    const channel = searchParams.get('channel') || '';
    const sentiment = searchParams.get('sentiment') || '';
    const status = searchParams.get('status') || '';
    const themeName = searchParams.get('theme') || '';

    // Build filter query
    const where: any = { workspaceId };

    if (search) {
      where.OR = [
        { content: { contains: search } },
        { customerLabel: { contains: search } },
        { sourceRef: { contains: search } },
      ];
    }

    if (channel) where.channel = channel;
    if (sentiment) where.sentiment = sentiment;
    if (status) where.status = status;

    if (themeName) {
      where.themes = {
        some: {
          theme: {
            name: themeName,
          },
        },
      };
    }

    const skip = (page - 1) * limit;

    const [total, items] = await Promise.all([
      db.feedback.count({ where }),
      db.feedback.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          themes: {
            include: {
              theme: true,
            },
          },
        },
      }),
    ]);

    return NextResponse.json({
      items,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error: any) {
    console.error('Feedback GET error:', error);
    return NextResponse.json({ error: 'Server error fetching feedback' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const sessionUser = await requireWorkspaceSession();
    if (!sessionUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!canCreateFeedback(sessionUser.role)) {
      return NextResponse.json({ error: 'Access Denied: Permission required to create feedback' }, { status: 403 });
    }

    const { workspaceId } = sessionUser;
    const body = await req.json();
    const result = feedbackSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: 'Invalid feedback data', details: result.error.format() },
        { status: 400 }
      );
    }

    const { content, channel, customerLabel, sourceRef, createdAt } = result.data;

    // Fetch existing themes for this workspace to aid classification
    const existingThemes = await db.theme.findMany({
      where: { workspaceId },
    });
    const themeNames = existingThemes.map((t) => t.name);

    // AI Classification
    const classification = await classifyFeedback(content, themeNames);

    // Save Feedback item
    const createdFeedback = await db.feedback.create({
      data: {
        content,
        channel,
        customerLabel: customerLabel || null,
        sourceRef: sourceRef || `MANUAL-${Date.now()}`,
        sentiment: classification.sentiment,
        sentimentScore: classification.sentimentScore,
        featureArea: classification.featureArea,
        status: 'NEW',
        createdAt: createdAt ? new Date(createdAt) : new Date(),
        workspaceId,
      },
    });

    // Attach classified themes
    for (const themeName of classification.themes) {
      let theme = existingThemes.find((t) => t.name.toLowerCase() === themeName.toLowerCase());

      if (!theme) {
        // Create new theme dynamically if missing
        theme = await db.theme.create({
          data: {
            name: themeName,
            description: `Auto-generated theme for ${themeName}`,
            color: '#64748b',
            workspaceId,
          },
        });
      }

      await db.feedbackTheme.create({
        data: {
          feedbackId: createdFeedback.id,
          themeId: theme.id,
          confidence: 0.90,
        },
      });
    }

    // Return complete item
    const fullItem = await db.feedback.findUnique({
      where: { id: createdFeedback.id },
      include: {
        themes: {
          include: {
            theme: true,
          },
        },
      },
    });

    return NextResponse.json(fullItem, { status: 201 });
  } catch (error: any) {
    console.error('Feedback POST error:', error);
    return NextResponse.json({ error: 'Server error adding feedback' }, { status: 500 });
  }
}

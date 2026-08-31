import { NextResponse } from 'next/server';
import { requireWorkspaceSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { hasPermission } from '@/lib/permissions';
import { classifyFeedback } from '@/lib/ai';

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const sessionUser = await requireWorkspaceSession();
    if (!sessionUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!hasPermission(sessionUser.role, 'feedback:reclassify')) {
      return NextResponse.json(
        { error: 'Access Denied: Permission required to reclassify feedback' },
        { status: 403 }
      );
    }

    const { workspaceId } = sessionUser;

    const existingItem = await db.feedback.findFirst({
      where: { id: params.id, workspaceId },
    });

    if (!existingItem) {
      return NextResponse.json({ error: 'Feedback item not found' }, { status: 404 });
    }

    // Fetch workspace themes
    const existingThemes = await db.theme.findMany({ where: { workspaceId } });
    const themeNames = existingThemes.map((t) => t.name);

    // Re-run AI classification
    const classification = await classifyFeedback(existingItem.content, themeNames);

    // Remove existing themes relations for this feedback
    await db.feedbackTheme.deleteMany({
      where: { feedbackId: params.id },
    });

    // Update feedback properties
    const updatedItem = await db.feedback.update({
      where: { id: params.id },
      data: {
        sentiment: classification.sentiment,
        sentimentScore: classification.sentimentScore,
        featureArea: classification.featureArea,
      },
    });

    // Re-attach themes
    for (const themeName of classification.themes) {
      let theme = existingThemes.find((t) => t.name.toLowerCase() === themeName.toLowerCase());
      if (!theme) {
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
          feedbackId: params.id,
          themeId: theme.id,
          confidence: 0.95,
        },
      });
    }

    const finalItem = await db.feedback.findUnique({
      where: { id: params.id },
      include: {
        themes: {
          include: {
            theme: true,
          },
        },
      },
    });

    return NextResponse.json({
      message: 'Feedback reclassified successfully',
      item: finalItem,
      rationale: classification.rationale,
    });
  } catch (error: any) {
    console.error('Reclassify POST error:', error);
    return NextResponse.json({ error: 'Server error during reclassification' }, { status: 500 });
  }
}

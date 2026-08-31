import { NextResponse } from 'next/server';
import { requireWorkspaceSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { canCreateFeedback } from '@/lib/permissions';
import { classifyFeedback } from '@/lib/ai';

export async function POST(req: Request) {
  try {
    const sessionUser = await requireWorkspaceSession();
    if (!sessionUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!canCreateFeedback(sessionUser.role)) {
      return NextResponse.json(
        { error: 'Access Denied: Permission required to import feedback CSV' },
        { status: 403 }
      );
    }

    const { workspaceId } = sessionUser;
    const body = await req.json();
    const { rows } = body; // Array of { content, channel, customer_label, created_at }

    if (!Array.isArray(rows) || rows.length === 0) {
      return NextResponse.json({ error: 'No CSV rows provided' }, { status: 400 });
    }

    const existingThemes = await db.theme.findMany({ where: { workspaceId } });
    const themeNames = existingThemes.map((t) => t.name);

    let successCount = 0;
    let failedCount = 0;

    for (const row of rows) {
      const content = row.content || row.Content;
      const channel = row.channel || row.Channel || 'CSV Import';
      const customerLabel = row.customer_label || row['Customer Label'] || row.customerLabel || null;
      const createdAt = row.created_at || row['Created At'] || row.createdAt;

      if (!content || typeof content !== 'string' || content.trim().length < 3) {
        failedCount++;
        continue;
      }

      try {
        const classification = await classifyFeedback(content.trim(), themeNames);

        const feedback = await db.feedback.create({
          data: {
            content: content.trim(),
            channel: channel.trim(),
            customerLabel: customerLabel ? String(customerLabel).trim() : null,
            sourceRef: `CSV-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
            sentiment: classification.sentiment,
            sentimentScore: classification.sentimentScore,
            featureArea: classification.featureArea,
            status: 'NEW',
            createdAt: createdAt ? new Date(createdAt) : new Date(),
            workspaceId,
          },
        });

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
            existingThemes.push(theme);
          }

          await db.feedbackTheme.create({
            data: {
              feedbackId: feedback.id,
              themeId: theme.id,
              confidence: 0.90,
            },
          });
        }

        successCount++;
      } catch (err) {
        console.error('Failed row import error:', err);
        failedCount++;
      }
    }

    return NextResponse.json({
      message: `CSV Import completed.`,
      successCount,
      failedCount,
      summary: `Successfully imported: ${successCount}. Failed rows: ${failedCount}.`,
    });
  } catch (error: any) {
    console.error('CSV import POST error:', error);
    return NextResponse.json({ error: 'Server error during CSV import' }, { status: 500 });
  }
}

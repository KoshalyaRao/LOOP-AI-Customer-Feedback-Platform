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
        { error: 'Access Denied: Permission required to simulate feedback channels' },
        { status: 403 }
      );
    }

    const { workspaceId } = sessionUser;
    const body = await req.json();
    const channelType = body.channelType || 'Support Tickets'; // 'Support Tickets' or 'App Store Reviews'

    const supportTemplates = [
      "User reported getting logged out every 15 minutes when switching browser tabs.",
      "Customer requested webhook triggers for failed billing attempts to sync with Slack.",
      "Cannot export PDF report when date filter spans more than 90 days.",
      "Awesome customer service response! Issue with invoice receipt was fixed in 5 minutes.",
      "The mobile grid layout is breaking on small screen resolution (320px wide).",
      "Request for SAML SSO documentation for Okta deployment.",
      "Analytics graph fails to display negative sentiment breakdown for custom themes.",
      "Search bar in Inbox does not highlight keyword matches.",
      "Loving the speed of the new AI Voice of Customer report generation!",
      "Double billing charge appeared on credit card statement for August subscription."
    ];

    const appStoreTemplates = [
      "⭐⭐⭐⭐⭐ Best customer feedback tool we've used! GROUNDBREAKING Ask LOOP chat.",
      "⭐⭐ Huge latency when loading large customer data tables on mobile Safari.",
      "⭐⭐⭐⭐ Very intuitive dashboard layout, but needs more integrations like Hubspot.",
      "⭐ Keeps throwing 500 error when attempting to change user roles in Settings.",
      "⭐⭐⭐⭐⭐ Great team collaboration features! Mentions and notes make review fast.",
      "⭐⭐⭐ Good app, but pricing for additional team seats is a bit expensive for small teams.",
      "⭐⭐⭐⭐⭐ The bulk CSV import saved our support team dozens of hours this week!",
      "⭐⭐ Onboarding guide is outdated and links to broken video tutorials.",
      "⭐⭐⭐⭐⭐ Sleek dark mode UI and very fast trend detection alerts.",
      "⭐⭐⭐ Would love push notifications when a negative feedback spike is detected."
    ];

    const templates = channelType === 'App Store Reviews' ? appStoreTemplates : supportTemplates;
    const channelName = channelType === 'App Store Reviews' ? 'App Store Reviews' : 'Support Tickets';

    const existingThemes = await db.theme.findMany({ where: { workspaceId } });
    const themeNames = existingThemes.map((t) => t.name);

    let count = 0;
    for (const text of templates) {
      const classification = await classifyFeedback(text, themeNames);

      const created = await db.feedback.create({
        data: {
          content: text,
          channel: channelName,
          customerLabel: `Simulated Customer ${Math.floor(Math.random() * 899 + 100)}`,
          sourceRef: `SIM-${channelType.replace(/\s+/g, '')}-${Date.now()}-${count}`,
          sentiment: classification.sentiment,
          sentimentScore: classification.sentimentScore,
          featureArea: classification.featureArea,
          status: 'NEW',
          createdAt: new Date(),
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
            feedbackId: created.id,
            themeId: theme.id,
            confidence: 0.90,
          },
        });
      }

      count++;
    }

    return NextResponse.json({
      message: `Successfully simulated ${count} items from ${channelName}.`,
      count,
      channel: channelName,
    });
  } catch (error: any) {
    console.error('Simulate channel POST error:', error);
    return NextResponse.json({ error: 'Server error during simulation' }, { status: 500 });
  }
}

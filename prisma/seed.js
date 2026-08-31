const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('Starting seed process for LOOP platform...');

  // Clean existing data
  await prisma.feedbackTheme.deleteMany();
  await prisma.theme.deleteMany();
  await prisma.feedback.deleteMany();
  await prisma.report.deleteMany();
  await prisma.user.deleteMany();
  await prisma.workspace.deleteMany();

  // 1. Create Workspace
  const workspace = await prisma.workspace.create({
    data: {
      name: 'Acme SaaS',
    },
  });

  console.log(`Created workspace: ${workspace.name} (${workspace.id})`);

  // 2. Create Password Hash
  const passwordHash = await bcrypt.hash('password123', 10);

  // 3. Create Users
  const adminUser = await prisma.user.create({
    data: {
      name: 'Sarah Connor (Admin)',
      email: 'admin@acme.com',
      passwordHash,
      role: 'ADMIN',
      workspaceId: workspace.id,
    },
  });

  const analystUser = await prisma.user.create({
    data: {
      name: 'Alex Rivera (Analyst)',
      email: 'analyst@acme.com',
      passwordHash,
      role: 'ANALYST',
      workspaceId: workspace.id,
    },
  });

  const viewerUser = await prisma.user.create({
    data: {
      name: 'Jordan Lee (Viewer)',
      email: 'viewer@acme.com',
      passwordHash,
      role: 'VIEWER',
      workspaceId: workspace.id,
    },
  });

  console.log('Created seeded users: admin@acme.com, analyst@acme.com, viewer@acme.com');

  // 4. Create Themes
  const themesData = [
    { name: 'Onboarding', description: 'User sign-up, setup wizard, and initial product orientation.', color: '#3b82f6' },
    { name: 'Performance', description: 'Page load times, API latency, responsiveness, and memory usage.', color: '#ef4444' },
    { name: 'Mobile Experience', description: 'iOS & Android web and native app interface, touch controls.', color: '#8b5cf6' },
    { name: 'Billing', description: 'Invoices, credit card processing, plan upgrades, and pricing transparency.', color: '#f59e0b' },
    { name: 'Dashboard', description: 'Analytics widgets, reporting visual layouts, data clarity.', color: '#10b981' },
    { name: 'Integrations', description: 'Slack, Zapier, Webhooks, and third-party API connections.', color: '#06b6d4' },
    { name: 'Authentication', description: 'SSO, SAML, 2FA, password resets, and session timeout behavior.', color: '#ec4899' },
    { name: 'Export Features', description: 'CSV, PDF, Excel reports downloading and schedule delivery.', color: '#6366f1' },
    { name: 'Collaboration', description: 'Team sharing, multi-user comments, permissions, workspace invites.', color: '#14b8a6' },
    { name: 'Pricing', description: 'Subscription tiers, seat pricing, plan limitations, and renewals.', color: '#84cc16' },
  ];

  const themeMap = new Map();
  for (const t of themesData) {
    const createdTheme = await prisma.theme.create({
      data: {
        ...t,
        workspaceId: workspace.id,
      },
    });
    themeMap.set(t.name, createdTheme.id);
  }

  console.log(`Created ${themesData.length} themes.`);

  // 5. Channels & Customer Labels
  const channels = ['Support Tickets', 'App Store Reviews', 'NPS Surveys', 'Sales Call Notes', 'Community Posts'];
  const customers = [
    'Acme Corp (Enterprise)', 'TechStart Inc', 'Global Logistics', 'Apex Systems',
    'Finovate Labs', 'CloudScale Inc', 'DesignWorks Agency', 'Hyperion Media',
    'BlueWave Digital', 'Vanguard Health', 'Starlight Retail', 'Quantum Solutions',
    'Anonymous User', 'VP of Product @ TechScale', 'Support Lead @ FlexCo'
  ];

  // 6. Generate 125 realistic feedback templates
  const rawFeedbackTemplates = [
    // Onboarding
    { text: "The onboarding tour was super clean! Took our team less than 10 minutes to configure everything.", theme: "Onboarding", sentiment: "POS", score: 0.92, area: "Setup Wizard" },
    { text: "We got stuck on step 3 of the onboarding workflow. The documentation link gave a 404 error.", theme: "Onboarding", sentiment: "NEG", score: 0.25, area: "Documentation" },
    { text: "Onboarding is okay, but it would be great if there was an interactive video tutorial for new team members.", theme: "Onboarding", sentiment: "NEU", score: 0.55, area: "Tutorials" },
    { text: "Fantastic first impression! The welcome checklist guided us right to our first dashboard setup.", theme: "Onboarding", sentiment: "POS", score: 0.88, area: "Setup Wizard" },

    // Performance
    { text: "The main analytics table is taking over 6 seconds to render whenever we filter by date range.", theme: "Performance", sentiment: "NEG", score: 0.15, area: "Data Grid" },
    { text: "Super crisp performance! Query response times are practically instantaneous even with 50k rows.", theme: "Performance", sentiment: "POS", score: 0.95, area: "API Latency" },
    { text: "App randomly crashed twice today when rendering large SVG trend charts on Chrome.", theme: "Performance", sentiment: "NEG", score: 0.18, area: "Charts Engine" },
    { text: "Loading speed seems fine overall, though initial bundle load could be slightly faster on 4G connections.", theme: "Performance", sentiment: "NEU", score: 0.50, area: "Page Load" },

    // Mobile Experience
    { text: "The mobile web layout on iPhone 15 cuts off the export button and navigation buttons.", theme: "Mobile Experience", sentiment: "NEG", score: 0.22, area: "Navigation Bar" },
    { text: "Loving the new mobile dark mode updates! Pinch-to-zoom on charts works smoothly.", theme: "Mobile Experience", sentiment: "POS", score: 0.91, area: "Mobile Dashboard" },
    { text: "Push notifications on iOS fail to open the specific feedback thread directly.", theme: "Mobile Experience", sentiment: "NEG", score: 0.30, area: "Push Notifications" },
    { text: "Decent mobile view, but editing table cells on a touchscreen keyboard is tricky.", theme: "Mobile Experience", sentiment: "NEU", score: 0.48, area: "Touch Controls" },

    // Billing
    { text: "We were double-charged for our extra seats this billing cycle without prior notice.", theme: "Billing", sentiment: "NEG", score: 0.10, area: "Invoicing" },
    { text: "Upgrading our plan to Enterprise was seamless and invoice was immediately sent to accounts payable.", theme: "Billing", sentiment: "POS", score: 0.86, area: "Checkout" },
    { text: "Could you add support for ACH payment transfers? Credit card limits are blocking enterprise renewals.", theme: "Billing", sentiment: "NEU", score: 0.52, area: "Payment Methods" },
    { text: "The billing section page lacks detailed breakdown of per-user seat usage metrics.", theme: "Billing", sentiment: "NEG", score: 0.35, area: "Invoice History" },

    // Dashboard
    { text: "The customizable dashboard widgets are unbelievable! Exactly what our C-suite needed.", theme: "Dashboard", sentiment: "POS", score: 0.94, area: "Widgets UI" },
    { text: "Cannot reorder dashboard cards on Safari browser. Drag and drop locks up.", theme: "Dashboard", sentiment: "NEG", score: 0.28, area: "Drag & Drop" },
    { text: "The sentiment breakdown donut chart color contrast makes neutral hard to distinguish from negative.", theme: "Dashboard", sentiment: "NEU", score: 0.45, area: "Color Accessibility" },
    { text: "Cleanest analytics UI in the market hands down. Kudos to the design team!", theme: "Dashboard", sentiment: "POS", score: 0.96, area: "Visual Layout" },

    // Integrations
    { text: "Slack integration stopped sending real-time channel notifications after yesterday's release.", theme: "Integrations", sentiment: "NEG", score: 0.14, area: "Slack Bot" },
    { text: "Zapier integration configured seamlessly in 2 minutes. Syncing incoming support tickets automatically.", theme: "Integrations", sentiment: "POS", score: 0.89, area: "Zapier Connector" },
    { text: "We need a native Hubspot CRM integration so customer tags sync straight to feedback records.", theme: "Integrations", sentiment: "NEU", score: 0.58, area: "Hubspot Sync" },

    // Authentication
    { text: "SAML SSO integration with Okta failed for users in our European branch workspace.", theme: "Authentication", sentiment: "NEG", score: 0.20, area: "Okta SSO" },
    { text: "Enforcing 2FA mandatory sign-in for all analyst roles went smoothly without friction.", theme: "Authentication", sentiment: "POS", score: 0.87, area: "Security Policy" },
    { text: "Session expiration modal pops up abruptly while actively typing a long feedback note.", theme: "Authentication", sentiment: "NEG", score: 0.32, area: "Session Timeout" },

    // Export Features
    { text: "CSV export is missing the customer label column when exporting filtered Inbox results.", theme: "Export Features", sentiment: "NEG", score: 0.24, area: "CSV Exporter" },
    { text: "PDF Voice of Customer report generation is incredible. Beautiful layout for management meetings.", theme: "Export Features", sentiment: "POS", score: 0.93, area: "PDF Generator" },
    { text: "Would love automated weekly email exports of the trend summary sent directly to Slack/Inbox.", theme: "Export Features", sentiment: "NEU", score: 0.60, area: "Scheduled Export" },

    // Collaboration
    { text: "Adding internal comments and tagging colleagues on specific feedback items works great!", theme: "Collaboration", sentiment: "POS", score: 0.90, area: "Comments & Mentions" },
    { text: "Role-based access restrictions are unclear. Analysts cannot export reports but can view them.", theme: "Collaboration", sentiment: "NEU", score: 0.50, area: "Role Management" },
    { text: "Invite links sent to team members expire too fast (within 1 hour), causing friction.", theme: "Collaboration", sentiment: "NEG", score: 0.36, area: "Workspace Invites" },

    // Pricing
    { text: "The starter tier pricing is very reasonable for startups trying to close customer feedback loops.", theme: "Pricing", sentiment: "POS", score: 0.85, area: "Starter Plan" },
    { text: "Per-seat price increase on the growth plan is steep compared to competitors.", theme: "Pricing", sentiment: "NEG", score: 0.29, area: "Seat Tier Pricing" },
    { text: "Wish there was a flexible usage-based option instead of fixed monthly seat tiers.", theme: "Pricing", sentiment: "NEU", score: 0.52, area: "Usage Tiers" },
  ];

  const now = new Date();
  const statuses = ['NEW', 'REVIEWED', 'ACTIONED'];

  let createdCount = 0;
  for (let i = 0; i < 125; i++) {
    const tpl = rawFeedbackTemplates[i % rawFeedbackTemplates.length];
    const daysAgo = Math.floor(Math.random() * 88);
    const createdAt = new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000 - Math.random() * 3600000);
    const channel = channels[Math.floor(Math.random() * channels.length)];
    const customer = customers[Math.floor(Math.random() * customers.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];

    const content = i >= rawFeedbackTemplates.length 
      ? `[Ref #${1000 + i}] ${tpl.text}`
      : tpl.text;

    const feedback = await prisma.feedback.create({
      data: {
        content,
        channel,
        customerLabel: customer,
        sourceRef: `REF-${20000 + i}`,
        sentiment: tpl.sentiment,
        sentimentScore: tpl.score,
        featureArea: tpl.area,
        status,
        createdAt,
        workspaceId: workspace.id,
      },
    });

    const themeId = themeMap.get(tpl.theme);
    if (themeId) {
      await prisma.feedbackTheme.create({
        data: {
          feedbackId: feedback.id,
          themeId: themeId,
          confidence: 0.85 + Math.random() * 0.14,
        },
      });
    }

    if (i % 3 === 0) {
      const secondaryThemeNames = themesData.filter(t => t.name !== tpl.theme);
      const secondaryName = secondaryThemeNames[i % secondaryThemeNames.length].name;
      const secondaryId = themeMap.get(secondaryName);
      if (secondaryId) {
        await prisma.feedbackTheme.create({
          data: {
            feedbackId: feedback.id,
            themeId: secondaryId,
            confidence: 0.65 + Math.random() * 0.20,
          },
        });
      }
    }

    createdCount++;
  }

  console.log(`Successfully seeded ${createdCount} feedback items across 90 days!`);

  // 7. Seed 1 Sample Report
  const sampleReportJson = JSON.stringify({
    executiveSummary: "Over the last 30 days, Acme SaaS ingested 125 feedback records. Key highlights include strong satisfaction with setup onboarding and analytics UI, alongside actionable complaints regarding billing clarity and mobile UI performance.",
    totalFeedback: 125,
    sentimentBreakdown: { positive: 50, neutral: 35, negative: 40 },
    topThemes: [
      { name: "Onboarding", count: 28, sentiment: "Positive", trend: "↑", summary: "High praise for wizard UX." },
      { name: "Performance", count: 24, sentiment: "Negative", trend: "↓", summary: "Table rendering latencies reported." },
      { name: "Mobile Experience", count: 20, sentiment: "Mixed", trend: "→", summary: "iOS cutoff issues." }
    ],
    keyQuotes: [
      { quote: "The onboarding tour was super clean! Took our team less than 10 minutes.", channel: "App Store Reviews", sentiment: "POS", customer: "Acme Corp (Enterprise)" },
      { quote: "The main analytics table is taking over 6 seconds to render.", channel: "Support Tickets", sentiment: "NEG", customer: "CloudScale Inc" }
    ],
    emergingIssues: ["Spike detected in iOS web table navigation rendering.", "Unclear per-seat billing adjustments."],
    recommendedActions: [
      { priority: "HIGH", title: "Refactor Analytics Data Grid", action: "Implement virtualized scrolling to fix 6-second render latencies.", groundingTheme: "Performance" },
      { priority: "MEDIUM", title: "Fix iOS Safari Viewport Bounds", action: "Adjust CSS safe areas to prevent header overflow on mobile.", groundingTheme: "Mobile Experience" }
    ]
  });

  await prisma.report.create({
    data: {
      title: "Monthly Voice of Customer Report - Q3",
      periodStart: new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000),
      periodEnd: now,
      contentJson: sampleReportJson,
      workspaceId: workspace.id,
      generatedBy: adminUser.name,
    },
  });

  console.log('Seeded initial VoC report successfully!');
  console.log('Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

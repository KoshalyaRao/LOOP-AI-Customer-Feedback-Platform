import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { db } from '@/lib/db';
import { signupSchema } from '@/lib/validations';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = signupSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: result.error.format() },
        { status: 400 }
      );
    }

    const { name, email, password, workspaceName } = result.data;

    const existingUser = await db.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 400 }
      );
    }

    const passwordHash = await bcrypt.hash(password, 10);

    // Create Workspace and User together
    const workspace = await db.workspace.create({
      data: {
        name: workspaceName,
        users: {
          create: {
            name,
            email,
            passwordHash,
            role: 'ADMIN',
          },
        },
        // Also seed initial standard themes for new workspaces!
        themes: {
          create: [
            { name: 'Onboarding', description: 'User sign-up and setup experience.', color: '#3b82f6' },
            { name: 'Performance', description: 'Speed, responsiveness, and load times.', color: '#ef4444' },
            { name: 'Mobile Experience', description: 'Mobile view, touch, and app UI.', color: '#8b5cf6' },
            { name: 'Billing', description: 'Invoices, payments, and pricing.', color: '#f59e0b' },
            { name: 'Dashboard', description: 'Analytics and data visualization.', color: '#10b981' },
            { name: 'Integrations', description: 'Slack, Zapier, Webhooks, API.', color: '#06b6d4' },
          ],
        },
      },
      include: {
        users: true,
      },
    });

    const createdUser = workspace.users[0];

    return NextResponse.json(
      {
        message: 'Account created successfully',
        user: {
          id: createdUser.id,
          name: createdUser.name,
          email: createdUser.email,
          role: createdUser.role,
          workspaceId: workspace.id,
          workspaceName: workspace.name,
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Server error creating account' },
      { status: 500 }
    );
  }
}

import { NextResponse } from 'next/server';
import { requireWorkspaceSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { canManageTeam } from '@/lib/permissions';
import { teamMemberSchema } from '@/lib/validations';
import bcrypt from 'bcryptjs';

export async function GET(req: Request) {
  try {
    const sessionUser = await requireWorkspaceSession();
    if (!sessionUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const members = await db.user.findMany({
      where: { workspaceId: sessionUser.workspaceId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'asc' },
    });

    return NextResponse.json(members);
  } catch (error: any) {
    console.error('Team GET error:', error);
    return NextResponse.json({ error: 'Server error loading team members' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const sessionUser = await requireWorkspaceSession();
    if (!sessionUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!canManageTeam(sessionUser.role)) {
      return NextResponse.json(
        { error: 'Access Denied: Admin permission required to add team members' },
        { status: 403 }
      );
    }

    const { workspaceId } = sessionUser;
    const body = await req.json();
    const result = teamMemberSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: 'Invalid team member data', details: result.error.format() },
        { status: 400 }
      );
    }

    const { name, email, role } = result.data;

    const existingUser = await db.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 400 }
      );
    }

    // Default password for invited member
    const passwordHash = await bcrypt.hash('password123', 10);

    const newUser = await db.user.create({
      data: {
        name,
        email,
        passwordHash,
        role,
        workspaceId,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    return NextResponse.json(newUser, { status: 201 });
  } catch (error: any) {
    console.error('Team member POST error:', error);
    return NextResponse.json({ error: 'Server error adding team member' }, { status: 500 });
  }
}

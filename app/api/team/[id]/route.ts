import { NextResponse } from 'next/server';
import { requireWorkspaceSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { canManageTeam } from '@/lib/permissions';
import { updateRoleSchema } from '@/lib/validations';

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const sessionUser = await requireWorkspaceSession();
    if (!sessionUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!canManageTeam(sessionUser.role)) {
      return NextResponse.json(
        { error: 'Access Denied: Admin permission required to change user roles' },
        { status: 403 }
      );
    }

    const { workspaceId } = sessionUser;
    const body = await req.json();
    const result = updateRoleSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ error: 'Invalid role' }, { status: 400 });
    }

    const targetUser = await db.user.findFirst({
      where: { id: params.id, workspaceId },
    });

    if (!targetUser) {
      return NextResponse.json({ error: 'Team member not found' }, { status: 404 });
    }

    const updatedUser = await db.user.update({
      where: { id: params.id },
      data: { role: result.data.role },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error: any) {
    console.error('Team member role PATCH error:', error);
    return NextResponse.json({ error: 'Server error updating role' }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const sessionUser = await requireWorkspaceSession();
    if (!sessionUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!canManageTeam(sessionUser.role)) {
      return NextResponse.json(
        { error: 'Access Denied: Admin permission required to remove team members' },
        { status: 403 }
      );
    }

    const { workspaceId, id: currentUserId } = sessionUser;

    if (params.id === currentUserId) {
      return NextResponse.json({ error: 'You cannot delete your own account' }, { status: 400 });
    }

    const targetUser = await db.user.findFirst({
      where: { id: params.id, workspaceId },
    });

    if (!targetUser) {
      return NextResponse.json({ error: 'Team member not found' }, { status: 404 });
    }

    await db.user.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: 'Team member removed successfully' });
  } catch (error: any) {
    console.error('Team member DELETE error:', error);
    return NextResponse.json({ error: 'Server error removing team member' }, { status: 500 });
  }
}

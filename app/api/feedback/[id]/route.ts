import { NextResponse } from 'next/server';
import { requireWorkspaceSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { canUpdateStatus } from '@/lib/permissions';
import { feedbackStatusSchema } from '@/lib/validations';

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const sessionUser = await requireWorkspaceSession();
    if (!sessionUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const item = await db.feedback.findFirst({
      where: {
        id: params.id,
        workspaceId: sessionUser.workspaceId,
      },
      include: {
        themes: {
          include: {
            theme: true,
          },
        },
      },
    });

    if (!item) {
      return NextResponse.json({ error: 'Feedback item not found' }, { status: 404 });
    }

    return NextResponse.json(item);
  } catch (error: any) {
    console.error('Feedback detail GET error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const sessionUser = await requireWorkspaceSession();
    if (!sessionUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!canUpdateStatus(sessionUser.role)) {
      return NextResponse.json(
        { error: 'Access Denied: Permission required to change feedback status' },
        { status: 403 }
      );
    }

    const body = await req.json();
    const result = feedbackStatusSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ error: 'Invalid status value' }, { status: 400 });
    }

    const existing = await db.feedback.findFirst({
      where: { id: params.id, workspaceId: sessionUser.workspaceId },
    });

    if (!existing) {
      return NextResponse.json({ error: 'Feedback item not found' }, { status: 404 });
    }

    const updated = await db.feedback.update({
      where: { id: params.id },
      data: { status: result.data.status },
      include: {
        themes: {
          include: {
            theme: true,
          },
        },
      },
    });

    return NextResponse.json(updated);
  } catch (error: any) {
    console.error('Feedback status update PATCH error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import { requireWorkspaceSession } from '@/lib/auth';
import { db } from '@/lib/db';

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const sessionUser = await requireWorkspaceSession();
    if (!sessionUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const report = await db.report.findFirst({
      where: {
        id: params.id,
        workspaceId: sessionUser.workspaceId,
      },
    });

    if (!report) {
      return NextResponse.json({ error: 'Report not found' }, { status: 404 });
    }

    return NextResponse.json(report);
  } catch (error: any) {
    console.error('Report detail GET error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

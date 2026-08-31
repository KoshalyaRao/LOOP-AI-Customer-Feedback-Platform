import { NextResponse } from 'next/server';
import { requireWorkspaceSession } from '@/lib/auth';
import { askSchema } from '@/lib/validations';
import { searchFeedbackForQuery } from '@/lib/search';
import { generateGroundedAnswer } from '@/lib/ai';

export async function POST(req: Request) {
  try {
    const sessionUser = await requireWorkspaceSession();
    if (!sessionUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { workspaceId } = sessionUser;
    const body = await req.json();
    const result = askSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: 'Invalid question input', details: result.error.format() },
        { status: 400 }
      );
    }

    const { question } = result.data;

    // 1. Retrieve top 5 grounded feedback items using local keyword/semantic relevance scorer
    const relevantFeedback = await searchFeedbackForQuery(workspaceId, question, 5);

    // 2. Generate grounded answer
    const aiResult = await generateGroundedAnswer(question, relevantFeedback);

    return NextResponse.json(aiResult);
  } catch (error: any) {
    console.error('Ask LOOP POST error:', error);
    return NextResponse.json({ error: 'Server error processing Ask LOOP query' }, { status: 500 });
  }
}

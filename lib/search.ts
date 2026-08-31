import { db } from '@/lib/db';
import { FeedbackSentiment } from '@/types';

export interface ScoredFeedback {
  id: string;
  content: string;
  channel: string;
  sentiment: FeedbackSentiment;
  sentimentScore: number;
  featureArea: string;
  customerLabel: string | null;
  createdAt: Date;
  score: number;
}

export async function searchFeedbackForQuery(
  workspaceId: string,
  query: string,
  limit: number = 5
): Promise<ScoredFeedback[]> {
  const feedbackItems = await db.feedback.findMany({
    where: { workspaceId },
    include: {
      themes: {
        include: {
          theme: true,
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  });

  if (feedbackItems.length === 0) return [];

  const normalizedQuery = query.toLowerCase().trim();

  const stopWords = new Set([
    'a', 'an', 'the', 'is', 'are', 'was', 'were', 'and', 'or', 'but', 'in', 'on', 'at',
    'to', 'for', 'of', 'with', 'by', 'from', 'up', 'about', 'into', 'over', 'after',
    'what', 'how', 'why', 'where', 'which', 'who', 'does', 'do', 'can', 'could', 'would',
    'should', 'is', 'are', 'there', 'their', 'they', 'our', 'my', 'your', 'us', 'we', 'them'
  ]);

  const queryWords = normalizedQuery
    .replace(/[^\w\s]/gi, '')
    .split(/\s+/)
    .filter((w) => w.length > 2 && !stopWords.has(w));

  const scoredList: ScoredFeedback[] = feedbackItems.map((item) => {
    let score = 0;
    const contentLower = item.content.toLowerCase();

    if (contentLower.includes(normalizedQuery)) {
      score += 25;
    }

    queryWords.forEach((word) => {
      if (contentLower.includes(word)) {
        score += 5;
        const occurrences = (contentLower.match(new RegExp(word, 'g')) || []).length;
        score += Math.min(occurrences * 2, 6);
      }
    });

    item.themes.forEach((ft) => {
      const themeNameLower = ft.theme.name.toLowerCase();
      if (queryWords.some((w) => themeNameLower.includes(w))) {
        score += 8;
      }
    });

    const featureLower = item.featureArea.toLowerCase();
    if (queryWords.some((w) => featureLower.includes(w))) {
      score += 6;
    }

    if (
      (normalizedQuery.includes('complaint') ||
        normalizedQuery.includes('issue') ||
        normalizedQuery.includes('problem') ||
        normalizedQuery.includes('bad') ||
        normalizedQuery.includes('worst')) &&
      item.sentiment === 'NEG'
    ) {
      score += 5;
    }

    if (
      (normalizedQuery.includes('love') ||
        normalizedQuery.includes('great') ||
        normalizedQuery.includes('best') ||
        normalizedQuery.includes('praise')) &&
      item.sentiment === 'POS'
    ) {
      score += 5;
    }

    return {
      id: item.id,
      content: item.content,
      channel: item.channel,
      sentiment: item.sentiment as FeedbackSentiment,
      sentimentScore: item.sentimentScore,
      featureArea: item.featureArea,
      customerLabel: item.customerLabel,
      createdAt: item.createdAt,
      score,
    };
  });

  const nonZeroScored = scoredList.filter((i) => i.score > 0);
  const candidateList = nonZeroScored.length > 0 ? nonZeroScored : scoredList;

  candidateList.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return b.createdAt.getTime() - a.createdAt.getTime();
  });

  return candidateList.slice(0, limit);
}

export type UserRole = 'ADMIN' | 'ANALYST' | 'VIEWER';
export type FeedbackSentiment = 'POS' | 'NEU' | 'NEG';
export type FeedbackStatus = 'NEW' | 'REVIEWED' | 'ACTIONED';

export interface UserSession {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  workspaceId: string;
  workspaceName: string;
}

export interface FeedbackItem {
  id: string;
  content: string;
  channel: string;
  sourceRef: string | null;
  customerLabel: string | null;
  sentiment: FeedbackSentiment;
  sentimentScore: number;
  featureArea: string;
  status: FeedbackStatus;
  createdAt: string | Date;
  workspaceId: string;
  themes?: {
    theme: {
      id: string;
      name: string;
      color: string;
    };
    confidence: number;
  }[];
}

export interface ThemeItem {
  id: string;
  name: string;
  description: string;
  color: string;
  workspaceId: string;
  createdAt: string | Date;
  feedbackCount?: number;
  posCount?: number;
  negCount?: number;
  neuCount?: number;
  posPercent?: number;
  negPercent?: number;
  trend?: 'up' | 'down' | 'stable';
  isSpike?: boolean;
}

export interface ClassificationResult {
  sentiment: FeedbackSentiment;
  sentimentScore: number;
  themes: string[];
  featureArea: string;
  rationale: string;
}

export interface AskLoopResult {
  answer: string;
  evidence: {
    id: string;
    snippet: string;
    channel: string;
    sentiment: FeedbackSentiment;
    date: string;
    customerLabel?: string | null;
  }[];
}

export interface ReportItem {
  id: string;
  title: string;
  periodStart: string | Date;
  periodEnd: string | Date;
  contentJson: string;
  createdAt: string | Date;
  generatedBy: string;
}

export interface VoCReportContent {
  executiveSummary: string;
  totalFeedback: number;
  sentimentBreakdown: {
    positive: number;
    neutral: number;
    negative: number;
  };
  topThemes: {
    name: string;
    count: number;
    sentiment: string;
    trend: string;
    summary: string;
  }[];
  keyQuotes: {
    quote: string;
    channel: string;
    sentiment: FeedbackSentiment;
    customer: string;
  }[];
  emergingIssues: string[];
  recommendedActions: {
    priority: 'HIGH' | 'MEDIUM' | 'LOW';
    title: string;
    action: string;
    groundingTheme: string;
  }[];
}

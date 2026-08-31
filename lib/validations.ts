import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const signupSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  workspaceName: z.string().min(2, 'Workspace name must be at least 2 characters'),
});

export const feedbackSchema = z.object({
  content: z.string().min(5, 'Feedback content must be at least 5 characters'),
  channel: z.string().min(2, 'Please select a channel'),
  customerLabel: z.string().optional(),
  sourceRef: z.string().optional(),
  createdAt: z.string().optional(),
});

export const feedbackStatusSchema = z.object({
  status: z.enum(['NEW', 'REVIEWED', 'ACTIONED']),
});

export const askSchema = z.object({
  question: z.string().min(3, 'Question must be at least 3 characters'),
});

export const generateReportSchema = z.object({
  periodDays: z.number().min(1).max(365).default(30),
  customTitle: z.string().optional(),
});

export const teamMemberSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  role: z.enum(['ADMIN', 'ANALYST', 'VIEWER']),
});

export const updateRoleSchema = z.object({
  role: z.enum(['ADMIN', 'ANALYST', 'VIEWER']),
});

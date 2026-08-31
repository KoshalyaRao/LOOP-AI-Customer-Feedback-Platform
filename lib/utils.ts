import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateInput: string | Date | number): string {
  const d = new Date(dateInput);
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function formatDateTime(dateInput: string | Date | number): string {
  const d = new Date(dateInput);
  return d.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function getSentimentBadgeClass(sentiment: string) {
  switch (sentiment) {
    case 'POS':
      return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
    case 'NEG':
      return 'bg-rose-500/10 text-rose-400 border-rose-500/20';
    case 'NEU':
    default:
      return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
  }
}

export function getSentimentLabel(sentiment: string) {
  switch (sentiment) {
    case 'POS':
      return 'Positive';
    case 'NEG':
      return 'Negative';
    case 'NEU':
    default:
      return 'Neutral';
  }
}

export function getStatusBadgeClass(status: string) {
  switch (status) {
    case 'NEW':
      return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
    case 'REVIEWED':
      return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
    case 'ACTIONED':
      return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
    default:
      return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
  }
}

export function getRoleBadgeClass(role: string) {
  switch (role) {
    case 'ADMIN':
      return 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20';
    case 'ANALYST':
      return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20';
    case 'VIEWER':
    default:
      return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
  }
}

import React from 'react';
import { cn, getSentimentBadgeClass, getStatusBadgeClass, getRoleBadgeClass } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'sentiment' | 'status' | 'role' | 'default' | 'outline';
  value?: string;
  className?: string;
}

export function Badge({ children, variant = 'default', value = '', className }: BadgeProps) {
  let colorClasses = 'bg-slate-800 text-slate-300 border-slate-700';

  if (variant === 'sentiment') {
    colorClasses = getSentimentBadgeClass(value);
  } else if (variant === 'status') {
    colorClasses = getStatusBadgeClass(value);
  } else if (variant === 'role') {
    colorClasses = getRoleBadgeClass(value);
  } else if (variant === 'outline') {
    colorClasses = 'bg-transparent text-slate-300 border-slate-700';
  }

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border transition-colors',
        colorClasses,
        className
      )}
    >
      {children}
    </span>
  );
}

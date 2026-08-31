'use client';

import React from 'react';
import { Badge } from '@/components/ui/Badge';
import { formatDate, getSentimentLabel } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface RecentFeedbackListProps {
  items: any[];
  onSelect: (item: any) => void;
}

export function RecentFeedbackList({ items, onSelect }: RecentFeedbackListProps) {
  if (!items || items.length === 0) {
    return (
      <div className="p-6 text-center text-slate-500 text-xs">
        No recent feedback items found.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div
          key={item.id}
          onClick={() => onSelect(item)}
          className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-brand-500/40 hover:bg-slate-800/40 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <div className="flex items-center gap-2">
              <Badge variant="sentiment" value={item.sentiment}>
                {getSentimentLabel(item.sentiment)}
              </Badge>
              <span className="text-xs text-slate-400 font-medium">{item.channel}</span>
            </div>
            <span className="text-[11px] text-slate-500">{formatDate(item.createdAt)}</span>
          </div>

          <p className="text-xs text-slate-200 line-clamp-2 leading-relaxed group-hover:text-white transition-colors">
            {item.content}
          </p>

          <div className="flex items-center justify-between pt-2 mt-2 border-t border-slate-800/40 text-[11px]">
            <span className="text-slate-400 font-medium">{item.customerLabel || 'Anonymous'}</span>
            <span className="text-brand-400 font-medium group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
              View Details <ArrowRight className="w-3 h-3" />
            </span>
          </div>
        </div>
      ))}

      <div className="pt-2 text-center">
        <Link
          href="/inbox"
          className="text-xs font-semibold text-brand-400 hover:text-brand-300 inline-flex items-center gap-1 transition-colors"
        >
          View all feedback in Inbox <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}

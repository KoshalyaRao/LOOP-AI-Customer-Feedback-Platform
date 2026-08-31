'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { TrendingUp, TrendingDown, Minus, AlertTriangle, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface ThemeCardProps {
  theme: {
    id: string;
    name: string;
    description: string;
    color: string;
    feedbackCount: number;
    posCount: number;
    negCount: number;
    neuCount: number;
    posPercent: number;
    negPercent: number;
    trend: 'up' | 'down' | 'stable';
    isSpike?: boolean;
  };
}

export function ThemeCard({ theme }: ThemeCardProps) {
  return (
    <Card className="flex flex-col justify-between p-5 relative overflow-hidden group hover:border-brand-500/40 transition-all">
      {/* Top Banner & Spike Indicator */}
      <div>
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: theme.color }} />
            <h3 className="text-base font-bold text-white group-hover:text-brand-300 transition-colors">
              {theme.name}
            </h3>
          </div>

          <div className="flex items-center gap-1.5">
            {theme.isSpike && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-rose-500/20 text-rose-300 border border-rose-500/30 flex items-center gap-1 animate-pulse">
                <AlertTriangle className="w-3 h-3" /> Spike Detected
              </span>
            )}

            <span
              className={`px-2 py-0.5 rounded-full text-xs font-semibold flex items-center gap-1 border ${
                theme.trend === 'up'
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                  : theme.trend === 'down'
                  ? 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                  : 'bg-slate-800 text-slate-400 border-slate-700'
              }`}
            >
              {theme.trend === 'up' && <TrendingUp className="w-3 h-3" />}
              {theme.trend === 'down' && <TrendingDown className="w-3 h-3" />}
              {theme.trend === 'stable' && <Minus className="w-3 h-3" />}
              {theme.trend === 'up' ? 'Trending Up' : theme.trend === 'down' ? 'Trending Down' : 'Stable'}
            </span>
          </div>
        </div>

        <p className="text-xs text-slate-400 line-clamp-2 mb-4 leading-relaxed">{theme.description}</p>
      </div>

      {/* Metrics & Sentiment Bar */}
      <div className="space-y-3 pt-3 border-t border-slate-800/80">
        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-400">Total Volume:</span>
          <span className="font-bold text-white">{theme.feedbackCount} items</span>
        </div>

        {/* Stacked Sentiment Ratio Bar */}
        <div>
          <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
            <span className="text-emerald-400 font-medium">{theme.posPercent}% Pos</span>
            <span className="text-rose-400 font-medium">{theme.negPercent}% Neg</span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden flex">
            <div
              className="h-full bg-emerald-500 transition-all duration-500"
              style={{ width: `${theme.posPercent}%` }}
              title={`Positive: ${theme.posCount}`}
            />
            <div
              className="h-full bg-amber-500 transition-all duration-500"
              style={{ width: `${100 - theme.posPercent - theme.negPercent}%` }}
              title={`Neutral: ${theme.neuCount}`}
            />
            <div
              className="h-full bg-rose-500 transition-all duration-500"
              style={{ width: `${theme.negPercent}%` }}
              title={`Negative: ${theme.negCount}`}
            />
          </div>
        </div>

        {/* Link to Inbox Filtered */}
        <div className="pt-2 flex justify-end">
          <Link
            href={`/inbox?theme=${encodeURIComponent(theme.name)}`}
            className="text-xs font-semibold text-brand-400 hover:text-brand-300 inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
          >
            Filter Feedback in Inbox <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </Card>
  );
}

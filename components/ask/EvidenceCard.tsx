import React from 'react';
import { Badge } from '@/components/ui/Badge';
import { getSentimentLabel } from '@/lib/utils';
import { Quote } from 'lucide-react';

interface EvidenceCardProps {
  item: {
    id: string;
    snippet: string;
    channel: string;
    sentiment: string;
    date: string;
    customerLabel?: string | null;
  };
}

export function EvidenceCard({ item }: EvidenceCardProps) {
  return (
    <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-brand-500/30 transition-all text-xs space-y-2">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Badge variant="sentiment" value={item.sentiment}>
            {getSentimentLabel(item.sentiment)}
          </Badge>
          <span className="text-slate-400 font-medium">{item.channel}</span>
        </div>
        <span className="text-[11px] text-slate-500">{item.date}</span>
      </div>

      <div className="flex items-start gap-2 pt-1 text-slate-200">
        <Quote className="w-3.5 h-3.5 text-brand-400 shrink-0 mt-0.5" />
        <p className="leading-relaxed italic">"{item.snippet}"</p>
      </div>

      <div className="pt-1.5 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
        <span>Customer: <strong className="text-slate-300 font-semibold">{item.customerLabel || 'Anonymous'}</strong></span>
        <span className="text-[10px] text-slate-500 font-mono">Verified DB Evidence</span>
      </div>
    </div>
  );
}

'use client';

import React from 'react';
import { Badge } from '@/components/ui/Badge';
import { formatDate, getSentimentLabel } from '@/lib/utils';
import { useSession } from 'next-auth/react';
import { Eye } from 'lucide-react';

interface FeedbackTableProps {
  items: any[];
  onSelect: (item: any) => void;
  onStatusChange: (id: string, newStatus: string) => void;
}

export function FeedbackTable({ items, onSelect, onStatusChange }: FeedbackTableProps) {
  const { data: session } = useSession();
  const role = (session?.user as any)?.role || 'VIEWER';
  const canEdit = role === 'ADMIN' || role === 'ANALYST';

  if (!items || items.length === 0) {
    return (
      <div className="p-12 text-center glass-panel rounded-2xl border border-slate-800 my-4">
        <p className="text-sm font-semibold text-slate-300">No feedback items match your filters.</p>
        <p className="text-xs text-slate-500 mt-1">Start by adding customer feedback or importing a CSV file.</p>
      </div>
    );
  }

  return (
    <div className="glass-card rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-900/90 text-slate-400 uppercase font-semibold text-xs border-b border-slate-800">
            <tr>
              <th className="p-4">Feedback Preview</th>
              <th className="p-4">Channel</th>
              <th className="p-4">Sentiment</th>
              <th className="p-4">Themes</th>
              <th className="p-4">Feature Area</th>
              <th className="p-4">Status</th>
              <th className="p-4">Date</th>
              <th className="p-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 text-slate-200">
            {items.map((item) => (
              <tr
                key={item.id}
                className="hover:bg-slate-800/40 transition-colors cursor-pointer group"
                onClick={() => onSelect(item)}
              >
                <td className="p-4 max-w-sm">
                  <p className="line-clamp-2 text-xs text-slate-100 font-medium group-hover:text-brand-300 transition-colors">
                    {item.content}
                  </p>
                  <p className="text-[11px] text-slate-500 mt-1">
                    {item.customerLabel ? `Customer: ${item.customerLabel}` : `Ref: ${item.sourceRef}`}
                  </p>
                </td>

                <td className="p-4 whitespace-nowrap text-xs font-semibold text-slate-300">
                  {item.channel}
                </td>

                <td className="p-4 whitespace-nowrap">
                  <Badge variant="sentiment" value={item.sentiment}>
                    {getSentimentLabel(item.sentiment)}
                  </Badge>
                </td>

                <td className="p-4 max-w-xs">
                  <div className="flex flex-wrap gap-1">
                    {item.themes?.map((ft: any) => (
                      <span
                        key={ft.theme.id}
                        className="px-2 py-0.5 rounded text-[11px] font-semibold border"
                        style={{
                          backgroundColor: `${ft.theme.color}15`,
                          borderColor: `${ft.theme.color}30`,
                          color: ft.theme.color,
                        }}
                      >
                        {ft.theme.name}
                      </span>
                    ))}
                  </div>
                </td>

                <td className="p-4 whitespace-nowrap text-xs text-slate-300 font-medium">
                  {item.featureArea}
                </td>

                <td className="p-4 whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                  {canEdit ? (
                    <select
                      value={item.status}
                      onChange={(e) => onStatusChange(item.id, e.target.value)}
                      className="bg-slate-950 border border-slate-700 text-xs font-semibold text-slate-200 rounded-lg p-1.5 focus:outline-none focus:border-brand-500 cursor-pointer"
                    >
                      <option value="NEW">NEW</option>
                      <option value="REVIEWED">REVIEWED</option>
                      <option value="ACTIONED">ACTIONED</option>
                    </select>
                  ) : (
                    <Badge variant="status" value={item.status}>
                      {item.status}
                    </Badge>
                  )}
                </td>

                <td className="p-4 whitespace-nowrap text-xs text-slate-400">
                  {formatDate(item.createdAt)}
                </td>

                <td className="p-4 text-right whitespace-nowrap">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelect(item);
                    }}
                    className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors inline-flex items-center gap-1 text-xs"
                  >
                    <Eye className="w-3.5 h-3.5" /> Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

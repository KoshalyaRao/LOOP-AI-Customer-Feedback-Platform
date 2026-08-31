'use client';

import React, { useState } from 'react';
import { Sparkles, Calendar, Tag, User, Layers, RefreshCw } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { useToast } from '@/components/ui/Toast';
import { formatDate, getSentimentLabel } from '@/lib/utils';
import { useSession } from 'next-auth/react';

interface FeedbackDetailModalProps {
  item: any | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: () => void;
}

export function FeedbackDetailModal({ item, isOpen, onClose, onUpdate }: FeedbackDetailModalProps) {
  const { showToast } = useToast();
  const { data: session } = useSession();
  const role = (session?.user as any)?.role || 'VIEWER';
  const canEdit = role === 'ADMIN' || role === 'ANALYST';

  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [isReclassifying, setIsReclassifying] = useState(false);
  const [rationale, setRationale] = useState<string | null>(null);

  if (!item) return null;

  const handleStatusChange = async (newStatus: string) => {
    setIsUpdatingStatus(true);
    try {
      const res = await fetch(`/api/feedback/${item.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to update status');
      }

      showToast(`Status updated to ${newStatus}`, 'success');
      onUpdate();
    } catch (err: any) {
      showToast(err.message || 'Status update error', 'error');
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  const handleReclassify = async () => {
    setIsReclassifying(true);
    try {
      const res = await fetch(`/api/feedback/${item.id}/classify`, {
        method: 'POST',
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to reclassify');
      }

      setRationale(data.rationale);
      showToast('Feedback reclassified by AI successfully!', 'success');
      onUpdate();
    } catch (err: any) {
      showToast(err.message || 'Reclassify error', 'error');
    } finally {
      setIsReclassifying(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Customer Feedback Detail"
      subtitle={`Source Ref: ${item.sourceRef || 'N/A'}`}
      maxWidth="2xl"
    >
      <div className="space-y-5">
        {/* Sentiment & Status Row */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl bg-slate-900 border border-slate-800">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-medium">Sentiment:</span>
              <Badge variant="sentiment" value={item.sentiment}>
                {getSentimentLabel(item.sentiment)} ({Math.round(item.sentimentScore * 100)}%)
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-medium">Feature Area:</span>
              <span className="text-xs font-semibold text-brand-300">{item.featureArea}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-medium">Status:</span>
            {canEdit ? (
              <select
                value={item.status}
                onChange={(e) => handleStatusChange(e.target.value)}
                disabled={isUpdatingStatus}
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
          </div>
        </div>

        {/* Content Box */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Feedback Content</h4>
          <p className="text-sm text-slate-100 leading-relaxed whitespace-pre-wrap">{item.content}</p>
        </div>

        {/* Metadata Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-2.5">
            <Tag className="w-4 h-4 text-brand-400 shrink-0" />
            <div>
              <p className="text-slate-400 text-[10px]">Channel</p>
              <p className="font-semibold text-white truncate">{item.channel}</p>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-2.5">
            <User className="w-4 h-4 text-indigo-400 shrink-0" />
            <div>
              <p className="text-slate-400 text-[10px]">Customer / Label</p>
              <p className="font-semibold text-white truncate">{item.customerLabel || 'Anonymous'}</p>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-2.5">
            <Calendar className="w-4 h-4 text-emerald-400 shrink-0" />
            <div>
              <p className="text-slate-400 text-[10px]">Submitted Date</p>
              <p className="font-semibold text-white truncate">{formatDate(item.createdAt)}</p>
            </div>
          </div>
        </div>

        {/* Themes List */}
        <div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 mb-2">
            <Layers className="w-3.5 h-3.5 text-brand-400" />
            <span>Associated Themes:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {item.themes?.map((ft: any) => (
              <span
                key={ft.theme.id}
                className="px-2.5 py-1 rounded-lg text-xs font-semibold border flex items-center gap-1.5"
                style={{
                  backgroundColor: `${ft.theme.color}15`,
                  borderColor: `${ft.theme.color}40`,
                  color: ft.theme.color,
                }}
              >
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: ft.theme.color }} />
                {ft.theme.name}
              </span>
            ))}
          </div>
        </div>

        {/* AI Rationale Section */}
        <div className="p-3.5 rounded-xl bg-brand-950/40 border border-brand-500/20 text-xs space-y-1">
          <div className="flex items-center gap-1.5 font-bold text-brand-300">
            <Sparkles className="w-3.5 h-3.5" /> AI Classification Rationale
          </div>
          <p className="text-slate-300 leading-relaxed">
            {rationale || `Automated sentiment score: ${item.sentimentScore} | Primary domain: ${item.featureArea}.`}
          </p>
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-800">
          {canEdit ? (
            <Button
              variant="outline"
              size="sm"
              onClick={handleReclassify}
              isLoading={isReclassifying}
              className="gap-1.5 text-cyan-400 border-cyan-500/30 hover:bg-cyan-500/10"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Re-classify with AI
            </Button>
          ) : (
            <div />
          )}

          <Button variant="secondary" size="sm" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </Modal>
  );
}

'use client';

import React, { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/components/ui/Toast';
import { FileText, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface GenerateReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function GenerateReportModal({ isOpen, onClose, onSuccess }: GenerateReportModalProps) {
  const { showToast } = useToast();
  const router = useRouter();
  const [periodDays, setPeriodDays] = useState(30);
  const [customTitle, setCustomTitle] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch('/api/reports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          periodDays,
          customTitle: customTitle || undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to generate VoC report');
      }

      showToast('Voice of Customer Report generated!', 'success');
      onSuccess();
      onClose();
      router.push(`/reports/${data.id}`);
    } catch (err: any) {
      showToast(err.message || 'Report generation error', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Generate Voice of Customer Report"
      subtitle="AI will aggregate sentiment shifts, theme spikes, quotes, and recommended actions."
    >
      <form onSubmit={handleGenerate} className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1">Time Period Range</label>
          <div className="grid grid-cols-3 gap-3">
            {[
              { days: 7, label: 'Last 7 Days' },
              { days: 30, label: 'Last 30 Days' },
              { days: 90, label: 'Last 90 Days' },
            ].map((p) => (
              <button
                key={p.days}
                type="button"
                onClick={() => setPeriodDays(p.days)}
                className={`p-3 rounded-xl border text-xs font-semibold transition-all ${
                  periodDays === p.days
                    ? 'bg-brand-600/20 border-brand-500 text-white shadow-md'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1">Custom Report Title (Optional)</label>
          <input
            type="text"
            value={customTitle}
            onChange={(e) => setCustomTitle(e.target.value)}
            placeholder="e.g. Monthly Executive VoC Summary - Q3"
            className="w-full rounded-xl bg-slate-900 border border-slate-800 p-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-brand-500"
          />
        </div>

        <div className="p-3.5 rounded-xl bg-brand-950/40 border border-brand-500/20 text-xs text-slate-300 flex items-start gap-2.5">
          <Sparkles className="w-4 h-4 text-brand-400 shrink-0 mt-0.5" />
          <p>
            Report includes Executive Summary, Theme Shifts, Sentiment Overview, Verified Customer Quotes, Emerging Spikes, and Ranked Recommendations.
          </p>
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
          <Button variant="outline" type="button" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button variant="primary" type="submit" isLoading={isLoading} className="gap-2">
            <FileText className="w-4 h-4" />
            Generate Report
          </Button>
        </div>
      </form>
    </Modal>
  );
}

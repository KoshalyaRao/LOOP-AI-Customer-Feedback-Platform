'use client';

import React, { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/components/ui/Toast';

interface AddFeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function AddFeedbackModal({ isOpen, onClose, onSuccess }: AddFeedbackModalProps) {
  const { showToast } = useToast();
  const [content, setContent] = useState('');
  const [channel, setChannel] = useState('Support Tickets');
  const [customerLabel, setCustomerLabel] = useState('');
  const [sourceRef, setSourceRef] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const channelsList = [
    'Support Tickets',
    'App Store Reviews',
    'NPS Surveys',
    'Sales Call Notes',
    'Community Posts',
    'Direct Email',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) {
      setError('Feedback content is required');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content,
          channel,
          customerLabel: customerLabel || undefined,
          sourceRef: sourceRef || undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit feedback');
      }

      showToast('Feedback submitted and classified by AI!', 'success');
      setContent('');
      setCustomerLabel('');
      setSourceRef('');
      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.message || 'Error submitting feedback');
      showToast(err.message || 'Error submitting feedback', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add Customer Feedback"
      subtitle="Input raw feedback. AI will automatically classify sentiment, feature area, and themes."
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-medium">
            {error}
          </div>
        )}

        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1">
            Feedback Content <span className="text-rose-400">*</span>
          </label>
          <textarea
            rows={4}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Paste customer review, support ticket content, or call notes..."
            className="w-full rounded-xl bg-slate-900 border border-slate-800 p-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
            required
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Feedback Channel <span className="text-rose-400">*</span>
            </label>
            <select
              value={channel}
              onChange={(e) => setChannel(e.target.value)}
              className="w-full rounded-xl bg-slate-900 border border-slate-800 p-2.5 text-sm text-slate-100 focus:outline-none focus:border-brand-500"
            >
              {channelsList.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Customer / Company Label</label>
            <input
              type="text"
              value={customerLabel}
              onChange={(e) => setCustomerLabel(e.target.value)}
              placeholder="e.g. Acme Corp or John Doe"
              className="w-full rounded-xl bg-slate-900 border border-slate-800 p-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-brand-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1">Source Reference (Optional)</label>
          <input
            type="text"
            value={sourceRef}
            onChange={(e) => setSourceRef(e.target.value)}
            placeholder="e.g. Ticket #10492 or Zendesk ID"
            className="w-full rounded-xl bg-slate-900 border border-slate-800 p-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-brand-500"
          />
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
          <Button variant="outline" type="button" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button variant="primary" type="submit" isLoading={isLoading}>
            Submit & Classify
          </Button>
        </div>
      </form>
    </Modal>
  );
}

'use client';

import React, { useState } from 'react';
import { Zap, MessageSquare, Star } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/components/ui/Toast';

interface SimulateChannelModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function SimulateChannelModal({ isOpen, onClose, onSuccess }: SimulateChannelModalProps) {
  const { showToast } = useToast();
  const [channelType, setChannelType] = useState<'Support Tickets' | 'App Store Reviews'>('Support Tickets');
  const [isLoading, setIsLoading] = useState(false);

  const handleSimulate = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/feedback/simulate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ channelType }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Simulation failed');
      }

      showToast(data.message, 'success');
      onSuccess();
      onClose();
    } catch (err: any) {
      showToast(err.message || 'Simulation error', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Simulate Feedback Integration Channel"
      subtitle="Instantly inject and AI-classify realistic live customer feedback into your workspace."
    >
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div
            onClick={() => setChannelType('Support Tickets')}
            className={`p-4 rounded-xl border cursor-pointer transition-all ${
              channelType === 'Support Tickets'
                ? 'bg-brand-600/15 border-brand-500 text-white shadow-lg shadow-brand-600/10'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
            }`}
          >
            <div className="w-9 h-9 rounded-lg bg-brand-500/10 text-brand-400 flex items-center justify-center mb-3">
              <MessageSquare className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-white mb-1">Import Demo Support Tickets</h4>
            <p className="text-xs text-slate-400">
              Inject 10 technical support ticket inquiries covering bugs, SSO, and billing issues.
            </p>
          </div>

          <div
            onClick={() => setChannelType('App Store Reviews')}
            className={`p-4 rounded-xl border cursor-pointer transition-all ${
              channelType === 'App Store Reviews'
                ? 'bg-amber-600/15 border-amber-500 text-white shadow-lg shadow-amber-600/10'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
            }`}
          >
            <div className="w-9 h-9 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center mb-3">
              <Star className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-white mb-1">Import App Store Reviews</h4>
            <p className="text-xs text-slate-400">
              Inject 10 mobile app store reviews spanning star ratings, dark mode, and UI performance feedback.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSimulate} isLoading={isLoading} className="gap-2">
            <Zap className="w-4 h-4 text-amber-400 fill-amber-400" />
            Simulate 10 Ingested Items
          </Button>
        </div>
      </div>
    </Modal>
  );
}

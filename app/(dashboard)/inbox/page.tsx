"use client";
export const dynamic = "force-dynamic";

import React, { Suspense,useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { FeedbackTable } from '@/components/feedback/FeedbackTable';
import { FeedbackDetailModal } from '@/components/feedback/FeedbackDetailModal';
import { LoadingSkeleton } from '@/components/ui/LoadingSkeleton';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/components/ui/Toast';
import { Search, Filter, ChevronLeft, ChevronRight, RefreshCw } from 'lucide-react';

function InboxContent() {
  const searchParams = useSearchParams();
  const initialTheme = searchParams.get('theme') || '';

  const { showToast } = useToast();
  const [items, setItems] = useState<any[]>([]);
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1, total: 0 });
  const [isLoading, setIsLoading] = useState(true);

  // Filter States
  const [search, setSearch] = useState('');
  const [channel, setChannel] = useState('');
  const [sentiment, setSentiment] = useState('');
  const [status, setStatus] = useState('');
  const [theme, setTheme] = useState(initialTheme);
  const [page, setPage] = useState(1);

  // Selected item modal
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const fetchFeedback = useCallback(async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      params.set('page', page.toString());
      params.set('limit', '12');
      if (search) params.set('search', search);
      if (channel) params.set('channel', channel);
      if (sentiment) params.set('sentiment', sentiment);
      if (status) params.set('status', status);
      if (theme) params.set('theme', theme);

      const res = await fetch(`/api/feedback?${params.toString()}`);
      const data = await res.json();

      if (res.ok) {
        setItems(data.items || []);
        setPagination(data.pagination || { page: 1, totalPages: 1, total: 0 });
      }
    } catch (err) {
      console.error('Failed to fetch feedback:', err);
    } finally {
      setIsLoading(false);
    }
  }, [page, search, channel, sentiment, status, theme]);

  useEffect(() => {
    fetchFeedback();
  }, [fetchFeedback]);

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/feedback/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        showToast(`Status updated to ${newStatus}`, 'success');
        fetchFeedback();
      } else {
        const errData = await res.json();
        showToast(errData.error || 'Failed to update status', 'error');
      }
    } catch (err: any) {
      showToast(err.message || 'Status update failed', 'error');
    }
  };

  const handleSelectItem = (item: any) => {
    setSelectedItem(item);
    setIsDetailOpen(true);
  };

  const resetFilters = () => {
    setSearch('');
    setChannel('');
    setSentiment('');
    setStatus('');
    setTheme('');
    setPage(1);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Filter Control Bar */}
      <div className="glass-panel p-4 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Search feedback text, customer, or ref..."
              className="w-full rounded-xl bg-slate-900 border border-slate-800 pl-9 pr-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-brand-500"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1">
            {/* Channel Filter */}
            <select
              value={channel}
              onChange={(e) => {
                setChannel(e.target.value);
                setPage(1);
              }}
              className="bg-slate-900 border border-slate-800 text-xs text-slate-300 rounded-xl p-2 focus:outline-none focus:border-brand-500"
            >
              <option value="">All Channels</option>
              <option value="Support Tickets">Support Tickets</option>
              <option value="App Store Reviews">App Store Reviews</option>
              <option value="NPS Surveys">NPS Surveys</option>
              <option value="Sales Call Notes">Sales Call Notes</option>
              <option value="Community Posts">Community Posts</option>
            </select>

            {/* Sentiment Filter */}
            <select
              value={sentiment}
              onChange={(e) => {
                setSentiment(e.target.value);
                setPage(1);
              }}
              className="bg-slate-900 border border-slate-800 text-xs text-slate-300 rounded-xl p-2 focus:outline-none focus:border-brand-500"
            >
              <option value="">All Sentiments</option>
              <option value="POS">Positive</option>
              <option value="NEU">Neutral</option>
              <option value="NEG">Negative</option>
            </select>

            {/* Status Filter */}
            <select
              value={status}
              onChange={(e) => {
                setStatus(e.target.value);
                setPage(1);
              }}
              className="bg-slate-900 border border-slate-800 text-xs text-slate-300 rounded-xl p-2 focus:outline-none focus:border-brand-500"
            >
              <option value="">All Statuses</option>
              <option value="NEW">NEW</option>
              <option value="REVIEWED">REVIEWED</option>
              <option value="ACTIONED">ACTIONED</option>
            </select>

            {(search || channel || sentiment || status || theme) && (
              <Button variant="ghost" size="sm" onClick={resetFilters} className="text-slate-400 text-xs shrink-0">
                <RefreshCw className="w-3 h-3 mr-1" /> Reset
              </Button>
            )}
          </div>
        </div>

        {theme && (
          <div className="flex items-center gap-2 pt-2 border-t border-slate-800/60 text-xs">
            <span className="text-slate-400">Filtered by Theme:</span>
            <span className="px-2.5 py-0.5 rounded-full bg-brand-500/20 text-brand-300 font-bold border border-brand-500/30 flex items-center gap-1.5">
              {theme}
              <button onClick={() => setTheme('')} className="hover:text-white font-bold ml-1">
                ×
              </button>
            </span>
          </div>
        )}
      </div>

      {/* Main Table View */}
      {isLoading ? (
        <LoadingSkeleton count={6} height="h-16" />
      ) : (
        <FeedbackTable items={items} onSelect={handleSelectItem} onStatusChange={handleStatusChange} />
      )}

      {/* Pagination Footer */}
      {!isLoading && pagination.totalPages > 1 && (
        <div className="flex items-center justify-between glass-panel p-4 rounded-2xl border border-slate-800 text-xs">
          <span className="text-slate-400">
            Showing page <strong className="text-white">{pagination.page}</strong> of{' '}
            <strong className="text-white">{pagination.totalPages}</strong> ({pagination.total} total items)
          </span>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={page <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="gap-1"
            >
              <ChevronLeft className="w-4 h-4" /> Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={page >= pagination.totalPages}
              onClick={() => setPage((p) => Math.min(pagination.totalPages, p + 1))}
              className="gap-1"
            >
              Next <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Feedback Detail Modal */}
      <FeedbackDetailModal
        item={selectedItem}
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        onUpdate={fetchFeedback}
      />
    </div>
  );
}
export default function InboxPage() {
  return (
    <Suspense fallback={<LoadingSkeleton count={6} height="h-16" />}>
      <InboxContent />
    </Suspense>
  );
}

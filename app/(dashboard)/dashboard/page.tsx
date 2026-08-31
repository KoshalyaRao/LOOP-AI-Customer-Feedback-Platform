'use client';

import React, { useState, useEffect } from 'react';
import { KpiCard } from '@/components/dashboard/KpiCard';
import { VolumeChart } from '@/components/dashboard/VolumeChart';
import { SentimentChart } from '@/components/dashboard/SentimentChart';
import { ThemesChart } from '@/components/dashboard/ThemesChart';
import { RecentFeedbackList } from '@/components/dashboard/RecentFeedbackList';
import { FeedbackDetailModal } from '@/components/feedback/FeedbackDetailModal';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { CardSkeleton } from '@/components/ui/LoadingSkeleton';
import { MessageSquare, AlertTriangle, Calendar, Flame, Sparkles } from 'lucide-react';

export default function DashboardPage() {
  const [days, setDays] = useState(30);
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const fetchDashboardData = async (periodDays: number) => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/dashboard?days=${periodDays}`);
      const json = await res.json();
      if (res.ok) {
        setData(json);
      }
    } catch (err) {
      console.error('Failed to fetch dashboard data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData(days);
  }, [days]);

  const handleSelectItem = (item: any) => {
    setSelectedItem(item);
    setIsDetailOpen(true);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Date Range Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-card p-4 rounded-2xl border border-slate-800">
        <div>
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <Calendar className="w-4 h-4 text-brand-400" /> Time Range Filter
          </h2>
          <p className="text-xs text-slate-400">Filtering feedback metrics across selected timeframe.</p>
        </div>

        <div className="flex items-center gap-2">
          {[
            { label: '7 Days', value: 7 },
            { label: '30 Days', value: 30 },
            { label: '90 Days', value: 90 },
          ].map((option) => (
            <button
              key={option.value}
              onClick={() => setDays(option.value)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                days === option.value
                  ? 'bg-brand-600 text-white shadow-lg shadow-brand-600/20'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Cards Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <KpiCard
            title="Total Feedback"
            value={data?.kpis?.totalFeedback || 0}
            subtitle={`Ingested over last ${days} days`}
            icon={MessageSquare}
            colorVariant="brand"
          />
          <KpiCard
            title="Negative Sentiment %"
            value={`${data?.kpis?.negPercent || 0}%`}
            subtitle="Requires team attention"
            icon={AlertTriangle}
            colorVariant={data?.kpis?.negPercent > 30 ? 'rose' : 'amber'}
          />
          <KpiCard
            title="New This Week"
            value={data?.kpis?.newThisWeek || 0}
            subtitle="Feedback received last 7 days"
            icon={Sparkles}
            colorVariant="emerald"
          />
          <KpiCard
            title="Top Trending Theme"
            value={data?.kpis?.topTrendingTheme || 'N/A'}
            subtitle="Highest volume topic"
            icon={Flame}
            colorVariant="amber"
          />
        </div>
      )}

      {/* Charts Row 1: Volume Over Time & Sentiment Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <div>
              <CardTitle>Feedback Volume Over Time</CardTitle>
              <CardDescription>Daily breakdown of total vs negative incoming feedback.</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? <CardSkeleton /> : <VolumeChart data={data?.charts?.volumeOverTime} />}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div>
              <CardTitle>Sentiment Breakdown</CardTitle>
              <CardDescription>Positive, Neutral, and Negative proportions.</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? <CardSkeleton /> : <SentimentChart data={data?.charts?.sentimentBreakdown} />}
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2: Top Themes & Recent Feedback */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <div>
              <CardTitle>Top Themes Breakdown</CardTitle>
              <CardDescription>Categorized feedback count per feature domain.</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? <CardSkeleton /> : <ThemesChart data={data?.charts?.topThemes} />}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div>
              <CardTitle>Recent Customer Feedback</CardTitle>
              <CardDescription>Latest items ingested in workspace.</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <CardSkeleton />
            ) : (
              <RecentFeedbackList items={data?.recentFeedback} onSelect={handleSelectItem} />
            )}
          </CardContent>
        </Card>
      </div>

      {/* Feedback Detail Modal */}
      <FeedbackDetailModal
        item={selectedItem}
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        onUpdate={() => fetchDashboardData(days)}
      />
    </div>
  );
}

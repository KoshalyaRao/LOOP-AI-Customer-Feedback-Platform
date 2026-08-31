'use client';

import React, { useState, useEffect } from 'react';
import { ThemeCard } from '@/components/trends/ThemeCard';
import { TrendChart } from '@/components/trends/TrendChart';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { LoadingSkeleton } from '@/components/ui/LoadingSkeleton';
import { TrendingUp, AlertTriangle, Sparkles } from 'lucide-react';

export default function TrendsPage() {
  const [themes, setThemes] = useState<any[]>([]);
  const [trendsChartData, setTrendsChartData] = useState<any>({ seriesData: [], themeNames: [] });
  const [isLoading, setIsLoading] = useState(true);

  const fetchTrendsData = async () => {
    setIsLoading(true);
    try {
      const [themesRes, chartRes] = await Promise.all([
        fetch('/api/themes'),
        fetch('/api/themes/trends?days=30'),
      ]);

      const themesJson = await themesRes.json();
      const chartJson = await chartRes.json();

      if (themesRes.ok) setThemes(themesJson || []);
      if (chartRes.ok) setTrendsChartData(chartJson || { seriesData: [], themeNames: [] });
    } catch (err) {
      console.error('Failed to fetch trends data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTrendsData();
  }, []);

  const spikeCount = themes.filter((t) => t.isSpike).length;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Spike Detection Alert Banner */}
      {spikeCount > 0 && (
        <div className="p-4 rounded-2xl bg-rose-950/40 border border-rose-500/30 flex items-center justify-between gap-4 animate-in fade-in duration-300">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500/30 flex items-center justify-center font-bold shrink-0">
              <AlertTriangle className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-rose-200">
                Spike Alert: {spikeCount} theme(s) detected with significant negative feedback growth
              </h3>
              <p className="text-xs text-rose-300/80">
                Feedback volume spiked over 40% in the last 30 days. Review flagged theme cards below.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Multi-theme Volume Chart */}
      <Card>
        <CardHeader>
          <div>
            <CardTitle>Top Themes Volume Timeline (30 Days)</CardTitle>
            <CardDescription>Comparative shift in customer discussion topics over time.</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <LoadingSkeleton count={1} height="h-72" />
          ) : (
            <TrendChart
              seriesData={trendsChartData.seriesData}
              themeNames={trendsChartData.themeNames}
            />
          )}
        </CardContent>
      </Card>

      {/* Theme Cards Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-brand-400" /> All Customer Themes ({themes.length})
          </h2>
          <p className="text-xs text-slate-400">Click any card to filter related items in Feedback Inbox.</p>
        </div>

        {isLoading ? (
          <LoadingSkeleton count={4} height="h-44" />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {themes.map((t) => (
              <ThemeCard key={t.id} theme={t} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

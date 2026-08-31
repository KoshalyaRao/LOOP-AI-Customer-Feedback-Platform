'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { ReportView } from '@/components/reports/ReportView';
import { LoadingSkeleton } from '@/components/ui/LoadingSkeleton';

export default function ReportDetailPage() {
  const params = useParams();
  const reportId = params.id as string;

  const [report, setReport] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchReport = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/reports/${reportId}`);
        const data = await res.json();
        if (res.ok) {
          setReport(data);
        } else {
          setError(data.error || 'Report not found');
        }
      } catch (err: any) {
        setError(err.message || 'Error loading report');
      } finally {
        setIsLoading(false);
      }
    };

    if (reportId) fetchReport();
  }, [reportId]);

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <LoadingSkeleton count={1} height="h-96" />
      </div>
    );
  }

  if (error || !report) {
    return (
      <div className="max-w-md mx-auto p-8 text-center glass-panel rounded-2xl border border-rose-500/20 my-12">
        <p className="text-sm font-semibold text-rose-300">{error || 'Report not found'}</p>
      </div>
    );
  }

  return <ReportView report={report} />;
}

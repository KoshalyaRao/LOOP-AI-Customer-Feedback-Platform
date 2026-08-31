'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Plus, Upload, Zap } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

interface HeaderProps {
  onOpenAddModal?: () => void;
  onOpenCsvModal?: () => void;
  onOpenSimulateModal?: () => void;
}

export function Header({
  onOpenAddModal,
  onOpenCsvModal,
  onOpenSimulateModal,
}: HeaderProps) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const role = (session?.user as any)?.role || 'VIEWER';

  const pageTitles: { [key: string]: { title: string; subtitle: string } } = {
    '/dashboard': {
      title: 'Analytics Dashboard',
      subtitle: 'Real-time overview of customer sentiment, volume metrics, and top themes.',
    },
    '/inbox': {
      title: 'Feedback Inbox',
      subtitle: 'Browse, search, filter, and update customer feedback records.',
    },
    '/trends': {
      title: 'Trends & Themes',
      subtitle: 'Theme clustering, spike detection alerts, and volume shifts over time.',
    },
    '/ask': {
      title: 'Ask LOOP AI',
      subtitle: 'Ask questions about customer feedback grounded in actual database evidence.',
    },
    '/reports': {
      title: 'Voice of Customer Reports',
      subtitle: 'Generate evidence-backed executive summaries and actionable recommendations.',
    },
    '/settings': {
      title: 'Team & Workspace Settings',
      subtitle: 'Manage workspace members, assign RBAC permissions, and view tenant configurations.',
    },
  };

  const currentMeta = pageTitles[pathname] || {
    title: 'Customer Feedback Intelligence',
    subtitle: 'Close the loop on customer feedback.',
  };

  const canCreate = role === 'ADMIN' || role === 'ANALYST';

  return (
    <header className="sticky top-0 z-30 glass-panel border-b border-slate-800/80 px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 ml-0 lg:ml-64">
      <div>
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-bold tracking-tight text-white">{currentMeta.title}</h1>
          <Badge variant="role" value={role}>
            {role}
          </Badge>
        </div>
        <p className="text-xs text-slate-400 mt-0.5">{currentMeta.subtitle}</p>
      </div>

      {canCreate && (
        <div className="flex items-center gap-2 flex-wrap">
          {onOpenSimulateModal && (
            <Button
              variant="outline"
              size="sm"
              onClick={onOpenSimulateModal}
              className="gap-1.5 text-cyan-400 border-cyan-500/30 hover:bg-cyan-500/10"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Simulate Channel</span>
            </Button>
          )}

          {onOpenCsvModal && (
            <Button
              variant="secondary"
              size="sm"
              onClick={onOpenCsvModal}
              className="gap-1.5"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Import CSV</span>
            </Button>
          )}

          {onOpenAddModal && (
            <Button
              variant="primary"
              size="sm"
              onClick={onOpenAddModal}
              className="gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Add Feedback</span>
            </Button>
          )}
        </div>
      )}
    </header>
  );
}

'use client';

import React, { useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { AddFeedbackModal } from '@/components/feedback/AddFeedbackModal';
import { CsvImportModal } from '@/components/feedback/CsvImportModal';
import { SimulateChannelModal } from '@/components/feedback/SimulateChannelModal';
import { useRouter } from 'next/navigation';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isCsvOpen, setIsCsvOpen] = useState(false);
  const [isSimulateOpen, setIsSimulateOpen] = useState(false);

  const handleGlobalRefresh = () => {
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Sidebar />
      <Header
        onOpenAddModal={() => setIsAddOpen(true)}
        onOpenCsvModal={() => setIsCsvOpen(true)}
        onOpenSimulateModal={() => setIsSimulateOpen(true)}
      />

      <main className="flex-1 ml-0 lg:ml-64 p-4 sm:p-6 lg:p-8 overflow-y-auto">
        {children}
      </main>

      {/* Global Action Modals */}
      <AddFeedbackModal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onSuccess={handleGlobalRefresh}
      />
      <CsvImportModal
        isOpen={isCsvOpen}
        onClose={() => setIsCsvOpen(false)}
        onSuccess={handleGlobalRefresh}
      />
      <SimulateChannelModal
        isOpen={isSimulateOpen}
        onClose={() => setIsSimulateOpen(false)}
        onSuccess={handleGlobalRefresh}
      />
    </div>
  );
}

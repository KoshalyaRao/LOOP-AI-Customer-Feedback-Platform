import React from 'react';
import { ShieldAlert, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export function AccessDenied({ message = 'You do not have permission to view or manage this action.' }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center glass-panel rounded-2xl border border-rose-500/20 max-w-lg mx-auto my-12">
      <div className="w-14 h-14 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 mb-4 shadow-lg shadow-rose-500/10">
        <ShieldAlert className="w-7 h-7" />
      </div>
      <h3 className="text-xl font-bold text-white mb-2">Access Denied</h3>
      <p className="text-sm text-slate-400 mb-6 leading-relaxed">{message}</p>
      <Link href="/dashboard">
        <Button variant="secondary" className="gap-2">
          <ArrowLeft className="w-4 h-4" /> Return to Dashboard
        </Button>
      </Link>
    </div>
  );
}

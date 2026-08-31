import React from 'react';

export function LoadingSkeleton({ count = 3, height = 'h-16' }: { count?: number; height?: string }) {
  return (
    <div className="space-y-3 w-full animate-pulse">
      {Array.from({ length: count }).map((_, idx) => (
        <div key={idx} className={`w-full ${height} bg-slate-800/50 rounded-xl border border-slate-800`} />
      ))}
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className="glass-card rounded-xl p-5 border border-slate-800 animate-pulse space-y-4">
      <div className="flex justify-between items-center">
        <div className="h-4 w-28 bg-slate-800 rounded" />
        <div className="h-4 w-12 bg-slate-800 rounded" />
      </div>
      <div className="h-8 w-20 bg-slate-800 rounded" />
      <div className="h-3 w-36 bg-slate-800/60 rounded" />
    </div>
  );
}

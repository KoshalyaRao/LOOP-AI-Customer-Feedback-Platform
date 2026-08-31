import React from 'react';
import { Card } from '@/components/ui/Card';
import { LucideIcon } from 'lucide-react';

interface KpiCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  colorVariant?: 'brand' | 'rose' | 'emerald' | 'amber';
}

export function KpiCard({
  title,
  value,
  subtitle,
  icon: Icon,
  colorVariant = 'brand',
}: KpiCardProps) {
  const colors = {
    brand: 'bg-brand-500/10 text-brand-400 border-brand-500/20 shadow-brand-500/10',
    rose: 'bg-rose-500/10 text-rose-400 border-rose-500/20 shadow-rose-500/10',
    emerald: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-emerald-500/10',
    amber: 'bg-amber-500/10 text-amber-400 border-amber-500/20 shadow-amber-500/10',
  };

  return (
    <Card className="flex items-center justify-between p-5 relative overflow-hidden">
      <div>
        <p className="text-xs font-medium text-slate-400 tracking-wide uppercase">{title}</p>
        <p className="text-2xl font-bold text-white mt-1 tracking-tight">{value}</p>
        {subtitle && <p className="text-xs text-slate-400 mt-1">{subtitle}</p>}
      </div>
      <div
        className={`w-12 h-12 rounded-2xl flex items-center justify-center border shadow-lg ${colors[colorVariant]}`}
      >
        <Icon className="w-6 h-6" />
      </div>
    </Card>
  );
}

'use client';

import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { formatDate } from '@/lib/utils';

interface VolumeChartProps {
  data: { date: string; positive: number; neutral: number; negative: number; total: number }[];
}

export function VolumeChart({ data }: VolumeChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center text-slate-500 text-xs">
        No volume data available for selected period.
      </div>
    );
  }

  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#0c87e8" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#0c87e8" stopOpacity={0.0} />
            </linearGradient>
            <linearGradient id="colorNeg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#ef4444" stopOpacity={0.0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
          <XAxis
            dataKey="date"
            tickFormatter={(val) => formatDate(val)}
            stroke="#64748b"
            fontSize={11}
            tickLine={false}
          />
          <YAxis stroke="#64748b" fontSize={11} tickLine={false} allowDecimals={false} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#0f172a',
              borderColor: '#334155',
              borderRadius: '0.75rem',
              color: '#f8fafc',
              fontSize: '12px',
            }}
            labelFormatter={(label) => formatDate(label)}
          />
          <Area
            type="monotone"
            dataKey="total"
            name="Total Volume"
            stroke="#0c87e8"
            strokeWidth={2.5}
            fillOpacity={1}
            fill="url(#colorTotal)"
          />
          <Area
            type="monotone"
            dataKey="negative"
            name="Negative Volume"
            stroke="#ef4444"
            strokeWidth={1.5}
            fillOpacity={1}
            fill="url(#colorNeg)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

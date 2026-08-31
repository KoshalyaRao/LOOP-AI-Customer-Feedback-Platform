'use client';

import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  CartesianGrid,
} from 'recharts';

interface ThemesChartProps {
  data: { id: string; name: string; color: string; count: number; negCount: number }[];
}

export function ThemesChart({ data }: ThemesChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center text-slate-500 text-xs">
        No theme data available.
      </div>
    );
  }

  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
          <XAxis
            dataKey="name"
            stroke="#64748b"
            fontSize={10}
            tickLine={false}
            interval={0}
            angle={-20}
            textAnchor="end"
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
          />
          <Bar dataKey="count" name="Feedback Count" radius={[6, 6, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={`bar-${index}`} fill={entry.color || '#3b82f6'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

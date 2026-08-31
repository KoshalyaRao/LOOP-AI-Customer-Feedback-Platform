'use client';

import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from 'recharts';
import { formatDate } from '@/lib/utils';

interface TrendChartProps {
  seriesData: any[];
  themeNames: { name: string; color: string }[];
}

export function TrendChart({ seriesData, themeNames }: TrendChartProps) {
  if (!seriesData || seriesData.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center text-slate-500 text-xs">
        No theme timeline data available.
      </div>
    );
  }

  return (
    <div className="h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={seriesData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
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
          <Legend
            verticalAlign="top"
            height={36}
            iconType="circle"
            formatter={(value) => <span className="text-xs text-slate-300 ml-1 font-medium">{value}</span>}
          />
          {themeNames.map((theme) => (
            <Line
              key={theme.name}
              type="monotone"
              dataKey={theme.name}
              name={theme.name}
              stroke={theme.color || '#3b82f6'}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 5 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

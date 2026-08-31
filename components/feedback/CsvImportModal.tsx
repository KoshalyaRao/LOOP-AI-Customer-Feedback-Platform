'use client';

import React, { useState } from 'react';
import { Upload, Download, FileSpreadsheet, CheckCircle, AlertTriangle } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/components/ui/Toast';

interface CsvImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function CsvImportModal({ isOpen, onClose, onSuccess }: CsvImportModalProps) {
  const { showToast } = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [parsedRows, setParsedRows] = useState<any[]>([]);
  const [isParsing, setIsParsing] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [summary, setSummary] = useState<{ success: number; failed: number } | null>(null);

  const parseCsvText = (text: string) => {
    const lines = text.split(/\r\n|\n/).filter((l) => l.trim().length > 0);
    if (lines.length <= 1) return [];

    const headers = lines[0].split(',').map((h) => h.trim().replace(/^"|"$/g, ''));
    const rows: any[] = [];

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i];
      // Basic CSV regex matching comma outside quotes
      const values = line.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g) || line.split(',');
      const cleanedValues = values.map((v) => v.trim().replace(/^"|"$/g, ''));

      const rowObj: any = {};
      headers.forEach((h, idx) => {
        rowObj[h] = cleanedValues[idx] || '';
      });
      if (rowObj.content || rowObj.Content) {
        rows.push(rowObj);
      }
    }
    return rows;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      processFile(selected);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const dropped = e.dataTransfer.files?.[0];
    if (dropped && dropped.name.endsWith('.csv')) {
      processFile(dropped);
    }
  };

  const processFile = (f: File) => {
    setFile(f);
    setIsParsing(true);
    setSummary(null);

    const reader = new FileReader();
    reader.onload = (evt) => {
      const text = evt.target?.result as string;
      const rows = parseCsvText(text);
      setParsedRows(rows);
      setIsParsing(false);
    };
    reader.readAsText(f);
  };

  const handleImport = async () => {
    if (parsedRows.length === 0) return;

    setIsImporting(true);
    try {
      const res = await fetch('/api/feedback/import', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rows: parsedRows }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to import CSV');
      }

      setSummary({ success: data.successCount, failed: data.failedCount });
      showToast(data.summary, 'success');
      onSuccess();
    } catch (err: any) {
      showToast(err.message || 'Error during CSV import', 'error');
    } finally {
      setIsImporting(false);
    }
  };

  const resetModal = () => {
    setFile(null);
    setParsedRows([]);
    setSummary(null);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={resetModal}
      title="Bulk Import Feedback CSV"
      subtitle="Upload customer feedback from CSV files. New rows will be auto-classified by AI."
      maxWidth="xl"
    >
      <div className="space-y-4">
        {/* Sample Download Bar */}
        <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-slate-300">
            <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
            <span>Expected columns: <code>content</code>, <code>channel</code>, <code>customer_label</code>, <code>created_at</code></span>
          </div>
          <a
            href="/sample_feedback.csv"
            download
            className="flex items-center gap-1 text-brand-400 hover:text-brand-300 font-medium transition-colors"
          >
            <Download className="w-3.5 h-3.5" /> Download Sample CSV
          </a>
        </div>

        {/* Drag & Drop Area */}
        {!file && (
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            className="border-2 border-dashed border-slate-800 hover:border-brand-500/50 rounded-2xl p-8 text-center bg-slate-900/40 cursor-pointer transition-colors"
          >
            <Upload className="w-10 h-10 text-slate-500 mx-auto mb-3" />
            <p className="text-sm font-semibold text-slate-200">Drag & drop your CSV file here</p>
            <p className="text-xs text-slate-400 mt-1">or click browse from your computer</p>
            <input
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              className="hidden"
              id="csv-file-input"
            />
            <label htmlFor="csv-file-input" className="mt-4 inline-block">
              <span className="px-4 py-2 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg border border-slate-700 cursor-pointer transition-colors">
                Browse Files
              </span>
            </label>
          </div>
        )}

        {/* Parsed Preview Table */}
        {file && parsedRows.length > 0 && !summary && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-300">
              <span className="font-semibold text-white">File: {file.name}</span>
              <span className="text-brand-400">{parsedRows.length} valid rows found</span>
            </div>

            <div className="max-h-56 overflow-y-auto rounded-xl border border-slate-800 bg-slate-950">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-900 text-slate-400 uppercase font-semibold sticky top-0">
                  <tr>
                    <th className="p-2.5">Content Preview</th>
                    <th className="p-2.5">Channel</th>
                    <th className="p-2.5">Customer Label</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80 text-slate-300">
                  {parsedRows.slice(0, 5).map((row, idx) => (
                    <tr key={idx}>
                      <td className="p-2.5 max-w-xs truncate">{row.content || row.Content}</td>
                      <td className="p-2.5 whitespace-nowrap">{row.channel || row.Channel || 'CSV'}</td>
                      <td className="p-2.5 whitespace-nowrap">{row.customer_label || row['Customer Label'] || '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {parsedRows.length > 5 && (
              <p className="text-[11px] text-slate-400 italic text-center">
                Showing first 5 of {parsedRows.length} rows...
              </p>
            )}
          </div>
        )}

        {/* Import Summary */}
        {summary && (
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
              <CheckCircle className="w-5 h-5" /> Import Finished!
            </div>
            <div className="grid grid-cols-2 gap-3 text-xs pt-1">
              <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 font-medium">
                Successfully imported: {summary.success}
              </div>
              <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-300 font-medium">
                Failed rows: {summary.failed}
              </div>
            </div>
          </div>
        )}

        {/* Modal Buttons */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
          <Button variant="outline" onClick={resetModal} disabled={isImporting}>
            {summary ? 'Close' : 'Cancel'}
          </Button>
          {!summary && file && (
            <Button variant="primary" onClick={handleImport} isLoading={isImporting}>
              Import {parsedRows.length} Feedback Rows
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
}

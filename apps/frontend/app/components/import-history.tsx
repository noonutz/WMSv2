'use client';

import { useEffect, useState } from 'react';
import { apiFetch } from '../lib/api';

interface ImportLog {
  id: string;
  filename: string;
  totalRows: number;
  processedRows: number;
  duplicates: number;
  status: string;
  importedAt: string;
  initiatedBy: string;
  rowHash: string;
}

export const ImportHistory = () => {
  const [logs, setLogs] = useState<ImportLog[]>([]);

  useEffect(() => {
    apiFetch<ImportLog[]>('/imports/logs').then(setLogs).catch(() => setLogs([]));
  }, []);

  return (
    <div className="overflow-hidden rounded-lg border border-border">
      <table className="min-w-full divide-y divide-border text-sm">
        <thead className="bg-muted/60 text-left">
          <tr>
            <th className="px-4 py-2 font-medium">Filename</th>
            <th className="px-4 py-2 font-medium">Processed</th>
            <th className="px-4 py-2 font-medium">Duplicates</th>
            <th className="px-4 py-2 font-medium">Status</th>
            <th className="px-4 py-2 font-medium">Imported At</th>
            <th className="px-4 py-2 font-medium">Checksum</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {logs.map((log) => (
            <tr key={log.id} className="bg-card">
              <td className="px-4 py-2">
                <p className="font-medium">{log.filename}</p>
                <p className="text-xs text-muted-foreground">By {log.initiatedBy}</p>
              </td>
              <td className="px-4 py-2">
                {log.processedRows}/{log.totalRows}
              </td>
              <td className="px-4 py-2">{log.duplicates}</td>
              <td className="px-4 py-2">
                <span className="rounded-full bg-secondary px-2 py-1 text-xs uppercase tracking-wide">
                  {log.status}
                </span>
              </td>
              <td className="px-4 py-2 text-xs text-muted-foreground">
                {new Date(log.importedAt).toLocaleString()}
              </td>
              <td className="px-4 py-2 text-xs font-mono text-muted-foreground">
                {log.rowHash.slice(0, 10)}...
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

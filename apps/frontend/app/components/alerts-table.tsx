'use client';

import { useEffect, useState } from 'react';
import { apiFetch } from '../lib/api';

interface AlertItem {
  id: string;
  type: 'MIN' | 'MAX';
  severity: 'CRITICAL' | 'WARNING';
  message: string;
  partNumber: string;
  currentStock: number;
  threshold: number;
  location: string;
  acknowledged: boolean;
}

export const AlertsTable = () => {
  const [alerts, setAlerts] = useState<AlertItem[]>([]);

  useEffect(() => {
    apiFetch<AlertItem[]>('/alerts').then(setAlerts).catch(() => setAlerts([]));
  }, []);

  return (
    <div className="overflow-hidden rounded-lg border border-border">
      <table className="min-w-full divide-y divide-border text-sm">
        <thead className="bg-muted/60 text-left">
          <tr>
            <th className="px-4 py-2 font-medium">Part</th>
            <th className="px-4 py-2 font-medium">Status</th>
            <th className="px-4 py-2 font-medium">Stock</th>
            <th className="px-4 py-2 font-medium">Threshold</th>
            <th className="px-4 py-2 font-medium">Location</th>
            <th className="px-4 py-2 font-medium">Acknowledged</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {alerts.map((alert) => (
            <tr key={alert.id} className="bg-card">
              <td className="px-4 py-2 font-medium">{alert.partNumber}</td>
              <td className="px-4 py-2">
                <span
                  className={`rounded-full px-2 py-1 text-xs font-semibold ${
                    alert.severity === 'CRITICAL'
                      ? 'bg-destructive/10 text-destructive'
                      : 'bg-amber-100 text-amber-700'
                  }`}
                >
                  {alert.message}
                </span>
              </td>
              <td className="px-4 py-2">{alert.currentStock}</td>
              <td className="px-4 py-2">{alert.threshold}</td>
              <td className="px-4 py-2">{alert.location}</td>
              <td className="px-4 py-2">
                <span className={`text-xs ${alert.acknowledged ? 'text-emerald-600' : 'text-destructive'}`}>
                  {alert.acknowledged ? 'Yes' : 'Pending'}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

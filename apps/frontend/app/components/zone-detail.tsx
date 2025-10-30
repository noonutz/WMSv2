'use client';

import { useEffect, useState } from 'react';
import { apiFetch } from '../lib/api';

interface BinViewModel {
  name: string;
  locationCode: string;
  barcode: string;
  currentStock: number;
  minStock: number;
  maxStock: number;
  status: 'BELOW_MIN' | 'NORMAL' | 'ABOVE_MAX';
}

interface RackViewModel {
  name: string;
  verticalRow: number;
  horizontalRow: number;
  capacity: number;
  currentStock: number;
  bins: BinViewModel[];
}

interface ZoneViewModel {
  zone: string;
  capacity: number;
  currentStock: number;
  utilization: number;
  temperatureZone: string;
  racks: RackViewModel[];
}

export const ZoneDetail = ({ zone }: { zone: string }) => {
  const [data, setData] = useState<ZoneViewModel | null>(null);

  useEffect(() => {
    apiFetch<ZoneViewModel>(`/layout/zone/${zone}`).then(setData).catch(() => setData(null));
  }, [zone]);

  if (!data) {
    return <div className="rounded-lg border border-border bg-card p-4">Loading zone...</div>;
  }

  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold">Zone {data.zone}</h2>
          <p className="text-xs text-muted-foreground">{data.temperatureZone} • Utilization {data.utilization}%</p>
        </div>
        <div className="rounded-full bg-secondary px-3 py-1 text-xs text-muted-foreground">
          Capacity {data.capacity.toLocaleString()} / Stock {data.currentStock.toLocaleString()}
        </div>
      </div>
      <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {data.racks.slice(0, 12).map((rack) => (
          <div key={rack.name} className="rounded-md border border-border/80 p-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="font-semibold">{rack.name}</span>
              <span className="text-xs text-muted-foreground">{rack.currentStock}/{rack.capacity}</span>
            </div>
            <div className="mt-2 space-y-1">
              {rack.bins.map((bin) => (
                <div key={bin.name} className="flex items-center justify-between rounded border border-dashed border-border/60 px-2 py-1 text-xs">
                  <span>{bin.name}</span>
                  <span
                    className={`font-medium ${
                      bin.status === 'BELOW_MIN'
                        ? 'text-destructive'
                        : bin.status === 'ABOVE_MAX'
                        ? 'text-amber-600'
                        : 'text-emerald-600'
                    }`}
                  >
                    {bin.currentStock}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

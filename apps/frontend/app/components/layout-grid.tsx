'use client';

import { useEffect, useState } from 'react';
import { apiFetch } from '../lib/api';
import { useLanguage } from '../lib/language-context';

type ZoneOverview = {
  zone: string;
  racks: number;
  bins: number;
  capacity: number;
  currentStock: number;
  utilization: number;
  criticalAlerts: number;
};

export const LayoutGrid = () => {
  const [zones, setZones] = useState<ZoneOverview[]>([]);
  const { t } = useLanguage();

  useEffect(() => {
    apiFetch<ZoneOverview[]>('/layout/overview').then(setZones).catch(() => setZones([]));
  }, []);

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {zones.map((zone) => (
        <div key={zone.zone} className="rounded-lg border border-border bg-card p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">{t('zone')} {zone.zone}</h3>
              <p className="text-xs text-muted-foreground">
                {zone.racks} racks • {zone.bins} bins
              </p>
            </div>
            <span
              className={`rounded-full px-3 py-1 text-xs font-medium ${
                zone.criticalAlerts ? 'bg-destructive/10 text-destructive' : 'bg-emerald-100 text-emerald-700'
              }`}
            >
              {zone.criticalAlerts ? `${zone.criticalAlerts} alerts` : 'Stable'}
            </span>
          </div>
          <div className="mt-4">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>{t('utilization')}</span>
              <span>{zone.utilization}%</span>
            </div>
            <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-muted">
              <div className="h-full rounded-full bg-primary" style={{ width: `${Math.min(zone.utilization, 100)}%` }} />
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2 text-sm text-muted-foreground">
            <div>
              <p className="text-xs uppercase">Stock</p>
              <p className="font-medium text-foreground">{zone.currentStock.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-xs uppercase">Capacity</p>
              <p className="font-medium text-foreground">{zone.capacity.toLocaleString()}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

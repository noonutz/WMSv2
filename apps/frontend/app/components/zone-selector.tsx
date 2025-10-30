'use client';

import { useEffect, useState } from 'react';
import { apiFetch } from '../lib/api';

interface ZoneOverview {
  zone: string;
  utilization: number;
}

export const ZoneSelector = ({ onSelect }: { onSelect: (zone: string) => void }) => {
  const [zones, setZones] = useState<ZoneOverview[]>([]);
  const [active, setActive] = useState<string>('A');

  useEffect(() => {
    apiFetch<ZoneOverview[]>('/layout/overview')
      .then((data) => {
        setZones(data);
        if (data.length > 0) {
          setActive(data[0].zone);
          onSelect(data[0].zone);
        }
      })
      .catch(() => setZones([]));
  }, [onSelect]);

  return (
    <div className="flex flex-wrap gap-2">
      {zones.map((zone) => (
        <button
          key={zone.zone}
          type="button"
          onClick={() => {
            setActive(zone.zone);
            onSelect(zone.zone);
          }}
          className={`rounded-md border px-3 py-1 text-sm transition ${
            active === zone.zone ? 'border-primary bg-primary/10 text-primary' : 'border-border text-muted-foreground'
          }`}
        >
          Zone {zone.zone}
        </button>
      ))}
    </div>
  );
};

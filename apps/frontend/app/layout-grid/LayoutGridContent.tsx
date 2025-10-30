'use client';

import { useState } from 'react';
import { LayoutGrid } from '../components/layout-grid';
import { ZoneSelector } from '../components/zone-selector';
import { ZoneDetail } from '../components/zone-detail';

export const LayoutGridContent = () => {
  const [zone, setZone] = useState('A');

  return (
    <div className="space-y-6">
      <LayoutGrid />
      <div className="rounded-lg border border-border bg-card p-4">
        <h2 className="text-lg font-semibold">Zone drill-down</h2>
        <p className="text-xs text-muted-foreground">
          Select a zone to inspect rack/bin utilization and Min/Max adherence.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <ZoneSelector onSelect={setZone} />
        </div>
      </div>
      <ZoneDetail zone={zone} />
    </div>
  );
};

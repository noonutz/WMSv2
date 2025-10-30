'use client';

import { useEffect, useState } from 'react';
import { apiFetch } from '../lib/api';

interface OperationRecord {
  id: string;
  localKanbanId: string;
  storeAddress: string;
  customerPartNo: string;
  quantity: number;
  status: string;
  receivedAt?: string;
  shippedAt?: string;
  receivedBy?: string;
  shippedBy?: string;
}

export const OperationsPanel = () => {
  const [inbound, setInbound] = useState<OperationRecord[]>([]);
  const [outbound, setOutbound] = useState<OperationRecord[]>([]);

  useEffect(() => {
    apiFetch<OperationRecord[]>('/operations/inbound').then(setInbound).catch(() => setInbound([]));
    apiFetch<OperationRecord[]>('/operations/outbound').then(setOutbound).catch(() => setOutbound([]));
  }, []);

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="rounded-lg border border-border bg-card p-4">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Inbound</h3>
        <div className="mt-3 space-y-3 text-sm">
          {inbound.map((record) => (
            <div key={record.id} className="rounded-md border border-border/60 p-3">
              <div className="flex items-center justify-between">
                <p className="font-medium">{record.customerPartNo}</p>
                <span className="text-xs text-muted-foreground">{record.quantity} pcs</span>
              </div>
              <p className="text-xs text-muted-foreground">{record.localKanbanId}</p>
              <p className="text-xs text-muted-foreground">{record.storeAddress}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="rounded-lg border border-border bg-card p-4">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Outbound</h3>
        <div className="mt-3 space-y-3 text-sm">
          {outbound.map((record) => (
            <div key={record.id} className="rounded-md border border-border/60 p-3">
              <div className="flex items-center justify-between">
                <p className="font-medium">{record.customerPartNo}</p>
                <span className="text-xs text-muted-foreground">{record.quantity} pcs</span>
              </div>
              <p className="text-xs text-muted-foreground">{record.localKanbanId}</p>
              <p className="text-xs text-muted-foreground">{record.storeAddress}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

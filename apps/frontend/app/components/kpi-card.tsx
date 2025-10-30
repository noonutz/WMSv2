import { ReactNode } from 'react';

export const KpiCard = ({ title, value, trend }: { title: string; value: string; trend: ReactNode }) => {
  return (
    <div className="rounded-lg border border-border bg-card p-4 shadow-sm">
      <p className="text-sm text-muted-foreground">{title}</p>
      <div className="mt-2 flex items-baseline justify-between">
        <span className="text-2xl font-semibold">{value}</span>
        <span className="text-xs text-muted-foreground">{trend}</span>
      </div>
    </div>
  );
};

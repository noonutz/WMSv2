import { PageShell } from '../components/page-shell';
import { KpiCard } from '../components/kpi-card';
import { LayoutGrid } from '../components/layout-grid';
import { AlertsTable } from '../components/alerts-table';
import { ImportHistory } from '../components/import-history';
import { OperationsPanel } from '../components/operations-panel';
import { apiFetch } from '../lib/api';

interface InventorySummary {
  totalParts: number;
  totalStock: number;
  belowMin: number;
  aboveMax: number;
  healthScore: number;
}

export default async function DashboardPage() {
  const summary = await apiFetch<InventorySummary>('/inventory/summary');

  return (
    <PageShell>
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <KpiCard title="Total Parts" value={summary.totalParts.toString()} trend={<span>{summary.healthScore}% health</span>} />
        <KpiCard
          title="Total Stock"
          value={summary.totalStock.toLocaleString()}
          trend={<span>{summary.belowMin} below min</span>}
        />
        <KpiCard title="Below Min" value={summary.belowMin.toString()} trend={<span>{summary.aboveMax} above max</span>} />
        <KpiCard title="System Health" value={`${summary.healthScore}%`} trend={<span>Min-Max governed</span>} />
      </section>
      <section className="mt-8 space-y-6">
        <div>
          <h2 className="mb-3 text-xl font-semibold">Warehouse Layout</h2>
          <LayoutGrid />
        </div>
        <div className="grid gap-6 xl:grid-cols-[2fr,1fr]">
          <div>
            <h2 className="mb-3 text-xl font-semibold">Min / Max Alerts</h2>
            <AlertsTable />
          </div>
          <div>
            <h2 className="mb-3 text-xl font-semibold">Inbound / Outbound Snapshot</h2>
            <OperationsPanel />
          </div>
        </div>
        <div>
          <h2 className="mb-3 text-xl font-semibold">Import History</h2>
          <ImportHistory />
        </div>
      </section>
    </PageShell>
  );
}

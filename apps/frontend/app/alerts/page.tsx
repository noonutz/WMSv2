import { PageShell } from '../components/page-shell';
import { AlertsTable } from '../components/alerts-table';

export default function AlertsPage() {
  return (
    <PageShell>
      <header className="mb-6">
        <h1 className="text-2xl font-semibold">Min / Max Alert Center</h1>
        <p className="text-sm text-muted-foreground">
          Monitor low stock, overstock and threshold breaches. Zebra TC-21 acknowledgements feed directly into this dashboard.
        </p>
      </header>
      <AlertsTable />
    </PageShell>
  );
}

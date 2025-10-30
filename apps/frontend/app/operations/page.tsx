import { PageShell } from '../components/page-shell';
import { OperationsPanel } from '../components/operations-panel';

export default function OperationsPage() {
  return (
    <PageShell>
      <header className="mb-6">
        <h1 className="text-2xl font-semibold">Inbound / Outbound</h1>
        <p className="text-sm text-muted-foreground">
          Validate LocalKanbanID, StoreAddress and CustomerPartNo. Zebra TC-21 scanning ensures traceability across lifecycle
          events.
        </p>
      </header>
      <OperationsPanel />
    </PageShell>
  );
}

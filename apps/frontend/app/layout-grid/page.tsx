import { PageShell } from '../components/page-shell';
import { LayoutGridContent } from './LayoutGridContent';

export default function LayoutGridPage() {
  return (
    <PageShell>
      <header className="mb-6">
        <h1 className="text-2xl font-semibold">Warehouse Layout Grid</h1>
        <p className="text-sm text-muted-foreground">
          View the complete zone A-Z layout with vertical and horizontal row structure. Tooltip-ready bins display current stock
          and Min/Max thresholds.
        </p>
      </header>
      <LayoutGridContent />
    </PageShell>
  );
}

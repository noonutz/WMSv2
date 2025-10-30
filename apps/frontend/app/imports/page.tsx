import { PageShell } from '../components/page-shell';
import { ImportHistory } from '../components/import-history';

export default function ImportsPage() {
  return (
    <PageShell>
      <header className="mb-6">
        <h1 className="text-2xl font-semibold">Import & Mapping</h1>
        <p className="text-sm text-muted-foreground">
          Drag-to-map headers, row-hash deduplication and Excel template governance ensure data integrity on every upload.
        </p>
      </header>
      <ImportHistory />
    </PageShell>
  );
}

import { LayoutShell } from '../../components/layout-shell';
import { DataTable } from '../../components/data-table';

const rows = [
  ['DOC-001', 'Budget 2025', 'Finance', 'Archived', 'AR/FR'],
  ['DOC-002', 'Personnel Circular', 'HR', 'Active', 'AR'],
  ['DOC-003', 'Medical Protocol', 'Hospital', 'Preserved', 'FR/EN']
];

export default function ArchiveExplorerPage() {
  return (
    <LayoutShell
      title="Archive Explorer"
      description="Search and navigate archive items by hierarchy, metadata, lifecycle status, and classification."
    >
      <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
        <input placeholder="Semantic search..." style={{ flex: 1, padding: 8 }} />
        <button style={{ padding: '8px 14px' }}>Search</button>
      </div>
      <DataTable headers={['ID', 'Title', 'Department', 'Status', 'Language']} rows={rows} />
    </LayoutShell>
  );
}

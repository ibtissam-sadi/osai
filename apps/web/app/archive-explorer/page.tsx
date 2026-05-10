import { LayoutShell } from '../../components/layout-shell';
import { CrudTable } from '../../components/crud/crud-table';

export default function ArchiveExplorerPage() {
  return (
    <LayoutShell
      title="Archive Explorer"
      description="Full CRUD for document metadata records and searchable archive listings."
    >
      <CrudTable
        title="Documents"
        fields={['title', 'department', 'status', 'language']}
        initialRows={[
          { id: 'DOC-001', title: 'Budget 2025', department: 'Finance', status: 'Archived', language: 'AR/FR' },
          { id: 'DOC-002', title: 'Personnel Circular', department: 'HR', status: 'Active', language: 'AR' }
        ]}
      />
    </LayoutShell>
  );
}

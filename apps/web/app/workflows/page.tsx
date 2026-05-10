import { LayoutShell } from '../../components/layout-shell';
import { DataTable } from '../../components/data-table';

export default function WorkflowsPage() {
  return (
    <LayoutShell
      title="Workflow Manager"
      description="Configure and supervise approval chains, routing, SLA timers, and transfer operations."
    >
      <DataTable
        headers={['Workflow', 'Document', 'Current Step', 'Due', 'Status']}
        rows={[
          ['WF-1001', 'Budget 2025', 'Compliance Review', '2026-05-12', 'Pending'],
          ['WF-1002', 'Recruitment Plan', 'Department Head', '2026-05-11', 'Escalated'],
          ['WF-1003', 'Medical SOP', 'Org Admin', '2026-05-13', 'In Progress']
        ]}
      />
    </LayoutShell>
  );
}

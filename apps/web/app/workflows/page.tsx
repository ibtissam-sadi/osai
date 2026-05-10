import { LayoutShell } from '../../components/layout-shell';
import { CrudTable } from '../../components/crud/crud-table';

export default function WorkflowsPage() {
  return (
    <LayoutShell
      title="Workflow Manager"
      description="Create, update, and delete workflow steps and approval assignments."
    >
      <CrudTable
        title="Workflow Items"
        fields={['document', 'currentStep', 'due', 'status']}
        initialRows={[
          { id: 'WF-1001', document: 'Budget 2025', currentStep: 'Compliance Review', due: '2026-05-12', status: 'Pending' },
          { id: 'WF-1002', document: 'Recruitment Plan', currentStep: 'Department Head', due: '2026-05-11', status: 'Escalated' }
        ]}
      />
    </LayoutShell>
  );
}

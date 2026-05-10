import { LayoutShell } from '../../components/layout-shell';
import { CrudTable } from '../../components/crud/crud-table';

export default function OrganizationPage() {
  return (
    <LayoutShell
      title="Organization Hierarchy Manager"
      description="CRUD for institution, branch, and department structure."
    >
      <CrudTable
        title="Organization Units"
        fields={['organization', 'branch', 'department', 'admin', 'users']}
        initialRows={[
          { id: 'ORG-001', organization: 'Ministry of Finance', branch: 'Algiers HQ', department: 'Archive Ops', admin: 'N. Haddad', users: '342' },
          { id: 'ORG-002', organization: 'Municipality Oran', branch: 'Central Office', department: 'Civil Registry', admin: 'S. Benali', users: '128' }
        ]}
      />
    </LayoutShell>
  );
}

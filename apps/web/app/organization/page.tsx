import { LayoutShell } from '../../components/layout-shell';
import { DataTable } from '../../components/data-table';

export default function OrganizationPage() {
  return (
    <LayoutShell
      title="Organization Hierarchy Manager"
      description="Manage institutions, branches, departments, divisions, and inherited RBAC permissions."
    >
      <DataTable
        headers={['Org', 'Branch', 'Department', 'Admin', 'Users']}
        rows={[
          ['Ministry of Finance', 'Algiers HQ', 'Archive Ops', 'N. Haddad', '342'],
          ['Municipality Oran', 'Central Office', 'Civil Registry', 'S. Benali', '128'],
          ['National Hospital', 'East Wing', 'Medical Records', 'A. Kouider', '211']
        ]}
      />
    </LayoutShell>
  );
}

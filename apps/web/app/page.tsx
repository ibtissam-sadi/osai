import Link from 'next/link';
import { Card } from '../components/card';
import { LayoutShell } from '../components/layout-shell';

const actions = [
  ['Open Archive Explorer', '/archive-explorer'],
  ['Open AI Command Center', '/ai-command-center'],
  ['Open Workflow Manager', '/workflows'],
  ['Open Compliance Center', '/compliance'],
  ['Open Organization Manager', '/organization'],
  ['Open Analytics Center', '/analytics']
];

export default function DashboardPage() {
  return (
    <LayoutShell
      title="Enterprise Dashboard"
      description="Cross-institution archival operations and AI performance at national scale."
    >
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 14 }}>
        <Card title="Total Documents" value="12,489,221" subtitle="Across all tenants" />
        <Card title="Pending Approvals" value="1,842" subtitle="Workflow SLAs monitored" />
        <Card title="Anomaly Alerts" value="17" subtitle="AI suspicious activity detection" />
        <Card title="Compliance Score" value="96.4%" subtitle="Law 88-09 / 18-07 / ISO baseline" />
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {actions.map(([label, href]) => (
          <Link key={href} href={href} style={{ padding: '8px 12px', border: '1px solid #4d5b84', borderRadius: 6 }}>
            {label}
          </Link>
        ))}
      </div>
    </LayoutShell>
  );
}

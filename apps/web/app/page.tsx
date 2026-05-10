import { Card } from '../components/card';

export default function DashboardPage() {
  return (
    <main>
      <h2>Enterprise Dashboard</h2>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <Card title="Total Documents" value="12,489,221" subtitle="Across all tenants" />
        <Card title="Pending Approvals" value="1,842" subtitle="Workflow SLAs monitored" />
        <Card title="Anomaly Alerts" value="17" subtitle="AI suspicious activity detection" />
        <Card title="Compliance Score" value="96.4%" subtitle="Law 88-09 / 18-07 / ISO baseline" />
      </div>
    </main>
  );
}

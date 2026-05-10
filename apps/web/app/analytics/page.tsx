import { LayoutShell } from '../../components/layout-shell';
import { Card } from '../../components/card';

export default function AnalyticsPage() {
  return (
    <LayoutShell
      title="Analytics Center"
      description="Operational and predictive intelligence for retrieval demand, storage growth, and risk patterns."
    >
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <Card title="Predicted Retrieval" value="+22%" subtitle="next 30 days" />
        <Card title="Cold Storage Shift" value="1.8 PB" subtitle="eligible archives" />
        <Card title="Risk Hotspots" value="6" subtitle="departments flagged" />
        <Card title="Anomaly Trend" value="-11%" subtitle="month-over-month" />
      </div>
    </LayoutShell>
  );
}

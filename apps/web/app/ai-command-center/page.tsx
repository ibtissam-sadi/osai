import { LayoutShell } from '../../components/layout-shell';
import { Card } from '../../components/card';

export default function AICommandCenterPage() {
  return (
    <LayoutShell
      title="AI Command Center"
      description="Monitor OCR, NLP, classification, anomaly detection, and compliance scoring across institutions."
    >
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
        <Card title="OCR Queue" value="1,228" subtitle="jobs pending" />
        <Card title="Classification" value="98.2%" subtitle="model confidence" />
        <Card title="Duplicates" value="342" subtitle="clusters detected" />
        <Card title="Compliance Flags" value="54" subtitle="requires review" />
      </div>
    </LayoutShell>
  );
}

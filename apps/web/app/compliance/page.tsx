import { LayoutShell } from '../../components/layout-shell';

export default function CompliancePage() {
  return (
    <LayoutShell
      title="Compliance Monitoring Center"
      description="Live compliance oversight for Algerian legal obligations and ISO/OAIS archival standards."
    >
      <ul>
        <li>Law 88-09: retention and destruction controls active</li>
        <li>Law 18-07: access and privacy policy checks active</li>
        <li>ISO 15489: records lifecycle controls tracked</li>
        <li>ISO 27001: security event and control mapping tracked</li>
        <li>ISO 30301 + OAIS: governance and preservation checkpoints tracked</li>
      </ul>
    </LayoutShell>
  );
}

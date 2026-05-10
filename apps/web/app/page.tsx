const modules = [
  'Enterprise Dashboard',
  'Archive Explorer',
  'AI Command Center',
  'Workflow Manager',
  'Compliance Monitoring Center',
  'Organization Hierarchy Manager',
  'Analytics Center'
];

export default function Home() {
  return (
    <main style={{ padding: 24 }}>
      <h1>OSAI — AI Smart Archive Operating System</h1>
      <p>National-grade archival intelligence platform for Algerian institutions.</p>
      <ul>{modules.map((m) => <li key={m}>{m}</li>)}</ul>
    </main>
  );
}

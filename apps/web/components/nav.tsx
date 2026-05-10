import Link from 'next/link';

const links = [
  ['Dashboard', '/'],
  ['Archive Explorer', '/archive-explorer'],
  ['AI Command Center', '/ai-command-center'],
  ['Workflows', '/workflows'],
  ['Compliance', '/compliance'],
  ['Organization', '/organization'],
  ['Analytics', '/analytics']
];

export function Nav() {
  return (
    <nav style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 16 }}>
      {links.map(([label, href]) => (
        <Link key={href} href={href} style={{ padding: '6px 10px', border: '1px solid #444', borderRadius: 6 }}>
          {label}
        </Link>
      ))}
    </nav>
  );
}

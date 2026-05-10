import type { ReactNode } from 'react';

export function LayoutShell({ title, description, children }: { title: string; description: string; children: ReactNode }) {
  return (
    <main>
      <section style={{ marginBottom: 16 }}>
        <h2 style={{ marginBottom: 6 }}>{title}</h2>
        <p style={{ opacity: 0.85 }}>{description}</p>
      </section>
      {children}
    </main>
  );
}

export function Card({ title, value, subtitle }: { title: string; value: string; subtitle: string }) {
  return (
    <section style={{ border: '1px solid #2f2f2f', borderRadius: 8, padding: 12, minWidth: 180 }}>
      <h3 style={{ margin: 0, fontSize: 14, opacity: 0.8 }}>{title}</h3>
      <p style={{ margin: '8px 0', fontSize: 24, fontWeight: 700 }}>{value}</p>
      <small>{subtitle}</small>
    </section>
  );
}

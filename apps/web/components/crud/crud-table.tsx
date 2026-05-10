'use client';

import { useMemo, useState } from 'react';

export interface CrudItem { id: string; [key: string]: string }

export function CrudTable({
  title,
  fields,
  initialRows
}: {
  title: string;
  fields: string[];
  initialRows: CrudItem[];
}) {
  const [rows, setRows] = useState<CrudItem[]>(initialRows);
  const [draft, setDraft] = useState<Record<string, string>>({});
  const [editingId, setEditingId] = useState<string | null>(null);

  const cols = useMemo(() => ['id', ...fields], [fields]);

  const save = () => {
    if (!draft.id) return;
    if (editingId) {
      setRows((prev) => prev.map((r) => (r.id === editingId ? { ...r, ...draft } : r)));
      setEditingId(null);
    } else {
      setRows((prev) => [...prev, draft as CrudItem]);
    }
    setDraft({});
  };

  const edit = (row: CrudItem) => {
    setDraft(row);
    setEditingId(row.id);
  };

  const remove = (id: string) => setRows((prev) => prev.filter((r) => r.id !== id));

  return (
    <section>
      <h3>{title}</h3>
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols.length}, minmax(120px, 1fr)) auto`, gap: 8, marginBottom: 12 }}>
        {cols.map((c) => (
          <input key={c} placeholder={c} value={draft[c] || ''} onChange={(e) => setDraft((d) => ({ ...d, [c]: e.target.value }))} style={{ padding: 8 }} />
        ))}
        <button onClick={save} style={{ padding: 8 }}>{editingId ? 'Update' : 'Create'}</button>
      </div>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            {cols.map((c) => <th key={c} style={{ textAlign: 'left', borderBottom: '1px solid #333', padding: 8 }}>{c}</th>)}
            <th style={{ borderBottom: '1px solid #333', padding: 8 }}>actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.id}>
              {cols.map((c) => <td key={c} style={{ padding: 8, borderBottom: '1px solid #222' }}>{r[c]}</td>)}
              <td style={{ padding: 8, borderBottom: '1px solid #222' }}>
                <button onClick={() => edit(r)} style={{ marginRight: 8 }}>Edit</button>
                <button onClick={() => remove(r.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

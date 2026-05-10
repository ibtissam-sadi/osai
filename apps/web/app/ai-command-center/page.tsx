'use client';

import { useState } from 'react';
import { LayoutShell } from '../../components/layout-shell';

const API = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000';

export default function AICommandCenterPage() {
  const [text, setText] = useState('Budget and finance report for Algiers branch');
  const [result, setResult] = useState<string>('No analysis yet');

  const runAnalyze = async () => {
    const res = await fetch(`${API}/api/v1/ai/analyze`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ documentId: `DOC-${Date.now()}`, text })
    });
    const data = await res.json();
    setResult(JSON.stringify(data, null, 2));
  };

  const runJob = async () => {
    const queued = await fetch(`${API}/api/v1/ai/jobs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ documentId: `DOC-${Date.now()}`, type: 'embedding' })
    }).then((r) => r.json());
    await fetch(`${API}/api/v1/ai/jobs/${queued.id}/run`, { method: 'POST' });
    const insights = await fetch(`${API}/api/v1/ai/insights`).then((r) => r.json());
    setResult(JSON.stringify(insights.slice(-3), null, 2));
  };

  return (
    <LayoutShell title="AI Command Center" description="Run live AI analysis, queue jobs, and inspect generated insights.">
      <textarea value={text} onChange={(e) => setText(e.target.value)} style={{ width: '100%', minHeight: 90, marginBottom: 8 }} />
      <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
        <button onClick={runAnalyze}>Analyze Document</button>
        <button onClick={runJob}>Queue + Run AI Job</button>
      </div>
      <pre style={{ background: '#111', padding: 12, borderRadius: 8, overflowX: 'auto' }}>{result}</pre>
    </LayoutShell>
  );
}

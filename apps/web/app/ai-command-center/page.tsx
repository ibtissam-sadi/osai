'use client';

import { useEffect, useState } from 'react';
import { LayoutShell } from '../../components/layout-shell';

const API = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000';

export default function AICommandCenterPage() {
  const [text, setText] = useState('Budget and finance report for Algiers branch');
  const [result, setResult] = useState<string>('No analysis yet');
  const [models, setModels] = useState<any[]>([]);
  const [task, setTask] = useState('summarization');
  const [modelId, setModelId] = useState('openai-gpt-4.1-mini');

  useEffect(() => {
    fetch(`${API}/api/v1/ai/models`).then((r) => r.json()).then((d) => {
      setModels(d.options || []);
    });
  }, []);

  const activateModel = async () => {
    const res = await fetch(`${API}/api/v1/ai/models/activate`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ task, modelId })
    });
    const data = await res.json();
    setResult(JSON.stringify(data, null, 2));
  };

  const runAnalyze = async () => {
    const res = await fetch(`${API}/api/v1/ai/analyze`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ documentId: `DOC-${Date.now()}`, text })
    });
    setResult(JSON.stringify(await res.json(), null, 2));
  };

  return (
    <LayoutShell title="AI Command Center" description="Run live AI analysis and select API/pretrained models per task.">
      <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
        <select value={task} onChange={(e) => setTask(e.target.value)}>
          <option value="chat">chat</option><option value="classification">classification</option><option value="embedding">embedding</option>
          <option value="ocr">ocr</option><option value="summarization">summarization</option><option value="compliance">compliance</option>
        </select>
        <select value={modelId} onChange={(e) => setModelId(e.target.value)}>
          {models.map((m) => <option key={m.id} value={m.id}>{m.name} ({m.mode})</option>)}
        </select>
        <button onClick={activateModel}>Activate Model</button>
      </div>
      <textarea value={text} onChange={(e) => setText(e.target.value)} style={{ width: '100%', minHeight: 90, marginBottom: 8 }} />
      <button onClick={runAnalyze}>Analyze Document</button>
      <pre style={{ background: '#111', padding: 12, borderRadius: 8, overflowX: 'auto' }}>{result}</pre>
    </LayoutShell>
  );
}

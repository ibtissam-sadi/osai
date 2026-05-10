export type Entity = Record<string, string> & { id: string };

type Buckets = 'documents' | 'workflows' | 'organizations';

const db: Record<Buckets, Entity[]> = {
  documents: [
    { id: 'DOC-001', title: 'Budget 2025', department: 'Finance', status: 'Archived', language: 'AR/FR' }
  ],
  workflows: [
    { id: 'WF-1001', document: 'Budget 2025', currentStep: 'Compliance Review', due: '2026-05-12', status: 'Pending' }
  ],
  organizations: [
    { id: 'ORG-001', organization: 'Ministry of Finance', branch: 'Algiers HQ', department: 'Archive Ops', admin: 'N. Haddad', users: '342' }
  ]
};

export const list = (bucket: Buckets) => db[bucket];
export const create = (bucket: Buckets, item: Entity) => (db[bucket].push(item), item);
export const update = (bucket: Buckets, id: string, patch: Partial<Entity>) => {
  const idx = db[bucket].findIndex((x) => x.id === id);
  if (idx === -1) return null;
  db[bucket][idx] = { ...db[bucket][idx], ...patch };
  return db[bucket][idx];
};
export const remove = (bucket: Buckets, id: string) => {
  const before = db[bucket].length;
  db[bucket] = db[bucket].filter((x) => x.id !== id);
  return db[bucket].length < before;
};

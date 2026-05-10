export const toVector = (text: string): number[] => {
  const normalized = text.toLowerCase().slice(0, 32);
  return Array.from(normalized).map((c) => c.charCodeAt(0) / 255);
};

export const cosine = (a: number[], b: number[]): number => {
  const len = Math.min(a.length, b.length);
  let dot = 0, na = 0, nb = 0;
  for (let i = 0; i < len; i++) {
    dot += a[i] * b[i];
    na += a[i] * a[i];
    nb += b[i] * b[i];
  }
  return dot / ((Math.sqrt(na) * Math.sqrt(nb)) || 1);
};

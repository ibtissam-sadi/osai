'use client';

import { useState } from 'react';
import { labels, Locale } from './i18n';

export function Header() {
  const [locale, setLocale] = useState<Locale>('en');
  const [dark, setDark] = useState(true);
  const text = labels[locale];

  return (
    <header>
      <h1>{text.title}</h1>
      <p>{text.subtitle}</p>
      <div style={{ display: 'flex', gap: 8 }}>
        <select value={locale} onChange={(e) => setLocale(e.target.value as Locale)}>
          <option value="ar">Arabic</option>
          <option value="fr">French</option>
          <option value="en">English</option>
        </select>
        <button onClick={() => setDark((v) => !v)}>{dark ? 'Dark' : 'Light'} Mode</button>
      </div>
    </header>
  );
}

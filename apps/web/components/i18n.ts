export type Locale = 'ar' | 'fr' | 'en';

export const labels: Record<Locale, { title: string; subtitle: string }> = {
  ar: { title: 'منصة OSAI', subtitle: 'نظام أرشفة وطني ذكي' },
  fr: { title: 'Plateforme OSAI', subtitle: 'Système national d’archives intelligentes' },
  en: { title: 'OSAI Platform', subtitle: 'AI-powered national archival operating system' }
};

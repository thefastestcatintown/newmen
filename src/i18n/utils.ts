import german from './de.json';

export type Language = 'en' | 'de';

const siteBase = import.meta.env.BASE_URL.replace(/\/$/, '');

function withoutSiteBase(path: string): string {
  return siteBase && (path === siteBase || path.startsWith(`${siteBase}/`))
    ? path.slice(siteBase.length) || '/'
    : path;
}

export function sitePath(path: string): string {
  return `${siteBase}${withoutSiteBase(path)}`;
}

export function languageFromPath(path: string): Language {
  return /^\/de(?:\/|$)/.test(withoutSiteBase(path)) ? 'de' : 'en';
}

export function localizePath(path: string, language: Language): string {
  const base = withoutSiteBase(path).replace(/^\/de(?=\/|$)/, '') || '/';
  return sitePath(language === 'de' ? `/de${base}` : base);
}

export function translator(language: Language) {
  return (english: string): string =>
    language === 'de' ? (german as Record<string, string>)[english] ?? english : english;
}

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import fr from './fr';
import en from './en';

/**
 * Lightweight UI dictionary (FR/EN).
 *
 * - Only the interface is translated (navigation, buttons, headings, forms,
 *   labels…). Content managed from /admin (services, projects, team, blog
 *   articles, FAQ, testimonials) stays as written — in French.
 * - French is always the default: we never auto-switch from the browser
 *   language, so search engines (whose crawlers run in English) keep indexing
 *   the French site.
 * - A missing English key falls back to French, then to the key itself, so a
 *   forgotten translation never shows an empty string.
 */

export const LANGUAGES = [
  { code: 'fr', label: 'FR', name: 'Français', locale: 'fr_FR' },
  { code: 'en', label: 'EN', name: 'English', locale: 'en_US' },
];

const DICTIONARIES = { fr, en };
const DEFAULT_LANG = 'fr';
const STORAGE_KEY = 'kn-lang';

function getInitialLang() {
  if (typeof window === 'undefined') return DEFAULT_LANG;
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored && DICTIONARIES[stored]) return stored;
  } catch {
    /* ignore (private mode, etc.) */
  }
  return DEFAULT_LANG;
}

function lookup(dict, key) {
  return key.split('.').reduce((node, part) => (node == null ? undefined : node[part]), dict);
}

function interpolate(value, vars) {
  if (typeof value !== 'string' || !vars) return value;
  return value.replace(/\{(\w+)\}/g, (match, name) => (vars[name] != null ? String(vars[name]) : match));
}

function translate(lang, key, vars) {
  let value = lookup(DICTIONARIES[lang], key);
  if (value === undefined && lang !== DEFAULT_LANG) {
    value = lookup(DICTIONARIES[DEFAULT_LANG], key);
    if (import.meta.env?.DEV) console.warn(`[i18n] Clé manquante en "${lang}" : ${key}`);
  }
  if (value === undefined) {
    if (import.meta.env?.DEV) console.warn(`[i18n] Clé inconnue : ${key}`);
    return key;
  }
  return interpolate(value, vars);
}

const LanguageContext = createContext({
  lang: DEFAULT_LANG,
  setLang: () => {},
  t: (key, vars) => translate(DEFAULT_LANG, key, vars),
  has: () => false,
});

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(getInitialLang);

  useEffect(() => {
    document.documentElement.setAttribute('lang', lang);
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      /* ignore */
    }
  }, [lang]);

  const setLang = useCallback((next) => {
    if (DICTIONARIES[next]) setLangState(next);
  }, []);

  const t = useCallback((key, vars) => translate(lang, key, vars), [lang]);

  // True when the key exists (in the current language or in French). Handy for
  // optional labels, e.g. a blog category created from /admin that has no
  // translation: `has(k) ? t(k) : rawLabel`.
  const has = useCallback(
    (key) => lookup(DICTIONARIES[lang], key) !== undefined || lookup(DICTIONARIES[DEFAULT_LANG], key) !== undefined,
    [lang]
  );

  const value = useMemo(() => ({ lang, setLang, t, has }), [lang, setLang, t, has]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

/** Full context: { lang, setLang, t, has } */
export function useLanguage() {
  return useContext(LanguageContext);
}

/** Shortcut when a component only needs the translate function. */
export function useT() {
  return useContext(LanguageContext).t;
}

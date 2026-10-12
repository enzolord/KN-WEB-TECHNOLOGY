import { LANGUAGES, useLanguage } from '../i18n/LanguageContext';
import './LanguageSwitcher.css';

export default function LanguageSwitcher({ className = '' }) {
  const { lang, setLang, t } = useLanguage();
  const activeIndex = Math.max(
    0,
    LANGUAGES.findIndex((l) => l.code === lang)
  );

  return (
    <div
      className={`lang-switch ${className}`}
      role="group"
      aria-label={t('a11y.language')}
      style={{ '--lang-count': LANGUAGES.length, '--lang-index': activeIndex }}
    >
      <span className="lang-switch-thumb" aria-hidden="true" />
      {LANGUAGES.map((l) => {
        const active = l.code === lang;
        return (
          <button
            key={l.code}
            type="button"
            lang={l.code}
            className={`lang-switch-btn ${active ? 'is-active' : ''}`}
            onClick={() => setLang(l.code)}
            aria-pressed={active}
            aria-label={active ? l.name : t('a11y.switchTo', { name: l.name })}
            title={l.name}
          >
            {l.label}
          </button>
        );
      })}
    </div>
  );
}

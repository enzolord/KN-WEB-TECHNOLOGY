import { useCurrency } from '../context/CurrencyContext';
import { useT } from '../i18n/LanguageContext';
import './LanguageSwitcher.css';

const OPTIONS = [
  { code: 'XAF', label: 'FCFA', name: 'Francs CFA' },
  { code: 'EUR', label: '€', name: 'Euros' },
];

// Same look as the FR | EN switch. Only rendered when automatic detection
// failed (or when the visitor already picked a currency manually).
export default function CurrencySwitcher({ className = '' }) {
  const { currency, setCurrency } = useCurrency();
  const t = useT();
  const index = Math.max(0, OPTIONS.findIndex((o) => o.code === currency));

  return (
    <div
      className={`lang-switch currency-switch ${className}`}
      role="group"
      aria-label={t('a11y.currencyLabel')}
      style={{ '--lang-count': OPTIONS.length, '--lang-index': index, '--lang-btn-w': '40px' }}
    >
      <span className="lang-switch-thumb" aria-hidden="true" />
      {OPTIONS.map((o) => {
        const active = o.code === currency;
        return (
          <button
            key={o.code}
            type="button"
            className={`lang-switch-btn ${active ? 'is-active' : ''}`}
            onClick={() => setCurrency(o.code)}
            aria-pressed={active}
            title={o.name}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

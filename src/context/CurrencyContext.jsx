import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

/**
 * Tarifs selon la localisation du visiteur :
 *   - Afrique            → FCFA (tarifs normaux)
 *   - autres continents  → euros (grille européenne, champ `priceEur` des services)
 *
 * Détection, dans l'ordre :
 *   1. choix manuel déjà fait par le visiteur (sélecteur FCFA | €) ;
 *   2. pays donné par l'hébergeur (/api/geo, en-tête Vercel x-vercel-ip-country) ;
 *   3. fuseau horaire de l'appareil (« Africa/… » → FCFA).
 * Si rien n'est fiable, on reste en FCFA et le sélecteur s'affiche
 * (il n'est visible QUE dans ce cas, ou si le visiteur a déjà choisi).
 * Les robots (Google…) voient toujours les prix en FCFA.
 */

// ISO 3166-1 alpha-2 — pays et territoires d'Afrique
const AFRICA = new Set(
  ('DZ AO BJ BW BF BI CV CM CF TD KM CG CD CI DJ EG GQ ER SZ ET GA GM GH GN GW KE LS LR LY MG MW ML MR MU YT MA MZ NA NE NG RE RW SH ST SN SC SL SO ZA SS SD TZ TG TN UG EH ZM ZW').split(' ')
);

const CHOICE_KEY = 'kn-currency-choice';
const DETECTED_KEY = 'kn-currency-detected';
const BOT_RE = /bot|crawl|spider|slurp|lighthouse|headless|facebookexternalhit/i;

const CurrencyContext = createContext({
  currency: 'XAF',
  setCurrency: () => {},
  showSelector: false,
  pick: (fcfa) => fcfa,
});

function readStorage(store, key) {
  try {
    return window[store].getItem(key);
  } catch {
    return null;
  }
}
function writeStorage(store, key, value) {
  try {
    window[store].setItem(key, value);
  } catch {
    /* ignore (private mode…) */
  }
}

function currencyFromTimezone() {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
    if (tz.startsWith('Africa/')) return 'XAF';
    if (/^(Europe|America|Asia|Australia|Pacific|Atlantic|Indian|Antarctica)\//.test(tz)) {
      // Océan Indien : Maurice, Réunion, Mayotte, Comores, Seychelles, Madagascar → Afrique
      if (/^Indian\/(Mauritius|Reunion|Mayotte|Comoro|Mahe|Antananarivo)$/.test(tz)) return 'XAF';
      // Atlantique : Cap-Vert, Sainte-Hélène, Canaries (Espagne) — on laisse le Cap-Vert en Afrique
      if (/^Atlantic\/(Cape_Verde|St_Helena)$/.test(tz)) return 'XAF';
      return 'EUR';
    }
  } catch {
    /* ignore */
  }
  return null; // UTC / inconnu → non fiable
}

export function CurrencyProvider({ children }) {
  const manual = typeof window !== 'undefined' ? readStorage('localStorage', CHOICE_KEY) : null;
  const [currency, setCurrencyState] = useState(manual === 'EUR' || manual === 'XAF' ? manual : 'XAF');
  const [hasManualChoice, setHasManualChoice] = useState(manual === 'EUR' || manual === 'XAF');
  const [detectionFailed, setDetectionFailed] = useState(false);

  useEffect(() => {
    if (hasManualChoice) return undefined;
    if (BOT_RE.test(navigator.userAgent || '')) return undefined; // robots : FCFA

    const cached = readStorage('sessionStorage', DETECTED_KEY);
    if (cached === 'EUR' || cached === 'XAF') {
      setCurrencyState(cached);
      return undefined;
    }

    let cancelled = false;
    const finish = (value) => {
      if (cancelled) return;
      if (value) {
        setCurrencyState(value);
        writeStorage('sessionStorage', DETECTED_KEY, value);
      } else {
        setDetectionFailed(true);
      }
    };

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 2500);
    fetch('/api/geo', { signal: controller.signal, headers: { accept: 'application/json' } })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        const country = data && typeof data.country === 'string' ? data.country.toUpperCase() : null;
        if (country && /^[A-Z]{2}$/.test(country) && country !== 'XX') {
          finish(AFRICA.has(country) ? 'XAF' : 'EUR');
        } else {
          finish(currencyFromTimezone());
        }
      })
      .catch(() => finish(currencyFromTimezone()))
      .finally(() => clearTimeout(timer));

    return () => {
      cancelled = true;
      clearTimeout(timer);
      controller.abort();
    };
  }, [hasManualChoice]);

  const setCurrency = useCallback((value) => {
    if (value !== 'EUR' && value !== 'XAF') return;
    writeStorage('localStorage', CHOICE_KEY, value);
    setHasManualChoice(true);
    setCurrencyState(value);
  }, []);

  // Returns the price to display: the euro label when the visitor is outside
  // Africa and a euro price exists, otherwise the FCFA label.
  const pick = useCallback(
    (fcfa, eur) => (currency === 'EUR' && eur ? eur : fcfa),
    [currency]
  );

  const value = useMemo(
    () => ({ currency, setCurrency, showSelector: detectionFailed || hasManualChoice, pick }),
    [currency, setCurrency, detectionFailed, hasManualChoice, pick]
  );

  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>;
}

export function useCurrency() {
  return useContext(CurrencyContext);
}

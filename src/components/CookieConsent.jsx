import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FaCookieBite } from 'react-icons/fa6';
import { useT } from '../i18n/LanguageContext';
import './CookieConsent.css';

const STORAGE_KEY = 'kn-cookie-consent';

export default function CookieConsent() {
  const [choice, setChoice] = useState(null);
  const t = useT();

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      setChoice(stored || 'pending');
    } catch {
      setChoice('pending');
    }
  }, []);

  const respond = (value) => {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      /* ignore storage errors (private browsing, etc.) */
    }
    setChoice(value);
  };

  const visible = choice === 'pending';

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="cookie-consent"
          role="dialog"
          aria-live="polite"
          aria-label={t('cookies.label')}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="cookie-consent-icon">
            <FaCookieBite size={20} />
          </div>
          <p className="cookie-consent-text">
            {t('cookies.text')}
          </p>
          <div className="cookie-consent-actions">
            <button type="button" className="btn btn-outline btn-sm" onClick={() => respond('declined')}>
              {t('cookies.decline')}
            </button>
            <button type="button" className="btn btn-primary btn-sm" onClick={() => respond('accepted')}>
              {t('cookies.accept')}
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

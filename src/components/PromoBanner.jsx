import { useEffect, useState } from 'react';
import { FaXmark } from 'react-icons/fa6';
import { motion, AnimatePresence } from 'framer-motion';
import { useBanners } from '../hooks/useContent';
import { useT } from '../i18n/LanguageContext';
import './PromoBanner.css';

export default function PromoBanner({ placement = 'home_top' }) {
  const banners = useBanners();
  const [dismissed, setDismissed] = useState([]);
  const t = useT();

  useEffect(() => {
    try {
      const stored = JSON.parse(window.localStorage.getItem('kn-dismissed-banners') || '[]');
      setDismissed(stored);
    } catch {
      /* ignore */
    }
  }, []);

  const banner = banners.find((b) => b.placement === placement && !dismissed.includes(b.id));

  const dismiss = (id) => {
    const next = [...dismissed, id];
    setDismissed(next);
    try {
      window.localStorage.setItem('kn-dismissed-banners', JSON.stringify(next));
    } catch {
      /* ignore */
    }
  };

  return (
    <AnimatePresence>
      {banner && (
        <motion.div
          className={`promo-banner theme-${banner.theme || 'brand'}`}
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16, height: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="container promo-banner-inner">
            {banner.image && <img src={banner.image} alt="" className="promo-banner-img" loading="lazy" />}
            <div className="promo-banner-text">
              <strong>{banner.title}</strong>
              {banner.subtitle && <span>{banner.subtitle}</span>}
            </div>
            {banner.link && (
              <a href={banner.link} className="btn btn-sm promo-banner-cta">
                {banner.cta || t('common.learnMore')}
              </a>
            )}
            <button onClick={() => dismiss(banner.id)} aria-label={t('a11y.closeBanner')} className="promo-banner-close">
              <FaXmark size={14} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

import { useEffect, useState } from 'react';
import { FaArrowRight, FaXmark } from 'react-icons/fa6';
import { useAnnouncements } from '../hooks/useContent';
import { useT } from '../i18n/LanguageContext';
import './AnnouncementBar.css';

export default function AnnouncementBar() {
  const announcements = useAnnouncements();
  const [dismissed, setDismissed] = useState([]);
  const t = useT();

  useEffect(() => {
    try {
      const stored = JSON.parse(window.localStorage.getItem('kn-dismissed-announcements') || '[]');
      setDismissed(stored);
    } catch {
      /* ignore */
    }
  }, []);

  const active = announcements.find((a) => !dismissed.includes(a.id));
  if (!active) return null;

  const dismiss = () => {
    const next = [...dismissed, active.id];
    setDismissed(next);
    try {
      window.localStorage.setItem('kn-dismissed-announcements', JSON.stringify(next));
    } catch {
      /* ignore */
    }
  };

  return (
    <div className="announcement-bar">
      <div className="container announcement-inner">
        <p>
          {active.message}{' '}
          {active.link && (
            <a href={active.link} className="announcement-link">
              {active.linkLabel || t('common.learnMore')} <FaArrowRight size={10} />
            </a>
          )}
        </p>
        <button onClick={dismiss} aria-label={t('a11y.closeAnnouncement')}>
          <FaXmark size={13} />
        </button>
      </div>
    </div>
  );
}

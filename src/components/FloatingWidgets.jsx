import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa6';
import { waLink } from '../data/services';
import { useT } from '../i18n/LanguageContext';
import './FloatingWidgets.css';

export function WhatsAppFloat() {
  const t = useT();
  return (
    <motion.a
      href={waLink(t('common.waDefaultMessage'))}
      target="_blank"
      rel="noopener noreferrer"
      className="wa-float"
      aria-label={t('a11y.whatsappChat')}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.8, type: 'spring', stiffness: 260, damping: 18 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.94 }}
    >
      <span className="wa-float-ring" />
      <FaWhatsapp size={26} />
    </motion.a>
  );
}

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const scrolled = h.scrollTop;
      const height = h.scrollHeight - h.clientHeight;
      setProgress(height > 0 ? (scrolled / height) * 100 : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="scroll-progress" aria-hidden="true">
      <div className="scroll-progress-bar" style={{ width: `${progress}%` }} />
    </div>
  );
}

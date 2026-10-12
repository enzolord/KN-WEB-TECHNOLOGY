import { useState } from 'react';
import { FaArrowRight, FaCheck } from 'react-icons/fa6';

import { useT } from '../i18n/LanguageContext';

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xgobryya';

export default function NewsletterForm({ compact = false }) {
  const [email, setEmail] = useState('');
  const t = useT();
  const [status, setStatus] = useState('idle'); // idle | sending | done | error

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setStatus('sending');
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, _subject: 'Nouvelle inscription newsletter — KN WEB' }),
      });
      if (res.ok) {
        setStatus('done');
        setEmail('');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <form className="newsletter-form" onSubmit={onSubmit}>
      {!compact && <label htmlFor="newsletter-email" className="visually-hidden">{t('newsletter.email')}</label>}
      <input
        id="newsletter-email"
        type="email"
        required
        placeholder={t('newsletter.emailPlaceholder')}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={status === 'sending' || status === 'done'}
      />
      <button type="submit" disabled={status === 'sending' || status === 'done'} aria-label={t('newsletter.subscribe')}>
        {status === 'done' ? <FaCheck size={14} /> : <FaArrowRight size={14} />}
      </button>
    </form>
  );
}

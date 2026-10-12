import { useState } from 'react';
import { FaArrowRight, FaCheck } from 'react-icons/fa6';
import Reveal from './Reveal';
import Rich from '../i18n/Rich';
import { useT } from '../i18n/LanguageContext';
import './NewsletterSection.css';

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xgobryya';

export default function NewsletterSection() {
  const [name, setName] = useState('');
  const t = useT();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | sending | done | error

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setStatus('sending');
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, _subject: 'Nouvelle inscription newsletter — KN WEB & TECHNOLOGY' }),
      });
      if (res.ok) {
        setStatus('done');
        setName('');
        setEmail('');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <section className="newsletter-section">
      <div className="newsletter-glow" aria-hidden="true" />
      <div className="container newsletter-inner">
        <Reveal className="newsletter-copy">
          <div className="tag center">
            <span className="dot" /> {t('newsletter.tag')}
          </div>
          <h2 className="newsletter-title">
            <Rich text={t('newsletter.title')} highlightClass="gradient-text" />
          </h2>
          <p className="newsletter-sub">{t('newsletter.sub')}</p>
        </Reveal>

        <Reveal delay={0.1} className="newsletter-form-wrap">
          {status === 'done' ? (
            <div className="newsletter-success">
              <FaCheck size={18} /> {t('newsletter.success')}
            </div>
          ) : (
            <form className="newsletter-section-form" onSubmit={onSubmit}>
              <div className="newsletter-field-row">
                <div className="newsletter-field">
                  <label htmlFor="newsletter-name" className="visually-hidden">
                    {t('newsletter.name')}
                  </label>
                  <input
                    id="newsletter-name"
                    type="text"
                    placeholder={t('newsletter.namePlaceholder')}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={status === 'sending'}
                  />
                </div>
                <div className="newsletter-field">
                  <label htmlFor="newsletter-section-email" className="visually-hidden">
                    {t('newsletter.email')}
                  </label>
                  <input
                    id="newsletter-section-email"
                    type="email"
                    required
                    placeholder={t('newsletter.emailPlaceholder')}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={status === 'sending'}
                  />
                </div>
              </div>
              <button type="submit" className="btn btn-primary" disabled={status === 'sending'}>
                {status === 'sending' ? t('newsletter.sending') : t('newsletter.submit')} <FaArrowRight size={13} />
              </button>
              {status === 'error' && (
                <p className="newsletter-error">{t('newsletter.error')}</p>
              )}
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}

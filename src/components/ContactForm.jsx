import { useState } from 'react';
import { FaCircleCheck, FaTriangleExclamation, FaPaperPlane } from 'react-icons/fa6';
import { getSupabase, isSupabaseConfigured } from '../lib/supabaseClient';
import { services } from '../data/services';
import { useT } from '../i18n/LanguageContext';

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mjgjveqe';

const initialState = { name: '', email: '', phone: '', subject: '', message: '' };

export default function ContactForm({ source = 'contact_page' }) {
  const [form, setForm] = useState(initialState);
  const [status, setStatus] = useState('idle'); // idle | sending | done | error
  const t = useT();

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    const tasks = [];

    if (isSupabaseConfigured) {
      tasks.push(getSupabase().then((supabase) => supabase.from('contact_messages').insert({ ...form, source }).then((r) => { if (r.error) throw r.error; })));
    }

    tasks.push(
      fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, _subject: `Nouveau contact — ${form.subject || 'Site web'}` }),
      })
    );

    try {
      const results = await Promise.allSettled(tasks);
      const ok = results.some((r) => r.status === 'fulfilled');
      if (ok) {
        setStatus('done');
        setForm(initialState);
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  if (status === 'done') {
    return (
      <div className="form-status success" role="status">
        <FaCircleCheck size={18} />
        <span>{t('contactForm.success')}</span>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit}>
      {status === 'error' && (
        <div className="form-status error" role="alert">
          <FaTriangleExclamation size={16} />
          <span>{t('contactForm.error')}</span>
        </div>
      )}

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="cf-name">{t('contactForm.name')}</label>
          <input id="cf-name" name="name" required value={form.name} onChange={onChange} placeholder={t('contactForm.namePlaceholder')} />
        </div>
        <div className="form-group">
          <label htmlFor="cf-phone">{t('contactForm.phone')}</label>
          <input
            id="cf-phone"
            name="phone"
            required
            value={form.phone}
            onChange={onChange}
            placeholder="+237 6XX XXX XXX"
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="cf-email">{t('contactForm.email')}</label>
        <input id="cf-email" name="email" type="email" value={form.email} onChange={onChange} placeholder={t('contactForm.emailPlaceholder')} />
      </div>

      <div className="form-group">
        <label htmlFor="cf-subject">{t('contactForm.subject')}</label>
        <select id="cf-subject" name="subject" value={form.subject} onChange={onChange}>
          <option value="">{t('contactForm.subjectPlaceholder')}</option>
          {services.map((s) => (
            <option key={s.slug} value={s.title}>
              {s.title}
            </option>
          ))}
          <option value="Autre">{t('contactForm.subjectOther')}</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="cf-message">{t('contactForm.message')}</label>
        <textarea
          id="cf-message"
          name="message"
          required
          value={form.message}
          onChange={onChange}
          placeholder={t('contactForm.messagePlaceholder')}
        />
      </div>

      <button type="submit" className="btn btn-primary form-submit" disabled={status === 'sending'}>
        {status === 'sending' ? t('contactForm.sending') : (
          <>
            {t('contactForm.submit')} <FaPaperPlane size={14} />
          </>
        )}
      </button>
    </form>
  );
}

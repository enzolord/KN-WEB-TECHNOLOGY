import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { FaRobot, FaXmark, FaPaperPlane, FaWhatsapp } from 'react-icons/fa6';
import { useServices, useFaqs, useSettings } from '../hooks/useContent';
import { waLink } from '../data/services';
import { steps as processSteps } from '../data/processSteps';
import { useT } from '../i18n/LanguageContext';
import './FloatingAssistant.css';

// Bot messages that come from the UI dictionary are stored as a key (not as
// text), so they follow the language switch even after being displayed.
// Answers built from site content (services, FAQ) stay in French.

function normalize(str) {
  return (str || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '');
}

export default function FloatingAssistant() {
  const [open, setOpen] = useState(false);
  const t = useT();
  const [messages, setMessages] = useState([{ role: 'bot', textKey: 'assistant.greeting' }]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef(null);

  const { data: services } = useServices();
  const { data: faqs } = useFaqs();
  const settings = useSettings();

  // Build a lightweight, keyword-matched knowledge base from the site's own
  // public content (services, FAQ, process, contact). Nothing from the admin
  // inbox, auth, or any private table is ever included here — see README
  // for how to extend this into a real LLM-backed assistant.
  const knowledgeBase = useMemo(() => {
    const entries = [];

    services.forEach((s) => {
      entries.push({
        keywords: [s.title, s.slug, ...(s.shortDesc || '').split(' ')],
        answer: `${s.title} — ${s.shortDesc}`,
        price: s.price,
        link: `/solutions/${s.slug}`,
        linkKey: 'assistant.seeService',
      });
    });

    faqs.forEach((f) => {
      entries.push({ keywords: [f.q], answer: f.a });
    });

    processSteps.forEach((s) => {
      entries.push({ keywords: [s.title], answer: `${s.title} : ${s.desc}` });
    });

    entries.push({
      keywords: ['prix', 'tarif', 'combien', 'coute', 'cout', 'devis', 'price', 'pricing', 'cost', 'quote'],
      answerKey: 'assistant.answers.pricing',
    });
    entries.push({
      keywords: ['delai', 'rapide', 'combien de temps', 'livraison', 'delivery', 'how long', 'turnaround', 'fast'],
      answerKey: 'assistant.answers.delay',
    });
    entries.push({
      keywords: [
        'zone', 'cameroun', 'douala', 'yaounde', 'edea', 'international', 'etranger', 'ou etes vous', 'localisation',
        'cameroon', 'abroad', 'outside', 'where', 'location',
      ],
      answerKey: 'assistant.answers.zone',
    });
    entries.push({
      keywords: ['contact', 'telephone', 'numero', 'email', 'joindre', 'phone', 'number', 'reach'],
      answerKey: 'assistant.answers.contact',
      vars: {
        phone: settings.contact?.phone || '+237 672 173 778',
        email: settings.contact?.email || 'contact@knwebtechnology.com',
      },
    });
    entries.push({
      keywords: ['paiement', 'mobile money', 'orange money', 'mtn', 'payer', 'payment', 'pay'],
      answerKey: 'assistant.answers.payment',
    });
    entries.push({
      keywords: ['bonjour', 'salut', 'bonsoir', 'hello', 'hi', 'good morning'],
      answerKey: 'assistant.answers.hello',
    });
    entries.push({
      keywords: ['merci', 'parfait', 'super', 'thanks', 'thank you', 'great'],
      answerKey: 'assistant.answers.thanks',
    });

    return entries;
  }, [services, faqs, settings]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, typing]);

  const findAnswer = (question) => {
    const q = normalize(question);
    const qWords = q.split(/\W+/).filter((w) => w.length > 2);
    let best = null;
    let bestScore = 0;
    knowledgeBase.forEach((entry) => {
      let score = 0;
      entry.keywords.forEach((kw) => {
        const nk = normalize(kw);
        if (!nk || nk.length < 3) return;
        if (q.includes(nk)) score += nk.length >= 5 ? 3 : 1;
        else if (qWords.some((w) => nk.includes(w))) score += 1;
      });
      if (score > bestScore) {
        bestScore = score;
        best = entry;
      }
    });
    return bestScore > 0 ? best : null;
  };

  const send = (text) => {
    const question = (text ?? input).trim();
    if (!question) return;
    setMessages((m) => [...m, { role: 'user', text: question }]);
    setInput('');
    setTyping(true);
    setTimeout(() => {
      const match = findAnswer(question);
      setMessages((m) => [
        ...m,
        match
          ? {
              role: 'bot',
              text: match.answer,
              textKey: match.answerKey,
              vars: match.vars,
              price: match.price,
              link: match.link,
              linkKey: match.linkKey,
            }
          : { role: 'bot', textKey: 'assistant.fallback', whatsapp: true },
      ]);
      setTyping(false);
    }, 500 + Math.random() * 400);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    send();
  };

  const suggestions = t('assistant.suggestions');
  const contentNote = t('assistant.contentNote');

  const messageText = (m) => {
    if (m.textKey) return t(m.textKey, m.vars);
    return m.price ? `${m.text} ${t('assistant.servicePrice', { price: m.price })}` : m.text;
  };

  return (
    <>
      <motion.button
        type="button"
        className="ai-float-btn"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? t('assistant.close') : t('assistant.open')}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: 'spring', stiffness: 260, damping: 18 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
      >
        {open ? <FaXmark size={20} /> : <FaRobot size={22} />}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="ai-chat-panel"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="ai-chat-head">
              <div className="ai-chat-head-icon">
                <FaRobot size={16} />
              </div>
              <div>
                <strong>{t('assistant.title')}</strong>
                <span>{t('assistant.subtitle')}</span>
              </div>
              <button type="button" className="ai-chat-close" onClick={() => setOpen(false)} aria-label={t('common.close')}>
                <FaXmark size={16} />
              </button>
            </div>

            <div className="ai-chat-body" ref={scrollRef}>
              {messages.map((m, i) => (
                <div key={i} className={`ai-msg ai-msg-${m.role}`}>
                  <p>{messageText(m)}</p>
                  {m.link && (
                    <Link to={m.link} className="ai-msg-link" onClick={() => setOpen(false)}>
                      {t(m.linkKey || 'common.learnMore')}
                    </Link>
                  )}
                  {m.whatsapp && (
                    <a
                      href={waLink(t('assistant.waMessage'))}
                      target="_blank"
                      rel="noreferrer"
                      className="ai-msg-link ai-msg-wa"
                    >
                      <FaWhatsapp size={13} /> {t('assistant.writeWhatsapp')}
                    </a>
                  )}
                </div>
              ))}
              {typing && (
                <div className="ai-msg ai-msg-bot ai-typing">
                  <span />
                  <span />
                  <span />
                </div>
              )}
            </div>

            {messages.length < 3 && contentNote && <p className="ai-content-note">{contentNote}</p>}

            {messages.length < 3 && (
              <div className="ai-suggestions">
                {suggestions.map((s) => (
                  <button key={s} type="button" onClick={() => send(s)}>
                    {s}
                  </button>
                ))}
              </div>
            )}

            <form className="ai-chat-input" onSubmit={onSubmit}>
              <input
                type="text"
                placeholder={t('assistant.placeholder')}
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <button type="submit" aria-label={t('assistant.send')}>
                <FaPaperPlane size={14} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

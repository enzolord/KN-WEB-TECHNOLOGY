import { Link } from 'react-router-dom';
import {
  FaLocationDot,
  FaPhone,
  FaEnvelope,
  FaWhatsapp,
  FaClock,
  FaCalendarDay,
  FaCalendarWeek,
  FaHeadset,
  FaArrowRight,
} from 'react-icons/fa6';
import Seo from '../components/Seo';
import Reveal from '../components/Reveal';
import ContactForm from '../components/ContactForm';
import PresenceMap from '../components/PresenceMap';
import HeroBackdrop from '../components/HeroBackdrop';
import { useSettings } from '../hooks/useContent';
import { waLink, WHATSAPP_SECONDARY, WHATSAPP_SECONDARY_DISPLAY } from '../data/services';
import { useT } from '../i18n/LanguageContext';
import Rich from '../i18n/Rich';
import './Contact.css';

export default function Contact() {
  const settings = useSettings();
  const t = useT();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    about: { '@type': 'LocalBusiness', name: 'KN WEB & TECHNOLOGY', telephone: settings.contact.phone },
  };

  return (
    <>
      <Seo
        title={t('contact.seoTitle')}
        description={t('contact.seoDesc')}
        path="/contact"
        jsonLd={jsonLd}
      />

      <section className="section section-hero-bg" style={{ paddingBottom: '1rem' }}>
        <HeroBackdrop />
        <div className="container">
          <Reveal style={{ textAlign: 'center', maxWidth: 700, margin: '0 auto' }}>
            <div className="tag center">
              <span className="dot" /> {t('contact.tag')}
            </div>
            <h1 className="section-title center">
              <Rich text={t('contact.title')} />
            </h1>
            <p className="section-sub center">{t('contact.sub')}</p>
          </Reveal>
        </div>
      </section>

      <section className="section" style={{ paddingTop: '1rem' }}>
        <div className="container">
          <div className="contact-grid">
            <Reveal direction="right">
              <div className="info-card">
                <div className="info-header">
                  <div className="info-icon">
                    <FaLocationDot size={16} />
                  </div>
                  <h3 className="info-title">{t('contact.agencyTitle')}</h3>
                </div>
                <p>{t('contact.agencyText')}</p>
                <ul className="contact-list">
                  <li>
                    <FaLocationDot size={13} /> {t('contact.hq')}
                  </li>
                  <li>
                    <FaPhone size={13} /> {settings.contact.phone}
                  </li>
                  <li>
                    <FaEnvelope size={13} /> {settings.contact.email}
                  </li>
                  <li>
                    <FaWhatsapp size={13} /> {t('contact.whatsapp', { phone: settings.contact.phone })}
                  </li>
                </ul>
              </div>

              <div className="info-card">
                <div className="info-header">
                  <div className="info-icon">
                    <FaClock size={16} />
                  </div>
                  <h3 className="info-title">{t('contact.hoursTitle')}</h3>
                </div>
                <ul className="contact-list">
                  <li>
                    <FaCalendarDay size={13} /> {t('contact.weekdays')}
                  </li>
                  <li>
                    <FaCalendarWeek size={13} /> {t('contact.saturday')}
                  </li>
                  <li>
                    <FaHeadset size={13} /> {t('contact.emergency')}
                  </li>
                </ul>
              </div>

              <a href={waLink()} target="_blank" rel="noreferrer" className="btn btn-whatsapp btn-block">
                <FaWhatsapp size={16} /> {t('contact.chatWhatsapp')}
              </a>
              <p className="contact-wa-secondary">
                {t('contact.secondaryLine')}{' '}
                <a href={waLink(undefined, WHATSAPP_SECONDARY)} target="_blank" rel="noreferrer">
                  {WHATSAPP_SECONDARY_DISPLAY}
                </a>
              </p>
            </Reveal>

            <Reveal direction="left" className="form-card">
              <p className="form-title">{t('contact.formTitle')}</p>
              <p className="form-sub">{t('contact.formSub')}</p>
              <ContactForm source="contact_page" />
            </Reveal>
          </div>

          <Reveal style={{ marginBottom: '1.5rem' }}>
            <h2 className="section-title" style={{ fontSize: '1.5rem' }}>
              <Rich text={t('contact.presenceTitle')} />
            </h2>
          </Reveal>
          <PresenceMap />
        </div>
      </section>

      <section className="section cta-animated-bg">
        <div className="container">
          <Reveal className="cta-final">
            <h2>{t('contact.ctaTitle')}</h2>
            <p>{t('contact.ctaSub')}</p>
            <div className="cta-btns">
              <a href={waLink()} target="_blank" rel="noreferrer" className="btn btn-whatsapp">
                <FaWhatsapp size={15} /> {t('common.whatsappDirect')}
              </a>
              <Link to="/solutions" className="btn btn-outline">
                {t('contact.seeSolutions')} <FaArrowRight size={13} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

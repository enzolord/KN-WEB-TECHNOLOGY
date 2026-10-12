import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaGem, FaBullseye, FaCircleCheck, FaWhatsapp, FaCompass } from 'react-icons/fa6';
import Seo from '../components/Seo';
import Reveal from '../components/Reveal';
import TeamCard from '../components/TeamCard';
import PresenceMap from '../components/PresenceMap';
import ContactForm from '../components/ContactForm';
import HeroBackdrop from '../components/HeroBackdrop';
import { useTeam } from '../hooks/useContent';
import { waLink } from '../data/services';
import { useT } from '../i18n/LanguageContext';
import Rich from '../i18n/Rich';

import equipe5 from '../assets/images/equipe/equipe5.webp';
import equipe3 from '../assets/images/equipe/equipe3.webp';
import equipe2 from '../assets/images/equipe/equipe2.webp';
import equipe1 from '../assets/images/equipe/equipe1.webp';
import logoFull from '../assets/images/logo/logo-full.webp';

import './Agence.css';

const sliderImages = [equipe5, equipe3, equipe2, equipe1];

export default function Agence() {
  const { data: team } = useTeam();
  const [active, setActive] = useState(0);
  const t = useT();
  const values = t('agency.values');
  const methodSteps = t('agency.methodSteps');

  useEffect(() => {
    const id = setInterval(() => setActive((a) => (a + 1) % sliderImages.length), 3500);
    return () => clearInterval(id);
  }, []);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    about: { '@type': 'Organization', name: 'KN WEB & TECHNOLOGY' },
  };

  return (
    <>
      <Seo
        title={t('agency.seoTitle')}
        description={t('agency.seoDesc')}
        path="/agence"
        jsonLd={jsonLd}
      />

      <section className="section section-hero-bg">
        <HeroBackdrop />
        <div className="container hero-agence">
          <Reveal direction="right">
            <div className="tag">
              <span className="dot" /> {t('agency.heroTag')}
            </div>
            <h1>
              <Rich text={t('agency.heroTitle')} />
            </h1>
            <p className="section-sub" style={{ margin: '1.5rem 0' }}>
              {t('agency.heroText')}
            </p>
            <Link to="/contact" className="btn btn-primary">
              {t('agency.workWithUs')} <FaArrowRight size={13} />
            </Link>
          </Reveal>
          <Reveal direction="left" className="hero-image">
            {sliderImages.map((src, i) => (
              <img key={src} src={src} alt={t('agency.teamPhotoAlt')} className={i === active ? 'active' : ''} loading="lazy" />
            ))}
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal style={{ textAlign: 'center', maxWidth: 800, margin: '0 auto' }}>
            <div className="tag center">
              <span className="dot" /> {t('agency.philosophyTag')}
            </div>
            <h2 className="section-title center">
              <Rich text={t('agency.philosophyTitle')} />
            </h2>
            <p className="section-sub center">{t('agency.philosophyText')}</p>
          </Reveal>

          <div className="philosophy-grid">
            <Reveal direction="right" className="philosophy-logo-col">
              <div className="philosophy-logo-badge">
                <span className="philosophy-logo-glow" aria-hidden="true" />
                <img src={logoFull} alt={t('agency.logoAlt')} loading="lazy" width="320" height="320" />
              </div>
            </Reveal>

            <div className="philosophy-cards-col">
              <Reveal direction="left" className="value-card philosophy-card" id="valeurs">
                <div className="philosophy-card-icon">
                  <FaGem />
                </div>
                <h3>{t('agency.valuesTitle')}</h3>
                <ul className="philosophy-value-list">
                  {values.map((v, i) => (
                    <li key={v} style={{ transitionDelay: `${i * 0.08}s` }}>
                      <FaCircleCheck /> {v}
                    </li>
                  ))}
                </ul>
              </Reveal>
              <Reveal direction="left" delay={0.1} className="mission-card philosophy-card" id="vision">
                <div className="philosophy-card-icon philosophy-card-icon-alt">
                  <FaCompass />
                </div>
                <h3>{t('agency.visionTitle')}</h3>
                <p>{t('process.vision')}</p>
              </Reveal>
              <Reveal direction="left" delay={0.2} className="mission-card philosophy-card" id="mission">
                <div className="philosophy-card-icon">
                  <FaBullseye />
                </div>
                <h3>{t('agency.missionTitle')}</h3>
                <p>{t('agency.missionText')}</p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <Reveal style={{ textAlign: 'center' }}>
            <div className="tag center">
              <span className="dot" /> {t('agency.teamTag')}
            </div>
            <h2 className="section-title center">
              <Rich text={t('agency.teamTitle')} />
            </h2>
          </Reveal>
          <div className="team-grid" style={{ marginTop: '2.5rem' }}>
            {team.map((m, i) => (
              <TeamCard key={m.name} member={m} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container method-grid">
          <Reveal direction="right">
            <div className="tag">
              <span className="dot" /> {t('agency.methodTag')}
            </div>
            <h2 className="section-title">
              <Rich text={t('agency.methodTitle')} />
            </h2>
            <p className="section-sub">
              <Rich text={t('agency.methodSub')} />
            </p>
          </Reveal>
          <div className="method-steps">
            {methodSteps.map((s, i) => (
              <Reveal as="div" className="m-step" key={s.num} delay={i * 0.08}>
                <span className="m-step-num">{s.num}</span>
                <div>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <Reveal style={{ marginBottom: '1.5rem' }}>
            <div className="tag">
              <span className="dot" /> {t('agency.presenceTag')}
            </div>
            <h2 className="section-title">
              <Rich text={t('agency.presenceTitle')} />
            </h2>
          </Reveal>
          <PresenceMap />
        </div>
      </section>

      <section className="section" id="contact">
        <div className="container">
          <Reveal style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <div className="tag center">
              <span className="dot" /> {t('agency.contactTag')}
            </div>
            <h2 className="section-title center">
              <Rich text={t('agency.contactTitle')} />
            </h2>
            <p className="section-sub center">{t('agency.contactSub')}</p>
          </Reveal>
          <div className="grid-2" style={{ maxWidth: 700, margin: '0 auto' }}>
            <div className="form-card" style={{ gridColumn: '1 / -1' }}>
              <ContactForm source="agence_page" />
            </div>
          </div>
          <Reveal style={{ textAlign: 'center', marginTop: '2rem' }}>
            <a href={waLink()} target="_blank" rel="noreferrer" className="btn btn-whatsapp">
              <FaWhatsapp size={15} /> {t('agency.whatsappAlt')}
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
}

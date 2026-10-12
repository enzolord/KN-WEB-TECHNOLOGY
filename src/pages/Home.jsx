import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowDown, FaArrowUpRightFromSquare, FaArrowRight, FaWhatsapp, FaLocationDot, FaClock, FaRocket } from 'react-icons/fa6';

import Seo, { SITE_URL } from '../components/Seo';
import PromoBanner from '../components/PromoBanner';
import Reveal from '../components/Reveal';
import ServiceCard from '../components/ServiceCard';
import ProjectCard from '../components/ProjectCard';
import BlogCard from '../components/BlogCard';
import TestimonialsMarquee from '../components/TestimonialsMarquee';
import PartnersMarquee from '../components/PartnersMarquee';
import StatCounter from '../components/StatCounter';
import ContactForm from '../components/ContactForm';
import HeroBackdrop from '../components/HeroBackdrop';

import { useServices, useProjects, useArticles, useSettings, useHeroImages } from '../hooks/useContent';
import { waLink } from '../data/services';
import { useT } from '../i18n/LanguageContext';
import Rich from '../i18n/Rich';

import ceoImg from '../assets/images/equipe/Moi_.webp';
import logoFull from '../assets/images/logo/logo-full.webp';

import './Home.css';

// Keeps the original inline styling of the "là pour vous." highlight.
function HereHighlight({ children }) {
  return <em style={{ fontStyle: 'normal', color: 'var(--primary)' }}>{children}</em>;
}

function useFrameRotator(count, interval = 4000) {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setActive((a) => (a + 1) % count), interval);
    return () => clearInterval(id);
  }, [count, interval]);
  return active;
}

export default function Home() {
  const { data: services } = useServices();
  const { data: projects } = useProjects();
  const { data: articles } = useArticles();
  const { data: heroImages } = useHeroImages();
  const settings = useSettings();
  const t = useT();
  const methodSteps = t('home.method.steps');
  const agencyValues = t('home.agency.values');
  const activeFrame = useFrameRotator(heroImages.length);

  const featuredProjects = projects.slice(0, 3);
  const latestArticles = articles.slice(0, 3);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'KN WEB & TECHNOLOGY',
    image: `${SITE_URL}/web-app-manifest-512x512.png`,
    url: SITE_URL,
    telephone: settings.contact.phone,
    address: { '@type': 'PostalAddress', addressLocality: 'Édéa', addressRegion: 'Littoral', addressCountry: 'CM' },
    areaServed: ['Édéa', 'Douala', 'Yaoundé', 'Cameroun'],
    priceRange: '$$',
  };

  return (
    <>
      <Seo
        title={t('home.seoTitle')}
        description={t('home.seoDesc')}
        path="/"
        jsonLd={jsonLd}
      />
      <PromoBanner placement="home_top" />

      {/* HERO */}
      <section className="hero" id="hero">
        <HeroBackdrop />
        <div className="container hero-inner">
          <div className="hero-text">
            <Reveal>
              <div className="hero-label">
                <span className="hero-dot" /> {t('home.hero.label')}
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <h1>
                <Rich text={t('home.hero.title')} highlight="em" />
              </h1>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="hero-sub">{t('home.hero.sub')}</p>
            </Reveal>
            <Reveal delay={0.24}>
              <div className="hero-btns">
                <a href="#services" className="btn btn-primary">
                  <FaArrowDown size={13} /> {t('home.hero.ctaServices')}
                </a>
                <Link to="/contact" className="btn btn-outline">
                  {t('home.hero.ctaTalk')} <FaArrowUpRightFromSquare size={13} />
                </Link>
              </div>
            </Reveal>

            <Reveal delay={0.32}>
              <div className="stats-bar">
                <StatCounter value={services.length || 9} label={t('home.hero.stats.solutions')} />
                <StatCounter value={6} label={t('home.hero.stats.cities')} />
                <StatCounter value={6} label={t('home.hero.stats.team')} />
                <StatCounter value={100} suffix="%" label={t('home.hero.stats.fixedPrice')} />
              </div>
            </Reveal>
          </div>

          <Reveal direction="left" delay={0.2} className="hero-media">
            <div className="image-frame">
              <div className="frame-inner">
                {heroImages.map((frame, i) => (
                  <div
                    key={frame.id}
                    className={`frame-img ${i === activeFrame ? 'is-active' : ''}`}
                    style={{ backgroundImage: `url(${frame.image})` }}
                  />
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* PARTNERS */}
      <section className="partners-section">
        <div className="container">
          <Reveal>
            <p className="partners-badge">{t('home.partners')}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <PartnersMarquee />
          </Reveal>
        </div>
      </section>

      {/* SERVICES */}
      <section className="section" id="services">
        <div className="container">
          <Reveal>
            <div className="tag">
              <span className="dot" /> {t('home.services.tag')}
            </div>
            <h2 className="section-title">
              <Rich text={t('home.services.title')} />
            </h2>
            <p className="section-sub">{t('home.services.sub')}</p>
          </Reveal>
          <div className="grid-auto" style={{ marginTop: '2.5rem' }}>
            {services.map((s, i) => (
              <ServiceCard key={s.slug} service={s} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section className="section section-alt" id="projets">
        <div className="container">
          <Reveal>
            <div className="tag">
              <span className="dot" /> {t('home.projects.tag')}
            </div>
            <h2 className="section-title">
              <Rich text={t('home.projects.title')} />
            </h2>
          </Reveal>
          <div className="grid-auto" style={{ marginTop: '2.5rem' }}>
            {featuredProjects.map((p, i) => (
              <ProjectCard key={p.id} project={p} index={i} />
            ))}
          </div>
          <Reveal delay={0.2} style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <Link to="/projets" className="btn btn-outline">
              {t('home.projects.cta')} <FaArrowRight size={13} />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* METHOD */}
      <section className="section" id="method">
        <div className="container method-grid">
          <Reveal direction="right">
            <div className="tag">
              <span className="dot" /> {t('home.method.tag')}
            </div>
            <h2 className="section-title">
              <Rich text={t('home.method.title')} />
            </h2>
            <p className="section-sub">
              <Rich text={t('home.method.sub')} />
            </p>
          </Reveal>
          <div className="method-steps">
            {methodSteps.map((step, i) => (
              <Reveal as="div" className="m-step" key={step.num} delay={i * 0.08}>
                <span className="m-step-num">{step.num}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                  <span className="m-step-tag">{step.tag}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section-tight">
        <Reveal className="container" style={{ marginBottom: '1.5rem' }}>
          <div className="tag center">
            <span className="dot" /> {t('home.testimonials.tag')}
          </div>
          <h2 className="section-title center">
            <Rich text={t('home.testimonials.title')} />
          </h2>
        </Reveal>
        <TestimonialsMarquee />
      </section>

      {/* AGENCY */}
      <section className="section section-alt" id="agency">
        <div className="container agency-section">
          <Reveal direction="right">
            <div className="agency-logo-img">
              <img src={logoFull} alt={t('home.agency.logoAlt')} className="agency-logo" loading="lazy" width="220" height="132" />
            </div>
            <div className="val-list">
              <div className="val-item">
                <div className="val-n">M</div>
                <div>
                  <h4>{t('home.agency.missionTitle')}</h4>
                  <p>{t('home.agency.missionText')}</p>
                </div>
              </div>
              <div className="val-item">
                <div className="val-n">V</div>
                <div>
                  <h4>{t('home.agency.visionTitle')}</h4>
                  <p>{t('home.agency.visionText')}</p>
                </div>
              </div>
            </div>
          </Reveal>
          <Reveal direction="left">
            <div className="tag">
              <span className="dot" /> {t('home.agency.tag')}
            </div>
            <h2 className="section-title">
              <Rich text={t('home.agency.title')} />
            </h2>
            <div className="val-list">
              {agencyValues.map((v, i) => (
                <div className="val-item" key={v.title}>
                  <div className="val-n">{i + 1}</div>
                  <div>
                    <h4>{v.title}</h4>
                    <p>{v.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link to="/contact" className="btn btn-primary" style={{ marginTop: '2rem' }}>
              {t('home.agency.cta')} <FaArrowRight size={13} />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* CEO */}
      <section className="section" id="ceo">
        <div className="container">
          <Reveal className="ceo-section">
            <div className="ceo-photo-wrap">
              <img
                src={ceoImg}
                alt={t('home.ceo.photoAlt')}
                loading="lazy"
                className="ceo-photo-floating"
                width="360"
                height="440"
              />
            </div>
            <div>
              <div className="tag">
                <span className="dot" /> {t('home.ceo.tag')}
              </div>
              <div className="ceo-name">Nloka Victor</div>
              <div className="ceo-title">{t('home.ceo.title')}</div>
              <p className="ceo-bio">{t('home.ceo.bio')}</p>
              <Link to="/contact" className="btn btn-outline">
                {t('home.ceo.cta')} <FaArrowUpRightFromSquare size={13} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* BLOG PREVIEW */}
      {latestArticles.length > 0 && (
        <section className="section section-alt" id="blog">
          <div className="container">
            <Reveal>
              <div className="tag">
                <span className="dot" /> {t('home.blog.tag')}
              </div>
              <h2 className="section-title">
                <Rich text={t('home.blog.title')} />
              </h2>
            </Reveal>
            <div className="grid-auto" style={{ marginTop: '2.5rem' }}>
              {latestArticles.map((a, i) => (
                <BlogCard key={a.slug} article={a} index={i} />
              ))}
            </div>
            <Reveal delay={0.2} style={{ textAlign: 'center', marginTop: '2.5rem' }}>
              <Link to="/blog" className="btn btn-outline">
                {t('home.blog.cta')} <FaArrowRight size={13} />
              </Link>
            </Reveal>
          </div>
        </section>
      )}

      {/* CONTACT */}
      <section className="section" id="contact">
        <div className="container">
          <Reveal style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <div className="tag center">
              <span className="dot" /> {t('home.contact.tag')}
            </div>
            <h2 className="section-title center">
              <Rich text={t('home.contact.title')} />
            </h2>
            <p className="section-sub center">{t('home.contact.sub')}</p>
          </Reveal>
          <div className="contact-layout">
            <Reveal direction="right">
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', fontWeight: 700 }}>
                <Rich text={t('home.contact.hereTitle')} highlight={HereHighlight} />
              </h3>
              <p style={{ marginBottom: '1.5rem' }}>{t('home.contact.basedIn', { address: settings.contact.address })}</p>
              <a className="ci-item" href={waLink(t('common.waDefaultMessage'))} target="_blank" rel="noreferrer">
                <div className="ci-icon">
                  <FaWhatsapp size={18} />
                </div>
                <div>
                  <div className="ci-lbl">{t('home.contact.whatsapp')}</div>
                  <div className="ci-val">{settings.contact.phone}</div>
                </div>
              </a>
              <div className="ci-item">
                <div className="ci-icon">
                  <FaLocationDot size={18} />
                </div>
                <div>
                  <div className="ci-lbl">{t('home.contact.location')}</div>
                  <div className="ci-val">{t('home.contact.locationValue')}</div>
                </div>
              </div>
              <div className="ci-item">
                <div className="ci-icon">
                  <FaClock size={18} />
                </div>
                <div>
                  <div className="ci-lbl">{t('home.contact.hours')}</div>
                  <div className="ci-val">{t('home.contact.hoursValue')}</div>
                </div>
              </div>
            </Reveal>
            <Reveal direction="left" className="form-card">
              <p className="form-title">{t('home.contact.formTitle')}</p>
              <p className="form-sub">{t('home.contact.formSub')}</p>
              <ContactForm source="home_page" />
            </Reveal>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="section cta-animated-bg">
        <div className="container">
          <Reveal className="cta-final">
            <h2>
              <Rich text={t('home.finalCta.title')} highlightClass="gradient-text" />
            </h2>
            <p>{t('home.finalCta.sub')}</p>
            <div className="cta-btns">
              <Link to="/contact" className="btn btn-primary">
                <FaRocket size={13} /> {t('common.startProject')}
              </Link>
              <a href={waLink()} target="_blank" rel="noreferrer" className="btn btn-whatsapp">
                <FaWhatsapp size={15} /> {t('common.whatsappDirect')}
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

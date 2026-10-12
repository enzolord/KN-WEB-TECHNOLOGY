import { useParams, Link, Navigate } from 'react-router-dom';
import { FaCheck, FaArrowRight, FaWhatsapp } from 'react-icons/fa6';
import Seo from '../components/Seo';
import Reveal from '../components/Reveal';
import { ServiceIcon } from '../components/IconMap';
import HeroBackdrop from '../components/HeroBackdrop';
import { useServices } from '../hooks/useContent';
import { waLink } from '../data/services';
import { useT } from '../i18n/LanguageContext';
import Rich from '../i18n/Rich';
import './ServiceDetail.css';

export default function ServiceDetail() {
  const { slug } = useParams();
  const { data: services, loading } = useServices();
  const t = useT();
  const service = services.find((s) => s.slug === slug);

  if (!loading && !service) return <Navigate to="/solutions" replace />;
  if (!service) return null;

  const related = services.filter((s) => s.slug !== slug).slice(0, 4);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.metaDescription,
    provider: { '@type': 'LocalBusiness', name: 'KN WEB & TECHNOLOGY' },
    areaServed: 'Cameroun',
    offers: service.priceValue
      ? { '@type': 'Offer', price: service.priceValue, priceCurrency: 'XAF' }
      : undefined,
  };

  return (
    <>
      <Seo title={service.title} description={service.metaDescription} path={`/solutions/${service.slug}`} jsonLd={jsonLd} />

      <section className="svc-hero section-hero-bg">
        <HeroBackdrop />
        <div className="container svc-hero-grid">
          <Reveal direction="right">
            <div className="tag">
              <ServiceIcon name={service.icon} size={14} /> {t('serviceDetail.tag', { number: service.number })}
            </div>
            <h1>
              {service.heroTitle}
              <span className="gradient-text">{service.heroHighlight}</span>
            </h1>
            <p className="section-sub" style={{ marginBottom: '1.5rem' }}>
              {service.lead}
            </p>
            <div className="price-badge">{service.price}</div>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '1rem' }}>
              <a href={waLink(service.waMessage)} target="_blank" rel="noreferrer" className="btn btn-whatsapp">
                <FaWhatsapp size={15} /> {t('serviceDetail.quote')}
              </a>
              <Link to="/projets" className="btn btn-outline">
                {t('serviceDetail.seeProjects')}
              </Link>
            </div>
          </Reveal>
          <Reveal direction="left" className="svc-hero-img">
            <img src={service.image} alt={service.title} loading="eager" width="700" height="525" />
          </Reveal>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container grid-2">
          <Reveal direction="right">
            <h2 className="section-title">{service.h2}</h2>
            <p className="section-sub" style={{ marginBottom: '1.5rem' }}>
              {service.desc}
            </p>
            <ul className="feature-list">
              {service.features.map((f) => (
                <li key={f}>
                  <FaCheck size={14} /> <span dangerouslySetInnerHTML={{ __html: f }} />
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal direction="left">
            <div className="card svc-sticky-card" style={{ padding: '2rem' }}>
              <h3 style={{ marginBottom: '0.5rem' }}>{t('serviceDetail.interestedTitle')}</h3>
              <p style={{ marginBottom: '1.5rem', fontSize: '0.92rem' }}>{t('serviceDetail.interestedText')}</p>
              <a href={waLink(service.waMessage)} target="_blank" rel="noreferrer" className="btn btn-whatsapp btn-block">
                <FaWhatsapp size={15} /> {t('serviceDetail.chatWhatsapp')}
              </a>
              <Link to="/contact" className="btn btn-outline btn-block" style={{ marginTop: '0.75rem' }}>
                {t('serviceDetail.contactForm')}
              </Link>

              <div className="svc-related">
                <p style={{ fontSize: '0.78rem', color: 'var(--text-faint)', marginBottom: '0.25rem' }}>
                  {t('serviceDetail.otherSolutions')}
                </p>
                {related.map((r) => (
                  <Link key={r.slug} to={`/solutions/${r.slug}`}>
                    {r.title} <FaArrowRight size={12} />
                  </Link>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section cta-animated-bg">
        <div className="container">
          <Reveal className="cta-final">
            <h2>
              <Rich
                text={t('serviceDetail.ctaTitle', { service: service.title.toLowerCase() })}
                highlightClass="gradient-text"
              />
            </h2>
            <p>{t('serviceDetail.ctaSub')}</p>
            <div className="cta-btns">
              <Link to="/contact" className="btn btn-primary">
                {t('common.startProject')} <FaArrowRight size={13} />
              </Link>
              <a href={waLink(service.waMessage)} target="_blank" rel="noreferrer" className="btn btn-whatsapp">
                <FaWhatsapp size={15} /> {t('common.whatsappDirect')}
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

import { Link } from 'react-router-dom';
import { FaArrowRight, FaCheck } from 'react-icons/fa6';
import Seo from '../components/Seo';
import Reveal from '../components/Reveal';
import ServiceCard from '../components/ServiceCard';
import HeroBackdrop from '../components/HeroBackdrop';
import { useServices } from '../hooks/useContent';
import { useT } from '../i18n/LanguageContext';
import Rich from '../i18n/Rich';

export default function Solutions() {
  const { data: services } = useServices();
  const t = useT();
  const whyUs = t('solutions.whyUs');

  return (
    <>
      <Seo
        title={t('solutions.seoTitle')}
        description={t('solutions.seoDesc')}
        path="/solutions"
      />

      <section className="section section-hero-bg" style={{ paddingBottom: '2rem' }}>
        <HeroBackdrop />
        <div className="container">
          <Reveal style={{ textAlign: 'center', maxWidth: 760, margin: '0 auto' }}>
            <div className="tag center">
              <span className="dot" /> {t('solutions.tag')}
            </div>
            <h1 className="section-title center">
              <Rich text={t('solutions.title')} />
            </h1>
            <p className="section-sub center">{t('solutions.sub')}</p>
          </Reveal>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="grid-auto">
            {services.map((s, i) => (
              <ServiceCard key={s.slug} service={s} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container grid-2">
          <Reveal direction="right">
            <div className="tag">
              <span className="dot" /> {t('solutions.whyTag')}
            </div>
            <h2 className="section-title">
              <Rich text={t('solutions.whyTitle')} />
            </h2>
            <ul className="feature-list">
              {whyUs.map((item) => (
                <li key={item}>
                  <FaCheck size={14} /> {item}
                </li>
              ))}
            </ul>
            <Link to="/contact" className="btn btn-primary" style={{ marginTop: '1.5rem' }}>
              {t('solutions.quoteCta')} <FaArrowRight size={13} />
            </Link>
          </Reveal>
          <Reveal direction="left">
            <div className="card" style={{ padding: '2rem' }}>
              <h3 style={{ marginBottom: '1rem' }}>{t('solutions.helpTitle')}</h3>
              <p style={{ marginBottom: '1.5rem' }}>{t('solutions.helpText')}</p>
              <Link to="/comment-nous-travaillons" className="link-arrow">
                {t('solutions.helpLink')} <FaArrowRight size={12} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

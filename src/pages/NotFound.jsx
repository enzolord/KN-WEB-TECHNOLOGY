import { Link } from 'react-router-dom';
import { FaHouse, FaArrowRight } from 'react-icons/fa6';
import Seo from '../components/Seo';
import Reveal from '../components/Reveal';
import { useT } from '../i18n/LanguageContext';

export default function NotFound() {
  const t = useT();
  return (
    <>
      <Seo title={t('notFound.seoTitle')} description={t('notFound.seoDesc')} noindex />
      <section className="section" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <Reveal>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(4rem, 12vw, 7rem)', fontWeight: 800 }} className="gradient-text">
              404
            </p>
            <h1 className="section-title center">{t('notFound.title')}</h1>
            <p className="section-sub center">{t('notFound.sub')}</p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '1.5rem', flexWrap: 'wrap' }}>
              <Link to="/" className="btn btn-primary">
                <FaHouse size={13} /> {t('notFound.home')}
              </Link>
              <Link to="/contact" className="btn btn-outline">
                {t('notFound.contact')} <FaArrowRight size={13} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

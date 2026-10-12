import { Link } from 'react-router-dom';
import { FaArrowRight, FaWhatsapp } from 'react-icons/fa6';
import Seo from '../components/Seo';
import Reveal from '../components/Reveal';
import FaqAccordion from '../components/FaqAccordion';
import PresenceMap from '../components/PresenceMap';
import ValuesConstellation from '../components/ValuesConstellation';
import HeroBackdrop from '../components/HeroBackdrop';
import { useFaqs } from '../hooks/useContent';
import { waLink } from '../data/services';
import { useT } from '../i18n/LanguageContext';
import Rich from '../i18n/Rich';
import './Process.css';

export default function Process() {
  const { data: faqs } = useFaqs();
  const t = useT();
  const steps = t('process.steps');

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <>
      <Seo
        title={t('process_page.seoTitle')}
        description={t('process_page.seoDesc')}
        path="/comment-nous-travaillons"
        jsonLd={jsonLd}
      />

      <section className="section section-hero-bg" style={{ paddingBottom: '1rem' }}>
        <HeroBackdrop />
        <div className="container">
          <Reveal style={{ maxWidth: 700 }}>
            <div className="tag">
              <span className="dot" /> {t('process_page.tag')}
            </div>
            <h1 className="section-title">
              <Rich text={t('process_page.title')} />
            </h1>
            <p className="section-sub">{t('process_page.sub')}</p>
          </Reveal>
        </div>
      </section>

      <section className="section" style={{ paddingTop: '1rem' }}>
        <div className="container process-grid">
          {steps.map((s, i) => (
            <Reveal as="div" className="step-card" key={s.num} delay={i * 0.06}>
              <div className="step-num">{s.num}</div>
              <div className="step-title">{s.title}</div>
              <div className="step-desc">{s.desc}</div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <Reveal style={{ marginBottom: '2rem' }}>
            <div className="tag">
              <span className="dot" /> {t('process_page.faqTag')}
            </div>
            <h2 className="section-title">
              <Rich text={t('process_page.faqTitle')} />
            </h2>
            <p className="section-sub">{t('process_page.faqSub')}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <FaqAccordion items={faqs} />
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <div className="tag center">
              <span className="dot" /> {t('process_page.agencyTag')}
            </div>
            <h2 className="section-title center">
              <Rich text={t('process_page.agencyTitle')} />
            </h2>
          </Reveal>

          <ValuesConstellation
            values={t('process.values')}
            vision={t('process.vision')}
            missionStatement={t('process.missionStatement')}
          />

          <Reveal style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div className="tag center">
              <span className="dot" /> {t('process_page.presenceTag')}
            </div>
            <h2 className="section-title center">
              <Rich text={t('process_page.presenceTitle')} />
            </h2>
          </Reveal>
          <PresenceMap />
        </div>
      </section>

      <section className="section cta-animated-bg">
        <div className="container">
          <Reveal className="cta-final">
            <h2>
              <Rich text={t('process_page.ctaTitle')} highlightClass="gradient-text" />
            </h2>
            <p>{t('process_page.ctaSub')}</p>
            <div className="cta-btns">
              <Link to="/contact" className="btn btn-primary">
                {t('common.startProject')} <FaArrowRight size={13} />
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

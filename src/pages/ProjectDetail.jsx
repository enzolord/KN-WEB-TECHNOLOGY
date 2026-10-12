import { useParams, Link, Navigate } from 'react-router-dom';
import { FaArrowUpRightFromSquare, FaArrowRight, FaWhatsapp, FaTriangleExclamation, FaLightbulb } from 'react-icons/fa6';
import Seo from '../components/Seo';
import Reveal from '../components/Reveal';
import HeroBackdrop from '../components/HeroBackdrop';
import { useProject } from '../hooks/useContent';
import { CATEGORY_TO_SERVICE } from '../data/projects';
import { waLink } from '../data/services';
import { useT } from '../i18n/LanguageContext';
import Rich from '../i18n/Rich';
import './ProjectDetail.css';

export default function ProjectDetail() {
  const { slug } = useParams();
  const { project, loading } = useProject(slug);
  const t = useT();

  if (!loading && !project) return <Navigate to="/projets" replace />;
  if (!project) return null;

  const serviceSlug = CATEGORY_TO_SERVICE[project.category];
  const gallery = project.gallery && project.gallery.length ? project.gallery : [project.image];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: project.description,
    image: project.image,
  };

  return (
    <>
      <Seo
        title={`${project.title} — ${t('projectDetail.seoSuffix')}`}
        description={project.description}
        path={`/projets/${project.slug}`}
        jsonLd={jsonLd}
      />

      <section className="section pd-hero section-hero-bg">
        <HeroBackdrop />
        <div className="container">
          <Reveal style={{ maxWidth: 800 }}>
            <div className="pd-tags">
              {(project.tags || []).map((t) => (
                <span key={t} className="pd-tag-pill">
                  {t}
                </span>
              ))}
            </div>
            <h1 className="pd-title">{project.title}</h1>
            <p className="pd-tagline">{project.tagline}</p>
            {project.link && (
              <a href={project.link} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                {t('projectDetail.visit')} <FaArrowUpRightFromSquare size={13} />
              </a>
            )}
          </Reveal>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <Reveal className="pd-cover">
            <img src={project.image} alt={project.title} loading="eager" />
          </Reveal>

          <div className="pd-grid-2">
            <Reveal direction="right" className="pd-case-card pd-case-problem">
              <div className="pd-case-icon">
                <FaTriangleExclamation size={16} />
              </div>
              <h2>{t('projectDetail.problem')}</h2>
              <p>{project.problem}</p>
            </Reveal>
            <Reveal direction="left" className="pd-case-card pd-case-solution">
              <div className="pd-case-icon">
                <FaLightbulb size={16} />
              </div>
              <h2>{t('projectDetail.solution')}</h2>
              <p>{project.solution}</p>
            </Reveal>
          </div>

          {gallery.length > 0 && (
            <Reveal style={{ marginTop: '3rem' }}>
              <h2 className="section-title" style={{ fontSize: '1.4rem', marginBottom: '1.25rem' }}>
                {t('projectDetail.preview')}
              </h2>
              <div className="pd-gallery">
                {gallery.map((src, i) => (
                  <div className="pd-gallery-item" key={i}>
                    <img src={src} alt={t('projectDetail.previewAlt', { title: project.title, n: i + 1 })} loading="lazy" />
                  </div>
                ))}
              </div>
            </Reveal>
          )}
        </div>
      </section>

      <section className="section cta-animated-bg">
        <div className="container">
          <Reveal className="cta-final">
            <h2>
              <Rich text={t('projectDetail.ctaTitle')} highlightClass="gradient-text" />
            </h2>
            <p>{t('projectDetail.ctaSub')}</p>
            <div className="cta-btns">
              {serviceSlug && (
                <Link to={`/solutions/${serviceSlug}`} className="btn btn-primary">
                  {t('projectDetail.seeService')} <FaArrowRight size={13} />
                </Link>
              )}
              <Link to="/contact" className="btn btn-outline">
                {t('projectDetail.talk')}
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

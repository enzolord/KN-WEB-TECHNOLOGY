import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaWhatsapp, FaChevronLeft, FaChevronRight } from 'react-icons/fa6';
import Seo from '../components/Seo';
import Reveal from '../components/Reveal';
import ProjectCard from '../components/ProjectCard';
import HeroBackdrop from '../components/HeroBackdrop';
import { useProjects } from '../hooks/useContent';
import { projectCategories } from '../data/projects';
import { waLink } from '../data/services';
import { useLanguage } from '../i18n/LanguageContext';
import Rich from '../i18n/Rich';
import './Projets.css';

const PER_PAGE = 6;

export default function Projets() {
  const { data: projects } = useProjects();
  const [filter, setFilter] = useState('all');
  const [page, setPage] = useState(1);
  const { t, has } = useLanguage();

  const filtered = filter === 'all' ? projects : projects.filter((p) => p.category === filter);
  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const pageItems = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  useEffect(() => {
    setPage(1);
  }, [filter]);

  const goToPage = (p) => {
    const next = Math.min(Math.max(p, 1), totalPages);
    setPage(next);
    const grid = document.getElementById('projects-grid');
    if (grid) grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <Seo
        title={t('projects.seoTitle')}
        description={t('projects.seoDesc')}
        path="/projets"
      />

      <section className="section section-hero-bg" style={{ paddingBottom: '1.5rem' }}>
        <HeroBackdrop />
        <div className="container">
          <Reveal style={{ textAlign: 'center', maxWidth: 700, margin: '0 auto' }}>
            <div className="tag center">
              <span className="dot" /> {t('projects.tag')}
            </div>
            <h1 className="section-title center">
              <Rich text={t('projects.title')} />
            </h1>
            <p className="section-sub center">{t('projects.sub')}</p>
          </Reveal>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container container-wide">
          <Reveal className="filter-bar">
            {projectCategories.map((c) => (
              <button
                key={c.id}
                className={`filter-chip ${filter === c.id ? 'is-active' : ''}`}
                onClick={() => setFilter(c.id)}
              >
                {has(`projectCategories.${c.id}`) ? t(`projectCategories.${c.id}`) : c.label}
              </button>
            ))}
          </Reveal>

          {filtered.length === 0 ? (
            <p className="admin-empty">{t('projects.empty')}</p>
          ) : (
            <>
              <div className="projects-grid-2col" id="projects-grid">
                {pageItems.map((p, i) => (
                  <ProjectCard key={p.id} project={p} index={i} fixedSize />
                ))}
              </div>

              {totalPages > 1 && (
                <nav className="projects-pagination" aria-label={t('a11y.pagination')}>
                  <button
                    type="button"
                    className="projects-page-nav"
                    onClick={() => goToPage(page - 1)}
                    disabled={page === 1}
                    aria-label={t('a11y.prevPage')}
                  >
                    <FaChevronLeft size={13} />
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                    <button
                      key={n}
                      type="button"
                      className={`projects-page-num ${n === page ? 'is-active' : ''}`}
                      onClick={() => goToPage(n)}
                      aria-current={n === page ? 'page' : undefined}
                    >
                      {n}
                    </button>
                  ))}
                  <button
                    type="button"
                    className="projects-page-nav"
                    onClick={() => goToPage(page + 1)}
                    disabled={page === totalPages}
                    aria-label={t('a11y.nextPage')}
                  >
                    <FaChevronRight size={13} />
                  </button>
                </nav>
              )}
            </>
          )}
        </div>
      </section>

      <section className="section cta-animated-bg">
        <div className="container">
          <Reveal className="cta-final">
            <h2>
              <Rich text={t('projects.ctaTitle')} highlightClass="gradient-text" />
            </h2>
            <p>{t('projects.ctaSub')}</p>
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

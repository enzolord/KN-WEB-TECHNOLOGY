import { Link } from 'react-router-dom';
import { FaArrowUpRightFromSquare, FaArrowRight } from 'react-icons/fa6';
import Reveal from './Reveal';
import { useT } from '../i18n/LanguageContext';
import './ProjectCard.css';

export default function ProjectCard({ project, index = 0, fixedSize = false }) {
  const t = useT();
  return (
    <Reveal
      as="article"
      className={`project-card card ${fixedSize ? 'project-card-fixed' : ''}`}
      delay={index * 0.08}
    >
      <div className="project-card-media">
        <img src={project.image} alt={project.title} loading="lazy" width="900" height="500" />
        {project.featured && <span className="project-badge">{t('cards.project.featured')}</span>}
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="project-card-link"
            aria-label={t('cards.project.visitSite', { title: project.title })}
          >
            <FaArrowUpRightFromSquare size={16} />
          </a>
        )}
      </div>
      <div className="project-card-body">
        <span className="project-card-tagline">{project.tagline}</span>
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        {project.slug && (
          <Link to={`/projets/${project.slug}`} className="project-card-case-link">
            {t('cards.project.caseStudy')} <FaArrowRight size={12} />
          </Link>
        )}
      </div>
    </Reveal>
  );
}

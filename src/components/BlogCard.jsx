import { Link } from 'react-router-dom';
import { FaArrowRight, FaRegClock, FaRegCalendar } from 'react-icons/fa6';
import { blogCategories } from '../data/blog';
import Reveal from './Reveal';
import { useLanguage } from '../i18n/LanguageContext';
import { formatArticleDate } from '../lib/articleMeta';
import './BlogCard.css';

export default function BlogCard({ article, index = 0 }) {
  const { t, has, lang } = useLanguage();
  const date = formatArticleDate(article.publishedAt, lang);
  const href = `/blog/${article.slug}`;
  const categoryKey = `blogCategories.${article.category}`;
  const category = has(categoryKey) ? t(categoryKey) : blogCategories[article.category] || article.category;

  return (
    <Reveal as="article" className="blog-card card" delay={index * 0.07}>
      <div className="blog-card-media">
        <img src={article.image} alt="" loading="lazy" width="900" height="520" />
        {article.readTime && (
          <span className="blog-card-readtime">
            <FaRegClock size={11} aria-hidden="true" />
            <span className="visually-hidden">{t('cards.blog.readTime', { time: article.readTime })}</span>
            <span aria-hidden="true">{article.readTime}</span>
          </span>
        )}
      </div>

      <div className="blog-card-body">
        {category && <span className="blog-card-cat">{category}</span>}
        {/* Stretched over the whole card in CSS: one link, whole card clickable */}
        <h3>
          <Link to={href} className="blog-card-link">
            {article.title}
          </Link>
        </h3>
        <p>{article.excerpt}</p>

        <div className="blog-card-footer">
          {date && (
            <time className="blog-card-date" dateTime={article.publishedAt}>
              <FaRegCalendar size={11} aria-hidden="true" /> {date}
            </time>
          )}
          <span className="blog-card-cta" aria-hidden="true">
            {t('cards.blog.readMore')} <FaArrowRight size={12} />
          </span>
        </div>
      </div>
    </Reveal>
  );
}

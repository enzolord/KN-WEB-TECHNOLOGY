import { useParams, Link, Navigate } from 'react-router-dom';
import { FaArrowLeft, FaRegClock, FaArrowRight } from 'react-icons/fa6';
import Seo from '../components/Seo';
import Reveal from '../components/Reveal';
import ArticleBody from '../components/ArticleBody';
import BlogCard from '../components/BlogCard';
import { useArticles } from '../hooks/useContent';
import { blogCategories } from '../data/blog';
import { useLanguage } from '../i18n/LanguageContext';
import { formatArticleDate } from '../lib/articleMeta';
import './BlogArticle.css';

export default function BlogArticle() {
  const { slug } = useParams();
  const { data: articles, loading } = useArticles();
  const article = articles.find((a) => a.slug === slug);
  const { t, has, lang } = useLanguage();

  if (!loading && !article) return <Navigate to="/blog" replace />;
  if (!article) return null;

  const related = articles.filter((a) => a.slug !== slug && a.category === article.category).slice(0, 3);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.seoDescription || article.excerpt,
    ...(article.publishedAt && {
      datePublished: new Date(article.publishedAt).toISOString(),
      dateModified: new Date(article.updatedAt || article.publishedAt).toISOString(),
    }),
    author: { '@type': 'Organization', name: 'KN WEB & TECHNOLOGY' },
    image: article.image,
  };

  return (
    <>
      <Seo
        title={article.seoTitle || article.title}
        description={article.seoDescription || article.excerpt}
        path={`/blog/${article.slug}`}
        type="article"
        image={article.image}
        jsonLd={jsonLd}
      />

      <section className="section" style={{ paddingBottom: '1rem' }}>
        <div className="container">
          <Reveal className="article-header">
            <Link to="/blog" className="link-arrow" style={{ justifyContent: 'center', marginBottom: '1.5rem' }}>
              <FaArrowLeft size={12} /> {t('article.back')}
            </Link>
            <div className="tag center">
              <span className="dot" />{' '}
              {has(`blogCategories.${article.category}`)
                ? t(`blogCategories.${article.category}`)
                : blogCategories[article.category] || article.category}
            </div>
            <h1 className="section-title center">{article.title}</h1>
            <div className="article-meta">
              {article.publishedAt && (
                <time dateTime={article.publishedAt}>{formatArticleDate(article.publishedAt, lang)}</time>
              )}
              {article.readTime && (
                <span>
                  <FaRegClock size={12} /> {article.readTime}
                </span>
              )}
            </div>
          </Reveal>

          {article.image && (
            <Reveal delay={0.1} className="article-cover">
              <img src={article.image} alt={article.title} loading="eager" width="900" height="500" />
            </Reveal>
          )}

          <Reveal delay={0.15} lang="fr">
            {t('article.contentNote') && (
              <p className="content-lang-note" lang="en">
                {t('article.contentNote')}
              </p>
            )}
            {/* Long-form content stays in its original language (French) */}
            <ArticleBody article={article} />
          </Reveal>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section section-alt">
          <div className="container article-related">
            <Reveal style={{ marginBottom: '1.5rem' }}>
              <h2 className="section-title" style={{ fontSize: '1.5rem' }}>
                {t('article.related')}
              </h2>
            </Reveal>
            <div className="grid-auto">
              {related.map((a, i) => (
                <BlogCard key={a.slug} article={a} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section">
        <div className="container" style={{ textAlign: 'center' }}>
          <Reveal>
            <h2 className="section-title center" style={{ fontSize: '1.6rem' }}>
              {t('article.ctaTitle')}
            </h2>
            <Link to="/contact" className="btn btn-primary" style={{ marginTop: '1rem' }}>
              {t('article.cta')} <FaArrowRight size={13} />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}

import { useState } from 'react';
import Seo from '../components/Seo';
import Reveal from '../components/Reveal';
import BlogCard from '../components/BlogCard';
import HeroBackdrop from '../components/HeroBackdrop';
import { useArticles } from '../hooks/useContent';
import { blogCategories } from '../data/blog';
import { useLanguage } from '../i18n/LanguageContext';
import Rich from '../i18n/Rich';
import './Blog.css';

export default function Blog() {
  const { data: articles } = useArticles();
  const [filter, setFilter] = useState('all');
  const { t, has } = useLanguage();
  const contentNote = t('blog.contentNote');

  const filtered = filter === 'all' ? articles : articles.filter((a) => a.category === filter);

  return (
    <>
      <Seo
        title={t('blog.seoTitle')}
        description={t('blog.seoDesc')}
        path="/blog"
      />

      <section className="section section-hero-bg" style={{ paddingBottom: '1.5rem' }}>
        <HeroBackdrop />
        <div className="container">
          <Reveal style={{ textAlign: 'center', maxWidth: 700, margin: '0 auto' }}>
            <div className="tag center">
              <span className="dot" /> {t('blog.tag')}
            </div>
            <h1 className="section-title center">
              <Rich text={t('blog.title')} />
            </h1>
            <p className="section-sub center">{t('blog.sub')}</p>
            {contentNote && (
              <p className="content-lang-note" lang="en">
                {contentNote}
              </p>
            )}
          </Reveal>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <Reveal className="filter-bar">
            <button className={`filter-chip ${filter === 'all' ? 'is-active' : ''}`} onClick={() => setFilter('all')}>
              {t('blog.all')}
            </button>
            {Object.entries(blogCategories).map(([key, label]) => (
              <button key={key} className={`filter-chip ${filter === key ? 'is-active' : ''}`} onClick={() => setFilter(key)}>
                {has(`blogCategories.${key}`) ? t(`blogCategories.${key}`) : label}
              </button>
            ))}
          </Reveal>

          {filtered.length === 0 ? (
            <p className="admin-empty">{t('blog.empty')}</p>
          ) : (
            <div className="grid-auto">
              {filtered.map((a, i) => (
                <BlogCard key={a.slug} article={a} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

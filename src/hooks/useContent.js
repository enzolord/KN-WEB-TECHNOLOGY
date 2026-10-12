import { useEffect, useState } from 'react';
import { getSupabase, isSupabaseConfigured } from '../lib/supabaseClient';
import { services as staticServices } from '../data/services';
import { team as staticTeam } from '../data/team';
import { projects as staticProjects } from '../data/projects';
import { articles as staticArticles } from '../data/blog';
import { faqs as staticFaqs } from '../data/faq';
import { partners as staticPartners } from '../data/partners';
import { heroImages as staticHeroImages } from '../data/heroImages';
import { testimonials as staticTestimonials } from '../data/testimonials';
import { resolveReadTime } from '../lib/articleMeta';

/**
 * Generic hook: starts with the local seed data (so the page is never empty,
 * SSR/prerender always has real content, and the site works before Supabase
 * is configured), then swaps in live data from Supabase once it arrives.
 */
function useSupabaseCollection({ table, fallback, mapRow, order, filterRows }) {
  const [data, setData] = useState(fallback);
  const [loading, setLoading] = useState(isSupabaseConfigured);
  const [source, setSource] = useState(isSupabaseConfigured ? 'loading' : 'fallback');

  useEffect(() => {
    if (!isSupabaseConfigured) return;
    let cancelled = false;

    (async () => {
      const supabase = await getSupabase();
      let query = supabase.from(table).select('*');
      if (order) query = query.order(order.column, { ascending: order.ascending ?? true });
      const { data: rows, error } = await query;
      if (cancelled) return;
      if (error) {
        console.warn(`[Supabase] Impossible de charger "${table}", utilisation des données locales.`, error.message);
        setSource('fallback');
        setLoading(false);
        return;
      }
      const usableRows = filterRows ? rows.filter(filterRows) : rows;
      if (usableRows && usableRows.length > 0) {
        setData(mapRow ? usableRows.map(mapRow) : usableRows);
        setSource('supabase');
      } else {
        setSource('fallback');
      }
      setLoading(false);
    })();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [table]);

  return { data, loading, source };
}

export function useServices() {
  return useSupabaseCollection({
    table: 'services',
    fallback: staticServices,
    order: { column: 'sort_order' },
    filterRows: (r) => r.is_active !== false,
    mapRow: (r) => ({
      slug: r.slug,
      number: r.number,
      icon: r.icon,
      title: r.title,
      shortDesc: r.short_desc,
      price: r.price_label,
      priceValue: r.price_value,
      image: r.image_url,
      heroTitle: r.hero_title,
      heroHighlight: r.hero_highlight,
      lead: r.lead,
      h2: r.h2,
      desc: r.description,
      features: r.features || [],
      waMessage: r.wa_message,
      metaDescription: r.meta_description,
    }),
  });
}

export function useTeam() {
  return useSupabaseCollection({
    table: 'team_members',
    fallback: staticTeam,
    order: { column: 'sort_order' },
    filterRows: (r) => r.is_active !== false,
    mapRow: (r) => ({
      id: r.id,
      name: r.name,
      role: r.role,
      desc: r.description,
      image: r.image_url,
      social: r.social || {},
    }),
  });
}

export function useProjects() {
  return useSupabaseCollection({
    table: 'projects',
    fallback: staticProjects,
    order: { column: 'sort_order' },
    filterRows: (r) => r.is_active !== false,
    mapRow: (r) => ({
      id: r.id,
      slug: r.slug,
      title: r.title,
      category: r.category,
      tagline: r.tagline,
      description: r.description,
      image: r.image_url,
      link: r.link,
      featured: r.featured,
      problem: r.problem,
      solution: r.solution,
      tags: r.tags || [],
      gallery: r.gallery && r.gallery.length ? r.gallery : [r.image_url],
    }),
  });
}

export function useProject(slug) {
  const { data: projects, loading } = useProjects();
  const project = projects.find((p) => p.slug === slug);
  return { project, loading };
}

export function useArticles() {
  return useSupabaseCollection({
    table: 'articles',
    fallback: staticArticles.map((a) => ({ ...a, readTime: resolveReadTime(a, a.readTime) })),
    order: { column: 'published_at', ascending: false },
    // Only ever show articles that are marked published AND whose
    // publish date has actually arrived — this is what makes scheduling work.
    filterRows: (r) => r.status === 'published' && (!r.published_at || new Date(r.published_at).getTime() <= Date.now()),
    mapRow: (r) => ({
      id: r.id,
      slug: r.slug,
      title: r.title,
      excerpt: r.excerpt,
      category: r.category,
      // ISO timestamp: formatted per language at display time (articleMeta.js)
      publishedAt: r.published_at,
      updatedAt: r.updated_at,
      // Typed in /admin → used as is; left empty → computed from the content
      readTime: resolveReadTime({ content_md: r.content_md }, r.read_time),
      image: r.image_url,
      content_md: r.content_md,
      seoTitle: r.seo_title,
      seoDescription: r.seo_description,
    }),
  });
}

export function useArticle(slug) {
  const { data: articles, loading } = useArticles();
  const article = articles.find((a) => a.slug === slug);
  return { article, loading };
}

export function useFaqs() {
  return useSupabaseCollection({
    table: 'faqs',
    fallback: staticFaqs,
    order: { column: 'sort_order' },
    filterRows: (r) => r.is_active !== false,
    mapRow: (r) => ({ id: r.id, q: r.question, a: r.answer }),
  });
}

export function usePartners() {
  return useSupabaseCollection({
    table: 'partners',
    fallback: staticPartners,
    order: { column: 'sort_order' },
    filterRows: (r) => r.is_active !== false,
    mapRow: (r) => ({ id: r.id, name: r.name, logo: r.logo_url, link: r.link }),
  });
}

export function useHeroImages() {
  return useSupabaseCollection({
    table: 'hero_images',
    fallback: staticHeroImages,
    order: { column: 'sort_order' },
    filterRows: (r) => r.is_active !== false,
    mapRow: (r) => ({ id: r.id, image: r.image_url, caption: r.caption }),
  });
}

export function useTestimonials() {
  return useSupabaseCollection({
    table: 'testimonials',
    fallback: staticTestimonials,
    order: { column: 'sort_order' },
    filterRows: (r) => r.is_active !== false,
    mapRow: (r) => ({
      id: r.id,
      authorName: r.author_name,
      authorRole: r.author_role,
      photo: r.photo_url,
      message: r.message,
      rating: r.rating ?? 5,
    }),
  });
}

function isWithinWindow(startAt, endAt) {
  const now = Date.now();
  if (startAt && now < new Date(startAt).getTime()) return false;
  if (endAt && now > new Date(endAt).getTime()) return false;
  return true;
}

export function useBanners() {
  const { data } = useSupabaseCollection({
    table: 'banners',
    fallback: [],
    order: { column: 'sort_order' },
    mapRow: (r) => ({
      id: r.id,
      title: r.title,
      subtitle: r.subtitle,
      image: r.image_url,
      link: r.link_url,
      cta: r.cta_label,
      theme: r.theme,
      placement: r.placement,
      isActive: r.is_active,
      startAt: r.starts_at,
      endAt: r.ends_at,
    }),
  });
  // Only ever show banners that are switched on AND currently inside their
  // scheduled display window (this is what makes a promo "temporary").
  return data.filter((b) => b.isActive !== false && isWithinWindow(b.startAt, b.endAt));
}

const DEFAULT_SETTINGS = {
  contact: {
    phone: '+237 672 173 778',
    whatsapp: '237672173778',
    whatsappSecondary: '237640288919',
    email: 'contact@knwebtechnology.com',
    address: 'Édéa, Cameroun',
  },
  social: { facebook: '', instagram: '', linkedin: '', tiktok: '' },
};

export function useSettings() {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);

  useEffect(() => {
    if (!isSupabaseConfigured) return;
    let cancelled = false;
    (async () => {
      const supabase = await getSupabase();
      const { data, error } = await supabase.from('site_settings').select('key,value');
      if (cancelled || error || !data) return;
      const merged = { ...DEFAULT_SETTINGS };
      data.forEach((row) => {
        merged[row.key] = { ...merged[row.key], ...row.value };
      });
      setSettings(merged);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return settings;
}

export function useAnnouncements() {
  const { data } = useSupabaseCollection({
    table: 'announcements',
    fallback: [],
    mapRow: (r) => ({
      id: r.id,
      message: r.message,
      link: r.link_url,
      linkLabel: r.link_label,
      isActive: r.is_active,
      startAt: r.starts_at,
      endAt: r.ends_at,
    }),
  });
  return data.filter((a) => a.isActive !== false && isWithinWindow(a.startAt, a.endAt));
}

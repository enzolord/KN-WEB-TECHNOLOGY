/**
 * Regenerates public/sitemap.xml from whatever content is currently live.
 *
 * Run it after publishing new articles/services from /admin so search
 * engines can discover them:
 *
 *   npm run sitemap
 *
 * It reads the same VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY as the app.
 * If Supabase isn't configured yet, it falls back to the local seed data in
 * src/data/, so the sitemap is never empty.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import 'dotenv/config';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

const BASE_URL = 'https://knwebtechnology.com';

const STATIC_PATHS = [
  { path: '/', priority: '1.0', changefreq: 'daily' },
  { path: '/solutions', priority: '0.9', changefreq: 'weekly' },
  { path: '/agence', priority: '0.7', changefreq: 'monthly' },
  { path: '/projets', priority: '0.8', changefreq: 'weekly' },
  { path: '/comment-nous-travaillons', priority: '0.6', changefreq: 'monthly' },
  { path: '/blog', priority: '0.8', changefreq: 'daily' },
  { path: '/contact', priority: '0.7', changefreq: 'monthly' },
  { path: '/mentions-legales', priority: '0.2', changefreq: 'yearly' },
  { path: '/politique-confidentialite', priority: '0.2', changefreq: 'yearly' },
  { path: '/cgv', priority: '0.2', changefreq: 'yearly' },
];

async function fetchDynamicPaths() {
  const url = process.env.VITE_SUPABASE_URL;
  const key = process.env.VITE_SUPABASE_ANON_KEY;

  if (url && key && !url.includes('xxxxxxxxxxxx')) {
    try {
      const { createClient } = await import('@supabase/supabase-js');
      const supabase = createClient(url, key);

      const [{ data: services }, { data: articles }, { data: projects }] = await Promise.all([
        supabase.from('services').select('slug').eq('is_active', true),
        supabase.from('articles').select('slug,published_at').eq('status', 'published'),
        supabase.from('projects').select('slug').eq('is_active', true),
      ]);

      const now = Date.now();
      return [
        ...(services || []).map((s) => ({ path: `/solutions/${s.slug}`, priority: '0.7', changefreq: 'weekly' })),
        ...(projects || [])
          .filter((p) => p.slug)
          .map((p) => ({ path: `/projets/${p.slug}`, priority: '0.6', changefreq: 'monthly' })),
        ...(articles || [])
          .filter((a) => !a.published_at || new Date(a.published_at).getTime() <= now)
          .map((a) => ({ path: `/blog/${a.slug}`, priority: '0.6', changefreq: 'monthly' })),
      ];
    } catch (err) {
      console.warn('[sitemap] Could not reach Supabase, falling back to local seed data:', err.message);
    }
  }

  // Fallback: local seed data (works even before Supabase is connected)
  const { services } = await import(path.join(root, 'src/data/services.js'));
  const { articles } = await import(path.join(root, 'src/data/blog.js'));
  const { projects } = await import(path.join(root, 'src/data/projects.js'));
  return [
    ...services.map((s) => ({ path: `/solutions/${s.slug}`, priority: '0.7', changefreq: 'weekly' })),
    ...projects
      .filter((p) => p.slug)
      .map((p) => ({ path: `/projets/${p.slug}`, priority: '0.6', changefreq: 'monthly' })),
    ...articles.map((a) => ({ path: `/blog/${a.slug}`, priority: '0.6', changefreq: 'monthly' })),
  ];
}

const dynamicPaths = await fetchDynamicPaths();
const all = [...STATIC_PATHS, ...dynamicPaths];
const today = new Date().toISOString().slice(0, 10);

const body = all
  .map(
    (u) => `  <url>
    <loc>${BASE_URL}${u.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join('\n');

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;

fs.writeFileSync(path.join(root, 'public/sitemap.xml'), xml);
console.log(`✓ sitemap.xml written with ${all.length} URLs`);

/**
 * Rendu SEO à la demande — aucun redéploiement nécessaire.
 *
 * Quand un robot (ou un visiteur) demande /blog/:slug, /solutions/:slug ou
 * /sitemap.xml, ce module lit le contenu LIVE dans Supabase et renvoie :
 *   - le sitemap.xml à jour,
 *   - ou index.html enrichi : <title>, meta description, canonical, Open Graph,
 *     JSON-LD et le texte réel de la page dans <div id="root">.
 * React remplace ensuite ce contenu au chargement : l'expérience visiteur ne
 * change pas, mais les moteurs de recherche voient tout dès la première réponse.
 *
 * Fonctionne avec fetch() uniquement (pas de SDK) → compatible Netlify Edge,
 * Vercel Edge, Cloudflare Workers.
 */

const SITE_URL = 'https://knwebtechnology.com';
const SITE_NAME = 'KN WEB & TECHNOLOGY';
const CACHE = 'public, max-age=0, s-maxage=300, stale-while-revalidate=900';

const STATIC_PATHS = [
  ['/', '1.0', 'daily'],
  ['/solutions', '0.9', 'weekly'],
  ['/agence', '0.7', 'monthly'],
  ['/projets', '0.8', 'weekly'],
  ['/comment-nous-travaillons', '0.6', 'monthly'],
  ['/blog', '0.8', 'daily'],
  ['/contact', '0.7', 'monthly'],
  ['/mentions-legales', '0.2', 'yearly'],
  ['/politique-confidentialite', '0.2', 'yearly'],
  ['/cgv', '0.2', 'yearly'],
];

const esc = (s = '') =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

async function rest(env, query) {
  const res = await fetch(`${env.SUPABASE_URL}/rest/v1/${query}`, {
    headers: { apikey: env.SUPABASE_ANON_KEY, Authorization: `Bearer ${env.SUPABASE_ANON_KEY}` },
  });
  if (!res.ok) throw new Error(`Supabase ${res.status}`);
  return res.json();
}

const isLive = (a) => a.status === 'published' && (!a.published_at || new Date(a.published_at) <= new Date());

// Petit convertisseur Markdown → HTML (titres, listes, gras, italique, liens)
function markdownToHtml(md = '') {
  const inline = (t) =>
    t
      .replace(/<script[\s\S]*?<\/script>/gi, '')
      .replace(/\son\w+="[^"]*"/gi, '')
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/(^|[^*])\*(?!\s)(.+?)\*/g, '$1<em>$2</em>')
      .replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+|\/[^)\s]*)\)/g, '<a href="$2">$1</a>');
  return md
    .split(/\n{2,}/)
    .map((block) => {
      const b = block.trim();
      if (!b) return '';
      const h = b.match(/^(#{1,4})\s+(.*)$/);
      if (h) return `<h${Math.max(2, h[1].length)}>${inline(h[2])}</h${Math.max(2, h[1].length)}>`;
      if (/^[-*]\s+/.test(b)) {
        return `<ul>${b.split('\n').map((l) => `<li>${inline(l.replace(/^[-*]\s+/, ''))}</li>`).join('')}</ul>`;
      }
      return `<p>${inline(b.replace(/\n/g, ' '))}</p>`;
    })
    .join('\n');
}

async function articlePage(env, slug) {
  const rows = await rest(env, `articles?slug=eq.${encodeURIComponent(slug)}&status=eq.published&limit=1`);
  const a = rows[0];
  if (!a || !isLive(a)) return null;
  const title = a.seo_title || a.title;
  const description = a.seo_description || a.excerpt || '';
  return {
    title: `${title} | ${SITE_NAME}`,
    description,
    canonical: `${SITE_URL}/blog/${a.slug}`,
    image: a.image_url ? new URL(a.image_url, SITE_URL).href : `${SITE_URL}/og-image.jpg`,
    type: 'article',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: a.title,
      description,
      datePublished: a.published_at,
      dateModified: a.updated_at || a.published_at,
      author: { '@type': 'Organization', name: SITE_NAME },
      image: a.image_url,
    },
    body: `<article><h1>${esc(a.title)}</h1><p>${esc(a.excerpt || '')}</p>${markdownToHtml(a.content_md)}</article>`,
  };
}

async function servicePage(env, slug) {
  const rows = await rest(env, `services?slug=eq.${encodeURIComponent(slug)}&is_active=eq.true&limit=1`);
  const s = rows[0];
  if (!s) return null;
  const features = Array.isArray(s.features) ? s.features : [];
  return {
    title: `${s.title} | ${SITE_NAME}`,
    description: s.meta_description || s.short_desc || '',
    canonical: `${SITE_URL}/solutions/${s.slug}`,
    image: s.image_url ? new URL(s.image_url, SITE_URL).href : `${SITE_URL}/og-image.jpg`,
    type: 'website',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: s.title,
      description: s.meta_description,
      provider: { '@type': 'LocalBusiness', name: SITE_NAME },
      areaServed: 'Cameroun',
      ...(s.price_value ? { offers: { '@type': 'Offer', price: s.price_value, priceCurrency: 'XAF' } } : {}),
    },
    body: `<main><h1>${esc(s.hero_title || '')}${esc(s.hero_highlight || '')}</h1><p>${esc(s.lead || '')}</p><h2>${esc(s.h2 || s.title)}</h2><p>${esc(s.description || '')}</p><ul>${features.map((f) => `<li>${esc(f)}</li>`).join('')}</ul><p>${esc(s.price_label || '')}</p></main>`,
  };
}

function inject(html, p) {
  // data-rh : react-helmet-async remplace ces balises au lieu de les dupliquer
  const head = [
    `<title data-rh="true">${esc(p.title)}</title>`,
    `<meta data-rh="true" name="description" content="${esc(p.description)}" />`,
    `<link data-rh="true" rel="canonical" href="${esc(p.canonical)}" />`,
    `<meta data-rh="true" property="og:type" content="${p.type}" />`,
    `<meta data-rh="true" property="og:site_name" content="${SITE_NAME}" />`,
    `<meta data-rh="true" property="og:title" content="${esc(p.title)}" />`,
    `<meta data-rh="true" property="og:description" content="${esc(p.description)}" />`,
    `<meta data-rh="true" property="og:url" content="${esc(p.canonical)}" />`,
    `<meta data-rh="true" property="og:image" content="${esc(p.image)}" />`,
    `<meta data-rh="true" name="twitter:card" content="summary_large_image" />`,
    `<meta data-rh="true" name="twitter:title" content="${esc(p.title)}" />`,
    `<meta data-rh="true" name="twitter:description" content="${esc(p.description)}" />`,
    `<meta data-rh="true" name="twitter:image" content="${esc(p.image)}" />`,
    `<script data-rh="true" type="application/ld+json">${JSON.stringify(p.jsonLd).replace(/</g, '\\u003c')}</script>`,
  ].join('\n    ');
  return html
    .replace(/<title>[\s\S]*?<\/title>/i, '')
    .replace(/<meta\s+name="description"[^>]*>/i, '')
    .replace('</head>', `    ${head}\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root">${p.body}</div>`);
}

async function sitemap(env) {
  const [services, articles, projects] = await Promise.all([
    rest(env, 'services?select=slug,updated_at&is_active=eq.true'),
    rest(env, 'articles?select=slug,status,published_at,updated_at&status=eq.published'),
    rest(env, 'projects?select=slug,updated_at&is_active=eq.true'),
  ]);
  const today = new Date().toISOString().slice(0, 10);
  const urls = [
    ...STATIC_PATHS.map(([path, priority, freq]) => ({ path, priority, freq, lastmod: today })),
    ...services.map((s) => ({ path: `/solutions/${s.slug}`, priority: '0.7', freq: 'weekly', lastmod: (s.updated_at || today).slice(0, 10) })),
    ...(projects || []).filter((p) => p.slug).map((p) => ({ path: `/projets/${p.slug}`, priority: '0.6', freq: 'monthly', lastmod: (p.updated_at || today).slice(0, 10) })),
    ...articles.filter(isLive).map((a) => ({ path: `/blog/${a.slug}`, priority: '0.6', freq: 'monthly', lastmod: (a.updated_at || a.published_at || today).slice(0, 10) })),
  ];
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
    .map((u) => `  <url><loc>${SITE_URL}${u.path}</loc><lastmod>${u.lastmod}</lastmod><changefreq>${u.freq}</changefreq><priority>${u.priority}</priority></url>`)
    .join('\n')}\n</urlset>\n`;
}

/**
 * @returns {Promise<Response|null>} null = laisser l'hébergeur servir le SPA normalement
 */
export async function handle(pathname, origin, env) {
  if (!env?.SUPABASE_URL || !env?.SUPABASE_ANON_KEY) return null;
  try {
    if (pathname === '/sitemap.xml') {
      return new Response(await sitemap(env), {
        headers: { 'content-type': 'application/xml; charset=utf-8', 'cache-control': CACHE },
      });
    }
    const m = pathname.match(/^\/(blog|solutions)\/([^/]+)\/?$/);
    if (!m) return null;
    const page = m[1] === 'blog' ? await articlePage(env, decodeURIComponent(m[2])) : await servicePage(env, decodeURIComponent(m[2]));
    if (!page) return null;
    const shell = await (await fetch(new URL('/index.html', origin))).text();
    return new Response(inject(shell, page), {
      headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': CACHE },
    });
  } catch (err) {
    console.error('[seo-edge]', err.message);
    return null; // en cas de souci, le site continue de fonctionner normalement
  }
}

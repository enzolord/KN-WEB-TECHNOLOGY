// Supabase Edge Function — sitemap dynamique pour hébergement classique (Namecheap…)
// Déploiement : supabase functions deploy sitemap --no-verify-jwt
// Puis dans robots.txt : Sitemap: https://<projet>.supabase.co/functions/v1/sitemap
const SITE_URL = 'https://knwebtechnology.com';

Deno.serve(async () => {
  const url = Deno.env.get('SUPABASE_URL')!;
  const key = Deno.env.get('SUPABASE_ANON_KEY')!;
  const get = (q: string) =>
    fetch(`${url}/rest/v1/${q}`, { headers: { apikey: key, Authorization: `Bearer ${key}` } }).then((r) => r.json());

  const [services, articles, projects] = await Promise.all([
    get('services?select=slug&is_active=eq.true'),
    get('articles?select=slug,published_at,updated_at&status=eq.published'),
    get('projects?select=slug&is_active=eq.true'),
  ]);
  const now = Date.now();
  const paths = [
    '/', '/solutions', '/agence', '/projets', '/comment-nous-travaillons', '/blog', '/contact',
    '/mentions-legales', '/politique-confidentialite', '/cgv',
    ...services.map((s: { slug: string }) => `/solutions/${s.slug}`),
    ...(projects || []).filter((p: { slug?: string }) => p.slug).map((p: { slug: string }) => `/projets/${p.slug}`),
    ...articles
      .filter((a: { published_at?: string }) => !a.published_at || new Date(a.published_at).getTime() <= now)
      .map((a: { slug: string }) => `/blog/${a.slug}`),
  ];
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${paths
    .map((p) => `  <url><loc>${SITE_URL}${p}</loc></url>`).join('\n')}\n</urlset>`;
  return new Response(xml, { headers: { 'content-type': 'application/xml; charset=utf-8', 'cache-control': 'public, max-age=300' } });
});

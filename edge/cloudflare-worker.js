// Cloudflare Worker — à placer devant N'IMPORTE QUEL hébergement (Namecheap inclus).
// Variables à définir dans Cloudflare : SUPABASE_URL, SUPABASE_ANON_KEY.
// Routes : knwebtechnology.com/blog/*, /solutions/*, /sitemap.xml
import { handle } from './core.js';

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    return (await handle(url.pathname, url.origin, env)) || fetch(request);
  },
};

import { handle } from '../../edge/core.js';

export default async (request, context) => {
  const url = new URL(request.url);
  const env = {
    SUPABASE_URL: Deno.env.get('SUPABASE_URL'),
    SUPABASE_ANON_KEY: Deno.env.get('SUPABASE_ANON_KEY'),
  };
  return (await handle(url.pathname, url.origin, env)) || context.next();
};

export const config = { path: ['/blog/*', '/solutions/*', '/sitemap.xml'] };

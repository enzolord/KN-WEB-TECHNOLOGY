// Vercel Edge Function — voir vercel.json (rewrites vers /api/seo?path=…)
import { handle } from '../edge/core.js';

export const config = { runtime: 'edge' };

export default async function handler(request) {
  const url = new URL(request.url);
  const path = url.searchParams.get('path') || '/';
  const env = { SUPABASE_URL: process.env.SUPABASE_URL, SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY };
  const res = await handle(path, url.origin, env);
  if (res) return res;
  // Repli : le SPA classique
  return fetch(new URL('/index.html', url.origin));
}

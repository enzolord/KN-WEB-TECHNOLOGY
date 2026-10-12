const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(url && anonKey && !url.includes('xxxxxxxxxxxx'));

// The Supabase SDK (~55 KB gzip) is loaded on demand, and only when the
// project is actually configured. Without Supabase, the public site never
// downloads it and runs on the local fallback content in `src/data`.
let clientPromise = null;

export function getSupabase() {
  if (!isSupabaseConfigured) return Promise.resolve(null);
  if (!clientPromise) {
    clientPromise = import('@supabase/supabase-js').then(({ createClient }) =>
      createClient(url, anonKey, { auth: { persistSession: true, autoRefreshToken: true } })
    );
  }
  return clientPromise;
}

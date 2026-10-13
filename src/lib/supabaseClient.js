const url = (import.meta.env.VITE_SUPABASE_URL || '').trim();
const anonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY || '').trim();

/**
 * Checks the Supabase URL before using it. A wrong URL (typically the site's
 * domain typed instead of the project ID, e.g. https://knwebtechnology.supabase.co)
 * does not exist on the internet: every request fails with
 * ERR_NAME_NOT_RESOLVED and the admin login cannot work.
 * The real URL is in Supabase → Project Settings → API → "Project URL" and
 * looks like https://abcdefghijklmnopqrst.supabase.co (20-letter project ID).
 */
function checkConfig() {
  if (!url || !anonKey || url.includes('xxxxxxxxxxxx')) return 'missing';
  let host;
  try {
    const u = new URL(url);
    if (u.protocol !== 'https:' && u.hostname !== 'localhost' && u.hostname !== '127.0.0.1') {
      return `VITE_SUPABASE_URL doit commencer par https:// (valeur actuelle : ${url}).`;
    }
    host = u.hostname;
  } catch {
    return `VITE_SUPABASE_URL n'est pas une adresse valide (valeur actuelle : ${url}).`;
  }
  const m = host.match(/^([^.]+)\.supabase\.co$/);
  if (m && !/^[a-z0-9]{20}$/.test(m[1])) {
    return (
      `VITE_SUPABASE_URL pointe vers « ${host} », qui n'existe pas. ` +
      "L'identifiant avant .supabase.co doit être celui du projet (20 caractères, ex. abcdefghijklmnopqrst), " +
      'pas le nom du site. Copiez la valeur exacte depuis Supabase → Project Settings → API → Project URL.'
    );
  }
  return null;
}

const configProblem = checkConfig();

/** Human-readable reason when Supabase is set but unusable (null otherwise). */
export const supabaseConfigError = configProblem && configProblem !== 'missing' ? configProblem : null;

// With a wrong URL we behave as "not configured": the public site keeps
// working on its local content instead of firing requests that can't succeed.
export const isSupabaseConfigured = configProblem === null;

if (supabaseConfigError && typeof console !== 'undefined') {
  console.error(`[Supabase] Configuration invalide — ${supabaseConfigError}`);
}

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

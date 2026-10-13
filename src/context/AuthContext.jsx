import { createContext, useContext, useEffect, useRef, useState, useCallback } from 'react';
import { getSupabase, isSupabaseConfigured } from '../lib/supabaseClient';

const AuthContext = createContext({
  session: null,
  user: null,
  loading: true,
  configured: false,
  signIn: async () => ({ error: 'not-configured' }),
  signOut: async () => {},
  ensureInit: () => {},
});

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [ready, setReady] = useState(false);
  const initRef = useRef(false);

  // Idempotent: loads the Supabase auth client + current session. Called
  // automatically on /admin routes (Login, ProtectedRoute) or when a stored
  // session exists, so public visitors never pay for the auth machinery.
  const ensureInit = useCallback(() => {
    if (!isSupabaseConfigured || initRef.current) return;
    initRef.current = true;
    getSupabase().then(async (supabase) => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
      setReady(true);
      supabase.auth.onAuthStateChange((_event, newSession) => setSession(newSession));
    });
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const hasStoredSession = Object.keys(window.localStorage).some(
      (k) => k.startsWith('sb-') && k.endsWith('-auth-token')
    );
    if (window.location.pathname.startsWith('/admin') || hasStoredSession) ensureInit();
  }, [ensureInit]);

  const signIn = useCallback(async (email, password) => {
    if (!isSupabaseConfigured) {
      return { error: "Supabase n'est pas encore configuré (voir .env)." };
    }
    const supabase = await getSupabase();
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (!error) return { error: null };
      // Network failure (wrong Supabase URL, offline, blocked…) rather than bad credentials
      if (error.name === 'AuthRetryableFetchError' || /fetch|network/i.test(error.message || '')) {
        return {
          error:
            "Impossible de joindre Supabase. Vérifiez votre connexion internet et l'adresse VITE_SUPABASE_URL " +
            '(Supabase → Project Settings → API → Project URL).',
        };
      }
      const MESSAGES = {
        invalid_credentials: 'Email ou mot de passe incorrect.',
        email_not_confirmed:
          "Cet email n'est pas confirmé. Dans Supabase → Authentication → Users, confirmez l'utilisateur (ou recréez-le avec « Auto Confirm User »).",
        email_provider_disabled:
          'La connexion par email est désactivée dans Supabase. Activez-la : Authentication → Sign In / Providers → Email (laissez seulement « Allow new users to sign up » désactivé).',
        user_banned: 'Ce compte est bloqué dans Supabase (Authentication → Users).',
        validation_failed: "L'email ou le mot de passe n'a pas un format valide.",
        over_request_rate_limit: 'Trop de tentatives. Patientez quelques minutes avant de réessayer.',
      };
      if (MESSAGES[error.code]) return { error: MESSAGES[error.code] };
      if (/invalid login credentials/i.test(error.message || '')) return { error: MESSAGES.invalid_credentials };
      if (/email logins are disabled/i.test(error.message || '')) return { error: MESSAGES.email_provider_disabled };
      if (/email not confirmed/i.test(error.message || '')) return { error: MESSAGES.email_not_confirmed };
      return { error: `${error.message}${error.code ? ` (code : ${error.code})` : ''}` };
    } catch {
      return { error: "Impossible de joindre Supabase. Vérifiez votre connexion internet et l'adresse VITE_SUPABASE_URL." };
    }
  }, []);

  const signOut = useCallback(async () => {
    if (!isSupabaseConfigured) return;
    const supabase = await getSupabase();
    await supabase.auth.signOut();
  }, []);

  const value = {
    session,
    user: session?.user || null,
    loading: isSupabaseConfigured && !ready,
    configured: isSupabaseConfigured,
    signIn,
    signOut,
    ensureInit,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}

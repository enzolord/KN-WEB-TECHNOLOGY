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
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error: error?.message || null };
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

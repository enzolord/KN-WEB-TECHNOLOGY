import { createContext, useContext, useEffect, useState, useCallback } from 'react';

const DEFAULT_THEME = 'light';

const ThemeContext = createContext({ theme: DEFAULT_THEME, toggleTheme: () => {}, setTheme: () => {} });

// Light is the default for every visitor. Only an explicit click on the
// toggle is remembered (new key: the old "kn-theme" was written on every
// visit, so it can't tell a real choice from the former dark default).
const STORAGE_KEY = 'kn-theme-choice';

function getInitialTheme() {
  if (typeof window === 'undefined') return DEFAULT_THEME;
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === 'light' || stored === 'dark') return stored;
  } catch (e) {
    /* ignore (private mode, SSR, etc.) */
  }
  return DEFAULT_THEME;
}

function remember(theme) {
  try {
    window.localStorage.setItem(STORAGE_KEY, theme);
  } catch (e) {
    /* ignore */
  }
}

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    // Browser UI colour (mobile address bar) follows the site theme
    document.querySelectorAll('meta[name="theme-color"]').forEach((m) =>
      m.setAttribute('content', theme === 'dark' ? '#05050f' : '#fbfbfe')
    );
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setThemeState((t) => {
      const next = t === 'dark' ? 'light' : 'dark';
      remember(next);
      return next;
    });
  }, []);

  const setTheme = useCallback((t) => {
    remember(t);
    setThemeState(t);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}

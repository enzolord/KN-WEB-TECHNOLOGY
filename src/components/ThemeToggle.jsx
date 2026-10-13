import { FaMoon, FaSun } from 'react-icons/fa6';
import { useTheme } from '../context/ThemeContext';
import { useT } from '../i18n/LanguageContext';
import './ThemeToggle.css';

export default function ThemeToggle({ className = '', compact = false }) {
  const { theme, toggleTheme } = useTheme();
  const t = useT();
  const isDark = theme === 'dark';

  // Compact: a single round icon button (used in the mobile header)
  if (compact) {
    return (
      <button
        type="button"
        className={`theme-toggle-compact ${className}`}
        onClick={toggleTheme}
        aria-label={isDark ? t('a11y.themeToLight') : t('a11y.themeToDark')}
        aria-pressed={!isDark}
      >
        {isDark ? <FaSun size={15} /> : <FaMoon size={14} />}
      </button>
    );
  }

  return (
    <button
      type="button"
      className={`theme-toggle ${className}`}
      onClick={toggleTheme}
      aria-label={isDark ? t('a11y.themeToLight') : t('a11y.themeToDark')}
      aria-pressed={!isDark}
    >
      <span className={`theme-toggle-track ${isDark ? '' : 'is-light'}`}>
        <span className="theme-toggle-thumb">
          {isDark ? <FaMoon size={11} /> : <FaSun size={11} />}
        </span>
      </span>
    </button>
  );
}

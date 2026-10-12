import { FaMoon, FaSun } from 'react-icons/fa6';
import { useTheme } from '../context/ThemeContext';
import { useT } from '../i18n/LanguageContext';
import './ThemeToggle.css';

export default function ThemeToggle({ className = '' }) {
  const { theme, toggleTheme } = useTheme();
  const t = useT();
  const isDark = theme === 'dark';

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

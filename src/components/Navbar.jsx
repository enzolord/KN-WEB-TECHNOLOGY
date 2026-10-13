import { useEffect, useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaXmark, FaChevronDown, FaArrowRight } from 'react-icons/fa6';
import { mainNav } from '../data/nav';
import { useServices } from '../hooks/useContent';
import { ServiceIcon } from './IconMap';
import ThemeToggle from './ThemeToggle';
import LanguageSwitcher from './LanguageSwitcher';
import { useT } from '../i18n/LanguageContext';
import logoIcon from '../assets/images/logo/logo-icon-64.webp';
import './Navbar.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileSolutionsOpen, setMobileSolutionsOpen] = useState(false);
  const { data: services } = useServices();
  const location = useLocation();
  const t = useT();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setMegaOpen(false);
    setMobileSolutionsOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  return (
    <header className={`navbar ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="container navbar-inner">
        <Link to="/" className="brand" aria-label={t('a11y.homeLink')}>
          <img src={logoIcon} alt="" width="40" height="40" className="brand-icon" />
          <span className="brand-text">
            <span className="brand-name">KN WEB</span>
            <span className="brand-name">&amp; TECHNOLOGY</span>
          </span>
        </Link>

        <nav className="nav-desktop" aria-label={t('a11y.mainNav')}>
          {mainNav.map((item) =>
            item.megaMenu ? (
              <div
                key={item.path}
                className="nav-item-mega"
                onMouseEnter={() => setMegaOpen(true)}
                onMouseLeave={() => setMegaOpen(false)}
              >
                <button
                  className={`nav-link ${location.pathname.startsWith('/solutions') ? 'is-active' : ''}`}
                  onClick={() => setMegaOpen((v) => !v)}
                  aria-expanded={megaOpen}
                >
                  {t(`nav.${item.key}`)} <FaChevronDown size={10} />
                </button>
                <AnimatePresence>
                  {megaOpen && (
                    <motion.div
                      className="mega-panel"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 12 }}
                      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <div className="mega-grid">
                        {services.map((s) => (
                          <Link key={s.slug} to={`/solutions/${s.slug}`} className="mega-item">
                            <span className="mega-icon">
                              <ServiceIcon name={s.icon} size={16} />
                            </span>
                            <span>
                              <strong>{s.title}</strong>
                              <small>{s.price}</small>
                            </span>
                          </Link>
                        ))}
                      </div>
                      <Link to="/solutions" className="mega-footer link-arrow">
                        {t('nav.allSolutions')} <FaArrowRight size={12} />
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => `nav-link ${isActive ? 'is-active' : ''}`}
              >
                {t(`nav.${item.key}`)}
              </NavLink>
            )
          )}
        </nav>

        <div className="navbar-actions">
          <LanguageSwitcher className="hide-mobile" />
          <ThemeToggle className="hide-mobile" />
          <Link to="/contact" className="btn btn-primary btn-sm hide-mobile">
            {t('nav.freeQuote')}
          </Link>
          {/* Mobile: the language switch stays visible next to the burger; the theme toggle is in the menu */}
          <div className="navbar-mobile-quick">
            <LanguageSwitcher />
          </div>
          <button
            className="mobile-toggle"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? t('a11y.closeMenu') : t('a11y.openMenu')}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <FaXmark size={20} /> : <FaBars size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="mobile-panel"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="container mobile-panel-inner">
              {mainNav.map((item) =>
                item.megaMenu ? (
                  <div key={item.path} className="mobile-solutions-group">
                    <button
                      type="button"
                      className={`mobile-link mobile-solutions-trigger ${mobileSolutionsOpen ? 'is-open' : ''}`}
                      onClick={() => setMobileSolutionsOpen((v) => !v)}
                      aria-expanded={mobileSolutionsOpen}
                    >
                      {t(`nav.${item.key}`)}
                      <FaChevronDown size={12} className="mobile-solutions-chevron" />
                    </button>
                    <AnimatePresence initial={false}>
                      {mobileSolutionsOpen && (
                        <motion.div
                          className="mobile-services"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                        >
                          {services.map((s) => (
                            <Link key={s.slug} to={`/solutions/${s.slug}`} className="mobile-service-link">
                              <ServiceIcon name={s.icon} size={13} /> {s.title}
                            </Link>
                          ))}
                          <Link to="/solutions" className="mobile-service-link mobile-service-all">
                            {t('nav.allSolutionsShort')} <FaArrowRight size={11} />
                          </Link>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <NavLink key={item.path} to={item.path} className="mobile-link">
                    {t(`nav.${item.key}`)}
                  </NavLink>
                )
              )}
              <div className="mobile-panel-footer">
                <ThemeToggle />
                <Link to="/contact" className="btn btn-primary btn-block">
                  {t('nav.freeQuote')}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

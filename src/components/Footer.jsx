import { Link } from 'react-router-dom';
import { FaLocationDot, FaPhone, FaEnvelope, FaArrowUp } from 'react-icons/fa6';
import { footerLinks } from '../data/nav';
import { useSettings } from '../hooks/useContent';
import { SocialIcon } from './IconMap';
import { useT } from '../i18n/LanguageContext';
import logoIcon from '../assets/images/logo/logo-icon-64.webp';
import './Footer.css';

const SOCIAL_ORDER = ['instagram', 'linkedin', 'facebook', 'tiktok'];

export default function Footer() {
  const settings = useSettings();
  const t = useT();
  const year = new Date().getFullYear();
  const social = settings.social || {};

  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand-col">
          <Link to="/" className="brand" aria-label={t('a11y.homeLink')}>
            <img src={logoIcon} alt="" width="40" height="40" />
            <span className="brand-text">
              <span className="brand-name">KN WEB</span>
              <span className="brand-name">TECHNOLOGY</span>
            </span>
          </Link>
          <p className="footer-desc">{t('footer.desc')}</p>
        </div>

        <div className="footer-col">
          <h4>{t('footer.solutions')}</h4>
          <ul>
            {footerLinks.solutions.map((l) => (
              <li key={l.path}>
                <Link to={l.path}>{t(`footer.solutionLinks.${l.path.split('/').pop()}`)}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-col">
          <h4>{t('footer.company')}</h4>
          <ul>
            {footerLinks.entreprise.map((l) => (
              <li key={l.path}>
                <Link to={l.path}>{t(`footer.links.${l.key}`)}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-col footer-contact-col">
          <h4>{t('footer.contact')}</h4>
          <ul className="footer-contact-list">
            <li>
              <FaLocationDot size={14} /> {settings.contact.address}
            </li>
            <li>
              <FaPhone size={14} />{' '}
              <a href={`tel:${settings.contact.phone.replace(/\s/g, '')}`}>{settings.contact.phone}</a>
            </li>
            <li>
              <FaEnvelope size={14} /> <a href={`mailto:${settings.contact.email}`}>{settings.contact.email}</a>
            </li>
          </ul>
          <div className="footer-social" aria-label={t('a11y.socialNetworks')}>
            {SOCIAL_ORDER.map((name) => (
              <a
                key={name}
                href={social[name] || '#'}
                target={social[name] ? '_blank' : undefined}
                rel="noopener noreferrer"
                aria-label={name}
                className="footer-social-link"
              >
                <SocialIcon name={name} size={15} />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="container footer-bottom">
        <p>
          © {year} KN WEB &amp; TECHNOLOGY. {t('footer.rights')}
        </p>
        <div className="footer-legal-links">
          {footerLinks.legal.map((l) => (
            <Link key={l.path} to={l.path}>
              {t(`footer.links.${l.key}`)}
            </Link>
          ))}
        </div>
        <button className="back-to-top" onClick={scrollTop} aria-label={t('a11y.backToTopShort')}>
          <FaArrowUp size={13} />
        </button>
      </div>
    </footer>
  );
}

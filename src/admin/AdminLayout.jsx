import { useState } from 'react';
import { NavLink, Outlet, Link, useNavigate } from 'react-router-dom';
import {
  FaGauge,
  FaNewspaper,
  FaLayerGroup,
  FaUsers,
  FaBriefcase,
  FaBullhorn,
  FaCircleQuestion,
  FaEnvelopeOpenText,
  FaGear,
  FaArrowRightFromBracket,
  FaBars,
  FaArrowUpRightFromSquare,
  FaTag,
  FaHandshake,
  FaImages,
  FaQuoteLeft,
} from 'react-icons/fa6';
import { useAuth } from '../context/AuthContext';
import ThemeToggle from '../components/ThemeToggle';
import logoIcon from '../assets/images/logo/logo-icon-64.webp';
import './admin.css';

const NAV = [
  { to: '/admin', label: 'Tableau de bord', icon: FaGauge, end: true },
  { to: '/admin/blog', label: 'Blog & actualités', icon: FaNewspaper },
  { to: '/admin/services', label: 'Services', icon: FaLayerGroup },
  { to: '/admin/projects', label: 'Projets', icon: FaBriefcase },
  { to: '/admin/team', label: 'Équipe', icon: FaUsers },
  { to: '/admin/partners', label: 'Partenaires', icon: FaHandshake },
  { to: '/admin/hero-images', label: 'Carrousel accueil', icon: FaImages },
  { to: '/admin/testimonials', label: 'Témoignages', icon: FaQuoteLeft },
  { to: '/admin/banners', label: 'Bannières promo', icon: FaTag },
  { to: '/admin/announcements', label: 'Annonces', icon: FaBullhorn },
  { to: '/admin/faq', label: 'FAQ', icon: FaCircleQuestion },
  { to: '/admin/messages', label: 'Messages', icon: FaEnvelopeOpenText },
  { to: '/admin/settings', label: 'Réglages', icon: FaGear },
];

export default function AdminLayout() {
  const { signOut, user } = useAuth();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const logout = async () => {
    await signOut();
    navigate('/admin/login');
  };

  return (
    <div className="admin-shell" data-theme-scope="admin">
      <aside className={`admin-sidebar ${open ? 'is-open' : ''}`}>
        <div className="admin-brand">
          <img src={logoIcon} alt="" />
          <span>KN Admin</span>
        </div>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) => `admin-nav-link ${isActive ? 'is-active' : ''}`}
              onClick={() => setOpen(false)}
            >
              <item.icon size={15} /> {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="admin-nav-foot">
          <Link to="/" target="_blank" className="admin-view-site">
            <FaArrowUpRightFromSquare size={12} /> Voir le site
          </Link>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-faint)' }}>{user?.email}</span>
          <button className="btn btn-outline btn-sm" onClick={logout}>
            <FaArrowRightFromBracket size={13} /> Déconnexion
          </button>
        </div>
      </aside>

      <div className="admin-main">
        <header className="admin-topbar">
          <button className="admin-mobile-toggle" onClick={() => setOpen((v) => !v)} aria-label="Menu">
            <FaBars />
          </button>
          <h1>Espace de gestion</h1>
          <ThemeToggle />
        </header>
        <div className="admin-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

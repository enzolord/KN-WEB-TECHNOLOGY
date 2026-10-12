import { useEffect, useState } from 'react';
import { Navigate, useLocation, useNavigate, Link } from 'react-router-dom';
import { FaTriangleExclamation } from 'react-icons/fa6';
import { useAuth } from '../context/AuthContext';
import logoIcon from '../assets/images/logo/logo-icon-64.webp';
import './admin.css';

export default function Login() {
  const { signIn, user, configured, ensureInit } = useAuth();
  useEffect(() => {
    ensureInit();
  }, [ensureInit]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  if (!configured) return <Navigate to="/admin/setup" replace />;
  if (user) return <Navigate to={location.state?.from || '/admin'} replace />;

  const onSubmit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError('');
    const { error: err } = await signIn(email, password);
    setBusy(false);
    if (err) setError(err);
    else navigate(location.state?.from || '/admin');
  };

  return (
    <div className="admin-auth-screen">
      <div className="admin-auth-card">
        <div className="admin-auth-logo">
          <img src={logoIcon} alt="" />
          <span>KN WEB &amp; TECHNOLOGY</span>
        </div>
        <h2 style={{ marginBottom: '0.3rem' }}>Espace de gestion</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
          Connectez-vous pour gérer le contenu du site.
        </p>

        {error && (
          <div className="form-status error">
            <FaTriangleExclamation size={14} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="username"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Mot de passe</label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </div>
          <button type="submit" className="btn btn-primary btn-block" disabled={busy}>
            {busy ? 'Connexion…' : 'Se connecter'}
          </button>
        </form>
        <p style={{ marginTop: '1.5rem', fontSize: '0.82rem', textAlign: 'center' }}>
          <Link to="/" className="link-arrow" style={{ justifyContent: 'center' }}>
            ← Retour au site
          </Link>
        </p>
      </div>
    </div>
  );
}

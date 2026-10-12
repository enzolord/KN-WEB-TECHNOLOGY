import { Link } from 'react-router-dom';
import './admin.css';

export default function Setup() {
  return (
    <div className="admin-auth-screen">
      <div className="admin-auth-card admin-setup-card">
        <h2 style={{ marginBottom: '0.5rem' }}>Connectez Supabase</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1rem' }}>
          Le tableau de bord a besoin d'un projet Supabase pour stocker le contenu (blog, services,
          équipe, bannières…). En attendant, le site public fonctionne déjà avec son contenu par
          défaut.
        </p>
        <ol style={{ paddingLeft: '1.1rem', color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.8 }}>
          <li>
            Créez un projet gratuit sur <strong>supabase.com</strong>
          </li>
          <li>
            Ouvrez <strong>SQL Editor</strong> et exécutez le fichier <code>supabase/schema.sql</code>{' '}
            puis <code>supabase/seed.sql</code> fournis avec le projet
          </li>
          <li>
            Créez un bucket de stockage public nommé <code>media</code> (Storage → New bucket)
          </li>
          <li>
            Créez votre compte admin dans <strong>Authentication → Users → Add user</strong>
          </li>
          <li>
            Copiez <code>.env.example</code> vers <code>.env</code> et renseignez :
          </li>
        </ol>
        <pre>{`VITE_SUPABASE_URL=https://xxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOi...`}</pre>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          Redémarrez ensuite <code>npm run dev</code>. Le détail complet est dans le README.md.
        </p>
        <p style={{ marginTop: '1.5rem', fontSize: '0.82rem', textAlign: 'center' }}>
          <Link to="/" className="link-arrow" style={{ justifyContent: 'center' }}>
            ← Retour au site
          </Link>
        </p>
      </div>
    </div>
  );
}

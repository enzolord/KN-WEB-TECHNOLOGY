import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaNewspaper,
  FaLayerGroup,
  FaUsers,
  FaEnvelopeOpenText,
  FaTag,
  FaBriefcase,
} from 'react-icons/fa6';
import { getSupabase } from '../lib/supabaseClient';

const CARDS = [
  { key: 'articles', label: 'Articles publiés', icon: FaNewspaper, to: '/admin/blog' },
  { key: 'services', label: 'Services actifs', icon: FaLayerGroup, to: '/admin/services' },
  { key: 'projects', label: 'Projets', icon: FaBriefcase, to: '/admin/projects' },
  { key: 'team_members', label: "Membres d'équipe", icon: FaUsers, to: '/admin/team' },
  { key: 'banners', label: 'Bannières actives', icon: FaTag, to: '/admin/banners' },
  { key: 'contact_messages', label: 'Messages reçus', icon: FaEnvelopeOpenText, to: '/admin/messages' },
];

export default function Dashboard() {
  const [counts, setCounts] = useState({});
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    (async () => {
      const supabase = await getSupabase();
      const results = await Promise.all(
        CARDS.map(async (c) => {
          const { count } = await supabase.from(c.key).select('*', { count: 'exact', head: true });
          return [c.key, count ?? 0];
        })
      );
      setCounts(Object.fromEntries(results));

      const { data } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);
      setMessages(data || []);
    })();
  }, []);

  return (
    <div>
      <div className="admin-stats-grid">
        {CARDS.map((c) => (
          <Link to={c.to} key={c.key} className="admin-stat-card" style={{ display: 'block' }}>
            <c.icon size={18} style={{ color: 'var(--primary)', marginBottom: '0.6rem' }} />
            <div className="stat-num">{counts[c.key] ?? '—'}</div>
            <div className="stat-label">{c.label}</div>
          </Link>
        ))}
      </div>

      <div className="admin-panel">
        <div className="admin-panel-head">
          <h2>Derniers messages reçus</h2>
          <Link to="/admin/messages" className="link-arrow">
            Tout voir
          </Link>
        </div>
        {messages.length === 0 ? (
          <p className="admin-empty">Aucun message pour le moment.</p>
        ) : (
          <div className="admin-messages-list">
            {messages.map((m) => (
              <div key={m.id} className="admin-message-item">
                <div className="admin-message-head">
                  <strong>{m.name}</strong>
                  <span>{new Date(m.created_at).toLocaleDateString('fr-FR')}</span>
                </div>
                <p style={{ fontSize: '0.88rem' }}>{m.message}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="admin-panel">
        <h2 style={{ marginBottom: '0.75rem' }}>Bienvenue 👋</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem' }}>
          Depuis cet espace, vous pouvez publier des articles de blog (pour le référencement),
          ajouter/modifier vos services, gérer votre équipe et vos projets, créer des bannières de
          promotion avec une date de début/fin, diffuser des annonces, et consulter les messages reçus
          depuis le site.
        </p>
      </div>
    </div>
  );
}

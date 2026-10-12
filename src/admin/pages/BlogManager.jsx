import { Link } from 'react-router-dom';
import { FaPlus, FaPenToSquare, FaTrash, FaEye } from 'react-icons/fa6';
import { useAdminCollection } from '../useAdminCollection';
import { blogCategories } from '../../data/blog';

function statusOf(row) {
  if (row.status !== 'published') return { label: 'Brouillon', cls: 'off' };
  if (row.published_at && new Date(row.published_at).getTime() > Date.now()) return { label: 'Programmé', cls: 'warn' };
  return { label: 'Publié', cls: 'ok' };
}

export default function BlogManager() {
  const { rows, loading, remove } = useAdminCollection('articles', { orderBy: 'created_at', ascending: false });

  const onDelete = async (row) => {
    if (!window.confirm(`Supprimer l'article « ${row.title} » ?`)) return;
    await remove(row.id);
  };

  return (
    <div className="admin-panel">
      <div className="admin-panel-head">
        <h2>Blog &amp; actualités ({rows.length})</h2>
        <Link to="/admin/blog/new" className="btn btn-primary btn-sm">
          <FaPlus size={12} /> Nouvel article
        </Link>
      </div>
      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
        Publiez régulièrement des actualités et articles pour améliorer votre référencement Google.
        Un article peut être <strong>programmé</strong> pour une publication future.
      </p>

      {loading ? (
        <p className="admin-empty">Chargement…</p>
      ) : rows.length === 0 ? (
        <p className="admin-empty">Aucun article pour le moment.</p>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th></th>
                <th>Titre</th>
                <th>Catégorie</th>
                <th>Date</th>
                <th>Statut</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => {
                const st = statusOf(row);
                return (
                  <tr key={row.id}>
                    <td>{row.image_url && <img src={row.image_url} className="admin-table-thumb" alt="" />}</td>
                    <td style={{ maxWidth: 320 }}>
                      <strong>{row.title}</strong>
                    </td>
                    <td>{blogCategories[row.category] || row.category}</td>
                    <td style={{ fontSize: '0.8rem' }}>
                      {row.published_at ? new Date(row.published_at).toLocaleDateString('fr-FR') : '—'}
                    </td>
                    <td>
                      <span className={`admin-badge ${st.cls}`}>{st.label}</span>
                    </td>
                    <td>
                      <div className="admin-row-actions">
                        {row.status === 'published' && (
                          <a className="admin-icon-btn" href={`/blog/${row.slug}`} target="_blank" rel="noreferrer" aria-label="Voir">
                            <FaEye size={13} />
                          </a>
                        )}
                        <Link className="admin-icon-btn" to={`/admin/blog/${row.id}`} aria-label="Modifier">
                          <FaPenToSquare size={13} />
                        </Link>
                        <button className="admin-icon-btn danger" onClick={() => onDelete(row)} aria-label="Supprimer">
                          <FaTrash size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

import { FaTrash, FaEnvelopeOpen, FaEnvelope, FaWhatsapp } from 'react-icons/fa6';
import { useAdminCollection } from '../useAdminCollection';

export default function MessagesInbox() {
  const { rows, loading, update, remove } = useAdminCollection('contact_messages', {
    orderBy: 'created_at',
    ascending: false,
  });

  const toggleRead = (row) => update(row.id, { is_read: !row.is_read });
  const onDelete = (row) => {
    if (window.confirm('Supprimer ce message ?')) remove(row.id);
  };

  return (
    <div className="admin-panel">
      <div className="admin-panel-head">
        <h2>Messages reçus ({rows.length})</h2>
      </div>
      {loading ? (
        <p className="admin-empty">Chargement…</p>
      ) : rows.length === 0 ? (
        <p className="admin-empty">Aucun message pour le moment.</p>
      ) : (
        <div className="admin-messages-list">
          {rows.map((m) => (
            <div key={m.id} className={`admin-message-item ${!m.is_read ? 'is-unread' : ''}`}>
              <div className="admin-message-head">
                <strong>
                  {m.name} {m.subject ? `— ${m.subject}` : ''}
                </strong>
                <span>{new Date(m.created_at).toLocaleString('fr-FR')}</span>
              </div>
              <p style={{ fontSize: '0.9rem', marginBottom: '0.6rem' }}>{m.message}</p>
              <div style={{ display: 'flex', gap: '1rem', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                {m.email && <span>✉️ {m.email}</span>}
                {m.phone && <span>📞 {m.phone}</span>}
              </div>
              <div className="admin-row-actions" style={{ justifyContent: 'flex-start' }}>
                {m.phone && (
                  <a
                    className="admin-icon-btn"
                    href={`https://wa.me/${m.phone.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Répondre sur WhatsApp"
                  >
                    <FaWhatsapp size={13} />
                  </a>
                )}
                <button className="admin-icon-btn" onClick={() => toggleRead(m)} aria-label="Marquer lu/non lu">
                  {m.is_read ? <FaEnvelope size={13} /> : <FaEnvelopeOpen size={13} />}
                </button>
                <button className="admin-icon-btn danger" onClick={() => onDelete(m)} aria-label="Supprimer">
                  <FaTrash size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

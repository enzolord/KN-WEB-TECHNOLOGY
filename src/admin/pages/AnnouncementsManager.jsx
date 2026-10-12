import { useState } from 'react';
import { FaPlus, FaPenToSquare, FaTrash } from 'react-icons/fa6';
import { useAdminCollection } from '../useAdminCollection';
import Modal from '../components/Modal';

const emptyForm = { message: '', link_url: '', link_label: '', starts_at: '', ends_at: '', is_active: true };

function toLocalInput(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function statusOf(row) {
  const now = Date.now();
  if (!row.is_active) return { label: 'Désactivée', cls: 'off' };
  if (row.starts_at && now < new Date(row.starts_at).getTime()) return { label: 'Programmée', cls: 'warn' };
  if (row.ends_at && now > new Date(row.ends_at).getTime()) return { label: 'Expirée', cls: 'off' };
  return { label: 'En ligne', cls: 'ok' };
}

export default function AnnouncementsManager() {
  const { rows, loading, create, update, remove } = useAdminCollection('announcements', {
    orderBy: 'created_at',
    ascending: false,
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setModalOpen(true);
  };
  const openEdit = (row) => {
    setEditing(row);
    setForm({ ...emptyForm, ...row, starts_at: toLocalInput(row.starts_at), ends_at: toLocalInput(row.ends_at) });
    setModalOpen(true);
  };
  const setField = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        ...form,
        starts_at: form.starts_at ? new Date(form.starts_at).toISOString() : null,
        ends_at: form.ends_at ? new Date(form.ends_at).toISOString() : null,
      };
      if (editing) await update(editing.id, payload);
      else await create(payload);
      setModalOpen(false);
    } finally {
      setSaving(false);
    }
  };

  const onDelete = async (row) => {
    if (!window.confirm('Supprimer cette annonce ?')) return;
    await remove(row.id);
  };

  return (
    <div>
      <div className="admin-panel">
        <div className="admin-panel-head">
          <h2>Annonces ({rows.length})</h2>
          <button className="btn btn-primary btn-sm" onClick={openCreate}>
            <FaPlus size={12} /> Nouvelle annonce
          </button>
        </div>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
          Le bandeau fin s'affiche tout en haut de chaque page, au-dessus du menu. Une seule annonce
          active à la fois est affichée.
        </p>
        {loading ? (
          <p className="admin-empty">Chargement…</p>
        ) : rows.length === 0 ? (
          <p className="admin-empty">Aucune annonce pour le moment.</p>
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Message</th>
                  <th>Période</th>
                  <th>Statut</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => {
                  const st = statusOf(row);
                  return (
                    <tr key={row.id}>
                      <td>{row.message}</td>
                      <td style={{ fontSize: '0.78rem' }}>
                        {row.starts_at ? new Date(row.starts_at).toLocaleDateString('fr-FR') : '—'} →{' '}
                        {row.ends_at ? new Date(row.ends_at).toLocaleDateString('fr-FR') : '—'}
                      </td>
                      <td>
                        <span className={`admin-badge ${st.cls}`}>{st.label}</span>
                      </td>
                      <td>
                        <div className="admin-row-actions">
                          <button className="admin-icon-btn" onClick={() => openEdit(row)}>
                            <FaPenToSquare size={13} />
                          </button>
                          <button className="admin-icon-btn danger" onClick={() => onDelete(row)}>
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

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? "Modifier l'annonce" : 'Nouvelle annonce'}>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label>Message *</label>
            <input required value={form.message} onChange={(e) => setField('message', e.target.value)} placeholder="🎉 Devis gratuit toute la semaine !" />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Lien (optionnel)</label>
              <input value={form.link_url} onChange={(e) => setField('link_url', e.target.value)} placeholder="/contact" />
            </div>
            <div className="form-group">
              <label>Texte du lien</label>
              <input value={form.link_label} onChange={(e) => setField('link_label', e.target.value)} placeholder="En profiter" />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Début</label>
              <input type="datetime-local" value={form.starts_at} onChange={(e) => setField('starts_at', e.target.value)} />
            </div>
            <div className="form-group">
              <label>Fin</label>
              <input type="datetime-local" value={form.ends_at} onChange={(e) => setField('ends_at', e.target.value)} />
            </div>
          </div>
          <div className="admin-checkbox-row">
            <input type="checkbox" id="ann-active" checked={form.is_active} onChange={(e) => setField('is_active', e.target.checked)} />
            <label htmlFor="ann-active">Annonce active</label>
          </div>
          <div className="admin-modal-foot" style={{ padding: 0, border: 'none', marginTop: 0 }}>
            <button type="button" className="btn btn-outline" onClick={() => setModalOpen(false)}>
              Annuler
            </button>
            <button type="submit" className="btn btn-primary" disabled={saving}>
              {saving ? 'Enregistrement…' : 'Enregistrer'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

import { useState } from 'react';
import { FaPlus, FaPenToSquare, FaTrash, FaArrowUp, FaArrowDown, FaStar } from 'react-icons/fa6';
import { useAdminCollection } from '../useAdminCollection';
import Modal from '../components/Modal';
import ImageUploadField from '../components/ImageUploadField';

const emptyForm = { author_name: '', author_role: '', photo_url: '', message: '', rating: 5, is_active: true };

export default function TestimonialsManager() {
  const { rows, loading, create, update, remove, moveUp, moveDown } = useAdminCollection('testimonials');
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
    setForm({ ...emptyForm, ...row });
    setModalOpen(true);
  };
  const setField = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editing) await update(editing.id, form);
      else await create({ ...form, sort_order: rows.length + 1 });
      setModalOpen(false);
    } finally {
      setSaving(false);
    }
  };

  const onDelete = async (row) => {
    if (!window.confirm(`Supprimer le témoignage de "${row.author_name}" ?`)) return;
    await remove(row.id);
  };

  return (
    <div>
      <div className="admin-panel">
        <div className="admin-panel-head">
          <h2>Témoignages clients ({rows.length})</h2>
          <button className="btn btn-primary btn-sm" onClick={openCreate}>
            <FaPlus size={12} /> Ajouter un témoignage
          </button>
        </div>
        <p className="admin-empty" style={{ marginBottom: '1rem' }}>
          Ces cartes défilent dans la section "Avis clients" de la page d'accueil. Les témoignages marqués
          "Exemple à remplacer" sont des exemples de démonstration — remplacez-les par de vrais retours dès
          que possible.
        </p>
        {loading ? (
          <p className="admin-empty">Chargement…</p>
        ) : rows.length === 0 ? (
          <p className="admin-empty">Aucun témoignage pour le moment.</p>
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th></th>
                  <th>Client</th>
                  <th>Note</th>
                  <th>Statut</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr key={row.id}>
                    <td>{row.photo_url && <img src={row.photo_url} className="admin-table-thumb" alt="" />}</td>
                    <td>
                      <strong>{row.author_name}</strong>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-faint)' }}>{row.author_role}</div>
                    </td>
                    <td>
                      {row.rating || 5} <FaStar size={11} style={{ color: 'var(--gold)' }} />
                    </td>
                    <td>
                      <span className={`admin-badge ${row.is_active ? 'ok' : 'off'}`}>
                        {row.is_active ? 'Visible' : 'Masqué'}
                      </span>
                    </td>
                    <td>
                      <div className="admin-row-actions">
                        <button className="admin-icon-btn" onClick={() => moveUp(row.id)} disabled={i === 0}>
                          <FaArrowUp size={12} />
                        </button>
                        <button
                          className="admin-icon-btn"
                          onClick={() => moveDown(row.id)}
                          disabled={i === rows.length - 1}
                        >
                          <FaArrowDown size={12} />
                        </button>
                        <button className="admin-icon-btn" onClick={() => openEdit(row)}>
                          <FaPenToSquare size={13} />
                        </button>
                        <button className="admin-icon-btn danger" onClick={() => onDelete(row)}>
                          <FaTrash size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Modifier le témoignage' : 'Nouveau témoignage'}>
        <form onSubmit={onSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Nom du client *</label>
              <input required value={form.author_name} onChange={(e) => setField('author_name', e.target.value)} />
            </div>
            <div className="form-group">
              <label>Rôle / entreprise</label>
              <input
                value={form.author_role}
                onChange={(e) => setField('author_role', e.target.value)}
                placeholder="Gérant — Entreprise à Douala"
              />
            </div>
          </div>
          <ImageUploadField label="Photo" value={form.photo_url} onChange={(v) => setField('photo_url', v)} folder="testimonials" />
          <div className="form-group">
            <label>Message *</label>
            <textarea required rows={4} value={form.message} onChange={(e) => setField('message', e.target.value)} />
          </div>
          <div className="form-group">
            <label>Note (1 à 5)</label>
            <input
              type="number"
              min="1"
              max="5"
              value={form.rating}
              onChange={(e) => setField('rating', Number(e.target.value))}
            />
          </div>
          <div className="admin-checkbox-row">
            <input
              type="checkbox"
              id="testimonial-active"
              checked={form.is_active}
              onChange={(e) => setField('is_active', e.target.checked)}
            />
            <label htmlFor="testimonial-active">Visible sur le site</label>
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

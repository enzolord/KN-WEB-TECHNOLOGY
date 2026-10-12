import { useState } from 'react';
import { FaPlus, FaPenToSquare, FaTrash, FaArrowUp, FaArrowDown } from 'react-icons/fa6';
import { useAdminCollection } from '../useAdminCollection';
import Modal from '../components/Modal';
import ImageUploadField from '../components/ImageUploadField';

const emptyForm = { image_url: '', caption: '', is_active: true };

export default function HeroImagesManager() {
  const { rows, loading, create, update, remove, moveUp, moveDown } = useAdminCollection('hero_images');
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
    if (!window.confirm('Retirer cette image du carrousel ?')) return;
    await remove(row.id);
  };

  return (
    <div>
      <div className="admin-panel">
        <div className="admin-panel-head">
          <h2>Carrousel de la page d'accueil ({rows.length})</h2>
          <button className="btn btn-primary btn-sm" onClick={openCreate}>
            <FaPlus size={12} /> Ajouter une image
          </button>
        </div>
        <p className="admin-empty" style={{ marginBottom: '1rem' }}>
          Ces images défilent dans le cadre à droite du titre, sur la page d'accueil.
        </p>
        {loading ? (
          <p className="admin-empty">Chargement…</p>
        ) : rows.length === 0 ? (
          <p className="admin-empty">Aucune image pour le moment.</p>
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th></th>
                  <th>Légende</th>
                  <th>Statut</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr key={row.id}>
                    <td>{row.image_url && <img src={row.image_url} className="admin-table-thumb" alt="" />}</td>
                    <td>{row.caption || <span style={{ color: 'var(--text-faint)' }}>—</span>}</td>
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

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? "Modifier l'image" : 'Nouvelle image'}>
        <form onSubmit={onSubmit}>
          <ImageUploadField label="Image" value={form.image_url} onChange={(v) => setField('image_url', v)} folder="hero" />
          <div className="form-group">
            <label>Légende (optionnel, usage interne)</label>
            <input value={form.caption} onChange={(e) => setField('caption', e.target.value)} />
          </div>
          <div className="admin-checkbox-row">
            <input
              type="checkbox"
              id="hero-active"
              checked={form.is_active}
              onChange={(e) => setField('is_active', e.target.checked)}
            />
            <label htmlFor="hero-active">Visible sur le site</label>
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

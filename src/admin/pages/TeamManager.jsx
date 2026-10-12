import { useState } from 'react';
import { FaPlus, FaPenToSquare, FaTrash, FaArrowUp, FaArrowDown } from 'react-icons/fa6';
import { useAdminCollection } from '../useAdminCollection';
import Modal from '../components/Modal';
import ImageUploadField from '../components/ImageUploadField';

const SOCIAL_FIELDS = ['whatsapp', 'linkedin', 'github', 'instagram', 'behance', 'dribbble'];

const emptyForm = {
  name: '',
  role: '',
  description: '',
  image_url: '',
  is_active: true,
  social: {},
};

export default function TeamManager() {
  const { rows, loading, create, update, remove, moveUp, moveDown } = useAdminCollection('team_members');
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
    setForm({ ...emptyForm, ...row, social: row.social || {} });
    setModalOpen(true);
  };

  const setField = (key, val) => setForm((f) => ({ ...f, [key]: val }));
  const setSocial = (key, val) => setForm((f) => ({ ...f, social: { ...f.social, [key]: val } }));

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
    if (!window.confirm(`Retirer ${row.name} de l'équipe ?`)) return;
    await remove(row.id);
  };

  return (
    <div>
      <div className="admin-panel">
        <div className="admin-panel-head">
          <h2>Équipe ({rows.length})</h2>
          <button className="btn btn-primary btn-sm" onClick={openCreate}>
            <FaPlus size={12} /> Ajouter un membre
          </button>
        </div>
        {loading ? (
          <p className="admin-empty">Chargement…</p>
        ) : rows.length === 0 ? (
          <p className="admin-empty">Aucun membre pour le moment.</p>
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th></th>
                  <th>Nom</th>
                  <th>Rôle</th>
                  <th>Statut</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr key={row.id}>
                    <td>{row.image_url && <img src={row.image_url} className="admin-table-thumb" alt="" />}</td>
                    <td>
                      <strong>{row.name}</strong>
                    </td>
                    <td>{row.role}</td>
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
                        <button className="admin-icon-btn" onClick={() => moveDown(row.id)} disabled={i === rows.length - 1}>
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

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Modifier le membre' : 'Nouveau membre'}>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label>Nom complet *</label>
            <input required value={form.name} onChange={(e) => setField('name', e.target.value)} />
          </div>
          <div className="form-group">
            <label>Rôle *</label>
            <input required value={form.role} onChange={(e) => setField('role', e.target.value)} placeholder="Fondateur & Consultant en transformation digitale" />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea value={form.description} onChange={(e) => setField('description', e.target.value)} />
          </div>
          <ImageUploadField label="Photo" value={form.image_url} onChange={(v) => setField('image_url', v)} folder="team" />

          <div className="form-group">
            <label>Réseaux (optionnel)</label>
            {SOCIAL_FIELDS.map((key) => (
              <input
                key={key}
                value={form.social[key] || ''}
                onChange={(e) => setSocial(key, e.target.value)}
                placeholder={`Lien ${key}`}
                style={{ marginBottom: '0.5rem' }}
              />
            ))}
          </div>

          <div className="admin-checkbox-row">
            <input type="checkbox" id="team-active" checked={form.is_active} onChange={(e) => setField('is_active', e.target.checked)} />
            <label htmlFor="team-active">Visible sur le site</label>
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

import { useState } from 'react';
import { FaPlus, FaPenToSquare, FaTrash, FaArrowUp, FaArrowDown } from 'react-icons/fa6';
import { useAdminCollection } from '../useAdminCollection';
import Modal from '../components/Modal';

const emptyForm = { question: '', answer: '', is_active: true };

export default function FaqManager() {
  const { rows, loading, create, update, remove, moveUp, moveDown } = useAdminCollection('faqs');
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
    if (!window.confirm('Supprimer cette question ?')) return;
    await remove(row.id);
  };

  return (
    <div>
      <div className="admin-panel">
        <div className="admin-panel-head">
          <h2>Questions fréquentes ({rows.length})</h2>
          <button className="btn btn-primary btn-sm" onClick={openCreate}>
            <FaPlus size={12} /> Nouvelle question
          </button>
        </div>
        {loading ? (
          <p className="admin-empty">Chargement…</p>
        ) : rows.length === 0 ? (
          <p className="admin-empty">Aucune question pour le moment.</p>
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Question</th>
                  <th>Statut</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr key={row.id}>
                    <td style={{ maxWidth: 480 }}>{row.question}</td>
                    <td>
                      <span className={`admin-badge ${row.is_active ? 'ok' : 'off'}`}>
                        {row.is_active ? 'Visible' : 'Masquée'}
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

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Modifier la question' : 'Nouvelle question'}>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label>Question *</label>
            <input required value={form.question} onChange={(e) => setField('question', e.target.value)} />
          </div>
          <div className="form-group">
            <label>Réponse *</label>
            <textarea required value={form.answer} onChange={(e) => setField('answer', e.target.value)} style={{ minHeight: 120 }} />
          </div>
          <div className="admin-checkbox-row">
            <input type="checkbox" id="faq-active" checked={form.is_active} onChange={(e) => setField('is_active', e.target.checked)} />
            <label htmlFor="faq-active">Visible sur le site</label>
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

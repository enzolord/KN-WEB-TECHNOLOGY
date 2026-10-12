import { useState } from 'react';
import { FaPlus, FaPenToSquare, FaTrash } from 'react-icons/fa6';
import { useAdminCollection } from '../useAdminCollection';
import Modal from '../components/Modal';
import ImageUploadField from '../components/ImageUploadField';

const PLACEMENTS = [
  { id: 'home_top', label: 'Haut de la page d’accueil' },
  { id: 'global_top', label: 'Toutes les pages (bandeau haut)' },
  { id: 'solutions_top', label: 'Page Solutions' },
];

const THEMES = [
  { id: 'brand', label: 'Dégradé de marque' },
  { id: 'gold', label: 'Doré (promo)' },
  { id: 'dark', label: 'Sombre' },
];

const emptyForm = {
  title: '',
  subtitle: '',
  image_url: '',
  link_url: '',
  cta_label: 'En savoir plus',
  theme: 'brand',
  placement: 'home_top',
  starts_at: '',
  ends_at: '',
  is_active: true,
};

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

export default function BannersManager() {
  const { rows, loading, create, update, remove } = useAdminCollection('banners', {
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
      else await create({ ...payload, sort_order: rows.length + 1 });
      setModalOpen(false);
    } finally {
      setSaving(false);
    }
  };

  const onDelete = async (row) => {
    if (!window.confirm(`Supprimer la bannière « ${row.title} » ?`)) return;
    await remove(row.id);
  };

  return (
    <div>
      <div className="admin-panel">
        <div className="admin-panel-head">
          <h2>Bannières promotionnelles ({rows.length})</h2>
          <button className="btn btn-primary btn-sm" onClick={openCreate}>
            <FaPlus size={12} /> Nouvelle bannière
          </button>
        </div>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
          Une bannière ne s'affiche sur le site que si elle est <strong>active</strong> et que la date du
          jour se trouve entre son <strong>début</strong> et sa <strong>fin</strong>.
        </p>
        {loading ? (
          <p className="admin-empty">Chargement…</p>
        ) : rows.length === 0 ? (
          <p className="admin-empty">Aucune bannière pour le moment.</p>
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Bannière</th>
                  <th>Emplacement</th>
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
                      <td>
                        <strong>{row.title}</strong>
                        {row.subtitle && <div style={{ fontSize: '0.78rem', color: 'var(--text-faint)' }}>{row.subtitle}</div>}
                      </td>
                      <td>{PLACEMENTS.find((p) => p.id === row.placement)?.label || row.placement}</td>
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

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Modifier la bannière' : 'Nouvelle bannière'}>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label>Titre *</label>
            <input required value={form.title} onChange={(e) => setField('title', e.target.value)} placeholder="-20% sur les sites vitrines" />
          </div>
          <div className="form-group">
            <label>Sous-titre</label>
            <input value={form.subtitle} onChange={(e) => setField('subtitle', e.target.value)} placeholder="Offre valable jusqu'au 31 décembre" />
          </div>
          <ImageUploadField label="Image (optionnel)" value={form.image_url} onChange={(v) => setField('image_url', v)} folder="banners" />

          <div className="form-row">
            <div className="form-group">
              <label>Lien (bouton)</label>
              <input value={form.link_url} onChange={(e) => setField('link_url', e.target.value)} placeholder="/contact" />
            </div>
            <div className="form-group">
              <label>Texte du bouton</label>
              <input value={form.cta_label} onChange={(e) => setField('cta_label', e.target.value)} />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Emplacement</label>
              <select value={form.placement} onChange={(e) => setField('placement', e.target.value)}>
                {PLACEMENTS.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Style</label>
              <select value={form.theme} onChange={(e) => setField('theme', e.target.value)}>
                {THEMES.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Début d'affichage</label>
              <input type="datetime-local" value={form.starts_at} onChange={(e) => setField('starts_at', e.target.value)} />
            </div>
            <div className="form-group">
              <label>Fin d'affichage</label>
              <input type="datetime-local" value={form.ends_at} onChange={(e) => setField('ends_at', e.target.value)} />
            </div>
          </div>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-faint)', marginTop: '-0.6rem', marginBottom: '1rem' }}>
            Laissez vide pour une diffusion sans date de début et/ou sans date de fin.
          </p>

          <div className="admin-checkbox-row">
            <input type="checkbox" id="banner-active" checked={form.is_active} onChange={(e) => setField('is_active', e.target.checked)} />
            <label htmlFor="banner-active">Bannière active</label>
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

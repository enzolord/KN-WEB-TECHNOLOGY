import { useState } from 'react';
import { FaPlus, FaPenToSquare, FaTrash, FaArrowUp, FaArrowDown, FaXmark } from 'react-icons/fa6';
import { useAdminCollection } from '../useAdminCollection';
import Modal from '../components/Modal';
import ImageUploadField from '../components/ImageUploadField';
import { projectCategories } from '../../data/projects';

const slugify = (str) =>
  (str || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

const emptyForm = {
  title: '',
  slug: '',
  category: 'web',
  tagline: '',
  description: '',
  image_url: '',
  link: '',
  featured: false,
  is_active: true,
  problem: '',
  solution: '',
  tags: [],
  gallery: [],
};

export default function ProjectsManager() {
  const { rows, loading, create, update, remove, moveUp, moveDown } = useAdminCollection('projects');
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setTagInput('');
    setModalOpen(true);
  };
  const openEdit = (row) => {
    setEditing(row);
    setForm({ ...emptyForm, ...row, tags: row.tags || [], gallery: row.gallery || [] });
    setModalOpen(true);
  };
  const setField = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  const [tagInput, setTagInput] = useState('');
  const addTag = () => {
    const v = tagInput.trim();
    if (!v || form.tags.includes(v)) return;
    setField('tags', [...form.tags, v]);
    setTagInput('');
  };
  const removeTag = (t) => setField('tags', form.tags.filter((x) => x !== t));

  const addGalleryImage = (url) => setField('gallery', [...form.gallery, url]);
  const removeGalleryImage = (i) => setField('gallery', form.gallery.filter((_, idx) => idx !== i));

  const onSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = { ...form, slug: form.slug.trim() || slugify(form.title) };
      if (editing) await update(editing.id, payload);
      else await create({ ...payload, sort_order: rows.length + 1 });
      setModalOpen(false);
    } finally {
      setSaving(false);
    }
  };

  const onDelete = async (row) => {
    if (!window.confirm(`Supprimer le projet « ${row.title} » ?`)) return;
    await remove(row.id);
  };

  return (
    <div>
      <div className="admin-panel">
        <div className="admin-panel-head">
          <h2>Projets ({rows.length})</h2>
          <button className="btn btn-primary btn-sm" onClick={openCreate}>
            <FaPlus size={12} /> Nouveau projet
          </button>
        </div>
        {loading ? (
          <p className="admin-empty">Chargement…</p>
        ) : rows.length === 0 ? (
          <p className="admin-empty">Aucun projet pour le moment.</p>
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th></th>
                  <th>Projet</th>
                  <th>Catégorie</th>
                  <th>Statut</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr key={row.id}>
                    <td>{row.image_url && <img src={row.image_url} className="admin-table-thumb" alt="" />}</td>
                    <td>
                      <strong>{row.title}</strong>
                      {row.featured && <span className="admin-badge warn" style={{ marginLeft: '0.5rem' }}>★ Coup de cœur</span>}
                    </td>
                    <td>{row.category}</td>
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

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Modifier le projet' : 'Nouveau projet'}>
        <form onSubmit={onSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Titre *</label>
              <input
                required
                value={form.title}
                onChange={(e) => {
                  const title = e.target.value;
                  setForm((f) => ({
                    ...f,
                    title,
                    slug: !editing || f.slug === slugify(f.title) ? slugify(title) : f.slug,
                  }));
                }}
              />
            </div>
            <div className="form-group">
              <label>Slug (URL de la page projet)</label>
              <input value={form.slug} onChange={(e) => setField('slug', slugify(e.target.value))} placeholder="empire-longrich" />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Catégorie</label>
              <select value={form.category} onChange={(e) => setField('category', e.target.value)}>
                {projectCategories.filter((c) => c.id !== 'all').map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Sous-titre</label>
              <input value={form.tagline} onChange={(e) => setField('tagline', e.target.value)} placeholder="Mode · E-commerce" />
            </div>
          </div>
          <div className="form-group">
            <label>Description (résumé court, affiché sur la carte projet)</label>
            <textarea value={form.description} onChange={(e) => setField('description', e.target.value)} />
          </div>
          <div className="form-group">
            <label>Le problème (page étude de cas)</label>
            <textarea rows={3} value={form.problem} onChange={(e) => setField('problem', e.target.value)} />
          </div>
          <div className="form-group">
            <label>La solution (page étude de cas)</label>
            <textarea rows={3} value={form.solution} onChange={(e) => setField('solution', e.target.value)} />
          </div>

          <div className="form-group">
            <label>Tags</label>
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.6rem' }}>
              <input
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addTag();
                  }
                }}
                placeholder="Ex: E-commerce"
              />
              <button type="button" className="btn btn-outline btn-sm" onClick={addTag}>
                Ajouter
              </button>
            </div>
            {form.tags.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {form.tags.map((t) => (
                  <span key={t} className="admin-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                    {t}
                    <button
                      type="button"
                      onClick={() => removeTag(t)}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex' }}
                      aria-label={`Retirer ${t}`}
                    >
                      <FaXmark size={10} />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="form-group">
            <label>Lien du site</label>
            <input value={form.link} onChange={(e) => setField('link', e.target.value)} placeholder="https://…" />
          </div>
          <ImageUploadField
            label="Image principale (carte projet + couverture)"
            value={form.image_url}
            onChange={(v) => setField('image_url', v)}
            folder="projects"
          />

          <div className="form-group">
            <label>Galerie (photos supplémentaires pour la page étude de cas)</label>
            {form.gallery.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.6rem' }}>
                {form.gallery.map((url, i) => (
                  <div key={i} style={{ position: 'relative' }}>
                    <img src={url} alt="" className="admin-table-thumb" style={{ width: 64, height: 64 }} />
                    <button
                      type="button"
                      className="admin-icon-btn danger"
                      onClick={() => removeGalleryImage(i)}
                      style={{ position: 'absolute', top: -8, right: -8, width: 22, height: 22, padding: 0 }}
                      aria-label="Retirer cette photo"
                    >
                      <FaXmark size={10} />
                    </button>
                  </div>
                ))}
              </div>
            )}
            <ImageUploadField value="" onChange={addGalleryImage} folder="projects" />
          </div>

          <div className="admin-checkbox-row">
            <input type="checkbox" id="proj-featured" checked={form.featured} onChange={(e) => setField('featured', e.target.checked)} />
            <label htmlFor="proj-featured">Mettre en avant (coup de cœur)</label>
          </div>
          <div className="admin-checkbox-row">
            <input type="checkbox" id="proj-active" checked={form.is_active} onChange={(e) => setField('is_active', e.target.checked)} />
            <label htmlFor="proj-active">Visible sur le site</label>
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

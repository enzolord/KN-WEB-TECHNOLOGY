import { useState } from 'react';
import { FaPlus, FaPenToSquare, FaTrash, FaArrowUp, FaArrowDown } from 'react-icons/fa6';
import { useAdminCollection } from '../useAdminCollection';
import Modal from '../components/Modal';
import ImageUploadField from '../components/ImageUploadField';
import { ServiceIcon } from '../../components/IconMap';

const ICON_OPTIONS = ['globe', 'whatsapp', 'cart', 'chart', 'palette', 'robot', 'cloud', 'wrench', 'code', 'audit'];

const emptyForm = {
  slug: '',
  number: '',
  icon: 'globe',
  title: '',
  short_desc: '',
  price_label: '',
  price_value: '',
  image_url: '',
  hero_title: '',
  hero_highlight: '',
  lead: '',
  h2: '',
  description: '',
  features: [''],
  wa_message: '',
  meta_description: '',
  is_active: true,
};

function slugify(s) {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export default function ServicesManager() {
  const { rows, loading, error, create, update, remove, moveUp, moveDown } = useAdminCollection('services');
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState('');

  const openCreate = () => {
    setEditing(null);
    setForm({ ...emptyForm, number: String(rows.length + 1).padStart(2, '0'), features: [''] });
    setModalOpen(true);
  };

  const openEdit = (row) => {
    setEditing(row);
    setForm({ ...emptyForm, ...row, features: row.features?.length ? row.features : [''] });
    setModalOpen(true);
  };

  const setField = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  const setFeature = (i, val) => {
    setForm((f) => {
      const next = [...f.features];
      next[i] = val;
      return { ...f, features: next };
    });
  };
  const addFeature = () => setForm((f) => ({ ...f, features: [...f.features, ''] }));
  const removeFeature = (i) => setForm((f) => ({ ...f, features: f.features.filter((_, idx) => idx !== i) }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setFormError('');
    try {
      const payload = {
        ...form,
        slug: form.slug ? slugify(form.slug) : slugify(form.title),
        price_value: form.price_value === '' ? null : Number(form.price_value),
        features: form.features.filter((f) => f.trim() !== ''),
      };
      if (editing) await update(editing.id, payload);
      else await create({ ...payload, sort_order: rows.length + 1 });
      setModalOpen(false);
    } catch (err) {
      setFormError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const onDelete = async (row) => {
    if (!window.confirm(`Supprimer le service « ${row.title} » ?`)) return;
    await remove(row.id);
  };

  return (
    <div>
      <div className="admin-panel">
        <div className="admin-panel-head">
          <h2>Services ({rows.length})</h2>
          <div className="admin-panel-actions">
            <button className="btn btn-primary btn-sm" onClick={openCreate}>
              <FaPlus size={12} /> Nouveau service
            </button>
          </div>
        </div>

        {error && <p style={{ color: '#ef4444', fontSize: '0.85rem' }}>{error}</p>}
        {loading ? (
          <p className="admin-empty">Chargement…</p>
        ) : rows.length === 0 ? (
          <p className="admin-empty">Aucun service pour le moment.</p>
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th></th>
                  <th>Service</th>
                  <th>Prix</th>
                  <th>Statut</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr key={row.id}>
                    <td>
                      <span className="icon-badge" style={{ width: 36, height: 36 }}>
                        <ServiceIcon name={row.icon} size={16} />
                      </span>
                    </td>
                    <td>
                      <strong>{row.title}</strong>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-faint)' }}>/{row.slug}</div>
                    </td>
                    <td>{row.price_label}</td>
                    <td>
                      <span className={`admin-badge ${row.is_active ? 'ok' : 'off'}`}>
                        {row.is_active ? 'Actif' : 'Masqué'}
                      </span>
                    </td>
                    <td>
                      <div className="admin-row-actions">
                        <button className="admin-icon-btn" onClick={() => moveUp(row.id)} disabled={i === 0} aria-label="Monter">
                          <FaArrowUp size={12} />
                        </button>
                        <button
                          className="admin-icon-btn"
                          onClick={() => moveDown(row.id)}
                          disabled={i === rows.length - 1}
                          aria-label="Descendre"
                        >
                          <FaArrowDown size={12} />
                        </button>
                        <button className="admin-icon-btn" onClick={() => openEdit(row)} aria-label="Modifier">
                          <FaPenToSquare size={13} />
                        </button>
                        <button className="admin-icon-btn danger" onClick={() => onDelete(row)} aria-label="Supprimer">
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

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Modifier le service' : 'Nouveau service'}>
        <form onSubmit={onSubmit}>
          {formError && <div className="form-status error">{formError}</div>}

          <div className="form-row">
            <div className="form-group">
              <label>Titre *</label>
              <input required value={form.title} onChange={(e) => setField('title', e.target.value)} />
            </div>
            <div className="form-group">
              <label>Slug (URL)</label>
              <input
                value={form.slug}
                onChange={(e) => setField('slug', e.target.value)}
                placeholder="auto si vide"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Icône</label>
              <select value={form.icon} onChange={(e) => setField('icon', e.target.value)}>
                {ICON_OPTIONS.map((i) => (
                  <option key={i} value={i}>
                    {i}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Numéro affiché</label>
              <input value={form.number} onChange={(e) => setField('number', e.target.value)} placeholder="01" />
            </div>
          </div>

          <div className="form-group">
            <label>Description courte (carte)</label>
            <textarea value={form.short_desc} onChange={(e) => setField('short_desc', e.target.value)} />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Prix affiché</label>
              <input value={form.price_label} onChange={(e) => setField('price_label', e.target.value)} placeholder="À partir de 75 000 FCFA" />
            </div>
            <div className="form-group">
              <label>Prix (valeur numérique, optionnel)</label>
              <input type="number" value={form.price_value} onChange={(e) => setField('price_value', e.target.value)} />
            </div>
          </div>

          <ImageUploadField label="Image du service" value={form.image_url} onChange={(v) => setField('image_url', v)} folder="services" />

          <hr className="divider" style={{ margin: '1rem 0' }} />
          <p style={{ fontSize: '0.8rem', color: 'var(--text-faint)', marginBottom: '0.75rem' }}>
            Contenu de la page détaillée
          </p>

          <div className="form-group">
            <label>Titre du hero (partie 1)</label>
            <input value={form.hero_title} onChange={(e) => setField('hero_title', e.target.value)} />
          </div>
          <div className="form-group">
            <label>Titre du hero (partie mise en avant)</label>
            <input value={form.hero_highlight} onChange={(e) => setField('hero_highlight', e.target.value)} />
          </div>
          <div className="form-group">
            <label>Texte d'intro (lead)</label>
            <textarea value={form.lead} onChange={(e) => setField('lead', e.target.value)} />
          </div>
          <div className="form-group">
            <label>Sous-titre section</label>
            <input value={form.h2} onChange={(e) => setField('h2', e.target.value)} />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea value={form.description} onChange={(e) => setField('description', e.target.value)} />
          </div>

          <div className="form-group">
            <label>Points forts (features)</label>
            {form.features.map((f, i) => (
              <div className="admin-feature-row" key={i}>
                <input value={f} onChange={(e) => setFeature(i, e.target.value)} placeholder={`Point fort ${i + 1}`} />
                <button type="button" className="admin-icon-btn danger" onClick={() => removeFeature(i)}>
                  <FaTrash size={12} />
                </button>
              </div>
            ))}
            <button type="button" className="admin-add-line" onClick={addFeature}>
              <FaPlus size={11} /> Ajouter un point
            </button>
          </div>

          <div className="form-group">
            <label>Message WhatsApp pré-rempli</label>
            <input value={form.wa_message} onChange={(e) => setField('wa_message', e.target.value)} />
          </div>
          <div className="form-group">
            <label>Meta description (SEO)</label>
            <textarea value={form.meta_description} onChange={(e) => setField('meta_description', e.target.value)} maxLength={160} />
          </div>

          <div className="admin-checkbox-row">
            <input
              type="checkbox"
              id="svc-active"
              checked={form.is_active}
              onChange={(e) => setField('is_active', e.target.checked)}
            />
            <label htmlFor="svc-active">Visible sur le site</label>
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

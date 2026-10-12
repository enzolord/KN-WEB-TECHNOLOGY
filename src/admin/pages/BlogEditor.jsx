import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { FaArrowLeft, FaFloppyDisk } from 'react-icons/fa6';
import { fetchOne, insertRow, updateRow } from '../../lib/crud';
import ImageUploadField from '../components/ImageUploadField';
import ArticleBody from '../../components/ArticleBody';
import { blogCategories } from '../../data/blog';

const emptyForm = {
  title: '',
  slug: '',
  excerpt: '',
  category: 'seo',
  content_md: '',
  image_url: '',
  read_time: '',
  status: 'draft',
  published_at: '',
  seo_title: '',
  seo_description: '',
};

function slugify(s) {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function toLocalInput(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export default function BlogEditor() {
  const { id } = useParams();
  const isNew = !id;
  const navigate = useNavigate();
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [slugTouched, setSlugTouched] = useState(false);

  useEffect(() => {
    if (isNew) return;
    (async () => {
      try {
        const row = await fetchOne('articles', id);
        setForm({ ...emptyForm, ...row, published_at: toLocalInput(row.published_at) });
        setSlugTouched(true);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [id, isNew]);

  const setField = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  const onTitleChange = (val) => {
    setField('title', val);
    if (!slugTouched) setField('slug', slugify(val));
  };

  const onSave = async (statusOverride) => {
    setSaving(true);
    setError('');
    try {
      const payload = {
        ...form,
        slug: form.slug ? slugify(form.slug) : slugify(form.title),
        status: statusOverride || form.status,
        published_at: form.published_at
          ? new Date(form.published_at).toISOString()
          : statusOverride === 'published' || form.status === 'published'
          ? new Date().toISOString()
          : null,
      };
      if (isNew) {
        const row = await insertRow('articles', payload);
        navigate(`/admin/blog/${row.id}`, { replace: true });
      } else {
        await updateRow('articles', id, payload);
        setForm((f) => ({ ...f, ...payload }));
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="admin-empty">Chargement…</p>;

  return (
    <div>
      <Link to="/admin/blog" className="link-arrow" style={{ marginBottom: '1rem', display: 'inline-flex' }}>
        <FaArrowLeft size={12} /> Retour aux articles
      </Link>

      {error && <div className="form-status error">{error}</div>}

      <div className="admin-editor-grid">
        <div>
          <div className="admin-panel">
            <div className="form-group">
              <label>Titre *</label>
              <input value={form.title} onChange={(e) => onTitleChange(e.target.value)} placeholder="Titre de l'article" />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Slug (URL)</label>
                <input
                  value={form.slug}
                  onChange={(e) => {
                    setSlugTouched(true);
                    setField('slug', e.target.value);
                  }}
                />
              </div>
              <div className="form-group">
                <label>Catégorie</label>
                <select value={form.category} onChange={(e) => setField('category', e.target.value)}>
                  {Object.entries(blogCategories).map(([key, label]) => (
                    <option key={key} value={key}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="form-group">
              <label>Extrait (résumé affiché sur les cartes)</label>
              <textarea value={form.excerpt} onChange={(e) => setField('excerpt', e.target.value)} />
            </div>
            <div className="form-group">
              <label>Contenu (Markdown)</label>
              <textarea
                className="md-editor"
                value={form.content_md}
                onChange={(e) => setField('content_md', e.target.value)}
                placeholder={'## Un titre\n\nVotre texte ici, en **gras** ou en *italique*.\n\n- point 1\n- point 2'}
              />
            </div>
          </div>

          <div className="admin-panel">
            <div className="admin-panel-head">
              <h2>Référencement (SEO)</h2>
            </div>
            <div className="form-group">
              <label>Titre SEO (optionnel, sinon le titre est utilisé)</label>
              <input value={form.seo_title} onChange={(e) => setField('seo_title', e.target.value)} />
            </div>
            <div className="form-group">
              <label>Meta description</label>
              <textarea value={form.seo_description} onChange={(e) => setField('seo_description', e.target.value)} maxLength={160} />
            </div>
          </div>
        </div>

        <div>
          <div className="admin-panel">
            <div className="admin-panel-head">
              <h2>Publication</h2>
            </div>
            <div className="form-group">
              <label>Statut</label>
              <select value={form.status} onChange={(e) => setField('status', e.target.value)}>
                <option value="draft">Brouillon</option>
                <option value="published">Publié</option>
              </select>
            </div>
            <div className="form-group">
              <label>Date de publication</label>
              <input type="datetime-local" value={form.published_at} onChange={(e) => setField('published_at', e.target.value)} />
              <p style={{ fontSize: '0.75rem', color: 'var(--text-faint)' }}>
                Une date future = l'article se publiera automatiquement à cette date.
              </p>
            </div>
            <div className="form-group">
              <label>Temps de lecture</label>
              <input
                value={form.read_time || ''}
                onChange={(e) => setField('read_time', e.target.value)}
                placeholder="Automatique"
              />
              <p style={{ fontSize: '0.75rem', color: 'var(--text-faint)' }}>
                Laissez vide : calculé automatiquement à partir du texte (≈ 200 mots/min).
              </p>
            </div>
            <ImageUploadField label="Image de couverture" value={form.image_url} onChange={(v) => setField('image_url', v)} folder="blog" />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginTop: '1rem' }}>
              <button className="btn btn-primary" onClick={() => onSave('published')} disabled={saving}>
                <FaFloppyDisk size={13} /> {saving ? 'Enregistrement…' : 'Publier'}
              </button>
              <button className="btn btn-outline" onClick={() => onSave('draft')} disabled={saving}>
                Enregistrer comme brouillon
              </button>
            </div>
          </div>

          <div className="admin-panel admin-preview-panel">
            <div className="admin-panel-head">
              <h2>Aperçu</h2>
            </div>
            {form.image_url && <img src={form.image_url} alt="" style={{ borderRadius: 12, marginBottom: '1rem' }} />}
            <h3 style={{ marginBottom: '0.5rem' }}>{form.title || 'Titre de l’article'}</h3>
            <ArticleBody article={{ content_md: form.content_md || '*Le contenu apparaîtra ici…*' }} />
          </div>
        </div>
      </div>
    </div>
  );
}

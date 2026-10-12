import { useState } from 'react';
import { uploadImage } from '../../lib/upload';

export default function ImageUploadField({ label, value, onChange, folder = 'uploads' }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const onFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true);
    setError('');
    try {
      const url = await uploadImage(file, folder);
      onChange(url);
    } catch (err) {
      setError(err.message || "Échec de l'upload");
    } finally {
      setBusy(false);
      e.target.value = '';
    }
  };

  return (
    <div className="form-group">
      {label && <label>{label}</label>}
      <div className="admin-image-field">
        {value && <img src={value} alt="" className="admin-image-preview" />}
        <input type="file" accept="image/*" onChange={onFile} disabled={busy} />
        {busy && <p className="admin-image-uploading">Envoi en cours…</p>}
        {error && (
          <p className="admin-image-uploading" style={{ color: '#ef4444' }}>
            {error}
          </p>
        )}
        {value && (
          <div style={{ marginTop: '0.5rem' }}>
            <input
              type="text"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder="URL de l'image"
              style={{ fontSize: '0.75rem' }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

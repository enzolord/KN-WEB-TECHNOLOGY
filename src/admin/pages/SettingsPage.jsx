import { useEffect, useState } from 'react';
import { getSupabase } from '../../lib/supabaseClient';

const SOCIAL_KEYS = ['facebook', 'instagram', 'linkedin', 'tiktok'];

export default function SettingsPage() {
  const [contact, setContact] = useState({ phone: '', whatsapp: '', whatsappSecondary: '', email: '', address: '' });
  const [social, setSocial] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    (async () => {
      const supabase = await getSupabase();
      const { data } = await supabase.from('site_settings').select('key,value');
      (data || []).forEach((row) => {
        if (row.key === 'contact') setContact((c) => ({ ...c, ...row.value }));
        if (row.key === 'social') setSocial((s) => ({ ...s, ...row.value }));
      });
      setLoading(false);
    })();
  }, []);

  const onSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    const supabase = await getSupabase();
    await Promise.all([
      supabase.from('site_settings').upsert({ key: 'contact', value: contact }),
      supabase.from('site_settings').upsert({ key: 'social', value: social }),
    ]);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  if (loading) return <p className="admin-empty">Chargement…</p>;

  return (
    <form onSubmit={onSave}>
      <div className="admin-panel">
        <div className="admin-panel-head">
          <h2>Coordonnées</h2>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Téléphone affiché</label>
            <input value={contact.phone} onChange={(e) => setContact({ ...contact, phone: e.target.value })} />
          </div>
          <div className="form-group">
            <label>Numéro WhatsApp (format international, sans +)</label>
            <input value={contact.whatsapp} onChange={(e) => setContact({ ...contact, whatsapp: e.target.value })} placeholder="237672173778" />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Numéro WhatsApp secondaire (optionnel, sans +)</label>
            <input
              value={contact.whatsappSecondary}
              onChange={(e) => setContact({ ...contact, whatsappSecondary: e.target.value })}
              placeholder="237640288919"
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input value={contact.email} onChange={(e) => setContact({ ...contact, email: e.target.value })} />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Adresse</label>
            <input value={contact.address} onChange={(e) => setContact({ ...contact, address: e.target.value })} />
          </div>
        </div>
      </div>

      <div className="admin-panel">
        <div className="admin-panel-head">
          <h2>Réseaux sociaux</h2>
        </div>
        {SOCIAL_KEYS.map((key) => (
          <div className="form-group" key={key}>
            <label style={{ textTransform: 'capitalize' }}>{key}</label>
            <input value={social[key] || ''} onChange={(e) => setSocial({ ...social, [key]: e.target.value })} placeholder={`https://${key}.com/…`} />
          </div>
        ))}
      </div>

      <button type="submit" className="btn btn-primary" disabled={saving}>
        {saving ? 'Enregistrement…' : saved ? 'Enregistré ✓' : 'Enregistrer les réglages'}
      </button>
    </form>
  );
}

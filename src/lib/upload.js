import { getSupabase, isSupabaseConfigured } from './supabaseClient';

const BUCKET = 'media';

function slugifyFilename(name) {
  const dot = name.lastIndexOf('.');
  const ext = dot > -1 ? name.slice(dot) : '';
  const base = (dot > -1 ? name.slice(0, dot) : name)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
  return `${base || 'fichier'}-${Date.now()}${ext}`;
}

/**
 * Uploads a file to the public `media` Supabase Storage bucket and returns
 * its public URL. Used by every image field in the admin dashboard.
 */
export async function uploadImage(file, folder = 'uploads') {
  if (!isSupabaseConfigured) {
    throw new Error("Supabase n'est pas configuré : impossible d'uploader une image.");
  }
  const supabase = await getSupabase();
  const path = `${folder}/${slugifyFilename(file.name)}`;
  const { error } = await supabase.storage.from(BUCKET).upload(path, file, {
    cacheControl: '31536000',
    upsert: false,
  });
  if (error) throw error;
  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

import { getSupabase, isSupabaseConfigured } from './supabaseClient';

async function guard() {
  if (!isSupabaseConfigured) {
    throw new Error(
      "Supabase n'est pas configuré. Renseignez VITE_SUPABASE_URL et VITE_SUPABASE_ANON_KEY dans .env, puis relancez le serveur."
    );
  }
  return getSupabase();
}

/** Fetch every row of a table (admin view — includes drafts/inactive rows). */
export async function fetchAll(table, { orderBy = 'created_at', ascending = false } = {}) {
  const supabase = await guard();
  const { data, error } = await supabase.from(table).select('*').order(orderBy, { ascending });
  if (error) throw error;
  return data || [];
}

export async function fetchOne(table, id) {
  const supabase = await guard();
  const { data, error } = await supabase.from(table).select('*').eq('id', id).single();
  if (error) throw error;
  return data;
}

export async function insertRow(table, payload) {
  const supabase = await guard();
  const { data, error } = await supabase.from(table).insert(payload).select().single();
  if (error) throw error;
  return data;
}

export async function updateRow(table, id, payload) {
  const supabase = await guard();
  const { data, error } = await supabase.from(table).update(payload).eq('id', id).select().single();
  if (error) throw error;
  return data;
}

export async function deleteRow(table, id) {
  const supabase = await guard();
  const { error } = await supabase.from(table).delete().eq('id', id);
  if (error) throw error;
}

/** Swap sort_order between two rows to move an item up/down a list. */
export async function swapOrder(table, rowA, rowB) {
  const supabase = await guard();
  await Promise.all([
    supabase.from(table).update({ sort_order: rowB.sort_order }).eq('id', rowA.id),
    supabase.from(table).update({ sort_order: rowA.sort_order }).eq('id', rowB.id),
  ]);
}

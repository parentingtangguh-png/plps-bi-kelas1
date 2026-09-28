import { supabase } from './supabase.js';

export async function getChildren() {
  const { data, error } = await supabase
    .from('children')
    .select('*')
    .order('created_at', { ascending: true });
  if (error) throw error;
  return data ?? [];
}

export async function addChild(nama, kelas) {
  const { data, error } = await supabase
    .from('children')
    .insert({ nama, kelas })
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteChild(id) {
  const { error } = await supabase.from('children').delete().eq('id', id);
  if (error) throw error;
}

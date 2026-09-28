import { supabase } from './supabase.js';

const REDIRECT_URL = window.location.origin + window.location.pathname;

export async function signInWithGoogle() {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: { redirectTo: REDIRECT_URL },
  });
  if (error) throw error;
}

export async function signOut() {
  await supabase.auth.signOut();
}

export async function getSession() {
  const { data: { session } } = await supabase.auth.getSession();
  return session;
}

export function onAuthStateChange(callback) {
  return supabase.auth.onAuthStateChange(callback);
}

export function getUserDisplayName(session) {
  return session?.user?.user_metadata?.full_name
    ?? session?.user?.email
    ?? 'Orang Tua';
}

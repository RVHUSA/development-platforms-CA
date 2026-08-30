import { supabase } from "./supabase.js";

// Check if the user is logged in
export async function requireAuth() {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    window.location.href = "./login.html";
    return null;
  }

  return session;
}

// Log out the current user
export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error(error);
    return;
  }

  window.location.href = "./login.html";
}

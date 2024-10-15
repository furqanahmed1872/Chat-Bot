// src/routes/+layout.ts
import { supabase } from '$lib/supabaseClient';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ data }) => {
  // Get session on the client side
  const { data: session } = await supabase.auth.getSession();

  // Set up auth state change listener
  supabase.auth.onAuthStateChange((event, session) => {
    if (event === 'SIGNED_IN') {
      console.log('User signed in:', session?.user);
      window.location.href = '/dashboard'; // Redirect after login
    }

    if (event === 'SIGNED_OUT') {
      console.log('User signed out');
      window.location.href = '/login'; // Redirect after logout
    }

    if (event === 'PASSWORD_RECOVERY') {
      console.log('Password recovery requested');
      // Implement password reset form logic here if needed
    }

    if (event === 'TOKEN_REFRESHED') {
      console.log('Token refreshed:', session?.access_token);
      // Optionally update the UI with new session information
    }
  });

  // Return session along with chat and characterList from server-side load
  return {
    session,
    chat: data.chat, // Available from +layout.server.ts
    characterList: data.characterList, // Available from +layout.server.ts
  };
};

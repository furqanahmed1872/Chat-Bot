import { supabase } from '$lib/supabaseClient';

export const load = async () => {
  const { data: session } = await supabase.auth.getSession();

 supabase.auth.onAuthStateChange((event, session) => {
   if (event === 'SIGNED_IN') {
     console.log('User signed in:', session.user);
     // Redirect the user to a protected page after login
     window.location.href = '/dashboard';
   }

   if (event === 'SIGNED_OUT') {
     console.log('User signed out');
     // Redirect the user to the login page after logout
     window.location.href = '/login';
   }

   if (event === 'PASSWORD_RECOVERY') {
     console.log('Password recovery requested');
     // Display a password reset form
     showPasswordResetForm();
   }

   if (event === 'TOKEN_REFRESHED') {
     console.log('Token refreshed:', session.access_token);
     // Optionally update some UI elements with new session info
     updateUserInfo(session.user);
   }
 });


  return { session };
};

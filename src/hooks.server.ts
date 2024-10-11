import { supabase } from '$lib/supabaseClient';

export async function handle({ event, resolve }) {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Store session in locals to use it in routes
  event.locals.session = session;

  // Redirect user to login if they try to access protected routes without a session
  if (!session && event.url.pathname.startsWith('/dashboard')) {
    return Response.redirect('/login');
  }

  // Continue with request
  return resolve(event);
}

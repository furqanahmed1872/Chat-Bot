import { createServerClient } from '@supabase/ssr';
import { type Handle, redirect } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import {
  PUBLIC_SUPABASE_URL,
  PUBLIC_SUPABASE_ANON_KEY,
} from '$env/static/public';

const supabase: Handle = async ({ event, resolve }) => {
  const supabaseUrl = PUBLIC_SUPABASE_URL;
  const supabaseKey = PUBLIC_SUPABASE_ANON_KEY;

  event.locals.supabase = createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll: () => event.cookies.getAll(),
      setAll: (cookiesToSet) => {
        cookiesToSet.forEach(({ name, value, options }) => {
          event.cookies.set(name, value, { ...options, path: '/' });
        });
      },
    },
  });

  // Initialize safeGetSession function
  let Profile = await event.locals.supabase.auth.getSession();
  let User = await event.locals.supabase.auth.getUser();
  //  console.log(Profile.data.session, User.data.user);
  event.locals.safeGetSession = async () => {
    if (Profile.data.session === null && User.data.user === null) {
      const {
        data: { session },
      } = await event.locals.supabase.auth.getSession();
      if (!session) {
        return { session: null, user: null };
      }

      const {
        data: { user },
        error,
      } = await event.locals.supabase.auth.getUser();
      if (error) {
        return { session: null, user: null };
      }

      return { session, user };
    } else {
      return { session: null, user: null };
    }
  };

  return resolve(event, {
    filterSerializedResponseHeaders(name) {
      return name === 'content-range' || name === 'x-supabase-api-version';
    },
  });
};

const authGuard: Handle = async ({ event, resolve }) => {
  let Profile = await event.locals.supabase.auth.getSession();
  let User = await event.locals.supabase.auth.getUser();
  if (Profile.data.session === null && User.data.user === null) {
    const { session, user } = await event.locals.safeGetSession();
    event.locals.session = session;
    event.locals.user = user;

    // Use safe destructuring in the redirect conditions
    if (!session && event.url.pathname === '/chat') {
      throw redirect(303, '/signup');
    }

    if (session && event.url.pathname === '/signup') {
      throw redirect(303, '/');
    }

    if (session && event.url.pathname === '/signin') {
      throw redirect(303, '/');
    }
  }

  return resolve(event);
};

export const handle: Handle = sequence(supabase, authGuard);

import { createServerClient } from '@supabase/ssr';
import { type Handle, redirect } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import {
  PUBLIC_SUPABASE_URL,
  PUBLIC_SUPABASE_ANON_KEY,
} from '$env/static/public';

const supabase: Handle = async ({ event, resolve }) => {

  event.locals.supabase = createServerClient(
    'https://abgxvtnbxnynzmfbriqk.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiZ3h2dG5ieG55bnptZmJyaXFrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY2NDI2MzIsImV4cCI6MjA0MjIxODYzMn0.bFwsfJ6Xef3X0W9b1t93d8mgr6iXUl_7n1HY6C5PIsQ',
    {
      cookies: {
        getAll: () => event.cookies.getAll(),

        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value, options }) => {
            event.cookies.set(name, value, { ...options, path: '/' });
          });
        },
      },
    },
  );

  event.locals.safeGetSession = async () => {
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
      // JWT validation has failed
      return { session: null, user: null };
    }

    return { session, user };
  };

  return resolve(event, {
    filterSerializedResponseHeaders(name) {
      return name === 'content-range' || name === 'x-supabase-api-version';
    },
  });
};

const authGuard: Handle = async ({ event, resolve }) => {
  const { session, user } = await event.locals.safeGetSession();
  event.locals.session = session;
  event.locals.user = user;

  // if (!event.locals.session && event.url.pathname.startsWith('/chat')) {
  //   redirect(303, '/auth');
  // }

  // if (event.locals.session && event.url.pathname === '/auth') {
  //   redirect(303, '/chat');
  // }

  return resolve(event);
};

export const handle: Handle = sequence(supabase, authGuard);

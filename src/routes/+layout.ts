import {
  createBrowserClient,
  createServerClient,
  isBrowser,
} from '@supabase/ssr';
const supabase_url = import.meta.env.VITE_SUPABASE_URL;
const supabase_key = import.meta.env.VITE_SUPABASE_ANON_KEY;
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ data, depends, fetch }) => {
  depends('supabase:auth');

  const supabase = isBrowser()
    ? createBrowserClient(supabase_url, supabase_key, {
        global: {
          fetch,
        },
      })
    : createServerClient(supabase_url, supabase_key, {
        global: {
          fetch,
        },
        cookies: {
          getAll() {
            return data.cookies;
          },
        },
      });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { chat, characterList } = data;

  return { session, supabase, user, chat, characterList };
};

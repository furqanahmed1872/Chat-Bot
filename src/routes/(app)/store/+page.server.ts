// src/routes/+page.server.ts
import { supabase } from '$lib/supabaseClient';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  const { data: characterList, error: characterListError } = await supabase
    .from('characters')
    .select('*')
    .order('created_at', { ascending: true });

  if (characterListError) {
    console.error('Error loading messages:', characterListError);
    return {
      messages: [],
      error: 'Failed to load messages',
    };
  }
  return {
    characterList,
  };
};

// src/routes/+layout.server.ts
import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({
  locals: {  supabase },
}) => {
    // Fetch character list
    const { data: characterList, error: characterListError } = await supabase
      .from('characters')
      .select('*')
      .order('created_at', { ascending: true });

    if (characterListError) {
      console.error(
        'Error loading messages or character list:',
        characterListError,
      );
      return {
        characterList: [],
        error: 'Failed to load data',
      };
    }

    return {
      characterList,
    };
};

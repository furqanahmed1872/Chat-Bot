// src/routes/+page.server.ts
import { supabase } from '$lib/supabaseClient';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { fail } from '@sveltejs/kit';
import { characterSchema } from '$lib/schema/characterSchema.js';
import type { PageServerLoad, Actions } from './$types';

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
    form: await superValidate(zod(characterSchema)),
    characterList,
  };
};
export const actions: Actions = {
  default: async (event) => {
    const form = await superValidate(event, zod(characterSchema));

    if (!form.valid) {
      return fail(400, { form });
    }

    const { data, error } = await supabase
      .from('characters')
      .insert([form.data])
      .select();

    if (error) {
      console.error('Error loading messages:', error);
      return {
        messages: [],
        error: 'Failed to load messages',
      };
    }
    // console.log(form);
    return { form };
  },
};

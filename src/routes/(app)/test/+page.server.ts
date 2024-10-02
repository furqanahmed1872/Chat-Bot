import type { PageServerLoad, Actions } from './$types.js';
import { fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { supabase } from '$lib/supabaseClient.js';
import { z } from 'zod';

const characterSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'Name is required.' })
    .max(50, { message: 'Name must be at most 50 characters long.' }),

  voice: z
    .string()
    .min(1, { message: 'Voice is required.' })
    .max(30, { message: 'Voice must be at most 30 characters long.' }),

  visibility: z
    .string()
    .min(1, { message: 'Visibility is required.' })
    .max(20, { message: 'Visibility must be at most 20 characters long.' }),

  description: z
    .string()
    .min(10, { message: 'Description must be at least 10 characters long.' })
    .max(200, { message: 'Description must be at most 200 characters long.' }),

  prompt: z
    .string()
    .min(5, { message: 'Prompt must be at least 5 characters long.' })
    .max(150, { message: 'Prompt must be at most 150 characters long.' }),

  image: z.string().min(3, { message: 'Image is required.' }),
});

export const load: PageServerLoad = async () => {
  return {
    form: await superValidate(zod(characterSchema)),
  };
};

export const actions: Actions = {
  default: async (event) => {
    const form = await superValidate(event, zod(characterSchema));

    if (!form.valid) {
      return fail(400, { form });
    }
    console.log(form);
    return { form };
  },
};

import type { PageServerLoad, Actions } from './$types.js';
import { fail, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { signinSchema } from './schema.js';
import { supabase } from '$lib/supabaseClient.js';

export const load: PageServerLoad = async () => {
  return {
    form: await superValidate(zod(signinSchema)),
  };
};

export const actions: Actions = {
  default: async (event) => {
    const form = await superValidate(event, zod(signinSchema));

    // Validate the form input
    if (!form.valid) {
      return fail(400, { form });
    }

    // Attempt to sign in with Supabase
    const { data, error } = await supabase.auth.signInWithPassword({
      email: form.data.email,
      password: form.data.password,
    });

    if (error) {
      // Return form with error for UI to handle
      return fail(400, {
        form,
        message: error.message,
      });
    }

    // Redirect to dashboard or desired page on success
    throw redirect(303, '/dashboard');
  },
};

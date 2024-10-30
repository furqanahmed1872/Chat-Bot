import type { PageServerLoad, Actions } from './$types.js';
import { fail, redirect } from '@sveltejs/kit';
import { message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { signinSchema } from './schema.js';
// import { supabase } from '$lib/supabaseClient.js';

export const load: PageServerLoad = async () => {
  return {
    form: await superValidate(zod(signinSchema)),
  };
};

export const actions: Actions = {
  default: async (event: any) => {
    const form = await superValidate(event, zod(signinSchema));
    const { locals } = event;
    const { supabase } = locals;

    if (!form.valid) {
      return fail(400, { form });
    }

    const { data, error: signInError } = await supabase.auth.signInWithPassword(
      {
        email: form.data.email,
        password: form.data.password,
      },
    );

    if (signInError) {
      console.error('Sign-in error:', signInError);

      let errorMessage = 'Invalid email or password. Please try again.';
      if (signInError.status === 500) {
        errorMessage =
          'There was an issue with authentication. Please try again later.';
      }

      return message(form, errorMessage);
    }
    return message(form, 'Logged in successfully!');
  },
};

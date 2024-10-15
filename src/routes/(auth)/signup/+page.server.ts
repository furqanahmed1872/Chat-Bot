// src/routes/+page.server.ts
import type { PageServerLoad, Actions } from './$types';
import { fail } from '@sveltejs/kit';
import { message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { formSchema } from './schema';

// Load the form with validation
export const load: PageServerLoad = async () => {
  return {
    form: await superValidate(zod(formSchema)),
  };
};

export const actions: Actions = {
  default: async (event) => {
    const form = await superValidate(event, zod(formSchema));
    const { locals } = event;
    const { supabase } = locals;

    if (!form.valid) {
      return fail(400, { form });
    }
    console.log(form.data);
    // Supabase signUp method (without email confirmation)
    const { data, error: signUpError } = await supabase.auth.signUp({
      email: form.data.email,
      password: form.data.password,
    });

    if (signUpError) {
      let errorMessage =
        'An error occurred during sign-up. Please try again later.';
      if (signUpError.message.includes('email already exists')) {
        errorMessage = 'An account with this email already exists.';
      }
      return fail(400, { form, error: errorMessage });
    }

    return message(form, 'Account created successfully! Please log in.');
  },
};

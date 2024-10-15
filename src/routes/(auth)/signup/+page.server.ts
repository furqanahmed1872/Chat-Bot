import type { PageServerLoad, Actions } from './$types.js';
import { fail } from '@sveltejs/kit';
import { message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { formSchema } from './schema';
import { supabase } from '$lib/supabaseClient.js';

export const load: PageServerLoad = async () => {
  return {
    form: await superValidate(zod(formSchema)),
  };
};

export const actions: Actions = {
  default: async (event) => {
    const form = await superValidate(event, zod(formSchema));

    if (!form.valid) {
      return fail(400, { form });
    }

    const { error: signUpError } = await supabase.auth.signUp({
      email: form.data.email,
      password: form.data.password,
      options: {
        data: {
          display_name: `${form.data.firstname} ${form.data.lastname}`,
        },
        emailRedirectTo: 'http://localhost:5173/',
      },
    });

    if (signUpError) {
      if (signUpError.message.includes('email already exists')) {
        return (
          fail(400, {
            form,
            error: 'An account with this email already exists',
          }),
          message(form, 'Email already exists')
        );
      }
      console.log(signUpError);
      return (
        // fail(400, { form, error: signUpError.message }),
        message(form, signUpError.message)
      );
    }

    return message(form, 'Form posted successfully!');
  },
};

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

    // Check if email already exists
    const { data: userData, error: fetchError } = await supabase
      .from('auth.users')
      .select('*')
      .eq('email', form.data.email);

    if (fetchError) {
      return fail(400, { form, error: 'Failed to check existing users.' });
    }

    if (userData.length > 0) {
      return fail(400, {
        form,
        error: 'An account with this email already exists.',
      });
    }

    // Supabase signUp method
    const { data, error: signUpError } = await supabase.auth.signUp({
      email: form.data.email,
      password: form.data.password,
    });

    console.error('Sign-up error:', signUpError);
    console.log('Supabase response:', data);

    if (signUpError) {
      let errorMessage =
        'An error occurred during sign-up. Please try again later.';

      if (signUpError.message.includes('email already exists')) {
        errorMessage = 'An account with this email already exists.';
      } else if (signUpError.code === 'email_address_not_authorized') {
        errorMessage = 'This email address is not authorized for sign-up.';
      }

      return fail(400, { form, error: errorMessage });
    }

    return message(form, 'Account created successfully');
  },
};


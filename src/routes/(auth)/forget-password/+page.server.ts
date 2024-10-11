import type { PageServerLoad, Actions } from './$types';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { forgetSchema } from './schema';
import { fail, redirect } from '@sveltejs/kit';
import { supabase } from '$lib/supabaseClient';

export const load: PageServerLoad = async () => {
  return {
    form: await superValidate(zod(forgetSchema)),
  };
};

export const actions: Actions = {
  default: async (event) => {
    const form = await superValidate(event, zod(forgetSchema));

    if (!form.valid) {
      return fail(400, { form });
    }

    const { email } = form.data;

    // Password recovery logic here (using Supabase password reset email)
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'http://localhost:5173/reset-password',
    });

    if (error) {
      return fail(500, { message: error.message });
    }

    return {
      success: true,
      message: 'Password reset email sent!',
    };
  },
};

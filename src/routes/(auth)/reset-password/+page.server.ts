import type { PageServerLoad, Actions } from './$types';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { resetSchema } from './schema';
import { fail, redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
  return {
    form: await superValidate(zod(resetSchema)),
  };
};

export const actions: Actions = {
  default: async (event) => {
    const form = await superValidate(event, zod(resetSchema));
    const { locals } = event;
    const { supabase } = locals;
    if (!form.valid) {
      return fail(400, { form });
    }

    const { password } = form.data;

    // Supabase logic for updating the password
    const { error } = await supabase.auth.updateUser({
      password,
    });

    if (error) {
      return fail(500, { message: error.message });
    }

    return {
      success: true,
      message: 'Password has been updated!',
    };
  },
};

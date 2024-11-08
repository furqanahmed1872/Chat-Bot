import type { PageServerLoad, Actions } from './$types';
import { message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { forgetSchema } from './schema';
import { fail, redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
  return {
    form: await superValidate(zod(forgetSchema)),
  };
};

export const actions: Actions = {
  default: async (event) => {
    const form = await superValidate(event, zod(forgetSchema));
    const { locals } = event;
    const { supabase } = locals;

    if (!form.valid) {
      return fail(400, { form });
    }

    const { email } = form.data;

    // Password recovery logic here (using Supabase password reset email)
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'https://chat-bot-kappa-ruby.vercel.app/reset-password',
    });

    if (error) {
      // Check if the error is a rate limit issue
      if (error.status === 429) {
        message(
          form,
          'You’ve requested a password reset recently. Please wait and try again in a few seconds.',
        );
        // return fail(429, {
        //   message:
        //     'You’ve requested a password reset recently. Please wait and try again in a few seconds.',
        // });
      }
      // Handle other types of errors
      return message(form, error.message);
      // fail(500, { message: error.message });
    }

    return message(form, 'Password reset email sent, check your email!')
  },
};

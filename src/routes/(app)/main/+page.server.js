import { loginSchema } from "$lib/loginschema";
import { error } from '@sveltejs/kit';
import { fail, superValidate } from 'sveltekit-superforms'
import { zod } from 'sveltekit-superforms/adapters'

export const load = async ({ params }) => {
  
 

  const form = await superValidate(zod(loginSchema));


  return { form };
};
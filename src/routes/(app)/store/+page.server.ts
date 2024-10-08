// src/routes/+page.server.ts
import { supabase } from '$lib/supabaseClient';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { fail } from '@sveltejs/kit';
import { characterSchema } from '$lib/schema/characterSchema.js';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async () => {
  const { data: characterList, error: characterListError } = await supabase
    .from('characters')
    .select('*')
    .order('created_at', { ascending: true });

  if (characterListError) {
    console.error('Error loading messages:', characterListError);
    return {
      messages: [],
      error: 'Failed to load messages',
    };
  }
  return {
    form: await superValidate(zod(characterSchema)),
    characterList,
  };
};
export const actions: Actions = {
  default: async (event) => {
    const form = await superValidate(event, zod(characterSchema));

    if (!form.valid) {
      return fail(400, { form });
    }
    const { prompt:Prompt, character, image, description, visibility, voice } =
      form.data;
    const messages = [
      `Hey!I’m ${character} I’m here to support you every step of the way—let’s get started!`,
      `Hello!I’m ${character}. Ready to make a difference today? I’m excited to be here for you!`,
      `Hi! I’m ${character}, Need help or just a friendly chat? I’m always here for you.`,
      `Hey! I’m ${character}. Ready to dive in? Let’s achieve great things together!`,
      `Hi! I’m ${character}. I’m here to guide, support, and make things easier for you.`,
      `Hello! I’m ${character}, Whatever you need, I’m just a message away.`,
      `Hey! I’m ${character}, Got questions or need advice? I’m all ears and ready to help!`,
      `Hi! I’m ${character}. Count on me to be your go-to guide—supportive, reliable, and always here!`,
      `Hello! I’m ${character}. Whether you’re stuck or just want to chat, I’m here for you!`,
      `Hey! I’m ${character}, Let’s make today productive and fun—I'm excited to help!`,
    ];  
    const greeting_note = messages[Math.floor(Math.random() * 10)];
    const prompt = `Your name or profession is ${character}. ${Prompt}. Respond in bullet points and heading when need, making your explanations concise and focused. if question is not related your field then ignore it and tell him reason.`
    
    const { data, error } = await supabase
      .from('characters')
      .insert([{prompt, character, greeting_note, image, description, visibility, voice}])
      .select();

    if (error) {
      console.error('Error loading messages:', error);
      return {
        messages: [],
        error: 'Failed to load messages',
      };
    }
    return { form };
  },
};

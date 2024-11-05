// src/routes/+page.server.ts
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { fail } from '@sveltejs/kit';
import { characterSchema } from '$lib/schema/characterSchema.js';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ locals, parent }) => {
  const { supabase } = locals;
  const { myCharacter, plan } = await parent()

  const { data: allBots } = await supabase.from('characters').select('*');
  const { data: popularBots } = await supabase
    .from('characters')
    .select('*')
    .gt('usage_count', 10)
    .order('usage_count', { ascending: false })
    .limit(10);
 
  const { data: recentBots } = await supabase
    .from('characters')
    .select('*')
    .gt(
      'last_used',
      new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    )
    .order('last_used', { ascending: false })
    .limit(10);
  

  return {
    form: await superValidate(zod(characterSchema)),
    allBots: allBots || [],
    popularBots: popularBots || [],
    recentBots: recentBots || [],
    privateBots: myCharacter || [],
    characterCreated: plan.plan_amount
  };
};

export const actions: Actions = {
  default: async (event) => {
    const form = await superValidate(event, zod(characterSchema));
    const { locals } = event;
    const { supabase, safeGetSession } = locals;
    const { session } = await safeGetSession();
    const { user } = session;

    if (!form.valid) {
      return fail(400, { form });
    }
    const {
      prompt: Prompt,
      character,
      image,
      description,
      visibility,
      voice,
    } = form.data;
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
    const prompt = `Your name or profession is ${character}. ${Prompt}. Respond in bullet points and heading when need, making your explanations concise, focused and in 150 to 200 words. if question is not related your field then ignore it and tell him reason.`;

    const { data, error } = await supabase
      .from('characters')
      .insert([
        {
          prompt,
          character,
          greeting_note,
          image,
          description,
          visibility,
          voice,
          user_id: user.id,
        },
      ])
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

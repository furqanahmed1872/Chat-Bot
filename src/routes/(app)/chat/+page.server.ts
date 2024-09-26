// src/routes/+page.server.ts
import { supabase } from '$lib/supabaseClient';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  const { data: saveChatRecord, error } = await supabase
    .from('conversations')
    .select('*')
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Error loading messages:', error);
    return {
      messages: [],
      error: 'Failed to load messages',
    };
  }

  return {
    chat: saveChatRecord.map((v) => {
      return {
        chatId: v.chat_id,
        message: v.chat,
        character: v.character
      };
    }),
  };
};

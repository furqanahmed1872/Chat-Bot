// src/routes/+page.server.ts
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
  
  const { supabase } = locals
  const { data: saveChatRecord, error } = await supabase
    .from('conversations')
    .select('*')
    .order('created_at', { ascending: true });
  const { data: characterList, error: characterListError } = await supabase
    .from('characters')
    .select('*')
    .order('created_at', { ascending: true });

  if (error && characterListError) {
    console.error('Error loading messages:', error);
    return {
      messages: [],
      error: 'Failed to load messages',
    };
  }
  return {
    chat: saveChatRecord?.map((v) => {
      return {
        chatId: v.chat_id,
        message: v.chat,
        character: v.character,
      };
    }),
    characterList,
  };
};

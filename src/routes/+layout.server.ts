// src/routes/+layout.server.ts
import { supabase } from '$lib/supabaseClient';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async () => {
  // Fetch chat records
  const { data: saveChatRecord, error } = await supabase
    .from('conversations')
    .select('*')
    .order('created_at', { ascending: true });

  // Fetch character list
  const { data: characterList, error: characterListError } = await supabase
    .from('characters')
    .select('*')
    .order('created_at', { ascending: true });

  // Check for any errors
  if (error || characterListError) {
    console.error(
      'Error loading messages or character list:',
      error || characterListError,
    );
    return {
      chat: [],
      characterList: [],
      error: 'Failed to load data',
    };
  }

  return {
    chat: saveChatRecord?.map((v) => ({
      chatId: v.chat_id,
      message: v.chat,
      character: v.character,
    })),
    characterList,
  };
};

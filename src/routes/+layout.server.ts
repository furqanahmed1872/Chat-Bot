// src/routes/+layout.server.ts
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({
  locals: { safeGetSession, supabase },
  cookies
}) => {
  const { session } = await safeGetSession();
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
      cookies,
    };
  }

  return {
    chat: saveChatRecord?.map((v) => ({
      chatId: v.chat_id,
      message: v.chat,
      character: v.character,
    })),
    characterList,
    cookies: cookies.getAll(),
    session,
  };
};

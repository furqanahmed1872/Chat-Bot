// src/routes/api/deleteChat/+server.ts
import { supabase } from '$lib/supabaseClient';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
  const { chatId } = await request.json();

  // Delete the chat based on chatId
  const { error } = await supabase
    .from('conversations')
    .delete()
    .eq('chat_id', chatId); // Assuming each chat has a unique ID

  if (error) {
    console.error('Error deleting chat:', error);
    return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
  }

  return new Response(JSON.stringify({ success: true }), { status: 200 });
};

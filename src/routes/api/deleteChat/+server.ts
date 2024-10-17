// src/routes/api/deleteChat/+server.ts
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, locals }) => {
  const { supabase } = locals;
  const { chatId } = await request.json();

  const { error } = await supabase
    .from('conversations')
    .delete()
    .eq('chat_id', chatId);

  if (error) {
    console.error('Error deleting chat:', error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500 },
    );
  }

  return new Response(JSON.stringify({ success: true }), { status: 200 });
};

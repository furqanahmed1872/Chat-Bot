import { supabase } from '$lib/supabaseClient';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
  try {
    // Parse the incoming request body
    const { messages, character, chatId } = await request.json();
    console.log(messages);
    // Ensure that messages is an array
    if (!Array.isArray(messages)) {
      throw new Error('Messages must be an array');
    }

    // Insert the conversation into the Supabase table
    const { data, error } = await supabase
      .from('conversations')
      .insert([{ chat_id: chatId, character, chat: messages }])
      .select();

    // Handle any insertion error
    if (error) {
      console.error('Error adding chat:', error);
      return new Response(
        JSON.stringify({ success: false, error: error.message }),
        { status: 500 },
      );
    }

    // Return success response
    return new Response(JSON.stringify({ success: true, data }), {
      status: 200,
    });
  } catch (err) {
    console.error('Error processing request:', err);
    return new Response(
      JSON.stringify({ success: false, error: err }),
      { status: 400 },
    );
  }
};

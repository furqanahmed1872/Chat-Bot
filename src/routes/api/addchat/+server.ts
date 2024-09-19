import { supabase } from '$lib/supabaseClient';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
  try {
    const { messages, character, chatId } = await request.json();
    console.log(chatId);

    if (!Array.isArray(messages)) {
      throw new Error('Messages must be an array');
    }

    // Check if the chat with the given chatId already exists
    const { data: existingChat, error: fetchError } = await supabase
      .from('conversations')
      .select('id, chat')
      .eq('chat_id', chatId)
      .single();

    if (fetchError && fetchError.code !== 'PGRST116') {
      console.error('Error fetching chat:', fetchError);
      return new Response(
        JSON.stringify({ success: false, error: fetchError.message }),
        { status: 500 },
      );
    }
    let response;
    if (existingChat) {
      const { error: updateError } = await supabase
        .from('conversations')
        .update({ chat: messages, character })
        .eq('chat_id', chatId);

      if (updateError) {
        console.error('Error updating chat:', updateError);
        return new Response(
          JSON.stringify({ success: false, error: updateError.message }),
          { status: 500 },
        );
      }
      response = { success: true, message: 'Chat updated successfully' };
    } else {
      const { data, error: insertError } = await supabase
        .from('conversations')
        .insert([{ chat_id: chatId, character, chat: messages }])
        .select();

      if (insertError) {
        console.error('Error adding new chat:', insertError);
        return new Response(
          JSON.stringify({ success: false, error: insertError.message }),
          { status: 500 },
        );
      }
      response = { success: true, data };
    }
    return new Response(JSON.stringify(response), {
      status: 200,
    });
  } catch (err) {
    let errorMessage = 'An unknown error occurred';

    // Check if err is an instance of Error
    if (err instanceof Error) {
      errorMessage = err.message;
    }

    console.error('Error processing request:', errorMessage);
    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      { status: 400 },
    );
  }
};

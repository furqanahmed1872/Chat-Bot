import { createClient } from '@supabase/supabase-js';
import { json } from '@sveltejs/kit';
import fs from 'fs';
import path from 'path';
import OpenAI from 'openai';
import { PRIVATE_OPENAI_API_KEY } from '$env/static/private';
import { PRIVATE_SUPABASE_SERVICE_ROLE_KEY } from '$env/static/private';
import { PUBLIC_SUPABASE_URL } from '$env/static/public';

export async function POST({ request }) {
  const supabase = createClient(
    PUBLIC_SUPABASE_URL,
    PRIVATE_SUPABASE_SERVICE_ROLE_KEY,
  );
  const { message, voice, prompt } = await request.json();
  const openai = new OpenAI({ apiKey: PRIVATE_OPENAI_API_KEY });

  const systemMessage = prompt
    ? {
        role: 'system',
        content: prompt,
      }
    : {
        role: 'system',
        content: 'You are a helpful assistant.',
      };

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${PRIVATE_OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          systemMessage,
          {
            role: 'user',
            content: message,
          },
        ],
        temperature: 1,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      }),
    });
    // for voice chat reply
    const data = await response.json();
    if (data?.choices?.length > 0) {
      const aiResponseText = data.choices[0].message.content;
      console.log(aiResponseText);
      const mp3 = await openai.audio.speech.create({
        model: 'tts-1',
        voice: voice ? voice : 'alloy',
        input: aiResponseText,
      });
      const buffer = Buffer.from(await mp3.arrayBuffer());

      const { data: fileList, error: listError } = await supabase.storage
        .from('audio-bucket')
        .list('', { search: 'speech.mp3' });

      if (fileList) {
        const { error: deleteError } = await supabase.storage
          .from('audio-bucket')
          .remove(['speech.mp3']);

        const { data: audio, error } = await supabase.storage
          .from('audio-bucket')
          .upload('speech.mp3', buffer, {
            contentType: 'audio/mp3',
          });

        if (error) {
          console.error('Error uploading file:', error);
          return json(
            { message: 'Error uploading audio file' },
            { status: 500 },
          );
        }

        return json({
          message: aiResponseText,
          audio: `https://abgxvtnbxnynzmfbriqk.supabase.co/storage/v1/object/public/audio-bucket/speech.mp3`,
        });
      } else {
        console.error('No choices found in the API response');
        return json(
          { message: 'Error: No response from the AI' },
          { status: 500 },
        );
      }
    }
  } catch (error) {
    console.error('Error fetching from OpenAI:', error);
    return json({ message: 'Error fetching from AI' }, { status: 500 });
  }
}

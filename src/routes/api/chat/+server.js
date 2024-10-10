import { json } from '@sveltejs/kit';
import fs from 'fs';
import path from 'path';
import OpenAI from 'openai';

export async function POST({ request }) {
  const { message, character, voice, prompt } = await request.json();
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  console.log(voice);
  const openai = new OpenAI({ apiKey });

  // Construct system message based on the prompt
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
    // Generate the chat response using OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
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
        max_tokens: 200,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      }),
    });

    const data = await response.json();
    if (data?.choices?.length > 0) {
      const aiResponseText = data.choices[0].message.content;

      // File path for the consistent speech file
      const speechFile = path.resolve('./static/speech.mp3');

      // Create speech audio using OpenAI
      const mp3 = await openai.audio.speech.create({
        model: 'tts-1',
        voice: voice ? voice : 'alloy',
        input: aiResponseText,
      });

      // Convert the response to buffer and save to the consistent file
      const buffer = Buffer.from(await mp3.arrayBuffer());

      // Overwrite the existing file with the new audio content
      await fs.promises.writeFile(speechFile, buffer);

      // Return the chat message and the path to the updated audio file
      return json({
        message: aiResponseText,
        audio: `/speech.mp3?t=${Date.now()}`, // Append timestamp to invalidate cache
      });
    } else {
      console.error('No choices found in the API response');
      return json(
        { message: 'Error: No response from the AI' },
        { status: 500 },
      );
    }
  } catch (error) {
    console.error('Error fetching from OpenAI:', error);
    return json({ message: 'Error fetching from AI' }, { status: 500 });
  }
}

import { json } from '@sveltejs/kit';
import fs from 'fs';
import path from 'path';
import OpenAI from 'openai';

export async function POST({ request }) {
  const { message, character, voice, prompt } = await request.json();
  const apiKey = import.meta.env.OPENAI_API_KEY;
  console.log(voice);
  const openai = new OpenAI({ apiKey });

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
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      }),
    });

    const data = await response.json();
    if (data?.choices?.length > 0) {
      const aiResponseText = data.choices[0].message.content;

      const speechFile = path.resolve('./static/speech.mp3');

      const mp3 = await openai.audio.speech.create({
        model: 'tts-1',
        voice: voice ? voice : 'alloy',
        input: aiResponseText,
      });

      const buffer = Buffer.from(await mp3.arrayBuffer());

      await fs.promises.writeFile(speechFile, buffer);

      return json({
        message: aiResponseText,
        audio: `/speech.mp3?t=${Date.now()}`,
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

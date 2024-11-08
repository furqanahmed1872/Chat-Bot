import { json } from '@sveltejs/kit';
import fs from 'fs';
import path from 'path';
import OpenAI from 'openai';
import { PRIVATE_OPENAI_API_KEY } from '$env/static/private';

export async function POST({ request }) {
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
    // for voice chat relay
    const data = await response.json();
    console.log(data);
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

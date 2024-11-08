import { json } from '@sveltejs/kit';
import { PRIVATE_OPENAI_API_KEY } from '$env/static/private';
import OpenAI from 'openai';

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

    const data = await response.json();
    if (data?.choices?.length > 0) {
      const aiResponseText = data.choices[0].message.content;

      // Request the speech synthesis directly
      const mp3 = await openai.audio.speech.create({
        model: 'tts-1',
        voice: voice ? voice : 'alloy',
        input: aiResponseText,
      });

      const buffer = Buffer.from(await mp3.arrayBuffer());

      // Return the audio buffer directly in the response
      return new Response(buffer, {
        status: 200,
        headers: {
          'Content-Type': 'audio/mp3',
          'Content-Disposition': 'inline; filename="speech.mp3"',
        },
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

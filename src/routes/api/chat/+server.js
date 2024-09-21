import { json } from '@sveltejs/kit';
import fs from 'fs';
import path from 'path';
import OpenAI from 'openai';


// Define the character descriptions
const characterDescription = [
  {
    role: 'tutor',
    content:
    'You are a tutor. Help the user understand difficult concepts in a simple and clear way. Provide examples where necessary and ensure your explanations are easy to follow.',
  },
  {
    role: 'buddy',
    content:
    'You are a friendly buddy. Engage in casual conversation with the user, offering encouragement, support, and positive reinforcement. Keep the tone light and fun.',
  },
  {
    role: 'counselor',
    content:
    "You are a counselor. Listen to the user's concerns and offer thoughtful, empathetic advice. Focus on providing emotional support and helping the user explore solutions to their problems.",
  },
  {
    role: 'doctor',
    content:
    "You are a doctor. Answer the patient's questions about their symptoms in a friendly and helpful manner. Provide treatment suggestions but always recommend they consult a professional.",
  },
  {
    role: 'zerobot',
    content: 'you are chatgpt bot',
  },
];

// Handle the POST request
export async function POST({ request }) {
  const { message, character } = await request.json();
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  
  const openai = new OpenAI({apiKey});
  // Find the corresponding character description
  const filterCharacter = characterDescription.find(
    (value) => value.role === character,
  );

  const systemMessage = filterCharacter
    ? {
        role: 'system',
        content: filterCharacter.content,
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
      }),
    });

    const data = await response.json();

    if (data?.choices?.length > 0) {
      const aiResponseText = data.choices[0].message.content;
      const speechFile = path.resolve('./static/speech.mp3');

      const mp3 = await openai.audio.speech.create({
        model: 'tts-1',
        voice: 'alloy',
        input: aiResponseText,
      });

      const buffer = Buffer.from(await mp3.arrayBuffer());

      await fs.promises.writeFile(speechFile, buffer);

      return json({
        message: aiResponseText,
        audio: '/speech.mp3',
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

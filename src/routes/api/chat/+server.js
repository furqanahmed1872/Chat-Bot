import { json } from '@sveltejs/kit';
import fs from 'fs';
import path from 'path';
import OpenAI from 'openai';

// Define the character descriptions
const characterDescription = [
  {
    role: 'tutor',
    content: 'You are a tutor...',
    welcomeNote:
      'Hello! I am your tutor. Let’s dive into your learning journey!',
  },
  {
    role: 'buddy',
    content: 'You are a friendly buddy...',
    welcomeNote: 'Hey buddy! How’s it going? I’m here to chat and have fun!',
  },
  {
    role: 'counselor',
    content: 'You are a counselor...',
    welcomeNote:
      'Hi there! I’m your counselor, ready to listen and offer support.',
  },
  {
    role: 'doctor',
    content: 'You are a doctor...',
    welcomeNote:
      'Hello! I’m your doctor. Let’s discuss your health and well-being.',
  },
  {
    role: 'zerobot',
    content: 'You are ChatGPT...',
    welcomeNote: 'Hi! I’m ChatGPT. How can I assist you today?',
  },
];

// Handle the POST request
export async function POST({ request }) {
  const { message, character } = await request.json();
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

  const openai = new OpenAI({ apiKey });
  // Find the corresponding character description
  const filterCharacter = characterDescription.find(
    (value) => value.role === character,
  );

  // Use the respective welcome note or a default one
  const welcomeNote = filterCharacter
    ? filterCharacter.welcomeNote
    : 'Hello! I am your helpful assistant. How can I assist you today?';

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
        temperature: 1,
        max_tokens: 100,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        response_format: {
          type: 'text',
        },
      }),
    });

    const data = await response.json();

    if (data?.choices?.length > 0) {
      const aiResponseText = data.choices[0].message.content;
      const speechFile = path.resolve('./static/speech.mp3');

      const mp3 = await openai.audio.speech.create({
        model: 'tts-1',
        voice: 'echo',
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

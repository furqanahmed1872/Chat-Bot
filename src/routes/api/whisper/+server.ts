// src/routes/api/whisper/+server.ts
import type { RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {
  const formData = await request.formData();
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  const audioFile = formData.get('file');

  if (!(audioFile instanceof Blob)) {
    return new Response(JSON.stringify({ error: 'Invalid file upload' }), {
      status: 400,
    });
  }

  const whisperResponse = await fetch(
    'https://api.openai.com/v1/audio/transcriptions',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
      body: formData,
    },
  );

  if (!whisperResponse.ok) {
    const errorData = await whisperResponse.json();
    return new Response(JSON.stringify({ error: errorData }), {
      status: whisperResponse.status,
    });
  }

  const whisperData = await whisperResponse.json();
  const transcription = whisperData.text;

  return new Response(JSON.stringify({ transcription }), {
    status: 200,
  });
};



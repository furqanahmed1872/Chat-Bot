// src/routes/api/whisper/+server.ts
import type { RequestHandler } from '@sveltejs/kit';
import { PRIVATE_OPENAI_API_KEY } from '$env/static/private';

export const POST: RequestHandler = async ({ request }) => {
  const formData = await request.formData();
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
        Authorization: `Bearer ${PRIVATE_OPENAI_API_KEY}`,
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



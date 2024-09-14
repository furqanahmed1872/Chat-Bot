import { json } from '@sveltejs/kit';

export async function POST({ request }) {
  const { message } = await request.json();
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY; // Use VITE_ prefix for environment variables in SvelteKit

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo', // or 'gpt-3.5-turbo'

        messages: [
          {
            role: 'system',
            content:
              "You are a doctor. Answer the patient's questions about their symptoms in a friendly and helpful manner. Provide treatment suggestions but always recommend they consult a professional.",
          },
          {
            role: 'user',
            content: 'I have a fever and body aches. What could this be?',
          },
        ],
      }),
    });

    const data = await response.json();
    console.log('API Response:', data);

    if (data?.choices?.length > 0) {
      return json({ message: data.choices[0].message.content });
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

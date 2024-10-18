import { json } from '@sveltejs/kit';
import Stripe from 'stripe';
const stripesecretKey = import.meta.env.VITE_stripe_secret_key;
const stripe = new Stripe(stripesecretKey);

export async function POST({ request }) {
  const body = await request.text();
  const sig = request.headers.get('Stripe-Signature');

  let event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, 'YOUR_WEBHOOK_SECRET');
  } catch (err) {
    console.error('Webhook signature verification failed.', err);
    return json({ error: 'Webhook Error' }, { status: 400 });
  }

  // Handle the event (e.g., update Supabase or notify users)
  switch (event.type) {
    case 'checkout.session.completed':
      // Handle successful payment here
      break;
    case 'invoice.payment_failed':
      // Handle failed payment here
      break;
    // Add more cases as needed
  }

  return json({ received: true });
}

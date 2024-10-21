import { json } from '@sveltejs/kit';
import Stripe from 'stripe';
import {
  PRIVATE_STRIPE_SECRET_KEY,
  PRIVATE_STRIPE_WEBHOOK_SECRET,
} from '$env/static/private';

// Initialize Stripe
const stripe = new Stripe(PRIVATE_STRIPE_SECRET_KEY);
const endpointSecret = PRIVATE_STRIPE_WEBHOOK_SECRET;

export async function POST({ request }) {
  const sig = request.headers.get('stripe-signature');

  // Fetch raw body for signature validation
  const body = await request.text();

  // Log the body and signature for debugging
  console.log('Incoming Request Body:', body);
  console.log('Stripe Signature:', sig);

  if (!sig) {
    return json({ error: 'Missing stripe-signature header' }, { status: 400 });
  }

  try {
    // Construct the event using the raw body
    const event = stripe.webhooks.constructEvent(body, sig, endpointSecret);

    // Handle the event as before
    switch (event.type) {
      case 'checkout.session.completed':
        console.log('Payment successful!');
        // Mark user subscription active in the database
        break;
      case 'invoice.payment_succeeded':
        console.log('Invoice payment succeeded');
        // Update subscription info in the database
        break;
      case 'invoice.payment_failed':
        console.log('Invoice payment failed');
        // Notify the user about payment failure
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    return json({ received: true }, { status: 200 });
  } catch (err) {
    // Handle errors
    if (err instanceof Error) {
      console.log(`Webhook Error: ${err.message}`);
      return json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
    } else {
      console.log('Unknown error occurred');
      return json({ error: 'Unknown error occurred' }, { status: 400 });
    }
  }
}

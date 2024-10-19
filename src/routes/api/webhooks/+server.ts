import { json } from '@sveltejs/kit';
import Stripe from 'stripe';
import { STRIPE_SECRET_KEY } from '$env/static/private';
// Initialize Stripe
const stripe = new Stripe('sk_test_YOUR_SECRET_KEY');

// Secret key for verifying Stripe webhook signatures
const endpointSecret = STRIPE_SECRET_KEY;

export async function POST({ request }) {
  const sig = request.headers.get('stripe-signature');
  const body = await request.text(); // Fetch raw body for signature validation

  // If the signature header is missing, return an error
  if (!sig) {
    return json({ error: 'Missing stripe-signature header' }, { status: 400 });
  }

  try {
    const event = stripe.webhooks.constructEvent(body, sig, endpointSecret);

    // Handle the events you want here
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
      // Add more event types as necessary
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    return json({ received: true });
  } catch (err) {
    // Type guard to ensure err is an instance of Error
    if (err instanceof Error) {
      console.log(`Webhook Error: ${err.message}`);
      return json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
    } else {
      console.log('Unknown error occurred');
      return json({ error: 'Unknown error occurred' }, { status: 400 });
    }
  }
}

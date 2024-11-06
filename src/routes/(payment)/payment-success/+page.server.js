// @ts-nocheck
import Stripe from 'stripe';
import { PRIVATE_STRIPE_SECRET_KEY } from '$env/static/private';
const stripe = new Stripe(PRIVATE_STRIPE_SECRET_KEY);

export const load = async ({ url }) => {
  const sessionId = url.searchParams.get('session_id');
  let success = false;

  try {
    // Fetch the checkout session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    // console.log('Checkout Session:', session);
    console.log('Payment Status:', session.payment_status);

    if (session && session.payment_status === 'paid') {
      success = true;

      // Update your database to add voice chat time to the user's account
      // For example: addVoiceChatTime(userId, purchasedMinutes);
    } else {
      console.log('Payment status not paid');
    }
  } catch (error) {
    console.error('Error retrieving session:', error);
  }

  return {
    success,
  };
};


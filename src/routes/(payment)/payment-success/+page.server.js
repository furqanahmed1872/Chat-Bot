// @ts-nocheck
import Stripe from 'stripe';
const stripe = new Stripe(
  'sk_test_51Q8cOH09ae66bEMAxYyXoSWDt45TLuSGZYjYy6UAVTIEDYJne8ZjKbLdLPxPhWfXl8ET4xka7HC1UbtlCtu9bcqQ00eWNLztP1',
);

export const load = async ({ url }) => {
  const sessionId = url.searchParams.get('session_id');
  let success = false;

  try {
    // Fetch the checkout session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session && session.payment_status === 'paid') {
      success = true;

      // Here, you can update your database to add voice chat time to the user's account
      // For example: addVoiceChatTime(userId, purchasedMinutes);
    }
  } catch (error) {
    console.error('Error retrieving session:', error.message);
  }

  return {
    success,
  };
};

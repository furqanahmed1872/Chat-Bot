// @ts-nocheck
import Stripe from 'stripe';
const stripe = new Stripe(
  'sk_test_51Q8cOH09ae66bEMAxYyXoSWDt45TLuSGZYjYy6UAVTIEDYJne8ZjKbLdLPxPhWfXl8ET4xka7HC1UbtlCtu9bcqQ00eWNLztP1',
);

export const POST = async ({ request }) => {
  const { planId } = await request.json(); // Receive the selected plan ID from the frontend

  // Map plan ID to Stripe Price ID (set these up in your Stripe dashboard)
  const priceIds = {
    '20-minutes': 'price_1QAnEK09ae66bEMAZjSScKk0', // Replace with actual Stripe Price ID
    '1-hour': 'price_1QAnEw09ae66bEMAqQbVa4YT',
    '10-hours': 'price_1QAnFK09ae66bEMAwWPxoxGw',
  };

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceIds[planId],
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.PUBLIC_BASE_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.PUBLIC_BASE_URL}/payment-failure`,
    });

    return new Response(JSON.stringify({ id: session.id }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
};

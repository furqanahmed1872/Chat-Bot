import { createClient } from '@supabase/supabase-js';
import Stripe from 'stripe';
import { PRIVATE_STRIPE_SECRET_KEY } from '$env/static/private';
import {
  PUBLIC_SUPABASE_URL,
  PUBLIC_SUPABASE_ANON_KEY,
} from '$env/static/public';
const stripe = new Stripe(PRIVATE_STRIPE_SECRET_KEY);
const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY);

export const POST = async ({ request }) => {
  const { user_id, price_id } = await request.json(); // Fetch user ID and selected plan ID

  // Fetch existing Stripe customer ID and email from Supabase
  const { data: userData, error } = await supabase
    .from('users')
    .select('stripe_customer_id, email')
    .eq('id', user_id)
    .single();

  let stripeCustomerId = userData?.stripe_customer_id;
  let customerEmail = userData?.email; // Get the user's email

  // If the customer doesn't exist, create a new one in Stripe
  if (!stripeCustomerId) {
    const customer = await stripe.customers.create({
      email: customerEmail, // Create the Stripe customer with the email
      metadata: { supabase_user_id: user_id },
    });
    stripeCustomerId = customer.id;

    // Save the Stripe customer ID to Supabase for future reference
    await supabase
      .from('users')
      .update({ stripe_customer_id: stripeCustomerId })
      .eq('id', user_id);
  }

  // Create a Stripe Checkout session with customer email and existing customer ID
  const session = await stripe.checkout.sessions.create({
    customer_email: customerEmail, // Pass customer email for auto-filling payment info
    customer: stripeCustomerId, // Use existing customer ID
    payment_method_types: ['card'],
    mode: 'subscription',
    line_items: [
      {
        price: price_id, // The price ID of the selected plan
        quantity: 1,
      },
    ],
    success_url: `${YOUR_DOMAIN}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${YOUR_DOMAIN}/cancel`,
  });

  return {
    status: 200,
    body: { sessionId: session.id },
  };
};

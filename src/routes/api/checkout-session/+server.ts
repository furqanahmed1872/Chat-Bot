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
  const { user_id, price_id } = await request.json();

  const { data: userData, error } = await supabase
    .from('users')
    .select('stripe_customer_id, email')
    .eq('id', user_id)
    .single();

  let stripeCustomerId = userData?.stripe_customer_id;
  let customerEmail = userData?.email;

  if (!stripeCustomerId) {
    const customer = await stripe.customers.create({
      email: customerEmail,
      metadata: { supabase_user_id: user_id },
    });
    stripeCustomerId = customer.id;

    await supabase
      .from('users')
      .update({ stripe_customer_id: stripeCustomerId })
      .eq('id', user_id);
  }

  const session = await stripe.checkout.sessions.create({
    // customer_email: customerEmail,
    customer: stripeCustomerId,
    payment_method_types: ['card'],
    mode: 'subscription',
    line_items: [
      {
        price: price_id,
        quantity: 1,
      },
    ],
    // success_url:'http://localhost:3000',
    success_url: `https://chat-bot-kappa-ruby.vercel.app/payment-success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `https://chat-bot-kappa-ruby.vercel.app/payment-failure`,
  });

  // console.log('testid >>>>>>>>>>>>>>', session);
  return new Response(JSON.stringify({ sessionId: session.id }), {
    status: 200,
  });
};

import { createClient } from '@supabase/supabase-js';
import { json, redirect } from '@sveltejs/kit';
import Stripe from 'stripe';
import {
  PRIVATE_STRIPE_SECRET_KEY,
  PRIVATE_STRIPE_WEBHOOK_SECRET,
} from '$env/static/private';
import {
  PUBLIC_SUPABASE_URL,
  PUBLIC_SUPABASE_ANON_KEY,
} from '$env/static/public';

export async function POST({ request, event }) {
  console.log('hit me >>>>>>>>>>>>>>>>>>');
  const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY);

  const stripe = new Stripe(PRIVATE_STRIPE_SECRET_KEY);
  const endpointSecret = PRIVATE_STRIPE_WEBHOOK_SECRET;

  const sig = request.headers.get('stripe-signature');
  const rawBody = await request.text(); 
  if (!sig) {
    return json({ error: 'Missing stripe-signature header' }, { status: 400 });
  }

  let stripeEvent;

  try {
    // Construct the event using the raw body
    stripeEvent = stripe.webhooks.constructEvent(rawBody, sig, endpointSecret);
  } catch (err) {
    console.log(`Webhook Error: ${err.message}`);
    return json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  const customerId = stripeEvent.data.object.customer; // Accessing the Stripe event object

  const { data: user, error } = await supabase
    .from('users')
    .select('*')
    .eq('stripe_customer_id', customerId)
    .single();

  console.log(user); // Get the logged-in user

  if (user) {
    // console.log('Incoming Request Body:', rawBody);
    // console.log('Stripe Signature:', sig);

    // Handle the Stripe event
    switch (stripeEvent.type) {
      // 1. Checkout session completed
      case 'checkout.session.completed': {
        const session = stripeEvent.data.object;
        const subscriptionId = session.subscription;

        console.log(`Checkout completed for customer ${user.email}`);

        // Fetch subscription details from Stripe
        const subscription =
          await stripe.subscriptions.retrieve(subscriptionId);

        // Check if a subscription already exists for this user
        const { data: existingSubscription, error: fetchError } = await supabase
          .from('subscriptions')
          .select('*')
          .eq('user_id', user.id)
          // .eq('subscription_id', subscriptionId)
          .single();

        if (fetchError) {
          console.log(
            'Error fetching existing subscription:',
            fetchError.message,
          );
          return json(
            { error: 'Error fetching existing subscription' },
            { status: 500 },
          );
        }

        // Prepare subscription data to save
        const subscriptionData = {
          user_id: user.id,
          subscription_id: subscriptionId,
          status: subscription.status,
          plan_id: subscription.items.data[0].price.product,
          current_period_start: new Date(
            subscription.current_period_start * 1000,
          ),
          current_period_end: new Date(subscription.current_period_end * 1000),
          plan_amount: subscription.items.data[0].price.unit_amount/100,
          currency: subscription.items.data[0].price.currency,
          interval: subscription.items.data[0].price.recurring?.interval,
          updated_at: new Date(),
        };
        console.log(subscriptionData);
        if (existingSubscription) {
          // Update the existing subscription
          const { error: updateError } = await supabase
            .from('subscriptions')
            .update(subscriptionData)
            .eq('id', existingSubscription.id);

          if (updateError) {
            console.log('Error updating subscription:', updateError.message);
          } else {
            console.log('Subscription updated in the database');
          }
        } else {
          // Insert new subscription record
          const { error: insertError } = await supabase
            .from('subscriptions')
            .insert({
              ...subscriptionData,
              created_at: new Date(), // Only set created_at on insert
            });

          if (insertError) {
            console.log('Error saving subscription:', insertError.message);
          } else {
            console.log('Subscription saved to database');
          }
        }

        // Redirect to success page
        // throw redirect(302, '/payment-success?session_id=' + session.id);
      }

      // 2. Invoice payment succeeded
      case 'invoice.payment_succeeded': {
        const invoice = stripeEvent.data.object;
        const subscriptionId = invoice.subscription;

        console.log(`Payment succeeded for subscription ${subscriptionId}`);

        // Update subscription status in Supabase
        const { error } = await supabase
          .from('subscriptions')
          .update({
            status: 'active',
            last_payment_status: 'succeeded',
            updated_at: new Date(),
          })
          .eq('subscription_id', subscriptionId);

        if (error) {
          console.log('Error updating subscription:', error.message);
        } else {
          console.log('Subscription updated to active in the database');
        }
        break;
      }

      // 3. Invoice payment failed
      case 'invoice.payment_failed': {
        const invoice = stripeEvent.data.object;
        const subscriptionId = invoice.subscription;

        console.log(`Payment failed for subscription ${subscriptionId}`);

        // Update Supabase to mark the subscription as past due
        const { error } = await supabase
          .from('subscriptions')
          .update({
            status: 'past_due',
            last_payment_status: 'failed',
            updated_at: new Date(),
          })
          .eq('subscription_id', subscriptionId);

        if (error) {
          console.log('Error updating subscription:', error.message);
        } else {
          console.log('Subscription marked as past_due in the database');
        }

        // Redirect user to payment failure page
        throw redirect(
          302,
          '/payment-failed?subscription_id=' + subscriptionId,
        );
      }

      // 4. Unhandled event types
      default:
        console.log(`Unhandled event type: ${stripeEvent.type}`);
    }

    return json({ received: true }, { status: 200 });
  } else {
    console.log('No user found. Unable to process webhook.');
    return json({ error: 'User not authenticated' }, { status: 403 });
  }
}

import { createClient } from '@supabase/supabase-js';
import { json, redirect } from '@sveltejs/kit'; // Import redirect
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
  const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY);

  const stripe = new Stripe(PRIVATE_STRIPE_SECRET_KEY);
  const endpointSecret = PRIVATE_STRIPE_WEBHOOK_SECRET;

  const sig = request.headers.get('stripe-signature');
  const customerId = event.data.object.customer;
  const { data: user, error } = await supabase
    .from('users')
    .select('*')
    .eq('stripe_customer_id', customerId)
    .single();

  console.log(user); // Get the logged-in user
  const body = await request.text();

  if (user) {
    console.log('Incoming Request Body:', body);
    console.log('Stripe Signature:', sig);

    if (!sig) {
      return json(
        { error: 'Missing stripe-signature header' },
        { status: 400 },
      );
    }

    try {
      // Construct the event using the raw body
      const event = stripe.webhooks.constructEvent(body, sig, endpointSecret);

      // Handle the Stripe event
      switch (event.type) {
        // 1. Checkout session completed
        case 'checkout.session.completed': {
          const session = event.data.object;
          const subscriptionId = session.subscription;

          console.log(`Checkout completed for customer ${user.email}`);

          // Fetch subscription details from Stripe
          const subscription = await stripe.subscriptions.retrieve(
            subscriptionId as string,
          );

          // Update supabase with subscription data
          const { error } = await supabase.from('subscriptions').insert({
            user_id: user.id,
            subscription_id: subscriptionId,
            status: subscription.status,
            plan_id: subscription.items.data[0].price.product,
            current_period_start: new Date(
              subscription.current_period_start * 1000,
            ),
            current_period_end: new Date(
              subscription.current_period_end * 1000,
            ),
            plan_amount: subscription.items.data[0].price.unit_amount,
            currency: subscription.items.data[0].price.currency,
            interval: subscription.items.data[0].price.recurring?.interval,
            created_at: new Date(),
          });

          if (error) {
            console.log('Error saving subscription:', error.message);
          } else {
            console.log('Subscription saved to database');
          }

          // Redirect to success page
          throw redirect(302, '/payment-success?session_id=' + session.id); // Use redirect
        }

        // 2. Invoice payment succeeded
        case 'invoice.payment_succeeded': {
          const invoice = event.data.object;
          const subscriptionId = invoice.subscription;

          console.log(`Payment succeeded for subscription ${subscriptionId}`);

          // Update subscription status in supabase
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
          const invoice = event.data.object;
          const subscriptionId = invoice.subscription;

          console.log(`Payment failed for subscription ${subscriptionId}`);

          // Update supabase to mark the subscription as past due
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
          ); // Use redirect
        }

        // 4. Unhandled event types
        default:
          console.log(`Unhandled event type: ${event.type}`);
      }

      return json({ received: true }, { status: 200 });
    } catch (err) {
      // Handle errors
      if (err instanceof Error) {
        console.log(`Webhook Error: ${err.message}`);
        return json(
          { error: `Webhook Error: ${err.message}` },
          { status: 400 },
        );
      } else {
        console.log('Unknown error occurred');
        return json({ error: 'Unknown error occurred' }, { status: 400 });
      }
    }
  } else {
    console.log('No user found. Unable to process webhook.');
    return json({ error: 'User not authenticated' }, { status: 403 });
  }
}

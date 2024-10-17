<script>
// @ts-nocheck

  import { loadStripe } from '@stripe/stripe-js';
  const stripePromise = loadStripe(
    'pk_test_51Q8cOH09ae66bEMAz3pyc7Mvp1aLsJXRuHgP1y1CgLRq5nUVUwpBNfCfsoaictQRXdHumzV9VZUc4hZWVtfbnI0e00pVitZdnP',
  );

  async function handleCheckout(planId) {
    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ planId }),
    });

    const { id } = await response.json();
    const stripe = await stripePromise;
    await stripe.redirectToCheckout({ sessionId: id });
  }
</script>

<button on:click="{() => handleCheckout('20-minutes')}"
  >Buy 20 minutes for $5</button
>
<button on:click="{() => handleCheckout('1-hour')}">Buy 1 hour for $12</button>
<button on:click="{() => handleCheckout('10-hours')}"
  >Buy 10 hours for $50</button
>

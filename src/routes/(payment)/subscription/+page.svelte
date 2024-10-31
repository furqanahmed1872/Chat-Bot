<script lang="ts">
  import { PUBLIC_STRIPE_PUBLISHABLE_KEY } from '$env/static/public';
  import { loadStripe } from '@stripe/stripe-js';
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';

  export let data;
  let stripe = null;
  onMount(async () => {
    stripe = await loadStripe(PUBLIC_STRIPE_PUBLISHABLE_KEY);
    if (!stripe) {
      console.error('Stripe failed to initialize');
    }
  });
  async function handleSelectPlan(priceId: string) {
    try {
      const response = await fetch('/api/checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ price_id: priceId, user_id: data.userID }), // Replace with actual user and price details
      });

      if (!response.ok) {
        const errorDetail = await response.json();
        console.error('Error creating checkout session:', errorDetail);
        return;
      }

      const detail = await response.json();
      const { sessionId } = detail;

      await stripe.redirectToCheckout({ sessionId });
    } catch (error) {
      console.error('Error handling the plan selection:', error);
    }
  }
</script>

<div
  class="w-full min-h-screen bg-slate-700 p-2 flex justify-center flex-col gap-20 items-center"
>
  <div>
    <p class="text-5xl text-center text-white font-light">"Unlock AI Power"</p>
    <p class="text-base text-center italic text-white">
      Select a plan and start interacting with your AI characters today.
    </p>
  </div>

  <div class="grid grid-cols-1 gap-8 md:grid-cols-3">
    <!-- Free Plan -->
    <div
      class=" grow-0 w-[300px] h-fit p-6 overflow-hidden col-span-1 bg-zinc-300 shadow-md rounded-lg"
    >
      <h2 class="text-xl font-medium text-gray-800">Free Plan</h2>
      <div class="flex flex-row items-center gap-1 mt-11">
        <div class="text-4xl font-bold">US$0</div>
        <p class="leading-snug text-xs opacity-50">per<br />month</p>
      </div>
      <button
        on:click="{() => {
          goto('/');
        }}"
        id="subscribe-free"
        class="mt-5 w-full px-1 bg-[#7a8690] text-white font-medium py-2.5 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        Get Started
      </button>
      <p class="mt-2 text-sm opacity-90">This includes:</p>
      <ul class="mt-4 custom-list text-sm opacity-90">
        <li class="flex flex-row gap-4 items-center">
          <svg
            class="InlineSVG Icon PriceColumn-check Icon--sm"
            focusable="false"
            fill="#1a1a1a"
            color="#1a1a1a"
            fill-opacity="0.5"
            height="12"
            viewBox="0 0 16 16"
            width="12"
          >
            <path
              d="m8 16c-4.418278 0-8-3.581722-8-8s3.581722-8 8-8 8 3.581722 8 8-3.581722 8-8 8zm3.0832728-11.00479172-4.0832728 4.09057816-1.79289322-1.79289322c-.39052429-.39052429-1.02368927-.39052429-1.41421356 0s-.39052429 1.02368927 0 1.41421356l2.5 2.50000002c.39052429.3905243 1.02368927.3905243 1.41421356 0l4.79037962-4.79768495c.3905243-.3905243.3905243-1.02368927 0-1.41421357-.3905243-.39052429-1.0236893-.39052429-1.4142136 0z"
              fill-rule="evenodd"
            ></path>
          </svg>AI Character Chat
        </li>
        <li class="my-2 flex flex-row gap-4 items-center">
          <svg
            class="InlineSVG Icon PriceColumn-check Icon--sm"
            focusable="false"
            fill="#1a1a1a"
            color="#1a1a1a"
            fill-opacity="0.5"
            height="12"
            viewBox="0 0 16 16"
            width="12"
          >
            <path
              d="m8 16c-4.418278 0-8-3.581722-8-8s3.581722-8 8-8 8 3.581722 8 8-3.581722 8-8 8zm3.0832728-11.00479172-4.0832728 4.09057816-1.79289322-1.79289322c-.39052429-.39052429-1.02368927-.39052429-1.41421356 0s-.39052429 1.02368927 0 1.41421356l2.5 2.50000002c.39052429.3905243 1.02368927.3905243 1.41421356 0l4.79037962-4.79768495c.3905243-.3905243.3905243-1.02368927 0-1.41421357-.3905243-.39052429-1.0236893-.39052429-1.4142136 0z"
              fill-rule="evenodd"
            ></path>
          </svg>AI Character Make
        </li>
        <li class="flex flex-row gap-4 items-center">
          <svg
            class="InlineSVG Icon PriceColumn-check Icon--sm"
            focusable="false"
            fill="#1a1a1a"
            color="#1a1a1a"
            fill-opacity="0.5"
            height="12"
            viewBox="0 0 16 16"
            width="12"
          >
            <path
              d="m8 16c-4.418278 0-8-3.581722-8-8s3.581722-8 8-8 8 3.581722 8 8-3.581722 8-8 8zm3.0832728-11.00479172-4.0832728 4.09057816-1.79289322-1.79289322c-.39052429-.39052429-1.02368927-.39052429-1.41421356 0s-.39052429 1.02368927 0 1.41421356l2.5 2.50000002c.39052429.3905243 1.02368927.3905243 1.41421356 0l4.79037962-4.79768495c.3905243-.3905243.3905243-1.02368927 0-1.41421357-.3905243-.39052429-1.0236893-.39052429-1.4142136 0z"
              fill-rule="evenodd"
            ></path>
          </svg>AI Voice Chat
        </li>
      </ul>
    </div>
    <!-- basic Plan -->
    <div
      class="bg-zinc-300 shadow-md rounded-lg grow-0 w-[300px] h-fit p-6 overflow-hidden col-span-1"
    >
      <h2 class="text-xl font-medium text-gray-800">Baisc Plan</h2>
      <div class="flex flex-row items-center gap-1 mt-11">
        <div class="text-4xl font-bold">US$5</div>
        <p class="leading-snug text-xs opacity-50">per<br />month</p>
      </div>
      <button
        on:click="{() => handleSelectPlan('price_1QBDs909ae66bEMAxEIR1TD4')}"
        id="subscribe-free"
        class="mt-5 w-full px-1 bg-[#7a8690] text-white font-medium py-2.5 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        Subscribe
      </button>
      <p class="mt-2 text-sm opacity-90">This includes:</p>
      <ul class="mt-4 custom-list text-sm opacity-90">
        <li class="flex flex-row gap-4 items-center">
          <svg
            class="InlineSVG Icon PriceColumn-check Icon--sm"
            focusable="false"
            fill="#1a1a1a"
            color="#1a1a1a"
            fill-opacity="0.5"
            height="12"
            viewBox="0 0 16 16"
            width="12"
          >
            <path
              d="m8 16c-4.418278 0-8-3.581722-8-8s3.581722-8 8-8 8 3.581722 8 8-3.581722 8-8 8zm3.0832728-11.00479172-4.0832728 4.09057816-1.79289322-1.79289322c-.39052429-.39052429-1.02368927-.39052429-1.41421356 0s-.39052429 1.02368927 0 1.41421356l2.5 2.50000002c.39052429.3905243 1.02368927.3905243 1.41421356 0l4.79037962-4.79768495c.3905243-.3905243.3905243-1.02368927 0-1.41421357-.3905243-.39052429-1.0236893-.39052429-1.4142136 0z"
              fill-rule="evenodd"
            ></path>
          </svg>AI Character Chat
        </li>
        <li class="my-2 flex flex-row gap-4 items-center">
          <svg
            class="InlineSVG Icon PriceColumn-check Icon--sm"
            focusable="false"
            fill="#1a1a1a"
            color="#1a1a1a"
            fill-opacity="0.5"
            height="12"
            viewBox="0 0 16 16"
            width="12"
          >
            <path
              d="m8 16c-4.418278 0-8-3.581722-8-8s3.581722-8 8-8 8 3.581722 8 8-3.581722 8-8 8zm3.0832728-11.00479172-4.0832728 4.09057816-1.79289322-1.79289322c-.39052429-.39052429-1.02368927-.39052429-1.41421356 0s-.39052429 1.02368927 0 1.41421356l2.5 2.50000002c.39052429.3905243 1.02368927.3905243 1.41421356 0l4.79037962-4.79768495c.3905243-.3905243.3905243-1.02368927 0-1.41421357-.3905243-.39052429-1.0236893-.39052429-1.4142136 0z"
              fill-rule="evenodd"
            ></path>
          </svg>Make upto 10 AI character
        </li>
        <li class="flex flex-row gap-4 items-center">
          <svg
            class="InlineSVG Icon PriceColumn-check Icon--sm"
            focusable="false"
            fill="#1a1a1a"
            color="#1a1a1a"
            fill-opacity="0.5"
            height="12"
            viewBox="0 0 16 16"
            width="12"
          >
            <path
              d="m8 16c-4.418278 0-8-3.581722-8-8s3.581722-8 8-8 8 3.581722 8 8-3.581722 8-8 8zm3.0832728-11.00479172-4.0832728 4.09057816-1.79289322-1.79289322c-.39052429-.39052429-1.02368927-.39052429-1.41421356 0s-.39052429 1.02368927 0 1.41421356l2.5 2.50000002c.39052429.3905243 1.02368927.3905243 1.41421356 0l4.79037962-4.79768495c.3905243-.3905243.3905243-1.02368927 0-1.41421357-.3905243-.39052429-1.0236893-.39052429-1.4142136 0z"
              fill-rule="evenodd"
            ></path>
          </svg>AI voice chat for 1 hour
        </li>
      </ul>
    </div>
    <!-- premium Plan -->
    <div
      class="bg-zinc-300 shadow-md rounded-lg grow-0 w-[300px] h-fit p-6 overflow-hidden col-span-1"
    >
      <h2 class="text-xl font-medium text-gray-800">Premium Plan</h2>
      <div class="flex flex-row items-center gap-1 mt-11">
        <div class="text-4xl font-bold">US$12</div>
        <p class="leading-snug text-xs opacity-50">per<br />month</p>
      </div>
      <button
        on:click="{() => handleSelectPlan('price_1QBE1O09ae66bEMALmnMxPTq')}"
        id="subscribe-free"
        class="mt-5 w-full px-1 bg-[#7a8690] text-white font-medium py-2.5 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        Subscribe
      </button>
      <p class="mt-2 text-sm opacity-90">This includes:</p>
      <ul class="mt-4 custom-list text-sm opacity-90">
        <li class="flex flex-row gap-4 items-center">
          <svg
            class="InlineSVG Icon PriceColumn-check Icon--sm"
            focusable="false"
            fill="#1a1a1a"
            color="#1a1a1a"
            fill-opacity="0.5"
            height="12"
            viewBox="0 0 16 16"
            width="12"
          >
            <path
              d="m8 16c-4.418278 0-8-3.581722-8-8s3.581722-8 8-8 8 3.581722 8 8-3.581722 8-8 8zm3.0832728-11.00479172-4.0832728 4.09057816-1.79289322-1.79289322c-.39052429-.39052429-1.02368927-.39052429-1.41421356 0s-.39052429 1.02368927 0 1.41421356l2.5 2.50000002c.39052429.3905243 1.02368927.3905243 1.41421356 0l4.79037962-4.79768495c.3905243-.3905243.3905243-1.02368927 0-1.41421357-.3905243-.39052429-1.0236893-.39052429-1.4142136 0z"
              fill-rule="evenodd"
            ></path>
          </svg>AI Character Chat
        </li>
        <li class="my-2 flex flex-row gap-4 items-center">
          <svg
            class="InlineSVG Icon PriceColumn-check Icon--sm"
            focusable="false"
            fill="#1a1a1a"
            color="#1a1a1a"
            fill-opacity="0.5"
            height="12"
            viewBox="0 0 16 16"
            width="12"
          >
            <path
              d="m8 16c-4.418278 0-8-3.581722-8-8s3.581722-8 8-8 8 3.581722 8 8-3.581722 8-8 8zm3.0832728-11.00479172-4.0832728 4.09057816-1.79289322-1.79289322c-.39052429-.39052429-1.02368927-.39052429-1.41421356 0s-.39052429 1.02368927 0 1.41421356l2.5 2.50000002c.39052429.3905243 1.02368927.3905243 1.41421356 0l4.79037962-4.79768495c.3905243-.3905243.3905243-1.02368927 0-1.41421357-.3905243-.39052429-1.0236893-.39052429-1.4142136 0z"
              fill-rule="evenodd"
            ></path>
          </svg>Make upto 25 AI character
        </li>
        <li class="flex flex-row gap-4 items-center">
          <svg
            class="InlineSVG Icon PriceColumn-check Icon--sm"
            focusable="false"
            fill="#1a1a1a"
            color="#1a1a1a"
            fill-opacity="0.5"
            height="12"
            viewBox="0 0 16 16"
            width="12"
          >
            <path
              d="m8 16c-4.418278 0-8-3.581722-8-8s3.581722-8 8-8 8 3.581722 8 8-3.581722 8-8 8zm3.0832728-11.00479172-4.0832728 4.09057816-1.79289322-1.79289322c-.39052429-.39052429-1.02368927-.39052429-1.41421356 0s-.39052429 1.02368927 0 1.41421356l2.5 2.50000002c.39052429.3905243 1.02368927.3905243 1.41421356 0l4.79037962-4.79768495c.3905243-.3905243.3905243-1.02368927 0-1.41421357-.3905243-.39052429-1.0236893-.39052429-1.4142136 0z"
              fill-rule="evenodd"
            ></path>
          </svg>AI voice chat for 2.5 hours
        </li>
      </ul>
    </div>
  </div>
</div>

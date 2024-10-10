<script lang="ts">
  import { goto } from '$app/navigation';
  import { Button } from '$lib/components/ui/button/index.js';
  import * as Card from '$lib/components/ui/card/index.js';
  import Carousel from '$lib/components/mainpage/carousel.svelte';
  import { Checkbox } from '$lib/components/ui/checkbox';
  import { Input } from '$lib/components/ui/input/index.js';
  import { Label } from '$lib/components/ui/label/index.js';

  export let data;
</script>

<!-- Header -->
<nav
  class="bg-secondary w-full h-fit py-5 grid grid-cols-3 justify-items-center"
>
  <ul class="flex items-center">
    <img
      src="./icon.png"
      alt="Logo"
      class="hidden sm:block sm:w-12 sm:h-12 lg:w-14 lg:h-14"
    />
    <li
      class="text-2xl sm:text-3xl font-light ml-2 no-underline px-2 py-2 text-primary cursor-pointer pullRightLeft relative group"
    >
      DivineBot
      <!-- Darkened background overlay on hover -->
      <span
        class="absolute inset-0 bg-primary opacity-0 group-hover:opacity-20 transition-opacity duration-300"
      ></span>
    </li>
  </ul>
  <div></div>
  <ul class="flex items-center space-x-4">
    <button
      on:click="{() => goto('/chat')}"
      class="text-xl sm:text-2xl lg:text-3xl px-2 py-2 text-primary font-semibold cursor-pointer pullRightLeft relative group"
    >
      Chat
      <!-- Darkened background overlay on hover -->
      <span
        class="absolute inset-0 bg-primary opacity-0 group-hover:opacity-20 transition-opacity duration-300"
      ></span>
    </button>
  </ul>
</nav>

<!-- Front page -->

<div
  class="relative h-screen bg-cover grid place-content-around"
  style="background-image: url('./front.jpg')"
>
  <div class=" text-center">
    <!-- Logo with subtle pulsing animation -->
    <img
      src="./largeicon.png"
      alt="Logo"
      class="w-60 h-60 sm:w-40 sm:h-40 md:w-60 md:h-60 lg:w-72 lg:h-72 xl:w-96 xl:h-96 mx-auto animate-pulse-slow"
    />
    <!-- Text with continuous floating effect -->
    <p
      class="text-secondary text-3xl sm:text-5xl lg:text-5xl xl:text-7xl font-bold mt-6 sm:mt-10 animate-float animate-once animate-duration-1000"
    >
      Empowering humanity,<br />word by word
    </p>
  </div>
</div>

<!-- IMP-info -->

<div
  class="grid bg-secondary text-center items-center justify-center p-8 sm:p-36"
>
  <div class="text-2xl sm:text-4xl font-bold mb-4 text-darkBlue">
    Meet DivineBot
  </div>
  <div
    class="w-full xl:w-11/12 2xl:w-1/2 mx-auto text-center text-lg sm:text-xl text-primary font-medium"
  >
    Meet DivineBot, the Internet's #1 voice-enabled chatbot! Imagine having a
    conversation with a computer friend who talks with you just like a real
    person. With DivineBot, it's not just typing – it's talking! Get ready to
    chat in a whole new way. Now with the Groq LPU™ Inference Engine for the
    world's fastest inference speed for LLMs via the alpha version of Groq API,
    your chats are instant and effortlessly smooth.
  </div>
</div>

<!-- Agent -->

<Carousel data="{data}" />

<!-- Explore -->

<div
  class="grid justify-center items-center text-center bg-secondary h-fit p-10 sm:p-20 gap-3"
>
  <div class="font-semibold text-xl sm:text-3xl lg:text-4xl text-primary">
    Explore our AI agent store
  </div>
  <div class="text-darkBlue font-light text-lg sm:text-xl my-5">
    Discover a diverse range of AI agents tailored to meet your unique needs.
  </div>
  <button
    on:click="{() => goto('/store')}"
    class="bg-lightBlue text-white font-normal hover:bg-primary w-fit mx-auto rounded-3xl px-6 sm:px-20 py-3 sm:py-4 text-xl"
  >
    Visit the Agent store.
  </button>
</div>

<!-- Sign In -->

<div class="w-full grid justify-items-center text-secondary bg-primary py-12">
  <div class="flex flex-col items-center w-3/5 px-4 justify-center">
    <h1 class="font-semibold text-xl sm:text-3xl lg:text-4xl text-gray-200">
      Hey, Welcome Back!
    </h1>
    <p class="text-gray-300 text-center font-light text-lg sm:text-xl my-5">
      We're excited to have you! Log in to dive into your personalized
      dashboard, chat with your favorite AI characters, and discover tailored
      solutions made just for you. Let’s pick up right where you left off and
      make today even better!
    </p>
    <div class="grid grid-flow-row gap-2 grid-cols-2">
      <Button
        on:click="{() => {
          goto('/signup');
        }}"
        type="button"
        class="w-full bg-lightBlue hover:bg-slate-700 col-span-1">Log in</Button
      >
      <Button
        on:click="{() => {
          goto('/signin');
        }}"
        type="button"
        class="w-full bg-lightBlue hover:bg-slate-700 col-span-1"
        >Sign up</Button
      >
    </div>
  </div>
</div>

<!-- Footer -->

<div class="bg-secondary grid justify-center items-end py-12 sm:p-28">
  <div class="text-primary">info@divinebot.ai | DivineBot © 2024</div>
</div>

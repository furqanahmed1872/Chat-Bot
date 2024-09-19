<script lang="ts">
  import { goto } from '$app/navigation';
  import { Button } from '$lib/components/ui/button/index.js';
  import * as Card from '$lib/components/ui/card/index.js';
  import { Checkbox } from '$lib/components/ui/checkbox';
  import { Input } from '$lib/components/ui/input/index.js';
  import { Label } from '$lib/components/ui/label/index.js';
  import login from '$lib/components/main/login.svelte'
</script>

<!-- Header -->
<nav class="bg-slate-100 w-full h-fit py-5 grid grid-cols-3 justify-items-center">
  <ul class="flex items-center">
    <img
      src="./icon.png"
      alt="Logo"
      class="hidden sm:block sm:w-12 sm:h-12 lg:w-14 lg:h-14"
    />
    <li
      class="text-2xl sm:text-3xl font-light ml-2 no-underline px-2 py-2 text-black cursor-pointer pullRightLeft relative group"
    >
      DivineBot
      <!-- Darkened background overlay on hover -->
      <span class="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity duration-300"></span>
    </li>
  </ul>
  <div></div>
  <ul class="flex items-center space-x-4">
    <button
      on:click="{() => goto('/chat')}"
      class="text-xl sm:text-2xl lg:text-3xl px-2 py-2 text-black font-semibold cursor-pointer pullRightLeft relative group"
    >
      Chat
      <!-- Darkened background overlay on hover -->
      <span class="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity duration-300"></span>
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
      class="text-white text-3xl sm:text-5xl lg:text-5xl xl:text-7xl font-bold mt-6 sm:mt-10 animate-float animate-once animate-duration-1000"
    >
      Empowering humanity,<br />word by word
    </p>
  </div>
</div>

<!-- IMP-info -->

<div
  class="grid bg-slate-300 text-center items-center justify-center p-8 sm:p-36"
>
  <div class="text-2xl sm:text-4xl font-bold mb-4">Meet DivineBot</div>
  <div
    class="w-full xl:w-11/12 2xl:w-1/2 mx-auto text-center text-lg sm:text-xl text-gray-700 font-medium"
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

<div
  class="bg-black flex flex-col h-fit justify-center items-center p-10 sm:p-20"
>
  <div class="text-white font-light text-3xl sm:text-5xl text-center">
    Agents
  </div>
  <div
    class="text-gray-600 font-light text-lg sm:text-xl text-center my-4 sm:my-5"
  >
    Create and speak with AI agents anywhere, anytime.
  </div>

  <div
    class="flex flex-wrap justify-center items-center my-12 sm:my-24 gap-5 sm:gap-10"
  >
    <button
      on:click="{() => {
        goto('/chat?role=tutor');
      }}"
    >
      <img
        src="./duck.png"
        alt="Tutor"
        class="rounded-full w-40 h-40 sm:w-64 sm:h-64"
      />
      <div class="text-white font-medium text-xl sm:text-2xl text-center mt-4">
        Tutor
      </div>
    </button>
    <button
      on:click="{() => {
        goto('/chat?role=counselor');
      }}"
    >
      <img
        src="./bird.png"
        alt="Counselor"
        class="rounded-full w-40 h-40 sm:w-64 sm:h-64"
      />
      <div class="text-white font-medium text-xl sm:text-2xl text-center mt-4">
        Counselor
      </div>
    </button>
    <button
      on:click="{() => {
        goto('/chat?role=buddy');
      }}"
    >
      <img
        src="./chick.png"
        alt="Buddy"
        class="rounded-full w-40 h-40 sm:w-64 sm:h-64"
      />
      <div class="text-white font-medium text-xl sm:text-2xl text-center mt-4">
        Buddy
      </div>
    </button>
    <button
      on:click="{() => {
        goto('/chat?role=doctor');
      }}"
    >
      <img
        src="./doc.png"
        alt="Doctor"
        class="rounded-full w-40 h-40 sm:w-64 sm:h-64"
      />
      <div class="text-white font-medium text-xl sm:text-2xl text-center mt-4">
        Doctor
      </div>
    </button>
  </div>
</div>

<!-- Explore -->

<div
  class="grid justify-center items-center text-center bg-slate-300 h-fit p-10 sm:p-20 gap-3"
>
  <div class="font-semibold text-xl sm:text-3xl lg:text-4xl">
    Explore our AI agent store
  </div>
  <div class="text-gray-600 font-light text-lg sm:text-xl my-5">
    Discover a diverse range of AI agents tailored to meet your unique needs.
  </div>
  <button
    on:click="{() => goto('/store')}"
    class="bg-orange-600 w-fit mx-auto rounded-3xl px-6 sm:px-20 py-3 sm:py-4 text-lg font-normal"
  >
    Visit the Agent store.
  </button>
</div>

<!-- Sign In -->
<login />

<!-- Footer -->

<div class="bg-white grid justify-center items-end py-12 sm:p-28">
  <div>info@divinebot.ai | DivineBot © 2024</div>
</div>

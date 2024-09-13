<script lang="ts">
    import { Button } from "$lib/components/ui/button/index.js";
    import * as Card from "$lib/components/ui/card/index.js";
    import { Input } from "$lib/components/ui/input/index.js";
    import { Label } from "$lib/components/ui/label/index.js";
  </script>

<!-- Header -->

<nav class="bg-slate-100 w-full h-fit py-5 grid grid-cols-12 items-center">
    <ul class="col-span-3 flex items-center justify-end">
      <img src="./icon.png" alt="Logo" class="w-14 h-14">
      <li class="text-3xl font-light ml-2 relative z-0  no-underline px-2 py-2 text-black cursor-pointer pullRightLeft">
        DivineBot
      </li>
    </ul>
  
    <ul class="col-span-7 flex items-center justify-end space-x-4">
      <li class="relative z-0 text-3xl no-underline px-2 py-2 text-black font-semibold cursor-pointer pullRightLeft">
        Chat
      </li>

    </ul>
  </nav>
  
<!-- Front page -->

  <div class="relative h-screen bg-cover flex justify-center" style="background-image: url('./front.jpg')">
    <div class="text-center">
      <!-- Logo with subtle pulsing animation -->
      <img src="./largeicon.png" alt="Logo" class="w-96 h-96 mx-auto mt-28 animate-pulse-slow">
  
      <!-- Text with continuous floating effect -->
      <p class="text-white text-7xl font-bold mt-10 animate-float">
        Empowering humanity,<br>word by word
      </p>
    </div>
  </div>

  <!-- IMP-info -->

<!-- for without animation -->

  <!-- <div class="grid bg-slate-300 w-screen h-fit text-center items-center justify-center p-36 ">
  <div class="text-center text-4xl font-bold mb-4">Meet ZeroBot</div>
  <div id="typing-effect" class="w-1/2 mx-auto text-left text-xl text-gray-700 font-medium mt-9">
    Meet ZeroBot, the Internet's #1 voice-enabled chatbot! Imagine having a conversation with a computer friend who talks with you just like a real person. With ZeroBot, it's not just typing – it's talking! Get ready to chat in a whole new way.<br><br>
    Now with the Groq LPU™ Inference Engine for the world's fastest inference speed for LLMs via the alpha version of Groq API, your chats are instant and effortlessly smooth.
  </div>
</div> -->


<!-- with animation -->

<div class="grid bg-slate-300 h-fit text-center items-center justify-center p-36">
    <div class="text-center text-4xl font-bold mb-4">Meet DivineBot</div>
    <div class="w-1/2 mx-auto text-left text-xl text-gray-700 font-medium  typewriter-wrapper">
        Meet DivineBot, the Internet's #1 voice-enabled chatbot! Imagine having
        <br>  
        a conversation with a computer friend who  talks with you just like a
        <br>
        real person. With DivineBot, it's not just typing – it's talking! Get 
        <br>
        ready to chat in a whole new way. Now with the Groq LPU™ Inference 
        <br>
        Engine for the world's fastest inference speed for LLMs via the
        <br>
        alpha version  of Groq API, your chats are instant and effortlessly
        <br>
        smooth.
    </div>
</div>


<!-- Agent -->


<div class=" bg-black flex flex-col h-fit justify-center items-center p-20">
<div class="text-white font-light text-5xl text-center "> Agents</div>


<div  class="text-gray-600 font-light text-xl text-center my-5"> Create and speak with AI agents anywhere, anytime. </div>

<div class="flex justify-center items-center my-24 gap-10"> 

<div >
    <img src="./duck.png" alt="" class="rounded-full w-64 h-64">

    <div class="text-white font-medium text-2xl text-center mt-4 "> Tutor</div>

</div>
<div>
    <img src="./bird.png" alt="" class="rounded-full w-64 h-64">
    <div class="text-white font-medium text-2xl text-center mt-4 ">Counselor</div>

</div>
<div>
    <img src="./chick.png" alt="" class="rounded-full w-64 h-64">
    <div class="text-white font-medium text-2xl text-center mt-4 ">Buddy</div>

</div>

<div>
    <img src="./doc.png" alt="" class="rounded-full w-64 h-64">
    <div class="text-white font-medium text-2xl text-center mt-4 "> Doctor </div>

</div>

</div>

</div>


<!-- Explore -->


<div class="grid justify-center items-center text-center bg-slate-300 h-fit p-20 gap-3 ">

    <div class=" font-semibold text-3xl text-center ">Explore our AI agent store    </div>
    <div class="text-gray-600 font-light text-xl text-center my-5">
        Discover a diverse range of AI agents tailored to meet your unique needs.

    </div >
  <button class="bg-orange-600 w-fit mx-auto rounded-3xl px-20 py-4 text-lg font-normal ">
   Visit the Agent store.
  </button>
</div>


<!-- Sign In -->


<div class="p-24 bg-black">
  
  <Card.Root class="mx-auto max-w-sm">
    <Card.Header>
      <Card.Title class="text-xl">Create your account</Card.Title>
      <Card.Description>Enter your information to create an account</Card.Description>
    </Card.Header>
    <Card.Content>
      <div class="grid gap-4">
        <div class="grid grid-cols-2 gap-4">
          <div class="grid gap-2">
            <Label for="first-name">First name</Label>
            <Input id="first-name" placeholder="Max" required />
          </div>
          <div class="grid gap-2">
            <Label for="last-name">Last name</Label>
            <Input id="last-name" placeholder="Robinson" required />
          </div>
        </div>
        <div class="grid gap-2">
          <Label for="email">Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" required />
        </div>
        <div class="grid gap-2">
          <Label for="password">Password</Label>
          <Input id="password" type="password" />
        </div>
        <Button type="submit" class="w-full bg-orange-600">Create an account</Button>
        <Button variant="outline" class="w-full">Sign up with GitHub</Button>
      </div>
      <div class="mt-4 text-center text-sm">
        Already have an account?
        <a href="##" class="underline"> Sign in </a>
      </div>
    </Card.Content>
  </Card.Root>
  
</div>


<!-- Footer -->

<div class="bg-white grid justify-center items-end  p-28 ">

    <div>
        info@zerobot.ai | ZeroBot © 2024

    </div>



</div>
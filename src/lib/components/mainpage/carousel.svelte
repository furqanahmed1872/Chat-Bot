<script lang="ts">
  import Autoplay from 'embla-carousel-autoplay';
  import * as Card from '$lib/components/ui/card/index.js';
  import * as Carousel from '$lib/components/ui/carousel/index.js';

  const plugin = Autoplay({ delay: 2000, stopOnInteraction: true });

  //  export const data;
</script>

<div class="w-full h-screen flex justify-center items-center">
  <Carousel.Root
    plugins="{[plugin]}"
    class="w-full max-w-screen-lg"
    on:mousenter="{plugin.stop}"
    on:mouseleave="{plugin.reset}"
  >
    <Carousel.Content>
      {#each Array(8) as _, i (i)}
        <Carousel.Item class="md:basis-1/2 lg:basis-1/3">
          <div class="p-4 w-full bg-slate-700 text-white">
            <Card.Root>
              <Card.Content
                class="flex aspect-square items-center justify-center p-6"
              >
                <span class="text-4xl font-semibold">{i + 1}</span>
              </Card.Content>
            </Card.Root>
          </div>
        </Carousel.Item>
      {/each}
    </Carousel.Content>
    <Carousel.Previous />
    <Carousel.Next />
  </Carousel.Root>
</div>
<!-- <div
  class="bg-primary flex flex-col h-fit justify-center items-center p-10 sm:p-20"
>
  <div class="text-secondary font-light text-3xl sm:text-5xl text-center">
    Agents
  </div>
  <div
    class="text-mediumBlue font-light text-lg sm:text-xl text-center my-4 sm:my-5"
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
      <div class="text-secondary font-medium text-xl sm:text-2xl text-center mt-4">
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
      <div class="text-secondary font-medium text-xl sm:text-2xl text-center mt-4">
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
      <div class="text-secondary font-medium text-xl sm:text-2xl text-center mt-4">
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
      <div class="text-secondary font-medium text-xl sm:text-2xl text-center mt-4">
        Doctor
      </div>
    </button>
  </div>
</div> -->

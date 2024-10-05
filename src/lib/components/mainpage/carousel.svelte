<script lang="ts">
  import Autoplay from 'embla-carousel-autoplay';
  import * as Card from '$lib/components/ui/card/index.js';
  import * as Carousel from '$lib/components/ui/carousel/index.js';
  import { goto } from '$app/navigation';

  const plugin = Autoplay({ delay: 2000, stopOnInteraction: true });

  export let data;
  // console.log(data.characterList);
  let List = data.characterList;
</script>

<div
  class="bg-primary flex flex-col h-fit justify-center items-center p-10 sm:p-20"
>
  <div class="text-secondary font-light text-3xl sm:text-5xl text-center">
    Agents
  </div>
  <div
    class="text-slate-400 font-light text-lg sm:text-xl text-center my-4 sm:my-5"
  >
    Create and speak with AI agents anywhere, anytime.
  </div>
  <div class="w-full flex justify-center items-center mt-4">
    <Carousel.Root
      plugins="{[plugin]}"
      class="w-min"
      on:mousenter="{plugin.stop}"
      on:mouseleave="{plugin.reset}"
    >
      <Carousel.Content>
        {#each List as character, i (i)}
          <Carousel.Item class="md:basis-1/2 pl-4 lg:basis-1/3">
            <button
              on:click="{() => {
                goto(`/chat?role=${character.character}`);
              }}"
              class="w-full group"
            >
              <Card.Root class="border-none bg-inherit cursor-pointer">
                <Card.Content
                  class="flex flex-col rounded-3xl aspect-square items-center justify-center p-2"
                  ><img
                    class="border-2 rounded-full w-40 h-40"
                    src="{character.image}"
                    alt=""
                  />
                  <span class="text-xl group-hover:text-slate-500 text-white"
                    >{character.character}</span
                  >
                </Card.Content>
              </Card.Root>
            </button>
          </Carousel.Item>
        {/each}
      </Carousel.Content>
      <Carousel.Previous />
      <Carousel.Next />
    </Carousel.Root>
  </div>
</div>

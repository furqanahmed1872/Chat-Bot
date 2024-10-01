<!-- <script>
  import { onMount } from 'svelte';

  let isAboveLg = true;

  // Function to check screen size and set value
  const checkScreenSize = () => {
    isAboveLg = window.matchMedia("(min-width: 1024px)").matches;
  };

  // Run only in the client
  onMount(() => {
    checkScreenSize();

    // Listen for resize events to update the value
    window.addEventListener("resize", checkScreenSize);

    // Cleanup on component unmount
    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  });
</script>

{#if isAboveLg}
  <p>Screen is above lg size</p>
{:else}
  <p>Screen is lg size or below</p>
{/if} -->
<div class="fixed inset-0 flex justify-center items-center bg-primary bg-opacity-70">
  <div class="bg-darkBlue rounded-lg w-96 p-6 overflow-auto" style="max-height: 40vh;">
    <div class="text-white text-xl font-semibold mb-4">Agent's Voice</div>

    <div class="flex flex-col space-y-4">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-2">
          <button class="text-white rounded-full bg-secondary  h-8 w-8 flex items-center justify-center">
            <img src="./play.png" alt="" class="h-5 w-5" > <!-- Use a library like Material Icons for the play icon -->
          </button>
          <span class="text-white">Alloy, female</span>
        </div>
        <button class="bg-lightBlue text-white rounded-lg px-4 py-2">Apply</button>
      </div>

      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-2">
          <button class="text-white rounded-full bg-secondary border-1 border-white h-8 w-8 flex items-center justify-center">
            <img src="./play.png" alt="" class="h-5 w-5" >
          </button>
          <span class="text-white">Echo, male</span>
        </div>
        <button class="bg-lightBlue text-white rounded-lg px-4 py-2">Apply</button>
      </div>

      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-2">
          <button class="text-white rounded-full bg-secondary border-1 border-white h-8 w-8 flex items-center justify-center">
            <img src="./play.png" alt="" class="h-5 w-5">
          </button>
          <span class="text-white">Fable, female</span>
        </div>
        <button class="bg-lightBlue text-white rounded-lg px-4 py-2">Apply</button>
      </div>

      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-2">
          <button class="text-white rounded-full bg-secondary border-1 border-white h-8 w-8 flex items-center justify-center">
            <img src="./play.png" alt="" class="h-5 w-5">
          </button>
          <span class="text-white">Onyx, male</span>
        </div>
        <button class="bg-lightBlue text-white rounded-lg px-4 py-2">Apply</button>
      </div>

      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-2">
          <button class="text-white rounded-full bg-secondary border-1 border-white h-8 w-8 flex items-center justify-center">
            <img src="./play.png" alt="" class="h-5 w-5">
          </button>
          <span class="text-white">Nova, female</span>
        </div>
        <button class="bg-lightBlue text-white rounded-lg px-4 py-2">Apply</button>
      </div>
  
  
    </div>
  </div>
</div>

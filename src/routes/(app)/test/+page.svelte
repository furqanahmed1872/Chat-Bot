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
{/if}


   <div class="fixed inset-0 flex justify-center items-center bg-primary bg-opacity-70">
  <div class="bg-darkBlue rounded-lg w-96 p-6 overflow-auto" style="max-height: 40vh;">
    <div class="text-white text-xl font-semibold mb-4">Agent's Voice</div>

    <div class="flex flex-col space-y-4">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-2">
          <button class="text-white rounded-full bg-secondary  h-8 w-8 flex items-center justify-center">
            <img src="./play.png" alt="" class="h-5 w-5" > 
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
</div> -->
<script>
  import { goto } from '$app/navigation';
  let isSidebarOpen = false;
  let isTicketOpen = false; // Boolean to control ticket visibility
</script>

<!-- Main Layout -->
<div class="flex flex-row h-dvh bg-primary text-secondary">
  <!-- Sidebar -->
  <nav
    class="{`fixed top-0 left-0 h-full bg-secondary p-4 transition-transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 w-64`}"
  >
    <!-- Sidebar content -->
  </nav>

  <!-- Main Content -->
  <div class="flex-1 p-8 lg:ml-64">
    <div class="flex flex-row gap-4 justify-between items-center mb-8">
      <button
        on:click="{() => (isSidebarOpen = !isSidebarOpen)}"
        class="lg:hidden p-2 bg-primary text-secondary hover:bg-lightBlue  flex items-center justify-center rounded-md transition-colors duration-200"
      >
        <!-- Sidebar Toggle Icon -->
      </button>

      <input
        type="text"
        placeholder="Search"
        class="bg-mediumBlue rounded p-2 w-full placeholder-primary text-darkBlue"
      />

      <!-- Create Agent Button -->
      <button
        on:click="{() => (isTicketOpen = true)}" 
        class="bg-secondary text-primary px-4 py-2 rounded min-w-max hover:bg-lightBlue"
      >
        Create Agent
      </button>
    </div>

    <h1 class="text-3xl font-bold mb-6">Featured Agents</h1>

    <!-- Agents Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
      <!-- Agent Cards -->
    </div>
  </div>
</div>

<!-- Create Agent Ticket (conditionally rendered) -->
{#if isTicketOpen}
  <div class="fixed inset-0 flex justify-center items-center bg-black bg-opacity-70">
    <div class="bg-primary rounded-lg w-fit text-center">
      <div class="text-white text-xl font-semibold p-4">Create Agent</div>
      <hr class="border-t-8 border-secondary " />

      <div class="grid grid-cols-10 items-center p-2 my-2 text-left">
        <div class="col-span-7 gap-2 mx-2">
          <div class="grid grid-cols-7 items-center py-2">
            <label for="" class="text-secondary col-span-3 text-lg font-light">Name</label>
            <input type="text" class="col-span-4 text-lg font-light text-secondary h-10 w-full bg-lightBlue rounded leading-tight" />
          </div>

          <div class="grid grid-cols-7 items-center py-2">
            <label for="" class="text-secondary col-span-3 text-lg font-light">Voice</label>
            <select class="text-lg col-span-4 font-light appearance-none text-center text-secondary h-10 w-full bg-lightBlue rounded leading-tight" id="grid-state">
              <option>Avatar Default</option>
            </select>
          </div>

          <div class="grid grid-cols-7 items-center py-2">
            <label for="" class="text-secondary col-span-3 text-lg font-light">Visibility</label>
            <select class="text-lg col-span-4 font-light appearance-none text-center text-secondary h-10 w-full bg-lightBlue rounded leading-tight" id="grid-state">
              <option>Public</option>
              <option>Private</option>
            </select>
          </div>
        </div>

        <img src="./person.jpg" alt="" class="w-40 h-40 rounded-lg m-2 col-span-3" />
      </div>

      <div class="grid grid-cols-10 items-center mx-2 text-left">
        <label for="description1" class="text-secondary col-span-3 text-lg font-light mx-2">Description</label>
        <textarea id="description1" rows="2" placeholder="In just a few words, how would you describe this agent?" class="text-lg col-span-7 font-light text-secondary mr-2 h-20 w-full bg-lightBlue rounded leading-tight"></textarea>
      </div>

      <div class="grid grid-cols-10 items-center my-4 mx-2 text-left">
        <label for="description2" class="text-secondary col-span-3 text-lg font-light mx-2">Instruction</label>
        <textarea id="description2" rows="7" placeholder="In just a few words, how would you describe this agent?" class="text-lg col-span-7 font-light text-secondary mr-2 h-40 w-full bg-lightBlue rounded leading-tight"></textarea>
      </div>

      <div class="flex justify-end gap-2 p-4">
        <button on:click="{() => (isTicketOpen = false)}" class="bg-lightBlue text-white py-2 px-4 rounded-lg">Cancel</button>
        <button class="bg-secondary py-2 px-4 rounded-lg">Accept</button>
      </div>
    </div>
  </div>
{/if}

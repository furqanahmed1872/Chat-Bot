<script lang="ts">
  import { goto } from '$app/navigation';
  import AddCharacter from '$lib/components/storepage/addCharacter.svelte';
  import {isDialogOpen} from '$lib/store/store'
  let isSidebarOpen = false;

  export let data;
  $: characterList = data.characterList;
</script>

<div class="flex flex-row h-dvh bg-primary text-secondary">
  <!-- Sidebar -->
  <nav
    class="{`fixed top-0 left-0 h-full bg-secondary p-4 transition-transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 w-64`}"
  >
    <button
      on:click="{() => (isSidebarOpen = !isSidebarOpen)}"
      class="md:flex lg:hidden mb-2 p-2 bg-secondary text-primary hover:bg-primary hover:text-secondary flex items-center justify-center rounded-md transition-colors duration-200"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 448 512"
        class="w-6 h-6"
        fill="currentColor"
      >
        <path
          d="M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z"
        ></path>
      </svg>
    </button>
    <button
      on:click="{() => goto('/')}"
      class="hidden lg:flex items-center justify-center w-full mb-6"
    >
      <img src="./largeicon.png" alt="Logo" class="w-16 h-16" />
    </button>

    <ul class="space-y-4 overflow-auto">
      <li class="mb-4">
        <button
          class="group flex items-center py-2 px-4 text-primary text-lg font-medium hover:text-secondary hover:bg-primary rounded w-full transition duration-300"
        >
          <img
            alt=""
            src="./star.png"
            class="w-6 h-6 mx-3 my-auto transition duration-300 group-hover:filter group-hover:brightness-0 invert"
          />
          Featured
        </button>
      </li>
      <li class="mb-4">
        <button
          class="group flex items-center py-2 px-4 text-primary text-lg font-medium hover:text-secondary hover:bg-primary rounded w-full transition duration-300"
        >
          <img
            alt=""
            src="./time.png"
            class="w-6 h-6 mx-3 my-auto transition duration-300 group-hover:filter group-hover:brightness-0 invert"
          />
          Recent
        </button>
      </li>
      <li class="mb-4">
        <button
          class="group flex items-center py-2 px-4 text-primary text-lg font-medium hover:text-secondary hover:bg-primary rounded w-full transition duration-300"
        >
          <img
            alt=""
            src="./fire.png"
            class="w-6 h-6 mx-3 my-auto transition duration-300 group-hover:filter group-hover:brightness-0 invert"
          />
          Popular
        </button>
      </li>
      <li class="mb-4">
        <button
          class="group flex items-center py-2 px-4 text-primary text-lg font-medium hover:text-secondary hover:bg-primary rounded w-full transition duration-300"
        >
          <img
            alt=""
            src="./heart-beat.png"
            class="w-6 h-6 mx-3 my-auto transition duration-300 group-hover:filter group-hover:brightness-0 invert"
          />
          Health
        </button>
      </li>
      <li>
        <button
          class="group flex items-center py-2 px-4 text-primary text-lg font-medium hover:text-secondary hover:bg-primary rounded w-full transition duration-300"
        >
          <img
            alt=""
            src="./cap.png"
            class="w-6 h-6 mx-3 my-auto transition duration-300 group-hover:filter group-hover:brightness-0 invert"
          />
          Education
        </button>
      </li>
    </ul>
    <div class="bg-secondary" class:hidden="{!$isDialogOpen}">
      <AddCharacter bind:data="{data}" />
    </div>
  </nav>

  <!-- Main Content -->
  <div class="flex-1 p-8 lg:ml-64">
    <div class="flex flex-row gap-4 justify-between items-center mb-8">
      <button
        on:click="{() => (isSidebarOpen = !isSidebarOpen)}"
        class="lg:hidden p-2 bg-primary text-secondary hover:bg-lightBlue flex items-center justify-center rounded-md transition-colors duration-200"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
          class="w-6 h-6"
          fill="currentColor"
        >
          <path
            d="M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z"
          ></path>
        </svg>
      </button>

      <input
        type="text"
        placeholder="Search"
        class="bg-mediumBlue rounded p-2 w-full placeholder-primary text-darkBlue"
      />
      <button
        on:click="{() => (isDialogOpen.set(true))}"
        class="bg-secondary text-primary px-4 py-2 rounded min-w-max hover:bg-lightBlue"
      >
        Create Agent
      </button>
    </div>

    <h1 class="text-3xl font-bold mb-6">Featured Agents</h1>

    {#if characterList}
      <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {#each characterList as character, i}
          <div
            class="bg-darkBlue rounded-lg p-4 flex items-center hover:bg-lightBlue text-primary"
          >
            <img
              src="{character.image}"
              alt="Avatar"
              class="w-16 h-16 rounded-full mr-4 bg-slate-300"
            />
            <div>
              <h2 class="text-xl font-bold text-secondary">
                {character.character}
              </h2>
              <p class="text-secondary">{character.description}</p>
            </div>
          </div>
        {/each}
      </div>
    {/if}
  </div>
</div>

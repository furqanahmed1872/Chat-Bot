<script lang="ts">
  import { goto } from '$app/navigation';
  import { createEventDispatcher } from 'svelte';

  // Define the type for a message
  type Message = {
    role: 'user' | 'assistant';
    content: string;
  };

  // Exported props
  export let chats: Message[][] = []; // Array of chats, where each chat is an array of messages
  export let selectedChat: number | null = null; // Currently selected chat (index) or null

  // Create a dispatcher for sending custom events
  const dispatch = createEventDispatcher();

  // Handle selecting a chat from the history
  function selectChat(index: number): void {
    dispatch('selectChat', index);
  }

  // Handle deleting a chat
  function deleteChat(index: number): void {
    dispatch('deleteChat', index);
  }
</script>

<div class="w-1/5 bg-slate-300 text-black h-full p-4 space-y-4">
  <button
    on:click="{() => {
      goto('/main');
    }}"
    class="flex items-center justify-center w-full mb-6"
  >
    <img src="./largeicon.png" alt="Logo" class="w-16 h-16" />
  </button>
  <h2 class="text-xl font-bold">Chat History</h2>
  <ul>
    {#each chats as chat, index}
      <li
        class="p-2 hover:bg-black hover:text-slate-300 font-bold cursor-pointer rounded-lg flex justify-between items-center"
      >
        <button
          class:selected="{index === selectedChat}"
          on:click="{() => selectChat(index)}"
        >
          Chat {index + 1}
        </button>
        <button class="text-red-500 ml-2" on:click="{() => deleteChat(index)}">
          <svg
            width="20px"
            height="20px"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            ><path
              fill="#b30539"
              d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0L284.2 0c12.1 0 23.2 6.8 28.6 17.7L320 32l96 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 96C14.3 96 0 81.7 0 64S14.3 32 32 32l96 0 7.2-14.3zM32 128l384 0 0 320c0 35.3-28.7 64-64 64L96 512c-35.3 0-64-28.7-64-64l0-320zm96 64c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16z"
            ></path></svg
          >
        </button>
      </li>
    {/each}
  </ul>
</div>

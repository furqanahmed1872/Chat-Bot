<script lang="ts">
  import { goto } from '$app/navigation';
   import { createEventDispatcher } from 'svelte';

  type Message = {
    role: 'user' | 'assistant';
    content: string;
  };
  type Chat = {
    chatId: string;
    messages: Message[];
  };

  export let chats: Chat[] = [];
  export let selectedChat: number | null = null;

  const dispatch = createEventDispatcher();

  function deleteChat(index: any): void {
    dispatch('deleteChat', index.chatId);
  }
  
  function selectChat(index: any): void {
    dispatch('selectChat', index.chatId);
  }
 export let isSidebarOpen = false;
</script>

<div
  class="{`fixed top-0 left-0 h-full bg-slate-300 p-4 transition-transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 w-64`}"
>
  <button
    on:click="{() => (isSidebarOpen = !isSidebarOpen)}"
    class="md:flex lg:hidden mb-2 p-2 bg-slate-300 text-black hover:bg-black hover:text-slate-300 flex items-center justify-center rounded-md transition-colors duration-200"
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
    on:click="{() => {
      goto('/');
    }}"
    class="hidden lg:flex items-center justify-center w-full mb-6"
  >
    <img src="./largeicon.png" alt="Logo" class="w-16 h-16" />
  </button>
  <h2 class="text-xl font-bold">Chat History</h2>
  <ul class="my-2">
    {#each chats as chat, index}
      <li class="p-2 hover:bg-black hover:text-slate-300 font-bold cursor-pointer rounded-lg flex justify-between items-center">
        <button class:selected="{index === selectedChat}" on:click="{() => selectChat(chat)}">
          Chat {index + 1}
        </button>
        <button class="text-red-500 ml-2" on:click="{() => deleteChat(chat)}">
          <svg width="20px" height="20px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path fill="#b30539" d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0L284.2 0c12.1 0 23.2 6.8 28.6 17.7L320 32l96 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 96C14.3 96 0 81.7 0 64S14.3 32 32 32l96 0 7.2-14.3zM32 128l384 0 0 320c0 35.3-28.7 64-64 64L96 512c-35.3 0-64-28.7-64-64l0-320zm96 64c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16z" />
          </svg>
        </button>
      </li>
    {/each}
  </ul>
</div>

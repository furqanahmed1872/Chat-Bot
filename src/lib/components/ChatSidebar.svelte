<script>
  export let chats = [];
  export let selectedChat;

  // Handle selecting a chat from the history
  function selectChat(index) {
    dispatch('selectChat', index);
  }
</script>

<div class="w-1/5 bg-neutral-900 text-white h-full p-4 space-y-4">
  <h2 class="text-xl font-bold">Chat History</h2>
  <ul>
    {#each chats as chat, index}
      <li class="p-2 hover:bg-gray-700 cursor-pointer" class:selected={index === selectedChat} on:click={() => selectChat(index)}>
        Chat {index + 1}
      </li>
    {/each}
  </ul>
</div>

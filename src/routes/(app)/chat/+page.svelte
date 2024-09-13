<script>
  import ChatSidebar from '$lib/components/ChatSidebar.svelte';
  import ChatMessage from '$lib/components/ChatMessage.svelte';
  import ChatInput from '$lib/components/ChatInput.svelte';

  let messages = [];
  let userMessage = '';
  let isLoading = false;
  let chats = []; // Chat history
  let selectedChat = null; // Currently selected chat

  // Handle sending message and receiving response
  async function sendMessage() {
    if (userMessage.trim() === '') return;

    // Append user message
    messages = [...messages, { role: 'user', content: userMessage }];
    isLoading = true;

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage }),
      });
      const data = await response.json();

      // Append bot message
      messages = [...messages, { role: 'assistant', content: data.message }];
    } catch (error) {
      console.error('Error:', error);
    } finally {
      isLoading = false;
      userMessage = ''; // Clear the input
    }
  }

  // Switch between chats
  function selectChat(index) {
    selectedChat = index;
    messages = chats[index];
  }

  // Add chat to history
  function addChatToHistory() {
    chats = [...chats, messages];
    messages = [];
    selectedChat = chats.length - 1; // Select the new chat
  }
</script>

<div class="flex h-screen relative">
  <!-- Sidebar -->
  <ChatSidebar chats="{chats}" on:selectChat="{selectChat}" />

  <!-- Chat Area -->
  <div class="flex flex-col w-full bg-neutral-900/95">
    <div class="flex-grow overflow-y-auto p-6">
      {#each messages as { content, role }, i}
        <ChatMessage content="{content}" role="{role}" key="{i}" />
      {/each}

      {#if isLoading}
        <div class="text-center text-gray-500">Loading...</div>
      {/if}
    </div>

    <!-- Input Area -->
    <div class="pb-6">
      <ChatInput
        bind:userMessage="{userMessage}"
        on:sendMessage="{sendMessage}"
        on:addChat="{addChatToHistory}"
      />
    </div>
  </div>
</div>

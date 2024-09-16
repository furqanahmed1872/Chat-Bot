<script lang="ts">
  import ChatSidebar from '$lib/components/ChatSidebar.svelte';
  import ChatMessage from '$lib/components/ChatMessage.svelte';
  import ChatInput from '$lib/components/ChatInput.svelte';
  import { page } from '$app/stores';

  let character = $page.url.searchParams.get('role');
  type Message = {
    role: 'user' | 'assistant';
    content: string;
  };

  // Messages state for the current chat session
  let messages: Message[] = [];
  let userMessage: string = '';
  let isLoading: boolean = false;

  // Chat history (each chat is an array of messages)
  let chats: Message[][] = [];
  let selectedChat: number | null = null; // Currently selected chat (index) or null

  // Handle sending message and receiving response
  async function sendMessage(): Promise<void> {
    if (userMessage.trim() === '') return;

    // Append user message to the current messages
    messages = [...messages, { role: 'user', content: userMessage }];
    isLoading = true;

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage, character: character }),
      });

      const data: { message: string } = await response.json();

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
  function selectChat(index: number): void {
    selectedChat = index;
    messages = chats[index] || [];
  }

  // Add chat to history (check for duplicates before adding)
  function addChatToHistory(): void {
    if (
      !chats.some((chat) => JSON.stringify(chat) === JSON.stringify(messages))
    ) {
      chats = [...chats, [...messages]];
      selectedChat = chats.length - 1; // Select the new chat
    }
    messages = [];
  }

  // Delete chat from history
  function deleteChat(index: number): void {
    chats = chats.filter((_, i) => i !== index);

    if (selectedChat === index) {
      selectedChat = null; // Deselect if the current chat was deleted
      messages = [];
    } else if (selectedChat !== null && selectedChat > index) {
      // Adjust selected chat index if a chat before it was deleted
      selectedChat -= 1;
    }
  }
</script>

<div class="flex h-screen relative">
  <!-- Sidebar -->
  <ChatSidebar
    chats="{chats}"
    on:selectChat="{(e) => selectChat(e.detail)}"
    on:deleteChat="{(e) => deleteChat(e.detail)}"
  />

  <!-- Chat Area -->
  <div class="flex flex-col w-full bg-black">
    <div class="flex-grow overflow-y-auto p-6 mx-10">
      {#each messages as { content, role }, i (i)}
        <ChatMessage content="{content}" role="{role}" />
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

<script lang="ts">
  import ChatSidebar from '$lib/components/ChatSidebar.svelte';
  import ChatMessage from '$lib/components/ChatMessage.svelte';
  import ChatInput from '$lib/components/ChatInput.svelte';
  import { v4 as uuidv4 } from 'uuid';
  import { page } from '$app/stores';

  let character = $page.url.searchParams.get('role') || 'zerobot';

  type Message = {
    role: 'user' | 'assistant';
    content: string;
  };

  type Chat = {
    chatId: string;
    messages: Message[];
  };

  export let data;

  console.log(data.chat);

  let chats: Chat[] | undefined = data.chat?.map((item) => ({
    chatId: item.chatId,
    messages: item.message,
  }));

  let messages: Message[] = [];

  let userMessage: string = '';
  let isLoading: boolean = false;

  let selectedChat: string | null = null;
  let isSidebarOpen = false;

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
        body: JSON.stringify({ message: userMessage, character }),
      });

      const data = await response.json();

      if (response.ok) {
        // Append assistant message
        messages = [...messages, { role: 'assistant', content: data.message }];
      } else {
        console.error('Error:', data.error);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      isLoading = false;
      userMessage = '';
    }
  }

  async function handleDeleteChat(index: string): Promise<void> {
    const chatId = index;

    if (!chatId) {
      console.error('Chat ID not found');
      return;
    }

    try {
      const response = await fetch('/api/deleteChat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ chatId }),
      });

      const result = await response.json();

      if (result.success) {
        // Remove chat from local array if deletion succeeds
        chats = chats?.filter((v, i) => v.chatId !== index);

        // Deselect chat if it was the selected one
        if (selectedChat === index) {
          selectedChat = null;
          messages = [];
        }
      } else {
        console.error('Error deleting chat:', result.error);
      }
    } catch (error) {
      console.error('Error deleting chat:', error);
    }
  }

  // Switch between chats
  function selectChat(index: string): void {
    selectedChat = index;
    const chat = chats?.find((v) => v.chatId === selectedChat);
    messages = chat?.messages || []; // Ensure you're assigning the array of messages
  }

  function capitalizeFirstLetter(name: string | null) {
    return name ? name.charAt(0).toUpperCase() + name.slice(1) : 'Zerobot';
  }

  // Add chat to history (check for duplicates before adding)
  async function addChatToHistory(): Promise<void> {
    let chatId = uuidv4();
    try {
      const response = await fetch('/api/addchat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages, character, chatId }),
      });

      const data = await response.json();

      if (response.ok) {
        // Initialize chats as an empty array if undefined
        chats = chats
          ? [...chats, { messages, chatId }]
          : [{ messages, chatId }];
      } else {
        console.error('Error:', data.error);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      isLoading = false;
      userMessage = '';
    }
  }
</script>

<!-- Updated component -->
<div class="flex h-dvh relative">
  <!-- Sidebar -->
  <ChatSidebar
    chats="{chats}"
    bind:isSidebarOpen="{isSidebarOpen}"
    on:selectChat="{(e) => selectChat(e.detail)}"
    on:deleteChat="{(e) => handleDeleteChat(e.detail)}"
  />

  <!-- Chat Area -->
  <div class="flex flex-col w-full bg-black lg:ml-64">
    <div class="flex-grow overflow-y-auto p-6 mx-10">
      <div class="text-xl font-bold text-slate-300">
        {capitalizeFirstLetter(character)}
      </div>
      <button
        on:click="{() => (isSidebarOpen = !isSidebarOpen)}"
        class="lg:hidden p-2 bg-black text-slate-300 hover:bg-slate-300 hover:text-black flex items-center justify-center rounded-md transition-colors duration-200"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
          class="w-6 h-6"
          fill="currentColor"
        >
          <path
            d="M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32-14.3 32 32z"
          ></path>
        </svg>
      </button>
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

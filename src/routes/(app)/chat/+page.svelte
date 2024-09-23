<script lang="ts">
  import ChatSidebar from '$lib/components/ChatSidebar.svelte';
  import ChatMessage from '$lib/components/ChatMessage.svelte';
  import ChatInput from '$lib/components/ChatInput.svelte';
  import { v4 as uuidv4 } from 'uuid';
  import { page } from '$app/stores';
  import { onMount, afterUpdate } from 'svelte';
  import Voiceinput from '$lib/components/voiceinput.svelte';

  let character = $page.url.searchParams.get('role') || 'zerobot';
  let chatContainer: HTMLDivElement;
  let update: boolean = false;
  let messages: Message[] = [];
  let userMessage: string = '';
  let isLoading: boolean = false;
  let isSidebarOpen = false;
  let selectedChat: string | null = null;
  let audioUrl: any;
  let showAnimation = false;
  export let data;

  onMount(() => {
    // Add a greeting message from the character on load
    const greetingMessage = `Hello! I'm ${capitalizeFirstLetter(character)}. How can I assist you today?`;
    messages = [...messages, { role: 'assistant', content: greetingMessage }];
  });
  // Scroll to bottom function
  function scrollToBottom() {
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }
  afterUpdate(() => {
    scrollToBottom();
  });

  type Message = {
    role: 'user' | 'assistant';
    content: string;
  };
  type Chat = {
    chatId: string | null;
    messages: Message[];
  };

  let chats: Chat[] | undefined = data.chat
    ?.filter((item) => item.chatId)
    .map((item) => ({
      chatId: item.chatId as string,
      messages: item.message,
    }));

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
        audioUrl = data.audio;
      } else {
        console.error('Error:', data.error);
      }
      if (audioUrl) {
        const audioresponse = new Audio(audioUrl);
        showAnimation = true;
        audioresponse.play();
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

  function selectChat(index: string): void {
    selectedChat = index;
    const chat = chats?.find((v) => v.chatId === selectedChat);
    messages = chat?.messages || [];
    update = true;
    console.log(selectedChat);
  }

  function capitalizeFirstLetter(name: string | null) {
    return name ? name.charAt(0).toUpperCase() + name.slice(1) : 'Zerobot';
  }

  async function addChatToHistory(): Promise<void> {
    let chatId;
    if (update) {
      chatId = selectedChat;
    } else {
      chatId = uuidv4();
    }

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
        // If the chat is being updated
        if (update) {
          // Find the existing chat in the chats array and update it
          chats = chats?.map((chat) =>
            chat.chatId === chatId
              ? { ...chat, messages: [...messages] }
              : chat,
          );
        } else {
          // If it's a new chat, add it to the chats array
          chats = chats
            ? [...chats, { chatId, messages: [...messages] }]
            : [{ chatId, messages: [...messages] }];
        }

        // Reset the form
        messages = [];
        update = false;
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
  let showchat = true;
  let showVoice = false;
  function conversationMedium() {
    showchat = !showchat;
    showVoice = !showVoice;
  }

  // if (audioUrl) {
  //   const audioresponse = new Audio(audioUrl);
  //   audioresponse.play();
  // }
</script>

<div class="flex h-dvh relative">
  <!-- Sidebar -->
  <ChatSidebar
    chats="{chats}"
    bind:isSidebarOpen="{isSidebarOpen}"
    on:addChat="{addChatToHistory}"
    on:selectChat="{(e) => selectChat(e.detail)}"
    on:deleteChat="{(e) => handleDeleteChat(e.detail)}"
  />

  <!-- Chat Area -->
  <div class="flex flex-col w-full bg-black lg:ml-64">
    <div class="flex justify-center flex-row m-2 bg-black">
      <button
        on:click="{conversationMedium}"
        class="bg-slate-400 hover:bg-slate-600 rounded-l-3xl text-black p-2 pl-3"
      >
        chat
      </button>
      <button
        on:click="{conversationMedium}"
        class="bg-slate-400 hover:bg-slate-600 rounded-r-3xl text-black p-2 pr-3"
      >
        voice
      </button>
    </div>

    {#if showchat}
      <div
        bind:this="{chatContainer}"
        class="flex-grow overflow-y-auto pb-6 pt-2 mx-10 chat-container"
      >
        <div class="flex flex-row justify-between items-center gap-1">
          <button
            on:click="{addChatToHistory}"
            class="lg:hidden order-3 p-1.5 bg-black text-slate-300 hover:bg-slate-300 hover:text-black rounded-lg"
          >
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              class="icon-xl-heavy w-5 h-5"
              ><path
                d="M15.6729 3.91287C16.8918 2.69392 18.8682 2.69392 20.0871 3.91287C21.3061 5.13182 21.3061 7.10813 20.0871 8.32708L14.1499 14.2643C13.3849 15.0293 12.3925 15.5255 11.3215 15.6785L9.14142 15.9899C8.82983 16.0344 8.51546 15.9297 8.29289 15.7071C8.07033 15.4845 7.96554 15.1701 8.01005 14.8586L8.32149 12.6785C8.47449 11.6075 8.97072 10.615 9.7357 9.85006L15.6729 3.91287ZM18.6729 5.32708C18.235 4.88918 17.525 4.88918 17.0871 5.32708L11.1499 11.2643C10.6909 11.7233 10.3932 12.3187 10.3014 12.9613L10.1785 13.8215L11.0386 13.6986C11.6812 13.6068 12.2767 13.3091 12.7357 12.8501L18.6729 6.91287C19.1108 6.47497 19.1108 5.76499 18.6729 5.32708ZM11 3.99929C11.0004 4.55157 10.5531 4.99963 10.0008 5.00007C9.00227 5.00084 8.29769 5.00827 7.74651 5.06064C7.20685 5.11191 6.88488 5.20117 6.63803 5.32695C6.07354 5.61457 5.6146 6.07351 5.32698 6.63799C5.19279 6.90135 5.10062 7.24904 5.05118 7.8542C5.00078 8.47105 5 9.26336 5 10.4V13.6C5 14.7366 5.00078 15.5289 5.05118 16.1457C5.10062 16.7509 5.19279 17.0986 5.32698 17.3619C5.6146 17.9264 6.07354 18.3854 6.63803 18.673C6.90138 18.8072 7.24907 18.8993 7.85424 18.9488C8.47108 18.9992 9.26339 19 10.4 19H13.6C14.7366 19 15.5289 18.9992 16.1458 18.9488C16.7509 18.8993 17.0986 18.8072 17.362 18.673C17.9265 18.3854 18.3854 17.9264 18.673 17.3619C18.7988 17.1151 18.8881 16.7931 18.9393 16.2535C18.9917 15.7023 18.9991 14.9977 18.9999 13.9992C19.0003 13.4469 19.4484 12.9995 20.0007 13C20.553 13.0004 21.0003 13.4485 20.9999 14.0007C20.9991 14.9789 20.9932 15.7808 20.9304 16.4426C20.8664 17.116 20.7385 17.7136 20.455 18.2699C19.9757 19.2107 19.2108 19.9756 18.27 20.455C17.6777 20.7568 17.0375 20.8826 16.3086 20.9421C15.6008 21 14.7266 21 13.6428 21H10.3572C9.27339 21 8.39925 21 7.69138 20.9421C6.96253 20.8826 6.32234 20.7568 5.73005 20.455C4.78924 19.9756 4.02433 19.2107 3.54497 18.2699C3.24318 17.6776 3.11737 17.0374 3.05782 16.3086C2.99998 15.6007 2.99999 14.7266 3 13.6428V10.3572C2.99999 9.27337 2.99998 8.39922 3.05782 7.69134C3.11737 6.96249 3.24318 6.3223 3.54497 5.73001C4.02433 4.7892 4.78924 4.0243 5.73005 3.54493C6.28633 3.26149 6.88399 3.13358 7.55735 3.06961C8.21919 3.00673 9.02103 3.00083 9.99922 3.00007C10.5515 2.99964 10.9996 3.447 11 3.99929Z"
                fill="currentColor"
              ></path></svg
            >
          </button>
          <button
            on:click="{() => (isSidebarOpen = !isSidebarOpen)}"
            class="lg:hidden p-2 bg-black text-slate-300 hover:bg-slate-300 hover:text-black flex items-center justify-center rounded-md transition-colors duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              class="w-4 h-4"
              fill="currentColor"
            >
              <path
                d="M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32-14.3 32 32z"
              ></path>
            </svg>
          </button>
          <div class="text-xl font-bold p-2 text-slate-300">
            {capitalizeFirstLetter(character)}
          </div>
        </div>
        {#each messages as { content, role }, i (i)}
          <ChatMessage content="{content}" role="{role}" />
        {/each}

        {#if isLoading}
          <div class="text-center text-gray-500">Loading...</div>
        {/if}
      </div>
      <!-- chat Area -->
      <div class="pb-6">
        <ChatInput
          bind:userMessage="{userMessage}"
          on:sendMessage="{sendMessage}"
          on:addChat="{addChatToHistory}"
        />
      </div>
    {:else}
      <!-- voice Area -->
      <div class="flex flex-col justify-evenly items-center h-full">
        <div class="pb-6 pt-2 mx-10 chat-container">
          <div class="flex flex-row justify-between items-center gap-1">
            <button
              on:click="{addChatToHistory}"
              class="lg:hidden order-3 p-1.5 bg-black text-slate-300 hover:bg-slate-300 hover:text-black rounded-lg"
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                class="icon-xl-heavy w-5 h-5"
                ><path
                  d="M15.6729 3.91287C16.8918 2.69392 18.8682 2.69392 20.0871 3.91287C21.3061 5.13182 21.3061 7.10813 20.0871 8.32708L14.1499 14.2643C13.3849 15.0293 12.3925 15.5255 11.3215 15.6785L9.14142 15.9899C8.82983 16.0344 8.51546 15.9297 8.29289 15.7071C8.07033 15.4845 7.96554 15.1701 8.01005 14.8586L8.32149 12.6785C8.47449 11.6075 8.97072 10.615 9.7357 9.85006L15.6729 3.91287ZM18.6729 5.32708C18.235 4.88918 17.525 4.88918 17.0871 5.32708L11.1499 11.2643C10.6909 11.7233 10.3932 12.3187 10.3014 12.9613L10.1785 13.8215L11.0386 13.6986C11.6812 13.6068 12.2767 13.3091 12.7357 12.8501L18.6729 6.91287C19.1108 6.47497 19.1108 5.76499 18.6729 5.32708ZM11 3.99929C11.0004 4.55157 10.5531 4.99963 10.0008 5.00007C9.00227 5.00084 8.29769 5.00827 7.74651 5.06064C7.20685 5.11191 6.88488 5.20117 6.63803 5.32695C6.07354 5.61457 5.6146 6.07351 5.32698 6.63799C5.19279 6.90135 5.10062 7.24904 5.05118 7.8542C5.00078 8.47105 5 9.26336 5 10.4V13.6C5 14.7366 5.00078 15.5289 5.05118 16.1457C5.10062 16.7509 5.19279 17.0986 5.32698 17.3619C5.6146 17.9264 6.07354 18.3854 6.63803 18.673C6.90138 18.8072 7.24907 18.8993 7.85424 18.9488C8.47108 18.9992 9.26339 19 10.4 19H13.6C14.7366 19 15.5289 18.9992 16.1458 18.9488C16.7509 18.8993 17.0986 18.8072 17.362 18.673C17.9265 18.3854 18.3854 17.9264 18.673 17.3619C18.7988 17.1151 18.8881 16.7931 18.9393 16.2535C18.9917 15.7023 18.9991 14.9977 18.9999 13.9992C19.0003 13.4469 19.4484 12.9995 20.0007 13C20.553 13.0004 21.0003 13.4485 20.9999 14.0007C20.9991 14.9789 20.9932 15.7808 20.9304 16.4426C20.8664 17.116 20.7385 17.7136 20.455 18.2699C19.9757 19.2107 19.2108 19.9756 18.27 20.455C17.6777 20.7568 17.0375 20.8826 16.3086 20.9421C15.6008 21 14.7266 21 13.6428 21H10.3572C9.27339 21 8.39925 21 7.69138 20.9421C6.96253 20.8826 6.32234 20.7568 5.73005 20.455C4.78924 19.9756 4.02433 19.2107 3.54497 18.2699C3.24318 17.6776 3.11737 17.0374 3.05782 16.3086C2.99998 15.6007 2.99999 14.7266 3 13.6428V10.3572C2.99999 9.27337 2.99998 8.39922 3.05782 7.69134C3.11737 6.96249 3.24318 6.3223 3.54497 5.73001C4.02433 4.7892 4.78924 4.0243 5.73005 3.54493C6.28633 3.26149 6.88399 3.13358 7.55735 3.06961C8.21919 3.00673 9.02103 3.00083 9.99922 3.00007C10.5515 2.99964 10.9996 3.447 11 3.99929Z"
                  fill="currentColor"
                ></path></svg
              >
            </button>
            <button
              on:click="{() => (isSidebarOpen = !isSidebarOpen)}"
              class="lg:hidden p-2 bg-black text-slate-300 hover:bg-slate-300 hover:text-black flex items-center justify-center rounded-md transition-colors duration-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                class="w-4 h-4"
                fill="currentColor"
              >
                <path
                  d="M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32-14.3 32 32z"
                ></path>
              </svg>
            </button>
            <button class="sound-wave-container" on:click="{()=> showAnimation = false}">
              <div class="sound-circle">
                {capitalizeFirstLetter(character)}
              </div>
              {#if showAnimation}
              <div class="sound-wave"></div>
              <div class="sound-wave"></div>
              <div class="sound-wave"></div>
              {/if}
            </button>
          </div>
          {#if isLoading}
            <div class="text-center text-gray-500">Loading...</div>
          {/if}
        </div>
        <!-- <audio controls src="{audioUrl}"></audio> -->
        <Voiceinput
          {showAnimation}
          bind:userMessage="{userMessage}"
          on:audioMessage="{sendMessage}"
        />
      </div>
    {/if}
  </div>
  <!-- <div class="flex justify-center flex-col bg-black h-full">
    <button class="bg-slate-400 hover:bg-slate-600 rounded-ss-3xl text-black p-1.5 pt-3">
      chat
    </button>
    <button class="bg-slate-400 hover:bg-slate-600 rounded-es-3xl text-black p-1.5 pb-3">
      voice
    </button>
  </div> -->
</div>

<style>
  .chat-container {
    scrollbar-width: none;
    -ms-overflow-style: none;
  }

  .chat-container::-webkit-scrollbar {
    display: none;
  }
  .sound-wave-container {
    position: relative;
    display: inline-block;
  }

  /* Base circle */
  .sound-circle {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    border: 2px solid gray;
    padding: 4rem;
    font-size: 1.25rem;
    font-weight: bold;
    color: #cbd5e1; /* slate-300 */
    background-color: transparent;
    position: relative;
    z-index: 1;
  }

  /* Sound waves animation */
  .sound-wave {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 100%;
    border: 2px solid rgba(156, 163, 175, 0.7); /* gray-600 */
    border-radius: 50%;
    transform: translate(-50%, -50%);
    opacity: 0;
    animation: wave 2s infinite;
  }

  .sound-wave:nth-child(2) {
    animation-delay: 0.3s;
  }

  .sound-wave:nth-child(3) {
    animation-delay: 0.6s;
  }

  /* Animation keyframes */
  @keyframes wave {
    0% {
      transform: translate(-50%, -50%) scale(1);
      opacity: 1;
    }
    100% {
      transform: translate(-50%, -50%) scale(1.6);
      opacity: 0;
    }
  }
</style>

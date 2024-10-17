<script lang="ts">
  import ChatSidebar from '$lib/components/chatpage/ChatSidebar.svelte';
  import ChatMessage from '$lib/components/chatpage/ChatMessage.svelte';
  import ChatInput from '$lib/components/chatpage/ChatInput.svelte';
  import { v4 as uuidv4 } from 'uuid';
  import { page } from '$app/stores';
  import { onMount, afterUpdate } from 'svelte';
  import Voiceinput from '$lib/components/chatpage/voiceinput.svelte';
  import Bot from '$lib/components/anime/bot.svelte';

  export let data;
  let character = 'doctor';

  $: character = $page.url.searchParams.get('role') || 'divinebot';

  let characterList = data.characterList;
  let chatContainer: HTMLDivElement;
  let update: boolean = false;
  let messages: Message[] = [];
  let userMessage: string = '';
  let isLoading: boolean = false;
  let selectedChat: string | null = null;
  let audioUrl: any;
  let hovering = false;
  $: isSidebarOpen = false;
  $: showAnimation = false;
  $: save = messages.find((m) => m.role === 'user');

  type Message = {
    role: 'user' | 'assistant';
    content: string;
  };
  type Chat = {
    chatId: string | null;
    messages: Message[];
    character: string;
  };

  let chats: Chat[] | undefined = data.chat
    ?.filter((item) => item.chatId)
    .map((item) => ({
      character: item.character as string,
      chatId: item.chatId as string,
      messages: item.message,
    }));

  $: greetingMessage =
    data.characterList?.find((c) => c.character === character)?.greeting_note ||
    'Hello! How can I assist you today?';
  $: voice =
    data.characterList?.find((c) => c.character === character)?.voice ||
    'alloy';
  $: prompt =
    data.characterList?.find((c) => c.character === character)?.prompt ||
    'You are chatgpt, responding to a user question. Respond in bullet points and heading when need, keep your responses concise.';

  $: if (messages[0]?.content !== greetingMessage && !update) {
    messages = [{ role: 'assistant', content: greetingMessage }];
  }

  // $: console.log(character, messages);

  function scrollToBottom() {
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }
  afterUpdate(() => {
    scrollToBottom();
  });

  async function sendMessage(): Promise<void> {
    if (userMessage.trim() === '') return;
    showAnimation = false;
    // Append user message to the current messages
    messages = [...messages, { role: 'user', content: userMessage }];
    isLoading = true;

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage,
          character,
          voice,
          prompt,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Append assistant message
        messages = [...messages, { role: 'assistant', content: data.message }];
        audioUrl = data.audio;
        showAnimation = true;
      } else {
        console.error('Error:', data.error);
      }
      if (audioUrl && showVoice) {
        const audioresponse = new Audio(`${audioUrl}?t=${Date.now()}`); // Cache-busting
        audioresponse.play().catch((err) => {
          console.error('Error playing audio:', err);
        });
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
    update = true;
    const chat = chats?.find((v) => v.chatId === selectedChat);
    messages = chat?.messages || [];
    character = chat?.character || 'ME';
    console.log(messages);
  }
  // $: console.log(messages);

  function selectCharacter(name: string) {
    update = false;
    character = name;
  }
  function capitalizeFirstLetter(name: string | null) {
    return name ? name.charAt(0).toUpperCase() + name.slice(1) : 'Zerobot';
  }

  async function addChatToHistory(): Promise<void> {
    if (save) {
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
              ? [...chats, { chatId, messages: [...messages], character }]
              : [{ chatId, messages: [...messages], character }];
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
    messages = [];
  }

  let showchat = true;
  let showVoice = false;
  function conversationMedium() {
    showchat = !showchat;
    showVoice = !showVoice;
  }
</script>

<div class="flex h-dvh relative bg-slate-300">
  <!-- <ChatSidebar
    chats="{chats}"
    characterList="{characterList}"
    bind:isSidebarOpen="{isSidebarOpen}"
    on:addChat="{addChatToHistory}"
    on:selectChat="{(e) => selectChat(e.detail)}"
    on:selectCharacter="{(e) => selectCharacter(e.detail)}"
    on:deleteChat="{(e) => handleDeleteChat(e.detail)}"
  /> -->

  <!-- Chat Area -->
  <div
    class="flex flex-col w-full bg-black lg:{isSidebarOpen ? 'ml-64' : 'm-0'} "
  ><div class="hidden lg:flex justify-center flex-row bg-black m-2">
        <div class="flex flex-row justify-center">
          <button
            on:click="{conversationMedium}"
            class=" bg-slate-300 hover:bg-neutral-700 focus:bg-neutral-700 rounded-l-3xl text-black p-2 pl-4 hover:text-slate-300"
          >
            <svg
              fill="currentColor"
              height="24px"
              width="24px"
              version="1.1"
              id="Capa_1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 60 60"
              xml:space="preserve"
            >
              <g>
                <path
                  d="M26,9.586C11.664,9.586,0,20.09,0,33c0,4.499,1.418,8.856,4.106,12.627c-0.51,5.578-1.86,9.712-3.813,11.666
      c-0.304,0.304-0.38,0.768-0.188,1.153C0.276,58.789,0.625,59,1,59c0.046,0,0.093-0.003,0.14-0.01
      c0.349-0.049,8.432-1.213,14.317-4.585c3.33,1.333,6.874,2.009,10.544,2.009c14.336,0,26-10.503,26-23.414S40.337,9.586,26,9.586z"
                ></path>
                <path
                  d="M55.894,37.042C58.582,33.27,60,28.912,60,24.414C60,11.503,48.337,1,34,1c-8.246,0-15.968,3.592-20.824,9.42
      C17.021,8.614,21.38,7.586,26,7.586c15.439,0,28,11.4,28,25.414c0,5.506-1.945,10.604-5.236,14.77
      c4.946,1.887,9.853,2.6,10.096,2.634c0.047,0.006,0.094,0.01,0.14,0.01c0.375,0,0.724-0.211,0.895-0.554
      c0.192-0.385,0.116-0.849-0.188-1.153C57.753,46.753,56.403,42.619,55.894,37.042z"
                ></path>
              </g>
            </svg>
          </button>
          <div class="bg-black h-0.5 w-0.5"></div>
          <button
            on:click="{conversationMedium}"
            class="bg-slate-300 hover:bg-neutral-700 focus:bg-neutral-700 rounded-r-3xl text-black hover:text-slate-300 p-2 pr-4"
          >
            <svg
              width="30px"
              height="30px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM13.2631 11.7368C13.2631 12.6105 12.5578 13.3158 11.6842 13.3158C10.8105 13.3158 10.1052 12.6105 10.1052 11.7368V8.57895C10.1052 7.70526 10.8105 7 11.6842 7C12.5578 7 13.2631 7.70526 13.2631 8.57895V11.7368ZM11.6842 8.05265C11.3947 8.05265 11.1579 8.28949 11.1579 8.57897V11.7369C11.1579 12.0263 11.3947 12.2632 11.6842 12.2632C11.9789 12.2632 12.2105 12.0316 12.2105 11.7369V8.57897C12.2105 8.28949 11.9736 8.05265 11.6842 8.05265ZM15.3684 11.7368H14.4737C14.4737 13.3158 13.1368 14.421 11.6842 14.421C10.2316 14.421 8.89474 13.3158 8.89474 11.7368H8C8 13.5316 9.43158 15.0158 11.1579 15.2737V17H12.2105V15.2737C13.9368 15.0158 15.3684 13.5316 15.3684 11.7368Z"
                fill="currentColor"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    <!-- <div class="w-full grid grid-cols-3 content-center p-2 px-2">
      <div class="col-span-1"></div>
      
      <div class="relative inline-block justify-self-end">
        <button
          class:hidden="{!showVoice}"
          class="col-span-1 bg-slate-300 w-fit hover:bg-neutral-700 focus:bg-neutral-700 rounded-xl text-black p-2 hover:text-slate-300"
          on:mouseenter="{() => (hovering = true)}"
          on:mouseleave="{() => (hovering = false)}"
        >
          Buy Time
        </button>
        <div
          class="absolute top-full mt-2 right-0 bg-white text-black p-4 rounded-lg shadow-lg w-56 opacity-0 pointer-events-none"
          class:opacity-100="{hovering}"
        >
          <p class="font-semibold">Remaining Time: 45 mins</p>
        </div>
      </div>
    </div> -->

    {#if showchat}
      <div
        bind:this="{chatContainer}"
        class="flex-grow overflow-y-auto pb-6 pt-2 mx-10 chat-container"
      >
        <div
          class="flex flex-row lg:justify-start justify-between items-center gap-1"
        >
          <button
            on:click="{addChatToHistory}"
            class="lg:hidden order-3 p-1.5 bg-black text-slate-300 hover:bg-slate-300 hover:text-black rounded-lg"
          >
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              class="icon-xl-heavy w-5 h-5 md:w-6 md:h-6"
              ><path
                d="M15.6729 3.91287C16.8918 2.69392 18.8682 2.69392 20.0871 3.91287C21.3061 5.13182 21.3061 7.10813 20.0871 8.32708L14.1499 14.2643C13.3849 15.0293 12.3925 15.5255 11.3215 15.6785L9.14142 15.9899C8.82983 16.0344 8.51546 15.9297 8.29289 15.7071C8.07033 15.4845 7.96554 15.1701 8.01005 14.8586L8.32149 12.6785C8.47449 11.6075 8.97072 10.615 9.7357 9.85006L15.6729 3.91287ZM18.6729 5.32708C18.235 4.88918 17.525 4.88918 17.0871 5.32708L11.1499 11.2643C10.6909 11.7233 10.3932 12.3187 10.3014 12.9613L10.1785 13.8215L11.0386 13.6986C11.6812 13.6068 12.2767 13.3091 12.7357 12.8501L18.6729 6.91287C19.1108 6.47497 19.1108 5.76499 18.6729 5.32708ZM11 3.99929C11.0004 4.55157 10.5531 4.99963 10.0008 5.00007C9.00227 5.00084 8.29769 5.00827 7.74651 5.06064C7.20685 5.11191 6.88488 5.20117 6.63803 5.32695C6.07354 5.61457 5.6146 6.07351 5.32698 6.63799C5.19279 6.90135 5.10062 7.24904 5.05118 7.8542C5.00078 8.47105 5 9.26336 5 10.4V13.6C5 14.7366 5.00078 15.5289 5.05118 16.1457C5.10062 16.7509 5.19279 17.0986 5.32698 17.3619C5.6146 17.9264 6.07354 18.3854 6.63803 18.673C6.90138 18.8072 7.24907 18.8993 7.85424 18.9488C8.47108 18.9992 9.26339 19 10.4 19H13.6C14.7366 19 15.5289 18.9992 16.1458 18.9488C16.7509 18.8993 17.0986 18.8072 17.362 18.673C17.9265 18.3854 18.3854 17.9264 18.673 17.3619C18.7988 17.1151 18.8881 16.7931 18.9393 16.2535C18.9917 15.7023 18.9991 14.9977 18.9999 13.9992C19.0003 13.4469 19.4484 12.9995 20.0007 13C20.553 13.0004 21.0003 13.4485 20.9999 14.0007C20.9991 14.9789 20.9932 15.7808 20.9304 16.4426C20.8664 17.116 20.7385 17.7136 20.455 18.2699C19.9757 19.2107 19.2108 19.9756 18.27 20.455C17.6777 20.7568 17.0375 20.8826 16.3086 20.9421C15.6008 21 14.7266 21 13.6428 21H10.3572C9.27339 21 8.39925 21 7.69138 20.9421C6.96253 20.8826 6.32234 20.7568 5.73005 20.455C4.78924 19.9756 4.02433 19.2107 3.54497 18.2699C3.24318 17.6776 3.11737 17.0374 3.05782 16.3086C2.99998 15.6007 2.99999 14.7266 3 13.6428V10.3572C2.99999 9.27337 2.99998 8.39922 3.05782 7.69134C3.11737 6.96249 3.24318 6.3223 3.54497 5.73001C4.02433 4.7892 4.78924 4.0243 5.73005 3.54493C6.28633 3.26149 6.88399 3.13358 7.55735 3.06961C8.21919 3.00673 9.02103 3.00083 9.99922 3.00007C10.5515 2.99964 10.9996 3.447 11 3.99929Z"
                fill="currentColor"
              ></path></svg
            >
          </button>
          <button
            on:click="{() => (isSidebarOpen = !isSidebarOpen)}"
            class="{isSidebarOpen
              ? 'lg:hidden'
              : 'block'} p-1.5 bg-black text-slate-300 hover:bg-slate-300 hover:text-black flex rounded-md"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              class="icon-xl-heavy"
              ><path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M8.85719 3H15.1428C16.2266 2.99999 17.1007 2.99998 17.8086 3.05782C18.5375 3.11737 19.1777 3.24318 19.77 3.54497C20.7108 4.02433 21.4757 4.78924 21.955 5.73005C22.2568 6.32234 22.3826 6.96253 22.4422 7.69138C22.5 8.39925 22.5 9.27339 22.5 10.3572V13.6428C22.5 14.7266 22.5 15.6008 22.4422 16.3086C22.3826 17.0375 22.2568 17.6777 21.955 18.27C21.4757 19.2108 20.7108 19.9757 19.77 20.455C19.1777 20.7568 18.5375 20.8826 17.8086 20.9422C17.1008 21 16.2266 21 15.1428 21H8.85717C7.77339 21 6.89925 21 6.19138 20.9422C5.46253 20.8826 4.82234 20.7568 4.23005 20.455C3.28924 19.9757 2.52433 19.2108 2.04497 18.27C1.74318 17.6777 1.61737 17.0375 1.55782 16.3086C1.49998 15.6007 1.49999 14.7266 1.5 13.6428V10.3572C1.49999 9.27341 1.49998 8.39926 1.55782 7.69138C1.61737 6.96253 1.74318 6.32234 2.04497 5.73005C2.52433 4.78924 3.28924 4.02433 4.23005 3.54497C4.82234 3.24318 5.46253 3.11737 6.19138 3.05782C6.89926 2.99998 7.77341 2.99999 8.85719 3ZM6.35424 5.05118C5.74907 5.10062 5.40138 5.19279 5.13803 5.32698C4.57354 5.6146 4.1146 6.07354 3.82698 6.63803C3.69279 6.90138 3.60062 7.24907 3.55118 7.85424C3.50078 8.47108 3.5 9.26339 3.5 10.4V13.6C3.5 14.7366 3.50078 15.5289 3.55118 16.1458C3.60062 16.7509 3.69279 17.0986 3.82698 17.362C4.1146 17.9265 4.57354 18.3854 5.13803 18.673C5.40138 18.8072 5.74907 18.8994 6.35424 18.9488C6.97108 18.9992 7.76339 19 8.9 19H9.5V5H8.9C7.76339 5 6.97108 5.00078 6.35424 5.05118ZM11.5 5V19H15.1C16.2366 19 17.0289 18.9992 17.6458 18.9488C18.2509 18.8994 18.5986 18.8072 18.862 18.673C19.4265 18.3854 19.8854 17.9265 20.173 17.362C20.3072 17.0986 20.3994 16.7509 20.4488 16.1458C20.4992 15.5289 20.5 14.7366 20.5 13.6V10.4C20.5 9.26339 20.4992 8.47108 20.4488 7.85424C20.3994 7.24907 20.3072 6.90138 20.173 6.63803C19.8854 6.07354 19.4265 5.6146 18.862 5.32698C18.5986 5.19279 18.2509 5.10062 17.6458 5.05118C17.0289 5.00078 16.2366 5 15.1 5H11.5ZM5 8.5C5 7.94772 5.44772 7.5 6 7.5H7C7.55229 7.5 8 7.94772 8 8.5C8 9.05229 7.55229 9.5 7 9.5H6C5.44772 9.5 5 9.05229 5 8.5ZM5 12C5 11.4477 5.44772 11 6 11H7C7.55229 11 8 11.4477 8 12C8 12.5523 7.55229 13 7 13H6C5.44772 13 5 12.5523 5 12Z"
                fill="currentColor"
              ></path></svg
            >
          </button>
          <div class="text-xl font-bold p-2 text-slate-300">
            {capitalizeFirstLetter(character)}
          </div>
        </div>
        {#each messages as { content, role }, i (content)}
          <ChatMessage content="{content}" role="{role}" />
        {/each}

        {#if isLoading}
          <div
            class="text-center text-gray-500 flex justify-center items-center"
          >
            <span class="dot ml-2"></span>
            <span class="dot ml-2"></span>
            <span class="dot ml-2"></span>
          </div>
        {/if}
      </div>
      <!-- chat Area -->
      <div class="pb-6">
        <ChatInput
          on:medium="{conversationMedium}"
          bind:userMessage="{userMessage}"
          bind:save="{save}"
          on:sendMessage="{sendMessage}"
          on:addChat="{addChatToHistory}"
        />
      </div>
    {:else}
      <!-- voice Area -->
      <div class="flex flex-col justify-evenly items-center h-full">
        <div class="pb-6 pt-2 mx-10 chat-container relative">
          <div class=" flex flex-row justify-between items-center gap-1">
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
          </div>
          <Bot bind:character="{character}" showAnimation="{showAnimation}" />
        </div>
        {#if isLoading}
          <div
            class="text-center text-gray-500 flex justify-center items-center"
          >
            <span class="dot ml-2"></span>
            <span class="dot ml-2"></span>
            <span class="dot ml-2"></span>
          </div>
        {/if}
        <Voiceinput
          showAnimation="{showAnimation}"
          bind:userMessage="{userMessage}"
          on:audioMessage="{sendMessage}"
        />
      </div>
    {/if}
  </div>
</div>

<style>
  .chat-container {
    scrollbar-width: none;
    -ms-overflow-style: none;
  }

  .chat-container::-webkit-scrollbar {
    display: none;
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

  .dot {
    width: 12px; /* Increase size */
    height: 12px; /* Increase size */
    background-color: #4b5563; /* Tailwind neutral-600 color */
    border-radius: 50%;
    display: inline-block;
    animation: dots 1.5s infinite ease-in-out both;
  }

  /* Delay the animation for the second and third dots */
  .dot:nth-child(2) {
    animation-delay: 0.3s;
  }
  .dot:nth-child(3) {
    animation-delay: 0.6s;
  }

  @keyframes dots {
    0%,
    20% {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
</style>

<script>
  import { createEventDispatcher } from 'svelte';
  export let userMessage = '';
  const dispatch = createEventDispatcher();

  function send() {
    if (userMessage.trim()) {
      dispatch('sendMessage', userMessage);
    }
  }

  function addChat() {
    dispatch('addChat');
  }
</script>

<div class="flex flex-row justify-center gap-2 w-full">
  <div class="bg-neutral-700 w-fit px-2 py-1 sm:py-1 lg:py-1.5 rounded-full sm:w-3/5">
    <div class="flex w-full">
      <input
        type="text"
        class="flex-grow sm:p-2 bg-neutral-700 text-neutral-200 rounded-l-full focus:outline-none"
        bind:value="{userMessage}"
        placeholder=" Type a message..."
        on:keypress="{(e) => e.key === 'Enter' && send()}"
      />
      <button
        class="bg-neutral-600 text-white sm:p-1 rounded-full hover:bg-blue-700"
        on:click="{send}"
      >
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="icon-2xl"
          ><path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M15.1918 8.90615C15.6381 8.45983 16.3618 8.45983 16.8081 8.90615L21.9509 14.049C22.3972 14.4953 22.3972 15.2189 21.9509 15.6652C21.5046 16.1116 20.781 16.1116 20.3347 15.6652L17.1428 12.4734V22.2857C17.1428 22.9169 16.6311 23.4286 15.9999 23.4286C15.3688 23.4286 14.8571 22.9169 14.8571 22.2857V12.4734L11.6652 15.6652C11.2189 16.1116 10.4953 16.1116 10.049 15.6652C9.60265 15.2189 9.60265 14.4953 10.049 14.049L15.1918 8.90615Z"
            fill="currentColor"
          ></path></svg
        >
      </button>
    </div>
  </div>
  <button
    class=" bg-neutral-600 text-white px-1.5 sm:p-2 sm:px-2.5  text-sm sm:text-base rounded-full hover:bg-green-700"
    on:click="{addChat}"
  >
    Save
  </button>
</div>

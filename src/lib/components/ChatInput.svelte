<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  export let userMessage = '';
  export let save: any;
  export let conversationMedium;
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

<div class="flex flex-row justify-center items-center gap-2 w-full">
  <div class="lg:hidden flex justify-center flex-row bg-black">
    <div class="flex flex-row justify-center">
      <button
        on:click="{conversationMedium}"
        class=" bg-slate-300 hover:bg-neutral-700 focus:bg-neutral-700 rounded-l-3xl text-black p-1 sm:p-1.5 pl-2 sm:pl-4 hover:text-slate-300"
      >
        <svg
          fill="currentColor"
          class="w-6 h-6 sm:w-7 sm:h-7"
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
        class="bg-slate-300 hover:bg-neutral-700 focus:bg-neutral-700 rounded-r-3xl text-black hover:text-slate-300 p-1 pr-2 sm:p-1.5 sm:pr-4"
      >
        <svg
          class="w-7 h-7 sm:w-9 sm:h-9"
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
  <div
    class="bg-neutral-700 h-fit px-2 py-1 lg:py-1.5 rounded-full w-1/2 lg:w-3/5"
  >
    <div class="flex w-full items-center">
      <input
        type="text"
        class="sm:p-2 bg-neutral-700 text-neutral-200 rounded-l-full focus:outline-none"
        style="width: inherit;"
        bind:value="{userMessage}"
        placeholder="Type a message..."
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
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M15.1918 8.90615C15.6381 8.45983 16.3618 8.45983 16.8081 8.90615L21.9509 14.049C22.3972 14.4953 22.3972 15.2189 21.9509 15.6652C21.5046 16.1116 20.781 16.1116 20.3347 15.6652L17.1428 12.4734V22.2857C17.1428 22.9169 16.6311 23.4286 15.9999 23.4286C15.3688 23.4286 14.8571 22.9169 14.8571 22.2857V12.4734L11.6652 15.6652C11.2189 16.1116 10.4953 16.1116 10.049 15.6652C9.60265 15.2189 9.60265 14.4953 10.049 14.049L15.1918 8.90615Z"
            fill="currentColor"
          ></path>
        </svg>
      </button>
    </div>
  </div>
  {#if save}
    <button
      class=" bg-neutral-700 text-neutral-200 hover:bg-black hover:text-slate-300 p-2 h-fit sm:p-2.5 text-sm sm:text-base rounded-full"
      on:click="{addChat}"
    >
      <svg
        id="Layer_1_1_"
        style="enable-background:new 0 0 16 16;"
        version="1.1"
        class="w-6 h-6 sm:w-7 sm:h-7"
        viewBox="0 0 16 16"
        xml:space="preserve"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        fill="currentColor"
        ><path
          d="M7.646,13.646l0.707,0.707l6-6c1.573-1.573,1.573-4.134,0-5.707c-1.574-1.574-4.133-1.574-5.707,0l-6.5,6.5  c-1.298,1.298-1.298,3.409,0,4.707c0.648,0.648,1.501,0.974,2.354,0.974s1.705-0.325,2.354-0.974l6-6  C13.349,7.358,13.621,6.7,13.621,6s-0.272-1.358-0.768-1.854c-0.99-0.99-2.717-0.99-3.707,0l-5.5,5.5l0.707,0.707l5.5-5.5  c0.611-0.611,1.682-0.611,2.293,0C12.452,5.159,12.621,5.566,12.621,6s-0.169,0.841-0.475,1.146l-6,6  c-0.908,0.908-2.385,0.908-3.293,0s-0.908-2.385,0-3.293l6.5-6.5c1.184-1.184,3.109-1.184,4.293,0s1.184,3.109,0,4.293L7.646,13.646  z"
        ></path></svg
      >
    </button>
  {/if}
</div>

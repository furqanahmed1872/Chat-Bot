<script>
  export let content;
  export let role;
  export let loading = false; // Add a loading prop to toggle skeleton visibility
</script>

<div class="mb-4">
  {#if loading}
    <!-- Skeleton Loader -->
    <div class="flex items-start space-x-2 animate-pulse">
      {#if role === 'assistant'}
        <div class="flex items-start">
          <div
            class="bg-gray-300 rounded p-3 max-w-2xl h-6 w-full animate-text-write"
          ></div>
        </div>
      {:else}
        <div class="flex items-end justify-end">
          <div
            class="bg-neutral-600 rounded p-3 max-w-2xl h-6 animate-text-write"
          ></div>
        </div>
      {/if}
    </div>
  {:else}
    <!-- Actual content -->
    {#if role === 'assistant'}
      <div class="flex items-start">
        <div
          class="text-white p-3  animate-text-write"
        >
          {content}
        </div>
      </div>
    {:else}
      <div class="flex items-end justify-end">
        <div class="bg-neutral-700 text-white p-3 rounded-2xl">
          {content}
        </div>
      </div>
    {/if}
  {/if}
</div>

<style>
  /* Add your custom animation styles */
  @keyframes textWrite {
    0% {
      width: 0;
    }
    100% {
      width: 100%;
    }
  }

  .animate-text-write {
    animation: textWrite 3s steps(30, end);
    width: 600px;
    overflow: visible; /* Allows text to overflow */
    display: inline-block; 
    white-space: normal; 
  }
</style>


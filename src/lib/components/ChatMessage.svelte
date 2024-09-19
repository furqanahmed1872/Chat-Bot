<script>
  export let content;
  export let role;
</script>

<div class="mb-4">
  {#if role === 'assistant'}
    <div class="flex items-start">
      <div class=" text-white p-3 max-w-xl">
        {content}
      </div>
    </div>
  {:else}
    <div class="flex items-end justify-end">
      <div class="bg-neutral-700 text-white p-3 rounded-2xl max-w-xs">
        {content}
      </div>
    </div>
  {/if}
</div>

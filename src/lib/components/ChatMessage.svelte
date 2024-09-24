<script>
  export let content = ""; // Content will be a string
  export let role;
  export let loading = false; // Loading state for skeleton

  // Function to parse the content and find the words wrapped in "**"
  function parseContent(content) {
    const regex = /\*\*(.*?)\*\*/g; // Regex to find words between '**'
    let match;
    const parsedContent = [];
    let lastIndex = 0;

    while ((match = regex.exec(content)) !== null) {
      // Push any text before the match as regular text
      if (match.index > lastIndex) {
        parsedContent.push({ type: 'text', value: content.slice(lastIndex, match.index).trim() });
      }
      // Push the matched content as a bullet
      parsedContent.push({ type: 'bullet', value: match[1].trim() });
      lastIndex = regex.lastIndex;
    }

    // Add any remaining text after the last match
    if (lastIndex < content.length) {
      parsedContent.push({ type: 'text', value: content.slice(lastIndex).trim() });
    }

    return parsedContent;
  }

  // Parsed content based on the input content
  $: parsedContent = parseContent(content);
</script>

<div class="mb-4">
  {#if loading}
    <!-- Skeleton Loader -->
    <div class="flex items-start space-x-2 animate-pulse">
      {#if role === 'assistant'}
        <div class="flex items-start">
          <div class="bg-gray-300 rounded p-3 max-w-2xl h-6 w-full animate-text-write"></div>
        </div>
      {:else}
        <div class="flex items-end justify-end">
          <div class="bg-neutral-600 rounded p-3 max-w-2xl h-6 animate-text-write"></div>
        </div>
      {/if}
    </div>
  {:else}
    <!-- Actual content -->
    {#if role === 'assistant'}
      <div class="flex items-start">
        <div class="text-white p-3">
          <ul>
            {#each parsedContent as item}
              {#if item.type === 'bullet'}
                <li class="animate-text-write">{item.value}</li>
              {:else}
                <span>{item.value}</span>
              {/if}
            {/each}
          </ul>
        </div>
      </div>
    {:else}
      <div class="flex items-end justify-end">
        <div class="bg-neutral-700 text-white p-3 rounded-2xl">
          <ul>
            {#each parsedContent as item}
              {#if item.type === 'bullet'}
                <li>{item.value}</li>
              {:else}
                <span>{item.value}</span>
              {/if}
            {/each}
          </ul>
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
    overflow: visible; 
    display: inline-block; 
    white-space: normal; 
  }

  ul {
    list-style-type: disc;
    padding-left: 20px; /* Add some padding to the left for bullet points */
  }
</style>

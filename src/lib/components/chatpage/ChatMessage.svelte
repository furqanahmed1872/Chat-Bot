<script lang="ts">
  import MarkdownIt from 'markdown-it';

  const md = new MarkdownIt({ html: true });
  export let content: string;
  export let role: string;
  const htmlContent = md
    .render(content)
    .replace(/:/g, ':<br>')
    .replace(/<(ul|ol)>/g, '<ul style="list-style-type: square; margin-left: 20px;">');
  // console.log(htmlContent);
  $: formattedContent = htmlContent.split(" ").map(word => `<span>${word}</span>`).join(" ");
</script>

<div class="mb-4">
  {#if role === 'assistant'}
    <div class="flex items-start">
      <div class="custom-list text-white p-3 text-base list-disc list-inside">
        {@html htmlContent}
      </div>
    </div>
  {:else}
    <div class="flex items-end justify-end">
      <div class="bg-neutral-700 text-white p-3 rounded-2xl">
        {content}
      </div>
    </div>
  {/if}
</div>

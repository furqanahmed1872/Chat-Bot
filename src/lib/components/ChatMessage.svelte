<script lang="ts">
  import MarkdownIt from 'markdown-it';
  const md = new MarkdownIt({ html: true });

  export let content: string;
  export let role: string;

  let sample = `1. Have a spontaneous road trip to a nearby town you've never visited before.
2. Organize a themed costume party in your backyard or living room.
3. Try a new adventurous activity like zip-lining or bungee jumping.
4. Have a movie marathon of your favorite films with friends or family.
5. Go camping in the wilderness and stargaze at night.
6. Participate in a local charity event or volunteer activity.
7. Have a DIY spa day at home with facemasks, massages, and relaxation.
8. Explore a nearby hiking trail or nature reserve for a day of outdoor adventure.
9. Experiment with a new cooking recipe or bake a fancy dessert from scratch.
10. Host a game night with board games, card games, or video games for a fun and competitive time.`;

  const htmlContent = md
    .render(content)
    .replace(/:/g, ':<br>')
    .replace(/<(ul|ol)>/g, '<ul style="list-style-type: square; margin-left: 20px;">');
  // console.log(htmlContent);
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

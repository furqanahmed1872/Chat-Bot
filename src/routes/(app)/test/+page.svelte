<script>
  import AddCharacter from '$lib/components/storepage/addCharacter.svelte';

  export let data;
</script>

<AddCharacter bind:data="{data}" />

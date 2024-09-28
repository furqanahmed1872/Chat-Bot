<!-- <script>
  import { onMount } from 'svelte';

  let isAboveLg = true;

  // Function to check screen size and set value
  const checkScreenSize = () => {
    isAboveLg = window.matchMedia("(min-width: 1024px)").matches;
  };

  // Run only in the client
  onMount(() => {
    checkScreenSize();

    // Listen for resize events to update the value
    window.addEventListener("resize", checkScreenSize);

    // Cleanup on component unmount
    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  });
</script>

{#if isAboveLg}
  <p>Screen is above lg size</p>
{:else}
  <p>Screen is lg size or below</p>
{/if} -->

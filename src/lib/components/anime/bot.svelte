<script lang="ts">
  export let character;
  export let showAnimation:boolean;
  function capitalizeFirstLetter(name: string | null) {
    return name ? name.charAt(0).toUpperCase() + name.slice(1) : 'Zerobot';
  }

  let bars = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    height: 20 + Math.random() * 60, // Increased height range
  }));

  let isAnimating = false; // State to control the animation

  // Function to update the heights
  const updateHeights = () => {
    if (isAnimating) {
      bars = bars.map((bar) => ({
        ...bar,
        height: 20 + Math.random() * 60, // Generate new random height
      }));

      // Update heights every 500ms for smooth transitions
      setTimeout(updateHeights, 500);
    }
  };

  const startAnimation = () => {
    isAnimating = true;
    updateHeights();
  };
  const stopAnimation = () => {
    isAnimating = false;
    bars = bars.map((bar) => ({
      ...bar,
      height: 0, // Set all heights to zero
    }));
  };
  $: {
    console.log(showAnimation);

    if (showAnimation) {
      console.log(showAnimation);
      startAnimation();
    } else {
      stopAnimation();
    }
  }
  // Stop the animation and reset the heights to zero
</script>

<!-- Button controls -->
<button 
  on:click="{() => (showAnimation = false)}"
class="visualizerContainer flex justify-center">
  <div class="circle text-lg font-bold">
    {capitalizeFirstLetter(character)}
    <!-- <img src="icon.png" class="speaker-icon" alt="" /> -->
  </div>
  <div class="bar-container">
    {#each bars as bar}
      <div class="bar" style="--i: {bar.id}; height: {bar.height}px;"></div>
    {/each}
  </div>
</button>

<style>
  /* Main container for the visualizer */
  .visualizerContainer {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100px; /* Increased size */
    height: 100px; /* Increased size */
    transform: translate(-50%, -50%);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  /* Inner circle */
  .circle {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 150px; /* Increased size */
    height: 150px; /* Increased size */
    background: #505151;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  /* Bar container */
  .bar-container {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 90%; /* Adjusted size to fit the container */
    height: 90%; /* Adjusted size to fit the container */
    transform: translate(-50%, -50%);
  }

  /* Bars around the circle */
  .bar {
    position: absolute;
    bottom: 50%;
    left: 50%;
    width: 3px; /* Increased width */
    background: #fcfcfc;
    transform-origin: bottom center;
    border-radius: 2px; /* Adjusted border radius */
    transition: height 0.5s ease-in-out; /* Smooth height transition */
  }

  /* Rotating bars around the circle */
  .bar:nth-child(n) {
    transform: rotate(calc(var(--i) * 7.2deg)) translateY(-85px); /* Adjusted translateY for larger size */
  }
</style>

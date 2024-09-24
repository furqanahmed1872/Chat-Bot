<script>
  let bars = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    height: 20 + Math.random() * 60, // Increased height range
  }));

  let isAnimating = false; // State to control the animation

  // Function to update the heights
  const updateHeights = () => {
    if (isAnimating) {
      bars = bars.map(bar => ({
        ...bar,
        height: 20 + Math.random() * 60, // Generate new random height
      }));

      // Update heights every 500ms for smooth transitions
      setTimeout(updateHeights, 500);
    }
  };

  // Start the height update loop
  const startAnimation = () => {
    isAnimating = true;
    updateHeights();
  };

  // Stop the animation and reset the heights to zero
  const stopAnimation = () => {
    isAnimating = false;
    bars = bars.map(bar => ({
      ...bar,
      height: 0, // Set all heights to zero
    }));
  };
</script>

<!-- Button controls -->
<div class="controls">
  <button on:click={startAnimation}>Start</button>
  <button on:click={stopAnimation}>Stop</button>
</div>

<div class="visualizerContainer">
  <div class="circle">
    <!-- Speaker icon inside the circle -->
    <img src="icon.png" class="speaker-icon" alt="">
  </div>
  <div class="bar-container">
    {#each bars as bar}
      <div
        class="bar"
        style="--i: {bar.id}; height: {bar.height}px;"
      ></div>
    {/each}
  </div>
</div>

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
    background: #e7e7e7;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  /* Speaker icon */
  .speaker-icon {
    width: 60px;  /* Adjust size of the icon */
    height: 60px; /* Adjust size of the icon */
    fill: none;   /* Make fill transparent */
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
    background: #000;
    transform-origin: bottom center;
    border-radius: 2px; /* Adjusted border radius */
    transition: height 0.5s ease-in-out; /* Smooth height transition */
  }

  /* Rotating bars around the circle */
  .bar:nth-child(n) {
    transform: rotate(calc(var(--i) * 7.2deg)) translateY(-85px); /* Adjusted translateY for larger size */
  }

  /* Style for the control buttons */
  .controls {
    position: absolute;
    top: 10%;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 10px;
  }

  button {
    padding: 8px 16px;
    font-size: 14px;
    cursor: pointer;
    background-color: #4CAF50;
    border: none;
    color: white;
    border-radius: 5px;
  }

  button:hover {
    background-color: #45a049;
  }
</style>

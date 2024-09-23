<script>
  // Target the jaw element
  let jaw = document.getElementById('jaw');

  // Animate jaw during speech
  function moveJaw() {
    jaw.style.transform = 'translateY(10px)';
    setTimeout(() => {
      jaw.style.transform = 'translateY(0)';
    }, 100); // Adjust timing to match speaking
  }

  // Simulate chatbot speaking event
  document.querySelector('#Buddy').addEventListener('click', function() {
    moveJaw();  // Trigger the jaw movement on click for testing
  });

  // If you want to trigger it when the chatbot speaks:
  // chatbot.on('speak', function() {
  //   moveJaw();
  // });
</script>

<img src="/buddy_c.svg" width="500px" alt="">


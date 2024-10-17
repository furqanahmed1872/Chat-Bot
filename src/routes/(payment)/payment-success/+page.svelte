<script lang="ts">
  export let success: boolean;

  // Display thank you message when payment is successful
  let message = success
    ? 'Thank you for your purchase! Your voice chat time has been added.'
    : "We couldn't verify your payment. Please contact support.";
</script>

<section class="payment-success">
  <h1>{success ? 'Payment Successful!' : 'Payment Issue'}</h1>
  <p>{message}</p>

  {#if success}
    <a href="/dashboard" class="btn btn-primary">Go to Dashboard</a>
  {:else}
    <a href="/contact-support" class="btn btn-secondary">Contact Support</a>
  {/if}
</section>

<style>
  .payment-success {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem;
    text-align: center;
  }
  .btn {
    margin-top: 1rem;
    padding: 1rem;
    text-decoration: none;
    border-radius: 4px;
  }
  .btn-primary {
    background-color: #28a745;
    color: white;
  }
  .btn-secondary {
    background-color: #ffcc00;
    color: white;
  }
</style>

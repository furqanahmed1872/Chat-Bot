<script lang="ts">
  export let data;
  let { success } = data;
  let message = '';
  let buttonLabel = '';

  // Reactive statement for message
  $: message = success
    ? 'Thank you for your purchase! Your voice chat time has been added.'
    : "We couldn't verify your payment. Please contact support.";

  // Reactive statement for buttonLabel
  $: buttonLabel = success ? 'Go to Dashboard' : 'Contact Support';
</script>

<section class="payment-success">
  <h1>{success ? 'Payment Successful!' : 'Payment Issue'}</h1>
  <p>{message}</p>

  <a href="{success ? '/' : '/subscription'}" class="btn btn-primary"
    >{buttonLabel}</a
  >
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
    background-color: #28a745; /* Default for primary button */
    color: white;
  }
</style>

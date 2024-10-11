<script lang="ts">
  import { Input } from '$lib/components/ui/input';
  import { Button } from '$lib/components/ui/button';
  import { Checkbox } from '$lib/components/ui/checkbox';
  import { Label } from '$lib/components/ui/label';
  import { forgetSchema } from './schema';
  import { superForm } from 'sveltekit-superforms';
  import { zodClient } from 'sveltekit-superforms/adapters';

  export let data;

  const {
    form: formData,
    errors,
    validate,
    message,
  } = superForm(data.form, {
    validators: zodClient(forgetSchema),
  });

  function validateInput(field: any) {
    validate(field);
  }
  // $: console.log($formData);
</script>

<div
  class="w-full h-screen grid justify-items-center text-white bg-black py-12"
>
  <div class="flex items-center w-full px-4 justify-center">
    <div class="mx-auto grid gap-6 justify-items-center">
      <img src="/image.png" class="w-1/4" alt="" />

      {#if $message}<h3 class="text-red-500">{$message}</h3>{/if}

      <div class="grid gap-2 text-center">
        <h1 class="text-2xl sm:text-3xl font-bold">Forget Password</h1>
        <p class="text-muted-foreground text-balance">
          Enter your email and password
        </p>
      </div>

      <!-- Form -->
      <form method="POST" class="grid gap-4 w-3/5">
        <!-- Email Field -->
        <div class="grid gap-2">
          <Label for="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="m@example.com"
            class="text-slate-600 font-medium"
            bind:value="{$formData.email}"
            on:input="{() => validateInput('email')}"
          />
          {#if $errors.email}
            <p class="text-red-500">{$errors.email}</p>
          {/if}
        </div>

        <!-- Submit Button -->
        <Button type="submit" class="w-full bg-slate-700">Sign In</Button>
      </form>
    </div>
  </div>
</div>

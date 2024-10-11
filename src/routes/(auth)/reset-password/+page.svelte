<script lang="ts">
  import { Input } from '$lib/components/ui/input';
  import { Button } from '$lib/components/ui/button';
  import { Label } from '$lib/components/ui/label';
  import { resetSchema } from './schema';
  import { superForm } from 'sveltekit-superforms';
  import { zodClient } from 'sveltekit-superforms/adapters';

  export let data;

  const { form: formData, errors, validate, message } = superForm(data.form, {
    validators: zodClient(resetSchema),
  });

  function validateInput(field: any) {
    validate(field);
  }
</script>

<div class="w-full h-screen grid justify-items-center text-white bg-black py-12">
  <div class="flex items-center w-full px-4 justify-center">
    <div class="mx-auto grid gap-6 justify-items-center">
      <img src="/image.png" class="w-1/4" alt="" />

      {#if $message}<h3 class="text-red-500">{$message}</h3>{/if}

      <div class="grid gap-2 text-center">
        <h1 class="text-2xl sm:text-3xl font-bold">Reset Password</h1>
        <p class="text-muted-foreground text-balance">
          Enter a new password
        </p>
      </div>

      <form method="POST" class="grid gap-4 w-3/5">
        <div class="grid gap-2">
          <Label for="password">New Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="New password"
            class="text-slate-600 font-medium"
            bind:value="{$formData.password}"
            on:input="{() => validateInput('password')}"
          />
          {#if $errors.password}
            <p class="text-red-500">{$errors.password}</p>
          {/if}
        </div>

        <Button type="submit" class="w-full bg-slate-700">Reset Password</Button>
      </form>
    </div>
  </div>
</div>

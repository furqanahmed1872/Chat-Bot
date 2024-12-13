<script lang="ts">
  import { Input } from '$lib/components/ui/input';
  import { Button } from '$lib/components/ui/button';
  import { Label } from '$lib/components/ui/label';
  import { formSchema } from './schema';
  import { superForm } from 'sveltekit-superforms';
  import { zodClient } from 'sveltekit-superforms/adapters';
  import { goto } from '$app/navigation';
  import { writable } from 'svelte/store';
  import { authentication } from '$lib/store/store';
  import { onMount } from 'svelte';

  export let data;
  let showPassword = writable(false);
  const {
    form: formData,
    errors,
    validate,
    message,
  } = superForm(data.form, {
    validators: zodClient(formSchema),
  });

  function validateInput(field: any) {
    validate(field);
  }

  function togglePasswordVisibility() {
    showPassword.update((val) => !val);
  }
  $: if ($message) {
    if ($message.includes('successfully')) {
      onMount(() => {
        setTimeout(() => {
          authentication.set(true)
          goto('/subscription');
        }, 2000);
      });
    }else{
      onMount(() => {
        setTimeout(() => {
         $message = null
        }, 2000);
      });
    }
  }

</script>

<div class="w-full h-lvh grid justify-items-center text-white bg-black py-4">
  <div class="flex items-center w-fit px-4 justify-center">
    <div class="mx-auto grid gap-6 justify-items-center">
      <img src="/image.png" class="w-1/4" alt="" />
      {#if $message}
        {#if $message?.includes('successfully')}
          <h3 class="text-green-500">
            {$message}
          </h3>
        {:else}
          <h3 class="text-red-500">{$message}</h3>
        {/if}
      {/if}

      <div class="grid gap-2 text-center">
        <h1 class="text-2xl sm:text-3xl font-bold">Create Account</h1>
        <p class="text-muted-foreground text-balance">
          Enter your email below to create your account
        </p>
      </div>

      <form method="POST" class="grid gap-4 w-fit">
        <div class="grid grid-cols-1 sm:grid-cols-2 w-fit gap-4">
          <div class="grid gap-2">
            <Label for="firstname">First Name</Label>
            <Input
              id="firstname"
              name="firstname"
              type="text"
              placeholder="Max"
              class="text-slate-600 font-medium"
              bind:value="{$formData.firstname}"
              on:input="{() => validateInput('firstname')}"
            />
            {#if $errors.firstname}
              <p class="text-red-500">{$errors.firstname}</p>
            {/if}
          </div>

          <div class="grid gap-2">
            <Label for="lastname">Last Name</Label>
            <Input
              id="lastname"
              name="lastname"
              type="text"
              placeholder="Robinson"
              class="text-slate-600 font-medium"
              bind:value="{$formData.lastname}"
              on:input="{() => validateInput('lastname')}"
            />
            {#if $errors.lastname}
              <p class="text-red-500">{$errors.lastname}</p>
            {/if}
          </div>
        </div>

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

        <div class="grid gap-2">
          <Label for="password">Password</Label>

          <div class="relative">
            <Input
              id="password"
              name="password"
              type="{$showPassword ? 'text' : 'password'}"
              placeholder="••••••••"
              bind:value="{$formData.password}"
              on:input="{() => validateInput('password')}"
              class="text-slate-700"
            />

            <button
              type="button"
              class="absolute right-2 top-2 text-slate-500 text-sm"
              on:click="{togglePasswordVisibility}"
            >
              {#if $showPassword}
                Hide
              {/if}
              {#if !$showPassword}
                Show
              {/if}
            </button>
          </div>
          {#if $errors.password}
            <p class="text-red-500">{$errors.password}</p>
          {/if}
        </div>

        <div class="flex items-center space-x-2">
          <input
            id="include"
            name="include"
            type="checkbox"
            bind:checked="{$formData.include}"
          />
          <Label for="include" class="text-sm font-medium leading-none">
            Agree to the terms of service
          </Label>
          {#if $errors.include}
            <p class="text-red-500">{$errors.include}</p>
          {/if}
        </div>

        <Button type="submit" class="w-full bg-slate-700">Create Account</Button
        >
      </form>
    </div>
  </div>
</div>

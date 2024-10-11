<script lang="ts">
  import { Input } from '$lib/components/ui/input';
  import { Button } from '$lib/components/ui/button';
  import { Checkbox } from '$lib/components/ui/checkbox';
  import { Label } from '$lib/components/ui/label';
  import { formSchema } from './schema';
  import { superForm } from 'sveltekit-superforms';
  import { zodClient } from 'sveltekit-superforms/adapters';
  import { goto } from '$app/navigation';

  export let data;

  const {
    form: formData,
    errors,
    validate,
    message,
    enhance,
  } = superForm(data.form, {
    validators: zodClient(formSchema),
  });

  function validateInput(field: any) {
    validate(field);
  }

  function capitalizeFirstLetter(name: string | null) {
    if (name) return name.charAt(0).toUpperCase() + name.slice(1);
  }

  $: $formData.firstname = capitalizeFirstLetter($formData.firstname);
  $: $formData.lastname = capitalizeFirstLetter($formData.lastname);
  // $: console.log($formData);
</script>

<div class="w-full h-svh grid justify-items-center text-white bg-black py-4">
  <div class="flex items-center w-full px-4 justify-center">
    <div class="mx-auto grid gap-6 justify-items-center">
      <img src="/image.png" class="w-1/4" alt="" />

      {#if $message}<h3 class="text-red-500">{$message}</h3>{/if}
      <!-- Title -->
      <div class="grid gap-2 text-center">
        <h1 class="text-2xl sm:text-3xl font-bold">Create Account</h1>
        <p class="text-muted-foreground text-balance">
          Enter your email below to create your account
        </p>
      </div>

      <!-- Form -->
      <form method="POST" class="grid gap-4">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <!-- First Name Field -->
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

          <!-- Last Name Field -->
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

        <!-- Password Field -->
        <div class="grid gap-2">
          <Label for="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="••••••••"
            bind:value="{$formData.password}"
            on:input="{() => validateInput('password')}"
            class="text-slate-700"
          />
          <button
            on:click="{() => goto('/forget-password')}"
            class="justify-self-end cursor-pointer hover:underline text-sm text-slate-500"
            >Forget password?</button
          >
          {#if $errors.password}
            <p class="text-red-500">{$errors.password}</p>
          {/if}
        </div>

        <!-- Terms and Conditions Checkbox -->
        <div class="flex items-center space-x-2">
          <input
            id="include"
            name="include"
            type="checkbox"
            bind:group="{$formData.include}"
          />
          <Label for="include" class="text-sm font-medium leading-none">
            Agree to the terms of service
          </Label>
          {#if $errors.password}
            <p class="text-red-500">{$errors.include}</p>
          {/if}
        </div>

        <!-- Submit Button -->
        <Button type="submit" class="w-full bg-slate-700">Create Account</Button
        >
      </form>
    </div>
  </div>
</div>

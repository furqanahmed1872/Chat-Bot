<script lang="ts">
  import * as Dialog from '$lib/components/ui/dialog/index.js';
  import { Input } from '$lib/components/ui/input';
  import { Button, buttonVariants } from '$lib/components/ui/button';
  import { Label } from '$lib/components/ui/label';
  import { superForm } from 'sveltekit-superforms';
  import { zodClient } from 'sveltekit-superforms/adapters';
  import { z } from 'zod';
  import { writable } from 'svelte/store';

  export let data;
  let type: 'button' | 'reset' | 'submit' | null = 'button';
  const characterSchema = z.object({
    name: z
      .string()
      .min(1, { message: 'Name is required.' })
      .max(50, { message: 'Name must be at most 50 characters long.' }),

    voice: z
      .string()
      .min(1, { message: 'Voice is required.' })
      .max(30, { message: 'Voice must be at most 30 characters long.' }),

    visibility: z
      .string()
      .min(1, { message: 'Visibility is required.' })
      .max(20, { message: 'Visibility must be at most 20 characters long.' }),

    description: z
      .string()
      .min(10, { message: 'Description must be at least 10 characters long.' })
      .max(200, {
        message: 'Description must be at most 200 characters long.',
      }),

    prompt: z
      .string()
      .min(5, { message: 'Prompt must be at least 5 characters long.' })
      .max(150, { message: 'Prompt must be at most 150 characters long.' }),

    image: z.string().min(3, { message: 'Image is required.' }),
  });

  const {
    form: formData,
    errors,
    validate,
    enhance,
  } = superForm(data.form, {
    validators: zodClient(characterSchema),
  });

  function validateInput(field: any) {
    validate(field);
  }

  const images = ['/p1.png', '/p2.png', '/p3.png'];

  let showImageModal = writable(false);
  let selectedImage = writable('');

  function handleImageClick(imageUrl: string) {
    selectedImage.set(imageUrl);
    showImageModal.set(false);
  }

  const toggleImageModal = () => showImageModal.update((value) => !value);

  $: if (Object.keys($errors).length === 0) {
    type = 'submit';
  }
  $: console.log($formData, $errors);
</script>

<Dialog.Root>
  <Dialog.Trigger class="{buttonVariants({ variant: 'outline' })}">
    Edit Profile
  </Dialog.Trigger>
  <Dialog.Content class="sm:max-w-[580px] bg-secondary">
    <Dialog.Header>
      <Dialog.Title>Create Character</Dialog.Title>
    </Dialog.Header>

    <form method="POST" class="grid border-t-2 border-slate-700" use:enhance>
      <div class="grid grid-cols-5 gap-4 py-4">
        <!-- Left Form Section -->
        <div class="grid col-span-3 gap-4">
          <!-- Name Input -->
          <div class="grid grid-cols-3 items-center gap-4">
            <Label for="name">Name :</Label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Max"
              class="col-span-2"
              bind:value="{$formData.name}"
              on:input="{() => validateInput('name')}"
            />

            {#if $errors.name}
              <p class="text-red-500 col-span-4">{$errors.name}</p>
            {/if}
          </div>

          <!-- Dropdown 1 -->
          <div class="grid grid-cols-3 items-center gap-4">
            <Label for="voice">Voice :</Label>
            <select
              id="voice"
              name="voice"
              class="col-span-2 border rounded-md p-2"
              bind:value="{$formData.voice}"
              on:change="{() => validateInput('voice')}"
            >
              <option value="">Select voice</option>
              <option value="Alloy">Alloy, female</option>
              <option value="Echo">Echo, male</option>
              <option value="Fable">Fable, female</option>
              <option value="Onyx">Onyx, male</option>
              <option value="Nova">Nova, female</option>
              <option value="Shimmer">Shimmer, female</option>
            </select>
            {#if $errors.voice}
              <p class="text-red-500 col-span-4">{$errors.voice}</p>
            {/if}
          </div>

          <!-- Dropdown 2 -->
          <div class="grid grid-cols-3 items-center gap-4">
            <Label for="visibility">Visibility :</Label>
            <select
              id="visibility"
              name="visibility"
              class="col-span-2 border rounded-md p-2"
              bind:value="{$formData.visibility}"
              on:change="{() => validateInput('visibility')}"
            >
              <option value="">Select visibility</option>
              <option value="public">Public</option>
              <option value="private">Private</option>
            </select>
            {#if $errors.visibility}
              <p class="text-red-500 col-span-4">{$errors.visibility}</p>
            {/if}
          </div>
        </div>

        <!-- Image Preview Box Section -->
        <div class="col-span-2 row-span-1">
          <button
            class="w-full h-40 border rounded p-2 cursor-pointer flex items-center justify-center overflow-hidden"
            type="button"
            on:click="{toggleImageModal}"
          >
            {#if $selectedImage}
              <input
                type="hidden"
                name="selectedImage"
                bind:value="{$formData.image}"
              />
              <!-- svelte-ignore a11y-img-redundant-alt -->
              <img
                src="{$selectedImage}"
                alt="Selected Image"
                class="w-full h-full object-cover"
              />
            {:else}
              <div
                class="w-full h-full flex items-center justify-center bg-gray-200 text-gray-600"
              >
                Click to Select
              </div>
            {/if}
          </button>
          {#if $errors.image}
            <p class="text-red-500 col-span-4">{$errors.image}</p>
          {/if}
        </div>
      </div>

      <!-- Textarea 1 -->
      <div class="grid grid-cols-5 items-center gap-4">
        <Label for="description">Description :</Label>
        <textarea
          id="description"
          name="description"
          rows="3"
          placeholder="Describe your character in just few words."
          class="col-span-4 border rounded-md p-2"
          bind:value="{$formData.description}"
          on:input="{() => validateInput('description')}"
        ></textarea>
        {#if $errors.description}
          <p class="text-red-500 col-span-4">{$errors.description}</p>
        {/if}
      </div>

      <!-- Textarea 2 -->
      <div class="grid grid-cols-5 items-center gap-4 py-4">
        <Label for="prompt">Prompt :</Label>
        <textarea
          id="prompt"
          name="prompt"
          rows="3"
          placeholder="Elaborate the role only, if it isn't clear from your character name."
          class="col-span-4 border rounded-md p-2"
          bind:value="{$formData.prompt}"
          on:input="{() => validateInput('prompt')}"
        ></textarea>
        {#if $errors.prompt}
          <p class="text-red-500 col-span-4">{$errors.prompt}</p>
        {/if}
      </div>

      <Dialog.Footer class="flex flex-row justify-center">
        <Button
          type="button"
          class="bg-slate-700"
          on:click="{() => {
            if (Object.keys($errors).length === 0) {
              toggleImageModal();
            }
          }}"
        >
          Cancel
        </Button>

        <Button type="{type}" class="bg-slate-700">Save</Button>
      </Dialog.Footer>
    </form>
  </Dialog.Content>
</Dialog.Root>

<!-- Nested Image Selection Dialog -->
<Dialog.Root bind:open="{$showImageModal}">
  <Dialog.Trigger />

  <Dialog.Content class="bg-white w-[600px]">
    <Dialog.Header>
      <Dialog.Title class="text-lg font-semibold">Select an Image</Dialog.Title>
    </Dialog.Header>

    <div class="grid grid-cols-3 gap-4 p-4">
      {#each images as image}
        <button
          class="focus:outline-none cursor-pointer border rounded p-2 hover:border-blue-500 focus:ring-1 focus:ring-green-800"
          on:click="{() => {
            $selectedImage = image;
            handleImageClick(image);
            toggleImageModal();
          }}"
        >
          <!-- svelte-ignore a11y-img-redundant-alt -->
          <img
            src="{image}"
            alt="Profile Image"
            class="h-24 w-24 object-cover rounded"
          />
        </button>
      {/each}
    </div>

    <div class="flex justify-end mt-4">
      <Button
        type="button"
        class="bg-red-500 text-white"
        on:click="{toggleImageModal}"
      >
        Close
      </Button>
    </div>
  </Dialog.Content>
</Dialog.Root>

<script lang="ts">
  import * as Dialog from '$lib/components/ui/dialog/index.js';
  import * as Drawer from '$lib/components/ui/drawer/index.js';
  import { Input } from '$lib/components/ui/input';
  import { Button, buttonVariants } from '$lib/components/ui/button';
  import { Checkbox } from '$lib/components/ui/checkbox';
  import { Label } from '$lib/components/ui/label';
  import { superForm } from 'sveltekit-superforms';
  import { zodClient } from 'sveltekit-superforms/adapters';
  import { z } from 'zod';
  import { writable } from 'svelte/store';

  // Initialize form data in your component
  interface FormDataType {
    name: string;
    voice: string;
    visiblity: string;
    description: string;
    prompt: string;
    image: string;
  }

  // Zod Schema
  const formSchema = z.object({
    name: z.string(),
    voice: z.string(),
    visiblity: z.string(),
    description: z.string(),
    prompt: z.string(),
    image: z.string().optional(),
  });

  // Usage in SuperForm
  const { form, errors, validate } = superForm<FormDataType>(initialForm, {
    validators: zodClient(formSchema),
  });

  function validateInput(field: keyof typeof formData) {
    validate(field);
  }

  const images = [
    'https://via.placeholder.com/100?text=Image+1',
    'https://via.placeholder.com/100?text=Image+2',
    'https://via.placeholder.com/100?text=Image+3',
  ];

  // Store for managing modal visibility
  let showImageModal = writable(false);
  let selectedImage = writable('');

  // Function to handle image selection
  function handleImageClick(imageUrl: string) {
    selectedImage.set(imageUrl);
    formData.image = imageUrl; // TypeScript now recognizes 'image' as part of form data
    showImageModal.set(false);
  }

  // Function to toggle the modal visibility
  function toggleImageModal() {
    showImageModal.update((value) => !value);
  }
</script>

<Dialog.Root>
  <Dialog.Trigger class="{buttonVariants({ variant: 'outline' })}">
    Edit Profile
  </Dialog.Trigger>
  <Dialog.Content class="sm:max-w-[580px] bg-secondary">
    <Dialog.Header>
      <Dialog.Title>Create Character</Dialog.Title>
    </Dialog.Header>

    <form method="POST" class="grid border-y-2 border-slate-700">
      <div class="grid grid-cols-5 gap-4 py-4">
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
              <option value="doctor">Doctor</option>
              <option value="buddy">Buddy</option>
              <option value="counselor">Counselor</option>
              <option value="tutor">Tutor</option>
            </select>
            {#if $errors.voice}
              <p class="text-red-500 col-span-4">{$errors.voice}</p>
            {/if}
          </div>

          <!-- Dropdown 2 -->
          <div class="grid grid-cols-3 items-center gap-4">
            <Label for="visiblity">Visibility :</Label>
            <select
              id="visiblity"
              name="visiblity"
              class="col-span-2 border rounded-md p-2"
              bind:value="{$formData.visiblity}"
              on:change="{() => validateInput('visiblity')}"
            >
              <option value="">Select visiblity</option>
              <option value="public">Public</option>
              <option value="private">Private</option>
            </select>
            {#if $errors.visiblity}
              <p class="text-red-500 col-span-4">{$errors.visiblity}</p>
            {/if}
          </div>
        </div>
        <div>
          <Label class="text-right">Profile Image</Label>
          <div class="col-span-3 flex items-center gap-4">
            <!-- Image Preview Box -->
            <button
              class="border rounded p-2 cursor-pointer"
              on:click="{toggleImageModal}"
            >
              {#if $selectedImage}
                <img
                  src="{$selectedImage}"
                  alt="Selected Image"
                  class="h-16 w-16 object-cover"
                />
              {:else}
                <div
                  class="h-16 w-16 flex items-center justify-center bg-gray-200 text-gray-600"
                >
                  Click to Select
                </div>
              {/if}
            </button>
          </div>
        </div>
      </div>
      <!-- Textarea 1 -->
      <div class="grid grid-cols-5 items-center gap-4">
        <Label for="description">Description :</Label>
        <textarea
          id="description"
          name="description"
          rows="3"
          placeholder="Describe your character in just few word."
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
    </form>

    <Dialog.Footer class="flex flex-row justify-center">
      <Button type="button" class="bg-slate-700">Cancel</Button>
      <Button type="submit" class="bg-slate-700">Save</Button>
    </Dialog.Footer>
  </Dialog.Content>
  {#if $showImageModal}
    <div
      class="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center"
    >
      <div class="bg-white rounded-lg p-4">
        <h3 class="text-lg font-semibold mb-4">Select an Image</h3>
        <div class="grid grid-cols-3 gap-4">
          {#each images as image}
            <button
              class="cursor-pointer border p-1 hover:border-blue-500"
              on:click="{() => handleImageClick(image)}"
            >
              <img src="{image}" alt="Image" class="h-24 w-24 object-cover" />
            </button>
          {/each}
        </div>
        <button
          class="mt-4 px-4 py-2 bg-red-500 text-white rounded"
          on:click="{toggleImageModal}">Close</button
        >
      </div>
    </div>
  {/if}
</Dialog.Root>

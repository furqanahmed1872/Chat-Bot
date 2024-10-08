<script lang="ts">
  import * as Dialog from '$lib/components/ui/dialog/index.js';
  import { Input } from '$lib/components/ui/input';
  import { Button, buttonVariants } from '$lib/components/ui/button';
  import { Label } from '$lib/components/ui/label';
  import { superForm } from 'sveltekit-superforms';
  import { zodClient } from 'sveltekit-superforms/adapters';
  import { writable } from 'svelte/store';
  import { isDialogOpen } from '$lib/store/store';
  import { characterSchema } from '$lib/schema/characterSchema';

  export let data;
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

  const images = [
    '/p1.png',
    '/p2.png',
    '/p4.png',
    '/p3.png',
    '/p5.png',
    '/p6.jpg',
    '/p7.jpg',
    '/p8.jpg',
    '/p9.jpg',
    '/p10.jpg',
    '/p11.jpg',
    '/p12.jpg',
    '/p14.jpg',
    '/p13.jpg',
    '/p15.jpg',
  ];

  let showImageModal = writable(false);
  let selectedImage = writable('');

  function capitalizeFirstLetter(name: string | null) {
    if (name) return name.charAt(0).toUpperCase() + name.slice(1);
  }

  function handleImageClick(imageUrl: string) {
    selectedImage.set(imageUrl);
    formData.update((current) => {
      current.image = imageUrl;
      return current;
    });
    showImageModal.set(false);
  }
  const toggleImageModal = () => showImageModal.update((value) => !value);

  $: $formData.character = capitalizeFirstLetter($formData.character);
</script>

<Dialog.Root bind:open="{$isDialogOpen}">
  <Dialog.Trigger class="{buttonVariants({ variant: 'outline' })}">
    Edit Profile
  </Dialog.Trigger>
  <Dialog.Content class="sm:max-w-[580px] bg-secondary">
    <Dialog.Header>
      <Dialog.Title>Create Character</Dialog.Title>
    </Dialog.Header>

    <form
      method="POST"
      class="grid border-t-2 border-slate-700"
      use:enhance
      on:submit="{async (event) => {
        event.preventDefault();
        const validationPromises = [
          validate('character'),
          validate('voice'),
          validate('visibility'),
          validate('description'),
          validate('prompt'),
          validate('image'),
        ];
        const validationResults = await Promise.all(validationPromises);
        const hasErrors = validationResults.some(
          (result) => result && result.length > 0,
        );

        if (!hasErrors) {
          isDialogOpen.set(false);
        }
      }}"
    >
      <div class="grid grid-cols-5 gap-4 py-4">
        <!-- Left Form Section -->
        <div class="grid col-span-3 gap-4">
          <!-- character Input -->
          <div class="grid grid-cols-3 items-center gap-4">
            <Label for="character">Character :</Label>
            <Input
              id="character"
              name="character"
              type="text"
              placeholder="Max"
              class="col-span-2"
              bind:value="{$formData.character}"
              on:input="{() => validateInput('character')}"
            />

            {#if $errors.character}
              <p class="text-red-500 col-span-4">{$errors.character}</p>
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
              <option value="alloy">Alloy, female</option>
              <option value="echo">Echo, male</option>
              <option value="fable">Fable, female</option>
              <option value="onyx">Onyx, male</option>
              <option value="nova">Nova, female</option>
              <option value="shimmer">Shimmer, female</option>
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
      <input type="hidden" name="image" value="{$formData.image}" />
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
          on:click="{() => isDialogOpen.set(false)}"
          type="button"
          class="bg-slate-700">Cancel</Button
        >

        <Button type="submit" class="bg-slate-700">Save</Button>
      </Dialog.Footer>
    </form>
  </Dialog.Content>
</Dialog.Root>

<!-- Nested Image Selection Dialog -->
<Dialog.Root bind:open="{$showImageModal}">
  <Dialog.Trigger />
  <Dialog.Content class="bg-white sm:max-w-[425px] h-1/2 overflow-y-scroll">
    <Dialog.Header>
      <Dialog.Title class="text-lg font-semibold">Select an Image</Dialog.Title>
    </Dialog.Header>
    <div class="flex flex-wrap gap-4">
      {#each images as image}
        <button
          class="focus:outline-none w-fit cursor-pointer border rounded p-2 hover:border-blue-500"
          on:click="{() => handleImageClick(image)}"
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
        on:click="{toggleImageModal}">Close</Button
      >
    </div>
  </Dialog.Content>
</Dialog.Root>

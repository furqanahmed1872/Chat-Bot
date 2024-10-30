import { writable } from 'svelte/store';

export let isDialogOpen = writable(false);
export let authentication = writable(false);

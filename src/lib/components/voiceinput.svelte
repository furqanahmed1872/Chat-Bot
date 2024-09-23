<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  export let userMessage = '';
  export let showAnimation: boolean;
  const dispatch = createEventDispatcher();

  let recording = false;
  let mediaRecorder: any;
  let audioChunks: Blob[] = [];

  async function startRecording() {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder = new MediaRecorder(stream);

    mediaRecorder.start();
    recording = true;

    mediaRecorder.ondataavailable = (event: BlobEvent) => {
      audioChunks.push(event.data);
    };

    mediaRecorder.onstop = () => {
      const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
      sendToWhisper(audioBlob);
      audioChunks = [];
    };
  }

  function stopRecording() {
    mediaRecorder.stop();
    recording = false;
  }

  function toggleRecording() {
    showAnimation = false;
    if (recording) {
      stopRecording();
    } else {
      startRecording();
    }
  }

  async function sendToWhisper(audioBlob: any) {
    const formData = new FormData();
    formData.append('file', audioBlob, 'speech.wav');
    formData.append('model', 'whisper-1');
    formData.append('language', 'en');

    const response = await fetch('/api/whisper', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    userMessage = data.transcription;
    audioMessage();
    console.log(userMessage);
  }

  function audioMessage() {
    dispatch('audioMessage', userMessage);
  }
</script>

<div class="flex flex-row justify-center gap-2 w-full">
  <button
    class="p-4 bg-neutral-600 text-white rounded-full hover:bg-green-600"
    on:click="{toggleRecording}"
  >
    {recording ? 'Stop Recording🔇' : 'Start Recording🎙️'}
  </button>
</div>

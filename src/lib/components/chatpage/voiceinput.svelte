<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { slide } from 'svelte/transition';

  export let userMessage = '';
  export let showAnimation: boolean;
  export let Voicetime: {};

  const dispatch = createEventDispatcher();
  let recording = false;
  let mediaRecorder: any;
  let audioChunks: Blob[] = [];
  let startTime: number | null = null;
  let conversationTime = 0;
  let processingStartTime: number | null = null;
  let processingTime = 0;
  let responseAudioTime = 0;
  let remainingTime = Voicetime.user_voice_time;

  let toastMessage = '';
  let showWarningToast = false;
  let showDangerToast = false;

  function showToast(type: 'warning' | 'danger', message: string) {
    toastMessage = message;
    if (type === 'warning') {
      showWarningToast = true;
    } else {
      showDangerToast = true;
    }
    setTimeout(() => hideToast(type), 3000);
  }

  function hideToast(type: 'warning' | 'danger') {
    if (type === 'warning') {
      showWarningToast = false;
    } else {
      showDangerToast = false;
    }
  }

  async function startRecording() {
    if (remainingTime <= 0) {
      showToast(
        'danger',
        'Your recording time has expired. Please upgrade your subscription for more time.',
      );
      remainingTime = 0;
    } else if (remainingTime <= 60) {
      showToast(
        'warning',
        'Your recording time left less then 1 minute. Please upgrade your subscription for more time.',
      );
    } 
    if (remainingTime > 0) {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder = new MediaRecorder(stream);

      mediaRecorder.start();
      recording = true;
      startTime = Date.now();

      mediaRecorder.ondataavailable = (event: BlobEvent) => {
        audioChunks.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
        sendToWhisper(audioBlob);
        audioChunks = [];

        if (startTime) {
          const endTime = Date.now();
          const duration = Math.floor((endTime - startTime) / 1000);
          conversationTime += duration;
          startTime = null;
          updateRemainingTime();
        }
      };
    }
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

    processingStartTime = Date.now();

    const response = await fetch('/api/whisper', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    userMessage = data.transcription;

    if (processingStartTime) {
      const processingEndTime = Date.now();
      processingTime += Math.floor(
        (processingEndTime - processingStartTime) / 1000,
      );
      processingStartTime = null;
      updateRemainingTime();
    }

    audioMessage();
    playResponseAudio();
  }

  function audioMessage() {
    dispatch('audioMessage', userMessage);
  }

  async function playResponseAudio() {
    const audio = new Audio('/speech.mp3');
    audio.onloadedmetadata = () => {
      responseAudioTime += Math.floor(audio.duration);
      updateRemainingTime();
    };
  }

  async function updateRemainingTime() {
    const totalTime = conversationTime + processingTime + responseAudioTime;
    remainingTime -= totalTime;

    if (remainingTime <= 0) {
      showToast(
        'danger',
        'Your recording time has expired. Please upgrade your subscription for more time.',
      );
      remainingTime = 0; // Prevent negative time
    } else if (remainingTime <= 60) {
      showToast(
        'warning',
        'Your recording time left less then 1 minute. Please upgrade your subscription for more time.',
      );
    }

    console.log(`Remaining time: ${remainingTime} seconds`);

    // Save updated remainingTime to database
    await fetch('/api/save-time', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: Voicetime.user_id,
        remainingTime,
      }),
    });
  }
</script>

<div class="flex flex-row justify-center gap-2 w-full">
  <button
    class="p-4 bg-neutral-600 text-white rounded-full"
    class:hover:bg-green-600="{!recording}"
    class:hover:bg-red-600="{recording}"
    class:focus:bg-green-700="{!recording}"
    class:focus:bg-red-700="{recording}"
    on:click="{toggleRecording}"
  >
    {#if !recording}
      <svg
        fill="#000000"
        height="40px"
        width="40px"
        version="1.1"
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 472.615 472.615"
        xml:space="preserve"
      >
        <g>
          <g>
            <path
              d="M89.156,215.407v-85.601H70.141v85.601c0,40.109,14.753,77.252,39.055,106.277l13.454-13.454
			C101.777,282.719,89.156,250.334,89.156,215.407z"
            ></path>
          </g>
        </g>
        <g>
          <g>
            <path
              d="M383.459,210.189c0,43.52-17.995,85.062-49.378,113.975c-30.158,27.791-69.23,41.338-109.936,37.903
			c-27.494-2.262-52.703-12.345-73.795-27.749l34.952-34.949c14.871,9.095,32.292,14.408,51.006,14.408h0.001
			c54.324,0,98.363-44.039,98.363-98.362v-65.417L471.223,13.445L457.778,0L334.671,123.107v-0.009L169.922,287.845
			c0.002,0.002,0.004,0.002,0.004,0.002l-34.335,34.339c-0.002-0.003-0.003-0.005-0.005-0.005l-13.404,13.404
			c0.001,0.002,0.003,0.002,0.005,0.004L1.393,456.385l13.445,13.445L136.81,347.858c24.298,18.431,53.656,30.523,85.775,33.169
			c1.412,0.114,2.807,0.094,4.215,0.172v72.401h-86.565v19.016h192.147v-19.016h-86.565v-72.443
			c37.535-2.149,72.825-16.908,101.153-43.009c35.275-32.498,55.507-79.138,55.507-127.959v-80.382h-19.016V210.189z"
            ></path>
          </g>
        </g>
        <g>
          <g>
            <path
              d="M236.308,6.723L236.308,6.723c-54.325,0-98.365,44.039-98.365,98.362v5.214h53.554v19.016h-53.554v26.324h53.554v19.016
			h-53.554v40.76c0,21.841,7.206,41.951,19.249,58.272L334.245,96.633C329.949,46.273,287.779,6.723,236.308,6.723z"
            ></path>
          </g>
        </g>
      </svg>
    {:else}
      <svg
        fill="#000000"
        height="40px"
        width="40px"
        version="1.1"
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 472.61 472.61"
        xml:space="preserve"
      >
        <g>
          <g>
            <path
              d="M388.685,131.399v79.298c0,45.078-18.644,88.106-51.144,118.048c-31.231,28.769-71.673,42.808-113.827,39.231
			c-78.384-6.432-139.788-73.144-139.788-151.866v-84.711H64.233v84.711c0,88.895,69.345,164.222,157.865,171.5
			c1.46,0.12,2.907,0.096,4.365,0.178v65.129h-89.644v19.692H335.8v-19.692h-89.644v-65.173
			c38.858-2.221,75.401-17.504,104.731-44.519c36.539-33.654,57.491-81.961,57.491-132.529v-79.298H388.685z"
            ></path>
          </g>
        </g>
        <g>
          <g>
            <path
              d="M236.31,0c-56.257,0-101.862,45.603-101.862,101.86v5.395h55.458v19.692h-55.458v27.259h55.458v19.692h-55.458v42.211
			c0,56.26,45.605,101.863,101.862,101.863c56.256,0,101.861-45.603,101.861-101.863V101.86C338.171,45.603,292.566,0,236.31,0z"
            ></path>
          </g>
        </g>
      </svg>
    {/if}
  </button>
</div>

{#if showWarningToast}
  <div
    id="toast-warning"
    class="flex items-center p-4 bg-yellow-500 text-white rounded-sm shadow-lg fixed top-4"
    transition:slide="{{ duration: 300 }}"
  >
    <i class="fas fa-exclamation-circle text-xl mr-3"></i>
    <span>{toastMessage}</span>
    <button
      on:click="{() => hideToast('warning')}"
      class="ml-auto text-white text-2xl font-bold"
    >
      &times;
    </button>
  </div>
{/if}

{#if showDangerToast}
  <div
    id="toast-danger"
    class="flex items-center p-4 bg-red-500 text-white rounded-sm shadow-lg fixed top-4"
    transition:slide="{{ duration: 300 }}"
  >
    <i class="fas fa-times-circle text-xl mr-3"></i>
    <span>{toastMessage}</span>
    <button
      on:click="{() => hideToast('danger')}"
      class="ml-auto text-white text-2xl font-bold"
    >
      &times;
    </button>
  </div>
{/if}

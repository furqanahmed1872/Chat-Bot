<script>
  import { goto } from '$app/navigation';
  let isSidebarOpen = false;
</script>

<div class="flex flex-row h-dvh bg-black text-white">
  <!-- Sidebar -->
  <nav
    class="{`fixed top-0 left-0 h-full bg-slate-300 p-4 transition-transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 w-64`}"
  >
    <button
      on:click="{() => (isSidebarOpen = !isSidebarOpen)}"
      class="md:flex lg:hidden mb-2 p-2 bg-slate-300 text-black hover:bg-black hover:text-slate-300 flex items-center justify-center rounded-md transition-colors duration-200"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 448 512"
        class="w-6 h-6"
        fill="currentColor"
      >
        <path
          d="M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z"
        ></path>
      </svg>
    </button>
    <button
      on:click="{() => goto('/main')}"
      class="hidden lg:flex items-center justify-center w-full mb-6"
    >
      <img src="./largeicon.png" alt="Logo" class="w-16 h-16" />
    </button>

    <ul class="space-y-4 overflow-auto">
      <li class="mb-4">
        <button
          class="flex items-center py-2 px-4 text-lg font-medium bg-neutral-900 rounded w-full"
        >
          <img alt="" src="./star.png" class="w-6 h-6 mx-3 my-auto" />
          Featured
        </button>
      </li>
      <li class="mb-4">
        <button
          class="flex items-center py-2 px-4 text-black text-lg font-medium hover:text-white hover:bg-neutral-900 rounded w-full"
        >
          <img alt="" src="./clock.png" class="w-6 h-6 mx-3 my-auto" />
          Recent
        </button>
      </li>
      <li class="mb-4">
        <button
          class="flex items-center py-2 px-4 text-black text-lg font-medium hover:text-white hover:bg-neutral-900 rounded w-full"
        >
          <img alt="" src="./fire.png" class="w-6 h-6 mx-3 my-auto" />
          Popular
        </button>
      </li>
      <li class="mb-4">
        <button
          class="flex items-center py-2 px-4 text-black text-lg font-medium hover:text-white hover:bg-neutral-900 rounded w-full"
        >
          <img alt="" src="./heart-beat.png" class="w-6 h-6 mx-3 my-auto" />
          Health
        </button>
      </li>
      <li>
        <button
          class="flex items-center py-2 px-4 text-black text-lg font-medium hover:text-white hover:bg-neutral-900 rounded w-full"
        >
          <img alt="" src="./cap.png" class="w-6 h-6 mx-3 my-auto" />
          Education
        </button>
      </li>
    </ul>
  </nav>

  <!-- Main Content -->
  <div class="flex-1 p-8 lg:ml-64">
    <div class="flex flex-row gap-4 justify-between items-center mb-8">
      <button
        on:click="{() => (isSidebarOpen = !isSidebarOpen)}"
        class="lg:hidden p-2 bg-black text-slate-300 hover:bg-slate-300 hover:text-black flex items-center justify-center rounded-md transition-colors duration-200"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
          class="w-6 h-6"
          fill="currentColor"
        >
          <path
            d="M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z"
          ></path>
        </svg>
      </button>

      <input
        type="text"
        placeholder="Search"
        class="bg-neutral-900 text-white rounded p-2 w-full placeholder-gray-500"
      />
      <button
        class="bg-slate-300 text-black px-4 py-2 rounded min-w-max hover:bg-slate-400"
      >
        Create Agent
      </button>
    </div>

    <h1 class="text-3xl font-bold mb-6">Featured Agents</h1>

    <!-- Agents Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
      <div
        class="bg-neutral-900 rounded-lg p-4 flex items-center hover:bg-neutral-700"
      >
        <img
          src="./bird.png"
          alt="Avatar"
          class="w-16 h-16 rounded-full mr-4 bg-slate-300"
        />
        <div>
          <h2 class="text-xl font-bold">Tutor</h2>
          <p class="text-gray-400">
            A supportive tutor skilled in various subjects, encouraging learning
            and understanding.
          </p>
        </div>
      </div>

      <div
        class="bg-neutral-900 rounded-lg p-4 flex items-center hover:bg-neutral-700"
      >
        <img
          src="./chick.png"
          alt="Avatar"
          class="w-16 h-16 rounded-full mr-4 bg-slate-300"
        />
        <div>
          <h2 class="text-xl font-bold">Buddy</h2>
          <p class="text-gray-400">
            Your friendly and supportive buddy for light-hearted chats and
            encouragement.
          </p>
        </div>
      </div>

      <!-- Continue with more agents -->
      <div
        class="bg-neutral-900 rounded-lg p-4 flex items-center hover:bg-neutral-700"
      >
        <img
          src="./doc.png"
          alt="Avatar"
          class="w-16 h-16 rounded-full mr-4 bg-slate-300"
        />
        <div>
          <h2 class="text-xl font-bold">Counselor</h2>
          <p class="text-gray-400">
            I am a counselor, here to provide support and advice.
          </p>
        </div>
      </div>

      <div
        class="bg-neutral-900 rounded-lg p-4 flex items-center hover:bg-neutral-700"
      >
        <img
          src="./duck.png"
          alt="Avatar"
          class="w-16 h-16 rounded-full mr-4 bg-slate-300"
        />
        <div>
          <h2 class="text-xl font-bold">Doctor</h2>
          <p class="text-gray-400">
            A dedicated healthcare professional offering guidance and care.
          </p>
        </div>
      </div>
    </div>
  </div>
</div>

<script>
    let email = '';
    let password = '';
  </script>
  

<nav class="bg-slate-100 w-full h-fit py-5 grid grid-cols-3 justify-items-center">
    <ul class="flex items-center">
      <img
        src="./icon.png"
        alt="Logo"
        class="hidden sm:block sm:w-12 sm:h-12 lg:w-14 lg:h-14"
      />
      <li
        class="text-2xl sm:text-3xl font-light ml-2 no-underline px-2 py-2 text-black cursor-pointer pullRightLeft relative group"
      >
        DivineBot
        <!-- Darkened background overlay on hover -->
        <span class="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity duration-300"></span>
      </li>
    </ul>
    <div></div>
    <ul class="flex items-center space-x-4">
      <button
        on:click="{() => goto('/chat')}"
        class="text-xl sm:text-2xl lg:text-3xl px-2 py-2 text-black font-semibold cursor-pointer pullRightLeft relative group"
      >
        Chat
        <!-- Darkened background overlay on hover -->
        <span class="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity duration-300"></span>
      </button>
    </ul>
  </nav>
 
  <!-- Main Container -->
  <div class="min-h-screen bg-black flex flex-col justify-center items-center">
    <!-- Login Form -->
    <div class="bg-transparent p-8 rounded-lg shadow-md w-full max-w-md text-center">
      <h2 class="text-white text-3xl font-semibold mb-6">Login</h2>
  
      <!-- Email Input -->
      <input
        bind:value={email}
        type="text"
        placeholder="phone or email"
        class="w-full p-3 mb-4 bg-black text-white border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
  
      <!-- Password Input -->
      <input
        bind:value={password}
        type="password"
        placeholder="password"
        class="w-full p-3 mb-6 bg-black text-white border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
  
      <!-- Buttons -->
      <div class="flex justify-center items-center space-x-2 mb-4">
        <button
          class="px-8 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all duration-300"
        >
          SIGN UP
        </button>
        <span class="text-white text-lg font-light">or</span>
        <button
          class="px-8 py-2 bg-gray-700 text-white rounded-full hover:bg-gray-800 transition-all duration-300"
        >
          LOG IN
        </button>
      </div>
  
      <!-- Forgot Password -->
      <div class="text-center">
        <a href="#" class="text-gray-400 hover:text-white text-sm">Forgot password</a>
      </div>
    </div>
  
    <!-- Footer -->
    <footer class="mt-16 text-center text-white text-sm">
      <div class="flex justify-center space-x-4 mb-4">
        <a href="#" class="text-white hover:text-gray-400">
          <i class="fab fa-instagram"></i>
        </a>
        <a href="#" class="text-white hover:text-gray-400">
          <i class="fab fa-twitter"></i>
        </a>
        <a href="#" class="text-white hover:text-gray-400">
          <i class="fab fa-youtube"></i>
        </a>
      </div>
  
      <p class="text-gray-400">info@zerobot.ai | ZeroBot © 2024</p>
    </footer>
  </div>
  
  <style>
    /* Add FontAwesome for the social media icons */
  </style>
  
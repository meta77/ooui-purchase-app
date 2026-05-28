<template>
  <div class="space-y-6">
    <div>
      <h2 class="text-xl font-semibold text-gray-900 dark:text-white">Settings</h2>
      <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">設定</p>
    </div>

    <div class="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
      <div class="p-6 space-y-6">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-base font-medium text-gray-900 dark:text-white">Dark Mode</h3>
            <p class="text-sm text-gray-500 dark:text-gray-400 mt-0.5">ダークモードを有効にします</p>
          </div>
          <button 
            @click="toggleDarkMode"
            class="relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white focus:ring-offset-2"
            :class="isDarkMode ? 'bg-black dark:bg-gray-600' : 'bg-gray-200'"
          >
            <span 
              class="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
              :class="isDarkMode ? 'translate-x-5' : 'translate-x-0'"
            ></span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const isDarkMode = ref(false)

onMounted(() => {
  // Initialize from document state
  isDarkMode.value = document.documentElement.classList.contains('dark')
})

const toggleDarkMode = () => {
  const newDarkMode = !isDarkMode.value
  isDarkMode.value = newDarkMode
  
  if (newDarkMode) {
    document.documentElement.classList.add('dark')
    localStorage.setItem('theme', 'dark')
  } else {
    document.documentElement.classList.remove('dark')
    localStorage.setItem('theme', 'light')
  }
}
</script>

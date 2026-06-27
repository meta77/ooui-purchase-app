<template>
  <component 
    :is="to ? 'router-link' : 'div'" 
    :to="to"
    class="block group rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 shadow-sm transition-all duration-200"
    :class="[
      interactive || to ? 'hover:-translate-y-0.5 hover:shadow-md hover:border-gray-300 dark:hover:border-gray-700 cursor-pointer' : ''
    ]"
  >
    <slot />
  </component>
</template>

<script setup>
defineProps({
  to: {
    type: [String, Object],
    default: null
  },
  interactive: {
    type: Boolean,
    default: false
  }
})
</script>

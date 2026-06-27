<template>
  <component
    :is="to ? 'router-link' : 'button'"
    :to="to"
    class="inline-flex items-center gap-1.5 px-4 py-2 bg-black text-white dark:bg-white dark:text-black text-sm font-medium rounded-xl hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors shadow-sm cursor-pointer"
  >
    <slot name="icon" />
    <slot />
  </component>
</template>

<script setup>
defineProps({
  to: {
    type: [String, Object],
    default: null
  }
})
</script>

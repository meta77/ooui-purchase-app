<template>
  <router-link
    :to="{ name: 'InventoryDetail', params: { id: record.inventoryId } }"
    class="flex items-center justify-between p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors group"
  >
    <div class="flex-1">
      <p class="text-sm font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
        {{ record.inventory.year }}年 棚卸し
      </p>
      <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">{{ record.inventory.date }}</p>
    </div>
    <div class="flex items-center gap-8 text-right">
      <div class="w-32">
        <p class="text-xs text-gray-500 dark:text-gray-400">Stock Quantity</p>
        <p class="text-sm font-medium text-gray-900 dark:text-white mt-0.5">{{ record.quantity }}</p>
      </div>
      <div class="w-16 flex justify-end text-gray-300 dark:text-gray-600">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
        </svg>
      </div>
    </div>
  </router-link>
</template>

<script setup>
defineProps({
  record: {
    type: Object,
    required: true
  }
})
</script>

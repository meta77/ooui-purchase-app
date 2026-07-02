<template>
  <router-link
    :to="{ name: 'InventoryDetail', params: { id: inventory.id } }"
    class="block group rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-gray-300 dark:hover:border-gray-700"
  >
    <!-- Mobile -->
    <div class="flex flex-col gap-4 sm:hidden">
      <div class="flex items-start justify-between">
        <div>
          <p class="text-xs font-medium uppercase tracking-wide text-gray-400">Year / Date</p>
          <p class="mt-1 text-xl font-bold text-gray-900 dark:text-white">{{ inventory.year }}年 ({{ inventory.date }})</p>
        </div>
        <div class="text-right">
          <p class="text-xs font-medium uppercase tracking-wide text-gray-400">Total Value</p>
          <p class="mt-1 text-lg font-bold text-gray-900 dark:text-white">¥{{ formatPrice(inventory.total) }}</p>
        </div>
      </div>
      <div>
        <span class="inline-flex items-center rounded-md bg-gray-50 dark:bg-gray-700/50 px-2 py-1 text-[10px] font-medium text-gray-500 dark:text-gray-400 ring-1 ring-inset ring-gray-500/10 dark:ring-gray-400/10">
          ID: {{ inventory.id }}
        </span>
      </div>
    </div>

    <!-- Desktop -->
    <div class="hidden items-center justify-between sm:flex">
      <div class="flex-1">
        <p class="text-xs font-medium uppercase tracking-wide text-gray-400">Year / Date</p>
        <p class="mt-1 text-xl font-bold text-gray-900 dark:text-white">{{ inventory.year }}年 ({{ inventory.date }})</p>
        <p class="mt-1.5 text-xs font-medium text-gray-400 dark:text-gray-500 font-mono">ID: {{ inventory.id }}</p>
      </div>

      <div class="w-48 text-right px-8 border-l border-gray-100 dark:border-gray-700">
        <p class="text-xs font-medium uppercase tracking-wide text-gray-400">Total Value (棚卸総額)</p>
        <p class="mt-1 text-2xl font-bold text-gray-900 dark:text-white">¥{{ formatPrice(inventory.total) }}</p>
      </div>
    </div>
  </router-link>
</template>

<script setup>
import { formatPrice } from '../../../utils/calculations'

defineProps({
  inventory: {
    type: Object,
    required: true
  }
})
</script>

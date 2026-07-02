<template>
  <router-link
    :to="{ name: 'PurchaseDetail', params: { id: record.purchaseId } }"
    class="flex items-center justify-between p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors group"
  >
    <div class="flex-1">
      <p class="text-sm font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
        {{ record.purchaseId }}
      </p>
      <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">{{ record.purchase.date }}</p>
    </div>
    <div class="flex items-center gap-8 text-right">
      <div class="w-20">
        <p class="text-xs text-gray-500 dark:text-gray-400">Qty</p>
        <p class="text-sm font-medium text-gray-900 dark:text-white mt-0.5">{{ record.quantity }}</p>
      </div>
      <div class="w-32 hidden sm:block">
        <p class="text-xs text-gray-500 dark:text-gray-400">Purchase Total</p>
        <p class="text-sm text-gray-700 dark:text-gray-300 mt-0.5">¥{{ formatPrice(record.purchase.total) }}</p>
      </div>
    </div>
  </router-link>
</template>

<script setup>
import { formatPrice } from '../../../utils/calculations'

defineProps({
  record: {
    type: Object,
    required: true
  }
})
</script>

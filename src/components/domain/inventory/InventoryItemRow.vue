<template>
  <router-link
    :to="{ name: 'ProductDetail', params: { id: item.productId } }"
    class="flex flex-col sm:flex-row sm:items-center justify-between p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors gap-4 group"
  >
    <div class="flex-1">
      <div class="flex items-center gap-3 mb-1">
        <p class="text-sm font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{{ item.product.name }}</p>
        <span class="text-xs text-gray-400 dark:text-gray-500 font-mono">{{ item.productId }}</span>
      </div>
      <p class="text-xs text-gray-500 dark:text-gray-400 font-medium">Unit Price: ¥{{ formatPrice(item.product.price) }}</p>
    </div>
    <div class="flex items-center gap-8 justify-between sm:justify-end">
      <div class="text-right">
        <p class="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wide">Stock Qty</p>
        <p class="text-lg font-bold text-gray-900 dark:text-white mt-0.5">{{ item.quantity }}</p>
      </div>
      <div class="w-32 text-right">
        <p class="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wide">Subtotal</p>
        <p class="text-base font-semibold text-gray-700 dark:text-gray-300 mt-1">¥{{ formatPrice(item.subtotal) }}</p>
      </div>
    </div>
  </router-link>
</template>

<script setup>
import { formatPrice } from '../../../utils/calculations'

defineProps({
  item: {
    type: Object,
    required: true
  }
})
</script>

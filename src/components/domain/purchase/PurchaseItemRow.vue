<template>
  <router-link
    :to="{ name: 'ProductDetail', params: { id: item.productId } }"
    class="flex items-center justify-between p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors group"
  >
    <div class="flex-1">
      <p class="text-sm font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
        {{ item.product.name }}
      </p>
      <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">{{ item.productId }}</p>
    </div>
    <div class="flex items-center gap-8 text-right">
      <div class="w-32 hidden sm:block">
        <p class="text-xs text-gray-500 dark:text-gray-400">Unit Price</p>
        <p class="text-sm text-gray-900 dark:text-white mt-0.5">¥{{ formatPrice(item.product.price) }}</p>
      </div>
      <div class="w-20">
        <p class="text-xs text-gray-500 dark:text-gray-400">Qty</p>
        <p class="text-sm font-medium text-gray-900 dark:text-white mt-0.5">{{ item.quantity }}</p>
      </div>
      <div class="w-32 hidden sm:block">
        <p class="text-xs text-gray-500 dark:text-gray-400">Subtotal</p>
        <p class="text-sm font-bold text-gray-900 dark:text-white mt-0.5">¥{{ formatPrice(item.subtotal) }}</p>
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

<template>
  <BaseCard
    :to="{ name: 'ProductDetail', params: { id: product.id } }"
    class="p-6"
  >
    <div class="flex flex-col gap-4">
      <div class="flex justify-between items-start">
        <div>
          <p class="text-xs font-medium uppercase tracking-wide text-gray-400">Product ID</p>
          <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">{{ product.id }}</p>
        </div>
        <span class="inline-flex items-center rounded-full bg-blue-50 dark:bg-blue-900/30 px-2.5 py-0.5 text-xs font-medium text-blue-700 dark:text-blue-300 ring-1 ring-inset ring-blue-700/10 dark:ring-blue-300/10">
          ¥{{ formatPrice(product.price) }}
        </span>
      </div>
      <div>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {{ product.name }}
        </h3>
      </div>
    </div>
  </BaseCard>
</template>

<script setup>
import BaseCard from '../../ui/BaseCard.vue'
import { formatPrice } from '../../../utils/calculations'

defineProps({
  product: {
    type: Object,
    required: true
  }
})
</script>

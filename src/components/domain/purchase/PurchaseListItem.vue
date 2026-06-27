<template>
  <BaseCard
    :to="{ name: 'PurchaseDetail', params: { id: purchase.id } }"
    class="p-5"
  >
    <!-- Mobile -->
    <div class="flex flex-col gap-4 sm:hidden">
      <div class="flex items-start justify-between">
        <div>
          <p class="text-xs font-medium uppercase tracking-wide text-gray-400">Date</p>
          <p class="mt-1 text-xl font-bold text-gray-900 dark:text-white">{{ purchase.date }}</p>
        </div>
        <div class="text-right">
          <p class="text-xs font-medium uppercase tracking-wide text-gray-400">Total</p>
          <p class="mt-1 text-lg font-bold text-gray-900 dark:text-white">¥{{ formatPrice(purchase.total) }}</p>
        </div>
      </div>
      <div>
        <span class="inline-flex items-center rounded-md bg-gray-50 dark:bg-gray-700/50 px-2 py-1 text-[10px] font-medium text-gray-500 dark:text-gray-400 ring-1 ring-inset ring-gray-500/10 dark:ring-gray-400/10">
          ID: {{ purchase.id }}
        </span>
      </div>
    </div>

    <!-- Desktop -->
    <div class="hidden items-center justify-between sm:flex">
      <div class="flex-1">
        <p class="text-xs font-medium uppercase tracking-wide text-gray-400">Date</p>
        <p class="mt-1 text-xl font-bold text-gray-900 dark:text-white">{{ purchase.date }}</p>
        <p class="mt-1.5 text-xs font-medium text-gray-400 dark:text-gray-500 font-mono">ID: {{ purchase.id }}</p>
      </div>

      <div class="w-48 text-right px-8 border-l border-gray-100 dark:border-gray-700">
        <p class="text-xs font-medium uppercase tracking-wide text-gray-400">Total Amount</p>
        <p class="mt-1 text-2xl font-bold text-gray-900 dark:text-white">¥{{ formatPrice(purchase.total) }}</p>
      </div>
    </div>
  </BaseCard>
</template>

<script setup>
import BaseCard from '../../ui/BaseCard.vue'
import { formatPrice } from '../../../utils/calculations'

defineProps({
  purchase: {
    type: Object,
    required: true
  }
})
</script>

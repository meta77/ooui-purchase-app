<template>
  <div class="space-y-6" v-if="product">
    <div class="space-y-4">
      <router-link to="/products" class="inline-flex items-center text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        商品一覧へ戻る
      </router-link>
      
      <div class="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div class="flex items-center gap-3">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white">{{ product.name }}</h2>
            <span class="inline-flex items-center rounded-md bg-gray-100 dark:bg-gray-700 px-2 py-1 text-xs font-medium text-gray-600 dark:text-gray-400 ring-1 ring-inset ring-gray-500/10 dark:ring-gray-400/10">
              {{ product.id }}
            </span>
          </div>
        </div>
        <div class="text-left sm:text-right">
          <p class="text-xs font-medium uppercase tracking-wide text-gray-400">Unit Price</p>
          <p class="mt-1 text-2xl font-bold text-gray-900 dark:text-white">¥{{ formatPrice(product.price) }}</p>
        </div>
      </div>
    </div>

    <div class="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
      <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 flex items-center justify-between">
        <h3 class="text-base font-semibold text-gray-900 dark:text-white">Purchase History (購入履歴)</h3>
        <span class="text-sm text-gray-500 dark:text-gray-400">{{ product.history.length }} records</span>
      </div>
      
      <div v-if="product.history.length > 0" class="divide-y divide-gray-200 dark:divide-gray-700">
        <router-link
          v-for="record in product.history"
          :key="record.purchaseId"
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
      </div>
      <div v-else class="p-8 text-center text-sm text-gray-500">
        購入履歴はありません。
      </div>
    </div>
  </div>
  
  <div v-else class="text-center py-12">
    <p class="text-gray-500">Product not found.</p>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { getProductDetails, formatPrice } from '../store/mockData'

const route = useRoute()
const product = computed(() => getProductDetails(route.params.id))
</script>

<template>
  <div class="space-y-6" v-if="inventory">
    <div class="space-y-4">
      <router-link to="/inventories" class="inline-flex items-center text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        棚卸し一覧へ戻る
      </router-link>
      
      <div class="bg-white dark:bg-gray-800 p-8 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div>
          <div class="flex items-center gap-3">
            <h2 class="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">{{ inventory.year }}年 棚卸し</h2>
            <span class="inline-flex items-center rounded-md bg-gray-100 dark:bg-gray-700 px-2.5 py-1 text-xs font-medium text-gray-600 dark:text-gray-400 ring-1 ring-inset ring-gray-500/10 dark:ring-gray-400/10">
              {{ inventory.id }}
            </span>
          </div>
          <p class="text-sm text-gray-500 dark:text-gray-400 mt-2 font-medium">実施日: {{ inventory.date }}</p>
        </div>
        <div class="text-left sm:text-right bg-gray-50 dark:bg-gray-900/50 p-4 rounded-xl">
          <p class="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">Total Value (棚卸総額)</p>
          <p class="mt-1 text-4xl font-black text-gray-900 dark:text-white tracking-tight">¥{{ formatPrice(inventory.total) }}</p>
        </div>
      </div>
    </div>

    <!-- Product Breakdown -->
    <div class="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
      <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 flex items-center justify-between">
        <h3 class="text-base font-semibold text-gray-900 dark:text-white">Inventory Items (在庫内訳)</h3>
        <span class="text-sm font-medium text-gray-500 dark:text-gray-400">{{ inventory.items.length }} products</span>
      </div>
      
      <div class="divide-y divide-gray-200 dark:divide-gray-700">
        <router-link
          v-for="item in inventory.items"
          :key="item.productId"
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
      </div>
    </div>
  </div>
  
  <div v-else class="text-center py-12">
    <p class="text-gray-500 dark:text-gray-400">Inventory not found.</p>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { getInventoryDetails, formatPrice } from '../store/mockData'

const route = useRoute()
const inventory = computed(() => getInventoryDetails(route.params.id))
</script>

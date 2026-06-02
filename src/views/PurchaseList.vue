<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white">Purchase List</h2>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">仕入れ一覧</p>
      </div>
      <div>
        <router-link to="/purchases/new" class="inline-flex items-center gap-1.5 px-4 py-2 bg-black text-white dark:bg-white dark:text-black text-sm font-medium rounded-xl hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors shadow-sm cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          新規追加
        </router-link>
      </div>
    </div>
    
    <div class="space-y-4">
      <router-link
        v-for="purchase in purchases"
        :key="purchase.id"
        :to="{ name: 'PurchaseDetail', params: { id: purchase.id } }"
        class="block group rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-gray-300 dark:hover:border-gray-700"
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
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { purchases, formatPrice } from '../store/mockData'
</script>

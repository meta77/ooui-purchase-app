<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-xl font-semibold text-gray-900">Purchase List</h2>
        <p class="text-sm text-gray-500 mt-1">仕入れ一覧</p>
      </div>
    </div>
    
    <div class="space-y-4">
      <router-link
        v-for="purchase in purchases"
        :key="purchase.id"
        :to="{ name: 'PurchaseDetail', params: { id: purchase.id } }"
        class="block group rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-gray-300"
      >
        <div class="flex flex-col gap-4 sm:hidden">
          <div>
            <p class="text-xs font-medium uppercase tracking-wide text-gray-400">Purchase ID</p>
            <p class="mt-1 text-lg font-semibold text-gray-900">{{ purchase.id }}</p>
          </div>
          <div class="flex items-center justify-between">
            <div>
              <p class="text-xs font-medium uppercase tracking-wide text-gray-400">Date</p>
              <p class="mt-1 text-sm text-gray-700">{{ purchase.date }}</p>
            </div>
            <div class="text-right">
              <p class="text-xs font-medium uppercase tracking-wide text-gray-400">Total</p>
              <p class="mt-1 text-lg font-semibold text-gray-900">¥{{ formatPrice(purchase.total) }}</p>
            </div>
          </div>
        </div>

        <div class="hidden items-center justify-between sm:flex">
          <div class="min-w-0 flex-1">
            <p class="text-xs font-medium uppercase tracking-wide text-gray-400">Purchase ID</p>
            <p class="mt-1 truncate text-lg font-semibold text-gray-900">{{ purchase.id }}</p>
          </div>
          <div class="w-48">
            <p class="text-xs font-medium uppercase tracking-wide text-gray-400">Date</p>
            <p class="mt-1 text-sm text-gray-700">{{ purchase.date }}</p>
          </div>
          <div class="w-40 text-right">
            <p class="text-xs font-medium uppercase tracking-wide text-gray-400">Total</p>
            <p class="mt-1 text-lg font-semibold text-gray-900">¥{{ formatPrice(purchase.total) }}</p>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { purchases, formatPrice } from '../store/mockData'
</script>

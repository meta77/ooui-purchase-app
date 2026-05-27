<template>
  <div class="space-y-6" v-if="purchase">
    <!-- Back & Header (Object properties) -->
    <div class="space-y-4">
      <router-link to="/purchases" class="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        仕入れ一覧へ戻る
      </router-link>
      
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-6 bg-white p-8 rounded-2xl border border-gray-200 shadow-sm relative overflow-hidden">
        <div class="flex-1">
          <p class="text-xs font-medium uppercase tracking-wide text-gray-400">Date</p>
          <h2 class="mt-1 text-3xl font-extrabold text-gray-900 tracking-tight">{{ purchase.date }}</h2>
          <div class="mt-3">
            <span class="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-mono font-medium text-gray-500 ring-1 ring-inset ring-gray-500/10">
              ID: {{ purchase.id }}
            </span>
          </div>
        </div>
        
        <div class="sm:text-right sm:pl-12 sm:border-l sm:border-gray-100">
          <p class="text-xs font-medium uppercase tracking-wide text-gray-400">Total Amount</p>
          <p class="mt-1 text-3xl font-extrabold text-gray-900">¥{{ formatPrice(purchase.total) }}</p>
        </div>
      </div>
    </div>

    <!-- Associated objects (Purchase Items) -->
    <div class="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      <div class="px-6 py-4 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
        <h3 class="text-base font-semibold text-gray-900">Purchase Items (商品一覧)</h3>
        <span class="text-sm text-gray-500">{{ purchase.items.length }} items</span>
      </div>
      <div class="divide-y divide-gray-200">
        <router-link
          v-for="item in purchase.items"
          :key="item.productId"
          :to="{ name: 'ProductDetail', params: { id: item.productId } }"
          class="flex items-center justify-between p-6 hover:bg-gray-50 transition-colors group"
        >
          <div class="flex-1">
            <p class="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
              {{ item.product.name }}
            </p>
            <p class="text-xs text-gray-500 mt-1">{{ item.productId }}</p>
          </div>
          <div class="flex items-center gap-8 text-right">
            <div class="w-32 hidden sm:block">
              <p class="text-xs text-gray-500">Unit Price</p>
              <p class="text-sm text-gray-900 mt-0.5">¥{{ formatPrice(item.product.price) }}</p>
            </div>
            <div class="w-20">
              <p class="text-xs text-gray-500">Qty</p>
              <p class="text-sm font-medium text-gray-900 mt-0.5">{{ item.quantity }}</p>
            </div>
            <div class="w-32 hidden sm:block">
              <p class="text-xs text-gray-500">Subtotal</p>
              <p class="text-sm font-bold text-gray-900 mt-0.5">¥{{ formatPrice(item.subtotal) }}</p>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
  
  <div v-else class="text-center py-12">
    <p class="text-gray-500">Purchase not found.</p>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { getPurchaseDetails, formatPrice } from '../store/mockData'

const route = useRoute()
const purchase = computed(() => getPurchaseDetails(route.params.id))
</script>

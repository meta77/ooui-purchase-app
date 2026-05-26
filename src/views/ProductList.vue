<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-xl font-semibold text-gray-900">Product List</h2>
        <p class="text-sm text-gray-500 mt-1">商品一覧</p>
      </div>
    </div>
    
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <router-link
        v-for="product in products"
        :key="product.id"
        :to="{ name: 'ProductDetail', params: { id: product.id } }"
        class="block group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-gray-300"
      >
        <div class="flex flex-col gap-4">
          <div class="flex justify-between items-start">
            <div>
              <p class="text-xs font-medium uppercase tracking-wide text-gray-400">Product ID</p>
              <p class="mt-1 text-sm text-gray-500">{{ product.id }}</p>
            </div>
            <span class="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
              ¥{{ formatPrice(product.price) }}
            </span>
          </div>
          <div>
            <h3 class="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
              {{ product.name }}
            </h3>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { products, formatPrice } from '../store/mockData'
</script>

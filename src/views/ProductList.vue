<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white">Product List</h2>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">商品一覧</p>
      </div>
      <BaseButton to="/products/new">
        <template #icon>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
          </svg>
        </template>
        New Product
      </BaseButton>
    </div>
    
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <ProductListItem
          v-for="product in products"
          :key="product.id"
          :product="product"
        />
    </div>
  </div>
</template>

<script setup>
import BaseButton from '../components/ui/BaseButton.vue'
import ProductListItem from '../components/domain/product/ProductListItem.vue'
import { products } from '../store/mockData'
</script>

<template>
  <div class="space-y-6" v-if="product">
    <div class="space-y-4">
      <BaseBackLink to="/products">商品一覧へ戻る</BaseBackLink>
      
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

    <!-- Purchase History -->
    <BaseSection>
      <template #header>
        <div class="flex items-center justify-between w-full">
          <h3 class="text-base font-semibold text-gray-900 dark:text-white">Purchase History (購入履歴)</h3>
          <span class="text-sm text-gray-500 dark:text-gray-400">{{ product.history.length }} records</span>
        </div>
      </template>
      
      <div v-if="product.history.length > 0" class="divide-y divide-gray-200 dark:divide-gray-700">
        <ProductPurchaseHistoryRow
          v-for="record in product.history"
          :key="record.purchaseId"
          :record="record"
        />
      </div>
      <div v-else class="p-8 text-center text-sm text-gray-500">
        購入履歴はありません。
      </div>
    </BaseSection>

    <!-- Inventory History -->
    <BaseSection>
      <template #header>
        <div class="flex items-center justify-between w-full">
          <h3 class="text-base font-semibold text-gray-900 dark:text-white">Inventory History (棚卸し履歴)</h3>
          <span class="text-sm text-gray-500 dark:text-gray-400">{{ product.inventoryHistory.length }} records</span>
        </div>
      </template>
      
      <div v-if="product.inventoryHistory.length > 0" class="divide-y divide-gray-200 dark:divide-gray-700">
        <ProductInventoryHistoryRow
          v-for="record in product.inventoryHistory"
          :key="record.inventoryId"
          :record="record"
        />
      </div>
      <div v-else class="p-8 text-center text-sm text-gray-500">
        棚卸し履歴はありません。
      </div>
    </BaseSection>
  </div>
  
  <div v-else class="text-center py-12">
    <p class="text-gray-500">Product not found.</p>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { getProductDetails } from '../store/mockData'
import { formatPrice } from '../utils/calculations'

import BaseBackLink from '../components/ui/BaseBackLink.vue'
import BaseSection from '../components/ui/BaseSection.vue'
import ProductPurchaseHistoryRow from '../components/domain/product/ProductPurchaseHistoryRow.vue'
import ProductInventoryHistoryRow from '../components/domain/product/ProductInventoryHistoryRow.vue'

const route = useRoute()
const product = computed(() => getProductDetails(route.params.id))
</script>

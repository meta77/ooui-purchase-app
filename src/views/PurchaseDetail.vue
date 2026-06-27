<template>
  <div class="space-y-6" v-if="purchase">
    <!-- Back & Header -->
    <div class="space-y-4">
      <BaseBackLink to="/purchases">
        仕入れ一覧へ戻る
      </BaseBackLink>
      
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-6 bg-white dark:bg-gray-800 p-8 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm relative overflow-hidden">
        <div class="flex-1">
          <p class="text-xs font-medium uppercase tracking-wide text-gray-400">Date</p>
          <h2 class="mt-1 text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">{{ purchase.date }}</h2>
          <div class="mt-3">
            <span class="inline-flex items-center rounded-md bg-gray-50 dark:bg-gray-700/50 px-2 py-1 text-xs font-mono font-medium text-gray-500 dark:text-gray-400 ring-1 ring-inset ring-gray-500/10 dark:ring-gray-400/10">
              ID: {{ purchase.id }}
            </span>
          </div>
        </div>
        
        <div class="sm:text-right sm:pl-12 sm:border-l sm:border-gray-100 dark:sm:border-gray-700">
          <p class="text-xs font-medium uppercase tracking-wide text-gray-400">Total Amount</p>
          <p class="mt-1 text-3xl font-extrabold text-gray-900 dark:text-white">¥{{ formatPrice(purchase.total) }}</p>
        </div>
      </div>
    </div>

    <!-- Associated objects (Purchase Items) -->
    <BaseSection title="Purchase Items (商品一覧)">
      <template #header-right>
        <span class="text-sm text-gray-500 dark:text-gray-400">{{ purchase.items.length }} items</span>
      </template>
      <div class="divide-y divide-gray-200 dark:divide-gray-700">
        <PurchaseItemRow
          v-for="item in purchase.items"
          :key="item.productId"
          :item="item"
        />
      </div>
    </BaseSection>
  </div>
  
  <div v-else class="text-center py-12">
    <p class="text-gray-500">Purchase not found.</p>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { getPurchaseDetails } from '../store/mockData'
import { formatPrice } from '../utils/calculations'
import BaseBackLink from '../components/ui/BaseBackLink.vue'
import BaseSection from '../components/ui/BaseSection.vue'
import PurchaseItemRow from '../components/domain/purchase/PurchaseItemRow.vue'

const route = useRoute()
const purchase = computed(() => getPurchaseDetails(route.params.id))
</script>

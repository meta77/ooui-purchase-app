<template>
  <div class="space-y-6" v-if="inventory">
    <div class="space-y-4">
      <BaseBackLink to="/inventories">棚卸し一覧へ戻る</BaseBackLink>
      
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
    <BaseSection>
      <template #header>
        <div class="flex items-center justify-between w-full">
          <h3 class="text-base font-semibold text-gray-900 dark:text-white">Inventory Items (在庫内訳)</h3>
          <span class="text-sm font-medium text-gray-500 dark:text-gray-400">{{ inventory.items.length }} products</span>
        </div>
      </template>
      
      <div class="divide-y divide-gray-200 dark:divide-gray-700">
        <InventoryItemRow
          v-for="item in inventory.items"
          :key="item.productId"
          :item="item"
        />
      </div>
    </BaseSection>
  </div>
  
  <div v-else class="text-center py-12">
    <p class="text-gray-500 dark:text-gray-400">Inventory not found.</p>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { getInventoryDetails } from '../store/mockData'
import { formatPrice } from '../utils/calculations'

import BaseBackLink from '../components/ui/BaseBackLink.vue'
import BaseSection from '../components/ui/BaseSection.vue'
import InventoryItemRow from '../components/domain/inventory/InventoryItemRow.vue'

const route = useRoute()
const inventory = computed(() => getInventoryDetails(route.params.id))
</script>

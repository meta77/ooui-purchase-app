<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white">Purchase List</h2>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">仕入れ一覧</p>
      </div>
      <div>
        <BaseButton to="/purchases/new">
          <template #icon>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
          </template>
          新規追加
        </BaseButton>
      </div>
    </div>
    
    <div class="space-y-4">
      <PurchaseListItem
        v-for="purchase in purchases"
        :key="purchase.id"
        :purchase="purchase"
      />
    </div>
  </div>
</template>

<script setup>
import BaseButton from '../components/ui/BaseButton.vue'
import PurchaseListItem from '../components/domain/purchase/PurchaseListItem.vue'
import { purchases } from '../store/mockData'
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white">Inventory List</h2>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">棚卸し一覧</p>
      </div>
    </div>
    
    <div class="space-y-4">
      <InventoryListCard
        v-for="inventory in inventories"
        :key="inventory.id"
        :inventory="inventory"
      />
    </div>
  </div>
</template>

<script setup>
import { inventories } from '../store/mockData'
import InventoryListCard from '../components/domain/inventory/InventoryListCard.vue'
</script>

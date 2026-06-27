<template>
  <div class="space-y-6">
    <div class="space-y-4">
      <BaseBackLink to="/purchases">
        仕入れ一覧へやめる
      </BaseBackLink>
      
      <div class="bg-white dark:bg-gray-800 p-8 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 border-b border-gray-100 dark:border-gray-700 pb-6 mb-6">
          <div class="flex-1">
            <h2 class="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">New Purchase</h2>
            <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">新規仕入れの登録</p>
          </div>
          <div>
            <label class="block text-xs font-medium uppercase tracking-wide text-gray-400 mb-1">Date</label>
            <BaseInput type="date" v-model="date" required />
          </div>
        </div>

        <div class="space-y-4">
          <h3 class="text-base font-semibold text-gray-900 dark:text-white">Purchase Items</h3>
          
          <PurchaseItemFormRow
            v-for="(item, index) in selectedItems"
            :key="index"
            :item="item"
            :availableProducts="getAvailableProducts(index)"
            :canRemove="selectedItems.length > 1"
            @remove="removeItem(index)"
          />

          <button v-if="selectedItems.length < products.length" @click="addItem" class="mt-4 flex items-center gap-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
            </svg>
            商品を追加する
          </button>
        </div>

        <div class="mt-8 border-t border-gray-100 dark:border-gray-700 pt-6 flex flex-col sm:flex-row justify-between items-center gap-6">
          <div class="text-left w-full sm:w-auto">
            <p class="text-xs font-medium uppercase tracking-wide text-gray-400">Total Amount</p>
            <p class="mt-1 text-3xl font-extrabold text-gray-900 dark:text-white">¥{{ formatPrice(totalAmount) }}</p>
          </div>
          
          <button @click="save" class="w-full sm:w-auto px-8 py-3 text-sm font-medium text-white bg-black dark:bg-gray-700 rounded-xl hover:bg-gray-800 dark:hover:bg-gray-600 transition-all shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black">
            保存する
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import BaseBackLink from '../components/ui/BaseBackLink.vue'
import BaseInput from '../components/ui/form/BaseInput.vue'
import PurchaseItemFormRow from '../components/domain/purchase/PurchaseItemFormRow.vue'
import { formatPrice } from '../utils/calculations'
import { usePurchaseForm } from '../composables/usePurchaseForm'

const {
  date,
  selectedItems,
  totalAmount,
  products,
  getAvailableProducts,
  addItem,
  removeItem,
  save
} = usePurchaseForm()
</script>

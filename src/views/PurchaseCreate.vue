<template>
  <div class="space-y-6">
    <div class="space-y-4">
      <router-link to="/purchases" class="inline-flex items-center text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        仕入れ一覧へやめる
      </router-link>
      
      <div class="bg-white dark:bg-gray-800 p-8 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 border-b border-gray-100 dark:border-gray-700 pb-6 mb-6">
          <div class="flex-1">
            <h2 class="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">New Purchase</h2>
            <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">新規仕入れの登録</p>
          </div>
          <div>
            <label class="block text-xs font-medium uppercase tracking-wide text-gray-400 mb-1">Date</label>
            <input type="date" v-model="date" class="bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-black focus:border-black block w-full p-2.5 outline-none transition-colors" required>
          </div>
        </div>

        <div class="space-y-4">
          <h3 class="text-base font-semibold text-gray-900 dark:text-white">Purchase Items</h3>
          
          <div v-for="(item, index) in selectedItems" :key="index" class="flex flex-col sm:flex-row gap-4 items-end bg-gray-50 dark:bg-gray-900/50 p-4 rounded-xl border border-gray-100 dark:border-gray-700">
            <div class="flex-1 w-full">
              <label class="block text-xs text-gray-500 dark:text-gray-400 mb-1">Product</label>
              <select v-model="item.productId" class="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-black focus:border-black block w-full p-2.5 outline-none transition-colors">
                <option v-for="product in products" :key="product.id" :value="product.id">
                  {{ product.name }} (¥{{ formatPrice(product.price) }})
                </option>
              </select>
            </div>
            
            <div class="w-full sm:w-32">
              <label class="block text-xs text-gray-500 dark:text-gray-400 mb-1">Quantity</label>
              <input type="number" v-model.number="item.quantity" min="1" class="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-black focus:border-black block w-full p-2.5 outline-none transition-colors" required>
            </div>

            <button @click="removeItem(index)" :disabled="selectedItems.length <= 1" class="w-full sm:w-auto px-3 py-2.5 text-sm font-medium text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
              削除
            </button>
          </div>

          <button @click="addItem" class="mt-4 flex items-center gap-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 transition-colors">
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
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { products, addPurchase, formatPrice } from '../store/mockData'

const router = useRouter()

// Default to today using YYYY-MM-DD for date input
const today = new Date().toISOString().split('T')[0]
const date = ref(today)

const selectedItems = ref([
  { productId: products[0].id, quantity: 1 }
])

const totalAmount = computed(() => {
  return selectedItems.value.reduce((total, item) => {
    const product = products.find(p => p.id === item.productId)
    return total + (product ? product.price * item.quantity : 0)
  }, 0)
})

const addItem = () => {
  selectedItems.value.push({ productId: products[0].id, quantity: 1 })
}

const removeItem = (index) => {
  if (selectedItems.value.length > 1) {
    selectedItems.value.splice(index, 1)
  }
}

const save = () => {
  const validItems = selectedItems.value.filter(item => item.quantity > 0)
  if (validItems.length === 0) return
  
  // mockData uses YYYY/MM/DD
  const formattedDate = date.value.replace(/-/g, '/')
  const newId = addPurchase(formattedDate, validItems)
  
  router.push(`/purchases/${newId}`)
}
</script>

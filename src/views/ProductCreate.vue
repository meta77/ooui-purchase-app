<template>
  <div class="space-y-6">
    <div class="space-y-4">
      <router-link to="/products" class="inline-flex items-center text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        商品一覧へ戻る
      </router-link>
      
      <div class="bg-white dark:bg-gray-800 p-8 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 border-b border-gray-100 dark:border-gray-700 pb-6 mb-6">
          <div class="flex-1">
            <h2 class="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">New Product</h2>
            <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">新規商品の登録</p>
          </div>
        </div>

        <div class="space-y-4">
          <div>
            <label class="block text-xs font-medium uppercase tracking-wide text-gray-400 mb-1">Product Name</label>
            <input type="text" v-model="name" class="bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-black focus:border-black block w-full p-2.5 outline-none transition-colors" placeholder="例: ボールペン" required>
          </div>
          <div>
            <label class="block text-xs font-medium uppercase tracking-wide text-gray-400 mb-1">Price (¥)</label>
            <input type="number" v-model.number="price" min="0" class="bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-black focus:border-black block w-full p-2.5 outline-none transition-colors" placeholder="例: 1500" required>
          </div>
        </div>

        <div class="mt-8 border-t border-gray-100 dark:border-gray-700 pt-6 flex justify-end">
          <button @click="save" :disabled="!isValid" class="w-full sm:w-auto px-8 py-3 text-sm font-medium text-white bg-black dark:bg-gray-700 rounded-xl hover:bg-gray-800 dark:hover:bg-gray-600 transition-all shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black disabled:opacity-50 disabled:cursor-not-allowed">
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
import { addProduct } from '../store/mockData'

const router = useRouter()

const name = ref('')
const price = ref(0)

const isValid = computed(() => name.value.trim() !== '' && price.value >= 0)

const save = () => {
  if (!isValid.value) return
  
  const newId = addProduct(name.value.trim(), price.value)
  router.push(`/products/${newId}`)
}
</script>

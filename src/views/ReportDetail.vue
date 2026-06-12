<template>
  <div class="space-y-6">
    <div class="space-y-4">
      <router-link to="/reports" class="inline-flex items-center text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        レポート一覧へ戻る
      </router-link>
      
      <div v-if="report" class="bg-white dark:bg-gray-800 p-8 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
        <div class="border-b border-gray-100 dark:border-gray-700 pb-6 mb-8">
          <h2 class="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">{{ report.year }}年度 売上原価</h2>
          <p class="text-sm text-gray-500 dark:text-gray-400 mt-2">Cost of Goods Sold (COGS)</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr_auto_1fr] gap-4 mb-8 items-stretch">
          <div class="bg-gray-50 dark:bg-gray-900/50 p-6 rounded-xl border border-gray-100 dark:border-gray-800 flex flex-col justify-center">
            <div class="text-sm text-gray-500 dark:text-gray-400 mb-2 font-medium">前期末の棚卸高</div>
            <div class="text-2xl font-bold text-gray-900 dark:text-white">¥{{ formatPrice(report.previousInventoryTotal) }}</div>
          </div>
          <div class="hidden md:flex flex-col items-center justify-center text-gray-400 dark:text-gray-600 px-2">
            <div class="text-2xl font-bold">+</div>
          </div>
          <div class="flex md:hidden items-center justify-center text-gray-400 dark:text-gray-600 py-2">
            <div class="text-2xl font-bold">+</div>
          </div>
          <div class="bg-gray-50 dark:bg-gray-900/50 p-6 rounded-xl border border-gray-100 dark:border-gray-800 flex flex-col justify-center">
            <div class="text-sm text-gray-500 dark:text-gray-400 mb-2 font-medium">今期の仕入れ高</div>
            <div class="text-2xl font-bold text-gray-900 dark:text-white">¥{{ formatPrice(report.purchasesTotal) }}</div>
          </div>
          <div class="hidden md:flex flex-col items-center justify-center text-gray-400 dark:text-gray-600 px-2">
            <div class="text-2xl font-bold">-</div>
          </div>
          <div class="flex md:hidden items-center justify-center text-gray-400 dark:text-gray-600 py-2">
            <div class="text-2xl font-bold">-</div>
          </div>
          <div class="bg-gray-50 dark:bg-gray-900/50 p-6 rounded-xl border border-gray-100 dark:border-gray-800 flex flex-col justify-center">
            <div class="text-sm text-gray-500 dark:text-gray-400 mb-2 font-medium">今期末の棚卸高</div>
            <div class="text-2xl font-bold text-gray-900 dark:text-white">¥{{ formatPrice(report.currentInventoryTotal) }}</div>
          </div>
        </div>

        <div class="flex items-center justify-center mb-8 text-gray-400 dark:text-gray-600">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>

        <div class="bg-black dark:bg-gray-800 p-8 rounded-2xl shadow-md text-center border border-gray-800 dark:border-gray-700 relative overflow-hidden">
          <div class="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
          <div class="relative z-10">
            <div class="text-sm text-gray-300 dark:text-gray-400 mb-2 uppercase tracking-widest font-semibold">売上原価</div>
            <div class="text-5xl font-black text-white tracking-tight">¥{{ formatPrice(report.cogs) }}</div>
          </div>
        </div>
      </div>
      
      <div v-else class="text-center py-12">
        <p class="text-gray-500 dark:text-gray-400">レポートが見つかりません。</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { getReportDetails, formatPrice } from '../store/mockData'

const route = useRoute()
const report = computed(() => {
  const year = parseInt(route.params.year, 10)
  return getReportDetails(year)
})
</script>

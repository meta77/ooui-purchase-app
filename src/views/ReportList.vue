<template>
  <div class="space-y-6">
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white">Reports</h2>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">年度別 売上原価一覧</p>
      </div>
    </div>
    
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-sm text-left">
          <thead class="bg-gray-50 dark:bg-gray-900/50 text-gray-500 dark:text-gray-400 font-medium border-b border-gray-200 dark:border-gray-700">
            <tr>
              <th class="px-6 py-4">年度</th>
              <th class="px-6 py-4 text-right">売上原価</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100 dark:divide-gray-800">
            <ReportListRow
              v-for="report in reports"
              :key="report.year"
              :report="report"
            />
            <tr v-if="reports.length === 0">
              <td colspan="2" class="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                データがありません
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { getReports } from '../store/mockData'
import ReportListRow from '../components/domain/report/ReportListRow.vue'

const reports = computed(() => getReports())
</script>

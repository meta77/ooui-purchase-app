<template>
  <tr @click="goToDetail(report.year)" class="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer group">
    <td class="px-6 py-4 font-medium text-gray-900 dark:text-white">
      {{ report.year }}年
    </td>
    <td class="px-6 py-4 text-right font-medium text-gray-900 dark:text-white">
      ¥{{ formatPrice(report.cogs) }}
    </td>
  </tr>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { formatPrice } from '../../../utils/calculations'

defineProps({
  report: {
    type: Object,
    required: true
  }
})

const router = useRouter()
const goToDetail = (year) => {
  router.push(`/reports/${year}`)
}
</script>

<template>
  <div class="flex flex-col sm:flex-row gap-4 items-end bg-gray-50 dark:bg-gray-900/50 p-4 rounded-xl border border-gray-100 dark:border-gray-700">
    <div class="flex-1 w-full">
      <label class="block text-xs text-gray-500 dark:text-gray-400 mb-1">Product</label>
      <BaseSelect v-model="item.productId">
        <option v-for="product in availableProducts" :key="product.id" :value="product.id">
          {{ product.name }} (¥{{ formatPrice(product.price) }})
        </option>
      </BaseSelect>
    </div>
    
    <div class="w-full sm:w-32">
      <label class="block text-xs text-gray-500 dark:text-gray-400 mb-1">Quantity</label>
      <BaseInput type="number" v-model.number="item.quantity" min="1" required />
    </div>

    <button @click="$emit('remove')" :disabled="!canRemove" class="w-full sm:w-auto px-3 py-2.5 text-sm font-medium text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
      削除
    </button>
  </div>
</template>

<script setup>
import BaseInput from '../../ui/form/BaseInput.vue'
import BaseSelect from '../../ui/form/BaseSelect.vue'
import { formatPrice } from '../../../utils/calculations'

defineProps({
  item: {
    type: Object,
    required: true
  },
  availableProducts: {
    type: Array,
    required: true
  },
  canRemove: {
    type: Boolean,
    default: true
  }
})

defineEmits(['remove'])
</script>

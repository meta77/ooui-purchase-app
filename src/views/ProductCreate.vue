<template>
  <div class="space-y-6">
    <div class="space-y-4">
      <BaseBackLink to="/products">商品一覧へ戻る</BaseBackLink>
      
      <BaseSection>
        <template #header>
          <div class="flex-1">
            <h2 class="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">New Product</h2>
            <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">新規商品の登録</p>
          </div>
        </template>

        <div class="space-y-4">
          <div>
            <label class="block text-xs font-medium uppercase tracking-wide text-gray-400 mb-1">Product Name</label>
            <BaseInput type="text" v-model="name" placeholder="例: ボールペン" required />
          </div>
          <div>
            <label class="block text-xs font-medium uppercase tracking-wide text-gray-400 mb-1">Price (¥)</label>
            <BaseInput type="number" v-model.number="price" min="0" placeholder="例: 1500" required />
          </div>
        </div>

        <div class="mt-8 border-t border-gray-100 dark:border-gray-700 pt-6 flex justify-end">
          <BaseButton @click="save" :disabled="!isValid" class="w-full sm:w-auto px-8 py-3">
            保存する
          </BaseButton>
        </div>
      </BaseSection>
    </div>
  </div>
</template>

<script setup>
import BaseBackLink from '../components/ui/BaseBackLink.vue'
import BaseSection from '../components/ui/BaseSection.vue'
import BaseInput from '../components/ui/form/BaseInput.vue'
import BaseButton from '../components/ui/BaseButton.vue'
import { useProductForm } from '../composables/useProductForm'

const { name, price, isValid, save } = useProductForm()
</script>

<template>
  <div class="relative">
    <button
      @click="isOpen = !isOpen"
      class="flex items-center space-x-2 px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-sm"
    >
      <span>{{ selectedModel?.name || '选择模型' }}</span>
      <ChevronDownIcon class="w-4 h-4" />
    </button>

    <div
      v-if="isOpen"
      class="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-10"
    >
      <div class="p-2">
        <div
          v-for="model in models"
          :key="model.id"
          @click="selectModel(model)"
          :class="[
            'p-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg',
            selectedModel?.id === model.id ? 'bg-blue-50 dark:bg-blue-900' : ''
          ]"
        >
          <div class="font-medium text-gray-900 dark:text-white">{{ model.name }}</div>
          <div class="text-xs text-gray-500 dark:text-gray-400">{{ model.description }}</div>
          <div class="text-xs text-gray-400 mt-1">
            ¥{{ model.price.input }}/1K tokens
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ChevronDownIcon } from '@heroicons/vue/24/outline'
import { models, type AIModel } from '@/config/models'

const props = defineProps<{
  selectedModel: AIModel | null
}>()

const emit = defineEmits<{
  'update:selectedModel': [model: AIModel]
}>()

const isOpen = ref(false)

const selectModel = (model: AIModel) => {
  emit('update:selectedModel', model)
  isOpen.value = false
}
</script>
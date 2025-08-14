<template>
  <div class="relative">
    <button
      @click="isOpen = !isOpen"
      class="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
    >
      <UserCircleIcon class="w-6 h-6 text-gray-600 dark:text-gray-400" />
      <span class="text-sm text-gray-700 dark:text-gray-300">用户</span>
    </button>

    <!-- Dropdown Menu -->
    <div
      v-if="isOpen"
      class="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-10"
    >
      <a
        href="#"
        class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        个人设置
      </a>
      <a
        href="#"
        class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        使用统计
      </a>
      <hr class="my-1 border-gray-200 dark:border-gray-700" />
      <a
        href="#"
        class="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        退出登录
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { UserCircleIcon } from '@heroicons/vue/24/outline'

const isOpen = ref(false)
</script>
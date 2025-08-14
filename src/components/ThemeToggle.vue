<template>
  <button
    @click="() => toggleTheme()"
    class="p-2 rounded-lg text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
    :title="isDark ? '切换到浅色模式' : '切换到深色模式'"
  >
    <SunIcon v-if="isDark" class="w-5 h-5" />
    <MoonIcon v-else class="w-5 h-5" />
  </button>
</template>

<script setup lang="ts">
import { SunIcon, MoonIcon } from '@heroicons/vue/24/outline'
import { useDark, useToggle } from '@vueuse/core'

// 确保主题切换正常工作
const isDark = useDark({
  selector: 'html',
  attribute: 'class',
  valueDark: 'dark',
  valueLight: '',
  storageKey: 'theme-preference',
  storage: localStorage,
})

const toggleTheme = useToggle(isDark)
</script>
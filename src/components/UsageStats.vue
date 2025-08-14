<template>
  <div class="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
    <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">使用统计</h3>
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div class="text-center">
        <div class="text-3xl font-bold text-blue-600">{{ stats.totalMessages }}</div>
        <div class="text-sm text-gray-500 dark:text-gray-400">总消息数</div>
      </div>
      
      <div class="text-center">
        <div class="text-3xl font-bold text-green-600">{{ stats.totalSessions }}</div>
        <div class="text-sm text-gray-500 dark:text-gray-400">会话数量</div>
      </div>
      
      <div class="text-center">
        <div class="text-3xl font-bold text-purple-600">{{ stats.usageDays }}</div>
        <div class="text-sm text-gray-500 dark:text-gray-400">使用天数</div>
      </div>
    </div>
    
    <div class="mt-6">
      <h4 class="text-sm font-medium text-gray-900 dark:text-white mb-2">每日使用趋势</h4>
      <div class="h-32 bg-gray-50 dark:bg-gray-700 rounded-lg flex items-center justify-center">
        <span class="text-gray-500 dark:text-gray-400">图表数据加载中...</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useChatStore } from '@/stores/chat'

const chatStore = useChatStore()

const stats = computed(() => {
  const totalMessages = chatStore.sessions.reduce(
    (sum, session) => sum + session.messages.length,
    0
  )
  
  const totalSessions = chatStore.sessions.length
  const usageDays = new Set(
    chatStore.sessions.map(s => s.createdAt.toDateString())
  ).size

  return {
    totalMessages,
    totalSessions,
    usageDays: usageDays || 1
  }
})
</script>
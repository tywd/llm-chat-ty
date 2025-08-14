<template>
  <DefaultLayout>
    <div class="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-8">使用统计</h1>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div class="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <div class="text-2xl font-bold text-blue-600">{{ stats.totalMessages }}</div>
          <div class="text-sm text-gray-500 dark:text-gray-400">总消息数</div>
        </div>
        
        <div class="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <div class="text-2xl font-bold text-green-600">{{ stats.totalSessions }}</div>
          <div class="text-sm text-gray-500 dark:text-gray-400">会话数量</div>
        </div>
        
        <div class="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <div class="text-2xl font-bold text-purple-600">{{ stats.usageDays }}</div>
          <div class="text-sm text-gray-500 dark:text-gray-400">使用天数</div>
        </div>
        
        <div class="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <div class="text-2xl font-bold text-orange-600">{{ stats.avgMessagesPerSession.toFixed(1) }}</div>
          <div class="text-sm text-gray-500 dark:text-gray-400">平均消息/会话</div>
        </div>
      </div>

      <UsageStats />
      
      <!-- 模型使用统计 -->
      <div class="bg-white dark:bg-gray-800 shadow rounded-lg mt-6">
        <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 class="text-lg font-medium text-gray-900 dark:text-white">模型使用统计</h2>
        </div>
        <div class="p-6">
          <div class="space-y-4">
            <div
              v-for="model in modelStats"
              :key="model.id"
              class="flex justify-between items-center"
            >
              <span class="text-gray-700 dark:text-gray-300">{{ model.name }}</span>
              <span class="text-sm text-gray-500 dark:text-gray-400">{{ model.count }} 次使用</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </DefaultLayout>
</template>

<script setup lang="ts">
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import UsageStats from '@/components/UsageStats.vue'
import { computed } from 'vue'
import { useChatStore } from '@/stores/chat'
import { models } from '@/config/models'

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
    usageDays: usageDays || 1,
    avgMessagesPerSession: totalSessions > 0 ? totalMessages / totalSessions : 0
  }
})

const modelStats = computed(() => {
  const modelCounts: Record<string, number> = {}
  
  chatStore.sessions.forEach(session => {
    modelCounts[session.model] = (modelCounts[session.model] || 0) + 1
  })

  return models.map(model => ({
    id: model.id,
    name: model.name,
    count: modelCounts[model.id] || 0
  }))
})
</script>
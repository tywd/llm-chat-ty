<template>
  <div class="flex h-screen">
    <!-- Sidebar -->
    <aside class="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
      <div class="p-4">
        <button
          @click="createNewSession"
          class="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <PlusIcon class="w-5 h-5 mr-2" />
          新对话
        </button>
      </div>
      
      <div class="flex-1 overflow-y-auto">
        <div
          v-for="session in sessions"
          :key="session.id"
          @click="selectSession(session.id)"
          :class="[
            'p-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors',
            session.id === currentSessionId ? 'bg-gray-100 dark:bg-gray-700 border-r-2 border-blue-600' : ''
          ]"
        >
          <div class="text-sm font-medium text-gray-900 dark:text-white truncate">
            {{ session.title }}
          </div>
          <div class="text-xs text-gray-500 dark:text-gray-400">
            {{ formatDate(session.updatedAt) }}
          </div>
        </div>
      </div>
    </aside>

    <!-- Chat Area -->
    <div class="flex-1 flex flex-col">
      <!-- Messages -->
      <div class="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-900">
        <div
          v-for="message in messages"
          :key="message.id"
          :class="[
            'flex',
            message.role === 'user' ? 'justify-end' : 'justify-start'
          ]"
        >
          <div
            :class="[
              'max-w-3xl px-4 py-2 rounded-lg text-sm',
              message.role === 'user'
                ? 'bg-blue-600 text-white'
                : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm border border-gray-200 dark:border-gray-700'
            ]"
          >
            {{ message.content }}
          </div>
        </div>
        
        <!-- Empty State -->
        <div v-if="messages.length === 0" class="flex items-center justify-center h-full">
          <div class="text-center">
            <ChatBubbleLeftRightIcon class="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p class="text-gray-500 dark:text-gray-400">开始新的对话</p>
          </div>
        </div>
      </div>

      <!-- Input Area -->
      <div class="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4">
        <div class="flex space-x-2 max-w-4xl mx-auto">
          <textarea
            v-model="inputMessage"
            @keydown.enter.prevent="sendMessage"
            placeholder="输入消息..."
            class="flex-1 resize-none rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent px-3 py-2"
            rows="1"
          />
          <button
            @click="sendMessage"
            :disabled="!inputMessage.trim()"
            class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <PaperAirplaneIcon class="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { PlusIcon, PaperAirplaneIcon, ChatBubbleLeftRightIcon } from '@heroicons/vue/24/outline'
import { useChatStore } from '@/stores/chat'

const chatStore = useChatStore()
const inputMessage = ref('')

const sessions = computed(() => chatStore.sessions)
const currentSessionId = computed(() => chatStore.currentSessionId)
const messages = computed(() => chatStore.allMessages)

const createNewSession = () => {
  chatStore.createSession()
}

const selectSession = (sessionId: string) => {
  chatStore.currentSessionId = sessionId
}

const sendMessage = () => {
  if (inputMessage.value.trim()) {
    chatStore.addMessage(inputMessage.value.trim())
    inputMessage.value = ''
  }
}

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('zh-CN', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date)
}

// 初始化会话
if (!currentSessionId.value) {
  chatStore.createSession('欢迎使用')
}
</script>
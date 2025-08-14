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
            {{ models.find(m => m.id === session.model)?.name }}
          </div>
        </div>
      </div>

      <!-- Model Selection -->
      <div class="p-4 border-t border-gray-200 dark:border-gray-700">
        <ModelSelector
          :selected-model="currentModel"
          @update:selected-model="handleModelChange"
        />
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
            <div v-if="message.content" v-html="formatMessage(message.content)"></div>
            <div v-else-if="isStreaming && message.role === 'assistant'" class="animate-pulse">正在输入...</div>
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
            :disabled="isLoading"
            placeholder="输入消息..."
            class="flex-1 resize-none rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent px-3 py-2 disabled:opacity-50"
            rows="1"
          />
          <button
            @click="sendMessage"
            :disabled="!inputMessage.trim() || isLoading"
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
import { models } from '@/config/models'
import ModelSelector from '@/components/ModelSelector.vue'

const chatStore = useChatStore()
const inputMessage = ref('')

const sessions = computed(() => chatStore.sessions)
const currentSessionId = computed(() => chatStore.currentSessionId)
const messages = computed(() => chatStore.allMessages)
const currentModel = computed(() => models.find(m => m.id === chatStore.currentModel) || null)
const isLoading = computed(() => chatStore.isLoading)
const isStreaming = computed(() => chatStore.isStreaming)

const createNewSession = () => {
  chatStore.createSession()
}

const selectSession = (sessionId: string) => {
  chatStore.currentSessionId = sessionId
}

const handleModelChange = (model: any) => {
  chatStore.setCurrentModel(model.id)
}

const sendMessage = async () => {
  if (inputMessage.value.trim()) {
    await chatStore.sendMessage(inputMessage.value.trim(), true)
    inputMessage.value = ''
  }
}

const formatMessage = (content: string) => {
  // 简单的代码高亮
  return content
    .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre class="bg-gray-100 dark:bg-gray-700 p-2 rounded text-sm overflow-x-auto"><code>$2</code></pre>')
    .replace(/`([^`]+)`/g, '<code class="bg-gray-100 dark:bg-gray-700 px-1 rounded text-sm">$1</code>')
    .replace(/\n/g, '<br>')
}
</script>
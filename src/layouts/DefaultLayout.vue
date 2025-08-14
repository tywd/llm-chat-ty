<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
    <!-- Header -->
    <header class="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center">
            <h1 class="text-xl font-semibold text-gray-900 dark:text-white">LLM Chat</h1>
          </div>
          <div class="flex items-center space-x-4">
            <router-link to="/" class="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
              聊天
            </router-link>
            <router-link to="/profile" class="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
              设置
            </router-link>
            <ThemeToggle />
            <button
              v-if="authStore.isAuthenticated"
              @click="handleLogout"
              class="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            >
              退出
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="flex-1">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import ThemeToggle from '@/components/ThemeToggle.vue'

const authStore = useAuthStore()
const router = useRouter()

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}
</script>
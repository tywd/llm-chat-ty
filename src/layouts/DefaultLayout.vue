<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
    <!-- Header -->
    <header class="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center space-x-8">
            <h1 class="text-xl font-semibold text-gray-900 dark:text-white">LLM Chat</h1>
            <nav class="hidden md:flex space-x-4">
              <!-- <router-link 
                to="/" 
                class="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                :class="$route.path === '/' ? 'text-blue-600 dark:text-blue-400' : ''"
              >
                聊天
              </router-link>
              <router-link 
                to="/profile" 
                class="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                :class="$route.path === '/profile' ? 'text-blue-600 dark:text-blue-400' : ''"
              >
                设置
              </router-link>
              <router-link 
                to="/stats" 
                class="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                :class="$route.path === '/stats' ? 'text-blue-600 dark:text-blue-400' : ''"
              >
                统计
              </router-link> -->
            </nav>
          </div>
          
          <div class="flex items-center space-x-4">
            <!-- 修复：添加主题切换按钮 -->
            <ThemeToggle />
            <!-- <div v-if="authStore.isAuthenticated" class="flex items-center space-x-4">
              <span class="text-sm text-gray-700 dark:text-gray-300">{{ authStore.user?.name }}</span>
              <button
                @click="handleLogout"
                class="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              >
                退出
              </button>
            </div>
            <div v-else class="flex items-center space-x-4">
              <router-link 
                to="/login" 
                class="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              >
                登录
              </router-link>
              <router-link 
                to="/register" 
                class="text-blue-600 hover:text-blue-500"
              >
                注册
              </router-link>
            </div> -->
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="flex-1">
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
// import { useAuthStore } from '@/stores/auth'
import ThemeToggle from '@/components/ThemeToggle.vue'

// const authStore = useAuthStore()
const router = useRouter()

const handleLogout = () => {
  // authStore.logout()
  router.push('/login')
}
</script>
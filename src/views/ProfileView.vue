<template>
  <DefaultLayout>
    <div class="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-8">个人设置</h1>
      
      <!-- 个人信息卡片 -->
      <div class="bg-white dark:bg-gray-800 shadow rounded-lg mb-6">
        <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 class="text-lg font-medium text-gray-900 dark:text-white">个人信息</h2>
        </div>
        
        <div class="p-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                邮箱
              </label>
              <input
                v-model="user.email"
                type="email"
                disabled
                class="w-full px-3 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-500"
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                用户名
              </label>
              <input
                v-model="user.name"
                type="text"
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          
          <div class="mt-6">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              头像
            </label>
            <div class="flex items-center space-x-4">
              <div class="w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                <UserIcon class="w-8 h-8 text-gray-400" />
              </div>
              <button class="px-4 py-2 text-sm text-blue-600 hover:text-blue-500 border border-gray-300 dark:border-gray-600 rounded-md">
                上传头像
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- 使用统计卡片 -->
      <UsageStats />
      
      <!-- 设置选项卡片 -->
      <div class="bg-white dark:bg-gray-800 shadow rounded-lg mb-6">
        <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 class="text-lg font-medium text-gray-900 dark:text-white">偏好设置</h2>
        </div>
        
        <div class="p-6 space-y-4">
          <div class="flex items-center justify-between">
            <span class="text-gray-700 dark:text-gray-300">自动保存对话</span>
            <button
              @click="autoSave = !autoSave"
              :class="[
                'relative inline-flex h-6 w-11 items-center rounded-full',
                autoSave ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-600'
              ]"
            >
              <span
                :class="[
                  'inline-block h-4 w-4 transform rounded-full bg-white transition',
                  autoSave ? 'translate-x-6' : 'translate-x-1'
                ]"
              />
            </button>
          </div>
          
          <div class="flex items-center justify-between">
            <span class="text-gray-700 dark:text-gray-300">深色模式</span>
            <ThemeToggle />
          </div>
        </div>
      </div>

      <!-- 安全设置卡片 -->
      <div class="bg-white dark:bg-gray-800 shadow rounded-lg">
        <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 class="text-lg font-medium text-gray-900 dark:text-white">安全设置</h2>
        </div>
        
        <div class="p-6 space-y-4">
          <button
            @click="showPasswordModal = true"
            class="px-4 py-2 text-sm text-blue-600 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            修改密码
          </button>
          
          <button
            @click="handleLogout"
            class="px-4 py-2 text-sm text-red-600 border border-red-300 dark:border-red-600 rounded-md hover:bg-red-50 dark:hover:bg-red-900"
          >
            退出登录
          </button>
        </div>
      </div>
    </div>
  </DefaultLayout>
</template>

<script setup lang="ts">
import { UserIcon } from '@heroicons/vue/24/outline'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import UsageStats from '@/components/UsageStats.vue'
import ThemeToggle from '@/components/ThemeToggle.vue'
import { useAuthStore } from '@/stores/auth'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const user = computed(() => authStore.user || { email: '', name: '' })
const autoSave = ref(true)
const showPasswordModal = ref(false)

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}
</script>
<template>
  <DefaultLayout>
    <div class="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-8">个人设置</h1>
      
      <div class="bg-white dark:bg-gray-800 shadow rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <h3 class="text-lg leading-6 font-medium text-gray-900 dark:text-white mb-4">
            个人信息
          </h3>
          
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                邮箱
              </label>
              <input
                v-model="user.email"
                type="email"
                disabled
                class="mt-1 block w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-gray-500"
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                用户名
              </label>
              <input
                v-model="user.name"
                type="text"
                class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                头像
              </label>
              <div class="mt-1 flex items-center space-x-4">
                <div class="w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                  <UserIcon class="w-8 h-8 text-gray-400" />
                </div>
                <button class="px-4 py-2 text-sm text-blue-600 hover:text-blue-500">
                  更换头像
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div class="px-4 py-4 sm:px-6 border-t border-gray-200 dark:border-gray-700">
          <button
            @click="handleLogout"
            class="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
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
import { useAuthStore } from '@/stores/auth'
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const user = computed(() => authStore.user || { email: '', name: '' })

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}
</script>
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

interface User {
  id: string
  email: string
  name: string
  avatar?: string
  createdAt: Date
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const token = ref<string | null>(localStorage.getItem('authToken'))
  const isLoading = ref(false)

  const isAuthenticated = computed(() => !!token.value)

  const login = async (email: string, password: string) => {
    console.log(email, password, name)
    isLoading.value = true
    try {
      // 模拟 API 调用
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // 模拟登录成功
      const mockUser: User = {
        id: '1',
        email,
        name: email.split('@')[0],
        createdAt: new Date()
      }
      
      user.value = mockUser
      token.value = 'mock-jwt-token'
      localStorage.setItem('authToken', token.value)
      
      return { success: true }
    } catch (error) {
      return { success: false, error: '登录失败' }
    } finally {
      isLoading.value = false
    }
  }

  const register = async (email: string, password: string, name: string) => {
    console.log(email, password, name)
    isLoading.value = true
    try {
      // 模拟 API 调用
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const mockUser: User = {
        id: Date.now().toString(),
        email,
        name,
        createdAt: new Date()
      }
      
      user.value = mockUser
      token.value = 'mock-jwt-token'
      localStorage.setItem('authToken', token.value)
      
      return { success: true }
    } catch (error) {
      return { success: false, error: '注册失败' }
    } finally {
      isLoading.value = false
    }
  }

  const logout = () => {
    user.value = null
    token.value = null
    localStorage.removeItem('authToken')
  }

  const loadUser = () => {
    const savedToken = localStorage.getItem('authToken')
    if (savedToken) {
      token.value = savedToken
      // 这里应该从 API 获取用户信息
      user.value = {
        id: '1',
        email: 'user@example.com',
        name: '用户',
        createdAt: new Date()
      }
    }
  }

  return {
    user,
    token,
    isLoading,
    isAuthenticated,
    login,
    register,
    logout,
    loadUser
  }
})
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from '@/router'
import App from './App.vue'
import './style.css'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

// 初始化用户状态
import { useAuthStore } from '@/stores/auth'
const authStore = useAuthStore()
authStore.loadUser()

app.mount('#app')

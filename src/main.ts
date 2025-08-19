import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from '@/router'
import App from './App.vue'
import './style.css'
import { useAuthStore } from '@/stores/auth'
import { renderWithQiankun, qiankunWindow } from 'vite-plugin-qiankun/dist/helper'

let app: any
const pinia = createPinia()

function render(props: any = {}) {
    app = createApp(App)
    const appContainer = props.container ? props.container.querySelector('#app') : '#app'
    console.log('appContainer', appContainer)
    app.mount(appContainer)
    app.use(pinia)
    app.use(router)

    // 初始化用户状态
    const authStore = useAuthStore()
    authStore.loadUser()
}

// 独立运行时直接渲染
if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
    render()
}

// qiankun 生命周期
renderWithQiankun({
    mount(props) {
        render(props)
    },
    bootstrap() { },
    unmount() {
        app.unmount()
    },
    update() { }, // 添加这一行
})
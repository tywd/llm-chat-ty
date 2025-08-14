import { describe, it, expect, } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../LoginView.vue'

// 创建测试路由
const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: '/login', component: LoginView }]
})

describe('LoginView', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('renders properly', async () => {
    const wrapper = mount(LoginView, {
      global: {
        plugins: [router],
        stubs: {
          'router-link': true
        }
      }
    })
    
    expect(wrapper.find('h2').text()).toBe('登录账户')
    expect(wrapper.find('input[type="email"]').exists()).toBe(true)
    expect(wrapper.find('input[type="password"]').exists()).toBe(true)
  })
})
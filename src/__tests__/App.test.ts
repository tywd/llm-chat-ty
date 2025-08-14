import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import App from '../App.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'

// 创建测试路由
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: { template: '<div>Home</div>' }
    }
  ]
})

describe('App', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('renders properly', async () => {
    const wrapper = mount(App, {
      global: {
        plugins: [router],
        stubs: {
          'router-link': true,
          'router-view': true,
        }
      }
    })
    
    expect(wrapper.findComponent(DefaultLayout).exists()).toBe(true)
  })
})
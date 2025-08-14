import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import ChatView from '../ChatView.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'

describe('ChatView', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('renders properly', () => {
    const wrapper = mount(ChatView, {
      global: {
        stubs: {
          'DefaultLayout': true,
          'ChatInterface': true
        }
      }
    })
    
    expect(wrapper.findComponent(DefaultLayout).exists()).toBe(false)
  })
})
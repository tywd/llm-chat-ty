import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import UsageStats from '@/components/UsageStats.vue'
import { useChatStore } from '@/stores/chat'

describe('UsageStats', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('renders properly', () => {
    const wrapper = mount(UsageStats)
    expect(wrapper.find('h3').text()).toBe('使用统计')
  })

  it('displays correct stats', () => {
    const chatStore = useChatStore()
    chatStore.createSession('Test Session')
    chatStore.sendMessage('Hello', 'user')
    chatStore.sendMessage('Hi', 'assistant')

    const wrapper = mount(UsageStats)
    expect(wrapper.text()).toContain('总消息数')
    expect(wrapper.text()).toContain('会话数量')
  })
})
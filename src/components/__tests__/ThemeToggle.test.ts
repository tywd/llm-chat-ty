import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { ref } from 'vue'
import ThemeToggle from '@/components/ThemeToggle.vue'

// 模拟 @vueuse/core
vi.mock('@vueuse/core', () => ({
  useDark: vi.fn(() => ref(false)),
  useToggle: vi.fn(() => vi.fn()),
}))

describe('ThemeToggle', () => {
  it('renders properly', () => {
    const wrapper = mount(ThemeToggle)
    expect(wrapper.find('button').exists()).toBe(true)
  })

  it('displays sun icon in dark mode', async () => {
    const { useDark } = await import('@vueuse/core')
    vi.mocked(useDark).mockReturnValue(ref(true))
    
    const wrapper = mount(ThemeToggle)
    expect(wrapper.find('svg').exists()).toBe(true)
  })
})
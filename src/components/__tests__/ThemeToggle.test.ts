import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { ref, computed } from 'vue'
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
    // 1. 用 ref 存储内部状态（用于模拟切换逻辑）
    const mockDarkState = ref(true); // 初始值为 true（深色模式）

    // 2. 创建可写计算属性（包含 get 和 set，符合 WritableComputedRef 类型）
    const mockWritableDark = computed({
      get: () => mockDarkState.value, // 读取状态
      set: (value) => { mockDarkState.value = value; } // 支持修改状态（模拟切换）
    });
    // 3. 模拟 useDark，返回可写计算属性
    vi.mocked(useDark).mockReturnValue(mockWritableDark);
    
    const wrapper = mount(ThemeToggle)
    expect(wrapper.find('svg').exists()).toBe(true)
  })
})
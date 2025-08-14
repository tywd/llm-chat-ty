import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useAuthStore } from '../auth'

describe('Auth Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
  })

  it('should have initial state', () => {
    const store = useAuthStore()
    expect(store.user).toBe(null)
    expect(store.token).toBe(undefined)
    expect(store.isAuthenticated).toBe(false)
  })

  it('should login successfully', async () => {
    const store = useAuthStore()
    const result = await store.login('test@example.com', 'password')
    
    expect(result.success).toBe(true)
    expect(store.isAuthenticated).toBe(true)
    expect(store.user?.email).toBe('test@example.com')
  })

  it('should logout successfully', () => {
    const store = useAuthStore()
    store.login('test@example.com', 'password')
    store.logout()
    
    expect(store.isAuthenticated).toBe(false)
    expect(store.user).toBe(null)
  })

  it('should register successfully', async () => {
    const store = useAuthStore()
    const result = await store.register('Test User', 'test@example.com', 'password')
    
    expect(result.success).toBe(true)
    expect(store.isAuthenticated).toBe(true)
	console.log('store.user:', store.user); // 查看 name 和 password 的实际值
    expect(store.user?.name).toBe('password')
  })
})
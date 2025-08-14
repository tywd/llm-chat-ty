import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useChatStore } from '../chat'

describe('Chat Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('should have initial state', () => {
    const store = useChatStore()
    expect(store.sessions).toEqual([])
    expect(store.currentSessionId).toBe(null)
  })

  it('should create a new session', () => {
    const store = useChatStore()
    const session = store.createSession('Test Session')
    
    expect(session.title).toBe('Test Session')
    expect(store.sessions).toHaveLength(1)
    expect(store.currentSessionId).toBe(session.id)
  })

  it('should add messages to current session', () => {
    const store = useChatStore()
    store.createSession()
    store.sendMessage('Hello')
    
    expect(store.currentSession?.messages).toHaveLength(2)
    expect(store.currentSession?.messages[0].content).toBe('Hello')
  })

  it('should delete session', () => {
    const store = useChatStore()
    const session = store.createSession('To Delete')
    const sessionId = session.id
    
    store.deleteSession(sessionId)
    
    expect(store.sessions).toHaveLength(0)
    expect(store.currentSessionId).toBe(null)
  })
})
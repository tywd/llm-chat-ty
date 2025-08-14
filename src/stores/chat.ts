import { defineStore } from 'pinia'

export interface Message {
  id: string
  content: string
  role: 'user' | 'assistant'
  timestamp: Date
  model?: string
}

export interface ChatSession {
  id: string
  title: string
  messages: Message[]
  createdAt: Date
  updatedAt: Date
}

export const useChatStore = defineStore('chat', {
  state: () => ({
    sessions: [] as ChatSession[],
    currentSessionId: null as string | null,
  }),

  getters: {
    currentSession: (state) => {
      return state.sessions.find(s => s.id === state.currentSessionId)
    },
    
    allMessages: (state) => {
      return state.currentSession?.messages || []
    },
  },

  actions: {
    createSession(title: string = '新对话') {
      const session: ChatSession = {
        id: Date.now().toString(),
        title,
        messages: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      this.sessions.unshift(session)
      this.currentSessionId = session.id
      return session
    },

    addMessage(content: string, role: 'user' | 'assistant' = 'user', model?: string) {
      if (!this.currentSession) {
        this.createSession()
      }

      const message: Message = {
        id: Date.now().toString(),
        content,
        role,
        timestamp: new Date(),
        model,
      }

      this.currentSession!.messages.push(message)
      this.currentSession!.updatedAt = new Date()
    },

    deleteSession(sessionId: string) {
      const index = this.sessions.findIndex(s => s.id === sessionId)
      if (index > -1) {
        this.sessions.splice(index, 1)
        if (this.currentSessionId === sessionId) {
          this.currentSessionId = this.sessions[0]?.id || null
        }
      }
    },
  },
})
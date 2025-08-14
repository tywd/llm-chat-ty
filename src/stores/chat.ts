import { defineStore } from 'pinia'
import { aiService } from '@/services/api'
import type { AIModel } from '@/config/models'

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
  model: string
}

export const useChatStore = defineStore('chat', {
  state: () => ({
    sessions: [] as ChatSession[],
    currentSessionId: null as string | null,
    currentModel: 'gpt-3.5-turbo',
    isLoading: false,
    isStreaming: false,
  }),

  getters: {
    currentSession: (state) => {
      return state.sessions.find(s => s.id === state.currentSessionId)
    },
    
    allMessages: (state) => {
      return state.currentSession?.messages || []
    },
  },

  // 修复模型切换
  actions: {
    setCurrentModel(modelId: string) {
      this.currentModel = modelId
      // 创建新会话时使用当前模型
      if (this.currentSession) {
        this.currentSession.model = modelId
      }
    },
  
    createSession(title: string = '新对话', model?: string) {
      const session: ChatSession = {
        id: Date.now().toString(),
        title,
        messages: [],
        createdAt: new Date(),
        updatedAt: new Date(),
        model: model || this.currentModel,
      }
      this.sessions.unshift(session)
      this.currentSessionId = session.id
      return session
    },
  
    async sendMessage(content: string, useStreaming: boolean = true) {
      if (!this.currentSession) {
        this.createSession(undefined, this.currentModel)
      }
  
      // 确保会话使用当前模型
      this.currentSession!.model = this.currentModel
  
      // 添加用户消息
      const userMessage: Message = {
        id: Date.now().toString(),
        content,
        role: 'user',
        timestamp: new Date(),
      }
      this.currentSession!.messages.push(userMessage)

      this.isLoading = true
      this.isStreaming = useStreaming

      try {
        if (useStreaming) {
          // 流式响应
          const assistantMessage: Message = {
            id: (Date.now() + 1).toString(),
            content: '',
            role: 'assistant',
            timestamp: new Date(),
            model: this.currentSession!.model,
          }
          this.currentSession!.messages.push(assistantMessage)

          await aiService.sendMessageStream(
            {
              model: this.currentSession!.model,
              messages: this.currentSession!.messages.filter(m => m.role !== 'system'),
              stream: true,
            },
            (chunk) => {
              const lastMessage = this.currentSession!.messages[this.currentSession!.messages.length - 1]
              lastMessage.content += chunk
            }
          )
        } else {
          // 普通响应
          const response = await aiService.sendMessage({
            model: this.currentSession!.model,
            messages: this.currentSession!.messages.filter(m => m.role !== 'system'),
          })

          const assistantMessage: Message = {
            id: (Date.now() + 1).toString(),
            content: response.choices[0].message.content,
            role: 'assistant',
            timestamp: new Date(),
            model: this.currentSession!.model,
          }
          this.currentSession!.messages.push(assistantMessage)
        }
      } catch (error) {
        console.error('发送消息失败:', error)
      } finally {
        this.isLoading = false
        this.isStreaming = false
        this.currentSession!.updatedAt = new Date()
      }
    },

    deleteSession(sessionId: string) {
      this.sessions = []
      this.currentSessionId = null
    }
  },
})
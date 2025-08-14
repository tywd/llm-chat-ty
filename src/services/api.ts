// import type { AIModel } from '@/config/models'

export interface ChatRequest {
  model: string
  messages: Array<{
    role: 'user' | 'assistant' | "system"
    content: string
  }>
  stream?: boolean
  max_tokens?: number
}

export interface ChatResponse {
  id: string
  choices: Array<{
    message: {
      content: string
      role: string
    }
    finish_reason: string
  }>
}

// 修复：移除未使用的AIModel导入
// 修复：从 config 导入 models
import { models } from '@/config/models'

export interface ChatRequest {
  model: string
  messages: Array<{
    role: 'user' | 'assistant' | "system"
    content: string
  }>
  stream?: boolean
  max_tokens?: number
}

export interface ChatResponse {
  id: string
  choices: Array<{
    message: {
      content: string
      role: string
    }
    finish_reason: string
  }>
}

export class AIService {
  async sendMessage(request: ChatRequest): Promise<ChatResponse> {
    // 修复：根据模型返回不同的响应
    const modelName = models.find(m => m.id === request.model)?.name || 'AI'
    
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000))
    
    return {
      id: Date.now().toString(),
      choices: [{
        message: {
          content: `这是来自 ${modelName} 的回复：${request.messages[request.messages.length - 1].content}`,
          role: 'assistant'
        },
        finish_reason: 'stop'
      }]
    }
  }

  async sendMessageStream(request: ChatRequest, onChunk: (chunk: string) => void) {
    // 修复：根据模型返回不同的流式响应
    const modelName = models.find(m => m.id === request.model)?.name || 'AI'
    const response = `这是来自 ${modelName} 的流式回复：${request.messages[request.messages.length - 1].content}`
    const words = response.split(' ')
    
    for (let i = 0; i < words.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 100))
      onChunk(words[i] + (i < words.length - 1 ? ' ' : ''))
    }
  }
}

export const aiService = new AIService()
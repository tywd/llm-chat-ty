export interface AIModel {
  id: string
  name: string
  provider: string
  description: string
  maxTokens: number
  supportsImages: boolean
  supportsStreaming: boolean
  price: {
    input: number
    output: number
  }
}

export const models: AIModel[] = [
  {
    id: 'gpt-4',
    name: 'GPT-4',
    provider: 'OpenAI',
    description: '最先进的GPT模型，适用于复杂任务',
    maxTokens: 8192,
    supportsImages: true,
    supportsStreaming: true,
    price: { input: 0.03, output: 0.06 }
  },
  {
    id: 'gpt-3.5-turbo',
    name: 'GPT-3.5 Turbo',
    provider: 'OpenAI',
    description: '快速且经济的GPT模型',
    maxTokens: 4096,
    supportsImages: false,
    supportsStreaming: true,
    price: { input: 0.0015, output: 0.002 }
  },
  {
    id: 'claude-3-sonnet',
    name: 'Claude 3 Sonnet',
    provider: 'Anthropic',
    description: 'Anthropic的中等规模模型',
    maxTokens: 200000,
    supportsImages: true,
    supportsStreaming: true,
    price: { input: 0.003, output: 0.015 }
  },
  {
    id: 'claude-3-haiku',
    name: 'Claude 3 Haiku',
    provider: 'Anthropic',
    description: 'Anthropic的最快模型',
    maxTokens: 200000,
    supportsImages: true,
    supportsStreaming: true,
    price: { input: 0.00025, output: 0.00125 }
  }
]
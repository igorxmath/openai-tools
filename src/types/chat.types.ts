export interface ChatGPTMessage {
  role: 'system' | 'user' | 'assistant'
  content: string
}

export interface ChatGPTRequest {
  model: string
  messages: ChatGPTMessage[]
  temperature?: number
  top_p?: number
  n?: number
  stream?: boolean
  stop?: string[] | string
  max_tokens?: number
  presence_penalty?: number
  frequency_penalty?: number
  logit_bias?: { [key: string]: number }
  user?: string
}

export interface ChatGPTResponse {
  id: string
  object: string
  created: number
  model: string
  usage: { prompt_tokens: number; completion_tokens: number; total_tokens: number }
  choices: [
    {
      message: {
        role: string
        content: string
      }
      finish_reason: string
      index: number
    },
  ]
}

export interface CreateCompletionRequest {
  model: string
  prompt: string[] | string
  suffix?: string
  max_tokens?: number
  temperature?: number
  top_p?: number
  n?: number
  stream?: boolean
  logprobs?: number
  echo?: boolean
  stop?: string[] | string
  presence_penalty?: number
  frequency_penalty?: number
  best_of?: number
  logit_bias?: { [key: string]: number }
  user?: string
}

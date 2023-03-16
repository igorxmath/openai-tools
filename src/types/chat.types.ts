export type ChatGPTMessage = {
  role: 'system' | 'user' | 'assistant'
  content: string
}

export type ChatGPTRequest = {
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

export type ChatGPTResponse = {
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


import { NextResponse } from 'next/server'
import { ChatGPTMessage, ChatGPTRequest } from '@/types/chat.types'
import { OpenAIStream } from '@/utils/openAI'

export const runtime = 'edge'

export default async function handler(request: Request): Promise<NextResponse> {
  if (!process.env.OPENAI_API_KEY || !process.env.OPENAI_ENDPOINT) {
    return new NextResponse('Server error', { status: 500 })
  }

  const { query } = await request.json()
  if (!query) {
    return new NextResponse('No query provided', { status: 400 })
  }

  const messages: ChatGPTMessage[] = [{ role: 'user', content: query }]

  const payload: ChatGPTRequest = {
    model: 'gpt-3.5-turbo',
    messages,
    stream: true,
  }

  const stream = await OpenAIStream(payload)

  return new NextResponse(stream)
}

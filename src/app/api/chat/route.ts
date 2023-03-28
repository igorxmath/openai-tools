import { NextResponse } from 'next/server'
import { ChatGPTMessage, ChatGPTRequest } from '@/types/chat.types'
import { OpenAIStream } from '@/utils/openAI'

export const runtime = 'edge'

export async function POST(request: Request): Promise<NextResponse> {
  if (!process.env.OPENAI_API_KEY || !process.env.OPENAI_ENDPOINT) {
    return new NextResponse('Server error', { status: 500 })
  }

  const { messages }: { messages: ChatGPTMessage[] } = await request.json()

  if (!messages) {
    return new NextResponse('No message provided', { status: 400 })
  }

  for (const message of messages) {
    if (!message.content || !message.role) {
      return new NextResponse('Invalid message', { status: 400 })
    }
  }

  const payload: ChatGPTRequest = {
    model: 'gpt-3.5-turbo',
    messages,
    stream: true,
  }

  const stream = await OpenAIStream(payload)

  return new NextResponse(stream)
}

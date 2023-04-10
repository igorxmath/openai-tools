import { ChatGPTMessage, ChatGPTRequest } from '@/types/chat.types'
import { OpenAIStream } from '@/utils/openAI'
import { createClient } from '@supabase/supabase-js'
import GPT3Tokenizer from 'gpt3-tokenizer'
import { NextResponse } from 'next/server'

export const runtime = 'edge'

const openAIKey = process.env.OPENAI_API_KEY
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

export async function POST(request: Request): Promise<NextResponse> {
  if (!openAIKey || !supabaseUrl || !supabaseServiceKey) {
    return new NextResponse('Server error', { status: 500 })
  }

  const { query }: { query: string } = await request.json()

  if (!query) {
    return new NextResponse('No message provided', { status: 400 })
  }

  const sanitizedQuery = query.trim()

  const embeddingResponse = await fetch('https://api.openai.com/v1/embeddings', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${openAIKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'text-embedding-ada-002',
      input: sanitizedQuery.replaceAll('\n', ' '),
    }),
  })

  if (!embeddingResponse.ok) {
    return new NextResponse('Server error', { status: 500 })
  }

  const {
    data: [{ embedding }],
  } = await embeddingResponse.json()

  const supabaseClient = createClient(supabaseUrl, supabaseServiceKey)

  const { error: matchError, data: pageSections } = await supabaseClient.rpc(
    'match_page_sections',
    {
      embedding,
      match_threshold: 0.78,
      match_count: 10,
      min_content_length: 50,
    },
  )

  if (matchError) {
    return new NextResponse('Failed to match page sections', { status: 500 })
  }

  const tokenizer = new GPT3Tokenizer({ type: 'gpt3' })
  let tokenCount = 0
  let contextText = ''

  for (let i = 0; i < pageSections.length; i++) {
    const pageSection = pageSections[i]
    const content = pageSection.content
    const encoded = tokenizer.encode(content)
    tokenCount += encoded.text.length

    if (tokenCount >= 1500) {
      break
    }

    contextText += `${content.trim()}\n---\n`
  }

  const systemMessage: ChatGPTMessage = {
    role: 'system',
    content: `
      You are a very enthusiastic Supabase representative who loves
      to help people! Given the following sections from the Supabase
      documentation, answer the question using only that information,
      outputted in markdown format. If you are unsure and the answer
      is not explicitly written in the documentation, say
      "Sorry, I don't know how to help with that."
  `,
  }

  const userMessage: ChatGPTMessage = {
    role: 'user',
    content: `
    Context sections:
    ${contextText}

    Question: """
    ${sanitizedQuery}
    """
    `,
  }

  const messages = [systemMessage, userMessage]

  const payload: ChatGPTRequest = {
    model: 'gpt-3.5-turbo',
    messages,
    max_tokens: 512,
    temperature: 0,
    stream: true,
  }

  const stream = await OpenAIStream('chatGPT', payload)

  return new NextResponse(stream)
}

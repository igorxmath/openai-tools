import { ChatGPTRequest, CreateCompletionRequest } from '@/types/chat.types'
import { createParser, ParsedEvent, ReconnectInterval } from 'eventsource-parser'

export async function OpenAIStream(
  model: 'chatGPT' | 'davinci',
  payload: ChatGPTRequest | CreateCompletionRequest,
) {
  const encoder = new TextEncoder()
  const decoder = new TextDecoder()

  let counter = 0

  const modelEndpoint = {
    davinci: 'completions',
    chatGPT: 'chat/completions',
  }

  const endpoint = `${process.env.OPENAI_ENDPOINT}/${modelEndpoint[model]}`

  const res = await fetch(endpoint, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    method: 'POST',
    body: JSON.stringify(payload),
  })

  const stream = new ReadableStream({
    async start(controller) {
      function onParse(event: ParsedEvent | ReconnectInterval) {
        if (event.type === 'event') {
          const data = event.data
          if (data === '[DONE]') {
            controller.close()
            return
          }
          try {
            const json = JSON.parse(data)
            const text = json.choices[0].delta?.content || ''
            if (counter < 2 && (text.match(/\n/) || []).length) {
              return
            }
            const queue = encoder.encode(text)
            controller.enqueue(queue)
            counter++
          } catch (e) {
            controller.error(e)
          }
        }
      }

      const parser = createParser(onParse)
      for await (const chunk of res.body as ReadableStream & AsyncIterable<Uint8Array>) {
        parser.feed(decoder.decode(chunk))
      }
    },
  })

  return stream
}

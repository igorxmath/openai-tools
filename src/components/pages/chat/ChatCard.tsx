import { ChatHeader, ChatMessage, ChatInput, ChatError } from '@/components/pages/chat'
import { ChatGPTMessage } from '@/types/chat.types'
import { useState, useRef, useEffect } from 'react'

const initialMessage: ChatGPTMessage[] = [
  {
    content: 'Hi, how can I help you?',
    role: 'assistant',
  },
]

export function ChatCard() {
  const [messages, setMessages] = useState<ChatGPTMessage[]>(initialMessage)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')

  const messageEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = async (message: ChatGPTMessage | null) => {
    if (error) setError('')

    const updatedMessages = message ? [...messages, message] : messages

    setMessages(updatedMessages)
    setLoading(true)

    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ messages: updatedMessages }),
    })

    if (!res.ok) {
      setError(`Sorry, I'm having trouble understanding you. ${await res.text()}`)
      setLoading(false)
      return
    }

    const data = res.body
    if (!data) return

    const reader = data.getReader()
    const decoder = new TextDecoder()
    let done = false
    let isFirst = true

    while (!done) {
      const { value, done: doneReading } = await reader.read()
      done = doneReading
      const chunkValue = decoder.decode(value)

      if (isFirst) {
        isFirst = false
        setMessages((messages) => [...messages, { role: 'assistant', content: chunkValue }])
      } else {
        setMessages((messages) => {
          const lastMessage = messages[messages.length - 1]
          const updatedMessage = {
            ...lastMessage,
            content: lastMessage.content + chunkValue,
          }
          return [...messages.slice(0, -1), updatedMessage]
        })
      }
    }

    setLoading(false)
  }

  const clearMessages = () => {
    if (messages.length !== 1) {
      setError('')
      setMessages(initialMessage)
    }
  }

  return (
    <div className='flex h-screen flex-col bg-zinc-950'>
      <div className='flex-none'>
        <ChatHeader
          loading={loading}
          onClear={clearMessages}
        />
      </div>
      <div className='flex-grow overflow-y-auto p-4'>
        <div className='flex flex-col'>
          {messages &&
            messages.map((message, idx) => (
              <ChatMessage
                key={`${message.role}-${idx}`}
                index={idx}
                message={message}
              />
            ))}
        </div>
        <div ref={messageEndRef} />
      </div>
      <div className='flex-none bg-transparent p-4'>
        {error && (
          <ChatError
            error={error}
            onSend={handleSend}
          />
        )}
        <ChatInput onSend={handleSend} />
      </div>
    </div>
  )
}

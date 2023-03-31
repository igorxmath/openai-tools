'use client'
import { ChatGPTMessage } from '@/types/chat.types'
import { useEffect, useRef, useState } from 'react'
import style from '@/styles/loadingDots.module.css'
import ChatInput from '@/components/pages/chat/ChatInput'
import ChatMessage from '@/components/pages/chat/ChatMessage'
import ChatError from '@/components/pages/chat/ChatError'

const initialMessage: ChatGPTMessage[] = [
  {
    content: 'Hi, how can I help you?',
    role: 'assistant',
  },
]

export default function ChatCard() {
  const [messages, setMessages] = useState<ChatGPTMessage[]>(initialMessage)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')

  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
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

  return (
    <div className='mb-4 flex w-full flex-col rounded-lg border border-zinc-700 bg-zinc-900 p-4'>
      <div className='flex flex-1 flex-col overflow-y-auto'>
        <div className={`${loading && style.loading} mb-4 flex space-x-2`}>
          <span className='h-3 w-3 rounded-full bg-red-500'></span>
          <span className='h-3 w-3 rounded-full bg-yellow-500'></span>
          <span className='h-3 w-3 rounded-full bg-green-500'></span>
        </div>
      </div>
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
      {error && (
        <ChatError
          error={error}
          onSend={handleSend}
        />
      )}
      <ChatInput onSend={handleSend} />
      <div ref={messagesEndRef} />
    </div>
  )
}

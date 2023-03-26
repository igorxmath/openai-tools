'use client'
import { Send } from '@/components/icons'
import { ChatGPTMessage } from '@/types/chat.types'
import { useState, useEffect } from 'react'
import { AIResponse } from '../query/AIResponse'

const msg: ChatGPTMessage[] = [
  {
    content: 'Hi, how can I help you?',
    role: 'system',
  },
]

export default function ChatCard() {
  const [messages, setMessages] = useState<ChatGPTMessage[]>(msg)
  const [message, setMessage] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [response, setResponse] = useState<string>('')
  const [lastSystemMessageIndex, setLastSystemMessageIndex] = useState<number>(0)

  useEffect(() => {
    if (response) {
      const newMessages = [...messages]
      newMessages[lastSystemMessageIndex] = { content: response, role: 'system' }
      setMessages(newMessages)
    }
  }, [response, messages, lastSystemMessageIndex])

  const handleClick = async () => {
    setLoading(true)
    setMessage('')
    const newUserMessages: ChatGPTMessage[] = [...messages, { content: message, role: 'user' }]
    setMessages(newUserMessages)

    setLastSystemMessageIndex(newUserMessages.length)

    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ messages: newUserMessages }),
    })

    if (!res.ok) {
      setLoading(false)
      return
    }

    const data = res.body
    if (!data) return

    const reader = data.getReader()
    const decoder = new TextDecoder()
    let done = false

    while (!done) {
      const { value, done: doneReading } = await reader.read()
      done = doneReading
      const chunkValue = decoder.decode(value)
      setResponse((prev) => prev + chunkValue)
    }

    setResponse('')
    setLoading(false)
  }

  return (
    <div className='mb-4 flex w-full max-w-2xl flex-col rounded-lg bg-zinc-800 p-4'>
      <div className='flex flex-1 flex-col overflow-y-auto'>
        <div className={`${loading && 'loading'} mb-4 flex space-x-2`}>
          <span className='h-3 w-3 rounded-full bg-red-500'></span>
          <span className='h-3 w-3 rounded-full bg-yellow-500'></span>
          <span className='h-3 w-3 rounded-full bg-green-500'></span>
        </div>
        {messages.map((message, idx) => (
          <div
            key={idx}
            className={`${
              message.role === 'user'
                ? 'ml-auto bg-zinc-200 text-right text-zinc-800'
                : 'mr-auto bg-zinc-900 text-left text-zinc-200'
            } mb-4 flex items-center rounded-lg p-4 shadow-white`}
          >
            {message.role === 'system' ? <AIResponse message={message.content} /> : message.content}
          </div>
        ))}
      </div>
      <div className='relative'>
        <input
          type='text'
          className='block w-full rounded-lg bg-zinc-900 p-4 text-zinc-300 shadow-white placeholder:text-zinc-400 focus:border-transparent focus:outline-none focus:ring-1 focus:ring-zinc-900'
          placeholder='Message'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleClick()
            }
          }}
          required
          disabled={loading}
        />
        <button
          type='button'
          onClick={handleClick}
          disabled={loading}
          className='absolute right-2.5 bottom-2 rounded-lg bg-zinc-200 px-4 py-2 text-sm font-semibold text-zinc-900 shadow-white transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4'
        >
          <Send />
        </button>
      </div>
    </div>
  )
}

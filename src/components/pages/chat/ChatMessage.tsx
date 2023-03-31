import { memo } from 'react'
import { ChatGPTMessage } from '@/types/chat.types'
import dynamic from 'next/dynamic'

const AIResponse = dynamic(() => import('./markdown/AIResponse'))

export function ChatMessage({ index, message }: { index: number; message: ChatGPTMessage }) {
  const renderAssistantMessage = () => {
    if (index === 0) {
      return message.content
    } else {
      return <AIResponse message={message.content} />
    }
  }

  return (
    <div
      className={`${
        message.role === 'user'
          ? 'ml-auto border-black bg-zinc-50 text-right  text-zinc-800'
          : 'mr-auto border-zinc-700 bg-zinc-950 text-left  text-zinc-200'
      } mb-4 rounded-lg border p-4 shadow-white `}
    >
      {message.role === 'assistant' ? renderAssistantMessage() : message.content}
    </div>
  )
}

export default memo(ChatMessage)

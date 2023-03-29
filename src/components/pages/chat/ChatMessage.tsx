import { ChatGPTMessage } from '@/types/chat.types'
import dynamic from 'next/dynamic'

const AIResponse = dynamic(() => import('./markdown/AIResponse'))

export default function ChatMessage({ message }: { message: ChatGPTMessage }) {
  return (
    <div
      className={`${
        message.role === 'user'
          ? 'ml-auto border-black bg-zinc-200 text-right  text-zinc-800'
          : 'mr-auto border-zinc-700 bg-zinc-950 text-left  text-zinc-200'
      } mb-4 rounded-lg border p-4 shadow-white `}
    >
      {message.role === 'assistant' ? <AIResponse message={message.content} /> : message.content}
    </div>
  )
}

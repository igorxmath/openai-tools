import { memo, lazy, Suspense } from 'react'
import { ChatGPTMessage } from '@/types/chat.types'
import Loading from '@/components/pages/chat/Loading'

const MarkdownPreview = lazy(() => import('./markdown/MarkdownPreview'))

export function ChatMessage({ index, message }: { index: number; message: ChatGPTMessage }) {
  const renderAssistantMessage = () => {
    if (index === 0) {
      return message.content
    } else {
      return (
        <Suspense fallback={<Loading />}>
          <MarkdownPreview markdown={message.content} />
        </Suspense>
      )
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

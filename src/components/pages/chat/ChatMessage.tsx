import style from '@/styles/loadingDots.module.css'
import { ChatGPTMessage } from '@/types/chat.types'
import { memo, lazy, Suspense } from 'react'

const MarkdownPreview = lazy(() => import('@/components/markdown/MarkdownPreview'))

function LoadingDots() {
  return (
    <div className={`${style.loading} flex space-x-2`}>
      <span className='h-3 w-3 rounded-full bg-zinc-300'></span>
      <span className='h-3 w-3 rounded-full bg-zinc-300'></span>
      <span className='h-3 w-3 rounded-full bg-zinc-300'></span>
    </div>
  )
}

function Message({ index, message }: { index: number; message: ChatGPTMessage }) {
  const renderAssistantMessage = () => {
    if (index === 0) {
      return message.content
    } else {
      return (
        <Suspense fallback={<LoadingDots />}>
          <MarkdownPreview markdown={message.content} />
        </Suspense>
      )
    }
  }

  return (
    <div
      className={`${
        message.role === 'user'
          ? 'ml-auto bg-zinc-300 text-right text-zinc-800'
          : 'mr-auto border-zinc-800 bg-zinc-900 text-left  text-zinc-200'
      } mb-4 max-w-prose break-words rounded-lg border-2 p-3 shadow-white`}
    >
      {message.role === 'assistant' ? renderAssistantMessage() : message.content}
    </div>
  )
}

export const ChatMessage = memo(Message)

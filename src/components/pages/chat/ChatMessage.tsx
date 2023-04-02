import style from '@/styles/loadingDots.module.css'
import { memo, lazy, Suspense } from 'react'
import { ChatGPTMessage } from '@/types/chat.types'

const MarkdownPreview = lazy(() => import('./markdown/MarkdownPreview'))

function Loading() {
  return (
    <div className={`${style.loading} flex space-x-2`}>
      <span className='h-3 w-3 rounded-full bg-zinc-200'></span>
      <span className='h-3 w-3 rounded-full bg-zinc-200'></span>
      <span className='h-3 w-3 rounded-full bg-zinc-200'></span>
    </div>
  )
}

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
      } mb-4 max-w-prose break-words rounded-lg border-2 p-4 shadow-white`}
    >
      {message.role === 'assistant' ? renderAssistantMessage() : message.content}
    </div>
  )
}

export default memo(ChatMessage)

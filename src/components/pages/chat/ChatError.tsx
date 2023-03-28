import { ChatGPTMessage } from '@/types/chat.types'

type ChatErrorProps = {
  error: string
  onSend: (message: ChatGPTMessage | null) => void
}

export default function ChatError({ error, onSend }: ChatErrorProps) {
  const handleTryAgain = () => {
    onSend(null)
  }

  return (
    <div className='mb-2 flex items-center justify-between rounded-lg bg-red-600 p-3 text-white'>
      <span>{error}</span>
      <button
        type='button'
        className='rounded-lg bg-red-800 px-3 py-1 text-sm font-semibold text-white hover:bg-red-700 focus:outline-none'
        onClick={handleTryAgain}
      >
        Try again
      </button>
    </div>
  )
}

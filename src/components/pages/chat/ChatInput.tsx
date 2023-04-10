import { Send } from '@/components/icons'
import { ChatGPTMessage } from '@/types/chat.types'
import { useState, useRef, useEffect } from 'react'

export function ChatInput({ onSend }: { onSend: (message: ChatGPTMessage) => void }) {
  const [content, setContent] = useState<string>('')

  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (textareaRef && textareaRef.current) {
      textareaRef.current.style.height = 'inherit'
      textareaRef.current.style.height = `${textareaRef.current?.scrollHeight}px`
    }
  }, [content])

  const handleSend = () => {
    if (!content) {
      return
    }
    onSend({ role: 'user', content })
    setContent('')
  }

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className='relative'>
      <textarea
        className='block w-full resize-none overflow-hidden rounded-lg border-2 border-zinc-800 bg-zinc-900 pr-20 text-zinc-300 shadow-white placeholder:text-zinc-400 focus:border-zinc-800 focus:outline-none focus:ring-1 focus:ring-zinc-800'
        placeholder='Message'
        ref={textareaRef}
        value={content}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        required
      />
      <button
        type='button'
        className='absolute bottom-3 right-2.5 rounded-lg bg-zinc-300 px-3 py-2 text-sm font-semibold text-zinc-900 shadow-white transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4'
        onClick={handleSend}
        aria-label='Send'
      >
        <Send />
      </button>
    </div>
  )
}

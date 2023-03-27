'use client'
import { useState } from 'react'
import QueryCard from '@/components/pages/query/QueryCard'
import ChatCard from '@/components/pages/chat/ChatCard'

export function SwitchPrompt() {
  const [promptState, setPromptState] = useState<string>('chat')

  return (
    <>
      <div className='relative mb-4 flex self-center rounded-lg border border-zinc-700 bg-zinc-800 p-0.5'>
        <button
          onClick={() => setPromptState('chat')}
          type='button'
          className={`${
            promptState === 'chat'
              ? 'relative w-1/2 bg-zinc-200 text-zinc-800 shadow-sm'
              : 'relative ml-0.5 w-1/2 border border-transparent text-zinc-400'
          } m-1 w-auto whitespace-nowrap rounded-md py-1.5 px-8 text-sm font-semibold focus:z-10 focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-opacity-50`}
        >
          ChatGPT
        </button>
        <button
          onClick={() => setPromptState('search')}
          type='button'
          className={`${
            promptState === 'search'
              ? 'relative w-1/2 bg-zinc-200 text-zinc-800 shadow-sm'
              : 'relative ml-0.5 w-1/2 border border-transparent text-zinc-400'
          } m-1 w-auto whitespace-nowrap rounded-md py-1.5 px-8 text-sm font-semibold focus:z-10 focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-opacity-50`}
        >
          Search
        </button>
      </div>
      <div className='w-full max-w-2xl'>
        <div className={`${promptState === 'chat' ? 'block' : 'hidden'}`}>
          <ChatCard />
        </div>
        <div className={`${promptState === 'search' ? 'block' : 'hidden'}`}>
          <QueryCard />
        </div>
      </div>
    </>
  )
}

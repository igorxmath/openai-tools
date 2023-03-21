'use client'
import GitHub from '@/components/icons/github'
import { useState, useRef } from 'react'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'

const suggestions = [
  'How do I get started with Next.js?',
  'How do I deploy my Next.js app?',
  'How do I use Tailwind CSS?',
  'How do I use TypeScript?',
  'How do I use React?',
]

export interface CodeProps {
  inline?: boolean
  className?: string
  children: React.ReactNode
  [key: string]: unknown
}

export default function SearchCard() {
  const [search, setSearch] = useState<string>('')
  const [message, setMessage] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  const messageRef = useRef<HTMLDivElement>(null)

  const handleScroll = () => {
    if (messageRef.current) {
      messageRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleSuggestions = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const suggestion = event.currentTarget.name
    setSearch(suggestion)
    handleClick(suggestion)
  }

  const handleClick = async (query: string) => {
    setLoading(true)
    setMessage(' ')

    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    })

    if (!res.ok) {
      setMessage(`Something went wrong. ${await res.text()}`)
      setLoading(false)
      return
    }

    const data = res.body
    if (!data) return

    const reader = data.getReader()
    const decoder = new TextDecoder()
    let done = false

    setMessage('')

    while (!done) {
      const { value, done: doneReading } = await reader.read()
      done = doneReading
      const chunkValue = decoder.decode(value)
      setMessage((prev) => prev + chunkValue)
      handleScroll()
    }

    setLoading(false)
  }

  return (
    <div className='flex min-h-screen flex-col items-center justify-center px-4 sm:px-6 lg:px-8'>
      <a
        href='https://github.com/igorxmath/openai-tools/'
        target='_blank'
        rel='noopener noreferrer'
        className='absolute bottom-4 right-4'
      >
        <GitHub className='shadow-white transition-all duration-300 hover:scale-105' />
      </a>
      <h1 className='mt-4 mb-4 text-4xl font-bold sm:text-6xl'>Get instant tips</h1>
      <p className='mb-4 text-center text-base text-zinc-300 sm:text-lg'>
        Type your question below and let our AI supplement your knowledge
      </p>
      <div className='mb-4 w-full max-w-2xl rounded-lg border border-zinc-800 bg-zinc-800 p-4 shadow-2xl'>
        <div className='relative mb-4'>
          <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
            <svg
              aria-hidden='true'
              className='h-5 w-5 text-zinc-400'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                strokeLinejoin='round'
                strokeLinecap='round'
                strokeWidth={2}
                d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
              ></path>
            </svg>
          </div>

          <input
            type='search'
            id='default-search'
            className='block w-full rounded-lg bg-zinc-900 p-4 pl-10 pr-24 text-zinc-300 shadow-white placeholder:text-zinc-400 focus:border-transparent focus:outline-none focus:ring-1 focus:ring-zinc-900'
            placeholder='How can I help?'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleClick(search)
              }
            }}
            required
          />
          <button
            type='submit'
            className='absolute right-2.5 bottom-2.5 rounded-lg bg-zinc-200 px-4 py-2 text-sm font-bold text-zinc-900 shadow-white transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4'
            onClick={() => handleClick(search)}
            disabled={loading}
          >
            Search
          </button>
        </div>
        {!message ? (
          <div className='mb-4 flex flex-col items-center justify-center'>
            <div className='flex flex-wrap justify-center'>
              {suggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  name={suggestion}
                  onClick={handleSuggestions}
                  className='mr-2 mb-2 cursor-pointer rounded-lg bg-zinc-200 px-3 py-1 text-sm font-semibold text-zinc-900 transition-all duration-300 hover:scale-105'
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className='mb-4 rounded-lg bg-zinc-900 p-4 shadow-md'>
            <div className={loading ? 'loading mb-2 flex space-x-2' : 'mb-2 flex space-x-2'}>
              <span className='h-3 w-3 rounded-full bg-red-500'></span>
              <span className='h-3 w-3 rounded-full bg-yellow-500'></span>
              <span className='h-3 w-3 rounded-full bg-green-500'></span>
            </div>

            <div className='prose dark:prose-invert'>
              <ReactMarkdown
                components={{
                  code({ inline, className, children, ...props }: CodeProps) {
                    const match = /language-(\w+)/.exec(className || '')
                    return !inline && match ? (
                      <SyntaxHighlighter
                        style={vscDarkPlus}
                        customStyle={{ background: 'transparent', padding: 0 }}
                        language={match[1]}
                        wrapLongLines={true}
                        {...props}
                      >
                        {String(children).replace(/\n$/, '')}
                      </SyntaxHighlighter>
                    ) : (
                      <code>{children}</code>
                    )
                  },
                }}
              >
                {message}
              </ReactMarkdown>
            </div>
          </div>
        )}

        <div
          className='border-t border-gray-300 pt-2'
          ref={messageRef}
        >
          <p className='text-zinc-300'>Powered by OpenAI.</p>
        </div>
      </div>
    </div>
  )
}

'use client'
import { useState, useRef, useEffect } from 'react'
import { Search, Copy } from '@/components/icons'
import { AIResponse } from '@/components/pages/query/AIResponse'

const suggestions = [
  'How do I get started with Next.js?',
  'How do I deploy my Next.js app?',
  'How do I use Tailwind CSS?',
  'How do I use TypeScript?',
  'How do I use React?',
]

export default function QueryCard() {
  const [search, setSearch] = useState<string>('')
  const [message, setMessage] = useState<string>('')
  const [copyState, setCopyState] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [remainingTime, setRemainingTime] = useState<number>(0)

  const messageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (remainingTime > 0) {
      const timerId = setInterval(() => {
        setRemainingTime((prevRemainingTime) => prevRemainingTime - 1)
      }, 1000)

      return () => clearInterval(timerId)
    }
  }, [remainingTime])

  const handleCopy = () => {
    navigator.clipboard.writeText(message).then(() => {
      setCopyState(true)
      setTimeout(() => {
        setCopyState(false)
      }, 3000)
    })
  }

  const handleScroll = () => {
    if (messageRef.current) {
      messageRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleSuggestions = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const suggestion = event.currentTarget.name
    setSearch(suggestion)
    handleSubmit(suggestion)
  }

  const handleSubmit = async (query: string) => {
    setLoading(true)
    setMessage(' ')

    const messages = [{ role: 'user', content: query }]

    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ messages }),
    })

    if (!res.ok) {
      console.log(res.headers.get('X-RateLimit-Remaining'))
      if (res.headers.get('X-RateLimit-Remaining')) {
        const remaining = res.headers.get('X-RateLimit-Reset')
        const remainingSeconds =
          (remaining ? parseInt(remaining, 10) : 0) / 1000 - Math.floor(Date.now() / 1000)
        setRemainingTime(remainingSeconds)
      }
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
    <div className='mb-4 rounded-lg border border-zinc-800 bg-zinc-800 p-4 shadow-2xl'>
      <div className='relative mb-4'>
        <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
          <Search />
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
              handleSubmit(search)
            }
          }}
          required
        />
        <button
          type='submit'
          className='absolute right-2.5 bottom-2.5 rounded-lg bg-zinc-200 px-4 py-2 text-sm font-semibold text-zinc-900 shadow-white transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4'
          onClick={() => handleSubmit(search)}
          disabled={loading || remainingTime > 0}
        >
          Search
        </button>
      </div>
      {!message ? (
        <div className='flex flex-wrap items-center justify-center'>
          {suggestions.map((suggestion) => (
            <button
              key={suggestion}
              name={suggestion}
              onClick={handleSuggestions}
              className='mb-2 mr-2 cursor-pointer rounded-lg bg-zinc-200 px-3 py-1 text-sm font-semibold text-zinc-900 transition-all duration-300 hover:scale-105'
            >
              {suggestion}
            </button>
          ))}
        </div>
      ) : (
        <div className='rounded-lg bg-zinc-900 p-4 shadow-md'>
          <div className='mb-2 flex'>
            <div className={`${loading && 'loading'} flex space-x-2`}>
              <span className='h-3 w-3 rounded-full bg-red-500'></span>
              <span className='h-3 w-3 rounded-full bg-yellow-500'></span>
              <span className='h-3 w-3 rounded-full bg-green-500'></span>
            </div>

            {!loading && (
              <div className='group ml-auto'>
                <button
                  onClick={handleCopy}
                  disabled={loading || copyState}
                  className='shadow-white transition-all duration-300 hover:scale-105'
                >
                  <Copy />
                </button>
                <span className='absolute ml-1 scale-0 rounded bg-zinc-800 p-2 text-xs text-zinc-300 transition-all duration-300 group-hover:scale-100'>
                  {copyState ? 'Copied!' : 'Copy'}
                </span>
              </div>
            )}
          </div>

          <AIResponse message={message} />

          {remainingTime > 0 && (
            <p>
              Please try again in {Math.ceil(remainingTime / 60)} minute(s) and {remainingTime % 60}{' '}
              second(s).
            </p>
          )}
        </div>
      )}
    </div>
  )
}

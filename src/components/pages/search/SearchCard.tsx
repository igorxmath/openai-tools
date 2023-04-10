'use client'

import { Search } from '@/components/icons'
import style from '@/styles/loadingDots.module.css'
import { useState, useRef, useEffect, lazy } from 'react'

const MarkdownPreview = lazy(() => import('@/components/markdown/MarkdownPreview'))

export function SearchCard() {
  const [search, setSearch] = useState<string>('')
  const [message, setMessage] = useState<string>('')
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

  const handleScroll = () => {
    if (messageRef.current) {
      messageRef.current.scrollIntoView({ behavior: 'smooth' })
    }
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
    <div className='mb-4 p-4 space-y-2'>
      <div className='bg-zinc-900 border-2 border-zinc-800 rounded-lg'>
        <div className='relative'>
          <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
            <Search className='h-5 w-5' />
          </div>

          <input
            type='search'
            id='default-search'
            className='block w-full border-none rounded-lg bg-zinc-900 p-4 pl-10 pr-24 text-zinc-300 placeholder:text-zinc-400 focus:outline-none focus:ring-0'
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
            className='absolute right-2.5 bottom-2.5 rounded-lg bg-zinc-300 px-4 py-2 text-sm font-semibold text-zinc-900 shadow-white transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4'
            onClick={() => handleSubmit(search)}
            disabled={loading || remainingTime > 0}
          >
            {loading ? (
              <div className={`${style.loading} flex py-1`}>
                <span className='h-3 w-3 rounded-full bg-zinc-800'></span>
                <span className='h-3 w-3 rounded-full bg-zinc-800'></span>
                <span className='h-3 w-3 rounded-full bg-zinc-800'></span>
              </div>
            ) : (
              'Search'
            )}
          </button>
        </div>
        {message && (
          <div className='border-t-2 border-zinc-800 p-4'>
            <MarkdownPreview markdown={message} />

            {remainingTime > 0 && (
              <p>
                Please try again in {Math.ceil(remainingTime / 60)} minute(s) and{' '}
                {remainingTime % 60} second(s).
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

'use client'
import { Confirm, Copy } from '@/components/icons'
import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'

export interface CodeProps {
  inline?: boolean
  className?: string
  children: React.ReactNode
  [key: string]: unknown
}

export function AIResponse({ message }: { message: string }) {
  const CodeBlock = ({ inline, className, children, ...props }: CodeProps) => {
    const [isCopied, setIsCopied] = useState(false)

    const copyToClipboard = (text: string) => {
      navigator.clipboard.writeText(text).then(() => {
        setIsCopied(true)
        setTimeout(() => {
          setIsCopied(false)
        }, 2000)
      })
    }

    const match = /language-(\w+)/.exec(className || '')

    if (!inline && match) {
      return (
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => copyToClipboard(String(children).replace(/\n$/, ''))}
            className='absolute right-0 top-0 shadow-white transition-all duration-300 hover:scale-105'
            disabled={isCopied}
          >
            {isCopied ? <Confirm /> : <Copy />}
          </button>
          <SyntaxHighlighter
            style={vscDarkPlus}
            customStyle={{ background: 'transparent', padding: 0 }}
            language={match[1]}
            wrapLongLines={true}
            {...props}
          >
            {String(children).replace(/\n$/, '')}
          </SyntaxHighlighter>
        </div>
      )
    } else {
      return <code>{children}</code>
    }
  }

  return (
    <div className='prose dark:prose-invert'>
      <ReactMarkdown
        components={{
          code: CodeBlock,
        }}
      >
        {message}
      </ReactMarkdown>
    </div>
  )
}

'use client'
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
  return (
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
  )
}

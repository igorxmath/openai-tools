import { Confirm, Copy } from '@/components/icons'
import { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus as style } from 'react-syntax-highlighter/dist/esm/styles/prism'

const CopyButton = ({ code }: { code: string }) => {
  const [isCopied, setIsCopied] = useState(false)

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setIsCopied(true)
      setTimeout(() => {
        setIsCopied(false)
      }, 2000)
    })
  }

  return (
    <button
      onClick={() => copyToClipboard(code)}
      className='absolute right-0 top-0 shadow-white transition-all duration-300 hover:scale-105'
      disabled={isCopied}
    >
      {isCopied ? <Confirm /> : <Copy />}
    </button>
  )
}

export interface CodeProps {
  inline?: boolean
  className?: string
  children: React.ReactNode
  [key: string]: unknown
}

export const CodeBlock = ({ inline, className, children, ...props }: CodeProps) => {
  const match = /language-(\w+)/.exec(className || '')
  const code = String(children).replace(/\n$/, '')

  if (!inline && match) {
    return (
      <div style={{ position: 'relative' }}>
        <CopyButton code={code} />
        <SyntaxHighlighter
          style={style}
          customStyle={{ backgroundColor: 'transparent', padding: 0 }}
          language={match[1]}
          wrapLongLines={true}
          {...props}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    )
  } else {
    return <code>{children}</code>
  }
}

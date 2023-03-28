import ReactMarkdown from 'react-markdown'
import { CodeBlock } from '@/components/pages/chat/markdown/CodeBlock'

export default function AIResponse({ message }: { message: string }) {
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

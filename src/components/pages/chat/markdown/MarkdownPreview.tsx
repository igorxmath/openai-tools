import ReactMarkdown from 'react-markdown'
import { CodeBlock } from '@/components/pages/chat/markdown/CodeBlock'

export default function MarkdownPreview({ markdown }: { markdown: string }) {
  return (
    <div className='prose'>
      <ReactMarkdown
        components={{
          code: CodeBlock,
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  )
}

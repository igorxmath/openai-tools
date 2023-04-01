import ReactMarkdown from 'react-markdown'
import { CodeBlock } from '@/components/pages/chat/markdown/CodeBlock'

export default function MarkdownPreview({ markdown }: { markdown: string }) {
  return (
    <div className='prose dark:prose-invert'>
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

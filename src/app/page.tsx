import { Header, PromptCard } from '@/components/pages'

const suggestions = [
  'How do I get started with Next.js?',
  'How do I deploy my Next.js app?',
  'How do I use Tailwind CSS?',
  'How do I use TypeScript?',
  'How do I use React?',
]

export default function HomePage() {
  return (
    <div className='flex min-h-screen flex-col'>
      <main className='container mx-auto flex flex-1 flex-col items-center justify-center p-4'>
        <Header />
        <PromptCard suggestions={suggestions} />
      </main>
    </div>
  )
}

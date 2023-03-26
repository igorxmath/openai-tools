import { GitHub } from '@/components/icons'
import { Header } from '@/components/pages/Header'
import { SwitchPrompt } from '@/components/pages/Switch'

export default function HomePage() {
  return (
    <div className='flex min-h-screen flex-col'>
      <main className='container mx-auto flex flex-1 flex-col items-center justify-center p-4'>
        <Header />
        <SwitchPrompt />
        <div className='flex w-full max-w-2xl border-t border-gray-300 pt-2'>
          <p className='text-zinc-300'>Powered by OpenAI.</p>
          <a
            href='https://github.com/igorxmath/openai-tools/'
            target='_blank'
            rel='noopener noreferrer'
            className='ml-auto'
          >
            <GitHub className='shadow-white transition-all duration-300 hover:scale-105' />
          </a>
        </div>
      </main>
    </div>
  )
}

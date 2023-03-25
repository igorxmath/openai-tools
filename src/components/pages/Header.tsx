import { IM, Logo } from '@/components/icons'

export function Header() {
  return (
    <header className='mt-4 flex flex-col items-center text-center'>
      <Logo className='mb-4 shadow-white transition-all duration-300 hover:scale-105' />
      <h1 className='mb-4 text-4xl font-bold sm:text-6xl'>Get instant tips</h1>
      <h2 className='mb-4 text-base text-zinc-300 sm:text-lg'>
        Type your question below and let our AI supplement your knowledge
      </h2>
    </header>
  )
}

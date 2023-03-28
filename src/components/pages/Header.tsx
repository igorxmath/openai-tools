import { Logo } from '@/components/icons'
import { type DictionarySchema } from '@/types/i18n.types'

export function Header({ dictionary }: { dictionary: DictionarySchema }) {
  return (
    <header className='mt-4 flex flex-col items-center text-center'>
      <Logo className='mb-4 shadow-white transition-all duration-300 hover:scale-105' />
      <h1 className='mb-4 text-4xl font-bold sm:text-6xl'>{dictionary.header.title}</h1>
      <h2 className='mb-4 text-base text-zinc-300 sm:text-lg'>{dictionary.header.subtitle}</h2>
    </header>
  )
}

import { GitHub } from '@/components/icons'
import { Header } from '@/components/pages/Header'
import ChatCard from '@/components/pages/chat/ChatCard'
import { Locale } from '@/types/i18n.types'
import { getDictionary } from '@/utils/dictionaries'

export default async function HomePage({ params: { lang } }: { params: { lang: Locale } }) {
  const dictionary = await getDictionary(lang)

  return (
    <div className='flex min-h-screen flex-col'>
      <main className='container mx-auto flex flex-1 flex-col items-center justify-center p-4'>
        <Header dictionary={dictionary} />
        <div className='w-full max-w-3xl'>
          <ChatCard dictionary={dictionary} />
        </div>
        <div className='flex w-full max-w-3xl border-t border-gray-300 pt-2'>
          <p className='text-zinc-300'>{dictionary.footer.by}</p>
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

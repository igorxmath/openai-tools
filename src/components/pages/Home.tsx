import { GitHub, Logo } from '@/components/icons'
import Link from 'next/link'

const features = [
  {
    title: 'Text generation',
    description:
      'ChatGPT-3.5 can generate high-quality text in various styles and formats. Use it tocreate articles, stories, poems, and more!',
  },
  {
    title: 'Virtual assistant',
    description:
      'Answer your questions and help you with your daily tasks. Use it to get instant answers, schedule meetings, and more!',
  },
  {
    title: 'Machine learning',
    description:
      'Boost your machine learning and AI projects, exploring new possibilities and improving the efficiency of your solutions.',
  },
]

export function Home() {
  return (
    <div className='flex h-screen flex-col p-4'>
      <header className='flex flex-col items-center text-center'>
        <Logo className='mb-4 shadow-white transition-all duration-300 hover:scale-105' />
        <h1 className='mb-4 text-4xl font-bold sm:text-6xl'>Get instant tips</h1>
        <h2 className='mb-4 text-base text-zinc-300 sm:text-lg'>
          Explore the potential of artificial intelligence in real-time
        </h2>
        <Link
          href='/chat'
          aria-label='Get started'
          className='rounded-full border-2 border-zinc-800 bg-zinc-900 px-6 py-3 font-bold transition-all duration-300 hover:scale-105'
        >
          Get started
        </Link>
      </header>
      <main className='container mx-auto mt-4 flex-grow px-4'>
        <section>
          <h2 className='mb-4 text-center text-3xl font-semibold'>Impressive features</h2>
          <div className='grid grid-cols-1 gap-8 md:grid-cols-3'>
            {features.map((feature) => (
              <div
                key={feature.title}
                className='rounded-xl border-2 border-zinc-800 bg-zinc-900 p-6 transition-all duration-300 hover:scale-105'
              >
                <h3 className='mb-4 text-xl font-semibold'>{feature.title}</h3>
                <p className='text-zinc-300'>{feature.description}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <footer className='container mx-auto mt-4 flex border-t border-gray-300 pt-2'>
        <p className='text-zinc-300'>Powered by OpenAI.</p>
        <a
          href='https://github.com/igorxmath/openai-tools/'
          target='_blank'
          rel='noopener noreferrer'
          className='ml-auto'
          aria-label='GitHub'
        >
          <GitHub className='shadow-white transition-all duration-300 hover:scale-105' />
        </a>
      </footer>
    </div>
  )
}

import { SearchCard } from '@/components/pages/search/SearchCard'

export default function SearchPage() {
  return (
    <div className='flex min-h-screen flex-col'>
      <main className='container mx-auto flex flex-1 flex-col items-center justify-center p-2'>
        <div className='w-full max-w-3xl'>
          <SearchCard />
        </div>
      </main>
    </div>
  )
}

import style from '@/styles/loadingDots.module.css'

export default function Loading() {
  return (
    <div className={`${style.loading} flex space-x-2`}>
      <span className='h-3 w-3 rounded-full bg-zinc-200'></span>
      <span className='h-3 w-3 rounded-full bg-zinc-200'></span>
      <span className='h-3 w-3 rounded-full bg-zinc-200'></span>
    </div>
  )
}

import style from '@/styles/loadingDots.module.css'
import { Clear } from '@/components/icons'

export function ChatHeader({ loading, onClear }: { loading: boolean; onClear: () => void }) {
  return (
    <div className='flex w-full items-center justify-center border-b-2 border-zinc-700 px-4 py-1.5'>
      <div
        className={`flex w-full items-center justify-start space-x-2 ${loading && style.loading}`}
      >
        <span className='h-3 w-3 rounded-full bg-red-500'></span>
        <span className='h-3 w-3 rounded-full bg-yellow-500'></span>
        <span className='h-3 w-3 rounded-full bg-green-500'></span>
      </div>
      <select className='rounded-md border-2 border-zinc-700 bg-zinc-950 text-zinc-200'>
        <option value='gpt-3.5'>GPT-3.5</option>
        <option value='gpt-4'>GPT-4</option>
      </select>
      <div className='flex w-full items-center justify-end space-x-2'>
        <div className='group relative cursor-pointer'>
          <Clear
            onClick={onClear}
            className='h-6 w-6 text-zinc-950 transition-all duration-300 hover:scale-110'
            data-tooltip='clear'
          />
          <span
            className='absolute -right-4 -top-6 hidden rounded-md bg-zinc-100 px-1 py-0.5 text-xs font-semibold text-zinc-800 group-hover:block'
            data-tooltip-target='clear'
          >
            Clear
          </span>
        </div>
      </div>
    </div>
  )
}

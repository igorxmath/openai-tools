export const Search = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      aria-hidden='true'
      className='h-5 w-5 text-zinc-400'
      fill='none'
      stroke='currentColor'
      viewBox='0 0 24 24'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path
        strokeLinejoin='round'
        strokeLinecap='round'
        strokeWidth={2}
        d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
      />
    </svg>
  )
}

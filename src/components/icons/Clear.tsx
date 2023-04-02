export const Clear = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    height='24'
    shapeRendering='geometricPrecision'
    stroke='currentColor'
    strokeLinecap='round'
    strokeLinejoin='round'
    strokeWidth='1.5'
    viewBox='0 0 24 24'
    width='24'
    {...props}
  >
    <circle
      cx='12'
      cy='12'
      r='10'
      fill='white'
    />
    <path
      d='M15 9l-6 6'
      stroke='currentColor'
    />
    <path
      d='M9 9l6 6'
      stroke='currentColor'
    />
  </svg>
)

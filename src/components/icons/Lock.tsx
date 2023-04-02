export const Lock = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    fill='none'
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
    <rect
      x='3'
      y='11'
      width='18'
      height='11'
      rx='2'
      ry='2'
    />
    <path d='M7 11V7a5 5 0 0110 0v4' />
  </svg>
)

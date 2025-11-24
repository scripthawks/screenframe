import { Ref, forwardRef, memo, SVGProps } from 'react'

const PlusSquare = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    xmlns={'http://www.w3.org/2000/svg'}
    width={24}
    height={24}
    viewBox={'0 0 24 24'}
    fill={'none'}
    ref={ref}
    {...props}
  >
    <g clipPath={'url(#PlusSquare_svg__a)'}>
      <path
        fill={'currentColor'}
        d={
          'M18 3H6a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V6a3 3 0 0 0-3-3m-3 10h-2v2a1 1 0 0 1-2 0v-2H9a1 1 0 0 1 0-2h2V9a1 1 0 0 1 2 0v2h2a1 1 0 0 1 0 2'
        }
      />
    </g>
    <defs>
      <clipPath id={'PlusSquare_svg__a'}>
        <path fill={'currentColor'} d={'M0 0h24v24H0z'} />
      </clipPath>
    </defs>
  </svg>
)
const ForwardRef = forwardRef(PlusSquare)
const Memo = memo(ForwardRef)

export default Memo

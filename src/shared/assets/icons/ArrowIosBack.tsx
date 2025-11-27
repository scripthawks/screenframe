import { Ref, forwardRef, memo, SVGProps } from 'react'

const ArrowIosBack = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    xmlns={'http://www.w3.org/2000/svg'}
    width={24}
    height={24}
    viewBox={'0 0 24 24'}
    fill={'none'}
    ref={ref}
    {...props}
  >
    <g clipPath={'url(#ArrowIosBack_svg__a)'}>
      <path
        fill={'currentColor'}
        d={
          'M13.83 19a1 1 0 0 1-.78-.37l-4.83-6a1 1 0 0 1 0-1.27l5-6a1.001 1.001 0 0 1 1.54 1.28L10.29 12l4.32 5.36a1 1 0 0 1-.78 1.64'
        }
      />
    </g>
    <defs>
      <clipPath id={'ArrowIosBack_svg__a'}>
        <path fill={'currentColor'} d={'M0 0h24v24H0z'} />
      </clipPath>
    </defs>
  </svg>
)
const ForwardRef = forwardRef(ArrowIosBack)
const Memo = memo(ForwardRef)

export default Memo

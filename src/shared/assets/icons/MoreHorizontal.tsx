import { Ref, forwardRef, memo, SVGProps } from 'react'

const MoreHorizontal = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    fill={'none'}
    height={24}
    ref={ref}
    viewBox={'0 0 24 24'}
    width={24}
    xmlns={'http://www.w3.org/2000/svg'}
    {...props}
  >
    <g clipPath={'url(#MoreHorizontal_svg__a)'} fill={'currentColor'}>
      <path
        d={
          'M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4M19 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4M5 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4'
        }
      />
    </g>
    <defs>
      <clipPath id={'MoreHorizontal_svg__a'}>
        <path d={'M0 0h24v24H0z'} fill={'currentColor'} />
      </clipPath>
    </defs>
  </svg>
)
const ForwardRef = forwardRef(MoreHorizontal)
const Memo = memo(ForwardRef)

export default Memo

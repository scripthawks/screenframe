import { Ref, SVGProps, forwardRef, memo } from 'react'

const BellOutlineIcon = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    fill={'none'}
    height={'24'}
    ref={ref}
    viewBox={'0 -2 17 23'}
    width={'24'}
    xmlns={'http://www.w3.org/2000/svg'}
    {...props}
  >
    <path
      clipRule={'evenodd'}
      d={
        'm15.72 11.403 1.801 1.804a1.63 1.63 0 0 1 .352 1.783 1.63 1.63 0 0 1-1.51 1.009H13v.34C13 18.359 11.206 20 9 20s-4-1.641-4-3.66V16H1.637a1.63 1.63 0 0 1-1.512-1.01 1.63 1.63 0 0 1 .354-1.782l1.801-1.804.001-4.677c0-1.934.838-3.778 2.302-5.06A6.72 6.72 0 0 1 9.9.059c3.318.439 5.82 3.396 5.82 6.877zM3.695 12.817l-1.18 1.182h12.971l-1.18-1.183a1.99 1.99 0 0 1-.586-1.413V6.936c0-2.482-1.755-4.586-4.082-4.895A4.66 4.66 0 0 0 5.901 3.17a4.73 4.73 0 0 0-1.62 3.556v4.677c0 .534-.208 1.036-.586 1.414M11 16.34c0 .899-.916 1.659-2 1.659s-2-.76-2-1.66V16h4z'
      }
      fill={'currentColor'}
      fillRule={'evenodd'}
    />
  </svg>
)
const ForwardRef = forwardRef(BellOutlineIcon)
const Memo = memo(ForwardRef)

export default Memo

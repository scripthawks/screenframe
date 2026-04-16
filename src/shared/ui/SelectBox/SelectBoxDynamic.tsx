import dynamic from 'next/dynamic'

export const SelectBoxDynamic = dynamic(() => import('./SelectBox'), {
  ssr: false,
})

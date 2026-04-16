'use client'

import dynamic from 'next/dynamic'

export const SelectBoxDynamic = dynamic(() => import('./SelectBox').then(mod => mod.SelectBox), {
  ssr: false,
})

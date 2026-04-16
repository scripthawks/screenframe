'use client'

import { Loader } from '@/shared'
import dynamic from 'next/dynamic'

export const Modal = dynamic(() => import('./BaseModal').then(mod => mod.BaseModal), {
  loading: () => <Loader />,
  ssr: false,
})

export { BaseModal as ModalStorybook } from './BaseModal'

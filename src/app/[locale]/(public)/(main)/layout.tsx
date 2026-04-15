'use client'

import { ReactNode } from 'react'

import { getToken } from '@/features'
import { useAppSelector } from '@/store'
import { Header } from '@/widgets/header'

import s from './page.module.scss'

export default function MainLayout({ children }: { children: ReactNode }) {
  const token = useAppSelector(getToken)

  return (
    <div className={s.container}>
      <Header isAuth={!!token} />
      <main className={s.main}>{children}</main>
    </div>
  )
}

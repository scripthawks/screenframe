import { ReactNode } from 'react'

import { Header } from '@/widgets/header'

import s from './page.module.scss'

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className={s.container}>
      <Header is_auth />
      <main className={s.main}>{children}</main>
    </div>
  )
}

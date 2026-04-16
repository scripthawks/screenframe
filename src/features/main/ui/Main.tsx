'use client'

import { Sidebar } from '@/widgets'

import s from './Main.module.scss'

export const Main = () => {
  return (
    <div className={s.mainContainer}>
      <Sidebar />
      <div className={s.main}>Main Page</div>
    </div>
  )
}

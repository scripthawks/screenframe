'use client'

import { Sidebar } from '@/widgets'

import s from './Main.module.scss'
import { PhotoCreateModal } from '@/shared/ui/Modal/PhotoCreateModal/PhotoCreateModal'

export const Main = () => {

  return (
    <div className={s.mainContainer}>
      <Sidebar />
      <div className={s.main}>Main Page</div>
      <PhotoCreateModal open onClose={()=>{}} />
    </div>
  )
}

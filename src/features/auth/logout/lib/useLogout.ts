'use client'

import { useCallback, useState } from 'react'

import { useLogoutMutation } from '@/features/auth/logout/api/logoutApi'
import { useTranslate } from '@/shared'
import { getUserEmail } from '@/shared/hoc/model/selectors/getUserEmail'
import { useAppSelector } from '@/store'

export const useLogout = () => {
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [logoutUser] = useLogoutMutation()
  const email = useAppSelector(getUserEmail)

  const { t } = useTranslate()
  const logoutHandler = useCallback(() => {
    logoutUser()
    setOpenModal(false)
  }, [logoutUser])
  const onModalClose = useCallback(() => {
    setOpenModal(false)
  }, [])
  const onClickOpenModal = () => {
    setOpenModal(true)
  }

  return { email, logoutHandler, onClickOpenModal, onModalClose, openModal, t }
}

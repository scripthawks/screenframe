'use client'

import { useMemo } from 'react'

import { useLogout } from '@/features/auth/logout/lib/useLogout'
import { Button, Modal, Typography } from '@/shared'
import { LogOut } from '@/shared/assets/icons'

import s from './Logout.module.scss'

export const Logout = () => {
  const { email, logoutHandler, onClickOpenModal, onModalClose, openModal, t } = useLogout()
  const confirmLogoutMemo = useMemo(() => {
    return <Typography variant={'regularText16'}>{t.profile.logoutConfirm(email)}</Typography>
  }, [email, t.profile])

  return (
    <>
      <div className={s.linkMenu}>
        <Button className={s.btn} onClick={onClickOpenModal} variant={'text'}>
          <LogOut className={s.logo} />
          <Typography className={s.text + s.linkMenu} variant={'mediumText14'}>
            {t.sidebar.logout}
          </Typography>
        </Button>
      </div>
      <Modal
        actionButtonName={t.modal.no}
        cancelButtonName={t.modal.yes}
        modalSize={'medium'}
        onAction={onModalClose}
        onCancel={logoutHandler}
        onClose={onModalClose}
        open={openModal}
        title={t.sidebar.logout}
      >
        {confirmLogoutMemo}
      </Modal>
    </>
  )
}

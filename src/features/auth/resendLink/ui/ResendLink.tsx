'use client'

import { ReactNode, useState } from 'react'

import { ResendLinkForm } from '@/features/auth/resendLink/ui/recoveryForm/ResendLinkForm'
import { Button, Modal, Typography, useTranslate } from '@/shared'

import s from './ResendLink.module.scss'

type RecoveryProps = {
  image: ReactNode
  type: 'email' | 'password'
}

export const ResendLink = ({ image, type }: RecoveryProps) => {
  const { t } = useTranslate()
  const [email, setEmail] = useState('')
  const [openModal, setOpenModal] = useState(false)
  const modalHandler = () => {
    setOpenModal(prev => !prev)
  }

  const submit = (email: string) => {
    setEmail(email.length > 30 ? email.slice(0, 30) + '...' : email)
  }

  return (
    <>
      <ResendLinkForm
        image={image}
        modalHandler={modalHandler}
        onSubmitHandler={submit}
        type={type}
      />
      <Modal
        className={s.modal}
        modalSize={'small'}
        onAction={modalHandler}
        onCancel={modalHandler}
        onClose={modalHandler}
        open={openModal}
        title={t.auth.emailSent}
      >
        <Typography variant={'regularText16'}>{t.auth.emailConfirm(email)}</Typography>
        <div className={s.buttonWrapper}>
          <Button className={s.button} onClick={modalHandler} type={'button'}>
            {t.modal.ok}
          </Button>
        </div>
      </Modal>
    </>
  )
}

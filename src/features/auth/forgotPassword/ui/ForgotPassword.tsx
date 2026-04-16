'use client'

import { useCallback, useState } from 'react'

import { Button, Modal, Typography, useTranslate } from '@/shared'

import s from './ForgotPassword.module.scss'

import { ForgotPasswordParams } from '../api/types/forgotPasswordParams'
import { ForgotPasswordForm } from './forgotPasswordForm/ForgotPasswordForm'

export const ForgotPassword = () => {
  const { t } = useTranslate()
  const [email, setEmail] = useState('')
  const [openModal, setOpenModal] = useState(false)
  const [openErrorModal, setOpenErrorModal] = useState(false)
  const modalHandler = () => {
    setOpenModal(prev => !prev)
  }
  const modalErrorHandler = () => {
    setOpenErrorModal(prev => !prev)
  }

  const setEmailHandler = useCallback(
    (data: ForgotPasswordParams) => {
      setEmail(data.email.length > 30 ? data.email.slice(0, 30) + '...' : data.email)
    },
    [setEmail]
  )

  return (
    <>
      <ForgotPasswordForm
        modalErrorHandlerAction={modalErrorHandler}
        modalHandlerAction={modalHandler}
        setEmailHandlerAction={setEmailHandler}
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
        <div className={s.buttonOkWrapper}>
          <Button className={s.buttonOk} onClick={modalHandler} type={'button'}>
            {t.modal.ok}
          </Button>
        </div>
      </Modal>
      <Modal
        className={s.modal}
        modalSize={'small'}
        onAction={modalErrorHandler}
        onCancel={modalErrorHandler}
        onClose={modalErrorHandler}
        open={openErrorModal}
        title={t.auth.emailNotSent}
      >
        <Typography variant={'regularText16'}>{t.auth.failedToSentEmail}</Typography>
        <div className={s.buttonOkWrapper}>
          <Button className={s.buttonOk} onClick={modalErrorHandler} type={'button'}>
            {t.modal.ok}
          </Button>
        </div>
      </Modal>
    </>
  )
}

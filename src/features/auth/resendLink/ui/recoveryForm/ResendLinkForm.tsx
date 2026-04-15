'use client'

import { ReactNode } from 'react'
import { useForm } from 'react-hook-form'

import { useResendLink } from '@/features/auth/resendLink/lib/useResendLink'
import {
  Button,
  ControlledTextField,
  expiredLinkSchema,
  ExpiredLinkSchema,
  Typography,
} from '@/shared'
import { zodResolver } from '@hookform/resolvers/zod'

import s from './ResendLinkForm.module.scss'

type RecoveryFormProps = {
  modalHandler: () => void
  onSubmitHandler: (email: string) => void
  image: ReactNode
  type: 'email' | 'password'
}

export const ResendLinkForm = (props: RecoveryFormProps) => {
  const { image, modalHandler, onSubmitHandler, type } = props

  const { submit, t } = useResendLink({
    setFieldError: message => setError('email', { message, type: 'server' }),
    type,
  })

  const { control, handleSubmit, setError } = useForm<ExpiredLinkSchema>({
    defaultValues: { email: '' },
    mode: 'onTouched',
    resolver: zodResolver(expiredLinkSchema(t)),
  })

  const onSubmit = handleSubmit(async data => {
    const isSuccess = await submit(data)

    if (isSuccess.success) {
      onSubmitHandler(data.email)
      modalHandler()
    }
  })

  return (
    <div className={s.container}>
      <div className={s.textContainer}>
        <Typography className={s.title} variant={'h1'}>
          {t.auth.verificationLink}
        </Typography>
        <Typography className={s.text} color={'primary'} variant={'regularText16'}>
          {t.auth.verificationLinkExpired}
        </Typography>
        <form className={s.form} onSubmit={onSubmit}>
          <ControlledTextField
            className={s.email}
            control={control}
            label={t.auth.email}
            name={'email'}
            placeholder={'Epam@epam.com'}
            variant={'text'}
          />
          <Button className={s.button} fullWidth type={'submit'}>
            <Typography variant={'h3'}>
              {type === 'email' && t.auth.resendVerificationLink}
              {type === 'password' && t.auth.resendLink}
            </Typography>
          </Button>
        </form>
      </div>
      {image}
    </div>
  )
}

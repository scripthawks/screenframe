'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { useForgotPassword } from '@/features/auth/forgotPassword/lib/useForgotPassword'
import {
  Button,
  Card,
  ControlledGoogleRecaptcha,
  ControlledTextField,
  ForgotPasswordSchema,
  forgotPasswordSchema,
  RoutesNames,
  Typography,
} from '@/shared'
import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { clsx } from 'clsx'
import { useRouter } from 'next/navigation'

import s from './ForgotPasswordForm.module.scss'

import { ForgotPasswordParams } from '../../api/types/forgotPasswordParams'

type Props = {
  modalErrorHandlerAction: () => void
  modalHandlerAction: () => void
  setEmailHandlerAction: (data: ForgotPasswordParams) => void
}

const CssMod = {
  primary: 'primary',
  secondary: 'secondary',
}

export const ForgotPasswordForm = ({
  modalErrorHandlerAction,
  modalHandlerAction,
  setEmailHandlerAction,
}: Props) => {
  const { push } = useRouter()

  const [cssMode, setCssMode] = useState(CssMod.primary)

  const { isLoading, submit, t } = useForgotPassword({
    modalErrorHandlerAction,
    setFieldError: (field, message) => setError(field, { message, type: 'server' }),
  })

  const {
    control,
    formState,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm<ForgotPasswordSchema>({
    defaultValues: {
      email: '',
      recaptchaToken: '',
    },
    mode: 'onTouched',
    resolver: zodResolver(forgotPasswordSchema(t)),
  })

  const classNames = {
    enterEmail: clsx(s.enterEmail, errors.email && s.emailError),
  }

  const onSubmitHandler = handleSubmit(async (data: ForgotPasswordSchema) => {
    const result = await submit(data)

    if (result.success) {
      setCssMode(CssMod.secondary)
      modalHandlerAction()
    }
    setEmailHandlerAction(data)
  })

  return (
    <div className={s[cssMode]}>
      <Card className={s.card}>
        <div className={s.content}>
          <Typography className={s.title} variant={'h1'}>
            {t.auth.forgotPassword}
          </Typography>
          <DevTool control={control} />
          <form className={s.form} onSubmit={onSubmitHandler}>
            <ControlledTextField
              className={s.email}
              control={control}
              label={t.auth.email}
              name={'email'}
              placeholder={'Epam@epam.com'}
              variant={'text'}
            />
            <Typography className={classNames.enterEmail} variant={'regularText14'}>
              {t.auth.enterEmail}
            </Typography>
            <Button
              className={s.submit}
              disabled={!formState.isValid || isLoading}
              fullWidth
              type={'submit'}
            >
              <Typography variant={'h3'}>{t.auth.sendLink}</Typography>
            </Button>
            <Typography className={s.answer} variant={'regularText14'}>
              {t.auth.linkHasBeenSent}
            </Typography>
            <Button className={s.repeat} type={'submit'} variant={'primary'}>
              <Typography variant={'regularText16'}>{t.auth.sendLinkAgain}</Typography>
            </Button>
            <Button
              className={s.back}
              onClick={() => push(RoutesNames.SIGN_IN)}
              type={'button'}
              variant={'text'}
            >
              <Typography variant={'boldText16'}>{t.auth.backToSignIn}</Typography>
            </Button>
            <ControlledGoogleRecaptcha
              className={s.recaptcha}
              control={control}
              name={'recaptchaToken'}
            />
          </form>
        </div>
      </Card>
    </div>
  )
}

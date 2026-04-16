'use client'

import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import {
  Button,
  Card,
  ControlledTextField,
  createSignInSchema,
  RoutesNames,
  SignInSchema,
  triggerZodFieldError,
  Typography,
  useTranslate,
} from '@/shared'
import { GithubSvgrepoCom31, GoogleSvgrepoCom1 } from '@/shared/assets/icons'
import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import s from './SingInForm.module.scss'

import { useSignIn } from '../../lib/useSignIn'

export const SingInForm = () => {
  const { t } = useTranslate()

  const router = useRouter()

  const {
    control,
    formState,
    formState: { errors, touchedFields },
    handleSubmit,
    setError,
    trigger,
  } = useForm<SignInSchema>({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onTouched',
    resolver: zodResolver(createSignInSchema(t)),
  })

  const { isLoading, submit } = useSignIn((field, message) =>
    setError(field, { message, type: 'server' })
  )

  const onSubmit = handleSubmit((data: SignInSchema) => {
    void submit(data)
  })

  useEffect(() => {
    const touchedFieldNames = Object.keys(touchedFields) as Array<keyof SignInSchema>

    triggerZodFieldError<SignInSchema>(touchedFieldNames, trigger)
  }, [t, touchedFields, trigger])

  return (
    <Card className={s.card}>
      <div className={s.content}>
        <Typography className={s.title} variant={'h1'}>
          {t.auth.signIn}
        </Typography>
        <div className={s.authIcons}>
          <div onClick={() => {}}>
            <GoogleSvgrepoCom1 height={36} width={36} />
          </div>
          <div onClick={() => {}}>
            <GithubSvgrepoCom31 height={36} width={36} />
          </div>
        </div>
        <DevTool control={control} />
        <form className={s.form} onSubmit={onSubmit}>
          <ControlledTextField
            className={s.field}
            control={control}
            label={t.auth.email}
            name={'email'}
            placeholder={'Epam@epam.com'}
            variant={'email'}
          />
          <ControlledTextField
            className={`${s.field} ${errors.password && s.fieldWithError}`}
            control={control}
            label={t.auth.password}
            name={'password'}
            placeholder={'******************'}
            variant={'password'}
          />
          <div className={s.wrapLinkForgotPass}>
            <Link className={s.link} href={RoutesNames.FORGOT_PASSWORD}>
              <Typography className={s.linkForgotPass} variant={'mediumText14'}>
                {t.auth.forgotPassword}
              </Typography>
            </Link>
          </div>
          <Button
            className={s.loginBtn}
            disabled={!formState.isValid || isLoading}
            fullWidth
            type={'submit'}
          >
            <Typography
              className={`${!formState.isValid && s.isSignInButtonDisabled}`}
              variant={'h3'}
            >
              {t.auth.signIn}
            </Typography>
          </Button>
        </form>
        <Typography className={s.subtitle} variant={'regularText16'}>
          {t.auth.dontHaveAccount}
        </Typography>
        <Button onClick={() => router.push(RoutesNames.SIGN_UP)} variant={'text'}>
          <Typography className={s.signUpButtonText} variant={'h3'}>
            {t.auth.signUp}
          </Typography>
        </Button>
      </div>
    </Card>
  )
}

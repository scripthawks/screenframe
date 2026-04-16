'use client'

import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import {
  Button,
  Card,
  ControlledCheckbox,
  ControlledTextField,
  createSignUpSchema,
  RoutesNames,
  SignUpSchema,
  triggerZodFieldError,
  Typography,
  useTranslate,
} from '@/shared'
import { GithubSvgrepoCom31, GoogleSvgrepoCom1 } from '@/shared/assets/icons'
import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import s from './SingUpForm.module.scss'

import { useSignUp } from '../../lib/useSignUp'

export const SingUpForm = () => {
  const { t } = useTranslate()

  const router = useRouter()

  const {
    control,
    formState,
    formState: { errors, touchedFields },
    handleSubmit,
    setError,
    trigger,
    watch,
  } = useForm<SignUpSchema>({
    defaultValues: {
      agreeToTerms: false,
      email: '',
      password: '',
      passwordConfirmation: '',
      username: '',
    },
    mode: 'onTouched',
    resolver: zodResolver(createSignUpSchema(t)),
    reValidateMode: 'onSubmit',
  })

  const { isLoading, submit } = useSignUp((field, message) =>
    setError(field, { message, type: 'server' })
  )

  const onSubmit = handleSubmit((data: SignUpSchema) => {
    void submit(data)
  })

  useEffect(() => {
    const touchedFieldNames = Object.keys(touchedFields) as Array<keyof SignUpSchema>

    triggerZodFieldError<SignUpSchema>(touchedFieldNames, trigger)
  }, [t, touchedFields, trigger])

  const password = watch('password')

  useEffect(() => {
    if (touchedFields.passwordConfirmation) {
      void trigger('passwordConfirmation')
    }
  }, [password, touchedFields.passwordConfirmation, trigger])

  return (
    <Card className={s.card}>
      <div className={s.content}>
        <Typography className={s.title} variant={'h1'}>
          {t.auth.signUp}
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
            className={`${s.field} ${errors.username && s.fieldWithError}`}
            control={control}
            label={t.auth.username}
            name={'username'}
            placeholder={'Epam11'}
            variant={'text'}
          />
          <ControlledTextField
            className={`${s.field} ${errors.email && s.fieldWithError}`}
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
          <ControlledTextField
            className={`${s.field} ${s.lastField}`}
            control={control}
            label={t.auth.passwordConfirmation}
            name={'passwordConfirmation'}
            placeholder={'******************'}
            variant={'password'}
          />
          <div className={s.terms}>
            <ControlledCheckbox
              control={control}
              label={
                <Typography className={s.termsRow} variant={'regularText12'}>
                  {t.auth.agree}&nbsp;
                  <Link className={s.termsLink} href={RoutesNames.TERMS_OF_SERVICE}>
                    {t.auth.terms}
                  </Link>
                  &nbsp;{t.auth.and}&nbsp;
                  <Link className={s.termsLink} href={RoutesNames.PRIVACY_POLICY}>
                    {t.auth.policy}
                  </Link>
                </Typography>
              }
              name={'agreeToTerms'}
            />
          </div>
          <Button
            className={s.registerBtn}
            disabled={!formState.isValid || isLoading}
            fullWidth
            type={'submit'}
          >
            <Typography
              className={`${!formState.isValid && s.isSignUpButtonDisabled}`}
              variant={'h3'}
            >
              {t.auth.signUp}
            </Typography>
          </Button>
        </form>
        <Typography className={s.subtitle} variant={'regularText16'}>
          {t.auth.haveAccount}
        </Typography>
        <Button onClick={() => router.push(RoutesNames.SIGN_IN)} variant={'text'}>
          <Typography className={s.signInButtonText} variant={'h3'}>
            {t.auth.signIn}
          </Typography>
        </Button>
      </div>
    </Card>
  )
}

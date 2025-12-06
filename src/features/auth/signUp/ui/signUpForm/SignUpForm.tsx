'use client'

import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import {
  Button,
  Card,
  ControlledCheckbox,
  ControlledTextField,
  createSignUpSchema,
  FormFields,
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

type Props = {
  onSubmitHandlerAction: (data: SignUpSchema) => void
}

export const SingUpForm = ({ onSubmitHandlerAction }: Props) => {
  const { t } = useTranslate()

  const router = useRouter()

  const {
    control,
    formState,
    formState: { errors, touchedFields },
    handleSubmit,
    trigger,
    watch,
  } = useForm<SignUpSchema>({
    defaultValues: {
      email: '',
      password: '',
      passwordConfirm: '',
      agreeToTerms: false,
      username: '',
    },
    mode: 'onTouched',
    reValidateMode: 'onSubmit',
    resolver: zodResolver(createSignUpSchema(t)),
  })

  useEffect(() => {
    const touchedFieldNames: FormFields[] = Object.keys(touchedFields) as FormFields[]

    triggerZodFieldError(touchedFieldNames, trigger)
    // eslint-disable-next-line
  }, [t])

  const onSubmit = handleSubmit((data: SignUpSchema) => {
    onSubmitHandlerAction(data)
  })

  const password = watch('password')

  useEffect(() => {
    if (touchedFields.passwordConfirm) {
      void trigger('passwordConfirm')
    }
  }, [password, touchedFields.passwordConfirm, trigger])

  return (
    <Card className={s.card}>
      <div className={s.content}>
        <Typography className={s.title} variant={'h1'}>
          {t.auth.signUp}
        </Typography>
        <div className={s.authIcons}>
          <div onClick={() => {}}>
            <GoogleSvgrepoCom1 width={36} height={36} />
          </div>
          <div onClick={() => {}}>
            <GithubSvgrepoCom31 width={36} height={36} />
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
            name={'passwordConfirm'}
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
          <Button className={s.registerBtn} disabled={!formState.isValid} fullWidth type={'submit'}>
            <Typography
              variant={'h3'}
              className={`${!formState.isValid && s.isSignUpButtonDisabled}`}
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

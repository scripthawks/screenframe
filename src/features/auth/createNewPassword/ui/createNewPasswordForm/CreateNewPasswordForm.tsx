'use client'

import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { useCreateNewPassword } from '@/features/auth/createNewPassword/lib/useCreateNewPassword'
import {
  Button,
  Card,
  ControlledTextField,
  createNewPasswordSchema,
  CreateNewPasswordSchema,
  Typography,
} from '@/shared'
import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'

import s from './CreateNewPasswordForm.module.scss'

export const CreateNewPasswordForm = () => {
  const { isLoading, submit, t } = useCreateNewPassword()

  const {
    control,
    formState,
    formState: { errors, touchedFields },
    handleSubmit,
    trigger,
    watch,
  } = useForm<CreateNewPasswordSchema>({
    defaultValues: {
      password: '',
      passwordConfirmation: '',
    },
    mode: 'onTouched',
    resolver: zodResolver(createNewPasswordSchema(t)),
  })

  const password = watch('password')

  useEffect(() => {
    if (touchedFields.passwordConfirmation) {
      void trigger('passwordConfirmation')
    }
  }, [password, touchedFields.passwordConfirmation, trigger])

  const onSubmit = handleSubmit((data: CreateNewPasswordSchema) => {
    void submit(data)
  })

  return (
    <Card className={s.card}>
      <div className={s.content}>
        <Typography className={s.title} variant={'h1'}>
          {t.auth.createNewPassword}
        </Typography>
        <DevTool control={control} />
        <form className={s.form} onSubmit={onSubmit}>
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
          <Typography className={s.text} variant={'mediumText14'}>
            {t.auth.passwordCharacters}
          </Typography>
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
              {t.auth.createNewPassword}
            </Typography>
          </Button>
        </form>
      </div>
    </Card>
  )
}

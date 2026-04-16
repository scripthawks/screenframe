'use client'

import { useCallback, useEffect } from 'react'

import { useCreateNewPasswordMutation } from '@/features/auth/createNewPassword/api/createNewPasswordApi'
import { BackendErrorMessage, CreateNewPasswordSchema, showToast, useTranslate } from '@/shared'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { useSearchParams } from 'next/navigation'

export const useCreateNewPassword = () => {
  const { t } = useTranslate()
  const searchParams = useSearchParams()
  const code = searchParams.get('code')

  const [createNewPassword, { data, error, isLoading, isSuccess }] = useCreateNewPasswordMutation()

  useEffect(() => {
    if (isSuccess && data) {
      showToast(true, t.auth.passwordChanged)
    } else {
      if (error) {
        const resError = error as FetchBaseQueryError
        const errorData = resError.data as BackendErrorMessage

        showToast(false, errorData.message)
      }
    }
  }, [data, isSuccess, error, t.auth.passwordChanged])

  const submit = useCallback(
    (data: CreateNewPasswordSchema) => {
      createNewPassword({
        password: data.password,
        passwordConfirmation: data.passwordConfirmation,
        recoveryToken: code || '',
      })
    },
    [createNewPassword, code]
  )

  return {
    isLoading,
    submit,
    t,
  }
}

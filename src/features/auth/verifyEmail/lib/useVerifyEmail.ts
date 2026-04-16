'use client'

import { useEffect } from 'react'

import { useVerifyEmailMutation } from '@/features/auth/verifyEmail/api/verifyEmailApi'
import { BackendErrorMessage, resultCode, RoutesNames, useTranslate } from '@/shared'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { useRouter, useSearchParams } from 'next/navigation'

export const useVerifyEmail = () => {
  const { t } = useTranslate()
  const { replace } = useRouter()
  const searchParams = useSearchParams()
  const code = searchParams.get('code')
  const isAlreadyConfirmed = searchParams.get('already-confirmed')

  const [verifyEmail, { data, error, isError, isLoading, isSuccess }] = useVerifyEmailMutation()

  const clearCodeFromUrl = () => {
    replace(RoutesNames.VERIFY_EMAIL)
  }

  useEffect(() => {
    if (data || isError) {
      clearCodeFromUrl()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, isError])

  useEffect(() => {
    if (code && !isLoading) {
      verifyEmail({ code }).catch(console.error)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code])

  useEffect(() => {
    if (isSuccess && data?.resultCode == resultCode.BAD_REQUEST) {
      return
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  const getErrorMessage = (): string => {
    if (error) {
      const resError = error as FetchBaseQueryError
      const errorData = resError.data as BackendErrorMessage

      return errorData.message
    } else {
      return ''
    }
  }

  return {
    code,
    data,
    error,
    errorMessage: getErrorMessage(),
    isAlreadyConfirmed,
    isError,
    isLoading,
    isSuccess,
    t,
  }
}

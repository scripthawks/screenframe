'use client'

import { useEffect } from 'react'

import { useCheckRecoveryTokenMutation } from '@/features/auth/passwordRecovery/api/passwordRecoveryApi'
import { BackendErrorMessage, resultCode, RoutesNames, useTranslate } from '@/shared'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { useRouter, useSearchParams } from 'next/navigation'

export const usePasswordRecovery = () => {
  const { t } = useTranslate()
  const { replace } = useRouter()
  const searchParams = useSearchParams()
  const code = searchParams.get('code')
  const [checkRecoveryToken, { data, error, isError, isLoading, isSuccess }] =
    useCheckRecoveryTokenMutation()

  const clearCodeFromUrl = () => {
    replace(RoutesNames.PASSWORD_RECOVERY)
  }

  useEffect(() => {
    if (code && !isLoading) {
      checkRecoveryToken({ recoveryToken: code }).catch(console.error)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code])

  useEffect(() => {
    if (isSuccess && data?.resultCode == resultCode.BAD_REQUEST) {
      return
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  useEffect(() => {
    if (data || isError) {
      clearCodeFromUrl()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, isError])

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
    isError,
    isLoading,
    isSuccess,
    t,
  }
}

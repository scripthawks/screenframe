import { useEffect } from 'react'

import { useSignInMutation } from '@/features/auth/signIn/api/signInApi'
import { BackendErrorMessage, resultCode, RoutesNames, showToast, SignInSchema } from '@/shared'
import { useLazyMeQuery } from '@/shared/hoc/api/authApi'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { useRouter } from 'next/navigation'

export const useSignIn = (setFieldError?: (name: keyof SignInSchema, msg: string) => void) => {
  const { push } = useRouter()

  const [loginUser, { isLoading, isSuccess }] = useSignInMutation()
  const [me, { data: meData, isSuccess: isSuccessMe }] = useLazyMeQuery()
  const userId = meData?.userId!

  useEffect(() => {
    if (isSuccess || isSuccessMe) {
      push(RoutesNames.MAIN_PAGE)

      return
    }
  }, [isSuccess, isSuccessMe, push, userId])

  const setError = (field: 'email' | 'password', message: string) => {
    if (setFieldError && field) {
      setFieldError(field, message)
    }
  }

  const submit = async (data: SignInSchema) => {
    try {
      await loginUser(data).unwrap()

      await me().unwrap()

      push(RoutesNames.MAIN_PAGE)
    } catch (err) {
      const error = err as FetchBaseQueryError

      if (typeof error.status === 'number') {
        const status = error.status
        const payload = error.data as BackendErrorMessage

        if (status === resultCode.BAD_REQUEST) {
          setError('password', payload.message)
        } else if (status === resultCode.UNAUTHORIZED) {
          setError('email', payload.message)
        } else {
          showToast(false, payload.message ?? 'Some error')
        }
      } else {
        showToast(false, `${err}` || 'Some error')
      }
    }
  }

  return { isLoading, loginUser, submit }
}

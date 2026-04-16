'use client'

import { useState } from 'react'

import { useSignUpMutation } from '@/features/auth/signUp/api/signUpApi'
import {
  BackendErrorResponse,
  resultCode,
  ResultCodeTypes,
  showToast,
  SignUpSchema,
  useTranslate,
} from '@/shared'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'

export const useSignUp = (setFieldError?: (name: keyof SignUpSchema, msg: string) => void) => {
  const { t } = useTranslate()

  const [emailSentModal, setEmailSentModal] = useState<boolean>(false)
  const [userRegistration, { data, isLoading }] = useSignUpMutation()
  const email = data?.data?.email

  const setError = (payload: BackendErrorResponse, status: ResultCodeTypes) => {
    if (setFieldError) {
      if (status === resultCode.CONFLICT) {
        payload.extensions.forEach(ex => {
          if (ex.key === 'userName') {
            setFieldError('username', payload.message)
          } else if (ex.key === 'email') {
            setFieldError('email', payload.message)
          }
        })
      } else if (status === resultCode.BAD_REQUEST) {
        setFieldError('email', payload.message)
      }
    }
  }

  const submit = async (data: SignUpSchema) => {
    try {
      await userRegistration(data).unwrap()
      showToast(true, t.auth.emailSent)
    } catch (err) {
      const error = err as FetchBaseQueryError

      if (typeof error.status === 'number') {
        const status = error.status
        const payload = error.data as BackendErrorResponse

        if (status === resultCode.BAD_REQUEST || status === resultCode.CONFLICT) {
          setError(payload, status)
        } else {
          showToast(false, payload.message ?? 'Some error')
        }
      } else {
        showToast(false, `${err}` || 'Some error')
      }
    }
  }

  const onModalClose = () => {
    setEmailSentModal(false)
  }
  const onSaveModalAction = () => {
    setEmailSentModal(false)
  }

  return { email, emailSentModal, isLoading, onModalClose, onSaveModalAction, submit, t }
}

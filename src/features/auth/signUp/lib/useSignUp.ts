import { useState } from 'react'

import { useSignUpMutation } from '@/features/auth/signUp/api/signUpApi'
import {
  BackendErrorMessage,
  BackendErrorResponse,
  resultCode,
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

  const setError = (messages: BackendErrorMessage[]) => {
    messages.forEach(m => {
      m.extensions.forEach(ex => {
        if (ex.key === 'field') {
          const field = ex.message as keyof SignUpSchema

          if (setFieldError && field) {
            setFieldError(field, m.message)
          }
        }
      })
    })
  }

  const submit = async (data: SignUpSchema) => {
    try {
      await userRegistration(data).unwrap()
      showToast(true, t.auth.emailSent)
    } catch (err) {
      const error = err as FetchBaseQueryError

      if (typeof error.status === 'number') {
        const status = error.status
        const payload = error.data as BackendErrorResponse | undefined
        const messages = payload?.errorsMessages ?? []

        if (status === resultCode.BAD_REQUEST) {
          setError(messages)
        } else if (status === resultCode.CONFLICT) {
          setError(messages)
        } else {
          showToast(false, messages[0]?.message ?? 'Some error')
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

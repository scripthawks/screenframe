import { useEffect, useState } from 'react'

import { useSignUpMutation } from '@/features/auth/signUp/api/signUpApi'
import { SignUpSchema, useToast, useTranslate } from '@/shared'

export const useSignUp = () => {
  const { t } = useTranslate()

  const [emailSentModal, setEmailSentModal] = useState<boolean>(false)
  const [userRegistration, { data, error: requestError, isLoading, isSuccess, status }] =
    useSignUpMutation()
  const email = data?.data?.email
  const successRes = isSuccess && status === 'fulfilled'

  // @ts-ignore
  const error = requestError?.data?.messages[0]?.message

  const setToastHandler = () => {
    if (successRes) {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useToast(isSuccess, false)
    }
    if (requestError) {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useToast(false, error ? error : 'Some error')
    }
  }

  useEffect(() => {
    if (isSuccess || !requestError) {
      setToastHandler()
      if (successRes) {
        setEmailSentModal(true)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, data, requestError])

  const submit = (data: SignUpSchema) => {
    userRegistration(data)
  }

  const onModalClose = () => {
    setEmailSentModal(false)
  }
  const onSaveModalAction = () => {
    setEmailSentModal(false)
  }

  return { email, emailSentModal, isLoading, onModalClose, onSaveModalAction, submit, t }
}

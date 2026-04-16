import { useForgotPasswordMutation } from '@/features/auth/forgotPassword/api/forgotPasswordApi'
import {
  BackendErrorMessage,
  ForgotPasswordSchema,
  resultCode,
  showToast,
  useTranslate,
} from '@/shared'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'

type Props = {
  modalErrorHandlerAction: () => void
  setFieldError?: (name: keyof ForgotPasswordSchema, msg: string) => void
}

export const useForgotPassword = ({ modalErrorHandlerAction, setFieldError }: Props) => {
  const { t } = useTranslate()
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation()

  const setError = (message: string) => {
    if (setFieldError) {
      setFieldError('email', message)
    }
  }

  const submit = async (data: ForgotPasswordSchema) => {
    try {
      await forgotPassword({
        email: data.email,
        recaptchaToken: data.recaptchaToken,
      }).unwrap()

      return { success: true }
    } catch (err: any) {
      const error = err as FetchBaseQueryError

      if (typeof error.status === 'number') {
        const status = error.status
        const payload = error.data as BackendErrorMessage

        if (status === resultCode.BAD_REQUEST) {
          setError(payload.message)
        } else if (status === resultCode.FORBIDDEN) {
          setError('User with this email doesn’t exist.')
        } else if (status === resultCode.NOT_FOUND) {
          setError('User with this email doesn’t exist.')
        } else if (status === resultCode.TOO_MANY) {
          setError(payload.message)
        } else if (status === resultCode.SERVER_ERROR) {
          modalErrorHandlerAction()
        } else {
          showToast(false, payload.message ?? 'Some error')
        }
      } else {
        showToast(false, `${err}` || 'Some error')
      }

      return { success: false }
    }
  }

  return { isLoading, submit, t }
}

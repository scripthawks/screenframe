import { BackendErrorMessage, resultCode, RoutesNames, showToast, useTranslate } from '@/shared'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { useRouter } from 'next/navigation'

import { useResendRecoveryMutation } from '../api/resendRecoveryApi'
import { useResendVerificationMutation } from '../api/resendVerificationApi'

type Props = {
  setFieldError: (msg: string) => void
  type: 'email' | 'password'
}

export const useResendLink = ({ setFieldError, type }: Props) => {
  const { t } = useTranslate()
  const { push } = useRouter()
  const [resendVerification] = useResendVerificationMutation()
  const [resendRecovery] = useResendRecoveryMutation()
  const resend = type === 'email' ? resendVerification : resendRecovery

  const submit = async ({ email }: { email: string }) => {
    try {
      await resend({ email }).unwrap()

      showToast(true, t.auth.emailSent)

      return { success: true }
    } catch (err) {
      const error = err as FetchBaseQueryError

      if (typeof error.status === 'number') {
        const status = error.status
        const data = error.data as BackendErrorMessage

        if (status === resultCode.BAD_REQUEST) {
          setFieldError(data.message)
        } else if (status === resultCode.CONFLICT) {
          push(RoutesNames.EMAIL_ALREADY_CONFIRMED)
        } else if (status === resultCode.FORBIDDEN) {
          setFieldError(data.message)
        } else {
          showToast(false, data.message ?? 'Some error')
        }
      } else {
        showToast(false, `${err}` || 'Some error')
      }

      return { success: false }
    }
  }

  return { submit, t }
}

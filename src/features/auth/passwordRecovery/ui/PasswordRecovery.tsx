'use client'

import { useEffect } from 'react'

import { AuthPage } from '@/entities'
import { ResendLink } from '@/features/auth/resendLink'
import { Loader, resultCode, RoutesNames } from '@/shared'
import { LinkExpiredIcon } from '@/shared/assets/icons'
import { useRouter } from 'next/navigation'

import { usePasswordRecovery } from '../lib/usePasswordRecovery'

export const PasswordRecovery = () => {
  const { push } = useRouter()
  const { code, data, error, isError, isLoading, isSuccess, t } = usePasswordRecovery()

  useEffect(() => {
    if (isSuccess && (!data || data.resultCode === resultCode.SUCCESS)) {
      push(`${RoutesNames.CREATE_NEW_PASSWORD}/?code=${code}`)

      return
    }
  }, [isSuccess, data, code, push])

  if (isLoading) {
    return <Loader />
  }

  if (isError && error) {
    return <ResendLink image={<LinkExpiredIcon />} type={'password'} />
  }

  if (code === null) {
    return (
      <AuthPage
        buttonName={t.auth.forgotPassword}
        emptyUrl
        image={<LinkExpiredIcon />}
        nextUrl={RoutesNames.FORGOT_PASSWORD}
        text={''}
        title={t.auth.goToForgotPassword}
      />
    )
  }
}

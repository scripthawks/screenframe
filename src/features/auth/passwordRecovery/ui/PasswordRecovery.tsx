'use client'

import { AuthPage } from '@/entities'
import { ResendLink } from '@/features/auth/resendLink'
import { Loader, resultCode, RoutesNames } from '@/shared'
import { LinkExpiredIcon, RegistrationConfirmationSvg } from '@/shared/assets/icons'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { useRouter } from 'next/navigation'

import { usePasswordRecovery } from '../lib/usePasswordRecovery'

export const PasswordRecovery = () => {
  const { push } = useRouter()
  const { code, data, error, errorMessage, isError, isLoading, isSuccess, t } =
    usePasswordRecovery()

  if (isLoading) {
    return <Loader />
  }

  if (isSuccess && (!data || data.resultCode === resultCode.SUCCESS)) {
    push(`${RoutesNames.CREATE_NEW_PASSWORD}/?code=${code}`)
  }

  if (isError && error) {
    let errorStatus = null as FetchBaseQueryError['status'] | null

    if (error) {
      errorStatus = 'status' in error! ? error.status : null
    }

    // 409 or BAD_REQUEST in error.data
    if (errorMessage?.includes('already used') || errorStatus === 409) {
      return (
        <AuthPage
          buttonName={t.auth.signIn}
          image={<RegistrationConfirmationSvg />}
          nextUrl={RoutesNames.SIGN_IN}
          text={t.auth.alreadyConfirmedEmail}
          title={t.auth.congratulations}
        />
      )
    }

    // Code expired or invalid code
    if (errorMessage?.includes('expired') || errorMessage?.includes('Recovery token is invalid')) {
      return <ResendLink image={<LinkExpiredIcon />} type={'email'} />
    }
  } else {
    return (
      <AuthPage
        buttonName={t.auth.signIn}
        emptyUrl
        image={<RegistrationConfirmationSvg />}
        nextUrl={RoutesNames.SIGN_IN}
        text={''}
        title={t.auth.goToSignIn}
      />
    )
  }
}
